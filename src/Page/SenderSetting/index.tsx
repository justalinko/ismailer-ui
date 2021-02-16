import { Card  } from '../../molecules/card'
import {Input , InputProps } from '../../atom/input';
import '../../atom/button.css';
import React from "react";

interface myProps {

}

interface myState {
  addComponent? : number
}

export class SenderSettingPage extends React.Component<myProps , myState> {
  constructor(props : myProps){
    super(props);

    this.state = {
      addComponent : 0
    }
  }

  handleAddComponent(){
    this.setState({
      addComponent : +1
    })
  }


  render() {
    return (
      <div style={{ marginLeft: "25%" }}>
        <div className="w3-container text-center py-3 w3-red">
          <h1>isMailer</h1>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="ml-3 mt-3">
              <div className="card" style={{position : 'relative'}}>
                <div className="card-body text-left">
                  <Card />
                  <button className="button " onClick={() => this.handleAddComponent} >add</button>
                  {
                    this.state.addComponent
                  }
                </div>
             </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}
