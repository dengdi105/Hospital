<template>
    <div>
        <div class="header">
            <el-form :inline="true">
                <el-form-item label="标题" prop="title">
                    <el-input type="text" v-model="search_title" placeholder="请输入标题" style="width:95%"
                              clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="发布时间" prop="time">
                    <el-date-picker v-model="search_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
                    <el-button type="reset" icon="el-icon-refresh" size="small">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="main">
            <div class="top-btn">
                <template>
                    <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-plus" plain size="medium">
                        新发布
                    </el-button>
                    <el-button type="danger" @click="open" icon="el-icon-delete" plain size="medium">删除记录</el-button>
                    <el-dialog title="信息通知" :visible.sync="dialogFormVisible">
                        <el-form :model="form" :rules="rules" ref="form">
                            <el-form-item label="标题" label-width="70px" prop="news_title">
                                <el-input v-model="form.news_title" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="内容" label-width="70px" prop="news_content">
                                <el-input v-model="form.news_content" type="textarea" :rows='3'
                                          autocomplete="off"></el-input>
                            </el-form-item>
<!--                            <el-form-item label="接收人" label-width="70px" prop="user_id">-->
<!--                                <el-input v-model="form.user_id" autocomplete="off"></el-input>-->
<!--                            </el-form-item>-->
                            <el-form-item label="接收人" label-width="70px" >
                                <el-cascader
                                        ref="cascader"
                                        v-model="form.userId"
                                        placeholder="搜索"
                                        :options="options"
                                        :props="{ multiple: true }"
                                        @change="handleChange($event)"
                                        filterable></el-cascader>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="submitForm('form')">发布</el-button>
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                        </div>
                    </el-dialog>
                </template>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    stripe
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="news_day"
                        label="日期"
                        width="170"
                        sortable
                        :formatter="dateFormat">
                </el-table-column>
                <el-table-column
                        width="200"
                        prop="news_title"
                        label="标题"
                        show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                        width="400"
                        prop="news_content"
                        label="内容"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        label="发布人"
                        width="150px"
                >
                    <template slot-scope="scope">
                        <el-tag size="medium">{{"D-D"}}</el-tag>
                    </template>
                </el-table-column>
