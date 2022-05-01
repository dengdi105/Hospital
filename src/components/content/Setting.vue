<template>
    <div class="info-set">
        <el-row>
            <el-col :span="7">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>个人信息</span>
                    </div>
                    <div>
                        <div class="text item">
                            <el-avatar shape="circle" :size="100" fit="cover" :src="url"></el-avatar>
                        </div>
                        <el-divider></el-divider>
                        <div class="content">
                            <p><i class="el-icon-c-scale-to-original"></i> 编号<span>{{id}}</span></p>
                            <el-divider></el-divider>
                            <p><i class="el-icon-user"></i> 用户名称<span>{{name}}</span></p>
                            <el-divider></el-divider>
                            <p><i class="el-icon-mobile-phone"></i> 手机号码<span>{{phone}}</span></p>
                            <el-divider></el-divider>
                            <p><i class="el-icon-office-building"></i> 所属部门<span>{{department}}</span></p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="17">
                <el-card class="info-change">
                    <div slot="header" class="clearfix">
                        <span>修改信息</span>
                    </div>
                    <div>
                        <el-tabs type="border-card">
                            <el-tab-pane label="基本信息">
                                <el-form>
                                    <el-form-item label="用户名称" prop="name">
                                        <el-input type="text" v-model="name" autocomplete="off" style="width:80%"
                                                  clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="phone">
                                        <el-input type="text" v-model="phone" style="width:80%" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item class="bottom-btn">
                                        <el-button type="primary">保存</el-button>
                                        <el-button type="danger">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="修改密码">
                                <el-form :label-position="labelPosition">
                                    <el-form-item label="原密码" prop="pass">
                                        <el-input type="password" v-model="password" autocomplete="off"
                                                  style="width:80%" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="新密码" prop="newPass">
                                        <el-input type="password" v-model="new_pass" style="width:80%"
                                                  clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="确认密码" prop="checkPass">
                                        <el-input type="password" v-model="check_pass" autocomplete="off"
                                                  style="width:80%" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item class="bottom-btn">
                                        <el-button type="primary">保存</el-button>
                                        <el-button type="danger">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        data() {
            return {
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                id: '123456789',
                name: '张元',
                phone: '18512345678',
                department: '外科',
                password: '',
                new_pass: '',
                check_pass: '',
                labelPosition: 'right'
            }
        }
    }
</script>

<style scoped>
    .bottom-btn {
        margin-left: 10%;
    }

    .info-change {
        width: 100%;
    }

    .content span {
        float: right
    }

    .text {
        font-size: 14px;
        text-align: center;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 350px;
    }
</style>