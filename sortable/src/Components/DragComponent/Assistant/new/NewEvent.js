import React, {Component} from 'react';
import {Input,DatePicker,Select,Button,Row, Col,Form, Icon,Checkbox,message,Modal ,Table} from 'antd';
import moment from 'moment';
import fetchData from '../../utils/fetch.js';
import {_lookup,BASE_API,_saveEvent,_getObjects,ACTIVITY} from './Api';
const FormItem = Form.Item;
// import './active.css';
const Option = Select.Option;
const InputGroup = Input.Group;
const { TextArea } = Input;


class NewEvents extends Component{
  constructor(porps){
    super(porps);
    this.state = {
      size : 'large',
      newevent:[],
      // 查找
      selectedRowKeysr: [],
      valuer : [],
      tableColumnsr : [],
      tableDatar : [],
      visibler : false,
      currentRecordtyper:'',
      recordtypesr:[],
      visibleczr:false,//查找
      rr : "radio",//查找
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
      pageNum:1,
    }
  }
  componentDidMount(){
    this.setState({
      newevent:[{
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
            },
            {
              "id":"1",
              "value":"打电话"
            },
            {
              "id":"2",
              "value":"约会谈"
            },
            {
              "id":"3",
              "value":"约吃饭"
            },
            {
              "id":"4",
              "value":"会议"
            },
            {
              "id":"5",
              "value":"其他活动"
            }
          ]
        },
        "right":{
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
          "lookupObj": "005"
        }
      },
      {
        "left":{
          "fined":"namee",
          "name":"名称",
          "label":"名称event",
          "type":"F",
          "required":true,
          "edit":true
        },
        "right":{
          "fined":"relatede",
          "name":"相关项",
          "label":"相关项event",
          "type":"F",
          "required":true,
          "edit":true
        }
      },
      {
        "left":{
          "fined":"startTime",
          "name":"开始日期",
          "type":"D",
          "required":true,
          "edit":true
        },
        "right":{
          "fined":"endTime",
          "name":"结束日期",
          "type":"D",
          "required":true,
          "edit":true
        }
      },
      {
        "left":{
          "name":"",
          "type":""
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
      }
    ]
  })
    // 获取相关项
    fetchData(_getObjects + "?binding=" + this.props.binding,{binding:this.props.binding},this.props.binding,
      function (res) {
        let data = eval(res);
        this.setState({
          correlation :data.data,
          whoObjs : data.whoObjs,
        })
      }.bind(this)
    )
  }
  // 查找弹出模态框并请求查找数据
  clickShowModalr = (type)=>{ 
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
        InputType : "",
      });
    }
    fetchData(_lookup + "?binding=" + this.props.binding,{"binding" : this.props.binding,"prefix" : '005',"pageSize" : "50",
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
  // 刷新->新建事件newevent
  handleSubmitsj = (id,e) => {
   // this.props.form.getFieldsValue()
    let Value=this.props.form.getFieldsValue()
    Value.distribution=id.toString()
    e.preventDefault();
    const data=Value;
    data.id=document.getElementById('相关项event').value;
    data.binding=this.state.bindings
    if(data.state=='进行中'){
      data.state='1'
    }else if(data.state=='已结束'){
      data.state='2'
    }else{
      data.state='3'
    }
    data.startTime=JSON.stringify(data.startTime).replace("T"," ").replace("Z","")
    data.endTime=JSON.stringify(data.endTime).replace("T"," ").replace("Z","")
    if(parseInt(data.startTime.slice(12,14))+8 >24){
      var num=parseInt(data.startTime.slice(9,11))+1
      var nums=parseInt(data.startTime.slice(12,14))+8-24
      data.startTime=data.startTime.slice(0,10)+num.toString()+data.startTime.slice(11,12)+nums.toString()+data.startTime.slice(14)
    }else{
      var str=parseInt(data.startTime.slice(12,14))+8
      data.startTime=data.startTime.slice(0,12)+str.toString()+data.startTime.slice(14)
    }
    if(parseInt(data.endTime.slice(12,14))+8 >24){
      var num=parseInt(data.endTime.slice(9,11))+1
      var nums=parseInt(data.endTime.slice(12,14))+8-24
      data.endTime=data.endTime.slice(0,10)+num.toString()+data.endTime.slice(11,12)+nums.toString()+data.endTime.slice(14)
    }else{
      var str=parseInt(data.endTime.slice(12,14))+8
      data.endTime=data.endTime.slice(0,12)+str.toString()+data.endTime.slice(14)
    }
    data.startTime=JSON.parse(data.startTime)
    data.endTime=JSON.parse(data.endTime)
    data.related=document.getElementById('相关项event').value;
    data.whoId=document.getElementById('名称event').value;
    fetchData(_saveEvent + "?binding=" + this.props.binding,data,this.props.binding,
      function (res) {
        let item = eval(res);
        if(item.flag == "SUCCESS"){
          message.success(item.message);
          fetchData(ACTIVITY + "?binding=" + this.props.binding,{id:this.props.id,binding:this.state.bindings,pageSize:20,pageNum:this.state.pageNum,
            dateScope:'all',objectScope:'all'},this.props.binding,
            function (res) {
              let arr = eval(res);
                this.setState({
                  future:arr.future,
                  past:arr.past
                })
            }.bind(this)
          )
          this.props.onOk()
        }else{
          message.error(item.message);
        }
      }.bind(this)
    )
  }
  // 取消新建事件
  handleCancel(){
    this.props.onCancel()
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
    fetchData(_lookup + "?binding=" + this.props.binding,{"binding" : this.props.binding,"prefix" : this.state.lookupObj,"pageSize" : "50",
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
          tableDatar : data.data,
          tableColumnsr : head
        })
      }.bind(this)
    )
  }
  // 搜索input输入的内容
  handleInputr=(e)=>{
    this.setState({
      inputvalr : e.target.value
    })
  }
  // 查找相关项 
  handleChange=(value)=>{
    this.setState({
      lookupObj:`${value}`,
      czvalue:'',
    })
    fetchData(_lookup + "?binding=" + this.props.binding,{"binding" : this.props.binding,"prefix" : this.state.lookupObj,"pageSize" : "50",
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
    this.setState({
      visiblecz : true,
      fieldId:id,
      fieldname:name,
    });
    fetchData(_lookup + "?binding=" + this.props.binding,{"prefix" : this.state.lookupObj,"pageSize" : "50","page" : "1",
      "keyword" : ''},this.props.binding,
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
    fetchData(_lookup + "?binding=" + this.props.binding,{"binding" : this.props.binding,"prefix" : this.state.lookupObj,"pageSize" : "50",
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
    const forsc=this.props.forsc
    const data=this.state.newevent.map((item,index)=>{
      const ltype=item.left.type
      const rtype=item.right.type
      var lcont,rcont;
      if(ltype=='S'){
        var data= item.left.data.map((items,index)=>{
          return(
            <Option style={{color:this.props.text}} value={items.value} key={index}>{items.value}</Option>
          )
        })
        lcont=<InputGroup compact className="sel">
          <Select style={{  width:'100%',color:this.props.text}} placeholder={item.left.value} {...getFieldProps(item.left.fined)}>
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
          <Input style={{color:this.props.text}}  placeholder={ item.right.data[0].value } value={this.state.czvaluer}   />
          <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModalr.bind(this,rtype)} >[查找]</a>
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
            <Input  style={{ width: '75%',color:this.props.text }} id={item.left.label} style={{display:'none'}}/>
            <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModal.bind(this,item.left.fined,item.left.label)}>[查找]</a>
          </div>
        }else if(item.left.name == "名称"){
          lcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%' , color:this.props.text }} onChange={this.handleChange}> 
              {optionwhoid}
            </Select>
            <Input style={{color:this.props.text }} placeholder={ item.left.value } style={{ width: '75%' }} id={item.left.fined} />
            <Input  style={{ width: '75%',color:this.props.text  }} id={item.left.label} style={{display:'none'}}/>
            <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModal.bind(this,item.left.fined,item.left.label)}>[查找]</a>
          </div>
        }else{
          lcont=<Input placeholder={ item.left.value } style={{ width: '100%',color:this.props.text  }}  {...getFieldProps(item.left.fined)}/>
        }
      }
      if(rtype=='F'){
        if(item.right.name == "相关项"){
          rcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%',color:this.props.text  }} onChange={this.handleChange}> 
              {options}
            </Select>
            <Input placeholder={ item.right.value } style={{ width: '75%',color:this.props.text  }} id={item.right.fined}/>
            <Input  style={{ width: '75%' ,color:this.props.text }} id={item.right.label} style={{display:'none'}}/>
            <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link }} onClick={this.clickShowModal.bind(this,item.right.fined,item.right.label)}>[查找]</a>
          </div>
        }else if(item.right.name == "名称"){
          rcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%',color:this.props.text  }} onChange={this.handleChange}> 
              {optionwhoid}
            </Select>
            <Input style={{color:this.props.text }} placeholder={ item.right.value } style={{ width: '75%' }} id={item.right.fined}/>
            <Input  style={{ width: '75%',color:this.props.text  }} id={item.right.label} style={{display:'none'}}/>
            <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModal.bind(this,item.right.fined,item.right.label)}>[查找]</a>
          </div>
        }else{
        rcont=<Input style={{color:this.props.text }} placeholder={ item.right.value }  ref="inputs" key={item.right.fined} {...getFieldProps(item.right.fined)}/>
        }
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
    const datas=this.state.newevent.map((item,index)=>{
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
          <Select style={{  width:'100%',color:this.props.text}}  {...getFieldProps(item.left.fined)}>
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
          <Select style={{  width:'100%',color:this.props.text }}  {...getFieldProps(item.right.fined)}>
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
          <Input style={{color:this.props.text }} placeholder={ item.right.data[0].value } value={this.state.czvaluer}  />
          <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModalr.bind(this,rtype)} >[查找]</a>
        </div>
      }
      if(ltype=='MR'){
        lcont=<div style={{position:'relative'}}>
          <Input style={{color:this.props.text }} placeholder={ item.left.data[0].value } value={this.state.czvaluer}  key={item.left.name} />
          <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModalr.bind(this,ltype)} >[查找多选]</a>
        </div>
      }
      if(rtype=='MR'){
        rcont=<div style={{position:'relative'}}>
          <Input style={{color:this.props.text}} placeholder={ item.right.data[0].value } value={this.state.czvaluer}  key={item.right.name} />
          <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModalr.bind(this,rtype)} >[查找多选]</a>
        </div>
      }         
      if(ltype=='F'){
        if(item.left.name == "相关项"){
        lcont=<div style={{position:'relative'}}>
          <Select style={{ width: '25%',color:this.props.text }} onChange={this.handleChange}> 
            {options}
          </Select>
          <Input placeholder={ item.left.value } style={{ width: '75%',color:this.props.text }} id={item.left.fined}/>
          <Input  style={{ width: '75%',color:this.props.text}} id={item.left.label} style={{display:'none'}}/>
            <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModal.bind(this,item.left.fined,item.left.label)}>[查找]</a>
        </div>
        }else if(item.left.name == "名称"){
          lcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%',color:this.props.text }} onChange={this.handleChange}> 
              <Option style={{color:this.props.text}} value={'003'} >联系人</Option>
              <Option style={{color:this.props.text}} value={'004'} >潜在客户</Option>
            </Select>
            <Input  placeholder={ item.left.value } style={{ width: '75%',color:this.props.text }} id={item.left.fined} />
            <Input  style={{ width: '75%',color:this.props.text }} id={item.left.label} style={{display:'none'}}/>
              <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModal.bind(this,item.left.fined,item.left.label)}>[查找]</a>
          </div>
        }else{
          lcont=<Input placeholder={ item.left.value } style={{ width: '100%',color:this.props.text  }}  key={item.left.fined} {...getFieldProps(item.left.fined)}/>
        }
      }
      if(rtype=='F'){
        if(item.right.name == "相关项"){
          rcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%' ,color:this.props.text }} onChange={this.handleChange}> 
              {options}
            </Select>
            <Input placeholder={ item.right.value } style={{ width: '75%' ,color:this.props.text }} id={item.right.fined}/>
            <Input  style={{ width: '75%',color:this.props.text  }} id={item.right.label} style={{display:'none'}}/>
            <a style={{position:'absolute',right:'5px',top:'0px',color:this.props.link}} onClick={this.clickShowModal.bind(this,item.right.fined,item.right.label)}>[查找]</a>
          </div>
        }else if(item.right.name == "名称"){
          rcont=<div style={{position:'relative'}}>
            <Select style={{ width: '25%' ,color:this.props.text }} onChange={this.handleChange}> 
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
        rcont=<TextArea style={{color:this.props.text }} ref="inputs" key={item.right.name} {...getFieldProps(item.right.fined)}/>
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
          return value.name;
        })
        rowselectidr = selectedRows.map((value,index)=>{
          return value.id;
        })
        this.setState({
          czvaluer : rowselectr,
          rowselectidr:rowselectidr,
        })  
      },
    };
    // 查找模态框内容
    let {rowselect,rowselectid}=[];
    const rowSelection = {
      type : this.state.InputType,
      onChange: (selectedRowKeys, selectedRows) => {
        rowselect = selectedRows.map((value,index)=>{
          return value.name;
        })
        rowselectid = selectedRows.map((value,index)=>{
          return value.id;
        })
        var fieldId=this.state.fieldId;
        var fieldname=this.state.fieldname;
        document.getElementById(fieldId).value=rowselect
        document.getElementById(fieldname).value=rowselectid
        this.setState({
          czvalue : rowselect,
          rowselectid:rowselectid,
        })
      },
    };
    return(
      <Modal
        wrapClassName="NewEventModal"
        title="新建事件"
        visible={this.props.visible}
      // okText={saveBtn?saveBtn:""}
      // cancelText={cancelBtn?cancelBtn:""}
        onCancel={this.handleCancel.bind(this)}
        onOk={this.handleSubmitsj.bind(this,this.state.rowselectidr)}
        footer={[
          <Button key="save" style={{color:this.props.operation}} disabled={this.state.disabled} onClick={this.handleSubmitsj.bind(this,this.state.rowselectidr)}>保存</Button>,
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
            <Button key="save" style={{color:this.props.operation}} disabled={this.state.disabled} onClick={this.handleOkczr.bind(this)}>确定</Button>,
            <Button key="cancel" style={{color:this.props.operation}} onClick={this.handleCancelczr.bind(this)}>取消</Button>,
          ]}
        >
          <div style={{marginLeft:'10px'}}>
            <Row>
              <Col span={6}><Input style={{color:this.props.text}} onInput={this.handleInputr}/></Col>
              <Col span={12}><Button style={{color:this.props.operation}} onClick={this.handleClickSearchr} style={{marginLeft:"10px",marginRight:"10px",color:this.props.operation}}>搜索</Button>
              <Button onClick={this.handleClickQKr} style={{color:this.props.operation}}>清空</Button></Col>
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
              <Col span={12}><Button  onClick={this.handleClickSearch} style={{marginLeft:"10px",marginRight:"10px", color:this.props.operation}}>搜索</Button>
              <Button  style={{color:this.props.operation}} onClick={this.handleClickQK}>清空</Button></Col>
            </Row>
          </div>
          <Table rowSelection={rowSelection} columns={this.state.tableColumns} dataSource={this.state.tableData} pagination={{ pageSize: 50 }} scroll={{ y: 350 }}/>
        </Modal>
      </div>
      </Modal>
    )
  }
};

const NewEvent = Form.create()(NewEvents);
export default NewEvent;