<!--                <el-table-column-->
<!--                        prop="user_id"-->
<!--                        label="接收人"-->
<!--                >-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-tag type="info" size="medium">{{ scope.row.user_id }}</el-tag>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column
                        prop="name"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="success"
                                icon="el-icon-view"
                                @click="showDetail(scope.row)">详情
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.row)">修改
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                icon="el-icon-delete"
                                @click="handleDelete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    page-size="8"
                    :total="total"
                    @current-change="page">
            </el-pagination>
        </div>
        <el-dialog title="修改通知" :visible.sync="dialogFormVisible2">
            <el-form :model="resetForm" :rules="rules" ref="resetForm">
                <el-form-item label="标题" label-width="70px" prop="news_title">
                    <el-input v-model="resetForm.news_title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" label-width="70px" prop="news_title">
                    <el-input v-model="resetForm.news_content" type="textarea" :rows='3'
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="接收人" label-width="70px" prop="user_id">
                    <el-input v-model="resetForm.user_id" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="resetNews('resetForm')">修改发布</el-button>
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="人数统计" :visible.sync="dialogFormVisible3">
            <div>
                <div id="myChart" :style="{width: '500px', height: '600px'}"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "Notify",
        inject:['reload'],
        data() {
            return {
                search_title: '',
                search_time: '',
                total:null,
                tableData: [
                    {
                        id:'',
                        news_day:'',
                        news_title:'',
                        news_content:'',
                        user_id:''
                    }
                ],

                multipleSelection: [],
                // dialogTableVisible: false,
                dialogFormVisible: false,  //发布弹框可见
                dialogFormVisible2:false,
                dialogFormVisible3:false,  //详情框

                //新发布表单
                form: {
                    news_title: '',
                    news_content: '',
                    news_day: '',
                    user_id: ''
                },
                //修改表单
                resetForm:{
                    // id:'',
                    news_title: '',
                    news_content: '',
                    user_id:''
                },
                //校验规则
                rules:{
                    news_title: [
                        {required:true,message:'请输入标题',trigger:'blur'}
                    ],
                    news_content: [
                        {required:true,message:'请输入内容',trigger:'blur'}
                    ],
                    user_id: [
                        {required:true,message:'请输入接收人',trigger:'blur'}
                    ]
                },
                props: {multiple: true},
                options: [{
                    value: '全体成员',
                    label: '全体成员',
                },{
                    value: '计算机与信息学院',
                    label: '计算机与信息学院',
                    children: [{
                        value: '软件191',
                        label: '软件191',
                    }, {
                        value: '软件192',
                        label: '软件192',
                    }, {
                        value: '物联网191',
                        label: '物联网191',
                    }]
                }, {
                    value: '外国语学院',
                    label: '外国语学院',
                    children: [{
                        value: '英语191',
                        label: '英语191',
                    }, {
                        value: '英语192',
                        label: '英语192',
                    }]
                },{
                    value: '电气工程学院',
                    label: '电气工程学院',
                    children: [{
                        value: '电气191',
                        label: '电气191',
                    }, {
                        value: '电气192',
                        label: '电气192',
                    }]
                },{
                    value: '机械学院',
                    label: '机械学院',
                    children: [{
                        value: '机械制造及其自动化191',
                        label: '机械制造及其自动化191',
                    }, {
                        value: '车辆工程191',
                        label: '车辆工程191',
                    }]
                },{
                    value: '艺术学院',
                    label: '艺术学院',
                    children: [{
                        value: '工美设计191',
                        label: '工美设计191',
                    }, {
                        value: '广告191',
                        label: '广告191',
                    }]
                }]
            };
        },
        methods: {
            dateFormat:function(row,column){
                let t=new Date(row.news_day);//row 表示一行数据, updateTime 表示要格式化的字段名称
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
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$message({
                            message: '消息发布成功！',
                            type: 'success',
                        });
                        console.log(_this.form)
                        this.$axios.post('http://localhost:8181/news/save',this.form).then(function (resp) {
                            // console.log(resp)
                            if (resp.data == 'success'){
                                _this.reload()
                            }
                        })
                        this.dialogFormVisible = false;  //关闭对话框
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleEdit(row){
                this.dialogFormVisible2 = true
                this.resetForm.news_title = row.news_title
                this.resetForm.news_content = row.news_content
                this.resetForm.user_id = row.user_id
                // this.resetForm.id = row.id   //添加则只修改，不新加
            },
            resetNews(formName){
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$message({
                            message: '修改成功！',
                            type: 'success',
                        });
                        console.log(this.resetForm)
                        this.$axios.put('http://localhost:8181/news/update',this.resetForm).then(function (resp) {
                            console.log(resp)
                            if (resp.data == 'success'){
                                _this.reload()
                            }
                        })
                        this.dialogFormVisible = false;  //关闭对话框
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleDelete(row){  //删除
                const _this = this
                this.$confirm('此操作将永久删除该通知, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$axios.delete('http://localhost:8181/news/deleteById/'+row.id).then(function (resp) {
                        _this.reload()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            open() {
                this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
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
                this.$axios.get('http://localhost:8181/news/findAll/'+currentPage+'/8').then(function (resp) {
                    _this.tableData = resp.data.content
                })
            },

            handleChange(e) {
                if (this.form.userId) {
                    this.form.userId = this.$refs['cascader'].getCheckedNodes()[0].pathLabels[0]
                    console.log(this.form.userId)
                }
            },
            showDetail(row){
                this.dialogFormVisible3 = true
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                myChart.setOption(
                    {
                        title: {
                            text: 'Referer of a Website',
                            subtext: 'Fake Data',
                            left: 'center'
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left'
                        },
                        series: [
                            {
                                name: 'Access From',
                                type: 'pie',
                                radius: '50%',
                                data: [
                                    { value: 1048, name: 'Search Engine' },
                                    { value: 735, name: 'Direct' },
                                    { value: 580, name: 'Email' },
                                    { value: 484, name: 'Union Ads' },
                                    { value: 300, name: 'Video Ads' }
                                ],
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    }
                )

            }
        },
        created() {
            const _this = this
            this.$axios.get('http://localhost:8181/news/findAll/1/8').then(function (resp) {
                // console.log(resp)
                // console.log(resp.data.totalElements)
                _this.tableData = resp.data.content
                _this.total = resp.data.totalElements
            })
        }


    }
</script>

<style>
    .el-form-item__label {
        font-weight: bold;
    }

    .top-btn {
        margin-left: 35px;
        margin-bottom: 8px;
    }

    .footer {
        float: right;
        margin-top: 20px;
        margin-right: 5%;
    }

    .el-cascader-panel {
        height: 200px;
    }
</style>