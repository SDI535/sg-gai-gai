import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
import reportWebVitals from "./reportWebVitals";
import Body from "./Screens/Body/Body";
import Header from "./Screens/Header/Header";
import Footer from "./Screens/Footer/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <>
    <Router basename="/sg-gai-gai">
      <Header />
      <Switch>
        <Redirect exact from="/" to="/Bus/mapview" />
        <Route path="/:tabId">
          <Body />
        </Route>
      </Switch>

      <Footer></Footer>
    </Router>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
