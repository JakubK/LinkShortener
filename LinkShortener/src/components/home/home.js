
import React from 'react'
import './home.css'
import { connect } from 'react-redux';

class HomeStub extends React.Component
{
  render()
  {
    return (
    <main className="home">
      <div className="home-container">
        <input className="home-input" placeholder="Paste your link here..." type="text"/>
        <input className="home-input" placeholder="Set password (optional)" type="password"/>
        <button className="btn-shorten">Shorten</button>

        <svg className="output-arrow" aria-hidden="true" data-prefix="fas" data-icon="arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"></path></svg>

        <p className="output-link">samplelink:8080/Axasdasd</p>
      </div>
    </main>
    )
  }
}

const mapStateToProps = ({token}) => {
  return {
    token: token.token
  };
};

const Home = connect(mapStateToProps)(HomeStub);

export default Home;