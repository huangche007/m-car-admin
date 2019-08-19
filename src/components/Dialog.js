import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/dialog.css'
class Dialog extends Component {
    static propTypes = {
        onClose:PropTypes.func,
        shadow:PropTypes.bool,
        title:PropTypes.string,
        close_btn:PropTypes.bool.isRequired,
        children:PropTypes.object
    }
    close = () => {
        this.props.onClose&&this.props.onClose()
    }
    render() {
        return (
            <div>
                 {
                     this.props.shadow ? (
                        <div className="dialog-shadow"></div>
                     ):''
                 }
                <div className="panel panel-default dialog-panel">
                <div className="panel-heading">
                    <h2 className="panel-title">
                    {this.props.title}
                    {
                        this.props.close_btn ? (
                            <a className="glyphicon glyphicon-remove pull-right" onClick={this.close}></a>
                        ):''
                    }
                    </h2>
                </div>
                <div className="panel-body">
                    {/* 弹窗内容 */}
                    {this.props.children}
                </div>
                </div>
            </div>
        );
    }
}

export default Dialog;