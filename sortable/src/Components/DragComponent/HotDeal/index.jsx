import React,{Component} from 'react';
import './style.scss';
import {Spin} from 'antd'
import { HOTDEALLIST } from '../utils/Api.jsx';
import fetchData from '../utils/fetch.js';

class HotDeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealData:[],
      language:{},
      loading:false,
    }
  }
  componentWillMount() {
    this.setState({
      loading:true,
    })
    fetchData(HOTDEALLIST, {},this.props.binding, function (res) {
      let data = eval(res)
      if(data.flag=="SUCCESS"){
        this.setState({
          dealData: data.data,
          language:data.language,
          loading:false
        });
      }
    }.bind(this))
  }
  render() {
    const {dealData,language}=this.state;
    return (
      <div className="hotdeal" name="hotdeal">
        <Spin spinning={this.state.loading} size="small">
          <h3 style={{color:this.props.text}}>热门交易</h3>
          <ul>
            {
              dealData ? dealData.map((res,i)=>{
                if(i<5){
                  return(
                    <li key={i}>
                      <span style={{color:this.props.text}}>{i+1}.</span>
                      <a
                        // href={"/query.action?id="+`${res.id}`+"&m=query"}
                        style={{color:this.props.link}}
                      >
                        {res.name}
                      </a>
                    </li>
                  )
                }
              }):<div className="noneEvent" style={{color:this.props.text}}>
                {language.label_component_hotdeal ? language.label_component_hotdeal : ""}
              </div>
            }
          </ul>
        </Spin>
      </div>
    )
  }
}

export default HotDeal
