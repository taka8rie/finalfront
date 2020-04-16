<template>
  <div>
    <search-tool @onSearch="searchResult" ref="searchTool"></search-tool>
    <el-row style="margin: 18px 0px 0px 18px ">
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="alluser"
        stripe
        style="width: 100%"
        :max-height="tableHeight">
        <el-table-column

          width="55">
        </el-table-column>

        <el-table-column
          prop="username"
          label="用户名"
          fit>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系电话"
          width="100">
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
    import SearchTool from "./searchTool";
    export default {
        name: "searchUser",
      components: {SearchTool},
      data() {
          return{
            alluser:[],
          }
      },
      // created() {
      //   var _this=this
      //   this.$axios.get('/alluser').then(resp=>{
      //     if (resp && resp.status === 200) {
      //       _this.alluser=resp.data
      //     }
      //   })
      // },
      computed: {
        tableHeight () {
          return window.innerHeight - 320
        }
      },
      methods:{
        // loadAllUser() {
        //   var _this=this
        //   this.$axios.get('/allyuyues').then(resp=>{
        //     if (resp && resp.status === 200) {
        //       _this.alluser=resp.data
        //     }
        //   })
        // },
        searchResult () {
          var _this = this
          this.$axios
            .get('/alluserSearch?keywords=' + this.$refs.searchTool.keywords, {
            }).then(resp => {
            if (resp && resp.status === 200) {
              _this.alluser = resp.data
            }
          })
        }
      }

    }
</script>

<style scoped>

</style>
