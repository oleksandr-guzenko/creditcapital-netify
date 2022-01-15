import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addLiquidityTokens, REMOVE_hash } from '../../../Redux/Swap/actions';
import SwapLoading from '../../../Components/Modals/SwapModals/SwapLoading';
import SwapSuccess from '../../../Components/Modals/SwapModals/SwapSuccess';

const ConfirmLiquidityAmount = ({ onFinish, usdcAmount }) => {
    const dispatch = useDispatch();
    const {
        ccptPrice,
        swapLoading,
        swapHash,

    } = useSelector((state) => state.swap)
    const { userAddress } = useSelector((state) => state.profile)
    const [price, setUsdc_CaplPrice] = useState('');
    const [swapLoad, setSwapLoad] = useState(false)
    const [swapSucc, setSwapSucc] = useState(false)

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
            setUsdc_CaplPrice(0)
        } else {
            setSwapSucc(false)
        }
    }, [swapHash])

    const handlePriceChange = (e) => {
        const { value } = e.target;
        const priceRegex = /^[0-9]*\.?[0-9]*$/

        if (priceRegex.test(value)) {
            setUsdc_CaplPrice(value)
        }
    }

    const makeLiquidity = () => {
        // dispatch(addLiquidityTokens_New(ccptPrice, price, 20))
        dispatch(addLiquidityTokens(ccptPrice, price, 20))
    }

    const handleProcess = () => {
        makeLiquidity();
        // TODO: validation process
        onFinish();
    }
    return (
        <>
            <div>
                <div className='step'>
                    <div className="card bg-transparent mb-3 border-color" >
                        <div className="card-header bg-transparent border-color">
                            <h2 className="card-title margin0">Step 4: Add Liquidity</h2>
                        </div>
                        <div className="card-body text-light color">
                            <div className='mb-4 df_jsb_ac'>
                                <h5 className='margin0'>USDC-CAPL Liquidity Amount</h5>
                                <div className="input-group amountInputGroup">
                                    <input type="number" className="form-control bg-transparent border-color IVFS whiteColor endValue" placeholder="" aria-label="" aria-describedby="basic-addon2" onChange={handlePriceChange} />
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
                    <h4 className='margin0 whiteColor'>Confirm the Liquidity Amount</h4>
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

ConfirmLiquidityAmount.propTypes = {
    onFinish: PropTypes.func.isRequired
}

export default React.memo(ConfirmLiquidityAmount)
