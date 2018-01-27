import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Request } from '../../utils/Request';
import { SketchPicker } from 'react-color';
import { SAVETHEME } from '../../utils/Api';
import { Icon, Button, Row, Col, Input, Collapse,message } from 'antd';
import Custom from '../DragComponent/Custom';
const { TextArea } = Input;
const Panel = Collapse.Panel;

class ThemeLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : "",
      strTitle: "",
      strMemo: "",
      bolSetp: true,

      bolTextColor : false,
      bolDetailedColor : false,
      bolOperationColor : false,
      bolLinkColor : false,
      bolBtnTextColor : false,
      bolBorderColor : false,

      strTextColor : '#ff0000',
      strDetailedColor : '#ffff00',
      strOperationColor : '#ff6699',
      strLinkColor : '#462ff3',
      strBtnTextColor : '#cccccc',
      strBorderColor : '#d9d9d9',
    }
  }

  render() {
    return (
      <div>
        {
          this.state.bolSetp == true ?
            <div className="sel-layout" style={{height:260}}>
              <div className="title">
                <h3>自定义样式</h3>
                <Icon type="close" onClick={() => this.props.onColseTheme()} />
              </div>
              <div className="drag-input">
                <div className="title"><span>标题</span><Input type="text" onChange={this.onTitle} placeholder="请输入标题" value={this.state.strTitle} /></div>
                <div className="mome"><span>描述</span><TextArea placeholder="请输入描述内容" autosize={{ minRows: 2, maxRows: 2 }} onChange={this.onMome} value={this.state.strMemo} /></div>
              </div>
              <div className="footer">
                <Button type="primary" onClick={this.onNextStep}>下一步</Button>
                <Button onClick={() => this.props.onColseTheme()}>取消</Button>
              </div>
            </div>
            :
            <div className="container">
              <div className="title">
                <h3>自定义样式</h3>
                <Icon type="close" onClick={() => this.props.onColseTheme()} />
              </div>
              <div className="group">
                <div className="componentList box">
                  <Collapse defaultActiveKey={['1']}>
                    <Panel header="编辑颜色" key={1}>
                      <ul className="themenList">
                        <li>
                          文字颜色
                          <div className="swatch" onClick={ this.onTextColor }>
                            <div className="color" style={{background:this.state.strTextColor}}/>
                          </div>
                          { this.state.bolTextColor ? <div className="popover">
                            <div className="cover" onClick={ this.handleClose }/>
                              <SketchPicker color={ this.state.strTextColor } onChange={ this.handleTextColor } />
                            </div> : null }
                        </li>
                        <li>
                          明细文字颜色
                          <div className="swatch" onClick={ this.onDetailedColor }>
                            <div  className="color"  style={{background:this.state.strDetailedColor}}/>
                          </div>
                          { this.state.bolDetailedColor ? <div className="popover">
                            <div className="cover" onClick={ this.handleClose }/>
                              <SketchPicker color={ this.state.strDetailedColor } onChange={ this.handleDetailed } />
                            </div> : null }
                        </li>
                        <li>
                          操作区颜色
                          <div className="swatch" onClick={ this.onOperationColor }>
                            <div  className="color"  style={{background:this.state.strOperationColor}}/>
                          </div>
                          { this.state.bolOperationColor ? <div className="popover">
                            <div className="cover" onClick={ this.handleClose }/>
                              <SketchPicker color={ this.state.strOperationColor } onChange={ this.handleOperation } />
                            </div> : null }  
                        </li>
                        <li>
                          链接颜色
                          <div className="swatch" onClick={ this.onLinkColor }>
                            <div  className="color"  style={{background:this.state.strLinkColor}}/>
                          </div>
                          { this.state.bolLinkColor ? <div className="popover">
                            <div className="cover" onClick={ this.handleClose }/>
                              <SketchPicker color={ this.state.strLinkColor } onChange={ this.handleLink } />
                            </div> : null }    
                        </li>
                        <li>
                          按钮文字颜色
                          <div className="swatch" onClick={ this.onBtnTextColor }>
                            <div  className="color"  style={{background:this.state.strBtnTextColor}}/>
                          </div>
                          { this.state.bolBtnTextColor ? <div className="popover">
                            <div className="cover" onClick={ this.handleClose }/>
                              <SketchPicker color={ this.state.strBtnTextColor } onChange={ this.handleBtnText } />
                            </div> : null }    
                        </li>
                        <li>
                          边框颜色
                          <div className="swatch" onClick={ this.onBorderColor }>
                            <div  className="color"  style={{background:this.state.strBorderColor}}/>
                          </div>
                          { this.state.bolBorderColor ? <div className="popover">
                            <div className="cover" onClick={ this.handleClose }/>
                              <SketchPicker color={ this.state.strBorderColor } onChange={ this.handleBorder } />
                            </div> : null }   
                        </li>
                      </ul>
                    </Panel>
                  </Collapse>
                </div>
                <div className="containerDrag">
                  <table className="containerTable">
                    <tbody>
                      <tr>
                        <td className="box" colspan="4" rowspan="1" style={{position:"relative"}}>
                          <Custom />
                        </td>
                        <td className="box" colspan="1" rowspan="1" style={{display:"none"}}></td>
                        <td className="box" colspan="1" rowspan="1" style={{display:"none"}}></td>
                        <td className="box" colspan="1" rowspan="1" style={{display:"none"}}></td>
                      </tr>
                      <tr>
                        <td className="box" colspan="2" rowspan="1" style={{position:"relative"}}>
                          <Custom />
                        </td>
                        <td className="box" colspan="1" rowspan="1" style={{display:"none"}}></td> 
                        <td className="box" colspan="2" rowspan="1"></td>
                        <td className="box" colspan="1" rowspan="1" style={{display:"none"}}></td>
                      </tr>
                      <tr>
                        <td className="box"></td>
                        <td className="box"></td>
                        <td className="box"></td>
                        <td className="box"></td>
                      </tr>
                      <tr>
                        <td className="box"></td>
                        <td className="box"></td>
                        <td className="box"></td>
                        <td className="box"></td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="dataHTML" dangerouslySetInnerHTML={{ __html: this.state.strTbody }}></table>
                </div>
              </div>
              <div className="footer">
                <Button onClick={this.onUpStep}>上一步</Button>
                <Button type="primary" onClick={this.onSaveTheme}>保存</Button>
                <Button onClick={() => this.props.onColseTheme()}>取消</Button>
              </div>
            </div>
        }
      </div>
    );
  }

  // 关闭所有色板
  handleClose = () => {
    this.setState({ 
      bolTextColor : false,
      bolDetailedColor : false,
      bolOperationColor : false,
      bolLinkColor : false,
      bolBtnTextColor : false,
      bolBorderColor : false,
    })
  };

  /**
  |--------------------------------------------------
  | @method 文字色板显示，文字色值选择
  |--------------------------------------------------
  */
  onTextColor = () => {
    this.setState({ 
      bolTextColor: !this.state.displayColorPicker 
    })
  };
  handleTextColor = (color) => {
    this.setState({ 
      strTextColor: color.hex 
    })
  };

  /**
  |--------------------------------------------------
  | @method 明细文字色板显示，明细文字色值选择
  |--------------------------------------------------
  */
  onDetailedColor = ()=>{
    this.setState({ 
      bolDetailedColor: !this.state.bolDetailedColor 
    })
  }
  handleDetailed = (color) => {
    this.setState({ 
      strDetailedColor: color.hex 
    })
  };

  /**
  |--------------------------------------------------
  | @method 操作区色板显示，操作区色值选择
  |--------------------------------------------------
  */
  onOperationColor = ()=>{
    this.setState({ 
      bolOperationColor: !this.state.bolOperationColor 
    })
  }
  handleOperation = (color) => {
    this.setState({ 
      strOperationColor: color.hex 
    })
  };
  
  /**
  |--------------------------------------------------
  | @method 链接色板显示，链接色值选择
  |--------------------------------------------------
  */
  onLinkColor = ()=>{
    this.setState({ 
      bolLinkColor: !this.state.bolLinkColor 
    })
  }
  handleLink = (color) => {
    this.setState({ 
      strLinkColor: color.hex 
    })
  };
  
  /**
  |--------------------------------------------------
  | @method 按钮文字色板显示，按钮文字色值选择
  |--------------------------------------------------
  */
  onBtnTextColor = ()=>{
    this.setState({ 
      bolBtnTextColor: !this.state.bolBtnTextColor 
    })
  }
  handleBtnText = (color) => {
    this.setState({ 
      strBtnTextColor: color.hex 
    })
  };
   
  /**
  |--------------------------------------------------
  | @method 边框色板显示，边框色值选择
  |--------------------------------------------------
  */
  onBorderColor = ()=>{
    this.setState({ 
      bolBorderColor: !this.state.bolBorderColor 
    })
  }
  handleBorder = (color) => {
    this.setState({ 
      strBorderColor: color.hex 
    })
  };

  // 保存按钮点击事件
  onSaveTheme = () => {
    Request(SAVETHEME,this.props.binding,{
      "binding" : this.props.binding,
      "id" : this.state.id == "" ? Math.random().toString(36).substr(2) : this.state.id,
      "label" : this.state.strTitle,
      "memo" : this.state.strMemo,
      "style" : {
        "textColor" : this.state.strTextColor,
        "detailColor" : this.state.strDetailedColor,
        "operationColor" : this.state.strOperationColor,
        "linkColor" : this.state.strLinkColor,
        "btnTextColor" : this.state.strBtnTextColor,
        "borderColor" : this.state.strBorderColor,
      }
    }).then((data)=>{
      this.props.onColseTheme();
      this.props.onGetThemeList();
      if(data.flag == "SUCCESS"){
        message.success("保存样式成功！",2)
      }else{
        message.error("保存样式失败！",2)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.objEditTheme){
      this.setState({
        id : nextProps.objEditTheme.id,
        strTitle : nextProps.objEditTheme.label,
        strMemo : nextProps.objEditTheme.memo,
        strTextColor : nextProps.objEditTheme.style.textColor,
        strDetailedColor : nextProps.objEditTheme.style.detailColor,
        strOperationColor : nextProps.objEditTheme.style.operationColor,
        strLinkColor : nextProps.objEditTheme.style.linkColor,
        strBtnTextColor : nextProps.objEditTheme.style.btnTextColor,
        strBorderColor : nextProps.objEditTheme.style.borderColor,
      })
    }
  }

  // 新建布局与编辑布局 下一步
  onNextStep = () => {
    this.setState({
      bolSetp: false
    })
  }

  // 新建布局与编辑布局 上一步
  onUpStep = () => {
    this.setState({
      bolSetp: true
    })
  }

  // 新建布局与编辑布局 标题
  onTitle = (e) => {
    this.setState({
      strTitle: e.target.value
    })
  }

  // 新建布局与编辑布局 描述
  onMome = (e) => {
    this.setState({
      strMemo: e.target.value
    })
  }

  // 获取指定样式的颜色对象
  onGetColor = (e) => {
    
  }
}
  
/**
|--------------------------------------------------
| @class 热门交易组件
|--------------------------------------------------
*/
class HotDeal extends Component {
  render() {
    return (
      <div className="hotdeal" name="listGrid" style={{border:`1px solid ${this.props.border}`}}>
        <h3 style={{color:this.props.text}}>热门交易</h3>
        <ul className="list">
          <li>
            <div className="box">
              <div className="number" style={{color:this.props.text}}>1.</div>
              <div className="content">
                <ul>
                  <li><a href="javascript:void(0)" style={{color:this.props.link}}>联合炼油厂发电机组</a></li>
                  <li><a href="javascript:void(0)" style={{color:this.props.link}}>联合石油天然气公司 </a> <span style={{color:this.props.operation}}>2017-4-22 ￥915,000.00</span></li>
                </ul>
              </div>
            </div>
          </li>
          
          <li>
            <div className="box">
              <div className="number" style={{color:this.props.text}}>2.</div>
              <div className="content">
                <ul>
                  <li><a href="javascript:void(0)" style={{color:this.props.link}}>联合炼油厂发电机组</a></li>
                  <li><a href="javascript:void(0)" style={{color:this.props.link}}>联合石油天然气公司 </a> <span style={{color:this.props.operation}}>2017-4-22 ￥915,000.00</span></li>
                </ul>
              </div>
            </div>
          </li>

          <li>
            <div className="box">
              <div className="number" style={{color:this.props.text}}>3.</div>
              <div className="content">
                <ul>
                  <li><a href="javascript:void(0)" style={{color:this.props.link}}>联合炼油厂发电机组</a></li>
                  <li><a href="javascript:void(0)" style={{color:this.props.link}}>联合石油天然气公司 </a> <span style={{color:this.props.operation}}>2017-4-22 ￥915,000.00</span></li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

/**
|--------------------------------------------------
| @class 即将进行的事件
|--------------------------------------------------
*/
class Immediate extends Component {
  render() {
    return (
      <div className="immediate" name="immediate" style={{border:`1px solid ${this.props.border}`}}>
        <h3 style={{color:this.props.text}}>即将进行的事件</h3>
          <ul className="list">
            <li>
              <div className="box">
                <div className="number" style={{color:this.props.operation}}>PM3:00</div>
                <div className="content">
                  <ul>
                    <li><a href="javascript:void(0)" style={{color:this.props.link}}>即将进行</a></li>
                    <li><span style={{color:this.props.detail}}>2017-11-24 PM4:00</span></li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
            <div className="box">
              <div className="number" style={{color:this.props.operation}}>PM3:00</div>
              <div className="content">
                <ul>
                  <li><a href="javascript:void(0)" style={{color:this.props.link}}>即将进行</a></li>
                  <li><span style={{color:this.props.detail}}>2017-11-24 PM4:00</span></li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <div className="box">
              <div className="number" style={{color:this.props.operation}}>PM3:00</div>
              <div className="content">
                <ul>
                  <li><a href="javascript:void(0)" style={{color:this.props.link}}>即将进行</a></li>
                  <li><span style={{color:this.props.detail}}>2017-11-24 PM4:00</span></li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default ThemeLayout;
