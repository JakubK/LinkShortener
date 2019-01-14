import React, { Component } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';

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
