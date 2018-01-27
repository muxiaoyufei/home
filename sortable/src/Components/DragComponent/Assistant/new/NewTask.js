/**
 * Created by fanpf on 2017/5/24.
 */
import React, {Component} from 'react';
import {Input,DatePicker,Select,Button,Form, Row, Col,Icon,Checkbox,message,Modal ,Table } from 'antd';
import fetchData from '../../utils/fetch.js';
import {_lookup,_getObjects,_getLayout,_saveTask,ACTIVITY} from './Api';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;
const { TextArea } = Input;
// import './active.css';
class NewTasks extends Component{
  constructor(porps){
    super(porps);
    this.state = {
      size : 'large',
       newtask:[],
       // 查找
      selectedRowKeysr: [],
      tableColumnsr : [],
      tableDatar : [],
      visibler : false,
      visibleczr:false,//查找
      InputTyper : "radio",//查找
      czvaluer:'',//选择的数据
      inputvalr:'',//查找是输入的内容
      lookupObjr:'005',//点击查找是传递过来
      rowselectidr:'',
       // 查找相关项、名称
      selectedRowKeys: [],
      value : [],
      tableColumns : [],
      tableData : [],
      visible : false,
      currentRecordtype:'',
      recordtypes:[],
      visiblecz:false,//查找
      InputType : "radio",//查找
      czvalue:'',//选择的数据
      inputval:'',//查找是输入的内容
      lookupObj:'001',//点击查找是传递过来
      rowselectid:'',
      fieldId:'',
      fieldname:'',
      correlation :[],//相关项 所有对象
      whoObjs:[],//相关项  潜在客户 联系人
      forsc:'',//全局布局分屏or全屏
      pageNum:1,
    }
  }
  componentDidMount(){
    this.setState({
      newtask:[
        {
          "left":{
            "fined":"theme",
            "name":"主题",
            "type":"F",
            "edit":true,
            "required":true,
            "data":[
              {
                "id":"0",
                "value":"发邮件"
              },{
                "id":"1",
                "value":"打电话"
              },{
                "id":"2",
                "value":"约会谈"
              },{
                "id":"3",
                "value":"约吃饭"
              },{
                "id":"4",
                "value":"会议"
              },{
                "id":"5",
                "value":"其他活动"
              }
            ]
          },
          "right":{
            "fined":"endTime",
            "name":"到期日期",
            "type":"D",
            "required":false,
            "edit":true
          }
        },{
          "left":{
            "fined":"namet",
            "name":"名称",
            "label":"名称task",
            "type":"F",
            "required":true,
            "edit":true
          },
          "right":{
            "fined":"relatedt",
            "name":"相关项",
            "label":"相关项task",
            "type":"F",
            "required":true,
            "edit":true
          }
        },{
          "left":{
            "fined": "distribution",
            "data": [
                {
                    "id": "",
                    "value": ""
                }
            ],
                "value": "",
                "edit": true,
                "helpText": "",
                "name": "被分配人",
                "required": true,
                "fieldId": "ffe20169A69127EbjAJZ",
                "type": "Y",
                "lookupObj": "user"
          },
          "right":{
              "fined":"state",
              "name":"状态",
              "type":"S",
              "edit":true,
              "required":true,
              "data":[
                  {
                      "id":"1",
                      "value":"未开始"
                  },
                  {
                      "id":"2",
                      "value":"进行中"
                  },
                  {
                      "id":"3",
                      "value":"已结束"
                  }
              ]
          }
        },{
          "left":{
            "fined":"priority",
            "name":"优先级",
            "type":"S",
            "edit":true,
            "required":true,
            "data":[
              {
                "id":"0",
                "value":"高"
              },
              {
                "id":"1",
                "value":"中"
              },
              {
                "id":"2",
                "value":"低"
              }
            ]
          },
          "right":{
            "fined":"",
            "name":"",
            "type":"",
            "edit":"",
            "required":""
          }
        }
      ]
    })
    // 获取相关项
    fetchData(_getObjects  + "?binding=" + this.props.binding,{binding:this.props.binding},this.props.binding,
      function (res) {
        let data = eval(res);
        this.setState({
          correlation :data.data,
          whoObjs : data.whoObjs,
        })
      }.bind(this)
    )
    //获取页面布局框架
    fetchData(_getLayout + "?binding=" + this.props.binding, {binding:this.props.binding,"objectApi":"Account",},this.props.binding,
      function (res) {
        let data = eval(res);
        this.setState({ 
          frame:data.data.allTabs,
          forsc:data.data.fullOrSplitScreen,
          // forsc:"splitScreen",
          frame_l:data.data.leftTabs,
          frame_r:data.data.rightTabs
        })
      }.bind(this)
    )
  }
  // 查找弹出模态框并请求查找数据
  clickShowModalr = (type)=>{
    // console.log(type)
    this.setState({
      visibleczr : true,
      // lookupObj:lookupObj,
    });
    if(type=="Y"||type=="M"){
      this.setState({
        InputTyper : "radio",
      });
    }
    if(type=="MR"){
      this.setState({
        InputTyper : "",
      });
    }
    fetchData(_lookup + "?binding=" + this.props.binding, {"binding" : this.props.binding,"prefix" : '005',"pageSize" : "50",
      "page" : "1","keyword" : ''},this.props.binding,
      function (res) {
        let data = eval(res);
        const head = data.header.map((value,index)=>{
          return{
            "title":value.label,
            "dataIndex" : value.fieldName,
            "key":value.fieldName
          }
        })
        this.setState({
          tableDatar : data.data,
          tableColumnsr : head
        })
      }.bind(this)
    )
  }
  // 点击ok确认
  handleOkczr = ()=>{
    this.setState({
      visibleczr : false
    })
  }
  // 点击取消关闭
  handleCancelczr = ()=>{
    this.setState({
      visibleczr : false
    })
  }
  // 点击清空是清空
  handleClickQKr=()=>{
    // czvalue为传递给input框的值，点击清空是清0
    this.setState({
      czvaluer : "",
      visibleczr : false,//关闭模态框（可选为不关闭）
    })
  }
  // 点击搜索是搜索输入的内容
  handleClickSearchr=()=>{
    fetchData(_lookup  + "?binding=" + this.props.binding, {"binding" : this.props.binding,"prefix" : this.state.lookupObj,"pageSize" : "50",
      "page" : "1", "keyword" : this.state.inputval},this.props.binding,
      function (res) {
        let data = eval(res);
        const head = data.header.map((value,index)=>{
          return{
            "title":value.label,
            "dataIndex" : value.fieldName,
            "key":value.fieldName
          }
        })
        console.log(head)
        this.setState({
          tableDatar : data.data,
          tableColumnsr : head
        })
      }.bind(this)
    )
  }
  // 搜索input输入的内容
  handleInputr=(e)=>{
    // console.log(e.target.value)
      this.setState({
        inputvalr : e.target.value
      })
  }
   // 刷新->新建任务newtask
   handleSubmit = (id,e) => {
    e.preventDefault();
    let Value=this.props.form.getFieldsValue()
    console.log(id)
    const data=Value;
    data.id=document.getElementById('相关项task').value;
    data.binding=this.state.bindings
    console.log('save活动->新建任务') 
    Value.distribution=id.toString()
    // console.log(data)
    if(data.state=='进行中'){
      data.state='1'
    }else if(data.state=='已结束'){
      data.state='2'
    }else{
      data.state='3'
    }
    if(data.priority=='高'){
      data.priority='3'
    }else if(data.priority=='中'){
      data.priority='2'
    }else{
      data.priority='1'
    }
    data.related=document.getElementById('相关项task').value;
    data.whoId=document.getElementById('名称task').value;
    console.log(JSON.stringify(data))
    fetchData(_saveTask + "?binding=" + this.props.binding, data,this.props.binding,
      function (res) {
        let arr = eval(res);
        if(arr.flag == "SUCCESS"){
          message.success(arr.message);
          fetchData(ACTIVITY + "?binding=" + this.props.binding, {id:this.props.id,binding:this.props.binding,pageSize:20,pageNum:this.state.pageNum,
            dateScope:'all',objectScope:'all'},this.props.binding,
            function (res) {
              let item=eval(res)
                this.setState({
                  future:item.future,
                  past:item.past
                })
            }.bind(this)
          )
          this.props.onOk()
        }else{
          message.error(arr.message);
        }
      }.bind(this)
    )
  }
  // 取消新建任务
    handleCancel = (e) => {
      this.props.onCancel() 
    }
  // 查找相关项 
  handleChange=(value)=>{
    console.log(`${value}`);
    this.setState({
      lookupObj:`${value}`,
      czvalue:'',
    })
    fetchData(_lookup + "?binding=" + this.props.binding, {"binding" : this.props.binding,"prefix" : this.state.lookupObj,"pageSize" : "50",
      "page" : "1","keyword" : ''},this.props.binding,
      function (res) {
        let data = eval(res);
        const head = data.header.map((value,index)=>{
          return{
            "title":value.label,
            "dataIndex" : value.fieldName,
            "key":value.fieldName
          }
        })
        this.setState({
          tableData : data.data,
          tableColumns : head
        })
      }.bind(this)
    )            
  }

