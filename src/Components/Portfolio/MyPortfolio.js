import React, {useEffect} from 'react'
import {Container} from 'react-bootstrap'
import PortfolioCard from './PortfolioCard'
import {exactNumberFormate, numberFormate} from '../../Utilities/Util'

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
  getProfileInformationTest,
} from '../../Redux/Profile/actions'

const MyPortfolio = () => {
  // Redux State
  const dispatch = useDispatch()
  const {
    userAddress,
    availableBalance,
    CAPLBalance,
    CRETBalance,
    CCPTBalance,
    totalRewards,
    lpCAPLBalance,
    lpCRETBalance,
  } = useSelector((state) => state.profile)
  const {
    lpCRETBalance: a,
    lpCAPLBalance: b,
    testUSDC: c,
  } = useSelector((state) => state.testProfile)
  useEffect(() => {
    if (userAddress) {
      dispatch(getProfileInformation())
      dispatch(getProfileInformationTest())
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
              amount={`$ ${numberFormate(CCPTBalance)}`}
              text='CAPL Balance'
              icon={card_one}
            />
            <PortfolioCard
              bgColor='#D6EDD9'
              amount={numberFormate(CAPLBalance)}
              text='CCUDC balance'
              icon={card_two}
            />
            <PortfolioCard
              bgColor='#F6F0D8'
              amount={numberFormate(CRETBalance)}
              text='CRET balance'
              icon={card_three}
            />
            <PortfolioCard
              bgColor='#D8E4F6'
              amount={`$ ${numberFormate(lpCAPLBalance || a)}`}
              text='CCUDC LP Balance'
              icon={card_four}
            />
            <PortfolioCard
              bgColor='#F6D8D8'
              amount={`$ ${numberFormate(lpCRETBalance || b)}`}
              text='CRET LP Balance'
              icon={card_five}
            />
            <PortfolioCard
              bgColor='#F6D8D8'
              amount={`$ ${numberFormate(availableBalance || c)}`}
              text='USDC Balance'
              icon={card_five}
            />
            <PortfolioCard
              bgColor='#e5def0'
              amount={`$ ${numberFormate(totalRewards)}`}
              text='Total Rewards Earned'
              icon={card_one}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default MyPortfolio
