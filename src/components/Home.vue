<template>
    <el-container class="home-container">
      <el-header>
        <div>
          <span>管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button></el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">
            |||
          </div>
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="this.activePath">
            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName }}</span>
              </template>
              <template>
                <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
                  @click="saveNavActive('/' + subItem.path)">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{subItem.authName}}</span>
                  </template>
              </el-menu-item>
              </template>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        menuList: [],
        isCollapse: false,
        activePath: ''
      }
    },
    created(){
      this.getMenuList();
      this.activepath = sessionStorage.getItem('activePath')
    },
    methods: {
      logout(){
        sessionStorage.clear();
        this.$router.push('/login')
      },
      async getMenuList(){
        const {data: res} = await this.$http.get("/menu/getMenu")
        console.log(res)
        if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.menuList = res.data;
      },
      toggleCollapse(){
        this.isCollapse = !this.isCollapse
      },
      saveNavActive(path){
        sessionStorage.setItem("activePath", path)
        this.activePath = path
      }
    }
  }
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
}
.el-header{
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: white;
  font-size: 20px;
  > div{
    span{
      margin-left: 15px;
    }
  }
}
.el-aside{
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}
.el-main{
  background-color: #eaedf1;
}
.toggle-button{
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color:#fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>