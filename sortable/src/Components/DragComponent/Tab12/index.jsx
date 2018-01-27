import * as React from "react";
import './index.scss'
import Sortable from 'sortablejs';
import { Tabs,Card} from 'antd';
import TabDrag from './tab.jsx'
const TabPane = Tabs.TabPane;

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  sortableContainersDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      let options = {
        handle: ".group" // Restricts sort start click/touch to the specified element
      };
      Sortable.create(componentBackingInstance, options);
    }
  };
  callback(key) {
    console.log(key);
  }
  dragCompList = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        draggable: ".item",
        group: {
          name : '.box',
          pull: 'clone',
          put : false
        },
        sort : false,
        animation: 150,
      }
      Sortable.create(componentBackingInstance, options)
    }
  }

  dragCompTd = (componentBackingInstance) =>{
    if(componentBackingInstance){
      let option = {
        draggable: ".item",
        group: {
          name : ".box",
          put:true,
        },
       sort : true,
        animation: 150,
      }
      Sortable.create(componentBackingInstance, option)
    }
  }
  render() {
    return (
      <div className="tab" style={{width:"100%"}}>
        <div className="group" ref={this.sortableContainersDecorator }>
        <div className="box" ref={this.dragCompTd} style={{float:"left",margin:"10px"}}>
            <TabDrag 
              dragCompTd={this.dragCompTd.bind(this)}
            />
        </div>
        <div className="box" ref={this.dragCompTd} style={{float:"left",margin:"10px"}}>
            <TabDrag 
              dragCompTd={this.dragCompTd.bind(this)}
            />
        </div>
        <div className="box" ref={this.dragCompTd} style={{float:"left",margin:"10px"}}>
            <TabDrag 
              dragCompTd={this.dragCompTd.bind(this)}
            />
        </div>
        <Card style={{marginTop:"20px",float:"left"}}>
          <Tabs className="box"  ref={this.dragCompTd}>
              <TabPane tab="Tab 1" key="1" >
                <div className="box" ref={this.dragCompTd} style={{padding:"10px"}}>
                  Drag Tab Pane 1
                </div>
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                <div className="box" ref={this.dragCompTd} style={{padding:"10px"}}>
                    Drag Tab Pane 2
                    {this.props.children}
                </div>
              </TabPane>
          </Tabs>
        </Card>
        </div>
      </div>
    );
  }
}