import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import {
  Anchor,
  Code,
  Container,
  Footer,
  Header,
  Icon,
  Repo,
  Title,
} from './styled';
import './index.css';
import TransitionProvider from '../../src';

// data
// ------------------------------

const paragraphs = [
  'Cupcake ipsum dolor sit. Amet soufflé carrot cake tootsie roll jelly-o chocolate cake.',
  'Chocolate bar gummies sweet roll macaroon powder sweet tart croissant. Pastry ice cream bear claw cupcake topping caramels jelly beans chocolate cheesecake. Candy canes pastry cake tart powder.',
  'Tootsie roll bear claw sesame snaps candy cheesecake caramels cookie. Lemon drops donut marzipan gummi bears cotton candy cotton candy jelly-o carrot cake. Lemon drops pastry apple pie biscuit tart tootsie roll.',
  'Brownie icing chupa chups cake cookie halvah gummi bears halvah. Sesame snaps donut gingerbread marshmallow topping powder. Biscuit chocolate cheesecake pudding candy canes tart halvah sweet. Sugar plum cake candy carrot cake.',
  'Ice cream marzipan liquorice candy canes sesame snaps danish soufflé lollipop candy canes. Lemon drops cotton candy pudding.',
  'Pie cake soufflé cupcake jujubes sugar plum. Liquorice lollipop oat cake.',
];

const BigNumber = props => (
  <div
    style={{ fontSize: 36, fontWeight: 'bold', marginBottom: '0.5em' }}
    {...props}
  />
);
const Views = props => (
  <div
    style={{
      borderBottom: '3px double #eee',
      borderTop: '3px double #eee',
      marginBottom: '1em',
      paddingBottom: '1em',
      paddingTop: '1em',
    }}
    {...props}
  />
);

// example
// ------------------------------

class App extends Component {
  state = { currentIndex: 0 };
  next = () => {
    if (this.state.currentIndex + 1 === paragraphs.length) return;
    this.setState(state => ({ currentIndex: state.currentIndex + 1 }));
  };
  prev = () => {
    if (this.state.currentIndex === 0) return;
    this.setState(state => ({ currentIndex: state.currentIndex - 1 }));
  };
  render() {
    const { currentIndex } = this.state;
    return (
      <Container>
        <div>
          <Header>
            <Icon role="img" className="animate-dropin">
              🎟
            </Icon>
            <Title>
              Animate views as they mount/unmount with{' '}
              <Repo href="https://github.com/jossmac/react-view-transition">
                react-view-transition
              </Repo>
            </Title>
          </Header>

          <p>
            <button onClick={this.prev} disabled={currentIndex === 0}>
              prev
            </button>
            <button
              onClick={this.next}
              disabled={currentIndex + 1 === paragraphs.length}
            >
              next
            </button>
          </p>

          <Views>
            <TransitionProvider index={currentIndex}>
              {paragraphs.map((p, i) => (
                <Fragment key={i}>
                  <BigNumber>{i + 1}</BigNumber>
                  <p>{p}</p>
                </Fragment>
              ))}
            </TransitionProvider>
          </Views>

          <Footer>
            <span> by </span>
            <a href="https://twitter.com/jossmackison" target="_blank">
              @jossmac
            </a>{' '}
            &middot; paragraphs from{' '}
            <a href="http://www.cupcakeipsum.com" target="_blank">
              Cupcake Ipsum
            </a>
          </Footer>
        </div>
      </Container>
    );
  }
}

// render
// ------------------------------

render(<App />, document.getElementById('root'));
