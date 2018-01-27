import React, {Component} from 'react';
import {Button,Row, Col,Form, Icon,message,Modal,Select,InputNumber} from 'antd';
import moment from 'moment';
import fetchData from '../../utils/fetch.js';
import {SETMODAL} from '../../utils/Api.jsx';
const FormItem = Form.Item;
// import './active.css';
const Option = Select.Option;

class SetModalForm extends Component{
  constructor(porps){
    super(porps);
    this.state = {
      setData:[],
    }
  }
  componentWillMount() {
    // fetchData(SETMODAL, {"id":this.props.id,"parttern":"design"},this.props.binding, function (res) {
    //   let data = eval(res)
    //   console.log("data>>>",data)
    //   console.log("数据>>>>",data.parameters)
    //   this.setState({
    //     setData:data.parameters
    //   })
    // }.bind(this))
  }
  // 模态框的展示与隐藏
  handleSetModalCancel(){
    this.props.onCancel()
  }
  handleSetModal(){
    this.props.onOk()
  }
  // select改变
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  // 显示数改变
  onChange(value) {
    console.log('changed', value);
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 }
    };
    console.log("setdata>>>",this.state.setData)
    return(
      <Modal
        wrapClassName="setModal"
        title="设置"
        visible={this.props.visible}
        onCancel={this.handleSetModalCancel.bind(this)}
        onOk={this.handleSetModal.bind(this,this.state.rowselectidr)}
        footer={[
          <Button key="save" style={{color:this.props.operation}} onClick={this.handleSetModal.bind(this)}>保存</Button>,
          <Button key="cancel" style={{color:this.props.operation}} onClick={this.handleSetModalCancel.bind(this)}>取消</Button>,
        ]}
      >
        <Form>
          <FormItem {...formItemLayout} label="对象引用">
            {getFieldDecorator('name', {
              initialValue:"lucy",
              rules: [{ required:true, message:'',max:50}]
            })(
              <Select style={{ width: 120 }} onChange={this.handleChange.bind(this)} >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="视图引用">
            {getFieldDecorator('detaildesc', {
              initialValue:"lucy",
              rules: [{ required:false, message: '' }]
            })(
              <Select style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            )}
          </FormItem> 
          <FormItem {...formItemLayout} label="显示数量">
            {getFieldDecorator('num', {
              initialValue:"3",
              rules: [{ required:false, message: '' }]
            })(
              <InputNumber min={1} max={10} onChange={this.onChange.bind(this)} />
            )}
          </FormItem> 
        </Form>
      </Modal>
    )
  }
};

const SetModal = Form.create()(SetModalForm);
export default SetModal;