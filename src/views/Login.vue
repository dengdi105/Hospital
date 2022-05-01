<template>
    <div class="Login-container">
        <el-tabs type="border-card" >
            <el-tab-pane label="医生登录">
                <el-form class="Rule-Form" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                         :label-position="labelPosition">
                    <h3 class="title">医生 DOCTOR</h3>
                    <el-form-item label="账号" prop="counter">
                        <el-input type="text" v-model="ruleForm.doctorId" prefix-icon="el-icon-user" style="width:80%"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.doctorPass" autocomplete="off" prefix-icon="el-icon-lock"
                                  style="width:80%" clearable></el-input>
                    </el-form-item>

                    <el-form-item class="bottom-btn">
                        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="管理员登录">
                <el-form class="Rule-Form" :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px"
                         :label-position="labelPosition">
                    <h3 class="title">管理员 MANAGER</h3>
                    <el-form-item label="账号" prop="counter">
                        <el-input type="text" v-model="ruleForm2.doctorId" prefix-icon="el-icon-user" style="width:80%"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm2.doctorPass" autocomplete="off" prefix-icon="el-icon-lock"
                                  style="width:80%" clearable></el-input>
                    </el-form-item>

                    <el-form-item class="bottom-btn">
                        <el-button type="primary" @click="login2('ruleForm')">登录</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
    name: "Login",
    data() {
        return {
            labelPosition: 'right',
            ruleForm: {
                doctorId:'',
                doctorPass:''
            },
            ruleForm2:{
                doctorId:'',
                doctorPass:''
            },
            rules: {
                userId: [
                    {required:true,message:'请输入账号',trigger:'blur'}
                ],
                userPwd: [
                    {required:true,message:'请输入密码',trigger:'blur'}
                ],
                doctorId: [
                    {required:true,message:'请输入账号',trigger:'blur'}
                ],
                doctorPass: [
                    {required:true,message:'请输入密码',trigger:'blur'}
                ],
            }
        };
    },
    methods: {
        login(formName){
            const _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('http://localhost:8181/doctor/login',this.ruleForm).then(function (resp) {
                        console.log(resp)
                        if (resp.data == 'success'){
                            _this.$message({
                                message: '登录成功！',
                                type: 'success',
                            });
                           _this.$router.replace("/notify")
                        }else{
                            _this.$message({
                                message: '输入有误！',
                                type: 'error',
                            });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        login2(formName){
            const _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('http://localhost:8181/doctor/login',this.ruleForm2).then(function (resp) {
                        console.log(resp)
                        if (resp.data == 'success'){
                            _this.$message({
                                message: '登录成功！',
                                type: 'success',
                            });
                            _this.$router.replace("/manageUsers")
                        }else{
                            _this.$message({
                                message: '输入有误！',
                                type: 'error',
                            });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>
    .Login-container {
        /*background: url("../assets/img/login.png");*/
        width: 100%;
        height: 100%;
        position: absolute;
        margin-top: -15px;
        margin-left: -15px;
        background-size: 100% 100%;
        box-shadow: 0 0 25px #cac6c6;
        background-clip: padding-box;
        border: 1px solid #eaeaea;

        text-align: center;

        height: 100vh;
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradientBG 15s ease infinite;
    }

    >>> .el-tabs--border-card{
        width: 40%;
        position: absolute;
        margin: 10% 30%;
    }

    .Rule-Form {
        background-color:white ;
        border: 2px solid #DCDFE6;
        border-radius: 8px;
        margin: 2% auto;
        width: 90%;
        text-align: center;
    }

    .bottom-btn{
        position: relative;
        margin-left: 20px;
    }

    .title {
        text-align: center;

    }

    >>> .el-tabs__content {
        background-color: rgb(247,247,247);
    }


    @keyframes gradientBG {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    h1 {
        font-weight: 300;
    }

    h5 {
        color:#eee;
        font-weight:300;
    }

    a,
    a:hover {
        text-decoration: none;
        color: #ddd;
    }

</style>