import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login'
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
        <Login></Login>
      </div>
    );
  }
}

export default App;