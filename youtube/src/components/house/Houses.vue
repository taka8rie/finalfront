<template>
  <div>
    <el-row style="height: 840px;">
      <!--<search-bar></search-bar>-->
      <el-tooltip effect="dark" placement="right"
                  v-for="item in houses" :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.addNote}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.houseStatus}}</span>
          <span>{{item.houseType}}</span>
          <span>{{item.houseArea}}</span>

        </p>
        <p slot="content" style="width: 300px" class="abstract">当前价格为：{{item.soldPrice}}</p>
        <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="house"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover">
            <img :src="item.houseCover" alt="封面">
          </div>
          <div class="info">
            <div class="houseAddr">
              <a href="">{{item.houseAddr}}</a>
            </div>
          </div>
          <div class="lastupdate">{{item.lastupdateTime}}</div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row>
      <el-pagination
        :current-page="1"
        :page-size="10"
        :total="20">
      </el-pagination>
    </el-row>
  </div>

</template>

<script>
    export default {
        name: "Houses",
      data(){
          return {
            houses:[{
              houseCover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
              houseAddr: '房屋地点',
              houseType: '类型是老八',
              houseArea: '这里是房屋面积',
              houseStatus: '房屋状态',
              lastupdateTime: '2020-3-7',
              soldPrice:50,
              addNote:"老八的要求",
            }]
          }
      }
    }
</script>

<style scoped>
  .cover {
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

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
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

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>
