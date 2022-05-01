<template>
    <div>
        <div class="header">
            <el-form :inline="true">
                <el-form-item label="学生卡号" prop="title">
                    <el-input type="text" v-model="search_title" placeholder="请输入账号" style="width:95%"
                              clearable></el-input>
                </el-form-item>
                <el-form-item label="学生姓名" prop="time">
                    <el-input type="text" v-model="search_title" placeholder="请输入姓名" style="width:95%"
                              clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
                    <el-button type="reset" icon="el-icon-refresh" size="small">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                height="500px"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="doctorId"
                    label="医生编号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="doctorName"
                    label="医生姓名"
                    width="120"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="userId"
                    label="学生卡号"
                    width="120"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="学生姓名"
                    width="120"
            >
                <template slot-scope="scope">
                    <el-tag  size="medium" effect="plain">{{ scope.row.userName }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="payTitle"
                    label="付款项目"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="payPrice"
                    label="费用"
            >
                <template slot-scope="scope">
                    <el-tag type="danger" size="medium" effect="plain">{{ scope.row.payPrice }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="payTime"
                    label="就诊时间"
                    :formatter="dateFormat"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="department"
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="footer">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "manageMoney",
        inject:['reload'],
        data() {
            return {
                total:'',
                tableData: [
                    {
                        id:'',
                        userId:'',
                        userName:'',
                        doctorId:'',
                        doctorName:'',
                        payTitle:'',
                        payPrice:'',
                        payTime:'',
                        itemInfo:'',
                    }
                ]
            }
        },
        methods:{
            dateFormat:function(row){
                let t=new Date(row.payTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
                let year=t.getFullYear(),
                    month=t.getMonth()+1,
                    day=t.getDate(),
                    hour=t.getHours(),
                    min=t.getMinutes(),
                    sec=t.getSeconds();
                let newTime=year+'-'+
                    (month<10?'0'+month:month)+'-'+
                    (day<10?'0'+day:day)+' '+
                    (hour<10?'0'+hour:hour)+':'+
                    (min<10?'0'+min:min)+':'+
                    (sec<10?'0'+sec:sec);
                return newTime;
            },
            handleDelete(row){  //删除
                const _this = this
                this.$confirm('将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    console.log(row.id)
                    console.log(row.user)
                    this.$axios.delete('http://localhost:8181/pay/deleteById/'+row.id).then(function (resp) {
                        _this.reload()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        },
        created() {
            const _this = this
            this.$axios.get('http://localhost:8181/pay/findAll/1/8').then(function (resp) {
                _this.tableData = resp.data.content
                _this.total = resp.data.totalElements
            })
        }
    }
</script>

<style scoped>
    .footer {
        float: right;
        margin-top: 20px;
        margin-right: 5%;
    }
</style>