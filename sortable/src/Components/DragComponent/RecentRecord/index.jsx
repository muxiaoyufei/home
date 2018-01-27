import React,{Component} from 'react';
import {Icon,Modal,Table,Spin} from 'antd';
import './style.scss';
import {RECENTRECORDLIST} from '../utils/Api.jsx'
import fetchData from '../utils/fetch.js';

class RecentRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordData:[],
      recordVisible:false,
      loading:false,
    }
    this.columns = [
      {
        title: '名称',
        dataIndex: 'recordName',
        key: 'recordName',
        render: (text,record) => {
          return(
            <a href={"query.action?&m=query&ismainpage=main&id="+`${record.id}`+"&rtnURL=home_mainPage.action"} 
              key={record.id}
              style={{color:this.props.link}}
            >
              {text}
            </a>
          )
        }
      },{
        title: '类别',
        dataIndex: 'label',
        key: 'label',
      }
    ];
  }  
  componentWillMount() {
    this.setState({
      loading:true
    })
    fetchData(RECENTRECORDLIST, {},this.props.binding, function (res) {
      let data = eval(res)
      if(data.flag=="SUCCESS"){
        this.setState({
          recordData: data.data,
          loading:false,
        })
      }
    }.bind(this))
  }
  showTaskModal(){
    this.setState({
      recordVisible: true,
    })
  }
  handleAlertModalOk() {
    this.handleCreateModalCancel();
  }
  handleCreateModalCancel(){
    this.setState({
      recordVisible: false,
    })
  }
  render() {
    const {recordData}=this.state;
    let list=[];
    for(let i=0;i<recordData.length;i++){
      if(i<5){
        list.push( recordData[i])
      }
    }
    return (
      <div className="recentRecord" name="recentRecord">
        <Spin spinning={this.state.loading} size="small">
          <h3 style={{color:this.props.text}}>最近记录</h3>
          <ul className="record">
            { list.map((res,i)=>{
                return (
                  <li key={i}>
                    <Icon type="book" />
                    <a 
                      href={"query.action?&m=query&ismainpage=main&id="+`${res.id}`+"&rtnURL=home_mainPage.action"}
                      style={{color:this.props.link}}
                    >
                      {res.recordName}
                    </a>
                  </li>
                )
              })
            }
            <a 
              className="all" 
              onClick={this.showTaskModal.bind(this)}
              style={{color:this.props.link}}
            >
              查看全部
            </a>
          </ul>
          <Modal
            wrapClassName="recentRecordModal"
            title={
              <div>
                <h3 style={{color:this.props.text}}>最近记录</h3>
                <span style={{color:this.props.text}}>20个项目</span>
              </div>
            }
            visible={this.state.recordVisible}
            onOk={this.handleAlertModalOk.bind(this)}
            onCancel={this.handleCreateModalCancel.bind(this)}
            width = { 700 }
          >
            <Table 
              rowKey={record => record.id} 
              columns={this.columns} 
              dataSource={recordData} 
              style={{color:this.props.text,borderColor:this.props.border}}
            />
          </Modal>
        </Spin>
      </div>
    )
  }
}

export default RecentRecord
