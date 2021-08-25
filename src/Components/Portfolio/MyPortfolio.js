import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import PortfolioCard from './PortfolioCard'
import card_one from '../../Assets/portfolio/card_one.svg'
import card_two from '../../Assets/portfolio/card_two.svg'
import card_three from '../../Assets/portfolio/card_three.svg'
import card_four from '../../Assets/portfolio/card_four.svg'
import card_five from '../../Assets/portfolio/card_five.svg'

const MyPortfolio = () => {
  return (
    <div className='portfolio'>
      <Container>
        <div className='portfolio__container'>
          <h4>My Portfolio</h4>
          <div className='portfolio__cards__container'>
            <PortfolioCard
              bgColor='#e5def0'
              amount='$1,542.02'
              text='Total Rewards Earned'
              icon={card_one}
            />
            <PortfolioCard
              bgColor='#D6EDD9'
              amount='5,552.52'
              text='CPT balance'
              icon={card_two}
            />
            <PortfolioCard
              bgColor='#F6F0D8'
              amount='9,151.52'
              text='CRT balance'
              icon={card_three}
            />
            <PortfolioCard
              bgColor='#D8E4F6'
              amount='$1,542.02'
              text='CPT LP Balance'
              icon={card_four}
            />
            <PortfolioCard
              bgColor='#F6D8D8'
              amount='$1,542.02'
              text='CRT LP Balance'
              icon={card_five}
            />{' '}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default MyPortfolio
