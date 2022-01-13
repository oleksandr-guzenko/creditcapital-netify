import React from 'react'
import PropTypes from 'prop-types';

const ApproveStakingOfUSDC_CAPL = ({ onFinish }) => {

    const handleProcess = () => {
        // TODO: validation process
        onFinish();
    }
    return (
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
                                <input type="number" className="form-control bg-transparent border-color IVFS whiteColor endValue" placeholder="" aria-label="" aria-describedby="basic-addon2" />
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
        </div>
    )
}

ApproveStakingOfUSDC_CAPL.propTypes = {
    onFinish: PropTypes.func.isRequired
}

export default React.memo(ApproveStakingOfUSDC_CAPL)
