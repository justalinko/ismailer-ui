import { Component  } from 'react';
import './input.css';

export interface InputProps{
    label : string
}

class Input extends Component<InputProps> {
    render(){
        let {label} = this.props
        return(
            <div className="d-flex flex-column text-left inputan" style={{position : "relative"}}>
                <label htmlFor="from" id="label">{label}</label>
                <input type="text" name="from" id="from"/>
            </div>
        )
    }
}



export { Input }
