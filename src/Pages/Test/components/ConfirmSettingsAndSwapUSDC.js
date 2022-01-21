import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, Image } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { gasLimit, gasPrice, priceConversion, numberFormate_2 } from '../../../Utilities/Util';
import { checkAndAddNetwork } from '../../../Redux/Profile/actions';
import getContracts from '../../../Redux/Blockchain/contracts';
import { convertTokenValue } from '../../../Redux/Swap/actions';
import { TOKEN, APPROVING_FAIL, GET_CONVERTED_CCPT_VALUES_SUCCESS, GET_CONVERTED_USDC_VALUES_SUCCESS } from '../../../Redux/Swap/constans';

import {
    Card, CardHeader, CardBody, CardBodyJbAc,
    InputGroupDiv,
    DIV_JBAC, DIV_JCAC,
    ConfirmButton, DisableConfirmButton,
    H2CardTitle, H5Margin0,
    USDCSPAN
} from '../Layout';
import Logo from '../../../Assets/CAPL.svg';

const ConfirmSettingsAndSwapUSDC = ({ onFinish }) => {
    const dispatch = useDispatch();
    const {
        token,
        usdcApprove,
        swapHash,
        swapLoading,
        ccptPrice,
        usdcPrice,
        usdcBNBBalance,
        balanceLoading,
        ccptBNBBalance,
    } = useSelector((state) => state.swap);
    const { userAddress } = useSelector((state) => state.profile);

    const [errors, setErrors] = useState(false);
    const [amount, setAmount] = useState('');

    const handleChooseToken = () => {
        var changeToken = token === 'USDC' ? 'CAPL' : 'USDC';
        dispatch(dispatchToken(changeToken))
    }

    const dispatchToken = (changeToken) => async (dispatch, getState) => {
        dispatch({
            type: TOKEN,
            payload: { changeToken },
        })
    }

    const handlePriceChange = (number) => {
        setAmount(number.value)
    }

    const handleProcess = () => {
        dispatch(approveUSDC(amount / 2, token, 20))
    }

    const approveUSDC = (amount, tokenType, minutes) => async (dispatch, getState) => {
        try {
            dispatch(checkAndAddNetwork())
            const {
                profile: { walletType, userAddress },
            } = getState()
            const { swap, USDCBNB, CCPTBNB, web3 } = getContracts(walletType)
            const price = priceConversion('toWei', 'Mwei', amount, web3)
            const newGasPrice = await gasPrice(web3)
            if (tokenType === 'USDC') {
                const allowance = await USDCBNB.methods
                    .allowance(userAddress, swap._address)
                    .call()
                if (allowance < price) {
                    await USDCBNB.methods
                        .approve(swap._address, price)
                        .send({ from: userAddress, gas: gasLimit, gasPrice: newGasPrice })
                }
                dispatch(convertTokenValue(amount, 'USDC'))
                const usdcPrice = amount;
                dispatch({
                    type: GET_CONVERTED_USDC_VALUES_SUCCESS,
                    payload: { usdcPrice },
                })
            }

            if (tokenType === 'CAPL') {
                const allowance = await CCPTBNB.methods
                    .allowance(userAddress, swap._address)
                    .call()
                if (allowance < price) {
                    await CCPTBNB.methods
                        .approve(swap._address, price)
                        .send({ from: userAddress, gas: gasLimit, gasPrice: newGasPrice })
                }
                dispatch(convertTokenValue(price, 'CAPL'))
                const ccptPrice = amount;
                dispatch({
                    type: GET_CONVERTED_CCPT_VALUES_SUCCESS,
                    payload: { ccptPrice },
                })
            }
            onFinish();
        } catch (error) {
            dispatch({
                type: APPROVING_FAIL,
                payload: error?.message,
            })
        }
    }
    useEffect(() => {
        if (token === 'USDC') {
            if (
                Number(amount/2) > Number(usdcBNBBalance) ||
                amount === '' ||
                parseFloat(amount) === 0 ||
                parseFloat(usdcBNBBalance) === 0 ||
                !userAddress ||
                balanceLoading
            ) {
                setErrors(true)
            } else {
                setErrors(false)
            }
        } else if (token === 'CAPL') {
            if (
                Number(amount) > Number(ccptBNBBalance) ||
                balanceLoading ||
                amount === '' ||
                parseFloat(amount) === 0 ||
                parseFloat(ccptBNBBalance) === 0 ||
                !userAddress
            ) {
                setErrors(true)
            } else {
                setErrors(false)
            }
        }
    }, [token, amount, ccptBNBBalance, usdcBNBBalance, balanceLoading, userAddress])

    return (
        <div>
            <div className='step'>
                <Card>
                    <CardHeader>
                        <H2CardTitle>
                            Step 1: Approve {token}
                        </H2CardTitle>
                    </CardHeader>
                    <CardBodyJbAc>
                        <H5Margin0>
                            Choose {token} Amount
                        </H5Margin0>
                        <InputGroupDiv>
                            <InputGroup >
                                <NumberFormat
                                    thousandsGroupStyle='thousand'
                                    value={amount}
                                    decimalSeparator='.'
                                    displayType='input'
                                    type='text'
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    fixedDecimalScale={true}
                                    allowLeadingZeros={false}
                                    decimalScale={4}
                                    onValueChange={handlePriceChange}
                                    placeholder='0.00'
                                    className='shadow-none form-control border-color IVFS endValue'
                                    style={{ backgroundColor: 'transparent', color: 'white' }}
                                />
                                <USDCSPAN id="basic-addon2" onClick={handleChooseToken} style={{ cursor: 'pointer' }}>{token}</USDCSPAN>
                            </InputGroup>
                        </InputGroupDiv>
                    </CardBodyJbAc>
                </Card>
            </div>
            <div className='summary'>
                <Card className='mb-4'>
                    <CardHeader>
                        <H2CardTitle>
                            Summary
                        </H2CardTitle>
                    </CardHeader>
                    <CardBody>
                        <DIV_JBAC className='mb-3'>
                            <H5Margin0>
                                Total
                            </H5Margin0>
                            <H5Margin0 style={{ color: '#ffffff' }}>
                                ${numberFormate_2(amount * 0.999)}
                            </H5Margin0>
                        </DIV_JBAC>
                        <DIV_JBAC>
                            <h5>Potential Weekly Yield</h5>
                            <DIV_JCAC>
                                <H5Margin0 style={{ color: '#ffffff' }}>500 CAPL</H5Margin0>
                                &nbsp;&nbsp;<Image src={Logo} alt='' className='logoImgWH' />
                            </DIV_JCAC>
                        </DIV_JBAC>
                    </CardBody>
                </Card>
            </div>
            <button className={`btn-confirm mb-4 ${errors ? 'disabledBtn' : 'btn'}`}
                disabled={errors} type="button" onClick={handleProcess}>
                <h4 className='margin0 whiteColor'>Confirm Settings & Swap {token}</h4>
            </button>
        </div >
    )
}

ConfirmSettingsAndSwapUSDC.propTypes = {
    onFinish: PropTypes.func.isRequired
}

export default React.memo(ConfirmSettingsAndSwapUSDC)
