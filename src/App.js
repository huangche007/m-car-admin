import React, { Component } from 'react';
import {Route,Redirect,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login'
import Banner from './pages/Banner'
import Car from './pages/Car'
import {setLogin} from './actions'
import fetchJson from './utils/fetch'
class App extends Component {
  constructor(){
    super();
    this.state = {
      showDialog:true
    }
  }

  async checkLogin(){
    if(this.props.location.pathname!=='/login'){
      try {
        if(!this.props.adminReducer.isLogin){
          await fetchJson('admin/checklogin')
          this.props.setLogin(true);
        }
       
      } catch (error) {
        this.props.history.push('/login');
      }
    }
  }

  async componentDidUpdate(){
    await this.checkLogin();
  }

  async componentDidMount(){
    await this.checkLogin();
  }
  handleDialogClose = () => {
    this.setState({
      showDialog:false
    })
  }
  render() {
    return (
      <div>
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