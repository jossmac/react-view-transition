import React, { Component } from 'react';
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
  {
    key: 'first',
    para:
      'Cupcake ipsum dolor sit. Amet soufflé carrot cake tootsie roll jelly-o chocolate cake.',
  },
  {
    key: 'second',
    para:
      'Chocolate bar gummies sweet roll macaroon powder sweet tart croissant. Pastry ice cream bear claw cupcake topping caramels jelly beans chocolate cheesecake. Candy canes pastry cake tart powder.',
  },
  {
    key: 'third',
    para:
      'Tootsie roll bear claw sesame snaps candy cheesecake caramels cookie. Lemon drops donut marzipan gummi bears cotton candy cotton candy jelly-o carrot cake. Lemon drops pastry apple pie biscuit tart tootsie roll.',
  },
  {
    key: 'fourth',
    para:
      'Brownie icing chupa chups cake cookie halvah gummi bears halvah. Sesame snaps donut gingerbread marshmallow topping powder. Biscuit chocolate cheesecake pudding candy canes tart halvah sweet. Sugar plum cake candy carrot cake.',
  },
  {
    key: 'fifth',
    para:
      'Ice cream marzipan liquorice candy canes sesame snaps danish soufflé lollipop candy canes. Lemon drops cotton candy pudding.',
  },
  {
    key: 'sixth',
    para:
      'Pie cake soufflé cupcake jujubes sugar plum. Liquorice lollipop oat cake.',
  },
];

function getRandom() {
  const index = Math.floor(Math.random() * paragraphs.length);
  return paragraphs[index];
}

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
  update = () => {
    const paragraph = getRandom();
    this.setState({ paragraph });
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
          <div style={{ paddingBottom: '1em', position: 'relative' }}>
            <TransitionProvider index={currentIndex}>
              {paragraphs.map((p, i) => (
                <div key={p.key}>
                  <h1>{i}</h1>
                  <p>{p.para}</p>
                </div>
              ))}
            </TransitionProvider>
          </div>

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
