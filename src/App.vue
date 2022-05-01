<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
    import Login from "./views/Login";

    export default {
        name: 'App',
        components: {
            Login
        },
        data() {
            return {
                isRouterAlive :true
            }
        },
        provide(){
            return {
                reload: this.reload
            }
        },
        methods:{
            reload() {
                this.isRouterAlive = false
                this.$nextTick(function () {
                    this.isRouterAlive = true
                })
            }
        }
    }
</script>

<style>

</style>
