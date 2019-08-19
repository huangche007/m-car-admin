import React, { Component } from 'react';
import PropTypes from 'prop-types'
class Page extends Component {
    static propTypes = {
      currentPage:PropTypes.number.isRequired,
      totalPage:PropTypes.number.isRequired,
      onChange:PropTypes.func.isRequired
    }
    change(index){
      this.props.onChange && this.props.onChange(index);
    }
    prev(){
        if(this.props.currentPage-1>=1){
            this.change(this.props.currentPage-1)
        }
    }
    next(){
        if(this.props.currentPage+1<=this.props.totalPage){
            this.change(this.props.currentPage+1)
        }
    }
    render() {
        return (
            <nav>
                <ul className="pagination">
                    <li>
                    <a onClick={this.prev.bind(this)}>
                        <span>&laquo;</span>
                    </a>
                    </li>
                    {
                        Array.from(new Array(this.props.totalPage)).map((item,index)=>(
                            <li key={index} className={this.props.currentPage === index+1 ? 'active':''}><a onClick={this.change.bind(this,index+1)}>{index+1}</a></li>
                        ))
                    }
                    <li>
                    <a onClick={this.next.bind(this)}>
                        <span>&raquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Page;