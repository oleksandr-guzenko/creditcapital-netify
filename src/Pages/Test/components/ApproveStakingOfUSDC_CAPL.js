import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import {
    clearHashValues,
    vaultDepositAndWithdrawTokens,
} from '../../../Redux/Vault/action';
import SwapLoading from '../../../Components/Modals/SwapModals/SwapLoading';
import VaultSuccess from '../../../Components/Modals/Vaults/VaultSuccess';
const ApproveStakingOfUSDC_CAPL = ({ onFinish }) => {
    const dispatch = useDispatch()
    const {
        vaultHash,
        vaultLoading,
    } = useSelector((state) => state.vault)
    const [depositPrice, setDepositPrice] = useState('');
    const [swapLoad, setSwapLoad] = useState(false)
    const [swapSucc, setSwapSucc] = useState(false)

    const handlePriceChange = (e) => {
        const { value } = e.target;
        const priceRegex = /^[0-9]*\.?[0-9]*$/

        if (priceRegex.test(value)) {
            setDepositPrice(value)
        }
    }

    const handleProcess = () => {
        dispatch(vaultDepositAndWithdrawTokens(depositPrice, 'deposit'))
        // TODO: validation process
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
            setDepositPrice(0)
        } else {
            setSwapSucc(false)
        }
    }, [vaultHash])
    return (
        <>
            <div>
                <div className='step'>
                    <div className="card bg-transparent mb-3 border-color" >
                        <div className="card-header bg-transparent border-color">
                            <h2 className="card-title margin0">Step 6: Stake USDC-CAPL</h2>
                        </div>
                        <div className="card-body text-light color">
                            <div className='mb-4 df_jsb_ac'>
                                <h5 className='margin0'>USDC Amount to Swap for CAPL</h5>
                                <div className="input-group amountInputGroup">
                                    <input type="number" className="form-control bg-transparent border-color IVFS whiteColor endValue" placeholder="" aria-label="" aria-describedby="basic-addon2"
                                        onChange={handlePriceChange}
                                    />
                                    <span className="input-group-text bg-transparent border-color whiteColor" id="basic-addon2">USDC</span>
                                </div>
                            </div>
                            <div className='df_jsb_ac'>
                                <h5>Staking Duration</h5>
                                <select className="form-select form-select-lg bg-transparent duration border-color whiteColor endValue" aria-label=".form-select-lg example">
                                    <option className='bg-transparent' value="4" selected>4 Years</option>
                                    <option className='bg-transparent' value="3">3 Years</option>
                                    <option className='bg-transparent' value="2">2 Years</option>
                                    <option className='bg-transparent' value="1">1 Years</option>
                                </select>
                            </div>
                        </div>
                    </div>
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
