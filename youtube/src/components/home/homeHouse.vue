<template>
  <div>
    <el-row style="height: 840px;">
      <!--  添加查找未审核的房屋按钮-->
      <!--      <el-button type="success" @click="notCheck">查看未审核房屋</el-button>-->
      <el-button type="success" round style="margin-left: 1000px" @click="tologin">点我登录</el-button>
      <!--<search-bar></search-bar>-->
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <el-tooltip effect="dark" placement="right"
                  v-for="item in houses.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="item.houseNumber">
        <!-- house没有id,只有houseNumber     v-for="item in houses" :key="item.id">-->
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">房主要求: {{item.addNote}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>房屋状态: {{item.houseStatus}}</span>
          <span>房屋类型: {{item.houseType}}</span>
          <span>房屋面积: {{item.houseArea}}</span>
          <span>房主登录账号: {{item.ownerNumber}}</span>
        </p>

        <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="house"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover" @click="editHouse(item)">
            <img :src="item.houseCover" alt="封面">
          </div>

          <div class="info">
            <div class="houseAddr">
              <a href="">地址:{{item.houseAddr}}</a>
            </div>
<!--            <i class="el-icon-delete" @click="deleteHouse(item.houseNumber)"></i>-->
          </div>
<!--          <div class="lastupdate">更新时间:{{item.lastupdateTime}}</div>-->
        </el-card>
      </el-tooltip>
      <no-login-show-form @onSumbit="loadHouses()" ref="edit"></no-login-show-form>
    </el-row>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="houses.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
 import SearchBar from "../house/SearchBar";
 import NoLoginShowForm from "./NoLoginShowForm";
    export default {
        name: "homeHouse",
      components:{SearchBar,NoLoginShowForm},
      data(){
        return {
          houses:[],
          currentPage:1,
          pageSize:17
        }
      },
      mounted:function () {
        this.loadHouses()
      },
      methods:{
        tologin() {
          this.$router.push({path: '/login'})
        },
        loadHouses(){
          var _this = this
          this.$axios.get('/houses').then(resp => {
            if (resp && resp.status === 200) {
              console.log("载入房子get /houses ")
              _this.houses = resp.data
              console.log("载入房屋成功")
            }
          })
        },
        handleCurrentChange: function (currentPage) {
          this.currentPage = currentPage
          console.log('Houses.vue里边的currentPage: '+this.currentPage)
        },
        searchResult () {
          var _this = this
          this.$axios
            .get('/search?keywords=' + this.$refs.searchBar.keywords, {
            }).then(resp => {
            if (resp && resp.status === 200) {
              _this.houses = resp.data
            }
          })
        },
        deleteHouse(houseNumber) {
          this.$confirm('此操作将永久删除该房屋, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.$axios
                .post('/delete', {houseNumber: houseNumber}).then(resp => {
                if (resp && resp.status === 200) {
                  this.loadHouses()
                }
              })
            }
          ).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        },
        editHouse(item) {
          this.$refs.edit.dialogFormVisible = true
          this.$refs.edit.form = {
            ownerNumber:item.ownerNumber,//新增房屋对应的房主账号
            houseNumber: item.houseNumber,
            houseAddr: item.houseAddr,
            // houseType:'测试的别墅',
            houseType: item.houseType,
            houseArea: item.houseArea,
            houseStatus: item.houseStatus,
            // houseStatus:'',
            houseCover: item.houseCover,
            lastupdateTime: item.lastupdateTime,
            soldPrice:item.soldPrice,
            addNote:item.addNote,
            adminCheck:item.adminCheck,//是否对房屋进行审查
          }


        },
        notCheck() {
          // this.$router.push('/checkHouse')
          var _this=this
          var value=0 //0:未审核 1:已审核
          var url = 'type/' + value + '/check'
          this.$axios.get(url).then(resp => {
            if (resp && resp.status === 200) {
              _this.houses = resp.data
            }
          })
        }
      }
    }
</script>

<style scoped>
  .cover{
    width: 120px;
    height: 172px;
    margin-bottom: 10px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .houseAddr {
    font-size: 11px;
    text-align: left;
  }

  .lastupdate {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  .el-icon-delete {
    cursor: pointer;
    float: right;
  }

  .switch {
    display: flex;
    position: absolute;
    left: 780px;
    top: 25px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>
