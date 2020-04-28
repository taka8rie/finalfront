<template>
  <div>
  <search-house-tool @onSearch="searchResult" ref="searchHouseTool"></search-house-tool>
    <el-row style="margin: 18px 0px 0px 18px ">
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="allhouse"
        stripe
        style="width: 100%"
        :max-height="tableHeight">
        <el-table-column
          width="55">
        </el-table-column>

        <el-table-column
          prop="houseNumber"
          label="房屋编号"
          width="100">
        </el-table-column>

        <el-table-column
          prop="ownerNumber"
          label="房主编号"
          fit>
        </el-table-column>

        <el-table-column
          prop="houseType"
          label="房屋类型"
          width="100">
        </el-table-column>

        <el-table-column
          prop="houseAddr"
          label="房屋地址"
          fit>
        </el-table-column>

        <el-table-column
          prop="houseArea"
          label="房屋面积"
          width="100">
        </el-table-column>

        <el-table-column
          prop="soldPrice"
          label="售价"
          fit>
        </el-table-column>

        <el-table-column
          prop="adminCheck"
          label="是否审核"
          width="120">
        </el-table-column>

        <el-table-column
          prop="isOrder"
          label="是否已经出租"
          fit>
        </el-table-column>






        <!--        <el-table-column-->
        <!--          fixed="right"-->
        <!--          label="操作"-->
        <!--          width="120">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button-->
        <!--              @click.native.prevent="editBook(scope.row)"-->
        <!--              type="text"-->
        <!--              size="small">-->
        <!--              编辑-->
        <!--            </el-button>-->
        <!--            <el-button-->
        <!--              @click.native.prevent="deleteBook(scope.row.id)"-->
        <!--              type="text"-->
        <!--              size="small">-->
        <!--              移除-->
        <!--            </el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
      <!--      <div style="margin: 20px 0 20px 0;float: left">-->
      <!--        <el-button>取消选择</el-button>-->
      <!--        <el-button>批量删除</el-button>-->
      <!--      </div>-->
    </el-card>
  </div>
</template>

<script>
    import SearchHouseTool from "./searchHouseTool";
    export default {
        name: "searchHouse",
      components: {SearchHouseTool},
      data() {
          return{
            allhouse:[],
          }
      },
      computed: {
        tableHeight () {
          return window.innerHeight - 320
        }
      },
      methods:{
        searchResult () {
          var _this = this
          this.$axios
            .get('/allhouseSearch?keywords=' + this.$refs.searchHouseTool.keywords, {
            }).then(resp => {
            if (resp && resp.status === 200) {
              _this.allhouse = resp.data
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
