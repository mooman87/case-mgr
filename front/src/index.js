import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// document.onkeydown = (e) => {
//   e = e || window.event;
//   if (e.key == 'F12') {
//     e.preventDefault();
//     return alert('You can view this code for $500,000 😉');
//   } else if (e.ctrlKey && e.shiftKey && e.key == 'I') {
//     e.preventDefault();
//     return alert('You can view this code for $500,000 😉');
//   } 
// };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
