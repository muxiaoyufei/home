/**
 * Created by fanpf on 2017/5/24.
 */
import React, { Component } from 'react';
import { Input, DatePicker, Select, Button, Form, Row, Col, Icon, Checkbox, message } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;
const { TextArea } = Input;

class SendEmails extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      size: 'large',
      sendemail: [],
      // 查找
      selectedRowKeys: [],
      value: [],
      tableColumns: [],
      tableData: [],
      visible: false,
      currentRecordtype: '',
      recordtypes: [],
      visiblecz: false,//查找
      InputType: "radio",//查找
      czvalue: '',//选择的数据
      inputval: '',//查找是输入的内容
      lookupObj: '',//点击查找是传递过来
      rowselectid: '',
    }
  }
  componentDidMount() {
    this.setState({
      sendemail: [
        {
          "left": {
            "fined": "receiver",
            "name": "收件人",
            "type": "F",
            "edit": true,
            "required": true
          },
          "right": {
            "fined": "cc",
            "name": "密件抄送",
            "type": "F",
            "required": true,
            "edit": true
          }
        },
        {
          "left": {
            "fined": "theme",
            "name": "主题",
            "type": "F",
            "required": true,
            "edit": true
          },
          "right": {

            "fined": "content",
            "name": "内容",
            "type": "T",
            "required": true,
            "edit": true
          }
        }
      ]
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    const data = this.state.sendemail.map((item, index) => {
      const ltype = item.left.type
      const rtype = item.right.type
      var lcont, rcont;

      if (ltype == 'F') {
        if (item.left.fined == "receiver") {
          if (this.props.khemail != '') {
            lcont = <Input placeholder={this.props.khemail} ref="inputs" key={item.left.fined} {...getFieldProps(item.left.fined) } />
          } else {
            lcont = <Input placeholder={item.left.value} ref="inputs" key={item.left.fined} {...getFieldProps(item.left.fined) } />
          }
        } else {
          lcont = <Input placeholder={item.left.value} ref="inputs" key={item.left.fined} {...getFieldProps(item.left.fined) } />
        }

      }
      if (rtype == 'F') {
        if (item.right.fined == "receiver") {
          if (this.props.khemail != '') {
            lcont = <Input placeholder={this.props.khemail} ref="inputs" key={item.right.fined} {...getFieldProps(item.right.fined) } />
          } else {
            lcont = <Input placeholder={item.right.value} ref="inputs" key={item.right.fined} {...getFieldProps(item.right.fined) } />
          }
        } else {
          rcont = <Input placeholder={item.right.value} ref="inputs" key={item.right.fined} {...getFieldProps(item.right.fined) } />
        }

      }
      if (ltype == 'T') {
        lcont = <TextArea placeholder={item.left.value} ref="inputs" key={item.left.fined} {...getFieldProps(item.left.fined) } />
      }
      if (rtype == 'T') {
        rcont = <TextArea placeholder={item.right.value} ref="inputs" key={item.right.fined} {...getFieldProps(item.right.fined) } />
      }
      return (
        <Row key={index}>
          <Col span={10}>
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
          <Col span={2}></Col>
          <Col span={10} >
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
      <div className="active">
        <Form onSubmit={this.props.handleSubmityj.bind(this, this.props.form.getFieldsValue(), this.props.khemail)} className="login-form">
          {data}
          <div className="btn">
            <Button type="primary" htmlType="submit" size={this.state.size} >保存</Button>
          </div>
        </Form>
      </div>
    )
  }
}

const SendEmail = Form.create()(SendEmails);
export default SendEmail;