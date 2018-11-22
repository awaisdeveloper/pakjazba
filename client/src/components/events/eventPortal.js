import React, { Component } from 'react';
import {
    Form,
    Input,
    Icon,
    Cascader,
    Spin,
    notification,
    Upload,
    Modal,
    DatePicker,
    TimePicker,
    Checkbox
} from 'antd';
import moment from 'moment';
import { Redirect } from 'react-router';
import AsyncStorage from "@callstack/async-storage/lib/index";
import Burgermenu from '../header/burgermenu';
import Footer from '../footer/footer';
import sha1 from "sha1";
import superagent from "superagent";
import {HttpUtils} from "../../Services/HttpUtils";
import stateCities from "../../lib/countrycitystatejson";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const category = [{
  value: 'art/film',
    label: 'art/film'
},{
    value: 'career',
    label: 'career',
},{
    value: 'charitable',
    label: 'charitable',
},{
    value:'competition',
    label:'competition'
},{
    value:'dance',
    label:'dance',
},{
    value:'fest/fair',
    label:'fest/fair',
},{
    label:'fitness/health',
    value:'fitness/health',
},{
    label:'food/drink',
    value:'food/drink',
},{
    value:'free',
    label:'free',
},{
    value:'kid friendly',
    label:'kid friendly',
},{
    value:'literary',
    label:'literary',
},{
    value:'music',
    label:'music',
},{
    value:'outdoor',
    label:'outdoor',
},{
    value:'sale',
    label:'sale',
},{
    value:'singles',
    label:'singles',
},{
    value:'tech',
    label:'tech',
}];

class EventPortal extends Component{
    constructor(props) {
        super(props)
        this.state = {
            fileList: [],
            previewVisible: false,
            previewImage: '',
            eventTitle: '',
            eventCategory: '',
            state: '',
            city: '',
            startDate: '',
            endDate: '',
            description: '',
            desLength: '',
            free: false,
            availableTickets: '',
            totalTickets: '',
            price: '',
            name: '',
            email: '',
            number: '',
            website  : '',
            faceBook: '',
            linkdIn: '',
            google: '',
            statesUS: [],
            citiesUS: [],
            objectId: '',
            loader: false,
            msg: false,
            openingTime: '00:00:00',
            closingTime: '00:00:00',
        }
    }

    componentDidMount(){
        window.scrollTo(0,0);
        this.handleLocalStorage();
    }

    handleLocalStorage = () =>{
        let states = stateCities.getStatesByShort('US');
        states = states.map((elem) => {
            return {
                label: elem,
                value: elem
            }
        })
        AsyncStorage.getItem('user')
            .then((obj) => {
                var userObj = JSON.parse(obj)
                if(!!userObj) {
                    this.setState({
                        userId: userObj._id,
                        profileId: userObj.profileId,
                        statesUS: states
                    })
                }
            })
    }

    onChangeState(value) {
        if (!!value.length) {
            let cities = stateCities.getCities('US', value[0])
            cities = cities.map((elem) => {
                return {
                    label: elem,
                    value: elem
                }
            })
            this.setState({
                citiesUS: cities
            })
        }
    }

