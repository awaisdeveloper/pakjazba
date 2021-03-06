import React, { Component } from 'react';
import { Input } from 'antd';

class ProductFaq extends Component{
  render(){
    return(
      <div className="container" style={{width:"85%"}}>
        <div className="vitalbox">
          <div className="row" style={{paddingLeft:"80px", paddingRight:"80px"}}>
            <Input placeholder="Have a Question? Seach For Answers" />
            <div>
              <span>
              <p> <strong>Question:</strong> Will this work on the switch?</p>
              </span>
              <span>
              <p> <strong>Answer:</strong> The Nitendo Switch has a capacity for a micro SD up to 2 TB (Terabytes) any card of a smaller cpacity would be work just fine</p>
              </span>

            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default ProductFaq;
