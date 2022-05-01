<template>
    <div>
        <el-divider content-position="left">病历单</el-divider>
        <div class="top">
            <div class="top-btn">
                <template>
                    <el-descriptions class="margin-top"  :column="3" :size="size" border>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-user"></i>
                                姓名
                            </template>
                            {{form.userName}}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-mobile-phone"></i>
                                学号
                            </template>
                            {{form.userId}}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-user"></i>
                                性别
                            </template>
                            男
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-user"></i>
                                医生
                            </template>
                            张医生
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-tickets"></i>
                                科室
                            </template>
                            <el-select v-model="form.departmentName" placeholder="请选择" >
                                <el-option label="内科" value="内科"></el-option>
                                <el-option label="外科" value="外科"></el-option>
                                <el-option label="眼科" value="眼科"></el-option>
                                <el-option label="耳科" value="耳科"></el-option>
                                <el-option label="鼻科" value="鼻科"></el-option>
                                <el-option label="皮肤科" value="皮肤科"></el-option>
                                <el-option label="骨科" value="骨科"></el-option>
                            </el-select>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-user"></i>
                                操作
                            </template>
                            <el-button type="success" size="small" @click="add">就诊意见</el-button>
                        </el-descriptions-item>
                    </el-descriptions>
                    <el-dialog title="就诊意见" :visible.sync="dialogFormVisible">
                        <el-form :model="form"  ref="form">
                            <el-form-item label="患者情况" label-width="70px" prop="news_title">
                                <el-input v-model="form.seeContent" autocomplete="off" type="textarea" :rows='3'></el-input>
                            </el-form-item>
                            <el-form-item label="就诊结果" label-width="70px" prop="news_title">
                                <el-input v-model="form.seeResult" autocomplete="off" type="textarea" :rows='3'></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="submitForm('form')">添加</el-button>
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                        </div>
                    </el-dialog>
                </template>
            </div>
        </div>
        <el-divider content-position="left" >药物清单</el-divider>
        <div class="medium">
            <div class="medicine" >
                <el-form :inline="true">
                    <el-form-item prop="brand">
                        <el-input  type="text" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="medium-left">
                <el-table
                        ref="multipleTable"
                        :data="medicine_form"
                        tooltip-effect="dark"
                        style="width: 100%"
                        height="300"
                        stripe
                >
                    <el-table-column
                            prop="drugName"
                            label="名称"
                            width="130"
                            show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                            prop="drug_price"
                            label="价格"
                            sortable
                    >
                    </el-table-column>
                    <el-table-column
                            prop="drug_num"
                            label="数量"
                            sortable
                    >
                        <template slot-scope="scope">
                            <el-tag type="danger"  effect="plain"size="medium">{{ scope.row.drug_num }}</el-tag>
                        </template>
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
                                    icon="el-icon-plus"
                                    @click="addMedicine(scope.row)">添加
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="footer_med">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :page-size="4"
                            layout="total, prev, pager, next"
                            :total="totalOfMed">
                    </el-pagination>
                </div>
            </div>
            <div class="medium-right">
                <!--                        v-for="(item,index) in medicineList"-->
                <el-table
                        ref="multipleTable"
                        :data="medicineList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        height="300"
                        stripe
                >
                    <el-table-column
                            prop="drugName"
                            label="名称"
                            width="130"
                            show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                            prop="drug_price"
                            label="单价"
                            sortable
                    >
                    </el-table-column>
                    <el-table-column
                            prop="num"
                            label="数量"
                            sortable
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
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="deleteMedicine(scope.row)">移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </div>
        </div>
        <el-divider content-position="left">过往病历</el-divider>
        <div class="bottom">
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
                        width="150"
                        prop="userId"
                        label="学号"
                >
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="userName"
                        label="姓名"
                >
                </el-table-column>
                <el-table-column
                        width="120"
                        prop="departmentName"
                        label="科室"
                >
                    <template slot-scope="scope">
                        <el-tag size="medium" type="danger" effect="plain">{{ scope.row.departmentName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        width="220"
                        prop="seeContent"
                        label="就诊内容"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="seeResult"
                        label="就诊结果"
                        show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                        prop="seeDay"
                        label="就诊时间"
                        width="170"
                        sortable
                        :formatter="dateFormat">
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
        name: "PatientInfo",
        inject:['reload'],
        data(){
            return{
                total:'',   //数据数量
                totalOfMed:'',
                id:this.$route.params.id,   //预约号
                userId:this.$route.params.userID,
                tableData: [
                {
                        id:'',
                        userId:'',
                        userName:'',
                        departmentName:'',   //就诊科室
                        seeDay:'',
                        seeContent:'',
                        seeResult:''
                    }
                ],
                //新增病历
                form: {
                    userId:'',
                    userName:'',
                    departmentName:'',   //就诊科室
                    seeContent:'',
                    seeResult:''
                },
                //药库
                medicine_form: [
                    {
                        id:'',
                        drug_id:'',
                        drugName:'',
                        drug_price:'',
                        drug_num:'',
                    }
                ],
                //更新数量
                medicine_resetForm:[
                    {
                        id:'',
                        // drug_id:'',
                        // drugName:'',
                        // drug_price:'',
                        drug_num:'',
                    }
                ],
                //所选药物
                medicineList:[

                ],
                item:{
                    drugName:'',
                    drug_price:'',
                    num:0,
                },

                dialogFormVisible: false,  //发布弹框可见
                dialogFormVisible2:false,
            }
        },
        methods:{
            dateFormat:function(row){
                let t=new Date(row.seeDay);
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
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$message({
                            message: '添加成功！',
                            type: 'success',
                        });
                        console.log(_this.form)
                        this.$axios.post('http://localhost:8181/bingli/save',this.form).then(function (resp) {
                            // console.log(resp)
                            if (resp.data == 'success'){
                                const userId = _this.form.userId
                                _this.$axios.get('http://localhost:8181/bingli/findInfo/',{params:{userId}}).then(function (resp) {
                                    console.log(resp)
                                    _this.tableData = resp.data
                                    _this.total = resp.data.length
                                })
                                _this.reload()
                            }
                        })
                        this.$axios.delete('http://localhost:8181/reserve/deleteById/'+this.id).then(function (resp) {
                            console.log('成功退号')
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
                this.$confirm('此操作将永久删除该通知, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$axios.delete('http://localhost:8181/bingli/deleteById/'+row.id).then(function (resp) {
                        _this.reload()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            requestData(){
                const _this = this
                // this.userId = this.$route.params.userID
                const userId = this.userId
                console.log(userId)
                if(userId==null){
                    _this.tableData = null
                    _this.total = 0
                }
                else{
                    this.$axios.get('http://localhost:8181/bingli/findInfo/',{params:{userId}}).then(function (resp) {
                        // console.log(resp)
                        _this.tableData = resp.data
                        _this.total = resp.data.length

                        _this.form.userName = resp.data[0].userName
                        _this.form.userId = resp.data[0].userId
                        console.log(resp.data)
                    })
                }
            },
            add(){
                this.dialogFormVisible = true;

            },
            addMedicine(row){
                const item = new Object()
                item.drugName = row.drugName
                item.drug_price = row.drug_price

                if(this.medicineList.length === 0){
                    item.num =1
                    this.medicineList.push(item)
                }else {
                    for(let i = 0, iLen = this.medicineList.length; i < iLen; i++) {
                        if (this.medicineList[i].drugName === item.drugName) {
                            this.medicineList[i].num += 1
                            break
                        }
                        if(i===iLen-1){
                            item.drugName = row.drugName
                            item.drug_price = row.drug_price
                            item.num =1
                            this.medicineList.push(item)
                        }
                    }
                }

            },
            deleteMedicine(row){
                const item = new Object()
                item.drugName = row.drugName
                for(let i = 0, iLen = this.medicineList.length; i < iLen; i++) {
                    if (this.medicineList[i].drugName === item.drugName) {
                        this.medicineList.splice(i, 1)
                        break
                    }
                }
            },
            handleCurrentChange(currentPage){
                const _this = this
                this.$axios.get('http://localhost:8181/drugs/findAll/'+currentPage+'/4').then(function (resp) {
                    _this.tableData = resp.data.content
                })
            }
        },
        created() {
            console.log('刷新created')
            this.requestData();
            //药物
            const _this = this
            this.$axios.get('http://localhost:8181/drugs/findAll/1/4').then(function (resp) {
                _this.medicine_form = resp.data.content
                _this.totalOfMed = resp.data.totalElements
            })
        },
        // watch:{
        //     '$route'(to,from) {
        //             // this.userId=this.$route.params.userID;
        //             // this.requestData();
        //             console.log('watch')
        //     },
        // },
    }
</script>

<style scoped>
    .medium{
        margin-left: 10px;
    }
    .medium-left{
        display: inline-block;
        width: 48%;
    }

    .medium-right{
        display: inline-block;
        width: 48%;
        margin-left: 1%;
    }
    .medicine{
        margin-top: 15px;
    }
    .el-form-item >>> .el-form-item__label {
        font-weight: bold;
    }

    .top-btn {
        margin-left: 35px;
        margin-bottom: 8px;
    }

    .title{
        font-size: 18px;
        margin-right: 20px;
        font-weight: normal;
    }
    .footer {
        float: right;
        margin-top: 20px;
        margin-right: 5%;
    }
    .footer_med {
        float: right;
        margin-top: 20px;
        margin-right: 5%;
    }

    .el-divider__text{
        font-weight: bolder;
        font-size: 17px;
    }
</style>