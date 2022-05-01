<template>
    <div>
        <el-container style="height: 735px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(48,65,86)">
                <el-menu :default-openeds="['2','3']" background-color="#545c64" text-color="white" router>
                    <el-menu-item index="/notify">
                        <i class="el-icon-message"></i>
                        <span slot="title">信息通知</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>物资管理</template>
                        <el-menu-item-group>
                            <template slot="title">物资信息</template>
                            <el-menu-item index="/medicine">药物</el-menu-item>
                            <el-menu-item index="/tool">器械</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">操作</template>
                            <el-menu-item index="/inOut">出入库</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-first-aid-kit"></i>挂号就诊</template>
                        <el-menu-item-group>
                            <el-menu-item index="/appointment">
                                <template slot="title">
                                    <i class="el-icon-phone-outline"></i>
                                    <span slot="title">预约挂号
                                        <el-badge class="mark" :value="1" max="99" />
                                    </span>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="/patientInfo"><i class="el-icon-document"></i>病历</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="/online_medical">
                        <i class="el-icon-bell"></i>
                        <span slot="title">在线就医</span>
                    </el-menu-item>
                    <el-menu-item index="/vaccine">
                        <i class="el-icon-suitcase-1"></i>
                        <span slot="title">疫苗接种</span>
                    </el-menu-item>
                    <el-menu-item index="/pie">
                        <i class="el-icon-data-line"></i>
                        <span slot="title">数据统计</span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title">个人设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item
                                v-for="(item,index) in breadList"
                                :key="index"
                                :to="{ path: item.path }"
                        >{{item.name}}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="img">
                        <span class="welcome" v-if="grt=(hour<9?'早上好':hour<12?'上午好':hour<15?'中午好':hour<19?'下午好':'晚上好')">{{grt}}, {{name}} !</span>
                        <el-dropdown @command="handleCommand">
                              <span class="el-dropdown-link">
                                <el-avatar shape="circle" :size="40" fit="cover" :src="url"></el-avatar>
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                              </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-s-home" command="a">个人中心</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-circle-close" command="b">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                hour: '',
                breadList: [],   //路由集合
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                name: '张医生',
            }
        },
        watch: {   //路由改变时监听
            $route() {
                this.getBreadcrumb();
            }
        },
        created() {
            this.getBreadcrumb();
            this.hour = this.getTime();
        },
        methods: {
            getTime() {
                return new Date().getHours();
            },
            isHome(route) {  //首页
                return route.name === "首页";
            },
            getBreadcrumb() {
                let matched = this.$route.matched; //拿到显示的路由路径
                console.log('matched', matched)
                if (!this.isHome(matched[0])) {//当前路由等于首页
                    matched = [{path: "/home", meta: {title: "首页"}}].concat(matched);
                }
                this.breadList = matched;
            },
            handleCommand(command) {
                if(command=='a')
                    this.$router.push("/setting");
                else {
                    this.$router.push("/login");
                }
            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-breadcrumb {
        margin-top: 20px;
        font-size: 18px;
        display: inline-block;
        float: left;
    }

    .el-breadcrumb >>> .el-breadcrumb__separator {
        color: black;
    }

    .img {
        display: inline-block;
        margin-top: 10px;
        margin-right: 10px;
    }

    .el-icon--right {
        color: black;
    }

    .welcome {
        font-size: 18px;
        margin-right: 20px;
    }

    .el-badge >>> .el-badge__content {
        margin: 0 0 5px 5px;
    }
</style>