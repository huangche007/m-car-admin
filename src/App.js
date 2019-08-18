import React, { Component } from 'react';
import {Route,Redirect,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login'
import Banner from './pages/Banner'
import Car from './pages/Car'
import {setLogin} from './actions'
class App extends Component {
  constructor(){
    super();
    this.state = {
      showDialog:true
    }
  }
  componentDidMount(){
    if(localStorage.isLogin){ //持久化登录状态->fake
        setLogin(true);
        this.props.history.push('/');
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
        <Switch>
          <Route path="/" exact component={Banner}/>
          <Route path="/car"  component={Car}/>
          <Route path="/login"  component={Login}/>
        </Switch>
      </div>
    );
  }
}

export default connect((state,props) => Object.assign({},props,state),{
  setLogin
})(App);