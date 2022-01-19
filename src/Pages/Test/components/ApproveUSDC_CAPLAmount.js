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

import {
    Card, CardHeader, CardBody, CardBodyJbAc,
    InputGroupDiv,
    DIV_JBAC, DIV_JCAC,
    ConfirmButton, DisableConfirmButton,
    H2CardTitle, H5Margin0,
    USDCSPAN
} from '../Layout';

const ApproveUSDC_CAPLAmount = ({ onFinish }) => {
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

    const handleProcess = () => {
        dispatch(approveUSDC_CAPL(depositedLpBalance))
    }

    const approveUSDC_CAPL = (depositedLpBalance) => async (dispatch, getState) => {
        try {
            dispatch(checkAndAddNetwork());
            const {
                profile: { walletType, userAddress },
            } = getState()

            const { swap, USDC_CCPT_TOKEN, web3 } = getContracts(walletType)
            const price = priceConversion('toWei', 'Mwei', depositedLpBalance, web3)
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
                <Card>
                    <CardHeader>
                        <H2CardTitle>Step 5: Approve USDC-CAPL</H2CardTitle>
                    </CardHeader>
                    <CardBody>
                        <DIV_JBAC className='mb-4'>
                            <H5Margin0>Amount of USDC-CAPL</H5Margin0>
                            <InputGroupDiv>
                                <input type="number" className="form-control bg-transparent border-color IVFS whiteColor endValue" value={depositedLpBalance} readOnly placeholder="" aria-label="" aria-describedby="basic-addon2" />
                                <USDCSPAN>{token}</USDCSPAN>
                            </InputGroupDiv>
                        </DIV_JBAC>
                        <DIV_JBAC>
                            <h5>USDC-CAPL Amount to Recieve</h5>
                            <H5Margin0>{numberFormate_2(ccptPrice)} CAPL</H5Margin0>
                        </DIV_JBAC>
                    </CardBody>
                </Card>
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
