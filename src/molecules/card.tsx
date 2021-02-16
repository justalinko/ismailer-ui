import {Input  } from '../atom/input';
import {Button } from '../atom/button';
import React from 'react';


class Card extends React.Component{
  render(){
    return(
        <div>
     
                    <Input label="From Name" />
                    <Input label="From Email" />
                    <Input label="Subject" />
                  
           
        </div>
    )
  }
}


export{
    Card
}


