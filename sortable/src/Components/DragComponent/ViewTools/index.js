/**
 * @class 视图切换，视图操作，视图搜索，标准工具
 * Created by fanpf on 2017/5/18.
 */
import React,{Component} from 'react';
import {Row, Col} from 'antd'
import ViewSelect from './ViewSelect.js';
import ViewButton from './ViewButton.js';
import { VIEWBTN,VIEWLIST } from '../utils/Api.jsx';
import {Request} from '../utils/fetch.js'

class Tools extends Component{
  constructor(props) {
    super(props);
    this.state = {
      disableds:true,
      arrViewList : [],
      arrViewBtn : [],
      arrMenu : []
    }
  }
  onClickview=( {key} )=>{
    console.log(key)
  }
  
  render() {
    const {binding,objectApi,viewId,listId} = this.props;
    return (
      <div className="tools" style={{position:'relative',zIndex:'0'}}>
        <Row>
          <Col span={12}>
            {/*切换查看视图*/}
            <ViewSelect
              viewList={this.state.arrViewList}
              menuItem={this.state.arrMenu}
              objectApi={objectApi}
              viewId={viewId}
              onClickview={this.onClickview}
            />
          </Col>
          <Col span={12}>
            {/*视图操作按钮*/}
            <ViewButton
              viewBtn={this.state.arrViewBtn}

              binding={binding}
              objectApi={objectApi}
              viewId={viewId}
            />
          </Col>
        </Row>
      </div>
    )
  }

  componentDidMount() {
    const { binding,objectApi,viewId } = this.props;
    //视图操作按钮
    Request(VIEWBTN+"?binding="+binding,{
      "binding": binding,
      "objectApi" : objectApi,
      "viewId" : viewId
    }).then((data)=>{
      if(data.flag=="ERROR"){
        this.setState({
          arrViewBtn : [],
        })
      }else{
        const btn = data.buttonList.map((value,index)=>{
          return {
            id : value.id,
            label : value.label,
            url : value.url,
            name : value.name
          }
        })
        this.setState({
          arrViewBtn : btn
        })
      }   
    });
    //视图列表
    Request(VIEWLIST+"?binding="+binding,{
      "binding": binding,
      "objectApi": objectApi,
    }).then((data)=>{
      if(data.flag=="ERROR"){
        this.setState({
          arrViewList : []
        })
      }else{
        const list = data.viewList.map((value,index)=>{
          return {
            id : value.id,
            name : value.label,
          }
        })
        this.setState({
          arrViewList : list
        })
      }
    });
  }
};

export default Tools;