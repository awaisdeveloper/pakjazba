import React, { Component } from 'react';
import App from '../../App';
import moment from 'moment'
import { Carousel, Rate, notification } from 'antd';
import { Redirect } from 'react-router';
import {HttpUtils} from "../../Services/HttpUtils";

class DetailBusiness extends Component{
    constructor(props){
        super()
        this.state = {
            isData: true,
            data: {},
            star: 0,
            name: '',
            email: '',
            msg: '',
            name1: '',
            email1: '',
            msg1: '',
            reviews: []
        }
    }

    componentDidMount(){
        let data = this.props.location.state;
        if(data === undefined){
            this.setState({
                isData: false
            })
        }else {
            this.setState({
                isData : true,
                data : data
            })
            this.getReviews(data)
        }
    }

    async getReviews(data){
        let res = await HttpUtils.get('getreviews')
        if(res.code === 200) {
            let filteredReviews = res.content.filter((elem) => elem.objid === data._id)
            this.setState({reviews: filteredReviews})
        }
    }

    handleChange(value){
        this.setState({star: value})
    }

    onChangeReview(e){
        let target = e.target.id;
        if(target === 'name1'){
            this.setState({name1: e.target.value})
        }else if(target === 'email1'){
            this.setState({email1: e.target.value})
        }else if(target === 'message1'){
            this.setState({msg1: e.target.value})
        }
    }

    async submitReview(){
        let { name1, email1, msg1, star, reviews, data } = this.state;
        let obj = {
            objId: data._id,
            name : name1,
            email: email1,
            message: msg1,
            star,
            written: moment().format('LL')
        }
        let res = await HttpUtils.post('reviews', obj)
        reviews.push(obj)
        if(res.code === 200) {
            let message1 = 'Your review sent successfully'
            this.openNotification(message1)
            this.setState({name1: '', email1: '', msg1: '', star: 0, reviews})
        }
    }

    async submitMessage(){
        const { name, email, msg, data } = this.state;
        let obj = {
            name,
            sender: email,
            msg,
            receiver: data.businessemail,
            written: moment().format('LL')
        }

        let res = await HttpUtils.post('sendmessage', obj)
        if(res.code === 200) {
            let message1 = 'Your message sent successfully'
            this.openNotification(message1)
            this.setState({name: '', email: '', msg: ''})
        }
    }

    openNotification(msg) {
        notification.open({
            message: 'Success ',
            description: msg,
        });
    };

    onChangeInput(e){
        let target = e.target.id;
        if(target === 'name'){
            this.setState({name: e.target.value})
        }else if(target === 'email'){
            this.setState({email: e.target.value})
        }else if(target === 'message'){
            this.setState({msg: e.target.value})
        }
    }

