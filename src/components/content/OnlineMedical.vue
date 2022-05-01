<template>
    <div>
        <el-container>
            <el-aside width="300px">
                <div class="aside-header">
                    <el-input
                            class="search"
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                            v-model="sa">
                    </el-input>
                </div>
                <div class="aside-main">
                    <ul v-infinite-scroll="load" style="overflow:auto">
                        <li v-for="i in count" class="message">
                            <div class="li-left">
                                <el-avatar shape="square" :size="50" :fit="fit" :src="i.img"></el-avatar>
                            </div>
                            <div class="li-middle">
                                <span class="content">{{i.name}}</span>
                                <span class="content">{{i.lastNews}}</span>
                            </div>
                            <div class="li-right">
                                <span class="li-right-top">{{i.time}}</span>
                                <span class="li-right-bottom">
                  <el-badge :value="i.num" class="item"></el-badge>
                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </el-aside>
            <el-container>
                <el-header>{{selectName}}</el-header>
                <div class="main">
                    <!--            <MessageList/>-->
                    <div class="message-list"></div>
                    <div class="message-input">
                        <textarea placeholder="在此输入内容"></textarea>
                        <div class="bottom-btn">
                            <el-button class="btn-send" type="primary" size="medium">发送</el-button>
                        </div>
                    </div>
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import MessageList from "../common/MessageList";

    export default {
        name: "Online_Medical",
        components: {
            MessageList,
        },
        data() {
            return {
                fit: 'fill',
                selectName: '张三',
                count: [{
                    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    name: '张三',
                    lastNews: 'hello1231321321!',
                    time: '17:20',
                    num: 2
                }, {
                    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    name: '张三',
                    lastNews: 'hello!',
                    time: '22/02/11',
                    num: 1
                }, {
                    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    name: '张三',
                    lastNews: 'hello!',
                    time: '22/02/11',
                    num: 3
                }]
            }
        },
        methods: {
            load() {

            }
        }
    }
</script>

<style scoped>

    .el-header {
        background-color: rgb(245, 245, 245);
        border-bottom: 1px solid #ddd;
        color: #333;
        line-height: 60px;
        font-size: 20px;
    }

    .el-aside {
        background-color: rgb(240, 240, 240);
        color: #333;
        height: 600px;
    }

    .aside-header {
        background-color: rgb(247, 247, 247);
        line-height: 56px;
    }

    .main {
        background-color: rgb(245, 245, 245);
        line-height: 520px;
    }

    .search {
        width: 80%;
        margin: 2px 0 2px 15px;
    }

    .message {
        list-style-type: none;
        margin: 0px 0 5%;
        padding: 0px;
    }

    ul {
        margin: 5% 0 0 6%;
        padding: 0px;
    }

    .li-left {
        display: inline-block;
    }

    .li-middle {
        display: inline-block;
        /*border: 1px solid red;*/
        width: 50%;
        margin-left: 1%;
        line-height: 28px;
        width: 140px;
    }

    .li-right {
        display: inline-block;
        /*border: 1px solid blue;*/
        color: grey;
        font-size: 6px;
        margin-left: 1%;
        line-height: 20px;
        width: 70px;
    }

    .li-right-top {
        display: block;
        margin-bottom: 5px;
        float: right;
    }

    .li-right-bottom {

        margin-left: 50%;
        float: right;
    }

    .content:nth-child(1) {
        display: block;
        margin-left: 5%;
        margin-bottom: 3%;
        font-size: 17px;
        color: black;
    }

    .content:nth-child(2) {
        display: block;
        margin-left: 5%;
        font-size: 14px;
        color: grey;
    }

    .message-list {
        /*border: 1px solid blue;*/
        height: 380px;
    }

    .message-input {
        /*border: 1px solid red;*/
        line-height: 20px;
    }

    .message-input textarea {
        height: 114px;
        width: 99%;
        border: none;
        outline: none;
        font-family: "Micrsofot Yahei";
        resize: none;
    }

    .bottom-btn {
        height: 35px;
        background-color: white;
    }

    .btn-send {
        float: right;
        margin-right: 8%;
    }
</style>