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
          prop="id"
          label="用户编号"
          width="200">
        </el-table-column>

        <el-table-column
          prop="username"
          label="用户名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系电话"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="freezeUser(scope.row.id)"
              type="text"
              size="small">
              冻结账户
            </el-button>
            <!--                    <el-button-->
            <!--                      @click.native.prevent="deleteUser(scope.row.id)"-->
            <!--                      type="text"-->
            <!--                      size="small">-->
            <!--                      移除该用户-->
            <!--                    </el-button>-->
            <el-button
              @click.native.prevent="unFreezeUser(scope.row.id)"
              type="text"
              size="small">
              解除冻结
            </el-button>
          </template>
        </el-table-column>
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
      },
      freezeUser(id) {
        this.$confirm('此操作将会冻结该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios
              .post('/freezeUser', {id: id}).then(resp => {
              if (resp && resp.status === 200) {
                this.$message("冻结成功")
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
      unFreezeUser(id) {
        this.$confirm('确定要解冻该账号吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios
              .post('/unfreezeUser', {id: id}).then(resp => {
              if (resp && resp.status === 200) {
                this.$message("已解冻")
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

    }

  }
</script>

<style scoped>

</style>
