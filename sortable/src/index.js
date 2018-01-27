import React from 'react';
import ReactDOM from 'react-dom';
import DragContainer from './Components/DragContainer';
import LayoutContainer from './Components/LayoutContainer';
import ThemeContainer from './Components/ThemeContainer';
import Home from './Components/Home';
import { HashRouter, Route } from 'react-router-dom';
import './css/App.css';

ReactDOM.render(
  (<HashRouter>
    <div>
      <Route path="/drag" component={DragContainer} />
      <Route path="/layout" component={LayoutContainer} />
      <Route path="/theme" component={ThemeContainer} />
      <Route path="/disignpreview" component={Home} />
    </div>
  </HashRouter>),
  document.getElementById('root'))