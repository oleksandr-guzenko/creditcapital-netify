import React, { useState } from 'react'
import PropTypes from 'prop-types';
// import { ethers } from 'ethers';
// import Web3Modal from 'web3modal'
import { useDispatch, useSelector } from 'react-redux';
// import NumberFormat from 'react-number-format'
import { gasLimit, gasPrice, priceConversion } from '../../../Utilities/Util'
import { checkAndAddNetwork } from '../../../Redux/Profile/actions'
import getContracts from '../../../Redux/Blockchain/contracts'
import { convertTokenValue } from '../../../Redux/Swap/actions'
import {
    APPROVING_FAIL,
    USDCAPPROVE_SUCCESS,
} from '../../../Redux/Swap/constans'
import { FiRefreshCcw } from "react-icons/fi";

const ConfirmSettingsAndSwapUSDC = ({ onFinish, setUsdcAmout }) => {
    const dispatch = useDispatch();
    const {
        ccptPrice,
    } = useSelector((state) => state.swap)
    const [Usdc_Price, setUsdcPrice] = useState(0);

    const handlePriceChange = (e) => {
        const { value } = e.target;
        const priceRegex = /^[0-9]*\.?[0-9]*$/

        if (priceRegex.test(value)) {
            setUsdcPrice(value)
            dispatch(convertTokenValue(value, 'USDC'))
        }
    }

    const handleProcess = () => {
        setUsdcAmout(Usdc_Price)
        dispatch(approveUSDC(Usdc_Price, 'USDC', 20))
        onFinish();
    }

    const approveUSDC = (Usdc_Price, tokenType, minutes) => async (dispatch, getState) => {
        try {
            dispatch(checkAndAddNetwork())
            const {
                profile: { walletType, userAddress },
            } = getState()
            console.log('profile', walletType, userAddress);
            const { swap, USDCBNB, CCPTBNB, web3 } = getContracts(walletType)
            console.log('Usdc_Price', Usdc_Price);
            const price = priceConversion('toWei', 'Mwei', Usdc_Price, web3)
            console.log('price', price);
            const newGasPrice = await gasPrice(web3)
            console.log('newGasPrice', newGasPrice);

            const allowance = await USDCBNB.methods
                .allowance(userAddress, swap._address)
                .call()
            if (allowance < price) {
                console.log('allowance', allowance);
                await USDCBNB.methods
                    .approve(swap._address, price)
                    .send({ from: userAddress, gas: gasLimit, gasPrice: newGasPrice })
            }

            dispatch({
                type: USDCAPPROVE_SUCCESS,
                payload: 'USDC_APPROVED',
            })

            console.log('USDCAPPROVE_SUCCESS', USDCAPPROVE_SUCCESS)
        } catch (error) {
            dispatch({
                type: APPROVING_FAIL,
                payload: error?.message,
            })
        }

        // const web3Modal = new Web3Modal();
        // const connection = await web3Modal.connect();
        // const provider = new ethers.providers.Web3Provider(connection);
        // const signer = provider.getSigner();

        // const priceApprove = ethers.utils.parseUnits(Usdc_Price.toString(), 'ether');
        // console.log('proveApprove', priceApprove)
        // const usdcContract = new ethers.Contract('TokenAddress', 'BUSD/abi', singer);

        // await usdcContract.approve(vintagetokenaddress, priceApprove)

        // TODO: validation process
        // onFinish();
    }

    return (
        <div>
            <div className='step'>
                <div className="card bg-transparent mb-3 border-color" >
                    <div className="card-header bg-transparent border-color">
                        <h2 className="card-title margin0">Step 1: Approve USDC</h2>
                    </div>
                    <div className="card-body text-light df_jsb_ac color">
                        <h5 className='margin0'>Choose USDC Amount</h5>
                        <div className="input-group amountInputGroup">
                            <input type="number" className="form-control bg-transparent border-color IVFS whiteColor endValue" placeholder="0.0000" aria-label="0.0000" aria-describedby="basic-addon2"
                                onChange={handlePriceChange}
                            />
                            <span className="input-group-text bg-transparent border-color whiteColor" id="basic-addon2">USDC</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='summary'>
                <div className="card bg-transparent mb-4 border-color" >
                    <div className="card-header  bg-transparent border-color">
                        <h2 className="card-title margin0">Summary</h2>
                    </div>
                    <div className="card-body text-light color">
                        <div className='mb-3 df_jsb_ac'>
                            <h5 className='margin0'>Total</h5>
                            <h5 className='margin0 whiteColor'>${ccptPrice}</h5>
                        </div>
                        <div className='df_jsb_ac'>
                            <h5>Potential Weekly Yield</h5>
                            <div className='df_jc_ac'>
                                <h5 className='margin0 whiteColor'>500 CAPL</h5>
                                &nbsp;&nbsp;<FiRefreshCcw className='IVFS' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-confirm mb-4" type="button" onClick={handleProcess}>
                <h4 className='margin0 whiteColor'>Confirm Settings & Swap USDC</h4>
            </button>
        </div>
    )
}

ConfirmSettingsAndSwapUSDC.propTypes = {
    onFinish: PropTypes.func.isRequired
}

export default React.memo(ConfirmSettingsAndSwapUSDC)