    uploadFile = (files) =>{
        const image = files.originFileObj
        const cloudName = 'dxk0bmtei'
        const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'
        const timestamp = Date.now()/1000
        const uploadPreset = 'toh6r3p2'
        const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'U8W4mHcSxhKNRJ2_nT5Oz36T6BI'
        const signature = sha1(paramsStr)
        const params = {
            'api_key':'878178936665133',
            'timestamp':timestamp,
            'upload_preset':uploadPreset,
            'signature':signature
        }

        return new Promise((res, rej) => {
            let uploadRequest = superagent.post(url)
            uploadRequest.attach('file', image)
            Object.keys(params).forEach((key) =>{
                uploadRequest.field(key, params[key])
            })

            uploadRequest.end((err, resp) =>{
                err ? rej(err) : res(resp);
            })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('jkhljlgljhgljhg')
        const { fileList } = this.state;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values, 'valueeessssssssss')
                this.setState({loader: true})
                this.funcForUpload(values)
            }
        })
    }

    async funcForUpload(values){
        const { fileList } = this.state;

        Promise.all(fileList.map((val) => {
            return this.uploadFile(val).then((result) => {
                return result.body.url
            })
        })).then((results) => {
            this.postData(values, results)
        })
    }

    async postData(values, response) {
        const {dateObj, userId, profileId, objectId, website, faceBook, linkdIn, google, free} = this.state;
        let rand = Math.floor((Math.random() * 1000000) + 54);
        var randomKey = values.eventTitle + "_" + values.eventCategory[0] + "_" + rand;
        let obj ={
            availableTickets: values.availableTickets,
            city: values.city[0],
            address: values.address,
            dateRange: dateObj,
            delivery: values.delivery === undefined ? [] : values.delivery,
            description: values.description,
            email: values.email,
            eventCategory: values.eventCategory[0],
            eventTitle: values.eventTitle,
            images: response,
            name: values.name,
            number: values.number,
            paymentMode: values.paymentMode === undefined ? [] : values.paymentMode,
            price: values.price,
            state: values.state[0],
            totalTickets: values.totalTickets,
            free,
            website,
            faceBook,
            linkdIn,
            google,
            userId,
            profileId,
            objectId,
            randomKey,
            posted: moment().format('LL')
        }
        console.log(obj, 'objjjjjjjjjj')
        let req = await HttpUtils.post('postEventPortal', obj)
        if(req.code === 200){
            this.setState({objData: obj, msg: true, randomKey})
        }
    }

    validateDate(rule, value, callback){
        if (!value.length) {
            callback('Please select your Date Range!');
        } else {
            callback();
        }
    }

    onChangeDate(dates, dateStrings) {
        this.setState({
            dateObj: {
                from: dateStrings[0],
                to: dateStrings[1]
            }
        })
    }

    checkValue(rule, value, callback) {
        this.setState({desLength: value ? value.length : 0})
        callback();
    }

    //-------------- upload functions start -------------------
    handleCancel = () => {
        this.setState({ previewVisible: false })
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl || file,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => {
        this.setState({fileList})
    }
    //--------------upload functions end ---------------------

    onChangePrice(e) {
        this.setState({free: e.target.checked});
    }

    checkCheckBox = (rule, value, callback) => {
        if (!value) {
            callback('Please check at least one!');
        } else {
            callback();
        }
    };

    validateNumber(rule, value, callback){
        if(isNaN(value)){
            callback('Please type Numbers');
        }else {
            callback()    
        }
    }

    onChangeValue(e) {
        if (e.target.id === 'faceBook') {
            this.setState({faceBook: e.target.value})
        } else if (e.target.id === 'linkdIn') {
            this.setState({linkdIn: e.target.value})
        } else if (e.target.id === 'google') {
            this.setState({google: e.target.value})
        } else if (e.target.id === 'website') {
            this.setState({website: e.target.value})
        }
    }

    validateTime(rule, value, callback){
        if (!(!!value)) {
            callback('Please select your Time!');
        } else {
            callback();
        }
    }

    onOpeningTime(time, timeString){
        this.setState({
            openingTime: timeString,
        })
    }

    onClosingTime(time, timeString){
        this.setState({
            closingTime: timeString,
        })
    }

    render(){
        const { fileList, previewImage, previewVisible, statesUS , citiesUS, msg, objData, randomKey } = this.state;
        const {getFieldDecorator} = this.props.form;

        if (msg === true) {
            return <Redirect to={{pathname: '/detail_eventPortal/${randomKey}', state: objData}} />
        }

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        function filter(inputValue, path) {
            return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
        }

        const optionsPayment = [
            { label: 'On Event', value: 'On Event' },
            { label: 'Cash', value: 'Cash' },
            { label: 'PayPal', value: 'PayPal' },
            { label: 'Credit Card', value: 'Credit Card' }
        ];

        const optionsDelivery = [
            { label: 'At Venue', value: 'At Venue' },
            { label: 'Pickup', value: 'Pickup' },
            { label: 'Free Shipping', value: 'Free Shipping' },
        ];

        return(
            <div>
              <Burgermenu/>
              <div style={{backgroundColor:"#032a30",width:"100%",height:"67px",marginTop:"-20px"}}></div>
                <div className="row jobdetail-page" style={{backgroundColor:"#37a99b"}}>
                    <div className="col-md-12 col-sm-12 col-xs-12" style={{textAlign:"center"}}>
                        <div className="">
                            <h1 style={{fontFamily: 'Work Sans, sans-serif', fontWeight:"bold"}}>SUBMIT YOUR EVENT</h1>
                        </div>
                    </div>
                </div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <div className="panel-body">
                        <div className="panel panel-default">
                            <div className="bold_c_text" style={{backgroundColor:'#37a99b',color:'white',padding:'8px',fontFamily:'Crimson Text, serif !important'}}>
                                <Icon type="info-circle"/>
                                <span className="margin_font_location">Event Detail</span>
                            </div>
                            <div className="container" style={{width:'80%'}}>
                                <section>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="sel1">Event Title</label>
                                                    <FormItem>
                                                    {getFieldDecorator('eventTitle', {
                                                        initialValue: this.state.eventTitle,
                                                        rules: [{ required: true, message: 'Please input your Event Title!', whitespace: true }],
                                                    })(
                                                        <input type="text" className="form-control"/>
                                                    )}
                                                    </FormItem>
                                                </div>
                                            </div>
                                            <div className="col-md-6" style={{textAlign: 'left', display:'grid'}}>
                                                <label htmlFor="Price Mode"> Category </label>
                                                <FormItem>
                                                {getFieldDecorator('eventCategory', {
                                                    initialValue: this.state.eventCategory,
                                                    rules: [{ type: 'array', required: true, message: 'Please select your Event Category!' }],
                                                })(
                                                    <Cascader options={category} showSearch={{ filter }}/>
                                                )}
                                                </FormItem>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-6">
                                                <div className="row" style={{padding:'0px'}}>
                                                    <div className="col-md-7" style={{display:'grid'}}>
                                                        <label> State </label>
                                                        <FormItem>
                                                        {getFieldDecorator('state', {
                                                            initialValue: this.state.state,
                                                            rules: [{ type: 'array', required: true, message: 'Please select your State!' }],
                                                        })(
                                                            <Cascader options={statesUS} showSearch={{ filter }} onChange={this.onChangeState.bind(this)}/>
                                                        )}
                                                        </FormItem>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <label> City </label>
                                                        <FormItem>
                                                        {getFieldDecorator('city', {
                                                            initialValue: this.state.city,
                                                            rules: [{ type: 'array', required: true, message: 'Please select your City!' }],
                                                        })(
                                                            <Cascader options={citiesUS} showSearch={{ filter }}/>
                                                        )}
                                                        </FormItem>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="sel1">Date Range</label>
                                                <FormItem>
                                                {getFieldDecorator('dateRange', {
                                                    initialValue: [(this.state.startDate), (this.state.endDate)],
                                                    rules: [{ validator: this.validateDate.bind(this) }],
                                                })(
                                                    <RangePicker
                                                        ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                                        onChange={this.onChangeDate.bind(this)}
                                                    />
                                                )}
                                                </FormItem>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="sel1">Description</label>
                                                    <FormItem>
                                                        {getFieldDecorator('description', {
                                                            initialValue: this.state.description,
                                                            rules: [
                                                                {
                                                                    required: true, message: 'Please input your Description/Details!', whitespace: true
                                                                },
                                                                {
                                                                    validator: this.checkValue.bind(this)
                                                                }],
                                                        })(
                                                            <TextArea
                                                                rows={6}
                                                                maxLength="500"
                                                            style={{"marginBottom": "10px"}}/>
                                                        )}
                                                        <br />
                                                        <span style={{"float": "right"}}>{500 - this.state.desLength} Words</span>
                                                    </FormItem>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                  <div className="form-group">
                                                      <label htmlFor="sel1">Address</label>
                                                      <FormItem>
                                                      {getFieldDecorator('address', {
                                                          initialValue: this.state.address,
                                                          rules: [{ required: true, message: 'Please input your Address!', whitespace: true }],
                                                      })(
                                                          <Input  />
                                                      )}
                                                    </FormItem>
                                                  </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="panel panel-default">
                            <div className="bold_c_text" style={{backgroundColor:'#37a99b',color:'white',padding:'8px',fontFamily:'Crimson Text, serif !important'}}>
                                <Icon type="info-circle"/>
                                <span className="margin_font_location">Upload</span>
                            </div>
                            <div className="container" style={{width:'80%'}}>
                                <section>
                                <FormItem>
                                    {getFieldDecorator('images', {
                                        rules: [{ required: true, message: 'Please upload your Images!', whitespace: true }],
                                    })(
                                        <div>
                                            <Upload
                                                action="//jsonplaceholder.typicode.com/posts/"
                                                listType="picture-card"
                                                fileList={fileList}
                                                onPreview={this.handlePreview}
                                                onChange={this.handleChange}
                                            >
                                                {fileList.length >= 6 ? null : uploadButton}
                                            </Upload>
                                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                            </Modal>
                                        </div>
                                      )}
                                  </FormItem>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="panel panel-default">
                            <div className="bold_c_text" style={{backgroundColor:'#37a99b',color:'white',padding:'8px',fontFamily:'Crimson Text, serif !important'}}>
                                <Icon type="info-circle"/>
                                <span className="margin_font_location">Ticket Detail</span>
                            </div>
                            <div className="container" style={{width:'80%'}}>
                                <section>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-3">
                                                <label> Available Tickets &nbsp;&nbsp;&nbsp;Total</label>
                                                <div className="row">
                                                    <div className="col-md-6" style={{paddingLeft: '0px'}}>
                                                        <FormItem>
                                                        {getFieldDecorator('availableTickets', {
                                                            initialValue: this.state.availableTickets,
                                                            rules: [{ required: true, message: 'Please input your Available Tickets!', whitespace: true },
                                                            { validator: this.validateNumber.bind(this) }],
                                                        })(
                                                            <input type="text" className="form-control"/>
                                                        )}
                                                        </FormItem>
                                                    </div>
                                                    <div className="col-md-6" style={{paddingRight: '0px'}}>
                                                        <FormItem>
                                                        {getFieldDecorator('totalTickets', {
                                                            initialValue: this.state.totalTickets,
                                                            rules: [{ required: true, message: 'Please input your Total Tickets!', whitespace: true },
                                                            { validator: this.validateNumber.bind(this) }],
                                                        })(
                                                            <input type="text" className="form-control"/>
                                                        )}
                                                        </FormItem>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <label> Price </label>
                                                <div className="row">
                                                    <div className="col-md-6" style={{paddingLeft: '0px'}}>
                                                        <FormItem>
                                                        {getFieldDecorator('price', {
                                                            initialValue: this.state.price,
                                                            rules: [{ required: true, message: 'Please input your Price!', whitespace: true },
                                                            { validator: this.validateNumber.bind(this) }],
                                                        })(
                                                            <input type="text" className="form-control"/>
                                                        )}
                                                        </FormItem>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="ant-checkbox ant-checkbox-wrapper">
                                                            <Checkbox checked={this.state.free} onChange={this.onChangePrice.bind(this)}>(Free)</Checkbox>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {!this.state.free && <div className="col-md-6">
                                                <label> Mode Of Payment </label>
                                                <FormItem>
                                                {getFieldDecorator('paymentMode', {
                                                    initialValue: this.state.paymentMode,
                                                    rules: [{ validator: this.checkCheckBox }],
                                                })(
                                                    <CheckboxGroup options={optionsPayment} />
                                                )}
                                                </FormItem>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        {!this.state.free && <div className="col-md-6">
                                            <label>Ticket Delivery</label>
                                            <FormItem>
                                                {getFieldDecorator('delivery', {
                                                    initialValue: this.state.delivery,
                                                    rules: [{ validator: this.checkCheckBox }],
                                                })(
                                                    <CheckboxGroup options={optionsDelivery} />
                                                )}
                                            </FormItem>
                                        </div>}
                                        <div className="col-md-6">
                                        
                                            <label>Opening & closing Time</label>

                                              <div className="row" style={{marginTop: '-17px'}}>
                                              <div className="col-md-6">
                                                <FormItem>
                                                    {getFieldDecorator('openingTime', {
                                                        initialValue: moment(this.state.openingTime, 'HH:mm:ss'),
                                                        rules: [{ validator: this.validateTime.bind(this) }],
                                                    })(
                                                        <TimePicker placeholder="Opening Time" onChange={this.onOpeningTime.bind(this)} />
                                                    )}
                                                </FormItem>
                                              </div>
                                              <div className="col-md-6">
                                                <FormItem>
                                                    {getFieldDecorator('closingTime', {
                                                        initialValue: moment(this.state.closingTime, 'HH:mm:ss'),
                                                        rules: [{ validator: this.validateTime.bind(this) }],
                                                    })(
                                                        <TimePicker placeholder="Closing Time" onChange={this.onClosingTime.bind(this)} />
                                                    )}
                                                </FormItem>
                                              </div>
                                           </div>
                                        
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="panel panel-default">
                            <div className="bold_c_text" style={{backgroundColor:'#37a99b',color:'white',padding:'8px',fontFamily:'Crimson Text, serif !important'}}>
                                <Icon type="info-circle"/>
                                <span className="margin_font_location">Organizer Detail</span>
                            </div>
                            <div className="container" style={{width:'80%'}}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="sel1">Name</label>
                                            <FormItem>
                                                {getFieldDecorator('name', {
                                                    initialValue: this.state.name,
                                                    rules: [{ required: true, message: 'Please input your Contact Name!', whitespace: true }],
                                                })(
                                                    <Input  />
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="sel1">Email</label>
                                            <FormItem>
                                                {getFieldDecorator('email', {
                                                    initialValue: this.state.email,
                                                    rules: [{ type: 'email', message: 'The input is not valid E-mail!', whitespace: true },
                                                            { required: true, message: 'Please input your Contact Email!', whitespace: true }],
                                                })(
                                                    <Input  />
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="sel1">Website</label>
                                            <FormItem>
                                                <input type="text" id='website'
                                                    value={this.state.website}
                                                    className="form-control" onChange={this.onChangeValue.bind(this)}/>
                                            </FormItem>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="sel1">Phone</label>
                                              <FormItem>
                                              {getFieldDecorator('number', {
                                                  initialValue: this.state.number,
                                                  rules: [{ required: true, message: 'Please input your Number!', whitespace: true },
                                                  { validator: this.validateNumber.bind(this) }],
                                              })(
                                                  <input type="text" className="form-control"/>
                                              )}
                                              </FormItem>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="usr">Social Media Links</label>
                                            <FormItem>
                                                <div className='row' style={{paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <button
                                                        type="button"
                                                        className="btn btn-fb"
                                                        style={{width: '10%', display: 'inline-block', marginBottom: '4px', borderRadius: '0px', backgroundColor: '#3B5999'}}
                                                    >
                                                        <i className="fa fa-facebook" style={{color: 'white'}}></i>
                                                    </button>
                                                    <input type="text"
                                                        id='faceBook'
                                                        className="form-control"
                                                        value={this.state.faceBook}
                                                        onChange={this.onChangeValue.bind(this)}
                                                        style={{width: '90%', display: 'inline-block', borderRadius: '0px'}}
                                                        />
                                                </div>
                                                <div className='row' style={{paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <button
                                                        type="button"
                                                        className="btn btn-fb"
                                                        style={{width: '10%', display: 'inline-block', marginBottom: '4px', borderRadius: '0px', backgroundColor: '#0077B5'}}
                                                    >
                                                        <i className="fa fa-linkedin" style={{color: 'white'}}></i>
                                                    </button>
                                                    <input
                                                        type="text"
                                                        id='linkdIn'
                                                        className="form-control"
                                                        value={this.state.linkdIn}
                                                        onChange={this.onChangeValue.bind(this)}
                                                        style={{width: '90%', display: 'inline-block', borderRadius: '0px'}}
                                                        />
                                                </div>
                                                <div className='row' style={{paddingTop: '0px', paddingBottom: '0px'}}>
                                                    <button
                                                        type="button"
                                                        className="btn btn-fb"
                                                        style={{width: '10%', display: 'inline-block', marginBottom: '4px', borderRadius: '0px', backgroundColor: '#DC4E41'}}
                                                    >
                                                        <i className="fa fa-google-plus" style={{color: 'white'}}></i>
                                                    </button>
                                                    <input
                                                        type="text"
                                                        id='google'
                                                        className="form-control"
                                                        value={this.state.google}
                                                        onChange={this.onChangeValue.bind(this)}
                                                        style={{width: '90%', display: 'inline-block', borderRadius: '0px'}}/>
                                                </div>
                                            </FormItem>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row center_global row">
                        <button style={{textAlign: 'center', width:"45%"}} className="btn button_custom">Submit Event</button>
                    </div>
                </Form>
              <Footer />
            </div>
        )
    }
}

const WrappedEventForm = Form.create()(EventPortal);
export default WrappedEventForm;
