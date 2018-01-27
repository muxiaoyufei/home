import React, { Component } from 'react';
import { Tabs, Modal, Input, DatePicker, Select, Button, Form, Row, Col, Icon, Checkbox, message } from 'antd';
import { Request } from '../utils/fetch.js';
import { RELEVANTOBJECT, BRIEFLYINFO ,NEWEVENT,ACTIVITY,NEWTASK,SENDEMAIL,RECORDPHONE,DELETEOBJ} from '../utils/Api.jsx';
import NewTask from './NewTask.js';
import NewEvent from './NewEvent.js';
import SavePhone from './SavePhone.js';
import SendEmail from './SendeMail.js';
import Timeaxis from './timeaxis/index.js';
import moment from 'moment';
import './active.css';
const TabPane = Tabs.TabPane;
const InputGroup = Input.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class Actives extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      active: '',
      visible: false,
      loading: false,
      type: '',
      all: [],
      activeobj: '',
      correlation: [],//相关项 所有对象
      whoObjs: [],//  潜在客户 联系人
      activityButtons: [],
      future : [],
      past : [],
      pageNum: 1,

    }
  }
  componentDidMount() {
    this.setState({
      active: [
        {
          "label": "新建事件",
          "url": "",
          "name": "newEvent"
        },
        {
          "label": "记录电话",
          "url": "",
          "name": "savePhone"
        },
        {
          "label": "新建任务",
          "url": "",
          "name": "newTask"
        },
        {
          "label": "发送电子邮件",
          "url": "",
          "name": "sendeMail"
        }
      ]
    })

    // 活动历史
    Request(ACTIVITY + "?binding=" + this.props.binding, {
      id: this.props.id,
      pageSize: 20,
      pageNum: this.state.pageNum,
      dateScope: 'all',
      objectScope: 'all'
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          future: [],
          past: []
        })
      }else{
        this.setState({
          future: json.future,
          past: json.past
        })
      }
    });

    // 对象简要信息
    Request(BRIEFLYINFO + "?binding=" + this.props.binding, {
      "id": this.props.id,
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          activityButtons:[],
        })
      }else{
        this.setState({
          activityButtons: json.activityButtons,
        })
      }
    });

    // 获取相关项
    Request(RELEVANTOBJECT + "?binding=" + this.props.binding, {
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          correlation: [],
          whoObjs: [],
        })
      }else{
        this.setState({
          correlation: json.data,
          whoObjs: json.whoObjs,
        })
      }
    });
  }

  // 删除活动后更新活动历史
  handledelClick = (item) => {
    message.success('删除成功', 8);
  }

  handleOk = () => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        loading: false,
      });
    }, 1000);
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { getFieldProps } = this.props.form;
    const datas = this.state.activityButtons.map((item, index) => {
      if (item.name == "newEvent") {
        return (
          <TabPane tab={item.label} key={index}>
            <NewEvent 
              whoObjs={this.state.whoObjs} 
              correlation={this.state.correlation} 
              handleSubmitsj={this.handleSubmitsj.bind(this)} 
              type={item.name} 
              objectApi={this.props.objectApi} 
              id={this.props.id} 
              binding={this.props.binding} 
            />
          </TabPane>
        )
      }
      if (item.name == "newTask") {
        return (
          <TabPane tab={item.label} key={index}>
            <NewTask 
              whoObjs={this.state.whoObjs} 
              correlation={this.state.correlation} 
              handleSubmit={this.handleSubmitxj.bind(this)} 
              typetask={item.name} 
              id={this.props.id} 
              binding={this.props.binding} 
            />
          </TabPane>
        )
      }
      if (item.name == "sendeMail") {
        return (
          <TabPane tab={item.label} key={index}>
            <SendEmail
              whoObjs={this.state.whoObjs} 
              correlation={this.state.correlation} 
              khemail={this.props.khemail} 
              handleSubmityj={this.handleSubmityj.bind(this)} 
              type={item.name} 
              id={this.props.id} 
              binding={this.props.binding} 
            />
          </TabPane>
        )
      }
      if (item.name == "savePhone") {
        return (
          <TabPane tab={item.label} key={index}>
            <SavePhone 
              whoObjs={this.state.whoObjs} 
              correlation={this.state.correlation} 
              handleSubmitjl={this.handleSubmitjl.bind(this)} 
              type={item.name} 
              id={this.props.id} 
              binding={this.props.binding} 
            />
          </TabPane>
        )
      }
    })
    const listAll = this.state.all.map((item, index) => {
      const ltype = item.left.type
      const rtype = item.right.type
      var lcont, rcont;
      if (ltype == 'S') {
        var data = item.left.data.map((items, index) => {
          return (
            <Option value={items.value} key={index}>{items.value}</Option>
          )
        })
        lcont = <InputGroup compact className="sel">
          <Select style={{ width: '100%' }} placeholder={item.left.value} {...getFieldProps(item.left.fined) }>
            {data}
          </Select>
        </InputGroup>
      }
      if (rtype == 'S') {
        var data = item.right.data.map((items, index) => {
          return (
            <Option value={items.value} key={index}>{items.value}</Option>
          )
        })
        rcont = <InputGroup compact className="sel">
          <Select style={{ width: '100%' }} placeholder={item.right.value} {...getFieldProps(item.right.fined) }>
            {data}
          </Select>
        </InputGroup>
      }
      if (ltype == 'F') {
        lcont = <Input placeholder={item.left.value} ref="inputs" key={item.left.fined} {...getFieldProps(item.left.fined) } />
      }
      if (rtype == 'F') {
        rcont = <Input placeholder={item.right.value} ref="inputs" key={item.right.fined} {...getFieldProps(item.right.fined) } />
      }
      if (ltype == 'T') {
        lcont = <TextArea placeholder={item.left.value} ref="inputs" key={item.left.fined} {...getFieldProps(item.left.fined) } />
      }
      if (rtype == 'T') {
        rcont = <TextArea placeholder={item.right.value} ref="inputs" key={item.right.fined} {...getFieldProps(item.right.fined) } />
      }
      if (ltype == 'D') {
        const dateFormat = 'YYYY/MM/DD';
        lcont = <InputGroup compact>
          <DatePicker style={{ width: '100%' }} format={dateFormat} key={item.left.fined} {...getFieldProps(item.left.fined) } />
        </InputGroup>
      }
      if (rtype == 'D') {
        const dateFormat = 'YYYY/MM/DD';
        rcont = <InputGroup compact>
          <DatePicker style={{ width: '100%' }} format={dateFormat} key={item.right.fined} {...getFieldProps(item.right.fined) } />
        </InputGroup>
      }
      return (
        <Row key={index}>
          <Col span={24}>
            <FormItem >
              {
                <div className="box">
                  <div className="sub">
                    <span>{item.left.name}</span>
                  </div>
                  <div className="main mains">
                    {lcont}
                  </div>
                </div>
              }
            </FormItem>
          </Col>
          <Col span={24} >
            <FormItem>
              {
                <div className="box">
                  <div className="sub">
                    <span>{item.right.name}</span>
                  </div>
                  <div className="main mains">
                    {rcont}
                  </div>
                </div>
              }
            </FormItem>
          </Col>
        </Row>
      )
    })
    return (
      <div className="active-tabs">
        <Tabs defaultActiveKey="0">{datas}</Tabs>
        <Timeaxis 
          future={this.state.future}
          past={this.state.past}
          handleSubmitpagenum={this.handleSubmitpagenum.bind(this)}
          handledelClick={this.handleDelActivite.bind(this)}
          handleeditClick={this.handleeditClick}
          handleactivity={this.handleactivity.bind(this)}
        />
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form onSubmit={this.handleEditActivite.bind(this, this.props.form.getFieldsValue(), this.state.all, this.state.activeobj)}>
            {listAll}
            <div className="base_btn">
              <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>
              <Button key="submit" type="primary" htmlType="submit" size="large" loading={this.state.loading} onClick={this.handleOk}>
                确认
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    )
  }

  // 刷新-》编辑保存活动历史
  handleEditActivite = (Value, items, objs, e) => {
    e.preventDefault();
    var data = Value;
    items.map((item, index) => {
      var lnam = item.left.name
      var rnam = item.right.name
      if (typeof (data[lnam]) == 'undefined') {
        data[lnam] = item.left.value
      }
      if (typeof (data[rnam]) == 'undefined') {
        data[rnam] = item.right.value
      }
      if (data[lnam] instanceof Array) {
        data[lnam + '00'] = data[lnam][0]
        data[lnam + '01'] = data[lnam][1]
        data[lnam + '02'] = data[lnam][2]
        data[lnam + "03"] = data[lnam][3]
        data[lnam] = item.left.value

      }
      if (data[rnam] instanceof Array) {
        data[rnam + '00'] = data[rnam][0]
        data[rnam + '01'] = data[rnam][1]
        data[rnam + '02'] = data[rnam][2]
        data[rnam + "03"] = data[rnam][3]
        data[rnam] = item.right.value

      }
    })
    var datas = []
    for (var key in data) {
      var obj = new Object()
      obj.name = key;
      if (typeof (data[key]) == 'undefined') {
        obj.value = ' ';
      } else {
        obj.value = data[key];
      }
      datas.push(obj)
    }
    var obj = new Object()
    obj.listid = objs.id
    obj.type = objs.type
    obj.binding = this.props.binding
    obj.data = datas
    var newdata = JSON.stringify(obj)

  }

  // 刷新->新建事件newevent
  handleSubmitsj = (Value, id) => {
    const data = new Object();
    data.id = document.getElementById('相关项event').value;
    data.binding = this.props.binding
    data.theme = Value.themeevent
    data.state = Value.stateevent
    data.startTime = Value.startTimeevent
    data.endTime = Value.endTimeevent
    data.distribution = id.toString()
    if (data.state == '进行中') {
      data.state = '1'
    } else if (data.state == '已结束') {
      data.state = '2'
    } else {
      data.state = '3'
    }
    data.startTime = JSON.stringify(data.startTime).replace("T", " ").replace("Z", "")
    data.endTime = JSON.stringify(data.endTime).replace("T", " ").replace("Z", "")
    if (parseInt(data.startTime.slice(12, 14)) + 8 > 24) {
      var num = parseInt(data.startTime.slice(9, 11)) + 1
      var nums = parseInt(data.startTime.slice(12, 14)) + 8 - 24
      data.startTime = data.startTime.slice(0, 10) + num.toString() + data.startTime.slice(11, 12) + nums.toString() + data.startTime.slice(14)
    } else {
      var str = parseInt(data.startTime.slice(12, 14)) + 8
      data.startTime = data.startTime.slice(0, 12) + str.toString() + data.startTime.slice(14)
    }
    if (parseInt(data.endTime.slice(12, 14)) + 8 > 24) {
      var num = parseInt(data.endTime.slice(9, 11)) + 1
      var nums = parseInt(data.endTime.slice(12, 14)) + 8 - 24
      data.endTime = data.endTime.slice(0, 10) + num.toString() + data.endTime.slice(11, 12) + nums.toString() + data.endTime.slice(14)
    } else {
      var str = parseInt(data.endTime.slice(12, 14)) + 8
      data.endTime = data.endTime.slice(0, 12) + str.toString() + data.endTime.slice(14)
    }
    data.startTime = JSON.parse(data.startTime)
    data.endTime = JSON.parse(data.endTime)
    data.whoId = document.getElementById('名称event').value;
    Request( NEWEVENT + "?binding=" + this.props.binding, data).then((json) => {
      if (json.flag == "SUCCESS") {
        message.success(json.message, 8);
        Request(ACTIVITY + "?binding=" + this.props.binding, {
          id: this.props.id,
          pageSize: 20,
          pageNum: this.state.pageNum,
          dateScope: 'all',
          objectScope: 'all'
        }).then((json) => {
          if(json.flag=="ERROR"){
            this.setState({
              future: [],
              past: []
            })
          }else{
            this.setState({
              future: json.future,
              past: json.past
            })
          }  
        });
      } else {
        message.error(json.message, 8);
      }
    });
  }

  //更新活动历史
  // 刷新->新建任务newtask
  handleSubmitxj = (Value, id) => {
    const data = new Object();
    data.id = document.getElementById('相关项task').value;
    data.binding = this.props.binding
    data.distribution = id.toString()
    data.theme = Value.themetask
    data.endTimetask = Value.endTimetask
    data.relatedt = Value.relatedt
    data.statetask = Value.statetask
    data.prioritytask = Value.prioritytask
    if (data.state == '进行中') {
      data.state = '1'
    } else if (data.state == '已结束') {
      data.state = '2'
    } else {
      data.state = '3'
    }
    if (data.priority == '高') {
      data.priority = '3'
    } else if (data.priority == '中') {
      data.priority = '2'
    } else {
      data.priority = '1'
    }
    data.related = document.getElementById('相关项task').value;
    data.whoId = document.getElementById('名称task').value;
    Request( NEWTASK + "?binding=" + this.props.binding, data).then((json) => {
      if (json.flag == "SUCCESS") {
        message.success(json.message, 8);
        Request(ACTIVITY + "?binding=" + this.props.binding, {
          id: this.props.id,
          pageSize: 20,
          pageNum: this.state.pageNum,
          dateScope: 'all',
          objectScope: 'all'
        }).then((json) => {
          if(json.flag=="ERROR"){
            this.setState({
              future: [],
              past: []
            })
          }else{
            this.setState({
              future: json.future,
              past: json.past
            })
          } 
        });
      } else {
        message.error(json.message, 8);
      }
    });
  }

  // 刷新->发送电子邮件
  handleSubmityj = (Value, email, e) => {
    e.preventDefault();
    const data = Value;
    if (email != '') {
      data.receiver = email
    }
    data.id = this.props.id;
    data.binding = this.props.binding
    Request(SENDEMAIL + "?binding=" + this.props.binding, data).then((json) => {
      if (json.flag == "SUCCESS") {
        message.success(json.message, 8);
        Request(ACTIVITY + "?binding=" + this.props.binding, {
          id: this.props.id,
          binding: this.props.binding,
          pageSize: 20,
          pageNum: this.state.pageNum,
          dateScope: 'all',
          objectScope: 'all'
        }).then((json) => {
          if(json.flag=="ERROR"){
            this.setState({
              future: [],
              past: []
            })
          }else{
            this.setState({
              future: json.future,
              past: json.past
            })
          }  
        });
      } else {
        message.error(json.message, 8);
      }
    });
  }

  // 刷新->记录电话savephone
  handleSubmitjl = (Value) => {
    const data = new Object();
    data.theme = Value.themephone
    data.message = Value.messagephone
    data.id = Value.id
    data.related = Value.related
    data.name = Value.name
    data.binding = this.props.binding
    Request(RECORDPHONE + "?binding=" + this.props.binding, data).then((json) => {
      if (json.flag == "SUCCESS") {
        message.success(json.message, 8);
        Request(ACTIVITY + "?binding=" + this.props.binding, {
          id: this.props.id,
          binding: this.props.binding,
          pageSize: 20,
          pageNum: this.state.pageNum,
          dateScope: 'all',
          objectScope: 'all'
        }).then((json) => {
          if(json.flag=="ERROR"){
            this.setState({
              future: [],
              past: []
            })
          }else{
            this.setState({
              future: json.future,
              past: json.past
            })
          }
        });
      } else {
        message.error(json.message, 8);
      }
    });
  }

  // 时间筛选线
  handleactivity = (Value, e) => {
    e.preventDefault();
    const data = Value;
    var leftvalue, rightvalue, leftvalue1, leftvalue2, leftvalue3, leftvalue4;
    if (data.email == undefined && data.event == undefined && data.phone == undefined && data.task == undefined) {
      leftvalue = 'all'
    } if (data.email != undefined && data.event != undefined && data.phone != undefined && data.task != undefined) {
      leftvalue = 'all'
    } else {
      if (data.task != undefined) {
        leftvalue1 = 'task'
      } else {
        leftvalue1 = ''
      }
      if (data.phone != undefined) {
        leftvalue2 = 'phone'
      } else {
        leftvalue2 = ''
      }
      if (data.event != undefined) {
        leftvalue3 = 'event'
      } else {
        leftvalue3 = ''
      }
      if (data.email != undefined) {
        leftvalue4 = 'e-mail'
      } else {
        leftvalue4 = ''
      }
      leftvalue = leftvalue1 + leftvalue2 + leftvalue3 + leftvalue4
    }
    if (data.data == undefined) {
      rightvalue = 'all'
    } else {
      rightvalue = data.data
    }
    Request(ACTIVITY + "?binding=" + this.props.binding, {
      id: this.props.id,
      pageSize: 20,
      pageNum: this.state.pageNum,
      dateScope: rightvalue,
      objectScope: leftvalue
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          future: [],
          past: []
        })
      }else{
        this.setState({
          future: json.future,
          past: json.past
        })
      }
    });
  }

  // 刷新->删除活动历史对象
  handleDelActivite = (item) => {
    Request(DELETEOBJ + "?binding=" + this.props.binding, {
      id: item.id
    }).then((json) => {
      if (json.flag == "SUCCESS") {
        message.success(json.message, 8);
        Request(ACTIVITY + "?binding=" + this.props.binding, {
          id: this.props.id,
          pageSize: 20,
          pageNum: this.state.pageNum,
          dateScope: 'all',
          objectScope: 'all'
        }).then((json) => {
          if(json.flag=="ERROR"){
            this.setState({
              future: [],
              past: []
            })
          }else{
            this.setState({
              future: json.future,
              past: json.past
            })
          }
        });
      } else {
        message.error(json.message, 8);
      }
    });
  }

  //活动历史加载更多
  handleSubmitpagenum = (e) => {
    var page = this.state.pageNum + 1
    this.setState({
      pageNum: page
    })
    Request(ACTIVITY + "?binding=" + this.props.binding, {
      id: this.props.id,
      pageSize: 20,
      pageNum: this.state.pageNum,
      dateScope: 'all',
      objectScope: 'all'
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          future: [],
          past: []
        })
      }else{
        this.setState({
          future: json.future,
          past: json.past
        })
      }
    });
  }

};

const Active = Form.create()(Actives);
export default Active;