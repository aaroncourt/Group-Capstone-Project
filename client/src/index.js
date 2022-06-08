import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// code for possible feature update
// const FunctionsJS = (props) => {
//   function showComment(ele){
//     console.log("show comment triggered")
//     const searchDiv = document.getElementById(ele).classList;
//     const test = document.getElementById(ele)
//     console.log(test)
//     searchDiv.remove('hidden');
//     // searchDiv.add('flex');
//     return
//   }
  
//   function hideComment(ele){
//     const searchDiv = document.getElementById(ele).classList;
//     // searchDiv.remove('flex');
//     searchDiv.add('hidden');
//     console.log(searchDiv)
//     return
//   }
// };

// export default FunctionsJS