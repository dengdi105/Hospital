<template>
    <div>
        <div class="header">
            <el-form :inline="true" :model="search_form">
                <el-form-item label="姓名" prop="title">
                    <el-input type="text" v-model="search_form.name" placeholder="请输入姓名" style="width:95%"
                              clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="接种次数">
                    <el-select v-model="search_form.num" placeholder="请选择">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
                    <el-button type="reset" icon="el-icon-refresh" size="small">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="main">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    stripe
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="user_id"
                        label="学号"
                        width="170"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="user_name"
                        label="姓名"
                        show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="user_phone"
                        label="手机号"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="yuyue_num"
                        width="100"
                        label="预约次数"
                >
                    <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.yuyue_num }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="jiezhong_num"
                        width="100"
                        label="接种次数"
                >
                    <template slot-scope="scope">
                        <el-tag type="danger" size="medium">{{ scope.row.jiezhong_num }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="first_time"
                        label="接种时间"
                        align="center"
                        width="300"
                >
                        <el-table-column
                                prop="first_time"
                                width="110"
                                label="第一次"
                                :formatter="dateFormat"
                        ></el-table-column>
                        <el-table-column
                                prop="second_time"
                                width="110"
                                label="第二次"
                                :formatter="dateFormat2"
                        ></el-table-column>
                        <el-table-column
                                prop="thired_time"
                                width="110"
                                label="第三次"
                                :formatter="dateFormat3"
                        ></el-table-column>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="操作"
                        align="center"
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
    </div>
</template>

<script>
    export default {
        name: "Vaccine",
        data(){
            return{
                activeNames: ['1'],
                search_form:{
                    name:'',
                    num:'',
                },
                tableData:{
                    id:'',
                    user_id:'',
                    user_name:'',
                    user_phone:'',
                    yuyue_num:'',
                    jiezhong_num:'',
                    first_time:'',
                    second_time:'',
                    thired_time:'',
                }
            }
        },
        methods:{
            dateFormat:function(row,num){
                // let t = new Date()
                // if(num == 1)
                //    t=new Date(row.first_time);//row 表示一行数据, updateTime 表示要格式化的字段名称
                // if(num == 2)
                //     t=new Date(row.second_time);
                // if(num == 3)
                //     t=new Date(row.thired_time);
                let t = new Date(row.first_time)
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
            dateFormat2:function(row){
                let t = new Date(row.second_time)
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
            dateFormat3:function(row){
                let t = new Date(row.thired_time)
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

        },
        created() {
            const _this = this
            this.$axios.get('http://localhost:8181/yimiao/findAll/1/8').then(function (resp) {
                console.log(resp)
                // console.log(resp.data.totalElements)
                _this.tableData = resp.data.content
                // _this.total = resp.data.totalElements
            })
        }
    }
</script>

<style scoped>
    .el-form-item__label {
        font-weight: bold;
    }
</style>