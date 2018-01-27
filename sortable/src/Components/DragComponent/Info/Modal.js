import React, { Component } from 'react';
import { Icon, Tooltip, Button, Row, Col, Input, Select, InputNumber, Checkbox, Modal, DatePicker, Cascader, Form, Rate, Menu, Dropdown, Table } from 'antd';
import moment from 'moment';
import { Request } from '../utils/fetch.js';
import { LOOKUP } from '../utils/Api.jsx';
import SimEditor from './SimEditor.js';
const Option = Select.Option;
const InputGroup = Input.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const { MonthPicker, RangePicker } = DatePicker;
class Modalss extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      loading: false,
      visible: false,
      value: '',
      inval: '',
      visiblecz: false,//查找
      InputType: "radio",//查找
      tablePage: '',
      fieldname: '',
      fieldId: '',
      selectedRowKeys: [],
    }
  };
  handleOks = (e) => {
    e.preventDefault();
    const data = this.props.form.getFieldsValue();
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false })
    }, 1000);
  };
  onFocuss = () => {
  }
  handleChange = (value) => {
    this.setState({
      value: { value }.value,
    })
  }

  componentDidMount() {
  }
  handleokxj = (value, info, arr, required, textareaVal, e) => {
    this.props.handleokxj(value, info, arr, required, textareaVal, e)
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
      const head = json.header.map((value, index) => {
        return {
          "title": value.label,
          "dataIndex": value.fieldName,
          "key": value.fieldName
        }
      })
      this.setState({
        tableData: json.data,
        tableColumns: head,
        tablePage: json.totalCount,
      })
    });
  }
  // 点击ok确认
  handleOkcz = () => {
    this.setState({
      selectedRowKeys: [],
      visiblecz: false
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
    // czvalue为传递给input框的值，点击清空是清0
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
      const head = json.header.map((value, index) => {
        return {
          "title": value.label,
          "dataIndex": value.fieldName,
          "key": value.fieldName
        }
      })
      this.setState({
        tableData: json.data,
        tableColumns: head,
        tablePage: json.totalCount,
      })
    });
  }
  // 搜索input输入的内容
  handleInput = (e) => {
    this.setState({
      inputval: e.target.value
    })
  }
  render() {
    var arr = [];
    var textareaVal = [];
    var required = [];
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
        document.getElementById(fieldId).value = rowselect
        document.getElementById(fieldname).value = rowselectid
        this.setState({
          czvalue: rowselect,
          holder: rowselect,//更改所有人
          rowselectid: rowselectid,//更改所有人id
        })
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { getFieldProps } = this.props.form;
    const { visible, loading, type } = this.props;
    var detailedInformation;
    var owners;
    if (type == "Edit") {
      detailedInformation = this.props.detailedInformation.map((items, index) => {
        const basic_info = items.data.map((item, index) => {
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
              select = this.props.handleOnblurfind.bind(this, item.left.fieldId)
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
              select = this.props.handleOnblurfind.bind(this, item.right.fieldId)
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
            <a href="#" className="title"><i className="icon-sort-down"></i>{items.title}</a>
            {basic_info}
          </div>
        )
      })
    }
    if (type == "Editinfo") {
      detailedInformation = this.props.detailedInformation.map((items, index) => {
        const basic_info = items.data.map((item, index) => {

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
              <Input defaultValue={item.left.value} key={item.left.name} id={infoid + "info"} />
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
              <Input defaultValue={item.right.value} key={item.right.name} id={infoid + "info"} />
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
              select = this.props.handleOnblurfind.bind(this, item.left.fieldId)
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
              select = this.props.handleOnblurfind.bind(this, item.right.fieldId)
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
              <Input defaultValue={itemsval} id={items + "info"} />
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
              <br /><Input defaultValue={itemsval} id={items + "info"} />
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
            lcont = <TextArea defaultValue={item.left.value} ref="inputs" key={item.left.name} id={item.left.name + "info"} />
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
            rcont = <TextArea defaultValue={item.right.value} ref="inputs" key={item.right.name} id={item.right.name + "info"} />
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
            lcont = <SimEditor textareaID={item.left.name + "info"} value={item.left.value} />
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
            lcont = <SimEditor textareaID={item.right.name + "info"} value={item.right.value} />
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
              <Input defaultValue={defaultValuename} id={item.left.fieldId + "info"} />
              <Input type={item.left.name} defaultValue={defaultValueid} id={item.left.name + "info"} style={{ display: 'none' }} />
              <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, ltype, item.left.lookupObj, item.left.fieldId + 'info', item.left.name + 'info')}>[查找]</a>
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
              <Input defaultValue={defaultValuename} id={item.right.fieldId + "info"} key={item.right.name} />
              <Input type={item.right.name} defaultValue={defaultValueid} id={item.right.name + "info"} style={{ display: 'none' }} />
              <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, rtype, item.right.lookupObj, item.right.fieldId + 'info', item.right.name + 'info')} >[查找]</a>
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
              <Input defaultValue={defaultValuename} id={item.left.fieldId + "info"} key={item.left.name} />
              <Input type={item.left.name} defaultValue={defaultValueid} id={item.left.name + "info"} style={{ display: 'none' }} />
              <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, ltype, item.left.lookupObj, item.left.fieldId + 'info', item.left.name + 'info')} >[查找多选]</a>
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
              <Input defaultValue={defaultValuename} id={item.right.fieldId + "info"} key={item.right.name} />
              <Input type={item.right.name} defaultValue={defaultValueid} id={item.right.name + "info"} style={{ display: 'none' }} />
              <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, rtype, item.right.lookupObj, item.right.fieldId + 'info', item.right.name + 'info')} >[查找多选]</a>
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
              <Input style={{ width: "45%", float: "left", marginRight: '5%' }} defaultValue={data[0].value} ref="inputs" id={data[0].name + "info"} />
              <Input style={{ width: "45%", float: "left" }} defaultValue={data[1].value} ref="inputs" id={data[1].name + "info"} />
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
              <Input style={{ width: "45%", float: "left", marginRight: '5%' }} defaultValue={data[0].value} ref="inputs" id={data[0].name + "info"} />
              <Input style={{ width: "45%", float: "left" }} defaultValue={data[1].value} ref="inputs" id={data[1].name + "info"} />
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
              lconts = <span>{leftval}</span>
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
            <a href="#" className="title"><i className="icon-sort-down"></i>{items.title}</a>
            {basic_info}
          </div>
        )
      })
    }
    if (type == "Clone") {
      detailedInformation = this.props.detailedInformation.map((items, index) => {
        const basic_info = items.data.map((item, index) => {
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
              infoid = 'zmidclone'
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
              infoid = 'zmidclone'
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
              select = this.props.handleOnblurfind.bind(this, item.left.fieldId)
            } else {
              select = this.handleonselect
            }
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
              select = this.props.handleOnblurfind.bind(this, item.right.fieldId)
            } else {
              select = this.handleonselect
            }
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
            lcont = <Rate count='10' style={{ fontSize: 12 }} defaultValue={Number(item.left.value)} {...getFieldProps(item.left.name) } />
          }
          if (rtype == 'SCORE') {
            var obj = new Object()
            if (item.right.required == true) {
              obj.name = item.right.name
              obj.label = item.right.label
              required.push(obj)
            }
            // textareaVal.push(item.right.name)
            rcont = <Rate count='10' style={{ fontSize: 12 }} defaultValue={Number(item.right.value)} {...getFieldProps(item.right.name) } />
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
              <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, ltype, item.left.lookupObj, item.left.fieldId)} >[查找多选]</a>
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
            lconts = <Rate count='10' style={{ fontSize: 12 }} disabled defaultValue={item.left.value} />
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
            rconts = <Rate count='10' style={{ fontSize: 12 }} disabled defaultValue={item.right.value} />
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
            <a href="#" className="title"><i className="icon-sort-down"></i>{items.title}</a>
            {basic_info}
          </div>
        )
      })
    }
    if (type == "xjdx") {
      detailedInformation = this.props.detailedInformation.map((items, index) => {
        const basic_info = items.data.map((item, index) => {
          const ltype = item.left.type
          const rtype = item.right.type
          const itle = item.left.edit
          const itre = item.right.edit
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
              infoid = 'zmidn'
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
              infoid = 'zmidn'
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
              select = this.props.handleOnblurfind.bind(this, item.left.fieldId)
            } else {
              select = this.handleonselect
            }
            var itemsl;
            itemsl = item.left.value
            var data = item.left.data.map((items, index) => {
              return (
                <Option value={items.id} key={index} >{items.value}</Option>
              )
            })
            lcont = <InputGroup compact className="sel">
              <Select style={{ width: '100%' }} placeholder={itemsl} onSelect={select} {...getFieldProps(item.left.name) }>
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
              select = this.props.handleOnblurfind.bind(this, item.right.fieldId)
            } else {
              select = this.handleonselect
            }
            var itemsr;
            itemsr = item.right.value
            var data = item.right.data.map((items, index) => {
              return (
                <Option value={items.id} key={index} >{items.value}</Option>
              )
            })
            rcont = <InputGroup compact className="sel">
              <Select style={{ width: '100%' }} placeholder={itemsr} onSelect={select} {...getFieldProps(item.right.name) }>
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
            lcont = <Rate count='10' style={{ fontSize: 12 }} defaultValue={Number(item.left.value)} {...getFieldProps(item.left.name) } />
          }
          if (rtype == 'SCORE') {
            var obj = new Object()
            if (item.right.required == true) {
              obj.name = item.right.name
              obj.label = item.right.label
              required.push(obj)
            }
            // textareaVal.push(item.right.name)
            rcont = <Rate count='10' style={{ fontSize: 12 }} defaultValue={Number(item.right.value)} {...getFieldProps(item.right.name) } />
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
            textareaVal.push(item.left.name)
            lcont = <TextArea defaultValue={item.left.value} ref="inputs" key={item.left.name} id={item.left.name} />
          }
          if (rtype == 'X') {
            var obj = new Object()
            if (item.right.required == true) {
              obj.name = item.right.name
              obj.label = item.right.label
              required.push(obj)
            }
            textareaVal.push(item.right.name)
            rcont = <TextArea defaultValue={item.right.value} ref="inputs" key={item.right.name} id={item.right.name} />
          }
          if (ltype == 'A') {
            var obj = new Object()
            if (item.left.required == true) {
              obj.name = item.left.name
              obj.label = item.left.label
              required.push(obj)
            }
            textareaVal.push(item.left.name)
            lcont = <SimEditor textareaID={item.left.name} value={item.left.value} />
          }
          if (rtype == 'A') {
            var obj = new Object()
            if (item.right.required == true) {
              obj.name = item.right.name
              obj.label = item.right.label
              required.push(obj)
            }
            textareaVal.push(item.right.name)
          }
          if (ltype == 'Y' || ltype == 'M' || ltype == 'R') {
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

            lcont = <div style={{ position: 'relative' }}>
              <Input defaultValue={item.left.value} id={item.left.fieldId} />
              <Input type={item.left.name} id={item.left.name} style={{ display: 'none' }} />
              <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, ltype, item.left.lookupObj, item.left.fieldId, item.left.name)}>[查找]</a>
            </div>
          }
          if (rtype == 'Y' || rtype == 'M' || rtype == 'R') {
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
            rcont = <div style={{ position: 'relative' }}>
              <Input defaultValue={item.right.value} id={item.right.fieldId} key={item.right.name} />
              <Input type={item.right.name} id={item.right.name} style={{ display: 'none' }} />
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
            lcont = <div style={{ position: 'relative' }}>
              <Input id={item.left.fieldId} key={item.left.name} />
              <Input type={item.left.name} id={item.left.name} style={{ display: 'none' }} />
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
            rcont = <div style={{ position: 'relative' }}>
              <Input id={item.right.fieldId} key={item.right.name} />
              <Input type={item.right.name} id={item.right.name} style={{ display: 'none' }} />
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
            textareaVal.push(data[0].name)
            textareaVal.push(data[1].name)
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
            textareaVal.push(data[0].name)
            textareaVal.push(data[1].name)
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
            lconts = <Rate count='10' style={{ fontSize: 12 }} disabled defaultValue={item.left.value} />
          } else if (ltype == 'Y' || ltype == 'M' || ltype == 'R') {
            if (item.left.name == "ownerid") {
              lconts = <span>{item.left.value} </span>
            } else if (item.left.name == "recordtype") {
              var leftval;
              for (var i = 0; i < item.left.data.length; i++) {
                if (item.left.value == item.left.data[i].id) {
                  leftval = item.left.data[i].value
                }
              }
              lconts = <span>{leftval}  </span>
            } else {
              lconts = <span>{item.left.value} </span>
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
            rconts = <Rate count='10' style={{ fontSize: 12 }} disabled defaultValue={item.right.value} />
          } else if (rtype == 'Y' || rtype == 'M' || rtype == 'R') {
            if (item.right.name == "ownerid") {
              rconts = <span>{item.right.value} </span>
            } else if (item.right.name == "recordtype") {
              var rightval;
              for (var i = 0; i < item.right.data.length; i++) {
                if (item.right.value == item.right.data[i].id) {
                  rightval = item.right.data[i].value
                }
              }
              rconts = <span>{rightval} </span>
            } else {
              rconts = <span>{item.right.value} </span>
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
                <FormItem>
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
            <a href="#" className="title"><i className="icon-sort-down"></i>{items.title}</a>
            {basic_info}
          </div>
        )
      })
    }

    var onSubmit;
    if (type == "Clone" || type == "Edit" || type == "Editinfo") {
      onSubmit = this.props.handleOkcl.bind(this, this.props.form.getFieldsValue(), this.props.detailedInformation, arr, required, textareaVal, type)
      // }else if(type=="Edit"){
      //   onSubmit=this.props.handleOkbj.bind(this,this.props.form.getFieldsValue(),this.props.detailedInformation,arr,required,textareaVal)
    } else if (type == "xjdx") {
      onSubmit = this.handleokxj.bind(this, this.props.form.getFieldsValue(), this.props.detailedInformation, arr, required, textareaVal)
    }

    var display;
    if (this.props.listmessage != "") {
      display = 'block'
    } else {
      display = 'none'
    }
    return (
      <div>
        <Modal className="Lant-modal Lant-modals" visible={this.props.visible} onCancel={this.props.handlecancel} width="80%">
          <div style={{ display: display, position: 'absolute', left: '25%', width: '50%', top: '10px', background: 'red', color: '#fff', fontSize: '16px', padding: '6px', borderRadius: '5px', zIndex: '1' }}>
            <Icon type="exclamation-circle" style={{ fontSize: 16, color: '#fff' }} />  {this.props.listmessage}
          </div>
          <Form onSubmit={onSubmit}>
            <div className="base_btn">
              <Button key="back" size="large" onClick={this.props.handlecancel}>取消</Button>,
                <Button key="submit" type="primary" htmlType="submit" size="large" loading={loading} onClick={this.props.handleOk} >
                确认
                </Button>
            </div>
            {detailedInformation}
          </Form>
        </Modal>
        {/*查找类型模态框  */}
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
          <Table rowSelection={rowSelection} columns={this.state.tableColumns} dataSource={this.state.tableData} pagination={{ pageSize: 25, total: this.state.tablePage }} scroll={{ y: 350 }} />
        </Modal>
      </div>
    )
  }
};
const Modals = Form.create()(Modalss);
export default Modals;