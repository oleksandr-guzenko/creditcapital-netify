import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, Image } from 'react-bootstrap';
import { addLiquidityTokens, REMOVE_hash } from '../../../Redux/Swap/actions';
import { gasLimit, gasPrice, priceConversion, numberFormate_2 } from '../../../Utilities/Util';
import SwapLoading from '../../../Components/Modals/SwapModals/SwapLoading';
import SwapSuccess from '../../../Components/Modals/SwapModals/SwapSuccess';
import {
    Card, CardHeader, CardBody, CardBodyJbAc,
    InputGroupDiv,
    DIV_JBAC, DIV_JCAC,
    ConfirmButton, DisableConfirmButton,
    H2CardTitle, H5Margin0,
    USDCSPAN
} from '../Layout';

const ConfirmLiquidityAmount = ({ onFinish }) => {
    const dispatch = useDispatch();
    const {
        token,
        usdcPrice,
        ccptPrice,
        swapLoading,
        swapHash,
    } = useSelector((state) => state.swap)
    const {
        depositedLpBalance,
        totalSup,
        reserves } =
        useSelector((state) => state.vault)
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
        } else {
            setSwapSucc(false)
        }
    }, [swapHash])
   
    const makeLiquidity = () => {
        dispatch(addLiquidityTokens(ccptPrice, usdcPrice, 20))
    }

    const handleProcess = () => {
        makeLiquidity();
        onFinish();
    }
    return (
        <>
            <div>
                <div className='step'>
                    <Card>
                        <CardHeader>
                            <H2CardTitle>
                                Step 4: Add Liquidity
                            </H2CardTitle>
                        </CardHeader>
                        <CardBody>
                            <DIV_JBAC className='mb-4'>
                                <H5Margin0>USDC-CAPL Liquidity Amount</H5Margin0>
                                <InputGroupDiv>
                                    <input type="number" className="form-control bg-transparent border-color IVFS whiteColor endValue" value={depositedLpBalance} readOnly placeholder="" aria-label="" aria-describedby="basic-addon2" />
                                    <USDCSPAN id="basic-addon2">USDC-CAPL</USDCSPAN>
                                </InputGroupDiv>
                            </DIV_JBAC>
                            <DIV_JBAC>
                                <h5> {token === 'USDC' ? 'CAPL' : 'USDC'} Amount to Receive</h5>
                                <H5Margin0>{numberFormate_2(depositedLpBalance)}</H5Margin0>
                            </DIV_JBAC>
                        </CardBody>
                    </Card>
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
