import React, { useCallback, useEffect, useState } from 'react'
import Select, { components } from 'react-select'
import { BsFillPlayFill } from 'react-icons/bs'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import {
    clearHashValues,
    vaultDepositAndWithdrawTokens,
} from '../../../Redux/Vault/action';

import {
    Card, CardHeader, CardBody, CardBodyJbAc,
    InputGroupDiv,
    DIV_JBAC, DIV_JCAC,
    ConfirmButton, DisableConfirmButton,
    H2CardTitle, H5Margin0,
    USDCSPAN
} from '../Layout';
import SwapLoading from '../../../Components/Modals/SwapModals/SwapLoading';
import VaultSuccess from '../../../Components/Modals/Vaults/VaultSuccess';
const ApproveStakingOfUSDC_CAPL = ({ onFinish }) => {
    const dispatch = useDispatch()
    const {
        token,
    } = useSelector((state) => state.swap)
    const {
        depositedLpBalance,
        vaultHash,
        vaultLoading,
    } = useSelector((state) => state.vault)
    // const [duration, setTypeOfDeposit] = useState(4)
    const [swapLoad, setSwapLoad] = useState(false)
    const [swapSucc, setSwapSucc] = useState(false)


    const handleProcess = () => {
        dispatch(vaultDepositAndWithdrawTokens(depositedLpBalance, 'deposit'))
        onFinish();
    }

    useEffect(() => {
        if (vaultLoading) {
            setSwapLoad(true)
        } else {
            setSwapLoad(false)
        }
    }, [vaultLoading])

    useEffect(() => {
        if (vaultHash) {
            setSwapSucc(true)
        } else {
            setSwapSucc(false)
        }
    }, [vaultHash])


    return (
        <>
            <div>
                <div className='step'>
                    <Card>
                        <CardHeader>
                            <H2CardTitle>Step 6: Stake USDC-CAPL</H2CardTitle>
                        </CardHeader>
                        <CardBody>
                            <DIV_JBAC className='mb-4'>
                                <H5Margin0>USDC Amount to Swap for CAPL</H5Margin0>
                                <InputGroupDiv>
                                    <input type="number" className="form-control bg-transparent border-color IVFS whiteColor endValue" value={depositedLpBalance} readOnly placeholder="" aria-label="" aria-describedby="basic-addon2" />
                                    <USDCSPAN>{token}</USDCSPAN>
                                </InputGroupDiv>
                            </DIV_JBAC>
                            <DIV_JBAC>
                                <H5Margin0>Staking Duration</H5Margin0>
                                <select className="form-select form-select-lg bg-transparent duration border-color whiteColor endValue" aria-label=".form-select-lg example">
                                    <option value="4" style={{ backgroundColor: '#101729', color: 'white' }}>4 Years</option>
                                    <option value="3" style={{ backgroundColor: '#101729', color: 'white' }}>3 Years</option>
                                    <option value="2" style={{ backgroundColor: '#101729', color: 'white' }}>2 Years</option>
                                    <option value="1" style={{ backgroundColor: '#101729', color: 'white' }}>1 Years</option>
                                </select>
                            </DIV_JBAC>
                        </CardBody>
                    </Card>
                </div>
                <button className="btn btn-confirm mb-4" type="button" onClick={handleProcess}>
                    <h4 className='margin0 whiteColor'>Approve Staking of USDC-CAPL</h4>
                </button>
                <SwapLoading show={swapLoad} handleClose={() => setSwapLoad(false)} />
                <VaultSuccess
                    show={swapSucc}
                    handleClose={() => {
                        setSwapSucc(false)
                        dispatch(clearHashValues())
                    }}
                />
            </div>
        </>
    )
}

ApproveStakingOfUSDC_CAPL.propTypes = {
    onFinish: PropTypes.func.isRequired
}

export default React.memo(ApproveStakingOfUSDC_CAPL)
