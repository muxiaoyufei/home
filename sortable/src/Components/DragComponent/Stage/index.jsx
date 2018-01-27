/**
|--------------------------------------------------
| @class 详情页潜在客户、业务机会阶段组件
|--------------------------------------------------
*/
import React, { Component } from 'react';
import { Row, Col, Steps, Tooltip, Icon } from 'antd';
import { Request } from '../utils/fetch.js';
import { STAGE } from '../utils/Api.jsx';
import './style.css'
const Step = Steps.Step;
var arr = [];
var i = 0;
class Stage extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      loading: false,
      visible: false,
      values: '',
      progress: []
    }
  };
  componentDidMount() {
    Request(STAGE + "?binding=" + this.props.binding, {
      id: this.props.id,
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          progress: [],
        })
      }else{
        this.setState({
          progress: json.data,
        })
      }
    });
  }

  handlelclick = (index, indexs, e) => {
    if (arr.length == 0) {
      e.target.className = "L_DeepBlue"
      if (document.getElementsByClassName('L_blue')[0] != undefined) {
        document.getElementsByClassName('L_blue')[0].className = 'L_fff'
      }
    } else {

      if (indexs == arr[i - 1]) {
        document.getElementsByClassName('L_DeepBlue')[0].className = 'L_fff'
        e.target.className = "L_DeepBlue"
      }
      if (indexs > arr[i - 1]) {
        document.getElementsByClassName('L_DeepBlue')[0].className = 'L_green'
        e.target.className = "L_DeepBlue"
      }
      if (indexs < arr[i - 1]) {
        document.getElementsByClassName('L_DeepBlue')[0].className = 'L_gray'
        e.target.className = "L_DeepBlue"
      }
    }
    i++
    arr.push(index + 1)
  }
  handleitemClick = () => {
    arr = [];
    i = 0;
  }
  render() {
    const num = this.state.progress.map((item, index) => {
      if (item.isChecked) {
        return index
      }
    })
    var indexs;
    for (var i = 0; i < num.length; i++) {
      if (num[i] != undefined) {
        indexs = num[i] + 1
      } else {
        // indexs=1
      }
    }
    const BodyProgres = this.state.progress.map((item, index) => {
      if (indexs == undefined) {
        const text = <span>{item.label}</span>;
        return (
          <Tooltip placement="bottom" title={text} key={index}>
            <li key={index}>{/*onClick={this.props.handleDivClick.bind(this,item)}*/}
              <a href="javascript:void(0)" onClick={this.handlelclick.bind(this, index, indexs)} className="L_gray">{item.label}</a>
            </li>
          </Tooltip>
        )
      } else {
        if (index + 1 < indexs) {
          const text = <span>{item.label}</span>;
          return (
            <Tooltip placement="bottom" title={text} key={index}>
              <li>{/* onClick={this.props.handleDivClick.bind(this,item)}*/}
                <a href="javascript:void(0)" onClick={this.handlelclick.bind(this, index, indexs)} className="L_green"><Icon type="check" style={{ fontSize: 18, color: '#fff' }} /></a>
              </li>
            </Tooltip>
          )
        } else if (index + 1 == indexs) {
          const text = <span>{item.label}</span>;
          return (
            <Tooltip placement="bottom" title={text} key={index}>
              <li key={index} >{/*onClick={this.props.handleDivClick.bind(this,item)}*/}
                <a href="javascript:void(0)" onClick={this.handlelclick.bind(this, index, indexs)} className="L_blue">{item.label}</a>
              </li>
            </Tooltip>
          )
        } else if (index + 1 > indexs) {
          const text = <span>{item.label}</span>;
          return (
            <Tooltip placement="bottom" title={text} key={index}>
              <li key={index}>{/* onClick={this.props.handleDivClick.bind(this,item)}*/}
                <a href="javascript:void(0)" onClick={this.handlelclick.bind(this, index, indexs)} className="L_gray">{item.label}</a>
              </li>
            </Tooltip>
          )
        }
      }
    })
    return (
      <div className="L_Progress">
        <div className="L_crumbs L_crumbs_Lead" id="crumbs">
          <ul>
            {BodyProgres}
          </ul>
        </div>
        <div className="L_proRight clearfloat" >{/* onClick={this.props.handleitemClick.bind(this)}*/}
          <a href="javascript:void(0)" className="L_state" onClick={this.handleitemClick.bind(this)} disabled={this.props.disableds}><span className="icon-globe"></span>&nbsp;将选中 状态标记为完成</a>
        </div>
      </div>
    )
  }
};

export default Stage;