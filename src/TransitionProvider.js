// @flow

import React, { cloneElement, Children, Component, type Element } from 'react';
import NodeResolver from 'react-node-resolver';
import { Transition, TransitionGroup } from 'react-transition-group';

type Props = {
  children: Element<*>,
  index: number,
  onChange?: Height => any,
};
type State = {
  isNext: boolean,
  height: number,
};

const View = ({ children, innerRef, exitPosition, ...props }) => {
  const base = {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    transition: 'transform 220ms cubic-bezier(0.2, 0, 0, 1)',
  };
  const states = {
    entering: { transform: `translateX(0)` },
    entered: { transform: `translateX(0)` },
    exiting: { transform: `translateX(${exitPosition})` },
    exited: { transform: `translateX(${exitPosition})` },
  };
  return (
    <Transition mountOnEnter unmountOnExit timeout={220} {...props}>
      {state => {
        const style = { ...base, ...states[state] };

        return (
          <div style={style} ref={innerRef}>
            {children}
          </div>
        );
      }}
    </Transition>
  );
};

export default class TransitionProvider extends Component<Props, State> {
  state = { height: 0, isNext: false };

  // TODO find a way around this
  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const isNext = nextProps.index > this.props.index;
    this.setState({ isNext });
  }

  getHeight = (ref: HTMLElement) => {
    if (!ref) return;
    const height = ref.scrollHeight;
    this.setState({ height });
  };
  group = (props: Props) => {
    const transition = 'height 220ms cubic-bezier(0.2, 0, 0, 1)';
    const { height } = this.state;

    return (
      <div
        style={{
          height,
          maxWidth: '100%',
          overflow: 'hidden',
          position: 'relative',
          transition,
        }}
        {...props}
      />
    );
  };
  childFactory = (child: Element<*>) => {
    const { index } = this.props;
    const { isNext } = this.state;
    const isLeaving = child.props.index !== index;
    const exitPosition =
      (isNext && isLeaving) || (!isNext && !isLeaving) ? '-100%' : '100%';

    return cloneElement(child, { exitPosition });
  };
  render() {
    const { children, height, index } = this.props;
    const child = Children.toArray(children)[index];

    return (
      <TransitionGroup component={this.group} childFactory={this.childFactory}>
        <View
          index={index}
          children={child}
          innerRef={this.getHeight}
          key={index}
        />
      </TransitionGroup>
    );
  }
}
