<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      <el-breadcrumb-item>账号列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="账号" value="cAccount"></el-option>
              <el-option label="区服" value="cServer"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加账号</el-button>
        </el-col>
      </el-row>
      <el-table :data="accountList" border>
        <el-table-column label="#" type="index"></el-table-column>
<!--        <el-table-column label="账号ID" prop="cId"></el-table-column>-->
        <el-table-column label="账号名称" prop="cAccount"></el-table-column>
        <el-table-column label="账号密码" prop="cPassword"></el-table-column>
        <el-table-column label="账号区服" prop="cServer"></el-table-column>
        <el-table-column label="状态" prop="cServer">
<!--          <template slot-scope="scope">-->
<!--            {{scope.row}}-->
          <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="20" :percentage="scope.row.cEnergy/100" color="red" v-if="scope.row.cEnergy >= 2700"></el-progress>
            <el-progress :text-inside="true" :stroke-width="20" :percentage="scope.row.cEnergy/100" status="success" v-if="scope.row.cEnergy < 2700"></el-progress>
          </template>
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
    name: "AccountList",
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
        accountList: [],
        total: 0
      }
    },
    created(){
      this.getAccountList();
    },
    methods: {
      async getAccountList() {
        const {data: res} = await this.$http.get('/account/getAllAccount', {params: this.queryInfo})
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error("获取账号列表失败")
        this.accountList = res.data.accounts
      }
    }
  }
</script>

<style scoped>

</style>