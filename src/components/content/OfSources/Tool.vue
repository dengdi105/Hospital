<template>
    <div>
        <div class="header">
            <el-form :inline="true">
                <el-form-item label="器械名称" prop="name">
                    <el-input type="text" v-model="search_name" placeholder="请输入器械名称" style="width:95%"
                              clearable></el-input>
                </el-form-item>
                <el-form-item label="品牌" prop="brand">
                    <el-input v-model="search_brand" type="text" placeholder="请输入品牌"></el-input>
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
                        入库
                    </el-button>
                    <el-button type="danger" @click="open" icon="el-icon-delete" plain size="medium">删除</el-button>
                    <el-dialog title="入库信息" :visible.sync="dialogFormVisible" width="45%" top="5vh">
                        <el-form :model="form" :inline="true" :rules="rules" ref="form">
                            <el-form-item label="器械名称" label-width="70px">
                                <el-input v-model="form.tool_name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="品牌" label-width="50px" class="form-right">
                                <el-input v-model="form.tool_brand" type="text" :rows='3' autocomplete="off"></el-input>
                            </el-form-item>
                            <br/>
                            <el-form-item label="图片" label-width="50px">
                                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <br/>
                            <el-form-item label="生产日期" label-width="70px">
                                <el-date-picker v-model="form.tool_ctime" type="datetime"
                                                placeholder="选择日期时间"></el-date-picker>
                            </el-form-item>
                            <br/>
                            <br/>
                            <el-form-item label="价格" label-width="50px">
                                <el-input-number v-model="form.tool_price" @change="handleChangePrice" :min="1" :max="1000"
                                                 :precision="2"></el-input-number>
                            </el-form-item>
                            <el-form-item label="数量" label-width="50px" class="form-right">
                                <el-input-number v-model="form.tool_num" @change="handleChangeNum" :min="1"
                                                 :max="100000"></el-input-number>
                            </el-form-item>
                            <br/>
                            <el-form-item label="厂商名称" label-width="70px">
                                <el-input v-model="form.tool_cname" type="text" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="厂商地址" label-width="70px" class="form-right">
                                <el-input v-model="form.tool_address" type="text" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="submitForm('form')">添加</el-button>
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
                    height="450"
                    stripe
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
<!--                <el-table-column-->
<!--                        prop="tool_id"-->
<!--                        label="器械编号"-->
<!--                        width="140">-->
<!--                </el-table-column>-->
                <el-table-column
                        prop="tool_name"
                        label="名称"
                        width="130"
                        show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                        prop="tool_brand"
                        label="品牌"
                        width="120"
                        show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                        prop="tool_ctime"
                        label="生产日期"
                        width="100"
                        :formatter="dateFormat"
                >
                </el-table-column>
                <el-table-column
                        prop="tool_cname"
                        label="厂商名称"
                        width="150"
                        show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                        prop="tool_address"
                        label="厂商地址"
                        width="120"
                        show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                        prop="tool_img"
                        label="器械图片"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        prop="tool_price"
                        label="价格"
                        sortable
                >
                    <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.tool_price }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tool_num"
                        label="数量"
                        sortable
                >
                    <template slot-scope="scope">
                        <el-tag type="danger" size="medium">{{ scope.row.tool_num }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="操作"
                        width="178"
                >
                    <template slot-scope="scope">
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
                    :total="total">
            </el-pagination>
        </div>
<!--        修改框-->
        <el-dialog title="修改器械信息" :visible.sync="dialogFormVisible2" width="45%" top="5vh">
            <el-form :model="resetForm" :inline="true" :rules="rules" ref="resetForm">
                <el-form-item label="器械名称" label-width="70px">
                    <el-input v-model="resetForm.tool_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="品牌" label-width="50px" class="form-right">
                    <el-input v-model="resetForm.tool_brand" type="text" :rows='3' autocomplete="off"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="生产日期" label-width="70px">
                    <el-date-picker v-model="resetForm.tool_ctime" type="datetime"
                                    placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <br/>
                <br/>
                <el-form-item label="价格" label-width="50px">
                    <el-input-number v-model="resetForm.tool_price" @change="handleChangePrice" :min="1" :max="1000"
                                     :precision="2"></el-input-number>
                </el-form-item>
                <el-form-item label="数量" label-width="50px" class="form-right">
                    <el-input-number v-model="resetForm.tool_num" @change="handleChangeNum" :min="1"
                                     :max="100000"></el-input-number>
                </el-form-item>
                <br/>
                <el-form-item label="厂商名称" label-width="70px">
                    <el-input v-model="resetForm.tool_cname" type="text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="厂商地址" label-width="70px" class="form-right">
                    <el-input v-model="resetForm.tool_address" type="text" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="resetTools('resetForm')">修改</el-button>
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Tool",
        inject:['reload'],
        data() {
            return {
                search_name: '',
                search_brand: '',
                total:'',   //数据数量
                //校验规则
                rules:{
                    tool_name: [
                        {required:true,message:'请输入名称',trigger:'blur'}
                    ],
                    tool_brand: [
                        {required:true,message:'请输入品牌',trigger:'blur'}
                    ],
                    tool_cname: [
                        {required:true,message:'请输入厂商名称',trigger:'blur'}
                    ]
                },
                tableData: [
                    {
                        id:'',
                        tool_id:'',
                        tool_name:'',
                        tool_brand:'',
                        tool_ctime:'',
                        tool_cname:'', //厂商名称
                        tool_address:'',
                        tool_img:'',
                        tool_price:'',
                        tool_num:''
                    }
                ],
                //添加表单
                form: {
                    id:'',
                    tool_id:'',
                    tool_name:'',
                    tool_brand:'',
                    tool_ctime:'',
                    tool_cname:'', //厂商名称
                    tool_address:'',
                    tool_img:'',
                    tool_price:'',
                    tool_num:''
                },
                //修改表单
                resetForm:{
                    id:'',
                    tool_id:'',
                    tool_name:'',
                    tool_brand:'',
                    tool_ctime:'',
                    tool_cname:'', //厂商名称
                    tool_address:'',
                    tool_img:'',
                    tool_price:'',
                    tool_num:''
                },
                dialogFormVisible: false,
                dialogFormVisible2: false,
            }
        },
        methods: {
            dateFormat:function(row){
                let t=new Date(row.tool_ctime);//row 表示一行数据, updateTime 表示要格式化的字段名称
                let year=t.getFullYear(),
                    month=t.getMonth()+1,
                    day=t.getDate();
                let newTime=year+'-'+
                    (month<10?'0'+month:month)+'-'+
                    (day<10?'0'+day:day);
                return newTime;
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
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$message({
                            message: '入库成功！',
                            type: 'success',
                        });
                        // console.log(_this.form)
                        this.$axios.post('http://localhost:8181/tools/save',this.form).then(function (resp) {
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
                this.resetForm.id = row.id
                this.resetForm.tool_name = row.tool_name
                this.resetForm.tool_brand = row.tool_brand
                this.resetForm.tool_ctime = row.tool_ctime
                this.resetForm.tool_cname = row.tool_cname
                this.resetForm.tool_address = row.tool_address
                this.resetForm.tool_price = row.tool_price
                this.resetForm.tool_num = row.tool_num
            },
            resetTools(formName){
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$message({
                            message: '修改成功！',
                            type: 'success',
                        });
                        console.log(this.resetForm)
                        this.$axios.put('http://localhost:8181/tools/update',this.resetForm).then(function (resp) {
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
                    this.$axios.delete('http://localhost:8181/tools/deleteById/'+row.id).then(function (resp) {
                        _this.reload()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleChangePrice(value){
                // console.log(value)
                this.form.tool_price = value
            },
            handleChangeNum(value){
                // console.log(value)
                this.form.tool_num = value
            },
        },
        created() {
            const _this = this
            this.$axios.get('http://localhost:8181/tools/findAll/1/8').then(function (resp) {
                // console.log(resp)
                // console.log(resp.data.totalElements)
                _this.tableData = resp.data.content
                _this.total = resp.data.totalElements
            })
        }
    }
</script>

<style scoped>
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

    .avatar-uploader .el-upload {
        border: 1px dashed red;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .form-right {
        float: right;
    }


</style>