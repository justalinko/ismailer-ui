import React from "react";
export class SenderSettingPage extends React.Component {
  render() {
    return (
      <div style={{ marginLeft: "25%" }}>
        <div className="w3-container w3-red">
          <h1>isMailer</h1>
        </div>
        <div className="w3-container">
          <div className="w3-grid">
            <div className="w3-col m6 s12 l6">
              <h3>Email list</h3>
              <textarea className="w3-input w3-border" style={{ width: "90%", margin: "0 auto", height: "200px" }}></textarea>
            </div>
            <div className="w3-col m6 s12 l6">
              <h3>Letter</h3>
              <textarea className="w3-input w3-border" style={{ width: "90%", margin: "0 auto", height: "200px" }}></textarea>
              <input type="radio" name="mime" value="plain" />
              Plain/Text <b>|</b> <input type="radio" name="mime" value="html" />
              HTML
            </div>
          </div>
        </div>
      </div>
    );
  }
}
