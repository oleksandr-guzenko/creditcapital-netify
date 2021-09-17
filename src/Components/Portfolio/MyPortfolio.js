import React, {useEffect} from 'react'
import {Container} from 'react-bootstrap'
import PortfolioCard from './PortfolioCard'
import {numberFormate} from '../../Utilities/Util'

// Svgs
import card_one from '../../Assets/portfolio/card_one.svg'
import card_two from '../../Assets/portfolio/card_two.svg'
import card_three from '../../Assets/portfolio/card_three.svg'
import card_four from '../../Assets/portfolio/card_four.svg'
import card_five from '../../Assets/portfolio/card_five.svg'
// Redux Imports
import {useDispatch, useSelector} from 'react-redux'
import {
  disConnectWallet,
  getProfileInformation,
} from '../../Redux/Profile/actions'

const MyPortfolio = () => {
  // Redux State
  const dispatch = useDispatch()
  const {
    userAddress,
    availableBalance,
    profileLoading,
    cptBalance,
    crtBalance,
    crtLPBalance,
    cptLPBalance,
    totalRewardsEarned,
  } = useSelector((state) => state.profile)
  useEffect(() => {
    if (userAddress) {
      dispatch(getProfileInformation())
    }
  }, [userAddress])

  const handleDisconnect = () => {
    dispatch(disConnectWallet())
  }
  return (
    <div className='portfolio'>
      <Container>
        <div className='portfolio__container'>
          <div className='d-flex align-items-start justify-content-between mb-3 flex-wrap'>
            <h4>My Portfolio</h4>
            <button className='btn_brand' onClick={handleDisconnect}>
              Disconnect
            </button>
          </div>
          <div className='portfolio__cards__container'>
            <PortfolioCard
              bgColor='#e5def0'
              amount={`$ ${numberFormate(cptLPBalance)}`}
              text='Total Rewards Earned'
              icon={card_one}
            />
            <PortfolioCard
              bgColor='#D6EDD9'
              amount={numberFormate(cptBalance)}
              text='CAPL balance'
              icon={card_two}
            />
            <PortfolioCard
              bgColor='#F6F0D8'
              amount={numberFormate(crtBalance)}
              text='CRET balance'
              icon={card_three}
            />
            <PortfolioCard
              bgColor='#D8E4F6'
              amount={`$ ${numberFormate(cptLPBalance)}`}
              text='CAPL LP Balance'
              icon={card_four}
            />
            <PortfolioCard
              bgColor='#F6D8D8'
              amount={`$ ${numberFormate(crtLPBalance)}`}
              text='CRET LP Balance'
              icon={card_five}
            />{' '}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default MyPortfolio
