import React from 'react'
import {Container} from 'react-bootstrap'
import {BsArrowLeft} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='notfound'>
      <Container>
        <div className='__wrapper'>
          <h1>404</h1>
          <h4>NotFound</h4>
          <Link to='/'>
            <button className='btn_brand'>
              <span>
                <BsArrowLeft />
              </span>{' '}
              Back To Home
            </button>
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default NotFound
