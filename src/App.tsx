import React from "react";
import "./App.css";
import "./Styles/w3.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { SenderSettingPage } from "./Page/SenderSetting";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { SmtpSettingPage } from "./Page/SmtpSetting";
import { AboutPage } from "./Page/About";
import { LicensePage } from "./Page/License";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="w3-sidebar w3-light-grey w3-bar-block" style={{ width: "25%" }}>
          <h3 className="w3-bar-item">isMailer v1.0</h3>
          <Link to="/smtp" className="w3-bar-item w3-button">
            SMTP Settings
          </Link>
          <Link to="/sender" className="w3-bar-item w3-button">
            Sender Settings
          </Link>
          <Link to="/about" className="w3-bar-item w3-button">
            About
          </Link>
          <Link to="/license" className="w3-bar-item w3-button">
            License
          </Link>
        </div>
        <Switch>
          <Route exact path="/sender" component={SenderSettingPage} />
          <Route exact path="/smtp" component={SmtpSettingPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/license" component={LicensePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
