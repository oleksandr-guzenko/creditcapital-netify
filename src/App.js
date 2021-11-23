import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Pages
import LandingPage from './Pages/LandingPage'
import CreditGuarantyPool from './Pages/CreditGuarantyPool'
import NotFound from './Pages/NotFound'
// import TrusteeLandingPage from './Pages/Trustees/TrusteeLandingPage'
// import TrusteeCreditGuarantyPool from './Pages/Trustees/TrusteeCreditGuarantyPool'
import Portfolio from './Pages/Portfolio'
import Farming from './Pages/Farming'
import Swap from './Pages/Swap'
import Liquidity from './Pages/Liquidity'
import Vault from './Pages/Vault'

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
          <Route path='/' exact component={LandingPage} />
          <Route path='/credit-guaranty-pool' component={CreditGuarantyPool} />
          {/* <Route path='/trustee' component={TrusteeLandingPage} /> */}
          {/* <Route
            path='/trustee_credit_guaranty_pool'
            component={TrusteeCreditGuarantyPool}
          /> */}
          <Route path='/farming' component={Farming} />
          <Route path='/portfolio' component={Portfolio} />
          <Route path='/swap' component={Swap} />
          {/* <Route path='/liquidity' component={Liquidity} /> */}
          <Route path='/vault' component={Vault} />
          
          <Route path='*' component={NotFound} />
        </Switch>
        <ArrowUp />
        <Footer />
      </Router>
    </div>
  )
}

export default App