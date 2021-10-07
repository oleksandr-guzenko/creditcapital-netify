import React, {useState} from 'react'
import {Col, Collapse, Container, Row} from 'react-bootstrap'
import {BiPlay} from 'react-icons/bi'
import {useSelector, useDispatch} from 'react-redux'
import {unStakingCAPL} from '../../Redux/staking/actions'
import Timer from '../LandingPage/Timer'
import ReactLoading from 'react-loading'
import {numberFormate} from '../../Utilities/Util'
import format from 'date-fns/format'

const StakingHistory = ({trustee, stakingType}) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  //   const [unStakeErrors, setUnStakeErrors] = useState(false)
  const {stakingInfo, type, success} = useSelector((state) => state.staking)
  const {userAddress} = useSelector((state) => state.profile)
  //   const [enableClaim, setEnableClaim] = useState(false)

  const submitUnstake = (stakeID, amount, id) => {
    dispatch(unStakingCAPL(stakeID, amount, 'unstaking', id, 'CAPL_TYPE'))
  }
  var result = format(new Date(), "do MMM, YYY' - 'hh:mm bb")

  return (
    <div className={trustee ? 'mb-5 liquidity' : 'liquidity'}>
      <Container className='p-0'>
        <div className='liquidity__header'>
          <h4 className='section__titles'>Stake History</h4>
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
            {/* <LiquidityTable /> */}
            <Row>
              {stakingInfo?.loading ? (
                <div
                  className='d-flex align-items-center justify-content-center'
                  style={{height: '200px'}}
                >
                  <div>
                    <ReactLoading
                      type='bars'
                      color='#06397e'
                      height={40}
                      width={40}
                    />
                  </div>
                </div>
              ) : !userAddress ||
                (success === 200 && stakingInfo?.data?.length <= 0) ? (
                <div
                  className='d-flex align-items-center justify-content-center'
                  style={{height: '200px'}}
                >
                  <p>No Data Records Found</p>
                </div>
              ) : null}
              {stakingInfo?.data?.map((stake) => (
                <Col xl={4} lg={4} md={6} sm={6} xs={12} key={stake?.uniqueId}>
                  <div className='stakeCard mb-3 h-100'>
                    <div className='d-flex align-items-center justify-content-between'>
                      <h6>Staked Time</h6>
                      <h6>
                        {format(
                          new Date(
                            stake?.stakedTime[0],
                            stake?.stakedTime[1],
                            stake?.stakedTime[2],
                            stake?.stakedTime[3],
                            stake?.stakedTime[4],
                            stake?.stakedTime[5]
                          ),
                          "do MMM, YYY' - 'hh:mm bb"
                        )}
                      </h6>
                    </div>
                    <div className='d-flex align-content-center justify-content-between'>
                      <h6>Staked Amount</h6>
                      <h6>
                        {numberFormate(stake?.stakedAmount)}{' '}
                        {type === 'CAPL_TYPE'
                          ? 'CAPL'
                          : type === 'CRET_TYPE'
                          ? 'CRET'
                          : null}{' '}
                      </h6>
                    </div>
                    <div className='d-flex align-content-center justify-content-between'>
                      <h6>Reward Amount</h6>
                      <h6>{numberFormate(stake?.rewardAmount)} CCPT</h6>
                    </div>
                    <div className='d-flex align-content-center justify-content-between'>
                      <>
                        <h6>Count Down</h6>
                        {stake?.isAvailableForUnstake ? (
                          <h6>
                            <Timer
                              countDownTime={stake?.countDown}
                              stakingType={stakingType}
                            />
                          </h6>
                        ) : (
                          <h6>Completed</h6>
                        )}
                      </>
                    </div>
                    <p
                      className='txt__gray mt-3'
                      style={{fontSize: '11px', margin: 0}}
                    >
                      *Note: To unstake immediately, pay 70% penalty fees
                    </p>
                    <p
                      className='txt__gray'
                      style={{fontSize: '11px', marginBottom: 0}}
                    >
                      *Note: Staked amount available after cool down period of 3
                      months
                    </p>
                    {stake?.isActive ? (
                      <div className='liquidity__pool__box__btn d-flex align-content-center justify-content-between'>
                        <button
                          onClick={() =>
                            submitUnstake(
                              stake?.uniqueId,
                              stake?.stakedAmount,
                              0
                            )
                          }
                          disabled={!stake?.isAvailableForUnstake}
                          style={{
                            fontSize: '14px',
                            lineHeight: '20px',
                            padding: '10px 15px',
                          }}
                          className={
                            !stake?.isAvailableForUnstake
                              ? 'btn_brand btn_brand_disabled'
                              : 'btn_brand'
                          }
                        >
                          Unstake Now
                        </button>
                        <button
                          style={{
                            fontSize: '14px',
                            lineHeight: '20px',
                            padding: '10px 15px',
                          }}
                          disabled={stake?.isAvailableForUnstake}
                          onClick={() =>
                            submitUnstake(
                              stake?.uniqueId,
                              stake?.stakedAmount,
                              1
                            )
                          }
                          className={
                            stake?.isAvailableForUnstake
                              ? 'btn_brand btn_brand_disabled'
                              : 'btn_brand'
                          }
                        >
                          Unstake After
                        </button>
                      </div>
                    ) : (
                      <div className='liquidity__pool__box__btn d-flex align-items-center justify-content-center'>
                        <button
                          style={{
                            fontSize: '14px',
                            lineHeight: '20px',
                            padding: '10px 15px',
                          }}
                          className='btn_brand outlined'
                        >
                          Completed
                        </button>
                      </div>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Collapse>
      </Container>
    </div>
  )
}

export default StakingHistory
