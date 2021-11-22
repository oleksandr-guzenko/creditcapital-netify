import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import ReactLoading from 'react-loading'
import {useDispatch, useSelector} from 'react-redux'
import {clearHashValue} from '../../Redux/BuyCAPTAndCRET/actions'
import ReserveToken from '../Modals/BuyCAPLAndCRET/ReserveToken'
import LoadingModalToken from '../Modals/BuyCAPLAndCRET/LoadingModalToken'
import SuccessMessageToken from '../Modals/BuyCAPLAndCRET/SuccessMessageToken'
import BuyCCPTToken from '../Modals/BuyCAPLAndCRET/BuyCCPTToken'

const BuyTokens = () => {
  // Redux State
  const dispatch = useDispatch()

  const {userAddress} = useSelector((state) => state.profile)
  const {hashID, loading, error} = useSelector((state) => state.buyTokens)

  const [show, setShow] = useState(false)
  const [showCCPTModal, setShowCCPTModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  // Buy TokenModal
  const openTokenModal = (e) => {
    setModalTitle(e.target.textContent)
    if (e.target.textContent === 'Get CAPL') {
      setShowCCPTModal(true)
    } else {
      setShow(true)
    }
  }
  const closeTokenModal = () => {
    setShow(false)
    setShowCCPTModal(false)
  }

  useEffect(() => {
    if (error) {
      closeTokenModal()
    }
  }, [error])

  // successModal
  const [successModalShow, setSuccessModalShow] = useState(false)

  const openSuccessModal = () => {
    setSuccessModalShow(true)
  }

  const closeSuccessModal = () => {
    setSuccessModalShow(false)
    dispatch(clearHashValue())
  }

  useEffect(() => {
    if (hashID || error) {
      openSuccessModal()
      setTimeout(() => {
        closeSuccessModal()
      }, 15000)
    }
  }, [hashID, error])

  // loader
  const [loadingShow, setLoadingShow] = useState(false)

  useEffect(() => {
    if (loading) {
      setLoadingShow(true)
      closeTokenModal()
    } else {
      setLoadingShow(false)
    }
  }, [loading])

  const closeLoadingModal = () => {
    setLoadingShow(false)
  }

  return (
    <>
      <div className='section__one'>
        <Container>
          <Row>
            <Col xl={4} lg={4} md={6} sm={12} xs={12} className='mb-2'>
              <div className='banner__one__box justify-content-center'>
                <div className='banner__one__box__left'>
                  <h5 className='text-center'>Capital Tokens (CCUSD)</h5>
                  <p className='txt__gray text-center mt-3'>
                    Capital Tokens are more volatile coins with a higher return
                    which represent an interest in a portfolio of commercial
                    loans the price of which will move up and down with the
                    movement in interest rates.
                  </p>
                  <section className='text-center mt-4'>
                    <button
                      onClick={userAddress ? (e) => openTokenModal(e) : null}
                      className={
                        userAddress
                          ? 'btn_brand'
                          : 'btn_brand btn_brand_disabled'
                      }
                    >
                      Buy CCUSD
                    </button>
                  </section>
                </div>
              </div>
            </Col>
            <Col xl={4} lg={4} md={6} sm={12} xs={12} className='mb-2'>
              <div className='banner__one__box justify-content-center'>
                <div className='banner__one__box__left'>
                  <h5 className='text-center'>Credit Tokens (CRET)</h5>
                  <p className='txt__gray text-center mt-3'>
                    Credit Tokens are stable coins with a steady return which
                    will facilitate loan insurance by guaranteeing the interest
                    and principal payments of commercial borrowers for a fee
                    payment which generates additional tokens.
                  </p>
                  <section className='text-center mt-4'>
                    <button
                      onClick={userAddress ? (e) => openTokenModal(e) : null}
                      className={
                        userAddress
                          ? 'btn_brand'
                          : 'btn_brand btn_brand_disabled'
                      }
                    >
                      Buy CRET
                    </button>
                  </section>
                </div>
              </div>
            </Col>
            <Col xl={4} lg={4} md={6} sm={12} xs={12} className='mb-2'>
              <div className='banner__one__box  justify-content-center'>
                <div className='banner__one__box__left'>
                  <h5 className='text-center'>
                    Credit Capital Protocol Token (CAPL)
                  </h5>
                  <p className='txt__gray text-center mt-3'>
                    Get Credit Capital Protocol token CAPL , a governance token
                    against CRT tokens or CCUSD tokens
                  </p>
                  <section className='text-center' style={{marginTop: '63px'}}>
                    <button
                      onClick={userAddress ? (e) => openTokenModal(e) : null}
                      className={
                        userAddress
                          ? 'btn_brand'
                          : 'btn_brand btn_brand_disabled'
                      }
                    >
                      Get CAPL
                    </button>
                  </section>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <ReserveToken
        name={modalTitle}
        show={show}
        handleClose={closeTokenModal}
      />
      <BuyCCPTToken
        name={modalTitle}
        show={showCCPTModal}
        handleClose={closeTokenModal}
      />
      <SuccessMessageToken
        show={successModalShow}
        handleClose={closeSuccessModal}
      />
      <LoadingModalToken show={loadingShow} handleClose={closeLoadingModal} />
    </>
  )
}

export default BuyTokens
