# React View Transition

Animate views as they mount/unmount.

https://jossmac.github.io/react-view-transition

```jsx
import TransitionProvider from 'react-view-transition';

const Slider = ({ views }) => (
  <TransitionProvider>
    {views.map(v => <div key={v.key}>{v.label}</div>)}
  </TransitionProvider>
);
Slider.defaultProps = {
  views: [
    { key: 'first', label: 'First View' },
    { key: 'second', label: 'Second View' },
    { key: 'third', label: 'Third View' },
  ],
};
```
