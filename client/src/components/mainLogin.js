import React, { Component } from 'react';
import Signin from './signinmodal';
import Signup from './signupmodal';
import AsyncStorage from '@callstack/async-storage';

export default class MainLogin extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: ''
        }
    }

    componentWillMount(){
        this.handleLocalStorage();
    }

    handleLocalStorage = () => {
        AsyncStorage.getItem('user')
            .then((obj) => {
                var userObj = JSON.parse(obj)
                if(userObj !== null && userObj.name.length > 0){
                    this.setState({
                        user: userObj.name
                    })
                }
                else {
                    this.setState({
                        user: ''
                    })
                }
            }).catch({

        })
    }

    updateMethod(){
        this.handleLocalStorage();
    }

    render(){
        const { user } = this.state;
        return (
            <div>
                {user === '' ?
                    <span className="mainLoginDiv"><Signup/>  {  '|'  } <Signin modalContent={this.updateMethod.bind(this)}/></span> :
                    <span className="mainLoginDiv">{user} <Signin modalContent={this.updateMethod.bind(this)}/></span>}
            </div>
        )
    }
}