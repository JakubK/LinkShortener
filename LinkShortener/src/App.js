import React, { Component } from 'react';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import Footer from './components/footer/footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Home/>
        <Footer/>
      </div>
    );
  }
}

export default App;