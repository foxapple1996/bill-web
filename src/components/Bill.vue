<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>账单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="10">
<!--                    <el-input placeholder="请输入内容" v-model="input" class="input-with-select">-->
<!--                        <el-select v-model="select" slot="prepend" placeholder="请选择">-->
<!--                            <el-option label="账号" value="cAccount"></el-option>-->
<!--                            <el-option label="区服" value="cServer"></el-option>-->
<!--                        </el-select>-->
<!--                        <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--                    </el-input>-->
                </el-col>
                <el-col :span="4">

                    <el-button type="primary" @click="dialogFormVisible = true">添加账单</el-button>
                </el-col>
            </el-row>
            <el-dialog title="新增账单" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="类型" :label-width="formLabelWidth">
                        <el-select v-model="form.bType" placeholder="请选择活动区域" style="width:150px">
                            <el-option label="支出" value="1"></el-option>
                            <el-option label="收入" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="金额" :label-width="formLabelWidth">
                        <el-input style="width:200px" v-model="form.bMoney"></el-input>
                    </el-form-item>
                    <el-form-item label="统计时间" :label-width="formLabelWidth">
                        <el-date-picker
                                v-model="form.bDate"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth">
                        <el-select v-model="form.bInfo" placeholder="请选择详情" style="width:150px">
                            <el-option label="浪客行" value="浪客行"></el-option>
                            <el-option label="买菜" value="买菜"></el-option>
                            <el-option label="日常消费" value="日常消费"></el-option>
                            <el-option label="吃饭" value="吃饭"></el-option>
                            <el-option label="乘车" value="乘车"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addBill()">确 定</el-button>
                </div>
            </el-dialog>
            <el-table :data="billList" border>
                <el-table-column label="#" type="index"></el-table-column>
                <!--        <el-table-column label="账号ID" prop="cId"></el-table-column>-->
                <el-table-column label="类型" prop="bType"></el-table-column>
                <el-table-column label="时间" prop="bDate"></el-table-column>
                <el-table-column label="金额" prop="bMoney"></el-table-column>
                <el-table-column label="备注" prop="bInfo">
                    <!--          <template slot-scope="scope">-->
                    <!--            {{scope.row}}-->
                </el-table-column>
                <el-table-column label="操作" >
                    <template>
                        <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Bill",
        data(){
            return{
                select: '',
                input: '',
                queryInfo: {
                    query: '',
                    queryType: '',
                    pageNum: 1,
                    pageSize: 2
                },
                billList: [],
                total: 0,
                dialogFormVisible: false,
                form: {
                    bType: '',
                    bMoney: '',
                    bDate: '',
                    bInfo: ''
                },
                formLabelWidth: '200px'
            }
        },
        created(){
            this.getBillList();
        },
        methods: {
            async getBillList() {
                const {data: res} = await this.$http.get('/bill/getAllBill', {params: this.queryInfo})
                console.log(res)
                if (res.code !== 200) return this.$message.error("获取账单列表失败")
                this.billList = res.data
            },
            async addBill(){
                console.log(this.form)
                this.form.bDate = this.dayjs(this.form.bDate).format("YYYY-MM-DD HH:mm:ss")
                await this.$http.post('/bill/addBill', this.form)
                this.dialogFormVisible = false
                this.getBillList()
            }
        }
    }
</script>

<style scoped>

</style>