import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../assets/table.css'
import {BASE_UPLOAD} from '../utils/config'
class Table extends Component {
    static propTypes = {
        fileds:PropTypes.array.isRequired,
        datas:PropTypes.array.isRequired,
        onDelete:PropTypes.func.isRequired,
        onModify:PropTypes.func.isRequired
    }
    fnDelete(id){
        this.props.onDelete && this.props.onDelete(id)
    }

    fnModify(id){
        this.props.onModify && this.props.onModify(id)
    }
    render() {
        return (
            <div>
                  <table className="table">
                    <thead>
                        <tr>
                        <th>
                            <input type="checkbox" name="" value="" />
                        </th>
                        <th>ID</th>
                        {
                            this.props.fileds.map((filed,index) =>(
                                <th key={index} >{filed.text}</th>
                            ))
                        }
                       
                        <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.datas.map((data,index) => (
                                <tr key={data.ID}>
                                    <td>
                                        <input type="checkbox" name="" value="" />
                                    </td>
                                    <td>{data.ID}</td>
                                    {
                                        this.props.fileds.map((filed,fIndex) => (
                                            <td key={fIndex} className="m-f">{filed.name === 'image' ? <img className="banner-img" src={`${BASE_UPLOAD}${data[filed.name]}`}/>:data[filed.name]}</td>
                                        ))
                                    }
                                    <td className="operate-btns">
                                        <button type="button" className="btn btn-default" onClick={this.fnModify.bind(this,data.ID)}>修改</button>
                                        <button type="button" className="btn btn-danger" onClick={this.fnDelete.bind(this,data.ID)}>删除</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                  </table>
            </div>
        );
    }
}

export default Table;