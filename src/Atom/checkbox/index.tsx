import React, { InputHTMLAttributes } from 'react';


export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>{
    label : string,
    idForCheckBox? : string
}

export class Checkbox extends React.Component<CheckboxProps>{
    render(){
        const { idForCheckBox , label } = this.props
        return(
            <div className="form-check d-flex align-items-center" id={idForCheckBox} style={{ width : '30%', position: 'relative' , marginLeft: "1%" }}>
                <input type="checkbox" style={{width : 'fit-content'}} className="form-check-input"/>
                <label htmlFor={idForCheckBox} style={{ position: 'relative' , marginLeft:'30px' }} > {idForCheckBox} </label>
            </div>
        )
    }
}