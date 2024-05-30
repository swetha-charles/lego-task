import React from 'react';
import App from '../components/App';
import Header from '../components/Header';
import Container from '../components/Container';

const AboutPage = () => (
  <App>
    <Header />
    <article>
      <Container>
        <h1>The LEGO® Brand Values</h1>
      </Container>
      <img
        className="full-width"
        alt="LEGO Logo"
        src="assets/the-lego-brand-title.jpg"
      />
      <Container>
        <h2>Imagination</h2>
        <p>
          Free play is how children develop their imagination – the foundation
          for creativity. Curiosity asks WHY and imagines possible explanations.
          Playfulness asks WHAT IF and imagines how the ordinary becomes
          extraordinary, fantasy or fiction. Dreaming it is a first step towards
          doing it.
        </p>
        <h2>Creativity</h2>
        <p>
          Creativity is the ability to come up with ideas that are new,
          surprising and valuable - and it’s an essential 21st century skill.
          Systematic creativity is a particular form of creativity that combines
          logic and reasoning with playfulness and imagination.
        </p>
        <h2>Fun</h2>
        <p>
          Fun is being active together, the thrill of an adventure, the joyful
          enthusiasm of children and the delight in surprising both yourself and
          others in what you can do or create. Fun is the happiness we
          experience when we are fully engaged in something that requires
          mastery, when our abilities are in balance with the challenge at hand
          and we are making progress towards a goal.
        </p>
        <h2>Learning</h2>
        <p>
          Learning is about being curious, experimenting and collaborating –
          expanding our thinking and doing, helping us develop new insights and
          new skills. We learn through play by putting things together, taking
          them apart and putting them together in different ways. Building,
          un-building, rebuilding, thereby creating new things and developing
          new ways of thinking about ourselves, and the world.
        </p>
        <h2>Caring</h2>
        <p>
          Caring is about our desire to make a positive difference in the lives
          of children, for our colleagues, our partners, and the world we live
          in. Doing that little extra, not because we have to – but because it
          feels right and because we care.
        </p>
        <h2>Quality</h2>
        <p>
          For us quality means the challenge of continuous improvement to
          provide the best play material, the best for children and their
          development and the best to our community and partners. From a
          reputation for manufacturing excellence to becoming trusted by all –
          we believe in quality that speaks for itself and earns us the
          recommendation of all.
        </p>
      </Container>
    </article>
  </App>
);

export default AboutPage;
