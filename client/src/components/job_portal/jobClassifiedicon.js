import React, { Component } from 'react';
import './jobClassifiedicon.css';
import { connect } from 'react-redux'

class ClassifiedIcons extends Component{
    constructor(props){
        super(props);
        this.clickItem = this.clickItem.bind(this);
    }

    clickItem(item){
        const { dispatch } = this.props;
        var inputValue = item;
        dispatch({type: 'SEARCHON', inputValue})
    }

    render(){
        return(
            <span>


            <div className="container" style={{width:'71%'}}>
                <h2 style={{textAlign:"center", fontWeight:"bold", marginTop:"20px"}}> Categories </h2>
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12"  onClick={() => {this.clickItem('Accounting')}} >
                      <div className="jobIconbox">
                        <div className="jobIconbox-topimage_header" style={{border:'1px solid black',padding:'15px', textAlign:"center"}}>
                            <i className="fa fa-calculator margin_right_c" style={{marginRight:"0"}}><p>Accounting</p></i>
                            <span className="margin_right_c"></span>

                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12"  onClick={() => {this.clickItem('Admin & Clerical')}} >
                      <div className="jobIconbox">
                        <div className="jobIconbox-topimage_header" style={{border:'1px solid black',padding:'15px', textAlign:"center"}}>
                            <i className="fa fa-plus-square margin_right_c" style={{marginRight:"0"}}><p>Admin & Clerical</p></i>
                            <span className="margin_right_c"></span>

                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12"  onClick={() => {this.clickItem('Customer Service')}} >
                      <div className="jobIconbox">
                        <div className="jobIconbox-topimage_header" style={{border:'1px solid black',padding:'15px', textAlign:"center"}}>
                            <i className="fa fa-headphones margin_right_c" style={{marginRight:"0"}}><p>Customer Service</p></i>
                            <span className="margin_right_c"></span>

                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12"  onClick={() => {this.clickItem('Executive')}} >
                      <div className="jobIconbox">
                        <div className="jobIconbox-topimage_header" style={{border:'1px solid black',padding:'15px', textAlign:"center"}}>
                            <i className="fa fa-user margin_right_c" style={{marginRight:"0"}}><p>Executive</p></i>
                            <span className="margin_right_c"></span>

                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12"  onClick={() => {this.clickItem('Contract & Freelance')}} >
                      <div className="jobIconbox">
                        <div className="jobIconbox-topimage_header" style={{border:'1px solid black',padding:'15px', textAlign:"center"}}>
                            <i className="fa fa-file-text margin_right_c" style={{marginRight:"0"}}><p>Contract & Freelance</p></i>
                            <span className="margin_right_c"></span>

                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12"  onClick={() => {this.clickItem('Sales & Marketin')}} >
                      <div className="jobIconbox">
                        <div className="jobIconbox-topimage_header" style={{border:'1px solid black',padding:'15px', textAlign:"center"}}>
                            <i className="fa fa-line-chart margin_right_c" style={{marginRight:"0"}}><p>Sales & Marketing</p></i>
                            <span className="margin_right_c"></span>

                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12"  onClick={() => {this.clickItem('Health Care')}} >
                      <div className="jobIconbox">
                        <div className="jobIconbox-topimage_header" style={{border:'1px solid black',padding:'15px', textAlign:"center"}}>
                            <i className="fa fa-medkit margin_right_c" style={{marginRight:"0"}}><p>Health Care</p></i>
                            <span className="margin_right_c"></span>

                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12"  onClick={() => {this.clickItem('Retail')}} >
                      <div className="jobIconbox">
                        <div className="jobIconbox-topimage_header" style={{border:'1px solid black',padding:'15px', textAlign:"center"}}>
                            <i className="fa fa-car margin_right_c" style={{marginRight:"0"}}><p>Retail</p></i>
                            <span className="margin_right_c"></span>

                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12" onClick={() => {this.clickItem('Transporting')}} >
                      <div className="jobIconbox">
                        <div className="jobIconbox-topimage_header" style={{border:'1px solid black',padding:'15px', textAlign:"center"}}>
                            <i className="fa fa-car margin_right_c" style={{marginRight:"0"}}><p>Transporting</p></i>
                            <span className="margin_right_c"></span>

                        </div>
                      </div>
                    </div>
                    {/*<span className="seemore" onClick={() => {this.clickItem('seemore')}}> <p> See More Category</p> </span>*/}
                </div>
            </div>
          </span>
        )
    }
}

export default connect()(ClassifiedIcons);
