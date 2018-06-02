// @flow

import React, { cloneElement, Children, Component, type Element } from 'react';
import NodeResolver from 'react-node-resolver';
import { Transition, TransitionGroup } from 'react-transition-group';

type Height = number | string;
type Props = {
  alpha: boolean,
  children: Element<*>,
  initial: Height,
  index: number,
  onChange?: Height => any,
  tag: string,
};
type State = { height: Height };

function getStyle(element, key, parse) {
  const style = element.currentStyle || window.getComputedStyle(element);
  return key ? (parse ? parseInt(style[key]) : style[key]) : style;
}
function uniqueId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

export default class TransitionProvider extends Component<Props, State> {
  transitionId = uniqueId();
  direction: 'next' | 'prev';
  behaviour: 'entering' | 'leaving';
  state = { height: this.props.initial };
  static defaultProps = { alpha: true, initial: 0, tag: 'div' };

  getSnapshotBeforeUpdate(prevProps: Props) {
    if (this.props.index > prevProps.index) {
      return { direction: 'next' };
    }
    if (this.props.index < prevProps.index) {
      return { direction: 'prev' };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      this.direction = snapshot.direction;
    }
  }

  onEnter = (idx, key) => () => {
    // this.behaviour = idx === this.props.index ? 'entering' : 'leaving';
    this.enterIndex = idx;
  };
  onExited = (idx, key) => () => {
    this.exitIndex = idx;
  };
  getHeight = ref => {
    if (!ref) return;
    this.setState({ height: ref.scrollHeight });
  };
  group = props => {
    const transition = 'height 220ms cubic-bezier(0.2, 0, 0, 1)';
    const { height } = this.state;
    return <div style={{ height, transition }} {...props} />;
  };
  render() {
    const { children, index } = this.props;
    const { height } = this.state;

    return (
      <TransitionGroup component={this.group}>
        {children
          ? Children.map(children, (child, idx) => {
              return idx === index ? (
                <Transition
                  mountOnEnter
                  unmountOnExit
                  timeout={220}
                  onEnter={this.onEnter(idx, child.key)}
                  onExited={this.onExited(idx, child.key)}
                >
                  {state => {
                    const base = {
                      boxSizing: 'border-box',
                      position: 'absolute',
                      width: '100%',
                      transition: 'transform 220ms cubic-bezier(0.2, 0, 0, 1)',
                    };

                    console.log('direction', this.direction);
                    console.log('behaviour', this.enterIndex === idx);
                    let states;
                    if (this.enterIndex === idx) {
                      console.log('behaviour is ENTERING', child.key);
                      states =
                        this.direction === 'next'
                          ? {
                              entering: { transform: 'translateX(0)' },
                              entered: { transform: 'translateX(0)' },
                              exiting: { transform: 'translateX(-100%)' },
                              exited: { transform: 'translateX(-100%)' },
                            }
                          : {
                              entering: { transform: 'translateX(0)' },
                              entered: { transform: 'translateX(0)' },
                              exiting: { transform: 'translateX(100%)' },
                              exited: { transform: 'translateX(100%)' },
                            };
                    } else {
                      states =
                        this.direction === 'next'
                          ? {
                              entering: { transform: 'translateX(0)' },
                              entered: { transform: 'translateX(0)' },
                              exiting: { transform: 'translateX(-100%)' },
                              exited: { transform: 'translateX(-100%)' },
                            }
                          : {
                              entering: { transform: 'translateX(0)' },
                              entered: { transform: 'translateX(0)' },
                              exiting: { transform: 'translateX(100%)' },
                              exited: { transform: 'translateX(100%)' },
                            };
                    }
                    // console.log('states', states);
                    const style = { ...base, ...states[state] };

                    return (
                      <div style={style} ref={this.getHeight}>
                        {child}
                      </div>
                    );
                  }}
                </Transition>
              ) : null;
            })
          : null}
      </TransitionGroup>
    );
  }
}
