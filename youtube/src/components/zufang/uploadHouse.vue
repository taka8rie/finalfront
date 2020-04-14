<template>
  <div>
    <el-row style="height: 840px;">
      <!--<search-bar></search-bar>-->
      <el-tooltip effect="dark" placement="right"
                  v-for="item in houses.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="item.houseNumber">
        <!-- house没有id,只有houseNumber       v-for="item in houses" :key="item.id">-->
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.addNote}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>房屋状态{{item.houseStatus}}</span>
          <span>房屋类型{{item.houseType}}</span>
          <span>房屋面积{{item.houseArea}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.addNote}}</p>
        <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="house"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover" @click="editHouse(item)">
            <img :src="item.houseCover" alt="封面">
          </div>
          <div class="info">
            <div class="houseAddr">
              <a href="">房屋地址:{{item.houseAddr}}</a>
            </div>
            <i class="el-icon-delete" @click="deleteHouse(item.houseNumber)"></i>
          </div>
          <div class="lastupdate">最近更新:{{item.lastupdateTime}}</div>
        </el-card>
      </el-tooltip>
      <show-house @onSumbit="loadHouses()" ref="edit"></show-house>
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
  import ShowHouse from "./ShowHouse";
    export default {
        name: "uploadHouse",
      components:{ShowHouse},
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
        loadHouses(){
          var _this = this
          this.$axios.get('/houses').then(resp => {
            if (resp && resp.status === 200) {
              _this.houses = resp.data
            }
          })
        },
        handleCurrentChange: function (currentPage) {
          this.currentPage = currentPage
          console.log(this.currentPage)
        },
        // searchResult () {
        //   var _this = this
        //   this.$axios
        //     .get('/search?keywords=' + this.$refs.searchBar.keywords, {
        //     }).then(resp => {
        //     if (resp && resp.status === 200) {
        //       _this.houses = resp.data
        //     }
        //   })
        // },
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
            houseNumber: item.houseNumber,
            houseAddr: item.houseAddr,
            houseType: item.houseType,
            houseArea: item.houseArea,
            houseStatus: item.houseStatus,
            houseCover: item.houseCover,
            lastupdateTime: item.lastupdateTime,
            soldPrice:item.soldPrice,
            addNote:item.addNote,
          }
        }
      }
    }
</script>

<style scoped>
  .cover{
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
  }

  .houseAddr {
    font-size: 14px;
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
