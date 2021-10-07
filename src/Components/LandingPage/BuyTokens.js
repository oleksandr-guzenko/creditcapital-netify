import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import ReactLoading from 'react-loading'
import {useDispatch, useSelector} from 'react-redux'
import {clearHashValue} from '../../Redux/BuyCAPTAndCRET/actions'
import ReserveToken from '../Modals/BuyCAPLAndCRET/ReserveToken'
import LoadingModalToken from '../Modals/BuyCAPLAndCRET/LoadingModalToken'
import SuccessMessageToken from '../Modals/BuyCAPLAndCRET/SuccessMessageToken'

const BuyTokens = () => {
  // Redux State
  const dispatch = useDispatch()

  const {userAddress} = useSelector((state) => state.profile)
  const {hashID, loading, error} = useSelector((state) => state.buyTokens)

  const [show, setShow] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  // Buy TokenModal
  const openTokenModal = (e) => {
    setShow(true)
    setModalTitle(e.target.textContent)
  }
  const closeTokenModal = () => {
    setShow(false)
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
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className='banner__one__box justify-content-center'>
                <div className='banner__one__box__left'>
                  <h5 className='text-center'>Capital Tokens (CAPL)</h5>
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
                      Buy CAPL
                    </button>
                  </section>
                </div>
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
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
          </Row>
        </Container>
      </div>
      <ReserveToken
        name={modalTitle}
        show={show}
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
