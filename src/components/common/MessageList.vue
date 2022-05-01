<template>
    <div class="m-message">
        <ul>
            <li>
                <p class="time"><span>18:01</span></p>
                <div class="main">
                    <img class="avatar" width="30" height="30"
                         src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
                    <div class="text">asdasdad</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "MessageList"
    }
</script>

<style scoped>
    .m-message {
        padding: 10px 15px;
        overflow-y: scroll;
    }

    li {
        margin-bottom: 15px;
    }

    .time {
        margin: 7px 0;
        text-align: center;
    }

    .time span {
        display: inline-block;
        padding: 0 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
    }

    .avatar {
        float: left;
        margin: 0 10px 0 0;
        border-radius: 3px;
    }

    .text {
        display: inline-block;
        position: relative;
        padding: 0 10px;
        max-width: calc(100% - 40px);
        min-height: 30px;
        line-height: 2.5;
        font-size: 12px;
        text-align: left;
        word-break: break-all;
        background-color: #fafafa;
        border-radius: 4px;
    }

    .text:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
    }
</style>