import React, { Component } from 'react';
import './buydetailsecondfold.css'
import {HttpUtils} from "../../../Services/HttpUtils";
import {notification, Spin, Icon} from "antd";
import { Redirect } from 'react-router';
import moment from 'moment'

class Buydetailsecondfold extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            userEmail: '',
            msg: '',
            loader: false
        }
    }

    onChangeValue(e){
        let target = e.target.id;
        let value = e.target.value;
        if(target === 'name'){
            this.setState({
                name: value
            })
        }else if(target === 'email'){
            this.setState({
                userEmail: value
            })
        }else if(target === 'msg'){
            this.setState({
                msg: value
            })
        }
    }

    async submitData(e){
        e.preventDefault();
        this.setState({loader: true})
        const { data } = this.props;
        const { name, userEmail, msg } = this.state;
        let obj = {
            name,
            sender: userEmail,
            msg,
            receiver: data.contactemail,
            written: moment().format('LL')
        }
        let res = await HttpUtils.post('sendmessage', obj)
        let message1 = 'Your message sent successfully'
        this.openNotification(message1)
        if(res.code === 200) {
            this.setState({
                name: '',
                userEmail: '',
                msg: '',
                loader: false
            })
        }
    }

    openNotification(msg) {
        notification.open({
            message: 'Success ',
            description: msg,
        });
    };

    goToProfile(){
        this.setState({goProfile : true})
    }

    render(){
        const { name, userEmail, msg, goProfile } = this.state;
        const { data } = this.props;
        let email= data.contactMode && data.contactMode.includes('email') ? data.contactEmail : '*****@gmail.com';
        let phone = data.contactMode && data.contactMode.includes('phone') ? data.contactNumber : '***********';
        const antIcon = <Icon type="loading" style={{ fontSize: 24, marginRight: '10px' }} spin />;

        if(goProfile){
            return <Redirect to={{pathname: '/profile_userDetail', state: {userId: data.userid, profileId: data.profileid}}}/>
        }

        if(data.modeofcontact && data.modeofcontact.includes('email')){
            email = data.contactemail;
        }

        if(data.modeofcontact && data.modeofcontact.includes('phone')){
            phone = data.contactnumber;
        }

        return(
            <div className="">
                <div className="">
                    <h3 className="heading-padding"> Authors </h3>
                    <div className="shadowbox" style={{border:'1px solid #8080804d',boxShadow: 'none'}}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-3 col-sm-3 col-xs-12" style={{marginTop:"26px"}}>
                                    <div className="review-block-img">
                                        <img onClick={() => {this.goToProfile()}} src={data.userImage && data.userImage.length ? data.userImage : '../images/images.jpg'} className="img-circle" alt=""/>
                                    </div>
                                </div>
                                <div className="col-sm-9 col-xs-12" style={{marginTop: "33px"}}>
                                    <div className="review-block-rate">
                                        <div className="review-block-name hidden-xs" style={{cursor: 'pointer',marginLeft:'-35px'}} onClick={() => {this.goToProfile()}}>{data.contactname}</div>
                                        <div className="review-block-name visible-xs" style={{cursor: 'pointer'}} onClick={() => {this.goToProfile()}}>{data.contactname}</div>
                                    </div>
                                </div>
                                <section  style={{float: "left",marginLeft: "67px"}}>
                                    <span><h4>Phone:</h4></span>
                                </section>
                                <section>{phone}</section><br/>
                                <section style={{float: "left",marginLeft: "66px"}}><h4>Email</h4></section>
                                <section>{email}</section>
                            </div>{/*col-md-6*/}
                            <div className="col-md-6 col-sm-6 col-xs-12" style={{marginTop: "15px"}}>
                                <form action="/action_page.php">
                                    <div className="form-group">
                                        <label style={{float:"left"}}>Name:</label>
                                        <input type="text" className="form-control" value={name} id='name' onChange={this.onChangeValue.bind(this)}/>
                                    </div>
                                    <div className="form-group">
                                        <label style={{float:"left"}}>Email</label>
                                        <input type="email" className="form-control" value={userEmail} id="email" onChange={this.onChangeValue.bind(this)}/>
                                    </div>
                                    <label style={{float:"left"}}>Message:</label>
                                    <div className="form-group">
                                        <textarea type="text" className="form-control" id='msg' value={msg} onChange={this.onChangeValue.bind(this)}></textarea>
                                    </div>
                                    {this.state.loader && <Spin indicator={antIcon} />}
                                    <button disabled={!!this.state.loader} type="submit" className="btn" onClick={this.submitData.bind(this)} style={{backgroundColor: "#008080",color: "white"}}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Buydetailsecondfold;
