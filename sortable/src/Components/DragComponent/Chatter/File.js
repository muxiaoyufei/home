import React, {Component} from 'react';
import {Upload,Menu,Dropdown,message,Button,Icon,Input,Row,Col,Form} from 'antd';

const FormItem = Form.Item;

const props = {
          name : 'file',
          action : '//jsonplaceholder.typicode.com/posts/',
          headers : {
            authorization : 'authorization-text',
            "Access-Control-Allow-Origin" : '*'
          },
          onChange(info){
            if(info.file.status !== 'uploading'){
            }
            if(info.file.status === 'done'){
              message.success(`${info.file.name} 文件上传成功`);
            }else if(info.file.status === 'error'){
              message.error(`${info.filename} 文件上传失败`)
            }
            
          }
        };
class Files extends Component{
  constructor(porps){
    super(porps);
    this.state = {
      size : 'large',
      key:"我的追随者",
      arr:[],
      fileList :[],
      uploading: false,
      dataURL:'',
      name:'',
      sizes:'',
      type:''
    }
  }
  handleSubmitFile = (e) => {
    e.preventDefault();
    const data=this.props.form.getFieldsValue();
  }
  onClick = function({key}){
    this.setState({
      key:{key}.key
    })
  };
  
 
 customRequest=(file)=>{
      const isLt2M = file.size / 1024 / 1024 < 2;
            var dataURL,name,size,type;
            var file=file.file
            var reader = new FileReader(); //新建FileReader对象
            const that=this
            reader.readAsDataURL(file); //读取为base64
            reader.onloadend = function (e) {
              dataURL = reader.result
              that.setState({
                dataURL:dataURL,
              })
            }
              name = file.name
              size = Math.round(file.size / 1024);
              type = file.type.split('/')[1];
          this.setState({
                fileList:[1],
                name:name,
                sizes:size,
                type:type
              })
    }
  render(){
    const props = {
          name : 'file',
           onChange({ file, fileList }) {
              if (file.status !== 'uploading') {
              }
            },
            defaultFileList: [],
          
          
        };
    
    function customRequest(file) {
      
    }
    const { getFieldProps } = this.props.form;
    const menu = (
      <Menu onClick={this.onClick.bind(this)}>
        <Menu.Item key="我的追随者">我的追随者</Menu.Item>
        <Menu.Item key="我的小组">我的小组</Menu.Item>
        <Menu.Item key="所有人">所有人</Menu.Item>
      </Menu>
    ) 
    return(
      <div className="micro">
        <Form onSubmit={this.props.handleSubmitFile.bind(this,this.props.form.getFieldsValue(),this.state.key,this.state.dataURL,this.state.name,this.state.size,this.state.type )}>
          <p>到
            <Dropdown overlay={menu} trigger={['click']} >
              {/*...getFieldProps('follower')*/}
              <a > {this.state.key} <Icon type="caret-down"/></a>
            </Dropdown>
          </p>
          <FormItem>
            <Row className="upload">
              <Col span={24}>
                <Upload customRequest={this.customRequest} {...props}>
                  <Button><Icon type="upload" />选择文件</Button> 最大文件大小为20M
                </Upload>
              </Col>
            </Row>
            <Input rows={3} type="textarea" className="content-input" size={this.state.size} {...getFieldProps('content')}/>
          </FormItem>
          <Row className="row loadingg">
            <Col offset={12} span={12} style={{textAlign:'right'}}>
              <Button type="primary" loading={this.props.uploading}  disabled={this.state.fileList.length === 0} htmlType="submit" size={this.state.size}>{this.props.uploading ? '上传中' : '上传' }</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
const File = Form.create()(Files);
export default File;