    render(){
        const { isData, data, reviews } = this.state;
        let images = data.businessImages;

        if(!isData){
            return <Redirect to='/' />
        }

        return(
            <div>
                <span className="background_listing">
                	<App/>
                </span>
                <div className="">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                            <div className="col-lg-2 col-md-2 col-sm-12 " >
                            </div>
                            <div className="row">
                                <div className="col-lg-10 col-md-10 col-sm-12 " >
                                    {/*Start first tile */}
                                    <div className="card outset" >
                                        <img className="card-img-top" src={images && images[0]} alt="" style={{"width":"100%"}} />
                                        <div className="card-body space" style={{padding: "17px"}}>
                                            <h5><span className="glyphicon glyphicon-home" style={{marginRight: "15px"}}></span>{data.businessaddress}</h5>
                                            <hr/>
                                            <h5><span className="glyphicon glyphicon-phone" style={{marginRight: "15px"}}></span>{data.businessnumber}</h5>
                                            <hr/>
                                            <h5><span className="glyphicon glyphicon-globe" style={{marginRight: "15px"}}></span>{data.businessemail}</h5>
                                            <br/>
                                            <h4>Our Social</h4>
                                            <a href={data.socialFaceBook} target="_blank" style={{marginRight: "12px"}}><button type="button" className="btn btn-fb"><i className="fa fa-facebook"></i></button></a>
                                            <a href={data.socialLinkIn} target="_blank" style={{marginRight: "12px"}}><button type="button" className="btn btn-linkedin"><i className="fa fa-linkedin"></i></button></a>
                                            <a href={data.socialGoogle} target="_blank" style={{marginRight: "12px"}}><button type="button" className="btn btn-gplus"><i className="fa fa-google-plus"></i></button></a>
                                            <br/><br/>
                                        </div>
                                    </div>
                                    {/*End first tile */}
                                </div>
                            </div>
                            <div className="row"> <br/></div>
                            <div className="col-lg-2 col-md-2 col-sm-12 ">
                            </div>
                            <div className="row"> <br/></div>
                            <div className="col-lg-2 col-md-2 col-sm-12 " >
                            </div>
                            <div className="row">
                                <div className="col-lg-10 col-md-10 col-sm-12 " >
                                    {/*Start 3rd tile */}
                                    <div className="card outset" >
                                        <div className="card-body space" style={{padding: "17px"}}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h3><b>Contact Time</b></h3>
                                                    <p>You can contact between these timings</p>
                                                    <hr/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="col-md-6">
                                                        <h4><b>Opening Time</b></h4>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h4><b>{data.openingTime}</b></h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="col-md-6">
                                                        <h4><b>Closing Time</b></h4>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h4><b>{data.closingTime}</b></h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*End 3rd tile */}
                                    <div className="row"><br/></div>
                                    {/*Start 4th tile */}
                                    <div className="card outset" >
                                        <div className="card-body space">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h3><b>Contact</b></h3>
                                                    <hr/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    {/*Section: Contact v.2*/}
                                                    <section className="section">
                                                        <div className="row">
                                                            {/*Grid column*/}
                                                            <div className="col-md-12">
                                                                <form id="contact-form" name="contact-form" action="mail.php" method="POST">
                                                                    {/*Grid row*/}
                                                                    <div className="row">
                                                                        {/*Grid column*/}
                                                                        <div className="col-md-11">
                                                                            <div className="md-form mb-0">
                                                                            <label className="">Your name</label>
                                                                                <input type="text" id="name" name="name" className="form-control" value={this.state.name} onChange={this.onChangeInput.bind(this)}/>
                                                                            </div>
                                                                        </div>
                                                                        {/*Grid column*/}
                                                                        {/*Grid column*/}
                                                                        <div className="col-md-11">
                                                                            <div className="md-form mb-0">
                                                                            <label className="">Your email</label>
                                                                                <input type="text" id="email" name="email" className="form-control" value={this.state.email} onChange={this.onChangeInput.bind(this)}/>
                                                                            </div>
                                                                        </div>
                                                                        {/*Grid column*/}
                                                                    </div>
                                                                    {/*Grid row*/}
                                                                    {/*Grid row*/}
                                                                    <div className="row">
                                                                        {/*Grid column*/}
                                                                        <div className="col-md-11">
                                                                            <div className="md-form">
                                                                            <label>Your message</label>
                                                                                <textarea type="text" id="message" name="message" rows="2" value={this.state.msg} className="form-control md-textarea" onChange={this.onChangeInput.bind(this)}></textarea>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/*Grid row*/}
                                                                </form>
                                                                <div className="text-center text-md-left">
                                                                    <a className="btn btn-primary" onClick={this.submitMessage.bind(this)}>Send</a>
                                                                </div>
                                                                <div className="status"></div>
                                                            </div>
                                                            {/*Grid column*/}
                                                        </div>
                                                    </section>
                                                    {/*Section: Contact v.2*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*End 4th tile */}
                                </div>
                            </div>
                        </div>
                        {/*Left side */}
                        <div className="col-md-8 col-sm-8 col-xs-12">
                            {/*Start first tile */}
                            <div className="row">
                                <div className="card outset" >
                                    <div className="card-body space">
                                        <div className="row">
                                            <div className="col-md-2 col-sm-2 col-xs-12">
                                                <img className="card-img-top" src={images && images[0]} alt="" style={{"width":"100%"}} />
                                            </div>
                                            <div className="col-md-10 col-sm-10 col-xs-12">
                                                <h3>{data.businessname}</h3>
                                                <hr/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2 col-sm-2 col-xs-12">
                                            </div>
                                            <div className="col-md-10 col-sm-10 col-xs-12">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End first tile */}
                            <div className="row">
                                <br/>
                            </div>
                            {/*Start scond tile */}
                            <div className="row">
                                <div className="card outset" >
                                    <div className="card-body space">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12" style={{textAlign:"center"}}>
                                                <div className="col-md-4 col-sm-3 col-xs-12">
                                                    <a href="#linkAbout" className="a"><h3> About </h3>
                                                        <div className="hr1">...</div> </a>
                                                </div>
                                                <div className="col-md-4 col-sm-3 col-xs-12">
                                                    <a href="#linkGallery" className="a"> <h3> Gallery </h3>
                                                        <div className="hr1">...</div> </a>
                                                </div>
                                                <div className="col-md-4 col-sm-3 col-xs-12">
                                                    <a href="#linkReview" className="a"><h3> Reviews </h3>
                                                        <div className="hr1">...</div></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End second tile */}
                            <div className="row"><br/></div>
                            {/*Start third tile */}
                            <div className="row">
                                <div className="card outset" >
                                    <div className="card-body space">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <h3><b><a name="linkAbout">About</a></b></h3>
                                                <hr/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <p>{data.description}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <img alt='' src={images && images[0]} className="responsive" width="90%" height="200" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <h5> <b>Tage:</b> loram, Ipsum, Ioram  </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End third tile */}
                            <div className="row"><br/></div>
                            {/*Start 4th tile */}
                            <div className="row">
                                <div className="card outset" >
                                    <div className="card-body space">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <h3><b><a name="linkGallery">Gallery</a></b></h3>
                                                <hr/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <Carousel autoplay>
                                                    {images && images.map((elem, key) => {
                                                        return(
                                                            <div key={key}>
                                                                <img alt='' src={elem}/>
                                                            </div>
                                                        )
                                                    })}
                                                </Carousel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End 4th tile */}
                            <div className="row"><br/></div>
                            {/*Start 5th tile */}
                            <div className="card outset" >
                                {!!reviews.length && <div className="row">
                                    {reviews && reviews.map((elem, key) => {
                                        return(
                                            <div  key={key} className="card-body space">
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                                        <div className="col-md-6 col-sm-12 col-xs-12"><br/>
                                                            <img src="./images/black.jpg" className="img-circle" alt="" width="100" height="100" />
                                                            <Rate style={{paddingLeft: '10px'}} allowHalf value={elem.star} />
                                                        </div>
                                                        <div className="col-md-2 col-sm-12 col-xs-12">
                                                        </div>
                                                        <div className="col-md-4 col-sm-12 col-xs-12">
                                                            <a name="linkReview"><p className="star-space1">Writen On {elem.written}</p></a>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12 col-xs-12"><br/>
                                                        <div className="col-md-2 col-sm-12 col-xs-12">
                                                        </div>
                                                        <div className="col-md-10 col-sm-12 col-xs-12">
                                                            <p>{elem.message}.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>}
                            </div>
                            {/*End 5th tile */}
                            <div className="row"><br/></div>
                            {/*Start scond tile */}
                            <div className="row">
                                <div className="card outset" >
                                    <div className="card-body space">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <h3><b><a name="linkReview">Add Review</a></b></h3>
                                                <hr/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {/*Section: Contact v.2*/}
                                                <section className="section">
                                                    <h4>Your Rating:
                                                        <Rate onChange={this.handleChange.bind(this)} allowHalf value={this.state.star} />
                                                    </h4>
                                                    <div className="row">
                                                        {/*Grid column*/}
                                                        <div className="col-md-9 mb-md-0 mb-5">
                                                            <form id="contact-form" name="contact-form" action="mail.php" method="POST">
                                                                {/*Grid row*/}
                                                                <div className="row">
                                                                    {/*Grid column*/}
                                                                    <div className="col-md-6">
                                                                        <div className="md-form mb-0">
                                                                            <label className="">Your name</label>
                                                                            <input type="text" id="name1" name="name" className="form-control" value={this.state.name1} onChange={this.onChangeReview.bind(this)}/>
                                                                        </div>
                                                                    </div>
                                                                    {/*Grid column*/}
                                                                    {/*Grid column*/}
                                                                    <div className="col-md-6">
                                                                        <div className="md-form mb-0">
                                                                            <label className="">Your email</label>
                                                                            <input type="text" id="email1" name="email" className="form-control" value={this.state.email1} onChange={this.onChangeReview.bind(this)}/>
                                                                        </div>
                                                                    </div>
                                                                    {/*Grid column*/}
                                                                </div>
                                                                {/*Grid row*/}
                                                                {/*Grid row*/}
                                                                <div className="row">
                                                                    {/*Grid column*/}
                                                                    <div className="col-md-12">
                                                                        <div className="md-form">
                                                                            <label>Your message</label>
                                                                            <textarea type="text" id="message1" name="message" rows="2" value={this.state.msg1} className="form-control md-textarea" onChange={this.onChangeReview.bind(this)}></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*Grid row*/}
                                                            </form>
                                                            <div className="text-center text-md-left">
                                                                <a className="btn btn-primary" onClick={this.submitReview.bind(this)}>Send</a>
                                                            </div>
                                                            <div className="status"></div>
                                                        </div>
                                                        {/*Grid column*/}
                                                    </div>
                                                </section>
                                                {/*Section: Contact v.2*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End second tile */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailBusiness;
