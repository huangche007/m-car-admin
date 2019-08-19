import React, { Component } from 'react';
import Tab from '../components/Tab'
import Table from '../components/Table'
import From from '../components/From'
import Page from '../components/Page'
import Dialog from '../components/Dialog'
import fetchJson from '../utils/fetch'
class Car extends Component {
    constructor(){
        super();
        this.state = {
            isShowAddDialog:false,
            isShowModifyDialog:false,
            isShowDeleteDialog:false,
            datas:[],
            currentPage:1,
            pageCount:0,
            del_id:''
        }
    }

    async loadCarList(page){
       const datas = await fetchJson(`api/carlist/${page}`);
       const pageCount = await fetchJson(`api/car_page`);
       this.setState({
           datas,
           pageCount,
           currentPage:page
       })
    }
    async componentDidMount(){
        //获取车辆信息
       await this.loadCarList(this.state.currentPage)
    }
    async handlePageChange(currentPage){
        await this.loadCarList(currentPage)
    }

    handleShowDeleteDailog = () =>{
        this.setState({
            isShowDeleteDialog:true
        })
    }
    hideDeleteDialog = () =>{
        this.setState({
            isShowDeleteDialog:false
        })
    }
    handleDelete(id){
        this.setState({
            del_id:id
        })
        this.handleShowDeleteDailog();
    }
    async onDeleteBannerById(){
        const id = this.state.del_id
        await fetchJson(`api/car/${id}`,{
            method:'DELETE'
        })
        this.hideDeleteDialog();
        await this.loadCarList(1);

    }
    render() {
        return (
            <div>
               <Tab
                  tabs={[
                      {name:'banner管理',path:'/'},
                      {name:'车辆管理',path:'/car', selected:true}
                  ]}
                />           

                <Table
                    fileds={[
                        {name:'title',text:'名称'},
                        {name:'price',text:'价格'},
                        {name:'description',text:'描述'},
                    ]}

                    datas = {this.state.datas}
                    onDelete = {this.handleDelete.bind(this)}
                    onModify = {(id) =>{}}
                />  

                {
                    this.state.isShowDeleteDialog ? (
                        <Dialog
                            shadow = {true}
                            title = '删除'
                            close_btn={true}
                            onClose = {this.hideDeleteDialog}
                        >
                         <div>
                             <p>
                                 确定要删除该条车辆数据吗？
                             </p>
                             <div className="bannder-delete-btns">
                                 <button type="button" className="btn btn-danger" onClick={this.onDeleteBannerById.bind(this)}>确定</button>
                                 <button type="button" className="btn btn-default" onClick={this.hideDeleteDialog}>取消</button>
                             </div>
                         </div>
                        </Dialog>
                    ):''
                }              
                <Page 
                 currentPage = {this.state.currentPage}
                 totalPage = {this.state.pageCount}
                 onChange = {this.handlePageChange.bind(this)}
                />
            </div>
        );
    }
}

export default Car;