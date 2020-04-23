<template>
    <div>
      <el-row style="height: 840px;">
        <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>

        <div style="position:absolute ;
              margin-left: 50%;
              right: 50px;top: 0px;width: 200px;">
        <el-button size="small" type="primary" icon="el-icon-sort" @click="sort('soldPrice')">价格降序</el-button>
       </div>

        <div style="position:absolute ;
              margin-left: 50%;
              right: 200px;top: 0px;width: 200px;">
          <el-button size="small" type="primary" icon="el-icon-sort" @click="sortup('soldPrice')">价格升序</el-button>
        </div>

        <div style="position:absolute ;
              margin-left: 50%;
              right: 300px;top: 0px;width: 200px;">
          <el-button size="small" type="primary" icon="el-icon-sort" @click="recommend">推荐房屋</el-button>
        </div>



        <!--  vSideMenu-->
      <v-side-menu @visitSelect="selectResult" ref="vSideMenu"></v-side-menu>

        <el-tooltip effect="dark" placement="right"
                    v-for="item in houses.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="item.houseNumber">
          <p slot="content" style="font-size: 14px;margin-bottom: 6px;">房东要求: {{item.addNote}}</p>
          <p slot="content" style="font-size: 13px;margin-bottom: 6px">
<!--            <span>房屋状态{{item.houseStatus}}</span>-->
            <span>房屋类型: {{item.houseType}}</span>
            <span>房屋面积: {{item.houseArea}}</span>
            <span>房主编号: {{item.ownerNumber}}</span>
          </p>
          <p slot="content" style="width: 300px" class="abstract">售价: {{item.soldPrice}}</p>
          <el-card style="width: 150px;margin-bottom: 20px;height: 250px;float: left;margin-right: 15px" class="house"
                   bodyStyle="padding:10px" shadow="hover">
            <div class="cover" @click="editHouse(item)">
              <img :src="item.houseCover" alt="封面">
            </div>
            <div class="info">
              <div class="houseAddr">
                <a href="">房屋地址:{{item.houseAddr}}</a>
              </div>
            </div>
            <div class="lastupdate">上架时间:{{item.lastupdateTime}}</div>
          </el-card>
        </el-tooltip>
        <show-form @onSumbit="loadHouses()" ref="edit"></show-form>
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
  import ShowForm from "./ShowForm";
  import vSideMenu from "./vSideMenu";

    export default {
        name: "visitHouse",
      components:{SearchBar,ShowForm,vSideMenu},
      data(){
        return {
          houses:[],
          currentPage:1,
          pageSize:17,
          //排序
          sortType:'soldPrice',
        }
      },
      mounted:function () {
        this.loadHouses()
      },



      methods:{
        recommend() {
          this.$axios.post('/recommendhouse').then(resp => {
            if (resp && resp.status === 200) {
              this.houses = resp.data
            }
          })
        },
          //排序
        sort(type) {
          this.sortType=type;
          this.houses.sort(this.compare(type));
        },
        compare(attr) {
          return function (a,b) {
          var val1=a[attr];
          var val2=b[attr];
          return val2-val1;
          }
        },
        sortup(type) {
          this.sortType=type;
          this.houses.sort(this.compare(type));
          this.houses.reverse();
        },

        loadHouses(){
          var _this = this
          this.$axios.get('/notOrderHouses').then(resp => {
            if (resp && resp.status === 200) {
              _this.houses = resp.data
            }
          })
        },
        handleCurrentChange: function (currentPage) {
          this.currentPage = currentPage
          console.log(this.currentPage)
        },
        searchResult () {
          var _this = this
          this.$axios
            .get('/searchIsOrder?keywords=' + this.$refs.searchBar.keywords, {
            }).then(resp => {
            if (resp && resp.status === 200) {
              _this.houses = resp.data
            }
          })
        },
        //租客页面分类显示
        selectResult() {
          var _this=this
          var value=this.$refs.vSideMenu.value //这里想取sidemenu组件里边的type的数值,返回数字
          var url = 'type/' + value + '/deals'
          this.$axios.get(url).then(resp => {
            if (resp && resp.status === 200) {
              _this.houses = resp.data
            }
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
            ownerNumber:item.ownerNumber,
          };
        },
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
    /*margin: 0 auto;*/
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
