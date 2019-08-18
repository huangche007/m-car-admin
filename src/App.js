import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login'
import Banner from './pages/Banner'
import Car from './pages/Car'
class App extends Component {
  constructor(){
    super();
    this.state = {
      showDialog:true
    }
  }
  handleDialogClose = () => {
    this.setState({
      showDialog:false
    })
  }
  render() {
    return (
      <div>
        {
          this.props.adminReducer.isLogin ? '' :<Redirect to="/login" />
        }
        <Route path="/" exact component={Banner}/>
        <Route path="/car"  component={Car}/>
        <Route path="/login"  component={Login}/>
      </div>
    );
  }
}

export default connect((state,props) => Object.assign({},props,state),{

})(App);