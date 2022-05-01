<template>
    <div>
        <div class="header">
            <el-form :inline="true">
                <el-form-item label="姓名" prop="title">
                    <el-input type="text" v-model="search_title" placeholder="请输入姓名" style="width:95%"
                              clearable></el-input>
                </el-form-item>
                <el-form-item label="学号" prop="title">
                    <el-input type="text" v-model="search_title" placeholder="请输入学号" style="width:95%"
                              clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
                    <el-button type="reset" icon="el-icon-refresh" size="small">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="main">
            <div class="top">
                <span class="top-left">预约者信息：</span>
                <span class="top-right">当前号码：{{now_num}}</span>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="号码"
                        prop="id"
                        width="60">
                    <template slot-scope="scope">
                        <el-tag type="danger" size="medium">{{ scope.row.id }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="日期"
                        prop="see_day"
                        width="110">
                </el-table-column>
                <el-table-column
                        label="时间段"
                        prop="see_time"
                        width="140">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.see_time }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="user_name"
                        label="姓名"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="user_id"
                        label="学号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="doc_name"
                        label="医生"
                >
                </el-table-column>
                <el-table-column
                        prop="hospital_department"
                        label="预约项目"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="success"
                                icon="el-icon-phone"
                                @click="searchInfo(scope.row)">呼叫
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                icon="el-icon-delete"
                                @click="handleDelete(scope.row)">退号
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    page-size="4"
                    :total="total"
                    @current-change="page">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Appointment",
        inject:['reload'],
        data() {
            return {
                total:'',         //数据个数
                search_title: '',
                search_time: '',
                now_num: '',   //当前号码
                tableData: [
                    {
                        id:'',
                        see_day:'',
                        see_time:'',
                        user_name:'',
                        user_id:'',
                        hospital_department:'',
                        doc_name:''
                    }
                ],
                multipleSelection: [],
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    title: '',
                    content: '',
                    receiver: ''

                },
                props: {multiple: true},

            };
        },
        methods: {
            handleDelete(row){
                const _this = this
                this.$confirm('此操作将删除该预约, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$axios.delete('http://localhost:8181/reserve/deleteById/'+row.id).then(function (resp) {
                        _this.reload()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            page(currentPage){
                // alert(currentPage)
                const _this = this
                this.$axios.get('http://localhost:8181/reserve/findAll/'+currentPage+'/4').then(function (resp) {
                    _this.tableData = resp.data.content
                })
            },
            searchInfo(row){
                this.$message({
                    message: '呼叫成功！待诊断',
                    type: 'success',
                });
                // alert(row.user_id)
                // alert(row.id)
                this.$router.push({name:'病患就诊',path:'patientInfo',params:{userID:row.user_id,id:row.id}})
            }
        },
        created() {
            const _this = this
            this.$axios.get('http://localhost:8181/reserve/findAll/1/4').then(function (resp) {
                console.log(resp)
                console.log(resp.data.totalElements)
                _this.tableData = resp.data.content
                _this.now_num = resp.data.content[0].id
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

    .top {
        height: 50px;
    }

    .top-left {
        font-size: 20px;
        float: left;
        margin-left: 1%;
    }

    .top-right {
        font-size: 18px;
        float: right;
        margin-right: 30%;
        color: red;
    }
</style>