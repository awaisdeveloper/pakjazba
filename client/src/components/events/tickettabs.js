import React, { Component } from 'react';
import { Tabs, Radio } from 'antd';
import { Anchor } from 'antd';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';

const { Link } = Anchor;

const handleClick = (e, link) => {
  e.preventDefault();
  console.log(link);
};



const TabPane = Tabs.TabPane;

class TicketTabs extends Component{
  constructor(props) {
     super(props);
     this.state = {
       mode: 'top',
     };
   }

   handleModeChange = (e) => {
     const mode = e.target.value;
     this.setState({ mode });
   }
  render(){
    const { mode } = this.state
    return(

      <div className>
        <div className="container" style={isMobile && isTablet ? {width:"74%"} : {width:"45%"}}>
          <div className="row">
              <div className="col-md-12 hidden-xs">
                  <div className="tab" role="tabpanel">
                      <ul className="nav nav-tabs" role="tablist">
                          <a href="#headline1"><button className="btn btn-lg" style={{backgroundColor:'#37A99B',color:'white',margin:'11px'}}>Buy Ticket</button></a>
                          <a href="#headline2"><button className="btn btn-lg" style={{backgroundColor:'#37A99B',color:'white',margin:'11px'}}>Event Info</button></a>
                          <a href="#headline3"><button className="btn btn-lg" style={{backgroundColor:'#37A99B',color:'white',margin:'11px'}}>Term And Conditions</button></a>
                          {/*<li role="presentation" className="active"><Anchor affix={true} onClick={handleClick}><Link href="#headline1" title="Buy Ticket " /></Anchor></li>
                          <li role="presentation"><Anchor affix={false} onClick={handleClick}><Link href="#headline2" title="Event Info"  /></Anchor></li>
                          <li role="presentation"><Anchor affix={false} onClick={handleClick}><Link href="#headline3" title="Terms & Conditions" /></Anchor></li>*/}
                      </ul>
                  </div>
              </div>
              {/*<div className="visible-xs">
                <div className="tab" role="tabpanel">
                  <div className="nav nav-tabs" role="tablist">
                    <Tabs
                      defaultActiveKey="1"
                      tabPosition={mode}
                    >
                      <TabPane tab="" key="1"><a href="#headline1" aria-controls="home" role="tab" data-toggle="tab">Buy Tickets</a></TabPane>
                      <TabPane tab="" key="2"><a href="#headline2" aria-controls="profile" role="tab" data-toggle="tab">Event Info</a></TabPane>
                      <TabPane tab="" key="3"><a href="#headline3" aria-controls="messages" role="tab" data-toggle="tab">Terms & Conditions</a></TabPane>
                    </Tabs>
                  </div>
                </div>
              </div>*/}
          </div>
        </div>
        {/*<div className="container" style={{width:"100%"}}>
          <div class="tab-content">
              <div role="tabpanel" class="tab-pane fade in active" id="Section1">
                  <VitalInfo/>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="Section2">
                <OfferInfo/>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="Section3">
                <ImageForm/>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="Section4">
                <DescriptionForm/>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="Section5">
                <KeywordsForm/>
              </div>
          </div>
        </div>*/}
      </div>
    )
  }
}

export default TicketTabs;
