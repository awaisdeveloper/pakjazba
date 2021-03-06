import React, { Component } from 'react';
import { Checkbox, InputNumber, Icon, Tooltip } from 'antd';
import './OrderSummarycard.css';

class OrderCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            eBird : 1,
            nTicket: 1
        }
    }

    componentDidMount(){
        this.onChangeTicket();
    }

    onChangeTicket(e, val){
        const { eBird, nTicket } = this.state,
        { data } = this.props;
        let eBirdVal = val === 'EarlyBird' ? e : eBird,
        nTicketVal = val === 'NormalTicket' ? e : nTicket,
        eBirdPrice = '',
        nTicketPrice = '',
        earlyBird = data && data.earlyBird,
        normalTicket = data && data.normalTicket;

        if(data){
            eBirdPrice = data.earlyBirdPrice * eBirdVal;
            nTicketPrice = data.normalTicketPrice * nTicketVal ;
        }

        let totalPrice = eBirdPrice + nTicketPrice,
        webSiteRate = totalPrice > 0 ? (1*100/totalPrice).toFixed(2) : 0.00,
        stripeRate = totalPrice > 0 ? (2.9*100/totalPrice).toFixed(2) : 0.00,
        total = (+totalPrice + +webSiteRate + +stripeRate).toFixed(2);
        if(val === 'NormalTicket'){
            this.setState({nTicket: e !== null && e !==undefined ? e : nTicket})
        }else {
            this.setState({eBird: e !== null && e !==undefined ? e : eBird})
        }
        this.props.onChange({eBirdVal, nTicketVal, total});
    }

    render(){
        const { eBird, nTicket } = this.state,
        { data } = this.props;
        let eBirdPrice = '',
        nTicketPrice = '',
        earlyBird = data && data.earlyBird,
        normalTicket = data && data.normalTicket;

        if(data){
            eBirdPrice = data.earlyBirdPrice * eBird ;
            nTicketPrice = data.normalTicketPrice * nTicket ;
        }

        let totalPrice = eBirdPrice + nTicketPrice,
        webSiteRate = totalPrice > 0 ? (1*100/totalPrice).toFixed(2) : 0.00,
        stripeRate = totalPrice > 0 ? (2.9*100/totalPrice).toFixed(2) : 0.00,
        total = (+totalPrice + +webSiteRate + +stripeRate).toFixed(2);

        return(
            <div className="container" style={{width:"100%"}}>
                <div className="summarycard">
                    <div className="row" style={{marginTop:"0px"}}>
                        <div className="col-md-12">
                            <h3><b>Order Summary</b></h3>
                            <hr className="ehr"/>
                        </div>
                        {!(earlyBird || normalTicket) && <div className="col-md-4 hidden-xs hidden-sm">
                            <h4>Free</h4>
                        </div>}
                        {(earlyBird || normalTicket) && <div className="row">
                            <div className="col-md-6 col-xs-6">
                                <Checkbox checked={earlyBird}></Checkbox>
                                <span className="orederform">Early Bird</span>
                            </div>
                            <div className="col-md-6 col-xs-6">
                                <InputNumber min={0} max={data && data.earlyBirdAvailableTickets} defaultValue={1} disabled={!earlyBird} onChange={(e) => {this.onChangeTicket(e, 'EarlyBird')}} style={{width:"50px", height:"23px"}} />
                                <span style={{marginLeft:'7px'}}>{'$' + eBirdPrice}</span>
                                <Tooltip placement="top" title='Early Bird Ticket is not Available'>
                                    {!earlyBird && <Icon type="question-circle" theme="filled" style={{fontSize: '16px', marginLeft: '10px'}}/>}
                                </Tooltip>
                            </div>
                        </div>}
                        {(earlyBird || normalTicket) && <div className="row" style={{marginTop:"-15px"}}>
                            <div className="col-md-6 col-xs-6">
                                <Checkbox checked={normalTicket}></Checkbox>
                                <span className="orederform">Normal Ticket</span>
                            </div>
                            <div className="col-md-6 col-xs-6">
                                <InputNumber min={0} max={data && data.normalTicketAvailableTickets} defaultValue={1} disabled={!normalTicket} onChange={(e) => {this.onChangeTicket(e, 'NormalTicket')}} style={{width:"50px", height:"23px"}} />
                                <span style={{marginLeft:'7px'}}>{'$' + nTicketPrice}</span>
                                <Tooltip placement="top" title='Normal Ticket is not Available'>
                                    {!normalTicket && <Icon type="question-circle" theme="filled" style={{fontSize: '16px', marginLeft: '10px'}}/>}
                                </Tooltip>
                            </div>
                        </div>}
                        {(earlyBird || normalTicket) && <hr className="ohr"/>}
                        {(earlyBird || normalTicket) && <div className="row" style={{marginTop:"-20px", marginLeft:"10px"}}>
                            <div className="col-md-6 col-xs-6">
                                <h4>Total Amount </h4>
                            </div>
                            <div className="col-md-6 col-xs-6" style={{textAlign:"center"}}>
                                <span>{'$' + totalPrice}</span>
                            </div>
                        </div>}
                        {(earlyBird || normalTicket) && <div className="row" style={{marginTop:"-30px", marginLeft:"10px"}}>
                            <div className="col-md-6 col-xs-6">
                                <h4>Pak Jazba Fee </h4>
                            </div>
                            <div className="col-md-6 col-xs-6" style={{textAlign:"center"}}>
                                <span>{'$' + webSiteRate}</span>
                            </div>
                        </div>}
                        {(earlyBird || normalTicket) && <div className="row" style={{marginTop:"-30px", marginLeft:"10px"}}>
                            <div className="col-md-6 col-xs-6">
                                <h4>Stripe </h4>
                            </div>
                            <div className="col-md-6 col-xs-6" style={{textAlign:"center"}}>
                                <span>{'$' + stripeRate}</span>
                            </div>
                        </div>}
                        {(earlyBird || normalTicket) && <hr className="ohr" style={{marginTop:"-10px"}}/>}
                        {(earlyBird || normalTicket) && <div className="row" style={{marginTop:"-20px", marginLeft:"10px"}}>
                            <div className="col-md-6 col-xs-6">
                                <h4>Sub  Total </h4>
                            </div>
                            <div className="col-md-6 col-xs-6" style={{textAlign:"center"}}>
                                <span>{'$' + (total)}</span>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderCard;
