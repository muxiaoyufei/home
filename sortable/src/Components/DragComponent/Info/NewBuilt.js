import React, {Component} from 'react';
import {Icon,Tooltip,Button,Row, Col,Input,Select, InputNumber,Checkbox  } from 'antd';
// import Built from './Built.css'
const InputGroup = Input.Group;
const Option = Select.Option;
class NewBuilt extends Component{
  
  render(){
    function onChange(e) {
    }
    return(
      <div>
        <div>
          <Col span={11}>
            <div className="edit-box">
              <Col span={8}>
                <div className="sub">
                  <Tooltip title="输入客户信息">
                    <Icon type="question-circle-o" className="PromptInfo" />
                  </Tooltip>
                  <span>&nbsp;客户名称</span>
                </div>
              </Col>
              <Col span={16}>
                <div className="main">
                  <Input />
                </div>
              </Col>
            </div>
          </Col>
          <Col span={11} offset={2}>
            <div className="edit-box">
              <Col span={8}>
                <div className="sub">
                  {/* <Tooltip title="输入客户信息">
                    <Icon type="question-circle-o" />
                  </Tooltip> */}
                  <span>发票类型</span>
                </div>
              </Col>
              <Col span={16}>
                <div className="main">
                  <InputGroup compact>
                    <Select style={{ width: '100%' }} defaultValue="Home">
                      <Option value="Home">Home</Option>
                      <Option value="Company">Company</Option>
                    </Select>
                  </InputGroup>
                </div>
              </Col>
            </div>
          </Col>
        </div>
        <div>
          <Col span={11}>
            <div className="edit-box">
              <Col span={8}>
                <div className="sub">
                  <Tooltip title="输入客户信息">
                    <Icon type="question-circle-o" className="PromptInfo" />
                  </Tooltip>
                  <span>&nbsp;电话</span>
                </div>
              </Col>
              <Col span={16}>
                <div className="main">
                  <Input />
                </div>
              </Col>
            </div>
          </Col>
          <Col span={11} offset={2}>
            <div className="edit-box">
              <Col span={8}>
                <div className="sub">
                  {/* <Tooltip title="输入客户信息">
                    <Icon type="question-circle-o" />
                  </Tooltip> */}
                  <span>电子邮件</span>
                </div>
              </Col>
              <Col span={16}>
                <div className="main">
                  <Input />
                </div>
              </Col>
            </div>
          </Col>
        </div>
        <div>
          <Col span={11}>
            <div className="edit-box">
              <Col span={8}>
                <div className="sub">
                  {/* <Tooltip title="输入客户信息">
                    <Icon type="question-circle-o" className="PromptInfo" />
                  </Tooltip> */}
                  <span>自定义相关列表</span>
                </div>
              </Col>
              <Col span={16}>
                <div className="main">
                  <Input />
                </div>
              </Col>
            </div>
          </Col>
          <Col span={11} offset={2}>
            <div className="edit-box">
              <Col span={8}>
                <div className="sub">
                  <span>是否签约</span>
                </div>
              </Col>
              <Col span={16}>
                <div className="main">
                  <Checkbox onChange={onChange}></Checkbox>
                </div>
              </Col>
            </div>
          </Col>
        </div>
      </div>
    )
  }
};

export default NewBuilt;