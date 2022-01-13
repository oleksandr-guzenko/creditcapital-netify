import React, { useCallback } from 'react';
import { BsDashLg, BsCheckCircle } from "react-icons/bs";
import { gasLimit, gasPrice, priceConversion } from '../../Utilities/Util'
import { useDispatch, useSelector } from 'react-redux';
import { checkAndAddNetwork } from '../../Redux/Profile/actions'
import getContracts from '../../Redux/Blockchain/contracts'


import ConfirmSettingsAndSwapUSDC from './components/ConfirmSettingsAndSwapUSDC'
import ConfirmSwapUSDCForCAPL from './components/ConfirmSwapUSDCForCAPL'
import ApproveCAPLConversion from './components/ApproveCAPLConversion'
import ConfirmLiquidityAmount from './components/ConfirmLiquidityAmount'
import ApproveUSDC_CAPLAmount from './components/ApproveUSDC_CAPLAmount'
import ApproveStakingOfUSDC_CAPL from './components/ApproveStakingOfUSDC_CAPL'
import ConfirmStakingWizard from './components/ConfirmStakingWizard'

const Test = () => {

  const [step, setStep] = React.useState(1);
  const [usdcAmount, setUsdcAmout] = React.useState(0);

  const increaseStep = useCallback(() => {
    setStep(prev => prev + 1);
  }, []);
  return (
    <div className='wrapper'>
      <div className='card body'>
        <div className='content'>
          {step === 1 && <ConfirmSettingsAndSwapUSDC onFinish={increaseStep} setUsdcAmout={setUsdcAmout} />}
          {step === 2 && <ConfirmSwapUSDCForCAPL onFinish={increaseStep} usdcAmount={usdcAmount} />}
          {step === 3 && <ApproveCAPLConversion onFinish={increaseStep} />}
          {step === 4 && <ConfirmLiquidityAmount onFinish={increaseStep} />}
          {step === 5 && <ApproveUSDC_CAPLAmount onFinish={increaseStep} />}
          {step === 6 && <ApproveStakingOfUSDC_CAPL onFinish={increaseStep} />}
          {step === 7 && <ConfirmStakingWizard />}
        </div>
        <div className='stepCircleButton df_jc_ac'>
          <StepCircle state={1} step={step} />
          <Divider />
          <StepCircle state={2} step={step} />
          <Divider />
          <StepCircle state={3} step={step} />
          <Divider />
          <StepCircle state={4} step={step} />
          <Divider />
          <StepCircle state={5} step={step} />
          <Divider />
          <StepCircle state={6} step={step} />
          <Divider />
          <StepCircle state={7} step={step} />
        </div>
      </div>
    </div >
  )
}

const StepCircle = (props) => {
  const { state, step } = props;
  if (state > step) {
    return (
      <button type="button" className="btn btn-outline" >
        <h2 className='margin0'>{state}</h2>
      </button>
    )
  } else if (state === step) {
    if (step === 7) return (
      <button type="button" className="btn btn-outline lastBotton">
        <h2 className='margin0'>{state}</h2>
      </button>
    )
    return (
      <button type="button" className="btn btn-outline click">
        <h2 className='margin0'>{state}</h2>
      </button>
    )
  } else {
    return (
      <BsCheckCircle className='clickedIcon' />
    )
  }
}

const Divider = () => {
  return (
    <BsDashLg className='icon whiteColor' />
  )
}

export default Test
