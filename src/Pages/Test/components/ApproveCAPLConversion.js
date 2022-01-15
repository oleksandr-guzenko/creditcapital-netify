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
const ApproveCAPLConversion = ({ onFinish, usdcAmount }) => {
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

    const handleProcess = () => {
        dispatch(approveUSDC(ccptPrice, 'CAPL', 20));
        onFinish();
    }

    const approveUSDC = (ccptPrice, tokenType, minutes) => async (dispatch, getState) => {
        try {
            dispatch(checkAndAddNetwork());
            const {
                profile: { walletType, userAddress },
            } = getState();

            const { swap, USDCBNB, CCPTBNB, web3 } = getContracts(walletType);
            const price = priceConversion('toWei', 'Mwei', ccptPrice, web3);
            const newGasPrice = await gasPrice(web3);

            const allowance = await CCPTBNB.methods
                .allowance(userAddress, swap._address)
                .call();
            if (allowance < price) {
                await CCPTBNB.methods
                    .approve(swap._address, price)
                    .send({ from: userAddress, gas: gasLimit, gasPrice: newGasPrice });
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
            Number(usdcAmount) > Number(usdcBNBBalance) ||
            usdcAmount === '' || parseFloat(usdcAmount) === 0 ||
            parseFloat(usdcBNBBalance) === 0 || !userAddress
        ) {
            setErrors(true)
        } else {
            setErrors(false)
        }
    }, [usdcAmount, ccptBNBBalance, usdcBNBBalance, userAddress])


    return (
        <div>
            <div className='step'>
                <Card>
                    <CardHeader>
                        <H2CardTitle>
                            Step 3: Approve CAPL
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
                <h4 className='margin0 whiteColor'>Approve CAPL Conversion</h4>
            </button>
        </div>
    )
}

ApproveCAPLConversion.propTypes = {
    onFinish: PropTypes.func.isRequired
}

export default React.memo(ApproveCAPLConversion)
