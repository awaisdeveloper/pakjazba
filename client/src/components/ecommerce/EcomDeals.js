import React, {Component} from 'react';
import './EcomDeals.css'

class DealsEcom extends Component{
  render(){
    return(
      <div className="container" style={{width:"80%"}}>
            <div className="row">
              <div cl assName="col-md-12">

                  <div className="col-md-6 col-sm-12">
                    <div className="Dealscard">
                      <div className="col-md-6 col-sm-6">
                        <h4 className="textcard"> Accesories on Budget </h4>

                      </div>
                      <div className="col-md-6 col-sm-6">
                        <img src='./images/ecommerce/81JiWgGRqxL._AC_SY200_.jpg' style={{width:"100%", height:"200px"}}/>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <div className="Dealscard">
                      <div className="col-md-6 col-sm-6">
                        <h4 className="textcard"> Explore Our Daily Deals </h4>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <img src='./images/ecommerce/download (4).jpg' style={{width:"100%", height:"200px"}}/>
                      </div>
                    </div>
                  </div>

                  {/*<div className="Dealscard">
                      <div className="row">
                          <div className="col-md-6">
                            <div className="">
                                  <h2 className="textcard"> Accesories On Budget </h2>
                            </div>
                          </div>
                          <div className="col-md-6">
                              <img className="lib-img-show" src="./images/ecommerce/download (4).jpg" style={{width:"90%"}}/>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="col-md-6" style={{padding:"30px"}}>
                  <div className="Dealscard">
                      <div className="row">
                          <div className="col-md-6">
                            <div className="">
                                  <h2 className="textcard"> Explore Our Daily Deals </h2>
                            </div>
                          </div>
                          <div className="col-md-6">
                              <img className="lib-img-show" src="./images/ecommerce/download (4).jpg" style={{width:"90%"}}/>
                          </div>
                      </div>
                  </div>*/}
              </div>
            </div>

            {/*<div className="row">
              <h4 style={{textAlign:"center"}}> We Have Recommendations for You </h4>
              <button type="button" className="btn btn-sm btn2-success font-style" style={{width:"100%"}}>Shop Now</button>
            </div>*/}

      </div>

    )
  }
}

export default DealsEcom;