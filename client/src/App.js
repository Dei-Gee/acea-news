import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import './App.css';

//imported components
import About from './components/About/About';
import Admin from './components/Admin/Admin';
import Contact from './components/Contact/Contact';
import Chosen from './components/Home/chosen';
import FAQ from './components/FAQ/FAQ';
import ReadStories from './components/ReadStories/ReadStories';
import ErrorPage from './components/Error/Error';
import Header from './components/Header/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer/Footer';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="wrapper">
              <Header />

              <div className="main-content">
                <Navigation />

                <Switch>
                  <Route path="/" component={Home} exact />
                  <Route path="/about" component={About} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/faq" component={FAQ} />
                  <Route path="/stories/page/:page_number" component={ReadStories} />
                  <Route path="/admin" component={Admin} />
                  <Route path="/story" component={Chosen} />
                  <Route component={ErrorPage} />              
                </Switch>
              </div>

              <div className="footer-div">
                <Footer />
              </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
