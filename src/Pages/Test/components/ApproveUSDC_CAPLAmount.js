import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { checkAndAddNetwork } from '../../../Redux/Profile/actions';
import getContracts from '../../../Redux/Blockchain/contracts';
import { convertTokenValue } from '../../../Redux/Swap/actions';
import { gasLimit, gasPrice, priceConversion, numberFormate_2 } from '../../../Utilities/Util';
import {
    USDC_CAPLAPPROVE_SUCCESS,
    APPROVING_FAIL,
} from '../../../Redux/Swap/constans';

const ApproveUSDC_CAPLAmount = ({ onFinish }) => {
    const dispatch = useDispatch();
    const {
        ccptPrice,
    } = useSelector((state) => state.swap)

    const handleProcess = () => {
        dispatch(approveUSDC_CAPL(ccptPrice, 'CAPL', 20))
    }

    const approveUSDC_CAPL = (ccptPrice, tokenType, minutes) => async (dispatch, getState) => {
        try {
            dispatch(checkAndAddNetwork());
            const {
                profile: { walletType, userAddress },
            } = getState()

            const { swap, USDC_CCPT_TOKEN, web3 } = getContracts(walletType)
            const price = priceConversion('toWei', 'Mwei', ccptPrice, web3)
            const newGasPrice = await gasPrice(web3)

            const allowance = await USDC_CCPT_TOKEN.methods
                .allowance(userAddress, swap._address)
                .call()
            if (allowance < price) {
                await USDC_CCPT_TOKEN.methods
                    .approve(swap._address, price)
                    .send({ from: userAddress, gas: gasLimit, gasPrice: newGasPrice })
            }
            dispatch({
                type: USDC_CAPLAPPROVE_SUCCESS,
                payload: 'CAPL_APPROVED',
            })
            onFinish();
        } catch (error) {
            dispatch({
                type: APPROVING_FAIL,
                payload: error?.message,
            })
        }
    }
    return (
        <div>
            <div className='step'>
                <div className="card bg-transparent mb-3 border-color" >
                    <div className="card-header bg-transparent border-color">
                        <h2 className="card-title margin0">Step 5: Approve USDC-CAPL</h2>
                    </div>
                    <div className="card-body text-light color">
                        <div className='mb-4 df_jsb_ac'>
                            <h5 className='margin0'>Amount of USDC-CAPL</h5>
                            <div className="input-group amountInputGroup">
                                <input type="number" className="form-control bg-transparent border-color IVFS whiteColor endValue" placeholder="" aria-label="" aria-describedby="basic-addon2" />
                                <span className="input-group-text bg-transparent border-color whiteColor" id="basic-addon2">USDC</span>
                            </div>
                        </div>
                        <div className='df_jsb_ac'>
                            <h5>USDC-CAPL Amount to Recieve</h5>
                            <h5 className='margin0 whiteColor'>200,000.00 CAPL</h5>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-confirm mb-4" type="button" onClick={handleProcess}>
                <h4 className='margin0 whiteColor'>Approve USDC-CAPL Amount</h4>
            </button>
        </div>
    )
}

ApproveUSDC_CAPLAmount.propTypes = {
    onFinish: PropTypes.func.isRequired
}

export default React.memo(ApproveUSDC_CAPLAmount)
