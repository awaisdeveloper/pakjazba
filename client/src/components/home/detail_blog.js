import React, { Component } from 'react';
import Burgermenu from '../header/burgermenu';
import Slider from '../header/Slider';
import Footer from '../footer/footer'
import { Tabs, Icon } from 'antd';
import axios from "axios/index";
import {HttpUtils} from "../../Services/HttpUtils";
import moment from 'moment'
import AsyncStorage from "@callstack/async-storage/lib/index";

const TabPane = Tabs.TabPane;

class DetailBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            sports: [],
            comment: '',
            review: [],
            userId : '',
            profileId: '',
            userImg: ''
        };
    }

    componentDidMount() {
        this.callApi()
        this.getAllBlogs()
        this.handleLocalStorage()
    }

    handleLocalStorage = () =>{
        AsyncStorage.getItem('user')
            .then((obj) => {
                let userObj = JSON.parse(obj)
                if(!!userObj) {
                    console.log(userObj, 'lllllllllllllll')
                    // this.getprofileData(userObj.profileId, userObj._id)
                    this.setState({
                        userId: userObj._id,
                        profileId: userObj.profileId,
                        userImg: userObj.userImage,
                        userName: userObj.name
                    })
                }
            })
    }

    async getAllBlogs(){
        let req = await HttpUtils.get('getblog');
        console.log(req, 'zzzzzzzzzzzzzzzzzzzzzz')
    }

    async callApi(){
        const sports = await axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=6e7e6a696773424187f9bdb80954ded7');
        console.log(sports.data.articles, 'sportssssssssss')
        const news = await axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=6e7e6a696773424187f9bdb80954ded7');
        console.log(news.data.articles, 'newssssssssssssssss')
        this.setState({news: news.data.articles, sports: sports.data.articles})

    }

    changeVal(e){
        this.setState({comment: e.target.value})
    }

    publishComment(){
        console.log(this.state.comment, '888888888888')
        let { review, comment, userImg, userName } = this.state;
        let obj = {
            written: moment().format('LL'),
            user: userName,
            comm: this.state.comment,
            userImg,
        }
        review.push(obj)
        this.setState({review, comment: ''})
    }

    render(){
        const { news, sports, review } = this.state;

        return (
            <div>
                <div className ="" style={{"backgroundImage":"url('./images/shutterstock_1094843246.jpg')", backgroundSize: '1500px 500px', height: "500px", marginTop: "-65px", marginLeft:"-66px"}}>
                    <div className="background-image">
                        <Burgermenu/>
                    </div>
                </div>
                <div style={{height: '50px'}}></div>
                <div className='row'>
                    <div style={{marginTop: '20px'}} className="col-md-9 col-sm-12 col-xs-12">
                        <h3><b>Loram Ipsum Koram Posam, Loram Ipsum Koram Posam Loram Ipsum Koram Posam </b></h3>
                        <div className="col-md-6">
                            <p>Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram
                                Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum
                                Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam. Loram
                                Ipsum Koram Posam Loram Ipsum Koram Posam. </p>
                        </div>
                        <div className="col-md-6">
                            <img src="./images/shutterstock_1094843246.jpg" width="350" height="200"/>
                        </div>
                        <div className="col-md-12">
                            <br/>
                            <div className="b-head">
                                <h3><b>" Loram Ipsum Koram Poram, Loram Ipsum Koram Poram, Loram Ipsum Koram Poram "</b>
                                </h3>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <br/> <br/>
                            <h4>Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram
                                Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum
                                Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam. Loram
                                Ipsum Koram Posam Loram Ipsum Koram Posam. </h4>
                        </div>
                        <div className="col-md-12">
                            <br/> <br/>
                            <div className="col-md-2">
                                <img src="../images/images.jpg" className="img-circle" width="100" height="100"/>
                            </div>
                            <div className="col-md-10">
                                <p>Written By</p>
                                <h3>Hills Estate</h3>
                                <hr/>
                                <p>Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam
                                    Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam. Loram Ipsum
                                    Koram Posam Loram Ipsum Koram Posam.</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <br/> <br/>
                            <div className="col-md-2">
                                <img src="../images/images.jpg" className="img-circle" width="100" height="100"/>
                            </div>
                            <div className="col-md-10">
                                <h3>Hills Estate</h3>
                                <p>14.09.2018</p>
                                <p>Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam
                                    Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam. Loram Ipsum
                                    Koram Posam Loram Ipsum Koram Posam.</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <br/>
                            <hr/>
                        </div>
                        <div className="col-md-12">
                            <br/> <br/>
                            <div className="col-md-2">
                                <img src="../images/images.jpg" className="img-circle" width="100" height="100"/>
                            </div>
                            <div className="col-md-10">
                                <h3>Hills Estate</h3>
                                <p>14.09.2018</p>
                                <p>Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam
                                    Loram Ipsum Koram Posam Loram Ipsum Koram Posam Loram Ipsum Koram Posam. Loram Ipsum
                                    Koram Posam Loram Ipsum Koram Posam.</p>
                            </div>
                        </div>
                        {review && review.map((elem) => {
                            return(
                                <div className="col-md-12">
                                    <br/> <br/>
                                    <div className="col-md-2">
                                        <img src={elem.userImg ? elem.userImg : "../images/images.jpg"} className="img-circle" width="100" height="100"/>
                                    </div>
                                    <div className="col-md-10">
                                        <h3>{elem.user}</h3>
                                        <p>{elem.written}</p>
                                        <p>{elem.comm}</p>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="col-md-12">
                            <br/><br/>
                            <div className="col-md-4">
                                <hr/>
                            </div>
                            <div className="col-md-3 text-center"><h4><b>Leave A Reply</b></h4></div>
                            <div className="col-md-5">
                                <hr/>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card outset">
                                <div className="card-body space tag1 bspace">
                                    <br/><br/>
                                    <textarea cols="80" rows="5" value={this.state.comment} placeholder="Enter Your Comment..." onChange={this.changeVal.bind(this)} style={{marginLeft: "21px",paddingLeft: "13px"}}> </textarea>
                                    <br/><br/>
                                    <button className="btn" onClick={this.publishComment.bind(this)} style={{marginLeft: "21px",backgroundColor:"#008080",color: "white"}}>Publish</button>
                                    <br/><br/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <br/><br/>
                            <div className="col-md-4">
                                <hr/>
                            </div>
                            <div className="col-md-3 text-center"><h4><b>More Blog</b></h4></div>
                            <div className="col-md-5">
                                <hr/>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="col-md-4">
                                <img src="./images/shutterstock_536667610.jpg" width="250px" height="200"/>
                                <h5><b>Loram Ipsum, Loram Ipsum, Loram Ipsum </b></h5>
                                <p>By Hills Estate 13.09.2018 <br/><br/></p>
                            </div>
                            <div className="col-md-4">
                                <img src="./images/blog1.jpg" width="250px" height="200"/>
                                <h5><b>Loram Ipsum, Loram Ipsum, Loram Ipsum </b></h5>
                                <p>By Hills Estate 13.09.2018 <br/><br/></p>
                            </div>
                            <div className="col-md-4">
                                <img src="./images/black.jpg" width="250px" height="200"/>
                                <h5><b>Loram Ipsum, Loram Ipsum, Loram Ipsum </b></h5>
                                <p>By Hills Estate 13.09.2018 <br/><br/></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 col-xs-12">
                        <Tabs defaultActiveKey="2">
                            <TabPane style={{height: '450px', 'overflow-y': 'overlay'}} tab='SPORTS' key="1">
                                {sports.map((elem) => {
                                    return(
                                        <div className="b-sec">
                                            <a href={elem.url} target="_blank">
                                                <img style={{width: '100%'}} src={elem.urlToImage} alt=""/>
                                                <p><b>{elem.title}</b></p>
                                            </a>
                                        </div>
                                    )
                                })}
                            </TabPane>
                            <TabPane style={{height: '450px', 'overflow-y': 'overlay'}} tab='NEWS' key="2">
                                {news.map((elem) => {
                                    return(
                                        <div className="b-sec">
                                            <a href={elem.url} target="_blank">
                                                <img style={{width: '100%'}} src={elem.urlToImage} alt=""/>
                                                <p><b>{elem.title}</b></p>
                                            </a>
                                        </div>
                                    )
                                })}
                            </TabPane>
                        </Tabs>
                        <br/><br/>
                        <h3><b>Popular</b></h3>
                        <br/><br/><br/>
                        <img src="./images/shutterstock_536667610.jpg" width="300" height="250"/>
                        <br/><br/><br/>
                        <img src="./images/blog1.jpg" width="300" height="250"/>
                        <br/><br/><br/>
                        <img src="./images/black.jpg" width="300" height="250"/>
                        <br/><br/>
                        <h3><b> MostPopular</b></h3>
                        <br/><br/><br/>
                        <img src="./images/black.jpg" width="300" height="250"/>
                        <br/><br/><br/>
                        <img src="./images/shutterstock_536667610.jpg" width="300" height="250"/>
                        <br/><br/>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default (DetailBlog);