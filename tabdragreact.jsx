import * as React from "react";
import Sortable from 'sortablejs';
import { Tabs } from 'antd';
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
        handle: ".group-title" // Restricts sort start click/touch to the specified element
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  sortableGroupDecorator = (componentBackingInstance) => {
    console.log("qwer>>>",componentBackingInstance)
    // check if backing instance not null
    if (componentBackingInstance) {
      let options = {
        draggable: "div", // Specifies which items inside the element should be sortable
        group: "shared"
      };
      Sortable.create(componentBackingInstance, options);
    }
  };
  dragtab = (componentBackingInstance) => {
    console.log("qwer>>>",componentBackingInstance)
    // check if backing instance not null
    if (componentBackingInstance) {
      let options = {
        draggable: "div", // Specifies which items inside the element should be sortable
        group: "shared"
      };
      Sortable.create(componentBackingInstance, options);
    }
  };
  callback(key) {
    console.log(key);
  }
  
  render() {
    return (
       <div className="container" ref={this.sortableContainersDecorator}>
        <div className="group">
          <h2 className="group-title">Tab</h2>
          <div className="group-list" ref={this.sortableGroupDecorator}>
            <div className="group-list" ref={this.sortableGroupDecorator}>
              <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                <TabPane tab="Tab 1" key="1">
                  <div className="group-list" ref={this.sortableGroupDecorator}>
                    Tab Pane 1
                  </div>
                  
                </TabPane>
                <TabPane tab="Tab 2" key="2">Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">Tab Pane 3</TabPane>
              </Tabs>
            </div>
            <div>Content of Tab Pane 2</div>
            <div>Content of Tab Pane 3</div>
          </div>
          <h2 className="group-title">Tab1</h2>
          <div className="group-list" ref={this.dragtab}>
            <div className="group-list" ref={this.dragtab}>
              <div>Content of Tab Pane child 1</div>
              <div>Content of Tab Pane child 2</div>
              <div>Content of Tab Pane child 3</div>
            </div>
            <div className="group-list" ref={this.dragtab}>Content of Tab Pane 2</div>
            <div className="group-list" ref={this.dragtab}>Content of Tab Pane 3</div>
          </div>
        </div> 
      </div>
    );
  }
}