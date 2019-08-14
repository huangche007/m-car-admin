import React, { Component } from 'react';
import Dialog from '../components/Dialog'
import From from '../components/From'
import fetchJson from '../utils/fetch'
class Login extends Component {
    async handleLogin() {
        const fromData = this.refs.loginFrom.getFromData();
        try {
            await fetchJson('admin/login',{
                method:'POST',
                body:fromData
            })
            alert('登录成功')
        } catch (error) {
            alert('登录失败'+error)
        }
    }
    render() {
        return (
            <div>
                <Dialog
                    title="登录"
                    shadow={true}
                    close_btn={false}
                >
                    <From
                        ref="loginFrom"
                        fileds={[
                            {label:'用户名',type:'text',placeholder:'请输入用户名',name:'username'},
                            {label:'密码',type:'password',placeholder:'请输入密码',name:'password'}
                        ]}

                        btns={[
                            {text:'登录',type:'primary',onClick:this.handleLogin.bind(this)},
                            {text:'取消'}
                        ]}
                    >

                    </From>
                </Dialog>
            </div>
        );
    }
}

export default Login;