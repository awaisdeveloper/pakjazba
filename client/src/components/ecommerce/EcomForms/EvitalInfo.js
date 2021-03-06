import React, { Component } from 'react';
import {
  Form, Input, Select, AutoComplete, notification
} from 'antd';
import './Vitalinfo.css';
import LengthInput from './LengthComponent';
import WidthInput from './WidthComponent';
import WeightInput from './WeightComponent';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class VitalInfo extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    data: '',
    herfSec: '',
    product: '',
    manufacturer: '',
    brandName: '',
    manufacturerPart: '',
    pakageQuantity: '',
    materialType: '',
    color: '',
    shape: '',
    lenseColor: '',
    size: '',
    orientation: '',
    tension: '',
    gtin: '',
    productId: '',
    maximumWeight: '',
    shaft: '',
    UPC: '',
    variationTheme: '',
    itemLengthNumber: 0,
    itemLengthUnit: "inch",
    itemWeightNumber: 0,
    itemWeightUnit: "kg",
    itemWidthNumber: 0,
    itemWidthUnit: "inch"
  };

  componentDidMount() {
    // window.scrollTo(0,0);
    let data = this.props.data;
    if (data) {
      this.setState({
        product: data.product,
        manufacturer: data.manufacturer,
        brandName: data.brandName,
        manufacturerPart: data.manufacturerPart,
        pakageQuantity: data.pakageQuantity,
        materialType: data.materialType,
        color: data.color,
        shape: data.shape,
        lenseColor: data.lenseColor,
        size: data.size,
        orientation: data.orientation,
        tension: data.tension,
        productId: data.productId,
        maximumWeight: data.maximumWeight,
        shaft: data.shaft,
        UPC: data.UPC,
        gtin: data.gtin,
        variationTheme: data.variationTheme,
        itemLengthNumber: data.itemLength.itemLengthNumber,
        itemLengthUnit: data.itemLength.itemLengthUnit,
        itemWeightNumber: data.itemWeight.itemWeightNumber,
        itemWeightUnit: data.itemWeight.itemWeightUnit,
        itemWidthNumber: data.itemWidth.itemWidthNumber,
        itemWidthUnit: data.itemWidth.itemWidthUnit
      })
    }
    // console.log(data , 'data')
  }

  handleSelectChange = (value) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'bundle' ? 'part' : 'preorder'}!`,
    });
  }

  checkWidth = (rule, value, callback) => {
    if (value.itemWidthNumber > 0) {
      callback();
      return;
    }
    callback('Value must greater than zero!');
  }

  checkWeight = (rule, value, callback) => {
    if (value.itemWeightNumber > 0) {
      callback();
      return;
    }
    callback('Value must greater than zero!');
  }

  checkLength = (rule, value, callback) => {
    if (value.itemLengthNumber > 0) {
      callback();
      return;
    }
    callback('Value must greater than zero!');
  }

  validateNumber(rule, value, callback) {
    if (isNaN(value)) {
      callback('Please type Numbers');
    } else {
      callback()
    }
  }

  handleSubmit(e, key) {
    e.preventDefault();
    if (this.state.herfSec === '') {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          this.props.handleProps(values, 'offerInfo');
          this.props.offerStates();

          if (key === 'submit') {
            this.setState({
              herfSec: '#Section2'
            },
              () => {
                document.getElementById('evitalInfo').click();
              })
            let msg = 'Your vital info Form is submited successfully, Kindly fill next form'
            this.openNotification(msg)
          }
          else if (key === 'draft') {
            let msg = 'Your vital info Form is saved successfully.'
            this.openNotification(msg)
          }
        }
      });
    }
  }

  openNotification(msg) {
    notification.open({
      message: 'Success ',
      description: msg
    });
  };

  render() {
    // console.log(this.props.location.state)
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult, herfSec } = this.state;
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div className="container" style={{ width: "100%" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <div className="vitalbox">
                <h4> Listing Assitant </h4>
                <p> Supply enough information tomake
                  the buying decision easy. Please ensure that all
                  products and content comply with our Selling and Policies
                  restrictions including the Restructed products policy </p>
                <p style={{ textAlign: "center" }}> *Fields are required </p>
              </div>
            </div>
            <Form>
              <div className="col-md-9">
                <div className="vitalbox">
                  <div className="row">
                    {/*prducts*/}
                    <div className="col-md-12">
                      <div className="col-md-4 col-xs-4">
                        <div className="floatright">
                          <label>* Product:</label>
                          <p> (Max 250 characters) </p>
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-8">
                        <FormItem>
                          {getFieldDecorator('product', {
                            initialValue: this.state.product,
                            rules:
                              [{
                                required: true,
                                message: 'Please input your product!',
                                whitespace: true
                              }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Olympus camedia C-50 Digital Camera </p>
                      </div>
                    </div>
                    {/*Manufacturer*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Manufacturer:</label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('manufacturer', {
                            initialValue: this.state.manufacturer,
                            rules: [{
                              required: true,
                              message: 'Please enter Manufacturer',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Wilson; Speedo; STX </p>
                      </div>
                    </div>
                    {/*Brand Name*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Brand Name:</label>
                          <p> (max 50 character) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('brandName', {
                            initialValue: this.state.brandName,
                            rules: [{
                              required: true,
                              message: 'Please enter brandName',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Ralph, Lauren  </p>
                      </div>
                    </div>
                    {/*manufacturer part number*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Manufacturer Part Number:</label>
                          <p> (for most products, this will be identical to
                            the model number some manufacturers
                            distinguish part number from model number) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('manufacturerPart', {
                            initialValue: this.state.manufacturerPart,
                            rules: [{
                              required: true,
                              message: 'Please enter manufacturerpart',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: LE  </p>
                      </div>
                    </div>
                    {/*Package Quantity*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Package Quantity:</label>
                          <p> (Quantity of the item for sale in one package) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('pakageQuantity', {
                            initialValue: this.state.pakageQuantity,
                            rules: [{
                              required: true,
                              message: 'Please enter pakage quantity',
                              whitespace: true
                            },
                            { validator: this.validateNumber.bind(this) }]
                          })(
                            <Input
                            />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: 1  </p>
                      </div>
                    </div>
                    {/*Material Type*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Material Type:</label>
                          <p> (What Material is the product made out of) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('materialType', {
                            initialValue: this.state.materialType,
                            rules: [{
                              required: true,
                              message: 'Please enter materialtype',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: nylon, wood, steel  </p>
                      </div>
                    </div>
                    {/*Color*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Color:</label>
                          <p> (the color of the item) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('color', {
                            initialValue: this.state.color,
                            rules: [{
                              required: true,
                              message: 'Please enter color',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Red, Blue, Green  </p>
                      </div>
                    </div>
                    {/*Shape*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Shape:</label>
                          <p> (the shape of the item) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('shape', {
                            initialValue: this.state.shape,
                            rules: [{
                              required: true,
                              message: 'Please enter shape',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Round, Oval, Square  </p>
                      </div>
                    </div>
                    {/*Lense Color*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Lens Color:</label>
                          <p> (color of the lense in the item) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('lenseColor', {
                            initialValue: this.state.lenseColor,
                            rules: [{
                              required: true,
                              message: 'Please enter lensecolor',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Blue, orange  </p>
                      </div>
                    </div>
                    {/*Size*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Size:</label>
                          <p> (the number or text version if the item's size) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('size', {
                            initialValue: this.state.size,
                            rules: [{
                              required: true,
                              message: 'Please enter size',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Small, Large, X-Large  </p>
                      </div>
                    </div>
                    {/*Hand Orientation*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Hand orientation:</label>
                          <p> (is this item for lefties or for fighties) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('orientation', {
                            initialValue: this.state.orientation,
                            rules: [{
                              required: true,
                              message: 'Please enter orientation',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: Right, Left  </p>
                      </div>
                    </div>
                    {/*Tension Support*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Tension Supported:</label>
                          <p> (the tension that can be supported bu this item) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('tension', {
                            initialValue: this.state.tension,
                            rules: [{
                              required: true,
                              message: 'Please enter tension', whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top">  Example: 50 pounds, low, medium, high  </p>
                      </div>
                    </div>
                    {/*GTIN Exemption reason*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* GTIN exemption reason:</label>
                          <p> (Reason for getting an exemption from having an unique identifier) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem
                          wrapperCol={{ span: 12 }}
                        >
                          {getFieldDecorator('gtin', {
                            initialValue: this.state.gtin,
                            defaultValue: Option.initialValue,
                            rules: [{ required: true, message: 'Please select GTIN' }],
                          })(
                            <Select
                              placeholder="Please select GTIN"
                              onChange={this.handleSelectChange}
                            >
                              <Option value="bundle">bundle</Option>
                              <Option value="part">part</Option>
                              <Option value="preorder">preorder</Option>
                            </Select>
                          )}
                        </FormItem>
                        <p className="margin-top">  Example: 50 pounds, low, medium, high  </p>
                      </div>
                    </div>
                    {/*Related Product ID*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Related Product ID:</label>
                          <p> (indicates the types of the related product id for listing) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('productId', {
                            initialValue: this.state.productId,
                            rules: [{
                              required: true,
                              message: 'Please enter product id', whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top">  Example: upc ean gtn  </p>
                      </div>
                    </div>
                    {/*Item Display Length*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Item Display Length:</label>
                          <p> (Required field, if this sold by length) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('itemLength', {
                            initialValue: { itemLengthNumber: this.state.itemLengthNumber, itemLengthUnit: this.state.itemLengthUnit },
                            rules: [{ validator: this.checkLength }],
                          })(
                            <LengthInput />
                          )}
                        </FormItem>
                        <p className="margin-top" style={{ marginTop: "0px" }}>  Example: 50 pounds, low, medium, high  </p>
                      </div>
                    </div>
                    {/*Width*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Width:</label>
                          <p> (the width if the item) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <Form layout="inline">
                          <FormItem>
                            {getFieldDecorator('itemWidth', {
                              initialValue: { itemWidthNumber: this.state.itemWidthNumber, itemWidthUnit: this.state.itemWidthUnit },
                              rules: [{ validator: this.checkWidth }],
                            })(
                              <WidthInput />
                            )}
                          </FormItem>
                        </Form>
                        <p className="margin-top" style={{ marginTop: "0px" }}>  Example: 50 pounds, low, medium, high  </p>
                      </div>
                    </div>
                    {/*Item Display Weight*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Item Display Weight:</label>
                          <p> (Required field, if this item sold by weight) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('itemWeight', {
                            initialValue: { itemWeightNumber: this.state.itemWeightNumber, itemWeightUnit: this.state.itemWeightUnit },
                            rules: [{ validator: this.checkWeight }],
                          })(
                            <WeightInput />
                          )}
                        </FormItem>
                        <p className="margin-top" style={{ marginTop: "0px" }}>  Example: 50 pounds, low, medium, high  </p>
                      </div>
                    </div>
                    {/*Display Maximum weight*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label> Display Maximum Weight Recommendation:</label>
                          <p> (is this item buit for leftless or rightless?) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('maximumWeight', {
                            initialValue: this.state.maximumWeight,
                            rules: [{
                              required: false,
                              message: 'Please enter maximum weight', whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top">  Example: 350 pounds  </p>
                      </div>
                    </div>
                    {/*Shaft length*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Shaft Length:</label>
                          <p> (is this item buikt for leftles or rightles?) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('shaft', {
                            initialValue: this.state.shaft,
                            rules: [{
                              required: true,
                              message: 'Please enter shaft', whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top">  Example: Wilson, speedo, STX  </p>
                      </div>
                    </div>
                    {/*Variation Theme */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label> Variation Theme:</label>
                          <p> (How your product vary) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem
                          wrapperCol={{ span: 12 }}
                        >
                          {getFieldDecorator('variationTheme', {
                            initialValue: this.state.variationTheme,
                            defaultValue: Option.initialValue,
                            rules: [{ required: false, message: 'Please select variation Theme' }],
                          })(
                            <Select
                              placeholder="Select "
                              onChange={this.handleSelectChange}
                            >
                              <Option value="wilson">Wilson</Option>
                              <Option value="speedo">Speedo</Option>
                              <Option value="stx">STX</Option>
                            </Select>
                          )}
                        </FormItem>
                        <p className="margin-top">  Example: Wilson, Speedo, STX  </p>
                      </div>
                    </div>
                    {/*UPC or EAN*/}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* UPC or EAN:</label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('UPC', {
                            initialValue: this.state.UPC,
                            rules: [{
                              required: true,
                              message: 'Please Enter UPC or EAN', whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>

          </div>
          <div className="col-md-12">
            <div className="row col-md-9 col-md-offset-3" style={{ paddingTop: "10px", paddingLeft: "" }}>
              <div className="col-md-3 col-xs-4">
                <div className="row center_global row">
                  <button style={{ textAlign: 'center', width: "50%" }}
                    className="btn ecombutton"
                    onClick={() => this.props.form.resetFields()}>Cancel</button>
                </div>
              </div>
              <div className="col-md-3 col-xs-4">
                <div className="row center_global row">
                  <button style={{ textAlign: 'center', width: "70%" }}
                    className="btn ecombutton" onClick={(e) => this.handleSubmit(e, 'draft')}>
                    Save as Draft</button>
                </div>
              </div>
              <div className="col-md-3 col-xs-4">
                <div className="row center_global row">
                  <button style={{ textAlign: 'center', width: "70%" }}
                    className="btn button_custom" onClick={(e) => this.handleSubmit(e, 'submit')}>
                    <a href={herfSec} aria-controls="profile" role="tab" data-toggle="tab" id='evitalInfo'>
                      Next
                    </a>
                  </button>
                </div>
              </div>
              <div className="col-md-3">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedBusinessForm = Form.create()(VitalInfo);
export default WrappedBusinessForm;
