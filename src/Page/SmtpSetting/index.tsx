import { Input  } from '../../atom/input'
import {Button} from '../../atom/button'
import React from "react";


export class SmtpSettingPage extends React.Component {
 
  render() {
    return (
      <div style={{ marginLeft: "25%" }}>
        <div className="d-flex justify-content-center py-3 w3-red">
          <h1>SMTP Setting</h1>
        </div>

        <div className="row">
          <div className="col-md-6 m-3">
            <div className="card">
              <div className="card-body">
                  <Input label="Host" />
                  <Input label="Port" />
                  <Button button="add" />
              </div>
            </div> 
          </div>
        
        </div>
       
      </div>
    );
  }
}
