/**
 * Created by fanpf on 2017/5/24.
 */
import React, {Component} from 'react';
import {Timeline, Icon, Menu, Dropdown, Button,Row,Col,Radio,Popover,Checkbox ,Form} from 'antd';
import timeaxis from './timeaxis.css';
import PastTime from './PastTime.js';
import FutureTime from './FutureTime.js';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class TimeAxi extends Component{
  constructor(porps){
    super(porps);
    this.state = {
       visible: false,
       value: 'all',
    }
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
  hide=()=>{
    this.setState({
      visible: false
    });
  }
  handleVisibleChange=(visible)=>{
    this.setState({ visible });
  }
  // 筛选
      handleactivity=()=>{
        setTimeout(()=>{
           this.setState({
              visible: false
            });
        },500);
      }
  render(){
    const {getFieldProps} = this.props.form; 
    const content = (
      <Form  onSubmit={this.props.handleactivity.bind(this,this.props.form.getFieldsValue())}>
        <Row>
          <Col span={12}>
            <p>活动</p>
            {/*<RadioGroup value="all" onChange={this.onChange} {...getFieldProps("data")}>
              <Radio value={'all'}>所有活动(默认)</Radio>
              <Radio value={'task'}>任务</Radio>
              <Radio value={'event'}>事件</Radio>
              <Radio value={'phone'}>已记录呼叫</Radio>
              <Radio value={'e-mail'}>邮件</Radio>
            </RadioGroup>*/}
            <Row>
              <Col><Checkbox value="all" {...getFieldProps("all")}>所有活动</Checkbox></Col>
              <Col><Checkbox value="task" {...getFieldProps("task")}>任务</Checkbox></Col>
              <Col><Checkbox value="event" {...getFieldProps("event")}>事件</Checkbox></Col>
              <Col><Checkbox value="phone" {...getFieldProps("phone")}>已记录呼叫</Checkbox></Col>
              <Col><Checkbox value="e-mail" {...getFieldProps("email")}>邮件</Checkbox></Col>
            </Row>
          </Col>
          <Col span={12}>
            <p>日期范围</p>
            <RadioGroup value="all" onChange={this.onChange} {...getFieldProps("data")}>
              <Radio value={'all'}>全天候(默认)</Radio>
              <Radio value={'past_7'}>过去7天</Radio>
              <Radio value={'future_7'}>未来7天</Radio>
              <Radio value={'past_30'}>过去30天</Radio>
            </RadioGroup>
          </Col>
          <Col span={24}>
            <div style={{textAlign:'right',}}>
              <hr style={{margin:'8px 0 ',}}/>
              <Button type="primary" size="small" onClick={this.hide}>取消</Button>  <Button key="submit" type="primary" htmlType="submit" size="small"  onClick={this.handleactivity}>确认</Button>
            </div>
          </Col>
        </Row>
      </Form>
  );
    return(
      <div className="L_timeAxis">
        <div className="L_timeAxis_top">
            <Popover content={content} placement="bottomLeft" trigger="click" visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
              <p>筛选时间线<Icon type="caret-down" style={{fontSize:12}} /></p>
            </Popover>
            <Button className="L_timeAxis_back"><Icon type="reload" /></Button>
        </div>
        <FutureTime  future={this.props.future} handledelClick={this.props.handledelClick}/>
        <PastTime past={this.props.past}  handledelClick={this.props.handledelClick}/>
        <Button type="primary" className="L_timeAxis_jz" onClick={this.props.handleSubmitpagenum} style={{display:'none'}}>加载更多</Button>
      </div>
    )
  }
};

const TimeAxis = Form.create()(TimeAxi);
export default TimeAxis;