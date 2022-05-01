<template>
    <div>
        <div class="header">
            <el-form :inline="true">
                <el-form-item label="药品名称" prop="name">
                    <el-input type="text" v-model="search_name" placeholder="请输入药品名称" style="width:95%"
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
                            <el-form-item label="药物名称" label-width="70px">
                                <el-input v-model="form.drugName" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="品牌" label-width="50px" class="form-right">
                                <el-input v-model="form.drug_brand" type="text" :rows='3' autocomplete="off"></el-input>
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
                            <el-form-item label="价格" label-width="50px">
                                <el-input-number v-model="form.drug_price" @change="handleChangePrice" :min="1" :max="1000"
                                                 :precision="2"></el-input-number>
                            </el-form-item>
                            <el-form-item label="数量" label-width="50px" class="form-right">
                                <el-input-number v-model="form.drug_num" @change="handleChangeNum" :min="1"
                                                 :max="100000"></el-input-number>
                            </el-form-item>
                            <br/>
                            <el-form-item label="剂型" label-width="50px">
                                <el-select v-model="form.drug_kind" placeholder="请选择">
                                    <el-option label="颗粒" value="颗粒"></el-option>
                                    <el-option label="溶液" value="溶液"></el-option>
                                    <el-option label="喷雾" value="喷雾"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="类别" label-width="50px" class="form-right">
                                <el-select v-model="form.drug_type" placeholder="请选择">
                                    <el-option label="口服" value="口服"></el-option>
                                    <el-option label="外用" value="外用"></el-option>
                                </el-select>
                            </el-form-item>
                            <br/>
                            <el-form-item label="生产日期" label-width="70px">
                                <el-date-picker v-model="form.drug_ctime" type="datetime"
                                                placeholder="选择日期时间"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="过期时间" label-width="7 0px" class="form-right">
                                <el-date-picker v-model="form.drug_etime" type="datetime"
                                                placeholder="选择日期时间"></el-date-picker>
                            </el-form-item>
                            <br/>
                            <el-form-item label="厂商名称" label-width="70px">
                                <el-input v-model="form.drug_cname" type="text" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="厂商地址" label-width="70px" class="form-right">
                                <el-input v-model="form.drug_address" type="text" autocomplete="off"></el-input>
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
<!--                        prop="drug_id"-->
<!--                        label="药品编号"-->
<!--                        width="140">-->
<!--                </el-table-column>-->
                <el-table-column
                        prop="drugName"
                        label="名称"
                        width="130"
                        show-overflow-tooltip
                >
                </el-table-column>
<!--                <el-table-column-->
<!--                        prop="drug_img"-->
<!--                        label="药品图片"-->
<!--                        width="120"-->
<!--                >-->
<!--                </el-table-column>-->
                <el-table-column
                        prop="drug_brand"
                        label="品牌"
                        width="120"
                        show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                        prop="drug_cname"
                        label="厂商名称"
                        width="150"
                        show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                        prop="drug_price"
                        label="进货价"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="drug_num"
                        label="数量"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="total_price"
                        label="进货金额"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="in_time"
                        label="入库时间"
                        width="160"
                        sortable
                        :formatter="dateFormat"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        prop="name"
                        label="操作"
                        width="180"
                >
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)">修改
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
    </div>
</template>

<script>
    export default {
        name: "In",
        inject:['reload'],
        data() {
            return {
                search_name: '',
                search_brand: '',
                total:'',
                tableData: [
                    {
                        id:'',
                        drug_id:'',
                        drugName:'',
                        drug_img:'',
                        drug_brand:'',  //品牌
                        drug_cname:'',   //厂商名称
                        drug_price:'',
                        drug_num:'',
                        total_price:'',
                        in_time:''
                    }
                ],
                multipleSelection: [],
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    id:'',
                    drugName:'',
                    drug_brand:'',  //品牌
                    drug_img:'',
                    drug_price:'',
                    drug_num:'',
                    drug_kind:'',   //剂型
                    drug_type:'',  //类别
                    drug_ctime:'',  //生产日期
                    drug_etime:'',
                    drug_cname:'',   //厂商名称
                    drug_address: ''
                },
                imageUrl: '',
                //校验规则
                rules:{
                    drugName: [
                        {required:true,message:'请输入名称',trigger:'blur'}
                    ],
                    drug_brand: [
                        {required:true,message:'请输入品牌',trigger:'blur'}
                    ],
                    drug_cname: [
                        {required:true,message:'请输入厂商名称',trigger:'blur'}
                    ],
                    drug_address: [
                        {required:true,message:'请输入厂商地址',trigger:'blur'}
                    ],
                },
                props: {multiple: true},

            };
        },
        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$message({
                            message: '入库成功！',
                            type: 'success',
                        });
                        // console.log(_this.form)
                        this.$axios.post('http://localhost:8181/drugs/save',this.form).then(function (resp) {
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
            handleDelete(row){  //删除
                const _this = this
                this.$confirm('将永久删除该药物信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$axios.delete('http://localhost:8181/drugs/deleteById/'+row.id).then(function (resp) {
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
                console.log(value)
                this.form.drug_price = value
            },
            handleChangeNum(value){
                console.log(value)
                this.form.drug_num = value
            },
            dateFormat:function(row,column){
                let t=new Date(row.in_time);//row 表示一行数据, updateTime 表示要格式化的字段名称
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
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        },
        created() {
            const _this = this
            this.$axios.get('http://localhost:8181/drugs/findAll/1/8').then(function (resp) {
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