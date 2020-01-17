<template>
    <div class="order">
        <div class="order-title">
            <h3>说明</h3>
            <p>1、此处显示权益卡购买的订单信息。</p>
        </div>
        <div class="soso-box">
            <div class="input-box">
                <el-input type="text" v-model="keywords" placeholder="请输入订单编号，权益卡名称，客户手机号码"></el-input>
            </div>
            <div style="margin-left:24px;margin-right: 5px;line-height: 40px">订单状态</div>
            <div class="sele-box">
                <el-select v-model="type" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="代付款" value="0"></el-option>
                    <el-option label="已支付" value="1"></el-option>
                </el-select>
            </div>

            <div style="margin-left:24px;margin-right: 5px;line-height: 40px">开始日期</div>
            <div class="date-box">
                <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="start"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </div>
            <div style="margin-left:24px;margin-right: 5px;line-height: 40px">结束日期</div>
            <div class="date-box" style="margin-right: 24px">
                <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="end"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </div>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>

        <div class="tab">
            <table id="simple-table" class="table table-hover table-bordered"
                   style="margin-top: 20px;">
                <thead>
                <tr>
                    <th width="20%">权益卡名称</th>
                    <th width="10%">购买方式</th>
                    <th width="10%">订单状态</th>
                    <th width="20%">客户手机号码</th>
                    <th width="10%">金额</th>
                    <th width="20%">下单时间</th>
                    <th width="10%">操作</th>
                </tr>
                </thead>
                <tbody>
                <template v-if="list.list != '0' ">
                    <tr v-for="item in list.list">
                        <td>{{item.memberName}}</td>
                        <td v-if="item.priceUsed == '0'">单次购买</td>
                        <td v-if="item.priceUsed == '1'">包月</td>
                        <td v-if="item.priceUsed == '2'">包季</td>
                        <td v-if="item.priceUsed == '3'">包年</td>

                        <td v-if="item.orderStatus==0">已取消</td>
                        <td v-if="item.orderStatus==1">待付款</td>
                        <td v-if="item.orderStatus==2">待收货</td>
                        <!--<td v-if="item.orderStatus==3">已审核</td>-->
                        <td v-if="item.orderStatus==4">待出库</td>
                        <td v-if="item.orderStatus==5">已完成</td>
                        <td>{{item.tel}}</td>
                        <td>{{item.payAmount}}</td>
                        <td>{{item.createTime}}</td>
                        <td class="btn-hide">
                            <span>查看</span>
                        </td>
                    </tr>
                </template>
                <tr v-else>
                    <td colspan="7"></td>
                </tr>
                </tbody>
            </table>
            <el-pagination
                    style="text-align: right"
                    @size-change="pagesize"
                    @current-change="page"
                    :page-sizes="[10, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="list.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name:"order",
        data() {
            return {
                keywords:"",
                type:"",
                start:"",
                end:"",
                list:"",
                pageNo:"1",
                pageSize:"10",
            }
        },
        methods:{
            // 数据请求
            getdata(){
                let options = {
                    keywords:this.keywords,
                    pageNo:this.pageNo,
                    psgeSize:this.pageSize,
                    orderType: 5,
                    orderStatus: this.type,
                    createTimeStart: this.start,
                    createTimeEnd: this.end,

                }
                this.$post('/saleOrder/dataList',options)
                    .then(res=>{
                        this.list = res.result
                    })
            },
            //分页
            page(e){
                this.pageNo = e
                this.getdata()
            },

            pagesize(e){
                this.pagesize = e
                this.getdata()
            }
        },



        mounted(){
            this.getdata()
        }
    }
</script>

<style scoped>
    .order{
        height: 100vh;
        padding:15px;
        background: #fff;
    }
    .order-title{
        height:98px;
        background:rgba(228,233,239,1);
        border-radius:4px;
    }

    .order-title>h3{
        font-size:20px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(74,74,74,1);
        padding-top: 16px;
        margin-left: 15px;
    }

    .order-title>p{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(74,74,74,1);
        margin-top: 12px;
        margin-left: 20px;
    }

    .soso-box{
        display: flex;
        margin-top: 21px;
        margin-left: 10px;
    }

    /*.sele-box{*/
    /*    sele-box*/
    /*}*/

    .input-box{
        width: 235px;
    }

    .date-box{
        /*width: 141px;*/
        overflow: hidden;
    }


    /*表格样式*/

    /*去掉表头边框+背景*/
    th {
        border: 1px solid transparent !important;
        background: #e4e9ef;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #5b5b5b;
    }

    td {
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #5b5b5b;
        vertical-align: middle;
    }

    td > span {
        margin-left: 14px;
        color: #4a90e2;
        display: none;
        cursor: pointer;
    }

    tr:hover > td > span {
        display: inline;
    }


</style>