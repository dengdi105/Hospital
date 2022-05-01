<template>
    <div>
        <el-container style="height: 735px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: #545c64">
                <el-menu :default-openeds="['2']" background-color="#545c64" text-color="white" router>
                    <el-menu-item index="/manageUsers">
                        <i class="el-icon-user"></i>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/manageMoney">
                        <i class="el-icon-coin"></i>
                        <span slot="title">账单管理</span>
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
                    <el-button icon="el-icon-switch-button" circle></el-button>
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
        name: "Manager",
        data() {
            return {
                hour: '',
                breadList: [],   //路由集合
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                name: 'D-D',
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
                    matched = [{path: "/management", meta: {title: "首页"}}].concat(matched);
                }
                this.breadList = matched;
            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: rgb(253, 253, 253);
        color: #333;
        line-height: 60px;
    }

    .el-main {
        background-color: rgb(245, 245, 245);
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

    .el-icon--right {
        color: black;
    }

</style>