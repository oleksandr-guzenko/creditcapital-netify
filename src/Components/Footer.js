import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// SVgs
import PaperIcon from '../Assets/social_icons/rocket.svg'
import DiscordIcon from '../Assets/social_icons/discord.svg'
import TwitterIcon from '../Assets/social_icons/twitter.svg'
import FbIcon from '../Assets/social_icons/fb.svg'
import MediumIcon from '../Assets/social_icons/medium.svg'

const Footer = () => {
  return (
    <footer>
      <div className='footer__bottom'>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={7} xl={7}>
              <div className='footer__bottom__left'>
                <p>
                  &copy; {new Date().getFullYear()} CreditCapital All rights
                  reserved
                </p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={5} xl={5}>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
