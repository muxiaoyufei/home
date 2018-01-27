
import React, { Component } from 'react';
import { Row, Col, Table, Popover, Icon } from 'antd';

class Card extends Component {
  constructor(porps) {
    super(porps);
    this.state = {

    }
  }
  render() {
    const item = this.props.data
    const col = item.dataList.map((value, index) => {
      if (index < 6) {
        var keys = [];//定义一个数组用来接受key    
        var values = [];//定义一个数组用来接受value    
        for (var key in value) {
          keys.push(key);
          values.push(value[key]);//取得value      
        }
        const cols = item.fieldInfo.map((items, index) => {
          const content = (
            <div>
              {/*
                        <p><a href="#" onClick={this.props.onClicks.bind(this,item,item.objectApi,value.id)}>  编辑 </a></p>
                        <p><a href="#" onClick={this.props.onClickDel.bind(this,item,item.objectApi,value.id)}>  删除 </a></p>
                        */}
            </div>
          );
          if (items.fieldName == "operate") {
            var colnames;
            const colname = keys.map((value, index) => {
              if (items.fieldName == value) {
                if (values[index] === null) {
                  colnames = "无"
                } else {
                  colnames = values[index]
                }
                return (values[index])
              }
            })
            return (
              <div key={index}>
                <Col span={10} >{items.fieldLabel}</Col>
                <Col span={14} style={{ textAlign: 'right' }}><span dangerouslySetInnerHTML={colnames}></span></Col>
              </div>
            )
          } else
            if (items.fieldName == "subject") {
              var colnames;
              const colname = keys.map((value, index) => {
                if (items.fieldName == value) {
                  if (values[index] === null) {
                    colnames = "无"
                  } else {
                    colnames = values[index]
                  }
                }
              })
              return (
                <h3 key={index} style={{ color: '#108ee9' }}>{colnames}
                  <Popover placement="bottom" content={content} key={index} style={{}} >
                    <Icon type="down" style={{ fontSize: 16, color: '#0070d2', float: 'right', cursour: 'pointer' }} />
                  </Popover>
                </h3>)
            } else {
              var colnames;
              const colname = keys.map((value, index) => {
                if (items.fieldName == value) {
                  if (values[index] === null) {
                    colnames = "无"
                  } else {
                    colnames = values[index]
                  }
                  return (values[index])
                }
              })
              return (
                <div key={index}>
                  <Col span={10} >{items.fieldLabel}</Col>
                  <Col span={14} style={{ textAlign: 'right' }}>{colnames}</Col>
                </div>
              )
            }
        })
        return (
          <Col className="link_card" span={8} key={index}>
            <div className="link_cardchild" style={{ padding: '10px', borderRadius: '4PX', marginRight: '10px', marginTop: '10px' }}>
              {/* colstitle */}
              <Row>
                {cols}
              </Row>
            </div>
          </Col>
        )
      }
    })
    return (
      <div>
        {col}
      </div>
    )
  }
};

export default Card;