import React, { Component } from 'react';
import { Tabs, Menu, Dropdown, Icon, Form, Button, Tooltip, Row, Col,message } from 'antd';
import { SAVEFILE,SAVEPOSTS,BRIEFLYINFO,SAVEVOTE,SAVELINK,CHATTER } from '../utils/Api.jsx';
import { Request } from '../utils/fetch.js';
import Post from './Post.js';
import File from './File.js';
import Link from './Link.js';
import Vote from './Vote.js';
const TabPane = Tabs.TabPane;

class Chatter extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      chatterButtons: [],
      chatterInfo: [],     // 微贴信息
      khemail: "",
      syrvalue: ""
    }
  }
  componentDidMount() {
    // 对象简要信息
    Request( BRIEFLYINFO + "?binding=" + this.props.binding, {
      "id": this.props.id,
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          chatterButtons:[],
        })
      }else{
        this.setState({
          chatterButtons: json.chatterButtons,
        })
      }
    });
  }
  render() {
    const datas = this.state.chatterButtons.map((item, index) => {
      if (item.name == "post") {
        return (
          <TabPane tab={item.label} key={index}>
            <Post handleSubmitpost={this.handleSubmitpost.bind(this)} />
          </TabPane>
        )
      }
      if (item.name == "file") {
        return (
          <TabPane tab={item.label} key={index}>
            <File handleSubmitFile={this.handleSubmitFile.bind(this)} />
          </TabPane>
        )
      }
      if (item.name == "vote") {
        return (
          <TabPane tab={item.label} key={index}>
            <Vote handleSubmitVote={this.handleSubmitVote.bind(this)} />
          </TabPane>
        )
      }
      if (item.name == "link") {
        return (
          <TabPane tab={item.label} key={index}>
            <Link handleSubmitLink={this.handleSubmitLink.bind(this)} />
          </TabPane>
        )
      }
    })
    return (
      <div className="chatter-tabs">
        <Tabs defaultActiveKey="0">
          {datas}
        </Tabs>
      </div>
    )
  }

  // 保存更新微贴信息
  // 保存刷新->张贴
  handleSubmitpost = (Value, key, date, e) => {
    e.preventDefault();
    const data = Value;
    data.id = this.props.id
    data.binding = this.props.binding
    Request( SAVEPOSTS + "?binding=" + this.props.binding, data).then((json) => {
      message.success(json.message, 8);
      Request(CHATTER + "?binding=" + this.props.binding, {
        "id": this.props.id,
        "pageSize": 20,
        "pageNum": 1,
        "dateScope": "all"
      }).then((json) => {
        if(json.flag=="ERROR"){
          this.setState({
            chatterInfo: []
          })
        }else{
          this.setState({
            chatterInfo: []
          })
        }
      });
    });
  }

  // 保存刷新->文件
  handleSubmitFile = (Value, key, dataURL, name, size, type, e) => {
    e.preventDefault();
    const data = Value;
    data.id = this.props.id
    data.binding = this.state.bindings
    data.fileName = name
    data.fileType = type
    data.fileData = dataURL
    data.fileData = data.fileData.split(',')[1];
    Request( SAVEFILE + "?binding=" + this.props.binding, data).then((json) => {
      if (json.flag == "SUCCESS") {
        message.success(json.message, 8);
      } else {
        message.success("上传失败，请重新上传。", 8);
      }
      Request(CHATTER + "?binding=" + this.props.binding, {
        "id": this.props.id,
        "pageSize": 20,
        "pageNum": 1,
        "dateScope": "all"
      }).then((json) => {
        if(json.flag=="ERROR"){
          this.setState({
            chatterInfo: []
          })
        }else{
          this.setState({
            chatterInfo: json.data
          })
        } 
      });
    });
  }

  // 保存刷新->投票
  handleSubmitVote = (Value, key, date, e) => {
    e.preventDefault();
    var data = new Object();
    var option1 = new Object();
    option1.option = Value.Option1
    var option2 = new Object();
    option2.option = Value.Option2
    var option3 = new Object();
    option3.option = Value.Option3
    var arr = new Array();
    arr[0] = option1
    arr[1] = option2
    arr[2] = option3
    data.id = this.props.id
    data.binding = this.props.binding
    data.content = Value.content
    data.choiseOption = arr
    Request( SAVEVOTE + "?binding=" + this.props.binding, data).then((json) => {
      message.success(json.message, 8);
      Request(CHATTER + "?binding=" + this.props.binding, {
        "id": this.props.id,
        "pageSize": 20,
        "pageNum": 1,
        "dateScope": "all"
      }).then((json) => {
        if(json.flag=="ERROR"){
          this.setState({
            chatterInfo: []
          })
        }else{
          this.setState({
            chatterInfo: json.data
          })
        }
      });
    });
  }

  // 保存刷新->链接
  handleSubmitLink = (Value, key, date, e) => {
    e.preventDefault();
    const data = Value;
    data.id = this.props.id
    data.binding = this.state.bindings
    Request( SAVELINK + "?binding=" + this.props.binding, data).then((json) => {
      message.success(json.message, 8);
      Request(CHATTER + "?binding=" + this.props.binding, {
        "id": this.props.id,
        "pageSize": 20,
        "pageNum": 1,
        "dateScope": "all"
      }).then((json) => {
        if(json.flag=="ERROR"){
          this.setState({
            chatterInfo: []
          })
        }else{
          this.setState({
            chatterInfo: json.data
          })
        }
      });
    });
  }

};

export default Chatter;