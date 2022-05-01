<template>
    <div>
        <div class="header">
            <el-form :inline="true">
                <el-form-item label="账号" prop="title">
                    <el-input type="text" v-model="search_title" placeholder="请输入账号" style="width:95%"
                              clearable></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="time">
                    <el-input type="text" v-model="search_title" placeholder="请输入姓名" style="width:95%"
                              clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
                    <el-button type="reset" icon="el-icon-refresh" size="small">重置</el-button>
                </el-form-item>
                <el-button class="btn-add" @click="dialogFormVisible = true" icon="el-icon-plus" plain size="medium">
                    添加
                </el-button>
            </el-form>
            <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="500px" v-if="isFirst">
                <el-form :model="addForm1"  ref="resetForm" label-width="30px">
                    <el-form-item label="账号" label-width="70px" prop="userId">
                        <el-input v-model="addForm1.userId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" label-width="70px" prop="userName">
                        <el-input v-model="addForm1.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" label-width="70px" prop="userPwd">
                        <el-input v-model="addForm1.userPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" label-width="70px">
                        <el-select v-model="addForm1.userSex" placeholder="请选择">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="昵称" label-width="70px" prop="userNickname">
                        <el-input v-model="addForm1.userNickname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="专业" label-width="70px" prop="userMajor">
                        <el-input v-model="addForm1.userMajor" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" label-width="70px" prop="userPhone">
                        <el-input v-model="addForm1.userPhone" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addUser('addForm1')">添加</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog title="添加医生" :visible.sync="dialogFormVisible" width="500px" v-if="isSecond">
                <el-form :model="addForm2"  ref="resetForm" label-width="30px">
                    <el-form-item label="账号" label-width="70px" prop="doctorId">
                        <el-input v-model="addForm2.doctorId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" label-width="70px" prop="doctorName">
                        <el-input v-model="addForm2.doctorName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" label-width="70px" prop="doctorPass">
                        <el-input v-model="addForm2.doctorPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" label-width="70px" prop="hospitalDepartment">
                        <el-input v-model="addForm2.hospitalDepartment" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" label-width="70px" prop="departmentPhone">
                        <el-input v-model="addForm2.departmentPhone" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addUser2('addForm2')">添加</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="会员管理" name="first" :key="first">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        height="450px"
                        @selection-change="handleSelectionChange"
                        v-if="isFirst">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="userId"
                            label="账号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="userPwd"
                            label="密码"
                            width="120"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="姓名"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="userSex"
                            label="性别"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="userNickname"
                            label="昵称"
                            width="120"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="userMajor"
                            label="专业"
                            width="150"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="userPhone"
                            label="手机号"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="操作"
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
                                    @click="handleDeleteUser(scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="医生管理" name="second" :key="second">
                <el-table
                        ref="multipleTable"
                        :data="tableData2"
                        tooltip-effect="dark"
                        style="width: 100%"
                        height="450px"
                        @selection-change="handleSelectionChange"
                        v-if="isSecond">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="doctorId"
                            label="账号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="doctorPass"
                            label="密码"
                            width="120"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="doctorName"
                            label="姓名"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="hospitalDepartment"
                            label="部门"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="departmentPhone"
                            label="手机号"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="department"
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    icon="el-icon-edit"
                                    @click="handleEdit2(scope.row)">修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="handleDeleteDoctor(scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <div class="footer">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    page-size="8"
                    :total="total">
            </el-pagination>
        </div>
        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible1" width="500px">
            <el-form :model="resetForm1"  ref="resetForm" label-width="30px">
                <el-form-item label="账号" label-width="70px" prop="userId">
                    <el-input v-model="resetForm1.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="70px" prop="userName">
                    <el-input v-model="resetForm1.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="70px" prop="userPwd">
                    <el-input v-model="resetForm1.userPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" label-width="70px">
                    <el-select v-model="resetForm1.userSex" placeholder="请选择">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="昵称" label-width="70px" prop="userNickname">
                    <el-input v-model="resetForm1.userNickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业" label-width="70px" prop="userMajor">
                    <el-input v-model="resetForm1.userMajor" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="70px" prop="userPhone">
                    <el-input v-model="resetForm1.userPhone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="resetUser('resetForm1')">修改</el-button>
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改医生信息" :visible.sync="dialogFormVisible2" width="500px">
            <el-form :model="resetForm2"  ref="resetForm" label-width="30px">
                <el-form-item label="账号" label-width="70px" prop="doctorId">
                    <el-input v-model="resetForm2.doctorId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="70px" prop="doctorName">
                    <el-input v-model="resetForm2.doctorName"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="70px" prop="doctorPass">
                    <el-input v-model="resetForm2.doctorPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门" label-width="70px" prop="hospitalDepartment">
                    <el-input v-model="resetForm2.hospitalDepartment" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="70px" prop="departmentPhone">
                    <el-input v-model="resetForm2.departmentPhone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="resetUser2('resetForm2')">修改</el-button>
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "manageUsers",
        inject:['reload'],
        data() {
            return {
                activeName: 'first',
                isFirst: true,
                isSecond: false,
                total:'',
                tableData:[
                    {
                        id:'',
                        userId:'',
                        userName:'',
                        userPwd:'',
                        userStatus:'',
                        userSex:'',
                        userNickname:'',
                        userMajor:'',
                        userPhone:''
                    }
                ],
                tableData2:[
                    {
                        id:'',
                        doctorId:'',
                        doctorName:'',
                        doctorPass:'',
                        departmentPhone:'',
                        hospitalDepartment:'',
                    }
                ],
                //修改表单
                resetForm1:{
                    id:'',
                    userId:'',
                    userName:'',
                    userPwd:'',
                    userStatus:'',
                    userSex:'',
                    userNickname:'',
                    userMajor:'',
                    userPhone:''
                },
                resetForm2:{
                    id:'',
                    doctorId:'',
                    doctorName:'',
                    doctorPass:'',
                    departmentPhone:'',
                    hospitalDepartment:'',
                },
                addForm1:{
                    userId:'',
                    userName:'',
                    userPwd:'',
                    userStatus:'',
                    userSex:'',
                    userNickname:'',
                    userMajor:'',
                    userPhone:''
                },
                addForm2:{
                    doctorId:'',
                    doctorName:'',
                    doctorPass:'',
                    departmentPhone:'',
                    hospitalDepartment:'',
                },
                multipleSelection: [],
                dialogFormVisible2:false,
                dialogFormVisible1:false,
                dialogFormVisible:false
            }
        },

        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClick(tab) {
                if (tab.name === 'first') {
                    this.isFirst = true
                    this.isSecond = false
                    console.log(1)
                } else if (tab.name === 'second') {
                    this.isFirst = false
                    this.isSecond = true
                    // console.log(2)
                    const _this = this
                    this.$axios.get('http://localhost:8181/doctor/findAll/1/8').then(function (resp) {
                        _this.tableData2 = resp.data.content
                        _this.total = resp.data.totalElements
                    })
                }
            },
            handleDeleteUser(row){  //删除
                const _this = this
                this.$confirm('将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$axios.delete('http://localhost:8181/user/deleteById/'+row.id).then(function (resp) {
                        _this.reload()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleDeleteDoctor(row){  //删除
                const _this = this
                this.$confirm('将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$axios.delete('http://localhost:8181/doctor/deleteById/'+row.id).then(function (resp) {
                        _this.reload()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleEdit(row){
                this.dialogFormVisible1 = true
                this.resetForm1.userId = row.userId
                this.resetForm1.userName = row.userName
                this.resetForm1.userPwd = row.userPwd
                this.resetForm1.userName = row.userName
                this.resetForm1.userSex = row.userSex
                this.resetForm1.userNickname = row.userNickname
                this.resetForm1.userMajor = row.userMajor
                this.resetForm1.userPhone = row.userPhone
                this.resetForm1.id = row.id
            },
            handleEdit2(row){
                this.dialogFormVisible2 = true
                this.resetForm2.id = row.id
                this.resetForm2.doctorId = row.doctorId
                this.resetForm2.doctorName = row.doctorName
                this.resetForm2.doctorPass = row.doctorPass
                this.resetForm2.departmentPhone = row.departmentPhone
                this.resetForm2.hospitalDepartment = row.hospitalDepartment
            },
            resetUser(formName){
                const _this = this

                _this.$message({
                    message: '修改成功！',
                    type: 'success',
                });
                console.log(this.resetForm1)
                this.$axios.put('http://localhost:8181/user/update',this.resetForm1).then(function (resp) {
                    console.log(resp)
                    if (resp.data == 'success'){
                        _this.reload()
                    }
                })
                this.dialogFormVisible1 = false;  //关闭对话框
            },
            resetUser2(formName){
                const _this = this
                _this.$message({
                    message: '修改成功！',
                    type: 'success',
                });
                console.log(this.resetForm1)
                this.$axios.put('http://localhost:8181/doctor/update',this.resetForm2).then(function (resp) {
                    console.log(resp)
                    if (resp.data == 'success'){
                        _this.reload()
                    }
                })
                this.dialogFormVisible2 = false;  //关闭对话框
            },
            addUser(formName) {
                const _this = this
                _this.$message({
                    message: '消息发布成功！',
                    type: 'success',
                });
                this.$axios.post('http://localhost:8181/user/save', this.addForm1).then(function (resp) {
                    // console.log(resp)
                    if (resp.data == 'success') {
                        _this.reload()
                    }
                })
                this.dialogFormVisible = false;  //关闭对话框
            },
            addUser2(formName) {
                const _this = this
                _this.$message({
                    message: '消息发布成功！',
                    type: 'success',
                });
                console.log(_this.form)
                this.$axios.post('http://localhost:8181/doctor/save', this.addForm2).then(function (resp) {
                    // console.log(resp)
                    if (resp.data == 'success') {
                        _this.reload()
                    }
                })
                this.dialogFormVisible = false;  //关闭对话框
            }
        },
        created() {
            const _this = this
            this.$axios.get('http://localhost:8181/user/findAll/1/8').then(function (resp) {
                console.log(resp.data.content)
                _this.tableData = resp.data.content
                _this.total = resp.data.totalElements
            })
        }
    }
</script>

<style scoped>
    .btn-add {
        margin-bottom: 1%;
        margin-left: 10%;
    }

    .footer {
        float: right;
        margin-top: 20px;
        margin-right: 5%;
    }
</style>