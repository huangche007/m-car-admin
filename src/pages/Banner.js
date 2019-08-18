import React, { Component } from 'react';
import Page from '../components/Page'
import Table from '../components/Table'
import Dialog from '../components/Dialog'
import From from '../components/From'
import fetch from '../utils/fetch'
import fetchJson from '../utils/fetch';
import '../assets/banner.css'
import Tab from '../components/Tab'
class Banner extends Component {
    constructor(){
        super();
        this.state = {
            datas:[],
            isShowAddDialog:false,
            isShowDeletDialog:false,
            page:1,
            totalPage:7,
            modifyId:'',
            isShowModifyDialog:false,
            modifyTitle:'',
            modifySubTitle:''
        }
    }
    async loadBannerList(){
        const data = await fetch('api/banner');
        this.setState({
            datas:data
        })
    }
    async componentDidMount(){
       await this.loadBannerList();
    }
    handleDelete(id){
        this.delete_id = id;
        this.showDeleteDialog();
    }

    handleModify(id){
       let data = null;
       this.state.datas.forEach((item) =>{
           if(item.ID === id){
             data = item;
           }
       }) 
       this.setState({
           modifyId:id,
           modifyTitle:data.title,
           modifySubTitle:data.sub_title
       })
       this.showModifyDialog();
    }

    showModifyDialog = () => {
        this.setState({
            isShowModifyDialog:true
        })
    }
    hideModifyDialog = () => {
        this.setState({
            isShowModifyDialog:false
        })
    }
    async handleModifyConfirm(){
        const editFrom = this.refs.editFrom.getFromData()
        try {
            await fetchJson(`api/banner/${this.state.modifyId}`,{
                method:'POST',
                body:editFrom
            })
            alert('修改成功')
            this.hideModifyDialog();
            this.loadBannerList();
        } catch (error) {
            
        }
    }
    showAddDialog = () => {
        this.setState({
            isShowAddDialog:true
        })
    }

    hideAddDialog = () =>{
        this.setState({
            isShowAddDialog:false
        })
    }
    /**
     *添加Banner
     *
     * @memberof Banner
     */
    async handleAddBanner(){
        const fromData = this.refs.bannerFrom.getFromData();
         await fetchJson('api/banner',{
            method:'POST',
            body:fromData
        })
        alert('添加成功');
        this.hideAddDialog(); 
       await this.loadBannerList();
    }
    showDeleteDialog = () => {
        this.setState({
            isShowDeletDialog:true
        })
    }
    hideDeleteDialog = () => {
        this.setState({
            isShowDeletDialog:false
        })
    }
    async onDeleteBannerById(){
      const id = this.delete_id  
      await fetchJson(`api/banner/${id}`,{
          method:'DELETE'
      })
      this.hideDeleteDialog();
      this.loadBannerList();
    }
    render() {
        return (
            <div>
                <Tab
                  tabs={[
                      {name:'banner管理',path:'/', selected:true},
                      {name:'车辆管理',path:'/car'}
                  ]}
                />
                <button type="button" className="btn btn-primary" onClick={this.showAddDialog}>添加</button>
                <Table
                 fileds={[
                     {name:'title',text:'标题'},
                     {name:'sub_title',text:'副标题'},
                     {name:'image',text:'图片'}
                 ]}
                 datas ={this.state.datas}
                 onDelete = {this.handleDelete.bind(this)}
                 onModify = {this.handleModify.bind(this)}
                />
                {
                    this.state.isShowAddDialog ? (
                        <Dialog
                            shadow = {true}
                            title = '添加'
                            close_btn={true}
                            onClose = {this.hideAddDialog}
                        >
                             <From
                                ref="bannerFrom"
                                fileds={[
                                    {label:'标题',type:'text',placeholder:'请输入标题',name:'title'},
                                    {label:'副标题',type:'text',placeholder:'请输入副标题',name:'sub_title'},
                                    {label:'图片',type:'file',name:'image'}
                                ]}

                                btns={[
                                    {text:'确定',type:'primary',onClick:this.handleAddBanner.bind(this)},
                                    {text:'取消',onClick:this.hideAddDialog}
                                ]}
                            >

                            </From>
                        </Dialog>
                    ):''
                }
                {
                    this.state.isShowDeletDialog ? (
                        <Dialog
                            shadow = {true}
                            title = '删除'
                            close_btn={true}
                            onClose = {this.hideDeleteDialog}
                        >
                         <div>
                             <p>
                                 确定要删除该条banner数据吗？
                             </p>
                             <div className="bannder-delete-btns">
                                 <button type="button" className="btn btn-danger" onClick={this.onDeleteBannerById.bind(this)}>确定</button>
                                 <button type="button" className="btn btn-default" onClick={this.hideDeleteDialog}>取消</button>
                             </div>
                         </div>
                        </Dialog>
                    ):''
                }                
               {
                    this.state.isShowModifyDialog ? (
                        <Dialog
                            shadow = {true}
                            title = '编辑'
                            close_btn={true}
                            onClose = {this.hideModifyDialog}
                        >
                             <From
                                ref="editFrom"
                                fileds={[
                                    {label:'标题',type:'text',placeholder:'请输入标题',name:'title',value:this.state.modifyTitle},
                                    {label:'副标题',type:'text',placeholder:'请输入副标题',name:'sub_title',value:this.state.modifySubTitle},
                                    {label:'图片',type:'file',name:'image'}
                                ]}

                                btns={[
                                    {text:'确定',type:'primary',onClick:this.handleModifyConfirm.bind(this)},
                                    {text:'取消',onClick:this.hideModifyDialog}
                                ]}
                            >

                            </From>
                        </Dialog>
                    ):''
                }
            </div>
        );
    }
}

export default Banner;