import * as React from "react";
import './index.scss'
import Sortable from 'sortablejs';
import { Tabs,Card} from 'antd';
const TabPane = Tabs.TabPane;

export default class TabDrag extends React.Component {
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
            <TabPane tab="Tab 1" key="1" >
              <div className="box" ref={this.dragCompTd} style={{padding:"10px"}}>
                <div className="item">
                   Drag Tab Pane 1
                </div>
                <div className="item">
                  Drag Tab Pane 2
                </div>
              </div> 
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              <div className="box" ref={this.dragCompTd} style={{padding:"10px"}}>
                <div className="task">
                    Drag Tab Pane 2
                </div>
              </div>
            </TabPane>
        </Tabs>
    );
  }
}