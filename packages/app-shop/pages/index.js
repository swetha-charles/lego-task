import React from 'react';
import App from '../components/App';
import Header from '../components/Header';
import Container from '../components/Container';

const IndexPage = () => (
  <App>
    <Header />
    <Container>
      <h1>The LEGO History</h1>
      <p>
        Founded in 1932 by Ole Kirk Kristiansen, and based on the iconic LEGO
        brick, it is one of the world’s leading manufacturers of play materials.
      </p>
      <br />

      <p>
        <a
          href="https://www.lego.com/en-gb/aboutus/lego-group/the-lego-group-history"
          title="See a timeline of our history"
        >
          LEGO history timeline overview &gt;
        </a>
      </p>
      <p>
        <a
          href="https://www.lego.com/en-us/lego-history"
          title="Deep dive into the history of the LEGO Group"
        >
          LEGO history deep dive &gt;
        </a>
      </p>
      <h1>18,000+ people in 15 countries</h1>
      <img className="full-width" alt="LEGO Logo" src="assets/lego-map.jpg" />
      <h2>Supporting a more creative and resilient society</h2>
      <span className='logoPadding'>
        <a href="https://education.lego.com" title="LEGO Education website">
          <img
              alt="LEGO Education Logo"
              src="assets/logo-education.jpg"
              width="200"
          />
        </a>
      </span>
      <span className='logoPadding'>
        <a
          href="https://www.legofoundation.com"
          title="Visit the LEGO Foundation website"
        >
          <img
              alt="LEGO Foundation Logo"
              src="assets/logo-foundation.jpg"
              width="200"
          />
        </a>
      </span>
      <span className='logoPadding'>
        <a href="https://www.legohouse.com" title="Visit LEGO House's website">
          <img alt="LEGO House Logo" src="assets/logo-house.jpg" width="200" />
        </a>
      </span>
    </Container>
  </App>
);

export default IndexPage;
