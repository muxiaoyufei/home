import React, { Component } from 'react';
import { Icon, Tooltip, Button, Row, Col, Input, Select, InputNumber, Checkbox, Modal, DatePicker, Form, Cascader, Rate, Radio, Table, message } from 'antd';
import Built from './style.css';
import { Request } from '../utils/fetch.js';
import NewBuilt from './NewBuilt.js';
import moment from 'moment';
import { RECORDTYPE, LOOKUP, OBJDETAIL, DEPENDENCYFIELDINFOS,CHANGEOWNER,HIGHLIGHT,LEVELDATA ,BODY_DETAILSAVE} from '../utils/Api.jsx';
import Modals from './Modal.js'
import SimEditor from './SimEditor.js';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

class Infos extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      loading: false,
      visible: false,
      visiblelx: false,
      value: '',
      type: 'Editinfo',
      currentRecordtype: '',
      recordtypes: [],
      visiblecz: false,//查找
      InputType: "radio",//查找
      inputval: '',//查找是输入的内容
      lookupObj: '',//点击查找是传递过来
      visibleowner: false,//更改所有人显示true
      holder: '',//更改所有人
      rowselectid: '',//更改所有人id
      disabledsendemai: false,//是否发送电子邮件
      fieldId: '',
      fieldname: '',
      tablePage: '',
      selectedRowKeys: [],
      detailedInformation: [],
      detailedInformationDETAIL:[],
      data : [],
      listmessage : "",
      offinfo : false,
      recordtype_old : ""
    }
  };
  showModal = () => {
    this.setState({ visible: true, visiblelx: false, })
  };
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
    this.handleCancelrecordtype()
    this.setState({ visible: false })
  };
  // 详细信息编辑完毕
  handleOk = (basicinfo, systeminfo, e) => {
    setTimeout(() => {
      if (this.props.offinfo) {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false })
        }, 500);
      }
    }, 2000);
  };
  onFocuss = () => {
  }

  // 更改记录类型showModel
  handleshowModel = () => {
    Request(RECORDTYPE + "?binding=" + this.props.binding, {
      id: this.props.id,
      objectApi: ""
    }).then((json) => {
      console.log("info>>>",json)
      if(json.flag=="ERROR"){
        this.setState({
          currentRecordtype: '',
          recordtypes: [],
          visiblelx: false
        })
      }else{
        if (json.data.recordtypes.length == 0) {
          message.error('无可用记录类型！', 5);
        } else {
          this.setState({
            currentRecordtype: json.data.currentRecordtype,
            recordtypes: json.data.recordtypes,
            visiblelx: true
          })
        }
      }  
    });
  }

  handleCancelrecordtype=()=>{
    this.setState({
      currentRecordtype:this.state.recordtype_old,
    })
    // 用户详细信息
    this.handleClickDETAIL('DETAIL',this.state.recordtype_old)
    this.handleClickeditclone('EDIT',this.state.recordtype_old)
  }

  // 对象详细信息操作
  handleClickDETAIL=(value,recordtype)=>{
    Request(OBJDETAIL+"?binding="+this.props.binding,{
      id:this.props.id,
      "objectApi":this.props.objectApi,
      "recordtype":recordtype,
      "operation":value,
    }).then((json)=>{
      if(json=="ERROR"){
        this.setState({
          detailedInformationDETAIL:[]
        })
      }else{
        this.setState({
          detailedInformationDETAIL:json.data
        })
      }
    });
  }
  handleClickeditclone=(value,recordtype)=>{
    Request(OBJDETAIL+"?binding="+this.props.binding,{
      id:this.props.id,
      "objectApi":this.props.objectApi,
      "recordtype":recordtype,
      "operation":value,
    }).then((json)=>{
      if(json.flag=="ERROR"){
        this.setState({
          detailedInformation:[]
        })
      }else{
        this.setState({
          detailedInformation:json.data
        })
      }
    });
  }

  handleCancellx = () => {
    this.setState({ visiblelx: false })
  };
  
  onChange = (e) => {
    this.props.handleClickrecordtypeid(e.target.value)
    this.setState({
      value: e.target.value,
    });
  }

  componentDidMount() {
    Request(OBJDETAIL + "?binding=" + this.props.binding, {
      id: this.props.id,
      "objectApi": this.props.objectApi,
      "recordtype": "",
      "operation": "detail",
    }).then((json) => {
      console.log("info>>>>",json)
      if(json.flag=="ERROR"){
        this.setState({
          detailedInformation: [],
          detailedInformationDETAIL:[]
        })
      }else{
        this.setState({
          detailedInformation: json.data,
          detailedInformationDETAIL:json.data
        })
      }
      
    });

    // 获取联动数据
    Request(LEVELDATA+"?binding="+this.props.binding,{
      }).then((json)=>{
        if(json.flag=="ERROR"){
          this.setState({
            data:[]
          })
        }else{
          this.setState({
            data:json.data
          })
        }
      });
    }

  // 查找弹出模态框并请求查找数据
  clickShowModal = (type, lookupObj, fieldId, name) => {
    this.setState({
      visiblecz: true,
      lookupObj: lookupObj,
      fieldId: fieldId,
      fieldname: name,
    });
    if (type == "Y" || type == "M") {
      this.setState({
        InputType: "radio",
      });
    }
    if (type == "MR") {
      this.setState({
        InputType: "",
      });
    }
    Request(LOOKUP + "?binding=" + this.props.binding, {
      "prefix": lookupObj,
      "pageSize": "1000",
      "page": "1",
      "keyword": ''
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableData: [],
          tableColumns: [],
          tablePage: '',
        })
      }else{
        const jsondata = json.data.map((value, index) => {
          value.key = index
          return (value)
        })
        const head = json.header.map((value, index) => {
          return {
            "title": value.label,
            "dataIndex": value.fieldName,
            "key": value.fieldName
          }
        })
        this.setState({
          tableData: jsondata,
          tableColumns: head,
          tablePage: json.totalCount,
        })
      } 
    });
  }
  // 点击ok确认
  handleOkcz = () => {
    this.setState({
      visiblecz: false,
      selectedRowKeys: [],
    })
  }
  // 点击取消关闭
  handleCancelcz = () => {
    this.setState({
      selectedRowKeys: [],
      visiblecz: false
    })
  }
  // 点击清空是清空
  handleClickQK = () => {
    var fieldId = this.state.fieldId;
    var fieldname = this.state.fieldname;
    document.getElementById(fieldId).value = ''
    document.getElementById(fieldname).value = ''
    this.setState({
      visiblecz: false,//关闭模态框（可选为不关闭）
    })
  }
  // 点击搜索是搜索输入的内容
  handleClickSearch = () => {
    Request(LOOKUP + "?binding=" + this.props.binding, {
      "prefix": this.state.lookupObj,
      "pageSize": "1000",
      "page": "1",
      "keyword": this.state.inputval
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableData: [],
          tableColumns:[],
          tablePage:"",
        })
      }else{
        const jsondata = json.data.map((value, index) => {
          value.key = index
          return (value)
        })
        const head = json.header.map((value, index) => {
          return {
            "title": value.label,
            "dataIndex": value.fieldName,
            "key": value.fieldName
          }
        })
        this.setState({
          tableData: jsondata,
          tableColumns: head,
          tablePage: json.totalCount,
        })
      }  
    });
  }
  // 搜索input输入的内容
  handleInput = (e) => {
    this.setState({
      inputval: e.target.value
    })
  }
  // 更改所有人 显示visibleowner=true
  handleCancelowner = () => {
    this.setState({ visibleowner: false })
  };
  // 保存更改所有人
  handleOkowner = () => {
    var obj = new Object();
    obj.id = this.props.id;
    obj.binding = this.props.binding;
    obj.ownerId = this.state.rowselectid.toString()
    obj.sendEmail = this.state.disabledsendemai
    this.handleclickOwner(obj)
    setTimeout(() => {
      this.setState({ visibleowner: false, })
    }, 100);
  }
  showModalowner = () => {
    this.setState({ visibleowner: true })
  };
  onChangesendemail = (e) => {
    this.setState({
      disabledsendemai: e.target.checked
    })
  }

  /**
    |--------------------------------------------------
    | @method 更改所有人
    |--------------------------------------------------
    */
  handleclickOwner = (data) => {
    Request(CHANGEOWNER + "?binding=" + this.props.binding, data).then((json) => {
      message.success(json.message, 8);
      // 对象简要信息
      Request(HIGHLIGHT + "?binding=" + this.props.binding, {
        "id": this.props.id,
      }).then((json) => {
        const titleName = json.title[0].fieldValue // 头部客户名称
        const titleButton = json.button //button 新建、编辑按钮
        const heightLight = json.heigthLight //高亮区
        const chatterButtons = json.chatterButtons
        const activityButtons = json.activityButtons
        var khemail, syrvalue;
        for (var i = 0; i < heightLight.length; i++) {
          if (heightLight[i].fieldName == "email" && heightLight[i].fieldValue != null) {
            khemail = heightLight[i].fieldValue
          }
          if (heightLight[i].fieldName == "ownerid") {
            syrvalue = heightLight[i].fieldValue
          }
        }

        this.setState({
          titleName: titleName,
          titleButton: titleButton,
          heightLight: heightLight,
          activityButtons: activityButtons,
          chatterButtons: chatterButtons,
          khemail: khemail,
          syrvalue: syrvalue,
        })
      });
      // 用户详细信息
      this.handleClickDETAIL('DETAIL', this.state.currentRecordtype)
      this.handleClickeditclone('EDIT', this.state.currentRecordtype)
    });
  }

  render() {
    var arr = [];
    var textareaVal = [];
    var required = [];
    const radioStyle = {
      display: 'block',
      fontSize: '15px',
      height: '30px',
      lineHeight: '30px',
    };
    // 查找模态框内容
    const { selectedRowKeys } = this.state;
    var rowselect, rowselectid;
    const rowSelection = {
      type: this.state.InputType,
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys })
        rowselect = selectedRows.map((value, index) => {
          return value.name;
        })
        rowselectid = selectedRows.map((value, index) => {
          return value.id;
        })
        var fieldId = this.state.fieldId;
        var fieldname = this.state.fieldname;
        this.setState({
          holder: rowselect,//更改所有人
          rowselectid: rowselectid,//更改所有人id
        })
        document.getElementById(fieldId).value = rowselect
        document.getElementById(fieldname).value = rowselectid
      },
    };
    const { getFieldProps } = this.props.form;
    const { visible, loading } = this.state;
    const Information = this.state.detailedInformationDETAIL.map((items, index) => {
      const basic_info = items.data.map((item, index) => {
        const ltype = item.left.type
        const rtype = item.right.type
        var lcont, rcont;
        if (ltype == 'A') {
          let html = { __html: item.left.value }
          lcont = <div dangerouslySetInnerHTML={html} ></div>
        } else if (ltype == 'B') {
          lcont = <Checkbox checked={item.left.value} ></Checkbox>
        } else if (ltype == 'U') {
          lcont = <a href={"http://" + item.left.value} target="_blank">{item.left.value}</a>
        } else if (ltype == 'ct' && item.left.name == "currency") {
          lcont = ""
        } else if (ltype == 'SCORE') {
          lcont = <Rate count={10} style={{ fontSize: 12 }} disabled defaultValue={item.left.value} />
        } else
          if (ltype == 'MR') {
            var leftval;
            for (var i = 0; i < item.left.data.length; i++) {
              if (item.left.value == item.left.data[i].id) {
                leftval = item.left.data[i].value
              }
            }
            lcont = <span>{leftval} </span>
          } else
            if (ltype == 'Y' || ltype == 'M' || ltype == 'R') {
              if (item.left.name == "ownerid") {
                lcont = <span>{item.left.data[0].value} <a href="javascript:void(0)" onClick={this.showModalowner}>[更改]</a></span>
              } else if (item.left.name == "recordtype") {
                var leftval;
                for (var i = 0; i < item.left.data.length; i++) {
                  if (item.left.value == item.left.data[i].id) {
                    leftval = item.left.data[i].value
                  }
                }
                lcont = <span>{leftval} <a href="javascript:void(0)" onClick={this.handleshowModel}>[更改]</a></span>
              } else {
                lcont = <span>{item.left.data[0].value} </span>
              }
            } else {
              lcont = <span>{item.left.value}</span>
            }
        if (rtype == 'A') {
          let html = { __html: item.right.value }
          rcont = <div dangerouslySetInnerHTML={html} ></div>
        } else if (rtype == 'B') {
          rcont = <Checkbox checked={item.right.value}></Checkbox>
        } else if (rtype == 'U') {
          lcont = <a href={"http://" + item.right.value} target="_blank">{item.right.value}</a>
        } else if (rtype == 'ct' && item.right.name == "currency") {
          lcont = ""
        } else if (rtype == 'SCORE') {
          rcont = <Rate count={10} style={{ fontSize: 12 }} disabled defaultValue={item.right.value} />
        } else
          if (rtype == 'MR') {
            var rightval;
            for (var i = 0; i < item.right.data.length; i++) {
              if (item.right.value == item.right.data[i].id) {
                rightval = item.right.data[i].value
              }
            }
            lcont = <span>{rightval} </span>
          } else
            if (rtype == 'Y' || rtype == 'M' || rtype == 'R') {
              if (item.right.name == "ownerid") {
                rcont = <span>{item.right.data[0].value} <a href="javascript:void(0)" onClick={this.showModalowner}>[更改]</a></span>
              } else if (item.right.name == "recordtype") {
                var rightval;
                for (var i = 0; i < item.right.data.length; i++) {
                  if (item.right.value == item.right.data[i].id) {
                    rightval = item.right.data[i].value
                  }
                }
                rcont = <span>{rightval} <a href="javascript:void(0)" onClick={this.handleshowModel}>[更改]</a></span>
              } else {
                rcont = <span>{item.right.data[0].value} </span>
              }
            } else {
              rcont = <span>{item.right.value}</span>
            }

        var classname1, classname2, classname21, numbers, numberss;
        if (item.left.type == 'A') {
          classname1 = "main mainsB"
          classname2 = "boxB"
          numbers = 12
          numberss = 12
        } else if (item.right.name == undefined) {
          classname1 = "main mains"
          classname2 = "box100"
          numbers = 24
          numberss = 0
        } else {
          classname1 = "main mains"
          classname2 = "box"
          classname21 = "box1"
          numbers = 12
          numberss = 12
        }
        return (
          <Row key={index}>
            <Col span={numbers}>
              <div className={item.left.label != undefined ? classname2 : classname21} >
                <div className="sub">
                  <span>
                    {item.left.helpText != '' && item.left.helpText != undefined ? <Tooltip placement="bottomLeft" title={<span>{item.left.helpText}</span>}>
                      <Icon type="question-circle-o" style={{ fontSize: 14, color: '#f40' }} />
                    </Tooltip> : ''}
                    {item.left.type == 'ct' && item.left.name == "currency" ? "" : item.left.label}
                  </span>
                </div>
                <div className={classname1}>
                  {lcont}
                  {item.left.label != undefined ? <Icon type="edit"  onClick={this.showModal}/> : null}
                </div>
              </div>
            </Col>
            <Col span={numberss} style={{ textAlign: '-webkit-right' }}>
              <div className={item.right.label != undefined ? 'box' : 'box1'}>
                <div className="sub">
                  <span>
                    {item.right.helpText != '' && item.right.helpText != undefined ? <Tooltip placement="bottomLeft" title={<span>{item.right.helpText}</span>}>
                      <Icon type="question-circle-o" style={{ fontSize: 14, color: '#f40' }} />
                    </Tooltip> : ''}
                    {item.right.type == 'ct' && item.right.name == "currency" ? "" : item.right.label}
                  </span>
                </div>
                <div className="main mains">
                  {rcont}
                  {item.right.label != undefined ? <Icon type="edit"  onClick={this.showModal}/> : null}
                </div>
              </div>
            </Col>
          </Row>
        )
      })
      return (
        <div className="base-info" key={index}>
          <a href="javascript:void(0)" className="title"><i className="icon-sort-down"></i>{items.title}</a>
          {basic_info}
        </div>
      )
    })
    const detailedInformation = this.state.detailedInformation.map((items, index) => {
      const basic_info_edit = items.data.map((item, index) => {
        const itle = item.left.edit
        const ltype = item.left.type
        const itre = item.right.edit
        const rtype = item.right.type
        var lcont, rcont, lconts, rconts;

        if (ltype == 'S' || ltype == 'V' || ltype == 'N' || ltype == 'P' || ltype == 'H' || ltype == 'E' || ltype == 'c' || ltype == 'U' || ltype == 'enc' || ltype == 'encd') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          if (itle == true) {
            textareaVal.push(item.left.name)
          }
          var infoid;
          if (item.left.name == 'name') {
            infoid = 'zmid'
          } else {
            infoid = item.left.name
          }
          lcont = <div style={{ position: 'relative' }}>
            <Input defaultValue={item.left.value} key={item.left.name} id={infoid} />
          </div>
        }
        if (rtype == 'S' || rtype == 'V' || rtype == 'N' || rtype == 'P' || rtype == 'H' || rtype == 'E' || rtype == 'c' || rtype == 'U' || rtype == 'enc' || rtype == 'encd') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          if (itre == true) {
            textareaVal.push(item.right.name)
          }
          var infoid;
          if (item.right.name == 'name') {
            infoid = 'zmid'
          } else {
            infoid = item.right.name
          }
          rcont = <div style={{ position: 'relative' }}>
            <Input defaultValue={item.right.value} key={item.right.name} id={infoid} />
          </div>
        }
        if (ltype == 'L' || ltype == 'Q' || ltype == 'ct') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          var select;
          /**
          |--------------------------------------------------
          | isControlField为true是控制字段，false不是控制字段
          |--------------------------------------------------
          */
          if (item.left.isControlField == true) {
            select = this.handleOnblurfind.bind(this, item.left.fieldId)
          } else {
            select = this.handleonselect
          }
          var selectVal;
          var data = item.left.data.map((items, index) => {
            return (
              <Option value={items.id} key={index} >{items.value}</Option>
            )
          })
          lcont = <InputGroup compact className="sel">
            <Select style={{ width: '100%' }} placeholder={item.left.value} onSelect={select} {...getFieldProps(item.left.name) }>
              {data}
            </Select>
          </InputGroup>
        }
        if (rtype == 'L' || rtype == 'Q' || rtype == 'ct') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          if (item.right.isControlField == true) {
            select = this.handleOnblurfind.bind(this, item.right.fieldId)
          } else {
            select = this.handleonselect
          }
          var selectVal;
          var data = item.right.data.map((items, index) => {
            return (
              <Option value={items.id} key={index} >{items.value}</Option>
            )
          })
          rcont = <InputGroup compact className="sel">
            <Select style={{ width: '100%' }} placeholder={item.right.value} onSelect={select} {...getFieldProps(item.right.name) }>
              {data}
            </Select>
          </InputGroup>
        }
        if (ltype == 'D' || ltype == 'F') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          const dateFormat = 'YYYY/MM/DD';
          lcont = <InputGroup compact>
            <DatePicker style={{ width: '100%' }} defaultValue={moment(item.left.value, dateFormat)} format={dateFormat} key={item.left.name} {...getFieldProps(item.left.name) } />
          </InputGroup>
        }
        if (rtype == 'D' || rtype == 'F') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          const dateFormat = 'YYYY/MM/DD';
          rcont = <InputGroup compact>
            <DatePicker style={{ width: '100%' }} defaultValue={moment(item.right.value, dateFormat)} format={dateFormat} key={item.right.name} {...getFieldProps(item.right.name) } />
          </InputGroup>
        }
        if (ltype == 'B') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          if (item.left.value) {
            lcont = <Checkbox defaultChecked style={{ float: 'left' }} key={item.left.name}  {...getFieldProps(item.left.name) }></Checkbox>
          } else {
            lcont = <Checkbox style={{ float: 'left' }} key={item.left.name} {...getFieldProps(item.left.name) }></Checkbox>
          }
        }
        if (rtype == 'B') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          if (item.right.value) {
            rcont = <Checkbox defaultChecked style={{ float: 'left' }} key={item.right.name} {...getFieldProps(item.right.name) }></Checkbox>
          } else {
            rcont = <Checkbox style={{ float: 'left' }} key={item.right.name} {...getFieldProps(item.right.name) }></Checkbox>
          }
        }
        if (ltype == 'SCORE') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          // textareaVal.push(item.left.name)
          lcont = <Rate count={10} style={{ fontSize: 12 }} defaultValue={Number(item.left.value)} {...getFieldProps(item.left.name) } />
        }
        if (rtype == 'SCORE') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          // textareaVal.push(item.right.name)
          rcont = <Rate count={10} style={{ fontSize: 12 }} defaultValue={Number(item.right.value)} {...getFieldProps(item.right.name) } />
        }
        if (ltype == 'AD') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          var data = item.left.children
          var items, itemsval;
          var itemval = [];
          for (var i = 0; i < data.length; i++) {
            if (data[i].type == 'L') {
              itemval.push(data[i].value)
            }
            if (data[i].type == 'S') {
              items = data[i].name
              itemsval = data[i].value
            }
          }
          textareaVal.push(items)
          lcont = <div>
            <Cascader style={{ textAlign: 'left' }} defaultValue={itemval} options={this.props.ldsj} {...getFieldProps(item.left.name) } />
            <br />
            <Input defaultValue={itemsval} id={items} />
          </div>
        }
        if (rtype == 'AD') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          var data = item.right.children
          var items, itemsval;
          var itemval = [];
          for (var i = 0; i < data.length; i++) {
            if (data[i].type == 'L') {
              itemval.push(data[i].value)
            }
            if (data[i].type == 'S') {
              items = data[i].name
              itemsval = data[i].value
            }
          }
          textareaVal.push(items)
          rcont = <div>
            <Cascader style={{ textAlign: 'left' }} defaultValue={itemval} options={this.props.ldsj} {...getFieldProps(item.right.name) } />
            <br /><Input defaultValue={itemsval} id={items} />
          </div>
        }
        if (ltype == 'X') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          if (itle) {
            textareaVal.push(item.left.name)
          }
          lcont = <TextArea defaultValue={item.left.value} ref="inputs" key={item.left.name} id={item.left.name} />
        }
        if (rtype == 'X') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          if (itre) {
            textareaVal.push(item.right.name)
          }
          rcont = <TextArea defaultValue={item.right.value} ref="inputs" key={item.right.name} id={item.right.name} />
        }
        if (ltype == 'A') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          if (itle) {
            textareaVal.push(item.left.name)
          }
          lcont = <SimEditor textareaID={item.left.name} value={item.left.value} />
        }
        if (rtype == 'A') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          if (itre) {
            textareaVal.push(item.right.name)
          }
          lcont = <SimEditor textareaID={item.right.name} value={item.right.value} />
        }
        if (ltype == 'Y' || ltype == 'M') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          if (item.left.edit == true) {
            var fieldName = item.left.name
            arr.push(fieldName)
          }
          var defaultValuename, defaultValueid;
          for (var i = 0; i < item.left.data.length; i++) {
            if (item.left.value == item.left.data[i].id) {
              defaultValuename = item.left.data[i].value
              defaultValueid = item.left.data[i].id
            }
          }
          lcont = <div style={{ position: 'relative' }}>
            <Input defaultValue={defaultValuename} id={item.left.fieldId} />
            <Input type={item.left.name} defaultValue={defaultValueid} id={item.left.name} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, ltype, item.left.lookupObj, item.left.fieldId, item.left.name)}>[查找]</a>
          </div>
        }
        if (rtype == 'Y' || rtype == 'M') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          if (item.right.edit == true) {
            var fieldName = item.right.name
            arr.push(fieldName)
          }
          var defaultValuename, defaultValueid;
          for (var i = 0; i < item.right.data.length; i++) {
            if (item.right.value == item.right.data[i].id) {
              defaultValuename = item.right.data[i].value
              defaultValueid = item.right.data[i].id
            }
          }
          rcont = <div style={{ position: 'relative' }}>
            <Input defaultValue={defaultValuename} id={item.right.fieldId} key={item.right.name} />
            <Input type={item.right.name} defaultValue={defaultValueid} id={item.right.name} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, rtype, item.right.lookupObj, item.right.fieldId, item.right.name)} >[查找]</a>
          </div>
        }
        if (ltype == 'MR') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          if (item.left.edit == true) {
            var fieldName = item.left.name
            arr.push(fieldName)
          }
          var defaultValuename, defaultValueid;
          for (var i = 0; i < item.left.data.length; i++) {
            if (item.left.value == item.left.data[i].id) {
              defaultValuename = item.left.data[i].value
              defaultValueid = item.left.data[i].id
            }
          }
          lcont = <div style={{ position: 'relative' }}>
            <Input defaultValue={defaultValuename} id={item.left.fieldId} key={item.left.name} />
            <Input type={item.left.name} defaultValue={defaultValueid} id={item.left.name} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, ltype, item.left.lookupObj, item.left.fieldId, item.left.name)} >[查找多选]</a>
          </div>
        }
        if (rtype == 'MR') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          if (item.right.edit == true) {
            var fieldName = item.right.name
            arr.push(fieldName)
          }
          var defaultValuename, defaultValueid;
          for (var i = 0; i < item.right.data.length; i++) {
            if (item.right.value == item.right.data[i].id) {
              defaultValuename = item.right.data[i].value
              defaultValueid = item.right.data[i].id
            }
          }
          rcont = <div style={{ position: 'relative' }}>
            <Input defaultValue={defaultValuename} id={item.right.fieldId} key={item.right.name} />
            <Input type={item.right.name} defaultValue={defaultValueid} id={item.right.name} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, rtype, item.right.lookupObj, item.right.fieldId, item.right.name)} >[查找多选]</a>
          </div>
        }
        if (ltype == 'LT') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          var data = item.left.children
          if (itle) {
            textareaVal.push(data[0].name)
            textareaVal.push(data[1].name)
          }
          lcont = <div style={{ paddingTop: '10px' }}>
            <Input style={{ width: "45%", float: "left", marginRight: '5%' }} defaultValue={data[0].value} ref="inputs" id={data[0].name} />
            <Input style={{ width: "45%", float: "left" }} defaultValue={data[1].value} ref="inputs" id={data[1].name} />
          </div>
        }
        if (rtype == 'LT') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          var data = item.right.children
          if (itre) {
            textareaVal.push(data[0].name)
            textareaVal.push(data[1].name)
          }
          rcont = <div>
            <Input style={{ width: "45%", float: "left", marginRight: '5%' }} defaultValue={data[0].value} ref="inputs" id={data[0].name} />
            <Input style={{ width: "45%", float: "left" }} defaultValue={data[1].value} ref="inputs" id={data[1].name} />
          </div>
        }

        if (ltype == 'A') {
          let html = { __html: item.left.value }
          lconts = <div dangerouslySetInnerHTML={html} ></div>
        } else if (ltype == 'B') {
          lconts = <Checkbox checked={item.left.value} ></Checkbox>
        } else if (ltype == 'SCORE') {
          lconts = <Rate count={10} style={{ fontSize: 12 }} disabled defaultValue={item.left.value} />
        } else if (ltype == 'Y' || ltype == 'M' || ltype == 'R') {
          if (item.left.name == "ownerid") {
            lconts = <span>{item.left.data[0].value} </span>
          } else if (item.left.name == "recordtype") {
            var leftval;
            for (var i = 0; i < item.left.data.length; i++) {
              if (item.left.value == item.left.data[i].id) {
                leftval = item.left.data[i].value
              }
            }
            lconts = <span>{leftval}  </span>
          } else {
            lconts = <span>{item.left.data[0].value} </span>
          }
        } else {
          lconts = <span>{item.left.value}</span>
        }

        if (rtype == 'A') {
          let html = { __html: item.right.value }
          rconts = <div dangerouslySetInnerHTML={html} ></div>
        } else if (rtype == 'B') {
          rconts = <Checkbox checked={item.right.value} ></Checkbox>
        } else if (rtype == 'SCORE') {
          rconts = <Rate count={10} style={{ fontSize: 12 }} disabled defaultValue={item.right.value} />
        } else if (rtype == 'Y' || rtype == 'M' || rtype == 'R') {
          if (item.right.name == "ownerid") {
            rconts = <span>{item.right.data[0].value} </span>
          } else if (item.right.name == "recordtype") {
            var rightval;
            for (var i = 0; i < item.right.data.length; i++) {
              if (item.right.value == item.right.data[i].id) {
                rightval = item.right.data[i].value
              }
            }
            rconts = <span>{rightval} </span>
          } else {
            rconts = <span>{item.right.data[0].value} </span>
          }
        } else {
          rconts = <span>{item.right.value}</span>
        }

        var classname1, classname2, numbers, numberss;
        if (item.left.type == 'A') {
          classname1 = "main mainsA"
          classname2 = "boxA"
          numbers = 12
          numberss = 12
        } else if (item.right.name == undefined) {
          classname1 = "main mains"
          classname2 = "box100"
          numbers = 24
          numberss = 0
        } else {
          classname1 = "main mains"
          classname2 = "box"
          numbers = 12
          numberss = 12
        }

        return (
          <Row key={index}>
            <Col span={numbers}>
              <FormItem >
                {
                  <div className={classname2}>
                    <div className="sub">
                      {item.left.required ? <Icon type="star" className="iconReqire" /> : ''}<span>{item.left.label}</span>
                    </div>
                    <div className={classname1}>
                      {itle ? lcont : lconts}
                    </div>
                  </div>
                }
              </FormItem>
            </Col>
            <Col span={numberss} style={{ textAlign: '-webkit-right' }}>
              <FormItem>
                {
                  <div className="box">
                    <div className="sub">
                      {item.right.required ? <Icon type="star" className="iconReqire" /> : ''}<span>{item.right.label}</span>
                    </div>
                    <div className="main mains">
                      {itre ? rcont : rconts}
                    </div>
                  </div>
                }
              </FormItem>
            </Col>
          </Row>
        )
      })
      return (
        <div className="base-info" key={index}>
          <a href="javascript:void(0)" className="title"><i className="icon-sort-down"></i>{items.title}</a>
          {basic_info_edit}
        </div>
      )
    })
    const lxgroup = this.state.recordtypes.map((item, value) => {
      return (
        <Radio style={radioStyle} value={item.id} key={value}>{item.label}</Radio>
      )
    })
    var display;
    if (this.props.listmessage != "") {
      display = 'block'
    } else {
      display = 'none'
    }
    return (
      <div>
        {Information}
        {/*编辑模态框  */}
        <Modals 
          visible={this.state.visible}//
          showmodal={this.showModal}//
          hidemodal={this.hideModal}//
          handlecancel={this.handleCancel}//
          handleOkcl={this.handleOkcl.bind(this)}
          handleOk={this.handleOk}//
          type={this.state.type}//
          detailedInformation={this.state.detailedInformation}//
          ldsj={this.state.data}//
          binding={this.props.binding}//
          handleOnblurfind={this.handleOnblurfind}//
          listmessage={this.state.listmessage}//
          offinfo={this.state.offinfo}//
        />
        
        <Modal className="Lant-modal Lant-modals"
          visible={this.state.visiblelx}
          onCancel={this.handleCancellx}
        >
          <Form onSubmit={this.handleClicklx.bind(this, this.state.value)}>
            <h1 style={{}}>更改记录类型</h1>
            <hr style={{ marginTop: '15px', marginBottom: '15px' }} />
            <p style={{ fontSize: '16px', textIndent: '2em', padding: '0px 10px 20px 10px' }}>更改记录的记录类型时，现有选项列表值不会自动更改。我们建议在相同的地方更新记录上的现有选项列表值。</p>
            <div style={{ fontSize: '15px' }}>
              <Row type="flex" justify="center" align="top">
                <Col span={4}><DemoBox value={50}>已选择记录类型</DemoBox></Col>
                <Col span={8}><DemoBox value={50}>{this.state.currentRecordtype}</DemoBox></Col>
              </Row>
              <br />
              <Row type="flex" justify="center" align="top">
                <Col span={4}><DemoBox value={50}> 可用记录类型</DemoBox></Col>
                <Col span={8}><DemoBox value={100}>
                  <RadioGroup onChange={this.onChange} value={this.state.value}>
                    {lxgroup}
                  </RadioGroup>
                </DemoBox></Col>
              </Row>
            </div>
            <div className="base-info" style={{ height: '45px' }}></div>
            <div className="base_btn" >
              <Button key="back" size="large" onClick={this.handleCancellx}>取消</Button>
              <Button key="submit" type="primary" htmlType="submit" size="large" onClick={this.showModal}>
                下一步
                </Button>
            </div>
          </Form>
        </Modal>
        
        <Modal
          title="请选择值内容"
          visible={this.state.visiblecz}
          onOk={this.handleOkcz}
          onCancel={this.handleCancelcz}
          okText="确定"
          cancelText="取消"
          width="800px"
          className="search-component"
        >
          <div style={{ marginLeft: '10px' }}>
            <Row>
              <Col span={6}><Input onInput={this.handleInput} /></Col>
              <Col span={0.5}></Col>
              <Col span={12}><Button onClick={this.handleClickSearch}>搜索</Button>&nbsp;&nbsp;<Button onClick={this.handleClickQK}>清空</Button></Col>
            </Row>
          </div>
          <Table 
            rowKey={record => record.id}
            rowSelection={rowSelection} 
            columns={this.state.tableColumns} 
            dataSource={this.state.tableData} 
            pagination={{ pageSize: 25, total: this.state.tablePage }} 
            scroll={{ y: 350 }} 
          />
        </Modal>
        <Modal className="Lant-modal Lant-modals"
          title="更改所有人"
          height="300px"
          visible={this.state.visibleowner}
          onCancel={this.handleCancelowner}
        >
          <Form >
            <Row style={{ padding: '20px 0 0 20px' }}>
              <Col span={3} style={{ textAlign: 'right', paddingRight: '10px', fontSize: '16px' }}>所有人</Col>
              <Col span={18}>
                <Input
                  value={this.state.holder}
                  style={{ width: 300 }}
                /> <a onClick={this.clickShowModal.bind(this, 'Y', '005')}>[查找]</a>
              </Col>
            </Row>
            <Row style={{ padding: '10px 0 0 20px' }}>
              <Col span={3}></Col>
              <Col span={20} style={{ fontSize: '16px' }}><Checkbox onChange={this.onChangesendemail} > 发送电子邮件</Checkbox></Col>
            </Row>
            <div className="base-info" style={{ height: '45px' }}></div>
            <div className="base_btn" >
              <Button key="back" size="large" onClick={this.handleCancelowner}>取消</Button>
              <Button key="submit" type="primary" htmlType="submit" size="large" loading={loading} onClick={this.handleOkowner}>
                确认
                </Button>
            </div>
          </Form>
        </Modal>
      </div>
    )
  }

  handleClicklx=(value,e)=>{
    // this.setState({
    //     recordtype_old:this.state.currentRecordtype,
    //   })
    //  e.preventDefault();
    // //  this.handleClickDETAIL('DETAIL',this.state.recordtype_info)
    //  this.handleClickeditclone('EDIT',this.state.recordtype_info)
    //  this.setState({
    //     currentRecordtype:this.state.recordtype_info,
    //   })
  }

  /**
  |--------------------------------------------------
  | @method 对象详细信息编辑后保存并更新对象详细信息
  |--------------------------------------------------
  */
  handleOkcl =(value,info,arr,required,textareaVal,type,e)=>{
    e.preventDefault();
    var data=value;
    
    var datas=[] 
      if(this.state.currentRecordtype != ""){
          var recordtype = new Object()
          recordtype.fieldName = 'recordtype'; 
          recordtype.value = this.state.currentRecordtype; 
          datas.push(recordtype)
      }
    
    /**
     |--------------------------------------------------
      | 地址类型LQ、日期类型DF、复选框B
      |--------------------------------------------------
      */
      for(var key in data){  
        if(typeof(data[key]) != 'undefined'){
          if(data[key] instanceof Array){
            var dataobj00 = new Object();
            var dataobj11 = new Object();
            var dataobj22 = new Object();
            var dataobj33 = new Object();
              dataobj00.fieldName =key+'00'
              dataobj00.value =data[key][0]
              dataobj11.fieldName =key+'01'
              dataobj11.value =data[key][1]
              dataobj22.fieldName =key+'02'
              dataobj22.value =data[key][2]
              dataobj33.fieldName =key+'03'
              dataobj33.value =data[key][3]
            datas.push(dataobj00)
            datas.push(dataobj11)
            datas.push(dataobj22)
            datas.push(dataobj33)
          }else{
            var dataobj = new Object();
            dataobj.fieldName = key
            dataobj.value = data[key]
            datas.push(dataobj)
          }
        }else  {
          if(type=="Clone"){
            var dataobj = new Object();
            dataobj.fieldName = key
            // dataobj.value = data[key]
            datas.push(dataobj)
          }
        }
      }  
      /**
       |--------------------------------------------------
        | 单选Y M、多选 MR
        |--------------------------------------------------
        */
        for(var i=0;i<arr.length;i++){
        var obj = new Object()
        obj.fieldName=arr[i]
        if(type=="Editinfo"){
          var str = document.getElementById(arr[i]+'info').value
        }else{
          var str = document.getElementById(arr[i]).value
        }
        var newstr = str.replace(/,/g,';')
        obj.value=newstr
        datas.push(obj)
      }
      
      /**
        |--------------------------------------------------
        | 富文本A、文本类型S V N P H E c ct U enc encd
        |--------------------------------------------------
        */
      for(var i=0;i<textareaVal.length;i++){
          var textareaobj = new Object();
        if(textareaVal[i] == 'name'){
          textareaobj.fieldName = textareaVal[i]
          if(type=="Edit"){
            textareaobj.value = document.getElementById('zmid').value
          }else if(type=="Editinfo"){
            textareaobj.value = document.getElementById('zmidinfo').value
          }else{
            textareaobj.value = document.getElementById('zmidclone').value
          }
        }else{
          textareaobj.fieldName = textareaVal[i]
          if(type=="Editinfo"){
            textareaobj.value = document.getElementById(textareaVal[i]+'info').value
          }else{
            textareaobj.value = document.getElementById(textareaVal[i]).value
          }
        }
        datas.push(textareaobj)
      }
      
      var obj = new Object()
      if(type=="Edit"||type=="Editinfo"){
        obj.id=this.state.ids
      }else{
        obj.id="" 
      }
        obj.objectApi=this.props.objectApi
        obj.data=datas

      var newdata=obj
      /**
      |--------------------------------------------------
      | 检查必填项是否填写内容
      |--------------------------------------------------
      */
      for(var i=0;i<required.length;i++){
        for(var j=0;j<datas.length;j++){
          if(required[i].name === datas[j].fieldName){
            if(datas[j].value ==''){
              var message='请输入 '+required[i].label+' 的值'
              this.setState({
                  listmessage:message,
                  offinfo:false
                })
            }else{
              this.setState({
                  listmessage:'',
                  offinfo:false
                }) 
            }
          }
        }
      }
    
      for(var j=0;j<datas.length;j++){
        if(required[required.length-1].name === datas[j].fieldName && datas[j].value !=''){
          Request(BODY_DETAILSAVE+"?binding="+this.state.bindings,newdata).then((json)=>{
            if(json.flag == "ERROR"){
              this.setState({
                    listmessage:json.message,
                    offinfo:false
                  })
            }else if(json.flag == "SUCCESS"){
              this.setState({
                    listmessage:'',
                    offinfo:true
                  })
              message.success(json.message,8);
              if(type="Edit"){
                this.handleClickDETAIL('DETAIL',this.state.currentRecordtype)
                this.handleClickeditclone('EDIT',this.state.currentRecordtype)
              }
            }
          });
        }
      }
  };

  // 编辑详细信息字段依赖
  handleOnblurfind = (controlFieldId, controlValueId) => {
    Request(DEPENDENCYFIELDINFOS + "?binding=" + this.props.binding, {
      "recordtype": this.state.currentRecordtype,
      "controlFieldId": controlFieldId,
      "controlValueId": controlValueId,
    }).then((json) => {
      var detailedInformation = this.state.detailedInformation
      detailedInformation.map((items, index1) => {
        items.data.map((item, index2) => {
          for (var i = 0; i < json.dependencyFields.length; i++) {
            if (json.dependencyFields[i].fieldId == item.left.fieldId) {
              detailedInformation[index1].data[index2].left.data = json.dependencyFields[i].dependencyValues
              detailedInformation[index1].data[index2].left.value = json.dependencyFields[i].value
            }
            if (json.dependencyFields[i].fieldId == item.right.fieldId) {
              detailedInformation[index1].data[index2].right.data = json.dependencyFields[i].dependencyValues
              detailedInformation[index1].data[index2].right.value = json.dependencyFields[i].value
            }
          }
        })
      })
      this.setState({
        detailedInformation: detailedInformation
      })
    });
  }

};
const Info = Form.create()(Infos);
export default Info;