import React, { Component } from 'react';
import Performance from './Performance';
import {Icon,Row,Col} from 'antd';
import Immediate from './Immediate';
import TabDrag from  './Tab'
import { Tabs} from 'antd'
import HighLight from './HighLight';
import Stage from './Stage';
import Chatter from './Chatter';
import Actives from './Active';
import RelevantList from './RelevantList';
import Info from './Info';
import ViewTools from './ViewTools';
import Custom from './Custom';
import $ from 'jquery';

const TabPane = Tabs.TabPane;

// 遍历组件列表图标
const arrIcon = require.context("../../imgs", true, /^\.\/.*\.png$/);
const itemIcon = arrIcon.keys().map(arrIcon);

// const binding="D1FDF8EE5398D3BDCB85EA881A358AEB";
const binding=getCookie("binding")
const id="0022017F1C49B95ZQJPz";
const objectApi="Lead";
const viewId = "aec20178ADA0963W96Ui";

function onDeleteComp(){
  $(".anticon-close").on('click',function(){
    $(this).parent().parent().remove()
  })
}

const CompWrap = {
  "immediate" : ()=>
      <div name="immediate" key={0}>
        <img src={itemIcon[0]} alt="" className="img"/>
        <span className="tit">即将进行的事件</span>
        
        <Icon onClick={onDeleteComp} type="close"/>
      </div>,
  "hotdeal" : ()=>
      <div name="hotdeal" key={1}>
        <img src={itemIcon[1]} alt="" className="img" />
        <span className="tit">热门交易</span>
        <div className="hotdeal" >
          <h3>热门交易</h3>
          <ul>
            <li>
              <span>1.</span>
              <a href="#">我的最新交易记录</a>
            </li>
          </ul>
        </div>
        <Icon onClick={onDeleteComp} type="close"/>
      </div>,
  "task" : ()=>
      <div name="task" key={2}>
        <img src={itemIcon[2]} alt=""  className="img"/>
        <span className="tit">我的任务</span>
          <div className="task">
            <TabDrag />
          </div>
        <Icon onClick={onDeleteComp} type="close"/>
      </div>,
  "recentrecord" : ()=>
      <div name="recentrecord" key={3}>
        <img src={itemIcon[3]} alt=""  className="img"/>
        <span className="tit">最近记录</span>
        <div className="recentRecord">
          <h3>最近记录</h3>
          <ul>
            <li><a href="javascript:void(0)" >发邮件</a></li>
            <li><a href="javascript:void(0)" >打电话</a></li>
            <li><a href="javascript:void(0)" >发信息</a></li>
            <a className="all"> 查看全部</a>
          </ul>
        </div>
        <Icon onClick={onDeleteComp} type="close"/>
      </div>,
  "performance" : ()=>
      <div name="performance" key={4}>
        <img src={itemIcon[4]} alt="" className="img" />
        <span className="tit">图表组件</span>
        <Performance />
        <Icon onClick={onDeleteComp} type="close"/>
      </div>,
  "assistant" : ()=>
      <div name="assistant" key={5}>
        <img src={itemIcon[5]} alt="" className="img" />
        <span className="tit">助理</span>
        <div className="assistant">
          <h3>助理</h3>
          <dl>
            <dt><Icon type="heart" /></dt>
            <Col span={6} >
              <Col span={16}>30天内没有任何活动</Col>
              <Col span={16}><a>test业务机会</a></Col>
            </Col>
            <dd className="createIcon" >
              <em className="leftIcon" ><Icon type="bars" /></em>
              <em ><Icon type="calendar" /></em>
            </dd>
          </dl>
          <dl>
            <dt><Icon type="heart" /></dt>
            <Col span={6} >
              <Col span={16}>30天内没有任何活动</Col>
              <Col span={16}><a>共享测试</a></Col>
            </Col>
            <dd className="createIcon" >
              <em className="leftIcon" ><Icon type="bars" /></em>
              <em ><Icon type="calendar" /></em>
            </dd>
          </dl>
          <dl>
            <dt><Icon type="heart" /></dt>
            <Col span={6} >
              <Col span={16}>30天内没有任何活动</Col>
              <Col span={16}><a>潜在客户</a></Col>
            </Col>
            <dd className="createIcon" >
              <em className="leftIcon" ><Icon type="bars" /></em>
              <em ><Icon type="calendar" /></em>
            </dd>
          </dl>
        </div>
        <Icon onClick={onDeleteComp} type="close"/>
      </div>,
  "highlight" : ()=>
      <div name="highlight" key={6}>
        <img src={itemIcon[6]} alt=""  className="img"/>
        <span className="tit">高亮区</span>
        <HighLight 
          binding={binding}
          id={id}
        />
        <Icon onClick={onDeleteComp} type="close"/>
      </div>,
  "stage" : ()=>
      <div name="stage" key={7}>
        <img src={itemIcon[7]} alt="" className="img" />
        <span className="tit">阶段进度</span>
        <Stage 
          binding={binding}
          id={id}
        />
        <Icon onClick={onDeleteComp} type="close"/>
      </div>,
  "chatter" : ()=>
      <div name="chatter" key={8}>
        <img src={itemIcon[8]} alt="" className="img" />
        <span className="tit">微贴</span>
        <Chatter 
          binding={binding}
          id={id}
        />
        <Icon onClick={onDeleteComp} type="close"/>
      </div>,
  "active" : ()=>
      <div name="active" key={9}>
        <img src={itemIcon[9]} alt="" className="img" />
        <span className="tit">活动</span>
        <Actives 
          binding={binding}
          objectApi={objectApi}
          id={id}
          />
          <Icon onClick={onDeleteComp} type="close"/>
      </div>,
  "relevantlist" : ()=>
      <div name="relevantlist" key={10}>
        <img src={itemIcon[10]} alt="" className="img" />
        <span className="tit">相关列表</span>
        <RelevantList 
          binding={binding}
          id={id}
        />
        <Icon onClick={onDeleteComp} type="close"/>
      </div>,
  "info" : ()=>
      <div name="info" key={11}>
        <img src={itemIcon[11]} alt="" className="img" />
        <span className="tit">详细信息</span>
        <Info 
          binding={binding}
          objectApi={objectApi}
          id={id}
        />
        <Icon onClick={onDeleteComp} type="close"/>
      </div>,
  "viewtools" : ()=>
      <div name="viewtools" key={12}>
        <img src={itemIcon[12]} alt=""  className="img"/>
        <span className="tit">视图列表</span>
        <ViewTools 
          binding={binding}
          objectApi={objectApi}
          viewId={viewId}
        />
        <Icon onClick={onDeleteComp} type="close"/>
      </div>,
  "custom":()=>
      <div name="custom" key={13}>
        <img src={itemIcon[13]} alt=""  className="img"/>
        <span className="tit">自定义页面</span>
        <div className="wrap">
          <Custom />
        </div>
      </div>
}

function getCookie(cookie_name) {
  var allcookies = document.cookie;
  var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度
  // 如果找到了索引，就代表cookie存在，
  // 反之，就说明不存在。
  if (cookie_pos != -1) {
    // 把cookie_pos放在值的开始，只要给值加1即可。
    cookie_pos += cookie_name.length + 1;
    var cookie_end = allcookies.indexOf(";", cookie_pos);
    if (cookie_end == -1) {
      cookie_end = allcookies.length;
    }
    //这里就可以得到你想要的cookie的值了。。。
    var value = unescape(allcookies.substring(cookie_pos, cookie_end));
  }
  return value;
}

export default CompWrap;