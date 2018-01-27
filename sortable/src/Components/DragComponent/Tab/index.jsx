import * as React from "react";
import './index.scss'
import Sortable from 'sortablejs';
import { Tabs,Card} from 'antd';
const TabPane = Tabs.TabPane;

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  callback(key) {
    console.log(key);
  }

  dragCompTd = (componentBackingInstance) =>{
    if(componentBackingInstance){
      let option = {
        draggable: ".item",
        group: {
          name : ".box",
          put: true,
        },
        sort : true,
        animation: 150,
      }
      Sortable.create(componentBackingInstance, option)
    }
  }
  render() {
    return (
        <Tabs>
            <TabPane tab="Tab 1" key="1">
              <div className="box" ref={this.dragCompTd} style={{padding:"10px",border:"1px solid #e8e6e6",minHeight:"100px"}}>
                    Drag Tab Pane 1
              </div> 
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              <div className="box" ref={this.dragCompTd} style={{padding:"10px",border:"1px solid #e8e6e6",minHeight:"100px"}}>
                    Drag Tab Pane 2
              </div>
            </TabPane>
        </Tabs>
    );
  }
}

export default Tab