import React from 'react'
import {Image, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {BsQuestionCircle} from 'react-icons/bs'

const PortfolioCard = ({amount, text, icon, bgColor}) => {
  return (
    <div className='portfolio__card mb-3' style={{backgroundColor: bgColor}}>
      <div className='question__icon'>
        <OverlayTrigger
          overlay={
            <Tooltip id='tooltip-disabled' className='tool'>
              <h6 className='tooltip__title'>CPT LP Balance</h6>
              <p className='text-small tooltip__text'>
                For capital pool APY generated at 6.78%
              </p>
            </Tooltip>
          }
        >
          <span className='d-inline-block'>{<BsQuestionCircle />}</span>
        </OverlayTrigger>
      </div>
      <h3>{amount}</h3>
      <p className='txt__gray'>{text}</p>
      <div className='portfolio__card__img__wrapper'>
        <Image src={icon} alt='' />
      </div>
    </div>
  )
}

export default PortfolioCard
