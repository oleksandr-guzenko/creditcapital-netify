import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Pages
import NotFound from './Pages/NotFound'
import Portfolio from './Pages/Portfolio'
import Swap from './Pages/Swap'
import Liquidity from './Pages/Liquidity'
import Vault from './Pages/Vault'
import Admin from './Pages/Admin'

// components
import Header from './Components/Header'
import Footer from './Components/Footer'
import ArrowUp from './Components/ArrowUp'

function App() {
  return (
    <div className='app'>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={Vault} />
          <Route path='/portfolio' component={Portfolio} />
          <Route path='/swap' component={Swap} />
          <Route path='/liquidity' component={Liquidity} />
          <Route path='/admin' component={Admin} />
          <Route path='*' component={NotFound} />
        </Switch>
        <ArrowUp />
        <Footer />
      </Router>
    </div>
  )
}

export default App
