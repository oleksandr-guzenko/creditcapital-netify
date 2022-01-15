import React, { useEffect, useState } from 'react'
import { InputGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';

import { checkAndAddNetwork } from '../../../Redux/Profile/actions';
import { gasLimit, gasPrice, priceConversion, numberFormate_2 } from '../../../Utilities/Util';
import Logo from '../../../Assets/CAPL.svg';

import {
    convertTokenValue,
    REMOVE_hash,
    swapTokens,
} from '../../../Redux/Swap/actions';

import {
    Card, CardHeader, CardBody, CardBodyJbAc,
    InputGroupDiv,
    DIV_JBAC, DIV_JCAC,
    ConfirmButton, DisableConfirmButton,
    H2CardTitle, H5Margin0,
    USDCSPAN
} from '../Layout';

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
    const { userAddress } = useSelector((state) => state.profile)

    const [errors, setErrors] = useState(false);
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

    useEffect(() => {
        if (
            Number(usdcAmount) > Number(usdcBNBBalance) ||
            usdcAmount === '' || parseFloat(usdcAmount) === 0 ||
            parseFloat(usdcBNBBalance) === 0 || !userAddress
        ) {
            setErrors(true)
        } else {
            setErrors(false)
        }
    }, [ccptPrice, ccptBNBBalance, usdcBNBBalance, userAddress])

    const handleProcess = () => {
        // dispatch(swapTokens(usdcAmount, 'USDC', 20))
        onFinish();
    }
    return (
        <>
            <div>
                <div className='step'>
                    <Card>
                        <CardHeader>
                            <H2CardTitle>
                                Step 2: Swap USDC for CAPL
                            </H2CardTitle>
                        </CardHeader>
                        <CardBody>
                            <DIV_JBAC className='mb-4'>
                                <H5Margin0>USDC AMount to Swap for CAPL</H5Margin0>
                                <InputGroupDiv>
                                    <input type="number" className="form-control bg-transparent border-color IVFS whiteColor endValue" value={usdcAmount} readOnly aria-label="" aria-describedby="basic-addon2" />
                                    <USDCSPAN id="basic-addon2">USDC</USDCSPAN>
                                </InputGroupDiv>
                            </DIV_JBAC>
                            <DIV_JBAC>
                                <h5>CAPL Amount to Receive</h5>
                                <DIV_JCAC>
                                    <H5Margin0>{numberFormate_2(ccptPrice)}</H5Margin0>
                                    &nbsp;&nbsp;<Image src={Logo} alt='' className='logoImgWH' />
                                </DIV_JCAC>
                            </DIV_JBAC>
                        </CardBody>
                    </Card>
                </div>
                <button className={`btn-confirm mb-4 ${errors ? 'disabledBtn' : 'btn'}`}
                    disabled={errors} type="button" onClick={handleProcess}>
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
