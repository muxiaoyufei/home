/**
 * @class 切换视图
 * Created by fanpf on 2017/5/18.
 */
import React,{Component} from 'react';
import {Icon,Menu,Dropdown,Spin} from 'antd';

class Tools extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading : true,
    };
  }

  render(){
    console.log(this.props.viewList)
    var result = this.props.viewList.map((value,index)=>{
      if(value.id === this.props.viewId){
        return (
          <Menu.Item key={value.id} id={value.id}>
            <a href="javascript:void(0)" >{value.name}</a>
          </Menu.Item>
        )
      }else{
        return (
          <Menu.Item key={value.id} id={value.id}>
            <a href="javascript:void(0)">{value.name}</a>
          </Menu.Item>
        )
      }
    })
    const menu = (
      <Menu className="view-dropdown">
        {result}
      </Menu>
    );

    // 图标
    var classnames2;
    const itembg=this.props.menuItem.map((value,index)=>{
        if(value.objectApi == this.props.objectApi){
             return value.tabStyle
           }
    })
    var classs;
    for(var i=0;i<itembg.length;i++){
      if(itembg[i] != undefined){
        classs = itembg[i]
      }
    }
    return(
      <div>
        <div className="grap">
          <span className={'crititleimg_small' + " " + classs}></span>
        </div>
        <div className="view-body">
          <span className="sub-title">
            {
              this.props.menuItem.map((value,index)=>{
                if(value.objectApi == this.props.objectApi){
                  return value.name
                }
              })
            }
          </span>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="viewToggle" href="#">
            {
              this.props.viewList.map((value,index)=>{
                if(value.id == this.props.viewId){
                  return value.name
                }
              })
            }
            <Icon type="caret-down"/></a>
          </Dropdown>
        </div>
      </div>
    )
  }
};

export default Tools;