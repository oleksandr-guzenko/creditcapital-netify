import React from 'react'
import PropTypes from 'prop-types';

const ApproveUSDC_CAPLAmount = ({ onFinish }) => {

    const handleProcess = () => {
        // TODO: validation process
        onFinish();
    }
    return (
        <div>
            <div className='step'>
                <div className="card bg-transparent mb-3 border-color" >
                    <div className="card-header bg-transparent border-color">
                        <h2 className="card-title margin0">Step 5: Approve USDC-CAPL</h2>
                    </div>
                    <div className="card-body text-light color">
                        <div className='mb-4 df_jsb_ac'>
                            <h5 className='margin0'>Amount of USDC-CAPL</h5>
                            <div className="input-group amountInputGroup">
                                <input type="number" className="form-control bg-transparent border-color IVFS whiteColor endValue" placeholder="" aria-label="" aria-describedby="basic-addon2" />
                                <span className="input-group-text bg-transparent border-color whiteColor" id="basic-addon2">USDC</span>
                            </div>
                        </div>
                        <div className='df_jsb_ac'>
                            <h5>USDC-CAPL Amount to Recieve</h5>
                            <h5 className='margin0 whiteColor'>200,000.00 CAPL</h5>
                        </div>
                    </div>
                </div>
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
