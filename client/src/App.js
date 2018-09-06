import React, { Component } from   'react';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import Burgermenu from './components/header/burgermenu';
import Slider from './components/header/Slider';
import {HttpUtils} from "./Services/HttpUtils";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            response: '',
            username: null
        };
    }

    componentWillMount(){
        this.getAllBusiness();
    }

    async getAllBusiness(){
        var req = await HttpUtils.get('marketplace')
        console.log(req, 'reqqqqqqqqqqqq')
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));

    }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {

        const Search = Input.Search;
        const {username} = this.state;
        return (
            <div className ="">
                <div className="background-image">
                    <Burgermenu/>
                    <Slider/>
                </div>
            </div>
        );
    }
}

export default App;
