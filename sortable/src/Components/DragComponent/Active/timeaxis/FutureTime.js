/**
 * Created by fanpf on 2017/5/24.
 */
import React, { Component } from 'react';
import { Timeline, Icon, Menu, Dropdown, Button, Checkbox } from 'antd';
import timeaxis from './timeaxis.css';

class FutureTime extends Component {
    constructor(porps) {
        super(porps);
    }
    render() {
        var future = this.props.future.map((item, index) => {
            const menu = (
                <Menu>
                    <Menu.Item>
                        <a rel="noopener noreferrer" >编辑</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a rel="noopener noreferrer" >删除</a>
                    </Menu.Item>
                </Menu>
            );
            return (
                <Timeline.Item dot={<Icon type="contacts" className="L_timeAxis_Icon" />} key={index} >
                    <div className="L_timeZ">
                        <div>{item.subject}</div>
                        <div className="L_time" style={{ display: 'none' }}>
                            {/*<p>明天</p>*/}
                            <Dropdown overlay={menu}>
                                <p className="ant-dropdown-link L_time_rigthBtn"><Icon type="caret-down" style={{ fontSize: 12 }} /></p>
                            </Dropdown>
                        </div>
                    </div>
                </Timeline.Item>
            )
        })
        return (
            <Timeline>
                <div className="L_timeAxis_hx">
                    <p className="L_timeAxis_hxp">后续步骤</p>
                    <p className="xian">
                        <span className="L_timeAxis_line"></span>
                        {/* <Button>更多步骤</Button>*/}
                    </p>
                </div>
                {future}
            </Timeline>
        )
    }
};

export default FutureTime;