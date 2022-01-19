import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, Image } from 'react-bootstrap';
import {
    Card, CardHeader, CardBody, CardBodyJbAc,
    InputGroupDiv,
    DIV_JBAC, DIV_JCAC,
    ConfirmButton, DisableConfirmButton,
    H2CardTitle, H5Margin0,
    USDCSPAN
} from '../Layout';
import Logo from '../../../Assets/CAPL.svg';
const ConfirmStakingWizard = () => {
    const { depositedLpBalance, } = useSelector((state) => state.vault)
    const handleProcess = () => {
        // TODO: validation process
    }
    return (
        <div>
            <div className='step'>
                <Card>
                    <CardHeader>
                        <H2CardTitle>
                            Step 7: Staking Wizard Summary
                        </H2CardTitle>
                    </CardHeader>
                    <CardBodyJbAc>
                        <H5Margin0>
                            Staked USDC-CAPL Amount
                        </H5Margin0>
                        <H5Margin0>
                            {depositedLpBalance} USDC-CAPL
                        </H5Margin0>
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
                        <DIV_JBAC>
                            <H5Margin0>
                                Total
                            </H5Margin0>
                            <H5Margin0 style={{ color: '#ffffff' }}>
                                $
                            </H5Margin0>
                        </DIV_JBAC>
                        <DIV_JBAC>
                            <h5>Potential Weekly Yield</h5>
                            <DIV_JCAC>
                                <H5Margin0 style={{ color: '#ffffff' }}>500 CAPL</H5Margin0>
                                &nbsp;&nbsp;<Image src={Logo} alt='' className='logoImgWH' />
                            </DIV_JCAC>
                        </DIV_JBAC>
                        <DIV_JBAC>
                            <h5>Staking Duration</h5>
                            <H5Margin0 style={{ color: '#ffffff' }}>4 Years</H5Margin0>
                        </DIV_JBAC>
                        <DIV_JBAC>
                            <h5>Projected APY %</h5>
                            <H5Margin0 style={{ color: '#ffffff' }}>20 %</H5Margin0>
                        </DIV_JBAC>
                    </CardBody>
                </Card>
            </div>
            <button className="btn btn-confirm mb-4" type="button" onClick={handleProcess}>
                <h4 className='margin0 whiteColor'>Confirm Staking Wizard & Return to Dashboard</h4>
            </button>
        </div >
    )
}

export default React.memo(ConfirmStakingWizard)
