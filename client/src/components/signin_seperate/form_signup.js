import React, { Component } from   'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, notification, Spin, Modal  } from 'antd';

import axios from 'axios';
import AsyncStorage from "@callstack/async-storage";

const FormItem = Form.Item;
const ip = require('ip');

class Form_signup extends Component{
	componentDidMount(){
    this.handleLocalStorage();
  }
  componentWillMount(){
    this.handleLocalStorage();
      this.getAllUsers();
  }

  state = {
    loading: false,
    visible: false,
    passwordValidator:false,
    username: null,
    confirmDirty: false,
    autoCompleteResult: [],
    loader:false,
    dropdown:false,
    allUser: []
    }

   getAllUsers(){
        console.log(ip.address(), 'ipAddressssssss')

        axios.get('http://localhost:5000/api/allusers')
            .then((response) => {
                this.setState({allUser: response.data.content})
            })
    }

handleLocalStorage = () =>{
    AsyncStorage.getItem('user')
		.then((obj) => {
			var userObj = JSON.parse(obj)
			if(userObj!== null && userObj.name.length > 0){
                this.setState({
                    dropdown: true,
                })
            }
            else {
                this.setState({
                    dropdown: false
                })
            }
		})
  }//end handleLocalStorage function

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
          	loader:true
          })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form:',values);
        axios.get('http://localhost:5000/api/userregister?nickname='+values.nickname+'&email='+values.email+'&password='+values.password+'&notrobot='+values.notrobot)
        .then((response) => {
          console.log(response);
            AsyncStorage.setItem('user', JSON.stringify(response.data))
                .then(() => {
                    this.props.modalContent();
                })
         this.handleLocalStorage();
         if(response.data.code == 200){
         	this.setState({
          	loader:false,
          	visible:false
          })
         }//end if
         else{
         }
          this.props.form.resetFields();
          //this.state.confirmDirty='';
        })
      }
    });
  }//end handleSubmit

  checkValue(rule, value, callback){
        if(this.state.allUser.includes(value)){
            callback('This email is already been used')
            return;
        }else {
            callback()
        }
    }


	render(){


        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
		const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult,visible, allUser } = this.state;
        let {children} = this.props;
        const tailFormItemLayout = {
			      wrapperCol: {
			        xs: {
			          span: 24,
			          offset: 0,
			        },
			        sm: {
			          span: 16,
			          offset: 8,
			        },
			      },
			    };
		return(
			<div>
				<Form onSubmit={this.handleSubmit}>
							<FormItem label="Name">
						          {getFieldDecorator('nickname', {
						            rules: [{ required: true, message: 'Please input your Name!', whitespace: true }],
						          })(
						            <Input  />
						          )}
				    	</FormItem>
							<FormItem label="E-mail">
						          {getFieldDecorator('email', {
						            rules: [{
                                        type: 'email', message: 'The input is not valid E-mail!',
                                    }, {
                                        required: true, message: 'Please input your E-mail!',
                                    }, {
						                validator: this.checkValue.bind(this)
						            }],
						          })(
						            <Input  />
						          )}
        					</FormItem>
        					 <FormItem label="Password">
						          {getFieldDecorator('password', {
						            rules: [{
						              required: true, message: 'Please input your password!',
						            }, {
						              validator: this.validateToNextPassword,
						            }],
						          })(
						            <Input type="password"  />
						          )}
					        </FormItem>
					        <FormItem label="Confirm Password" >
						          {getFieldDecorator('confirm', {
						            rules: [{
						              required: true, message: 'Please confirm your password!',
						            }, {
						              validator: this.compareToFirstPassword,
						            }],
						          })(
						            <Input type="password"  onBlur={this.handleConfirmBlur} />
						          )}
        					</FormItem>
        					 <FormItem {...tailFormItemLayout}>
						          {getFieldDecorator('notrobot', {
						            valuePropName: 'checked',
						          })(
						            <Checkbox>I'm not a Robot</Checkbox>
						          )}
        					</FormItem>
        					<div className="row center_global">
	        					{this.state.loader ? antIcon : null} <button className="btn color_button">Sign up</button>
        					</div>{/*row*/}
        				<div className="row term_condition">
        					<p>(By clicking register, you agree to our <a href="#">terms</a>, our <a href="#">data policy</a> and cookies use)</p>
        				</div>
						</Form>
			</div>		
			)
	}
	
}

const WrappedRegistrationForm = Form.create()(Form_signup);
export default WrappedRegistrationForm
