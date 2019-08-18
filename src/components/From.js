import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/from.css'
class From extends Component {

    static propTypes = {
        fileds:PropTypes.array.isRequired,
        btns:PropTypes.array.isRequired
    }
    /**
     *
     *获取当前from表单元素
     * @memberof From
     */
    getInterface = ()=> {
        return this.refs.form
    }

    /**
     *获取一个fromData对象
     *
     * @memberof From
     */
    getFromData = () => {
        return new FormData(this.refs.from);
    }
    render() {
        return (
         <form ref="from">
            {
               this.props.fileds? this.props.fileds.map((filed,index) => {
                    let id = `id_${Math.floor(Math.random()*100000)}`
                    return(
                        <div className="form-group"key={index}>
                            <label htmlFor={id}>{filed.label}</label>
                            <input type={filed.type} className="form-control" id={id} name={filed.name} placeholder={filed.placeholder} />
                        </div>
                    )
                }):''
            }
            <div className="form-group form-btns">
                {
                    this.props.btns ? this.props.btns.map((btn,index) => (
                        <button type="button" className={`btn ${btn.type === 'primary' ? 'btn-primary':'btn-default'}`} key={index} onClick={btn.onClick}>{btn.text}</button>
                    )):''
                }
               
            </div>
       </form>
        );
    }
}

export default From;