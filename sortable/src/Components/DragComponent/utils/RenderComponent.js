import React,{Component} from 'react';
import ReactDOM from 'react-dom';

let renderComponent = (id,htmldom) => {
  if(id){
    class cli extends React.Component { 
      constructor(props) {
        super(props);
        this.state = {
          text: ""
        };
      } 
      render() {
        return (
          <div>
            {this.props.text}
          </div>
        );
      }
    }
    // let cli = React.createClass({render:function(){return ( <div>{this.props.text} </div> ) } })
    let child = React.createElement(cli, {key:'F',text: htmldom}); 
    let root = React.createElement('div', { className: 'my-list' }, [child]);
    ReactDOM.render(root,document.getElementById(id) ) 
  }
}
export default renderComponent;


