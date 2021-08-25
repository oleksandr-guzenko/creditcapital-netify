import React, {useState} from 'react'
import {Collapse, Container, Row} from 'react-bootstrap'
import LiquidityTable from './LiquidityTable'
import {BiPlay} from 'react-icons/bi'

const LiquidityHistory = ({trustee}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={trustee ? 'mb-5 liquidity' : 'liquidity'}>
      <Container className='p-0'>
        <div className='liquidity__header'>
          <h4 className='section__titles'>Liquidity History</h4>
          {!trustee && (
            <div
              className='__play__icon__wrapper'
              onClick={() => {
                setOpen(!open)
                const playIcon = document.getElementById('play__icon')
                playIcon.classList.toggle('toggle__play__icon')
              }}
              aria-controls='collapse-div'
              aria-expanded={open}
            >
              <BiPlay id='play__icon' />
            </div>
          )}
        </div>
        <Collapse in={trustee ? trustee : open}>
          <div className='liquidity__table' id='collapse-div'>
            <LiquidityTable />
          </div>
        </Collapse>
      </Container>
    </div>
  )
}

export default LiquidityHistory
