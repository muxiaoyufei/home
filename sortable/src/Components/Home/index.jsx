import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import fetchData from '../DragComponent/utils/fetch.js';
import renderComponent from '../DragComponent/utils/RenderComponent.js';
import './index.scss';
import {PAGELAYOUTLIST,PAGEDETAIL} from '../DragComponent/utils/Api.jsx'
import Task from '../DragComponent/Task/index.jsx';
import Immediate from '../DragComponent/Immediate/index.jsx';
import HotDeal from '../DragComponent/HotDeal/index.jsx';
import Performance from '../DragComponent/Performance/index.jsx';
import RecentRecord from '../DragComponent/RecentRecord/index.jsx';
import Assistant from '../DragComponent/Assistant/index.jsx';
import HighLight from '../DragComponent/HighLight/index.jsx';
import Header from '../DragComponent/Header/index.js';
import Chatter from '../DragComponent/Chatter/index.js';
import Active from '../DragComponent/Active/index.js';
import Info from '../DragComponent/Info/index.js';
import RelevantList from '../DragComponent/RelevantList/index.js'
import Tools from '../DragComponent/ViewTools/index.js'
import Stage from '../DragComponent/Stage/index.jsx'
import Custom from '../DragComponent/Stage/index.jsx'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        // binding:getCookie("binding"),
          binding:"E1183D212999D6E776D0AB12E7240C3D",
          strTextColor:"",
          strOperationColor:"",
          strLinkColor:"",
          strBtnTextColor:"",
          strBorderColor:"",
          strDetailColor:"",
          homeData:{},
          listId : "",
          box : [],
        }
    }
    render() {
      console.log("data>>>")
      const {homeData}=this.state;
      return (
        <div className="home">
        {/**<RelevantList binding={this.state.binding} id="0022017F1C49B95ZQJPz" />
        <Task binding={this.state.binding} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />
        <Performance binding={this.state.binding} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />**/}
        </div>
      )
    }
    getHomeData(url, opts, binding) {
      fetchData(url, opts, binding, function (res) {
        let data = eval(res)
        this.setState({
          homeData:data,
        })
        console.log("homeData>>",data)
        console.log("1234>>>",document.getElementsByClassName("home"))
        const box = document.getElementsByClassName("home")[0];
        box.innerHTML = data.layout;
        const td = box.getElementsByClassName('item');
        console.log("td>>>",td)
        const id="0022017F1C49B95ZQJPz";
        const objectApi="Lead";
        const viewId = "aec20178ADA0963W96Ui";
        for(let i=0; i<td.length; i++){
          console.log("tdname>>>",td[i].getAttribute('name'))
          switch(td[i].getAttribute('name')){
            case "task":
              let task=td[i].getAttribute('id')
              renderComponent(task,<Task binding={this.state.binding} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break;
            case "hotdeal":
              let hotdeal=td[i].getAttribute('id')
              renderComponent(hotdeal,<HotDeal binding={this.state.binding} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break;
            case "immediate":
              let immediate=td[i].getAttribute('id')
              renderComponent(immediate,<Immediate binding={this.state.binding} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break;  
            case "assistant":
              let assistant=td[i].getAttribute('id')
              renderComponent(assistant,<Assistant binding={this.state.binding} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break;  
            case "recentrecord":
              let recentRecord=td[i].getAttribute('id')
              renderComponent(recentRecord,<RecentRecord binding={this.state.binding} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break; 
            case "performance":
              let performance=td[i].getAttribute('id')
              renderComponent(performance,<Performance binding={this.state.binding} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break;  
            case "header":
              let header=td[i].getAttribute('id')
              renderComponent(header,<Header binding={this.state.binding} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break; 
            case "stage":
              let stage=td[i].getAttribute('id')
              renderComponent(stage,<Stage binding={this.state.binding} id={id} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break; 
            case "chatter":
              let chatter=td[i].getAttribute('id')
              renderComponent(chatter,<Chatter binding={this.state.binding} id={id} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break; 
            case "active":
              let active=td[i].getAttribute('id')
              renderComponent(active,<Active binding={this.state.binding} id={id} objectApi="Lead" text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break; 
            case "info":
              let info=td[i].getAttribute('id')
              renderComponent(info,<Info binding={this.state.binding} id={id} objectApi="Lead"  text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break; 
            case "viewtools":
              let viewtools=td[i].getAttribute('id')
              renderComponent(viewtools,<Tools binding={this.state.binding} viewId={viewId} objectApi={objectApi} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break; 
            case "highlight":
              let highlight=td[i].getAttribute('id')
              renderComponent(highlight,<HighLight binding={this.state.binding} id={id} objectApi={objectApi}  text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break; 
            case "relevantlist":
              let relevantlist=td[i].getAttribute('id')
              renderComponent(relevantlist,<RelevantList binding={this.state.binding} id={id} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break; 
            case "custom":
              let custom=td[i].getAttribute('id')
              renderComponent(custom,<Custom binding={this.state.binding} id={id} text={this.state.strTextColor} operation={this.state.strOperationColor} link={this.state.strLinkColor} btnText={this.state.strBtnTextColor} border={this.state.strBorderColor} detail={this.state.strDetailColor} />)
            break; 
          }
        }
        
      }.bind(this))
    }
    getUrl = (name) => {
      var reg = new RegExp(name + "=([^&]*)(&|$)");
      var r = window.location.hash.substr(2).match(reg);
      if (r != null)return unescape(r[1]);
      return null;
    }
  componentDidMount(){
     let {binding}=this.state;
    // // let Id=localget("previewId")
     let Id=this.getUrl("id")
     console.log("Id",Id)
    console.log("页面>>>",window.location.hash.substr(2))
    // let homeId="ZedPkZ6idJtGwpt3"
    // this.getData(PAGELAYOUTLIST,{"binding":binding},binding)
   this.getHomeData(PAGEDETAIL,{"id":Id,"parttern":"design"},binding);
  }
}
 
function getCookie(name) {
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
  else
      return null;
}

export default Home
