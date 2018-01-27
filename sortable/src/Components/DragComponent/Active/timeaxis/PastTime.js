/**
 * Created by fanpf on 2017/5/24.
 */
import React, { Component } from 'react';
import { Timeline, Icon, Menu, Dropdown, Button, Checkbox } from 'antd';
import timeaxis from './timeaxis.css';


class PastTime extends Component {
    constructor(porps) {
        super(porps);
        this.state = {
            
        }
    }

    render() {
        var dots = this.props.past.map((item, index) => {
            const menu = (
                <Menu>
                    <Menu.Item>
                        <a rel="noopener noreferrer" onClick={this.props.handledelClick.bind(this, item)}>删除</a>
                    </Menu.Item>
                </Menu>
            );
            if (item.type == 'event') {
                var dot = <Icon type="calendar" className="L_timeAxis_Icon" style={{ backgroundColor: '#eb7092' }} />
                return (
                    <Timeline.Item dot={dot} key={index}>
                        <div className="L_timeZ">
                            <div>{item.subject}
                                <p>开始 ： {item.startTime}</p>
                                <p>结束 ： {item.endTime}</p>
                            </div>
                            <div className="L_time" style={{ display: 'none' }}>
                                {/*<p>明天</p>*/}
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <p className="ant-dropdown-link L_time_rigthBtn"><Icon type="caret-down" style={{ fontSize: 12 }} /></p>
                                </Dropdown>
                            </div>
                        </div>
                    </Timeline.Item>
                )
            }
            if (item.type == 'task') {
                var dot = <Icon type="exception" className="L_timeAxis_Icon" style={{ backgroundColor: '#4bc076' }} />
                return (
                    <Timeline.Item dot={dot} key={index}>
                        <div className="L_timeZ">
                            <div>{item.subject}
                                <p>{item.remark}</p>
                            </div>
                            <div className="L_time" style={{ display: 'none' }}>
                                {/*<p>明天</p>*/}
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <p className="ant-dropdown-link L_time_rigthBtn"><Icon type="caret-down" style={{ fontSize: 12 }} /></p>
                                </Dropdown>
                            </div>
                        </div>
                    </Timeline.Item>
                )
            }
            if (item.type == 'phone') {
                var dot = <Icon type="phone" className="L_timeAxis_Icon" style={{ backgroundColor: '#48c3cc' }} />
                return (
                    <Timeline.Item dot={dot} key={index}>
                        <div className="L_timeZ">
                            <div>{item.remark}
                                <p>{item.phone}</p>
                            </div>
                            <div className="L_time" style={{ display: 'none' }}>
                                {/*<p>明天</p>*/}
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <p className="ant-dropdown-link L_time_rigthBtn"><Icon type="caret-down" style={{ fontSize: 12 }} /></p>
                                </Dropdown>
                            </div>
                        </div>
                    </Timeline.Item>
                )
            }
            if (item.type == "e-mail") {
                var dot = <Icon type="mail" className="L_timeAxis_Icon" style={{ backgroundColor: '#95aec5' }} />
                return (
                    <Timeline.Item dot={dot} key={index}>
                        <div className="L_timeZ">
                            <div>{item.subject}
                                <p>{item.content}</p>
                                <p>发件人邮件地址 {item.from}</p>
                                <p>相关项 {item.related_item}</p>
                            </div>
                            <div className="L_time" style={{ display: 'none' }}>
                                {/*<p>明天</p>*/}
                                <Dropdown overlay={menu} trigger={['click']} >
                                    <p className="ant-dropdown-link L_time_rigthBtn"><Icon type="caret-down" style={{ fontSize: 12 }} /></p>
                                </Dropdown>
                            </div>
                        </div>
                    </Timeline.Item>
                )
            }
        })
        return (
            <Timeline>
                <div className="L_timeAxis_hx">
                    <p className="L_timeAxis_hxp">过去活动</p>
                    <p className="xian">
                        <span className="L_timeAxis_line"></span>
                    </p>
                </div>
                {dots}
            </Timeline>
        )
    }
};

export default PastTime;


