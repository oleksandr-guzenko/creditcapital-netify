import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
// import { ethers } from 'ethers'
// import Web3Modal from 'web3modal'
import {
    convertTokenValue,
    REMOVE_hash,
    swapTokens,
} from '../../../Redux/Swap/actions'
import SwapLoading from '../../../Components/Modals/SwapModals/SwapLoading'
import SwapSuccess from '../../../Components/Modals/SwapModals/SwapSuccess'

const ConfirmSwapUSDCForCAPL = ({ onFinish, usdcAmount }) => {
    const dispatch = useDispatch();
    const {
        swapHash,
        swapLoading,
        ccptPrice,
        usdcPrice,
        usdcBNBBalance,
        balanceLoading,
        ccptBNBBalance,
    } = useSelector((state) => state.swap)

    const [swapLoad, setSwapLoad] = useState(false)
    const [swapSucc, setSwapSucc] = useState(false)
    // // const web3Modal = new Web3Modal();
    // // const connection = await web3Modal.connect();
    // // const provider = new ethers.providers.Web3Provider(connection);
    // const addresses = {
    //     // WETH: '0xc778417e063141139fce010982780140aa0cd5ab',
    //     // factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    //     router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', ///???????  TokenAddress
    //     recipient: '0x483A7239dB71fc99a630E6C71dB2508A4dE64508' ///???????
    // }
    // const mnemonic = 'MY_MNEMONIC_KEY';
    // const provider = new ethers.providers.WebSocketProvider('wss://ropsten.infura.io/ws/v3/INFRA_NUMBER');
    // const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    // const account = wallet.connect(provider);

    // const router = new ethers.Contract(
    //     addresses.router,
    //     [
    //         'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
    //     ],
    //     account
    // );

    // async function handleSwapToken() {
    //     const amount = ethers.utils.parseEther(usdcAmount.toString());
    //     const newGasPrice = await gasPrice(web3)
    //     const swapToken = await router.swapExactTokensForTokens(
    //         amount,
    //         0, //Slippage
    //         ['TokenAddress', 'Receive'],
    //         addresses.recipient,
    //         Date.now() + 1000 * 60 * 10, //10 minutes,
    //         {
    //             'gasLimit': gasLimit,
    //             'gasPrice': newGasPrice,
    //         }
    //     );
    //     // console.log("https://ropsten.etherscan.io/tx/" + swapToken.hash);
    //     const receipt = await swapToken.wait();
    //     console.log('Transaction receipt', receipt);
    // }

    useEffect(() => {
        if (swapLoading) {
            setSwapLoad(true)
        } else {
            setSwapLoad(false)
        }
    }, [swapLoading])

    useEffect(() => {
        if (swapHash) {
            setSwapSucc(true)
            // setPrice('')
            // setSecondPrice('')
        } else {
            setSwapSucc(false)
        }
    }, [swapHash])

    const handleProcess = () => {
        dispatch(swapTokens(usdcAmount, 'USDC', 20))
        // handleSwapToken();
        onFinish();
    }
    return (
        <>
            <div>
                <div className='step'>
                    <div className="card bg-transparent mb-3 border-color" >
                        <div className="card-header bg-transparent border-color">
                            <h2 className="card-title margin0">Step 2: Swap USDC for CAPL</h2>
                        </div>
                        <div className="card-body text-light color">
                            <div className='mb-4 df_jsb_ac'>
                                <h5 className='margin0'>USDC Amount to Swap for CAPL</h5>
                                <div className="input-group amountInputGroup">
                                    <input type="number" className="form-control bg-transparent border-color IVFS whiteColor endValue" value={usdcAmount} readOnly aria-label="" aria-describedby="basic-addon2" />
                                    <span className="input-group-text bg-transparent border-color whiteColor" id="basic-addon2">USDC</span>
                                </div>
                            </div>
                            <div className='df_jsb_ac'>
                                <h5>CAPL Amount to Receive</h5>
                                <h5 className='margin0 whiteColor'>200,000.00 CAPL</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-confirm mb-4" type="button" onClick={handleProcess}>
                    <h4 className='margin0 whiteColor'>Confirm Swap USDC for CAPL</h4>
                </button>
            </div>
            <SwapLoading show={swapLoad} handleClose={() => setSwapLoad(false)} />
            <SwapSuccess
                show={swapSucc}
                handleClose={() => {
                    setSwapSucc(false)
                    dispatch(REMOVE_hash())
                }}
            />
        </>
    )
}

ConfirmSwapUSDCForCAPL.propTypes = {
    onFinish: PropTypes.func.isRequired
}

export default React.memo(ConfirmSwapUSDCForCAPL)
