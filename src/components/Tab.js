import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
class Tab extends Component {
    static propTypes = {
        tabs:PropTypes.array.isRequired
    }
    hanldeChangeTab(index){
        console.log('sssssssssss:',this.props)
        if(this.props.tabs[index].path){
          this.props.history.push(this.props.tabs[index].path)
        }
    }
    render() {
        return (
            <ul className="nav nav-tabs">
                {
                    this.props.tabs.map((tab,index) => (
                        <li key={index} className={tab.selected ? 'active':''}><a  onClick={this.hanldeChangeTab.bind(this,index)}>{tab.name}</a></li>
                    ))
                }
            </ul>
        );
    }
}

export default withRouter(Tab);