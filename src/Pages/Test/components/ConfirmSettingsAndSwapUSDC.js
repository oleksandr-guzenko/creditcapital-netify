import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, Image } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { gasLimit, gasPrice, priceConversion, numberFormate_2 } from '../../../Utilities/Util';
import { checkAndAddNetwork } from '../../../Redux/Profile/actions';
import getContracts from '../../../Redux/Blockchain/contracts';
import { convertTokenValue } from '../../../Redux/Swap/actions';
import { APPROVING_FAIL, } from '../../../Redux/Swap/constans';

import {
    Card, CardHeader, CardBody, CardBodyJbAc,
    InputGroupDiv,
    DIV_JBAC, DIV_JCAC,
    ConfirmButton, DisableConfirmButton,
    H2CardTitle, H5Margin0,
    USDCSPAN
} from '../Layout';
import Logo from '../../../Assets/CAPL.svg';

const ConfirmSettingsAndSwapUSDC = ({ onFinish, setUsdcAmout }) => {
    const dispatch = useDispatch();
    const {
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
    const [Usdc_Price, setUsdcPrice] = useState('');

    const handlePriceChange = (number) => {
        setUsdcPrice(number.value)
        dispatch(convertTokenValue(number.value, 'USDC'))
    }

    const handleProcess = () => {
        setUsdcAmout(Usdc_Price)
        dispatch(approveUSDC(Usdc_Price, 'USDC', 20))
    }

    const approveUSDC = (Usdc_Price, tokenType, minutes) => async (dispatch, getState) => {
        try {
            dispatch(checkAndAddNetwork())
            const {
                profile: { walletType, userAddress },
            } = getState()
            const { swap, USDCBNB, CCPTBNB, web3 } = getContracts(walletType)
            const price = priceConversion('toWei', 'Mwei', Usdc_Price, web3)
            const newGasPrice = await gasPrice(web3)

            const allowance = await USDCBNB.methods
                .allowance(userAddress, swap._address)
                .call()
            if (allowance < price) {
                await USDCBNB.methods
                    .approve(swap._address, price)
                    .send({ from: userAddress, gas: gasLimit, gasPrice: newGasPrice })

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
        if (
            Number(Usdc_Price) > Number(usdcBNBBalance) ||
            Usdc_Price === '' || parseFloat(Usdc_Price) === 0 ||
            parseFloat(usdcBNBBalance) === 0 || !userAddress
        ) {
            setErrors(true)
        } else {
            setErrors(false)
        }
    }, [Usdc_Price, ccptBNBBalance, usdcBNBBalance, userAddress])

    return (
        <div>
            <div className='step'>
                <Card>
                    <CardHeader>
                        <H2CardTitle>
                            Step 1: Approve USDC
                        </H2CardTitle>
                    </CardHeader>
                    <CardBodyJbAc>
                        <H5Margin0>
                            Choose USDC Amount
                        </H5Margin0>
                        <InputGroupDiv>
                            <InputGroup >
                                <NumberFormat
                                    thousandsGroupStyle='thousand'
                                    value={Usdc_Price}
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
                                <USDCSPAN id="basic-addon2">USDC</USDCSPAN>
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
                                ${numberFormate_2(Usdc_Price * 0.999)}
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
                <h4 className='margin0 whiteColor'>Confirm Settings & Swap USDC</h4>
            </button>
        </div >
    )
}

ConfirmSettingsAndSwapUSDC.propTypes = {
    onFinish: PropTypes.func.isRequired
}

export default React.memo(ConfirmSettingsAndSwapUSDC)
