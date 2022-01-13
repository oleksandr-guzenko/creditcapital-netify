import React from 'react'

const ConfirmStakingWizard = () => {

    const handleProcess = () => {
        // TODO: validation process
    }
    return (
        <div>
            <div className='step'>
                <div className="card bg-transparent mb-3 border-color" >
                    <div className="card-header bg-transparent border-color">
                        <h2 className="card-title margin0">Step 7: Staking Wizard Summary</h2>
                    </div>
                    <div className="card-body text-light df_jsb_ac color">
                        <h5 className='margin0'>Staked USDC-CAPL Amount</h5>
                        <h5 className='margin0'>200,000.00 USDC-CAPL</h5>
                    </div>
                </div>
            </div>
            <div className='summary'>
                <div className="card bg-transparent mb-4 border-color" >
                    <div className="card-header bg-transparent border-color">
                        <h2 className="card-title margin0">Summary</h2>
                    </div>
                    <div className="card-body text-light color">
                        <div className='df_jsb_ac'>
                            <h5 className='margin0'>Total</h5>
                            <h5 className='margin0 whiteColor'>$1997.97 USD</h5>
                        </div>
                        <div className='df_jsb_ac'>
                            <h5>Potential Weekly Yield</h5>
                            <h5 className='margin0 whiteColor'>500 CAPL</h5>
                        </div>
                        <div className='df_jsb_ac'>
                            <h5>Staking Duration</h5>
                            <h5 className='margin0 whiteColor'>4 Years</h5>
                        </div>
                        <div className='df_jsb_ac'>
                            <h5>Projected APY %</h5>
                            <h5 className='margin0 whiteColor'>20 %</h5>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-confirm mb-4" type="button" onClick={handleProcess}>
                <h4 className='margin0 whiteColor'>Confirm Staking Wizard & Return to Dashboard</h4>
            </button>
        </div>
    )
}

export default React.memo(ConfirmStakingWizard)
