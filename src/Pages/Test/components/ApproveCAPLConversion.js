import React, { useEffect, useState } from 'react';
import { InputGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { checkAndAddNetwork } from '../../../Redux/Profile/actions';
import getContracts from '../../../Redux/Blockchain/contracts';
import {
    CAPLAPPROVE_SUCCESS,
    APPROVING_FAIL,
} from '../../../Redux/Swap/constans';
import { convertTokenValue } from '../../../Redux/Swap/actions';
import { gasLimit, gasPrice, priceConversion, numberFormate_2 } from '../../../Utilities/Util';
import Logo from '../../../Assets/CAPL.svg';
import {
    Card, CardHeader, CardBody, CardBodyJbAc,
    InputGroupDiv,
    DIV_JBAC, DIV_JCAC,
    ConfirmButton, DisableConfirmButton,
    H2CardTitle, H5Margin0,
    USDCSPAN
} from '../Layout';
const ApproveCAPLConversion = ({ onFinish }) => {
    const dispatch = useDispatch();
    const {
        token,
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

    const handleProcess = () => {
        dispatch(approveCAPL(token === 'USDC' ? ccptPrice : usdcPrice, token === 'USDC' ? 'CAPL' : 'USDC', 20));
    }

    const approveCAPL = (amount, tokenType, minutes) => async (dispatch, getState) => {
        try {
            dispatch(checkAndAddNetwork())
            const {
                profile: { walletType, userAddress },
            } = getState()
            const { swap, USDCBNB, CCPTBNB, web3 } = getContracts(walletType)
            const newGasPrice = await gasPrice(web3)
            if (tokenType === 'USDC') {
                const allowance = await USDCBNB.methods
                    .allowance(userAddress, swap._address)
                    .call()
                if (allowance < amount) {
                    await USDCBNB.methods
                        .approve(swap._address, amount)
                        .send({ from: userAddress, gas: gasLimit, gasPrice: newGasPrice })
                }
            }

            if (tokenType === 'CAPL') {
                const allowance = await CCPTBNB.methods
                    .allowance(userAddress, swap._address)
                    .call()
                if (allowance < amount) {
                    await CCPTBNB.methods
                        .approve(swap._address, amount)
                        .send({ from: userAddress, gas: gasLimit, gasPrice: newGasPrice })
                }
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
                Number(usdcPrice) > Number(usdcBNBBalance) ||
                usdcPrice === '' ||
                parseFloat(usdcPrice) === 0 ||
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
                Number(ccptPrice) > Number(ccptBNBBalance) ||
                balanceLoading ||
                ccptPrice === '' ||
                parseFloat(ccptPrice) === 0 ||
                parseFloat(ccptBNBBalance) === 0 ||
                !userAddress
            ) {
                setErrors(true)
            } else {
                setErrors(false)
            }
        }
    }, [token, usdcPrice, ccptPrice, ccptBNBBalance, usdcBNBBalance, balanceLoading, userAddress])

    return (
        <div>
            <div className='step'>
                <Card>
                    <CardHeader>
                        <H2CardTitle>
                            Step 3: Approve {token === 'USDC' ? 'CAPL' : 'USDC'}
                        </H2CardTitle>
                    </CardHeader>
                    <CardBody>
                        <DIV_JBAC className='mb-4'>
                            <H5Margin0>{token} Amount to Swap for {token === 'USDC' ? 'CAPL' : 'USDC'}</H5Margin0>
                            <InputGroupDiv>
                                <input type="number" className="form-control bg-transparent border-color IVFS whiteColor endValue" value={token === 'USDC' ? usdcPrice : ccptPrice} readOnly aria-label="" aria-describedby="basic-addon2" />
                                <USDCSPAN id="basic-addon2">{token}</USDCSPAN>
                            </InputGroupDiv>
                        </DIV_JBAC>
                        <DIV_JBAC>
                            <h5> {token === 'USDC' ? 'CAPL' : 'USDC'} Amount to Receive</h5>
                            <DIV_JCAC>
                                <H5Margin0>{numberFormate_2(token === 'USDC' ? ccptPrice : usdcPrice)}</H5Margin0>
                                &nbsp;&nbsp;<Image src={Logo} alt='' className='logoImgWH' />
                            </DIV_JCAC>
                        </DIV_JBAC>
                    </CardBody>
                </Card>
            </div>
            <button className={`btn-confirm mb-4 ${errors ? 'disabledBtn' : 'btn'}`}
                disabled={errors} type="button" onClick={handleProcess}>
                <h4 className='margin0 whiteColor'>Approve {token === 'USDC' ? 'CAPL' : 'USDC'} Conversion</h4>
            </button>
        </div>
    )
}

ApproveCAPLConversion.propTypes = {
    onFinish: PropTypes.func.isRequired
}

export default React.memo(ApproveCAPLConversion)