  // 查找弹出模态框并请求查找数据
  clickShowModal = (id,name)=>{
     console.log(id)
    console.log(name)
    this.setState({
      visiblecz : true,
      fieldId:id,
      fieldname:name,
    });
    fetchData(_lookup + "?binding=" + this.props.binding, {"prefix" : this.state.lookupObj,"pageSize" : "50","page" : "1","keyword" : ''},this.props.binding,
      function (res) {
        let data = eval(res);
        const head = data.header.map((value,index)=>{
          return{
            "title":value.label,
            "dataIndex" : value.fieldName,
            "key":value.fieldName
          }
        })
        this.setState({
          tableData : data.data,
          tableColumns : head
        })
      }.bind(this)
    )
  }
  // 点击ok确认
  handleOkcz = ()=>{
    this.setState({
      visiblecz : false
    })
  }
  // 点击取消关闭
  handleCancelcz = ()=>{
    this.setState({
      visiblecz : false
    })
  }
  // 点击清空是清空
  handleClickQK=()=>{
    // czvalue为传递给input框的值，点击清空是清0
    this.setState({
      czvalue : "",
      visiblecz : false,//关闭模态框（可选为不关闭）
    })
  }
  // 点击搜索是搜索输入的内容
  handleClickSearch=()=>{
    fetchData(_lookup + "?binding=" + this.props.binding, {"binding" : this.props.binding,"prefix" : this.state.lookupObj,"pageSize" : "50",
      "page" : "1","keyword" : this.state.inputval},this.props.binding,
      function (res) {
        let data = eval(res);
        const head = data.header.map((value,index)=>{
          return{
            "title":value.label,
            "dataIndex" : value.fieldName,
            "key":value.fieldName
          }
        })
        this.setState({
          tableData : data.data,
          tableColumns : head
        })
      }.bind(this)
    ) 
  }
  // 搜索input输入的内容
  handleInput=(e)=>{
    console.log(e.target.value)
    this.setState({
      inputval : e.target.value
    })
  }
  render(){
    const options = this.state.correlation.map((item,index)=>{
      return(
        <Option style={{color:this.props.text}} value={item.prefix} key={index}>{item.label}</Option>
      )
    })
    const optionwhoid = this.state.whoObjs.map((item,index)=>{
      return(
        <Option style={{color:this.props.text}} value={item.prefix} key={index}>{item.label}</Option>
      )
    })
    const { getFieldProps } = this.props.form; 
    const forsc=this.state.forsc
    //  console.log(forsc)
    const data=this.state.newtask.map((item,index)=>{
      let {ltype,rtype}='';
      ltype=item.left.type
      rtype=item.right.type
      var lcont,rcont;
      if(ltype=='S'){
        var data= item.left.data.map((items,index)=>{
          return(
            <Option style={{color:this.props.text}} value={items.value} key={index}>{items.value}</Option>
          )
        })
        lcont=<InputGroup compact className="sel">
          <Select style={{  width:'100%',color:this.props.text}}  {...getFieldProps(item.left.fined)}>
            {data}
          </Select>
        </InputGroup>
      }
      if(rtype=='S'){
        var data= item.right.data.map((items,index)=>{
          return(
            <Option style={{color:this.props.text}} value={items.value} key={index}>{items.value}</Option>
          )
        })
        rcont=<InputGroup compact className="sel">
          <Select style={{  width:'100%',color:this.props.text}} placeholder={item.right.value} {...getFieldProps(item.right.fined)}>
            {data}
          </Select>
        </InputGroup>
      }
      if(ltype=='Y' || ltype=='M'){    
        lcont=<div style={{position:'relative'}}>
          <Input style={{color:this.props.text}} placeholder={ item.left.data[0].value }   value={this.state.czvaluer} />  
          <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModalr.bind(this,ltype)}>[查找]</a>
        </div>
      }
      if(rtype=='Y' || rtype=='M'){   
        rcont=<div style={{position:'relative'}}>
          <Input style={{color:this.props.text}} placeholder={ item.right.data[0].value } value={this.state.czvalue}   />
          <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModal.bind(this,rtype)} >[查找]</a>
        </div>
      }
      if(ltype=='MR'){    
        lcont=<div style={{position:'relative'}}>
          <Input style={{color:this.props.text}} placeholder={ item.left.data[0].value } value={this.state.czvaluer}/>
          <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModalr.bind(this,ltype)} >[查找多选]</a>
        </div>
      }
      if(rtype=='MR'){  
        rcont=<div style={{position:'relative'}}>
          <Input style={{color:this.props.text}} placeholder={ item.right.data[0].value } value={this.state.czvaluer} />
          <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModalr.bind(this,rtype)} >[查找多选]</a>
        </div>
      }
      if(ltype=='F'){
        if(item.left.name == "相关项"){
          lcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%',color:this.props.text }} onChange={this.handleChange}> 
              {options}
            </Select>
            <Input placeholder={ item.left.value } style={{ width: '75%' ,color:this.props.text}} id={item.left.fined}/>
            <Input  style={{ width: '75%' }} id={item.left.label} style={{display:'none',color:this.props.text}}/>
              <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModal.bind(this,item.left.fined,item.left.label)}>[查找]</a>
          </div>
        }else if(item.left.name == "名称"){
          lcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%',color:this.props.text }} onChange={this.handleChange}> 
              {optionwhoid}
            </Select>
            <Input placeholder={ item.left.value } style={{ width: '75%',color:this.props.text }} id={item.left.fined} />
            <Input  style={{ width: '75%',color:this.props.text }} id={item.left.label} style={{display:'none'}}/>
              <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModal.bind(this,item.left.fined,item.left.label)}>[查找]</a>
          </div>
        }else{
          lcont=<Input placeholder={ item.left.value } style={{ width: '100%',color:this.props.text }}  {...getFieldProps(item.left.fined)}/>
        }
      }
      if(rtype=='F'){
        if(item.right.name == "相关项"){
          rcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%', color:this.props.text }} onChange={this.handleChange}> 
              {options}
            </Select>
            <Input placeholder={ item.right.value } style={{ width: '75%',color:this.props.text  }} id={item.right.fined}/>
            <Input  style={{ width: '75%',color:this.props.text  }} id={item.right.label} style={{display:'none'}}/>
            <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.text }} onClick={this.clickShowModal.bind(this,item.right.fined,item.right.label)}>[查找]</a>
          </div>
        }else if(item.right.name == "名称"){
          rcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%',color:this.props.text  }} onChange={this.handleChange}> 
              {optionwhoid}
            </Select>
            <Input placeholder={ item.right.value } style={{ width: '75%' ,color:this.props.text }} id={item.right.fined}/>
            <Input  style={{ width: '75%',color:this.props.text  }} id={item.right.label} style={{display:'none'}}/>
            <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModal.bind(this,item.right.fined,item.right.label)}>[查找]</a>
          </div>
        }else{
          rcont=<Input style={{color:this.props.text }} placeholder={ item.right.value }  ref="inputs" key={item.right.fined} {...getFieldProps(item.right.fined)}/>
        }
      }
      if(ltype=='T'){
        lcont=<TextArea style={{color:this.props.text }}   ref="inputs" key={item.left.name} {...getFieldProps(item.left.fined)}/>
      }
      if(rtype=='T'){
        rcont=<TextArea style={{color:this.props.text }}  ref="inputs" key={item.right.name} {...getFieldProps(item.right.fined)}/>
      }
      if(ltype=='D'){
        const dateFormat = 'YYYY/MM/DD';
        lcont=<InputGroup compact>
          <DatePicker style={{  width:'100%',color:this.props.text }} defaultValue ={moment(item.left.value , dateFormat)} format={dateFormat} key={item.left.name} {...getFieldProps(item.left.fined)}/>
        </InputGroup>
      }
      if(rtype=='D'){
        const dateFormat = 'YYYY/MM/DD';
        rcont=<InputGroup compact>
          <DatePicker style={{  width:'100%',color:this.props.text }} defaultValue ={moment(item.right.value , dateFormat)} format={dateFormat} key={item.right.name} {...getFieldProps(item.right.fined)}/>
        </InputGroup>
      }
      if(ltype==undefined){
        lcont=""
      }
      if(rtype==undefined){
        rcont=""
      }
      return (
        <Row key={index}>
          <Col span={10}>
            <FormItem >
              {
                <div className="box">
                  <div className="sub">
                    <span style={{color:this.props.text }}>{ item.left.name }</span>
                  </div>
                  <div className="main mains">
                    { lcont }
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
                    <span style={{color:this.props.text }}>{ item.right.name }</span>
                  </div>
                  <div className="main mains">
                    { rcont } 
                  </div>
                </div>
              }
            </FormItem>
          </Col>
        </Row>
      )
    })
    const datas=this.state.newtask.map((item,index)=>{
      const ltype=item.left.type
      const rtype=item.right.type
      var lcont,rcont;
      if(ltype=='S'){
        var data= item.left.data.map((items,index)=>{
          return(
            <Option style={{color:this.props.text }} value={items.value} key={index}>{items.value}</Option>
          )
        })
        lcont=<InputGroup compact className="sel">
          <Select style={{  width:'100%',color:this.props.text }}  {...getFieldProps(item.left.fined)}>
            {data}
          </Select>
        </InputGroup>
      }
      if(rtype=='S'){
        var data= item.right.data.map((items,index)=>{
          return(
            <Option style={{color:this.props.text }} value={items.value} key={index}>{items.value}</Option>
          )
        })
        rcont=<InputGroup compact className="sel">
          <Select style={{  width:'100%',color:this.props.text }} {...getFieldProps(item.right.fined)}>
            {data}
          </Select>
        </InputGroup>
      }
      if(ltype=='Y' || ltype=='M'){   
        lcont=<div style={{position:'relative'}}>
          <Input style={{color:this.props.text }} placeholder={ item.left.data[0].value }   value={this.state.czvaluer} />  
          <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModalr.bind(this,ltype)}>[查找]</a>
        </div>
      }
      if(rtype=='Y' || rtype=='M'){    
        rcont=<div style={{position:'relative'}}>
          <Input style={{color:this.props.text }} placeholder={ item.right.data[0].value } value={this.state.czvaluer}   />
          <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModalr.bind(this,rtype)} >[查找]</a>
        </div>
      }
      if(ltype=='MR'){
        lcont=<div style={{position:'relative'}}>
          <Input style={{color:this.props.text }} placeholder={ item.left.data[0].value } value={this.state.czvaluer}/>
          <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModalr.bind(this,ltype)} >[查找多选]</a>
        </div>
      }
      if(rtype=='MR'){
        rcont=<div style={{position:'relative'}}>
          <Input style={{color:this.props.text }} placeholder={ item.right.data[0].value } value={this.state.czvaluer} />
          <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModalr.bind(this,rtype)} >[查找多选]</a>
        </div>
      }
      if(ltype=='F'){
        if(item.left.name == "相关项"){
          lcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%',color:this.props.text  }} onChange={this.handleChange}> 
              {options}
            </Select>
            <Input placeholder={ item.left.value } style={{ width: '75%' ,color:this.props.text }} id={item.left.fined}/>
            <Input  style={{ width: '75%',color:this.props.text  }} id={item.left.label} style={{display:'none'}}/>
              <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModal.bind(this,item.left.fined,item.left.label)}>[查找]</a>
          </div>
        }else if(item.left.name == "名称"){
          lcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%',color:this.props.text  }} onChange={this.handleChange}> 
              <Option style={{color:this.props.text }} value={'003'} >联系人</Option>
              <Option style={{color:this.props.text }} value={'004'} >潜在客户</Option>
            </Select>
            <Input placeholder={ item.left.value } style={{ width: '75%',color:this.props.text  }} id={item.left.fined} />
            <Input  style={{ width: '75%',color:this.props.text  }} id={item.left.label} style={{display:'none'}}/>
              <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModal.bind(this,item.left.fined,item.left.label)}>[查找]</a>
          </div>
        }else{
          lcont=<Input style={{color:this.props.text }} placeholder={ item.left.value } style={{ width: '100%' }}  {...getFieldProps(item.left.fined)}/>
        }
      }
      if(rtype=='F'){
        if(item.right.name == "相关项"){
          rcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%',color:this.props.text  }} onChange={this.handleChange}> 
              {options}
            </Select>
            <Input placeholder={ item.right.value } style={{ width: '75%',color:this.props.text  }} id={item.right.fined}/>
            <Input  style={{ width: '75%',color:this.props.text  }} id={item.right.label} style={{display:'none'}}/>
            <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.text }} onClick={this.clickShowModal.bind(this,item.right.fined,item.right.label)}>[查找]</a>
          </div>
        }else if(item.right.name == "名称"){
          rcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%',color:this.props.text  }} onChange={this.handleChange}> 
              <Option style={{color:this.props.text }} value={'003'} >联系人</Option>
              <Option style={{color:this.props.text }} value={'004'} >潜在客户</Option>
            </Select>
            <Input placeholder={ item.right.value } style={{ width: '75%',color:this.props.text  }} id={item.right.fined}/>
            <Input  style={{ width: '75%',color:this.props.text  }} id={item.right.label} style={{display:'none'}}/>
            <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModal.bind(this,item.right.fined,item.right.label)}>[查找]</a>
          </div>
        }else{
          rcont=<Input style={{color:this.props.text }} placeholder={ item.right.value }  ref="inputs" key={item.right.fined} {...getFieldProps(item.right.fined)}/>
        }
      }
      if(ltype=='T'){
        lcont=<TextArea style={{color:this.props.text }}  ref="inputs" key={item.left.name} {...getFieldProps(item.left.fined)}/>
      }
      if(rtype=='T'){
        rcont=<TextArea style={{color:this.props.text }}  ref="inputs" key={item.right.name} {...getFieldProps(item.right.fined)}/>
      }
      if(ltype=='D'){
        const dateFormat = 'YYYY/MM/DD';
        lcont=<InputGroup compact>
          <DatePicker style={{  width:'100%',color:this.props.text }}  format={dateFormat} key={item.left.name} {...getFieldProps(item.left.fined)}/>
        </InputGroup>
      }
      if(rtype=='D'){
        const dateFormat = 'YYYY/MM/DD';
        rcont=<InputGroup compact>
          <DatePicker style={{  width:'100%',color:this.props.text }}  format={dateFormat} key={item.right.name} {...getFieldProps(item.right.fined)}/>
        </InputGroup>
      }
      return (
        <Row key={index}>
          <Col span={24}>
            <FormItem >
              {
                <div className="box">
                  <div className="sub">
                    <span style={{color:this.props.text }}>{ item.left.name }</span>
                  </div>
                  <div className="main mains">
                    { lcont }
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
                    <span style={{color:this.props.text }}>{ item.right.name }</span>
                  </div>
                  <div className="main mains">
                    { rcont } 
                  </div>
                </div>
              }
            </FormItem>
          </Col>
        </Row>
      )
    })

    // 查找模态框内容
    let {rowselectr,rowselectidr}=[];
    const rowSelectionr = {
      type : this.state.InputTyper,
      onChange: (selectedRowKeys, selectedRows) => {
        rowselectr = selectedRows.map((value,index)=>{
          console.log(value)
          return value.name;
        })
        rowselectidr = selectedRows.map((value,index)=>{
          console.log(value)
          return value.id;
        })
        this.setState({
          czvaluer : rowselectr,
          rowselectidr : rowselectidr,
        })
      },
    };

    // 查找模态框内容
    let {rowselect,rowselectid}=[];
    const rowSelection = {
      type : this.state.InputType,
      onChange: (selectedRowKeys, selectedRows) => {
        rowselect = selectedRows.map((value,index)=>{
          // console.log(value.name)
          return value.name;
        })
        rowselectid = selectedRows.map((value,index)=>{
          console.log(value)
          return value.id;
        })
        var fieldId=this.state.fieldId;
        var fieldname=this.state.fieldname;
        // console.log(fieldname)
        document.getElementById(fieldId).value=rowselect
        document.getElementById(fieldname).value=rowselectid
        this.setState({
          czvalue : rowselect,
          rowselectid:rowselectid,
        })
        // console.log(this.state.value)
      },
    };
    return(
      <Modal
        wrapClassName="NewTaskModal"
        title="新建任务"
        visible={this.props.visible}
      // okText={saveBtn?saveBtn:""}
      // cancelText={cancelBtn?cancelBtn:""}
        onCancel={this.handleCancel.bind(this)}
        onOk={this.handleSubmit.bind(this,this.state.rowselectidr)}
        footer={[
          <Button key="save" style={{color:this.props.operation}} disabled={this.state.disabled} onClick={this.handleSubmit.bind(this,this.state.rowselectidr)}>保存</Button>,
          <Button key="cancel" style={{color:this.props.operation}} onClick={this.handleCancel.bind(this)}>取消</Button>,
        ]}
      >
      <div className="active">
        <Form className="login-form">
          {forsc=='full'? data:datas}
        </Form>
        <Modal
          title="请选择值内容"
          visible={this.state.visibleczr}
          onOk={this.handleOkczr}
          onCancel={this.handleCancelczr}
          // okText="确定"
          // cancelText="取消"
          width="800px"
          className="search-component"
          footer={[
            <Button key="save" 
              style={{color:this.props.operation}} 
              disabled={this.state.disabled} 
              onClick={this.handleOkczr.bind(this)}
            >
              确定
            </Button>,
            <Button key="cancel" style={{color:this.props.operation}} onClick={this.handleCancelczr.bind(this)}>取消</Button>,
          ]}
        >
          <div style={{marginLeft:'10px'}}>
            <Row>
              <Col span={6}><Input style={{color:this.props.text}} onInput={this.handleInputr}/></Col>
              <Col span={12}><Button style={{color:this.props.operation}} onClick={this.handleClickSearchr} style={{marginLeft:"10px",marginRight:"10px"}}>搜索</Button>
              <Button style={{color:this.props.operation}} onClick={this.handleClickQK}>清空</Button></Col>
            </Row>
          </div>
          <Table rowSelection={rowSelectionr} columns={this.state.tableColumnsr} dataSource={this.state.tableDatar} pagination={{ pageSize: 50 }} scroll={{ y: 350 }}/>
        </Modal>
        <Modal
          title="请选择值内容"
          visible={this.state.visiblecz}
          onOk={this.handleOkcz}
          onCancel={this.handleCancelcz}
          // okText="确定"
          // cancelText="取消"
          width="800px"
          className="search-component"
          footer={[
            <Button key="save" 
              style={{color:this.props.operation}} 
              disabled={this.state.disabled} 
              onClick={this.handleOkcz.bind(this)}
            >
              确定
            </Button>,
            <Button key="cancel" style={{color:this.props.operation}} onClick={this.handleCancelcz.bind(this)}>取消</Button>,
          ]}
        >
          <div style={{marginLeft:'10px'}}>
            <Row>
              <Col span={6}><Input style={{color:this.props.text}} onInput={this.handleInput}/></Col>
              <Col span={12}><Button onClick={this.handleClickSearch} style={{marginLeft:"10px",marginRight:"10px" ,color:this.props.operation}}>搜索</Button>
              <Button style={{color:this.props.operation}} onClick={this.handleClickQK}>清空</Button></Col>
            </Row>
          </div>
          <Table rowSelection={rowSelection} columns={this.state.tableColumns} dataSource={this.state.tableData} pagination={{ pageSize: 50 }} scroll={{ y: 350 }}/>
        </Modal>
      </div>
      </Modal>
    )
  }
};
const NewTask = Form.create()(NewTasks);
export default NewTask;