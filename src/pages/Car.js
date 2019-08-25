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
            del_id:'',
            mod_id:'',
            mod_title:'',
            mod_price:0,
            mod_description:''

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
    showAddDialog(){
        this.setState({
            isShowAddDialog:true
        })
    }
    hideAddDialog = () => {
        this.setState({
            isShowAddDialog:false
        })
    }
    async confrimAddCarInfo(){
      const addCarFrom = this.refs.addCarFrom.getFromData();
      await fetchJson('api/car',{
        method:'POST',
        body:addCarFrom
      })
      alert('添加成功');
      this.hideAddDialog();
      await this.loadCarList(this.state.currentPage)
    }

    createFeature(arr){
        let mresult = [];
        if(arr && arr.length>0){
            arr.forEach(str => {
                mresult.push({name:'feature_name',type:'hidden',value:str})
                mresult.push({name:'feature_value',type:'text',label:str})
            });
        }
        
        return mresult;
    }

    async modifyCarInfo(id){
        let car = null;
        car = await fetchJson(`api/car/${id}`)
        this.setState({
            mod_id:id,
            mod_title:car.title,
            mod_price:car.price,
            mod_description:car.description
        })
        this.handleShowModifyDialog();
    }
    

    handleShowModifyDialog = () => {
        this.setState({
            isShowModifyDialog:true
        })
    }

    handleHideModifyDialog = () => {
        this.setState({
            isShowModifyDialog:false
        })
    }

    async confirmModifyCar(){
        const modifyCarFromData = this.refs.modifyCar.getFromData();
        await fetchJson(`api/car/${this.state.mod_id}`,{
            method:'POST',
            body:modifyCarFromData
        })
        alert('修改成功')
        this.handleHideModifyDialog();
        await this.loadCarList(this.state.currentPage)
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
                <button type="button" className="btn btn-primary" onClick={this.showAddDialog.bind(this)}>添加</button>
                {
                    this.state.isShowAddDialog ? (
                        <Dialog
                            shadow = {true}
                            title = '添加'
                            close_btn={true}
                            onClose = {this.hideAddDialog}
                            carDialog={1}
                        >
                            <From
                             ref="addCarFrom"
                             fileds = {[
                                 {name:'title',type:'text',label:'车辆名称',placeholder:'请输入名称'},
                                 {name:'price',type:'number',label:'车辆价格',placeholder:'请输入价格'},
                                 {name:'description',type:'text',label:'描述信息',placeholder:'请输入描述信息'},
                                 {name:'images',type:'file',label:'车辆图片',placeholder:'请上传车辆图片',isArray:true},
                                 ...this.createFeature(['上牌时间','表显里程','本车排量','变速箱','排放标准','车辆性质','车辆颜色',
                                 '维修保养','年检到期','商业险到期','较强险到期','挡位个数','驱动方式','综合耗油','车身结构',
                                 '发动机缸数','最大功率','进气类型'])
                             ]}

                             btns = {[
                                 {type:'primary',text:'确定',onClick:this.confrimAddCarInfo.bind(this)},
                                 {type:'',text:'取消',onClick:this.hideAddDialog}
                             ]}
                            >

                            </From>
                       </Dialog>
                    ):''
                }
                {
                    this.state.isShowModifyDialog ? (
                        <Dialog
                          title="修改"
                          shadow={true}
                          close_btn = {true}
                          onClose = {this.handleHideModifyDialog}
                        >
                            <From
                            ref="modifyCar"
                              fileds = {[
                                {name:'title',type:'text',label:'车辆名称',placeholder:'请输入名称',value:this.state.mod_title},
                                {name:'price',type:'number',label:'车辆价格',placeholder:'请输入价格',value:this.state.mod_price},
                                {name:'description',type:'text',label:'描述信息',placeholder:'请输入描述信息',value:this.state.mod_description}
                              ]}

                              btns = {[
                                {type:'primary',text:'确定',onClick:this.confirmModifyCar.bind(this)},
                                {type:'',text:'取消',onClick:this.handleHideModifyDialog}
                            ]}
                            />
                        </Dialog>
                    ):''
                }
                <Table
                    fileds={[
                        {name:'title',text:'名称'},
                        {name:'price',text:'价格'},
                        {name:'description',text:'描述'},
                    ]}

                    datas = {this.state.datas}
                    onDelete = {this.handleDelete.bind(this)}
                    onModify = {this.modifyCarInfo.bind(this)}
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