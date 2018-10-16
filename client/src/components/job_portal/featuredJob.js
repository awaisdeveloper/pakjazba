import React, { Component } from 'react';
import './featureJob.css';
import { Spin, Icon, Pagination } from 'antd';
import {HttpUtils} from "../../Services/HttpUtils";
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class FeaturedBox extends Component{
    constructor(props) {
        super(props)
        this.state = {
            job: [],
            showJob: [],
            filteredArr: [],
            loader: true
        };
    }

    componentDidMount() {
        this.getAllBusiness();
    }

    componentDidUpdate(prevProps, prevState){
        const { job } = this.state;
        const { text } = this.props;
        if(prevProps.text !== text){
            if(!!text){
                this.searchedArr(text)
            }else {
                this.setState({
                    showJob: job.slice(0, 6),
                    filteredArr: []
                })
            }
        }
    }

    searchedArr(text){
        const { job } = this.state;
        let filteredArr = job.filter((elem) => {
            return (elem.jobCat.toLowerCase().includes(text.toLowerCase())) || 
            (elem.jobType.toLowerCase().includes(text.toLowerCase()))
        })
        this.setState({
            filteredArr,
            showJob: filteredArr.slice(0, 6)
        })
    }

    async getAllBusiness(){
        var res = await HttpUtils.get('marketplace');
        this.setState({response: res.jobPortalData});
        this.setState({
            job: res && res.jobPortalData,
            showJob: res && res.jobPortalData.slice(0, 6),
            loader: false
        });
    }

    funcIndexes(page){
        var to = 6 * page;
        var from = to - 6;
        return {from: page === 1 ? 0 : from, to: page === 1 ? 6 : to}
    }

    onChange = (page) => {
        const { job, filteredArr } = this.state;
        var indexes = this.funcIndexes(page)
        if(!!filteredArr.length){
            this.setState({
                current: page,
                showJob: filteredArr.slice(indexes.from, indexes.to)
            });
        }else {
            this.setState({
                current: page,
                showJob: job.slice(indexes.from, indexes.to)
            });
        }
    }

    render(){
        const { showJob, filteredArr, job } = this.state;
        const antIcon = <Icon type="loading" style={{ fontSize: 120 }} spin />;

        return(
            <div>
                <h2 style={{textAlign:"center", fontWeight:"bold", marginTop:"20px"}}>Featured Jobs </h2>
                <div className="row">
                    {showJob && showJob.map((elem) => {
                        return (
                            <div className="col-md-4">
                                <div className="featuredbox">
                                    <div className="featuredbox-content featuredjob-box">
                                        <div className="featuredjob-imitation">
                                            <div className="card2">
                                                <img alt='' src={elem.arr_url[0]}/>
                                            </div>
                                        </div>
                                        <div className="customjob-margin">
                                            <h4>{elem.jobCat}</h4>
                                            <i className="glyphicon glyphicon-star"/>
                                            <p className="textforjob">{elem.jobType}</p>
                                            <div className="glyphicom">
                                                <i className="glyphicon glyphicon-map-marker"/>
                                                <p className="textforjob">{elem.location}</p>
                                            </div>
                                        </div>
                                        <div className="jobdetail-desc">
                                            <div> </div>
                                            <div className="small m-t-xs">
                                                {elem.jobDescription}
                                            </div>
                                            <div className="m-t text-righ">
                                                <Link to={{pathname: `/detail_jobPortal`, state: elem}}>
                                                    <button type="button" className="btn btn-success">View Detail</button>
                                                </Link>
                                                <div className="button2">
                                                    <Link to={{pathname: `/apply_forJob`, state: elem}}>
                                                        <button type="button" className="btn btn-success">Apply Now</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {this.state.loader && <div className="col-md-12" style={{textAlign: 'center'}}>
                    <Spin indicator={antIcon} />
                </div>}
                {!!showJob && <span style={{textAlign:"center"}}><Pagination defaultCurrent={1} defaultPageSize={6} total={!!filteredArr.length ? filteredArr.length :job.length} onChange={this.onChange} /></span>}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return({
        text: state.text
    })
}

export default connect(mapStateToProps)(FeaturedBox);
