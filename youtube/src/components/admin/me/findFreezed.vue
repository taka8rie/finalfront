<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
<!--      <Deals @onSubmit="loadOrder()" ref="edit"></Deals>-->
      <el-table
        :data="allfreezed.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        style="width: 100%"
        :max-height="tableHeight">
        <el-table-column

          width="55">
        </el-table-column>

        <el-table-column
          prop="id"
          label="用户编号"
          fit>
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

        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="unFreezeUser(scope.row.id)"
              type="info"
              size="small"
            >
              解冻该账户
            </el-button>

          </template>
        </el-table-column>
      </el-table>
      <!--      <div style="margin: 20px 0 20px 0;float: left">-->
      <!--        <el-button>取消选择</el-button>-->
      <!--        <el-button>批量删除</el-button>-->
      <!--      </div>-->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total=allfreezed.length>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "findFreezed",
      data() {
          return{
            allfreezed:[],
            currentPage:1,
            pageSize:4,
            sortType:'id',//这里未设置按某属性排序
          }
      },
      computed: {
        tableHeight () {
          return window.innerHeight - 320
        }
      },
      created(){
        var _this = this
        this.$axios.get('/allfreezed').then(resp => {
          if (resp && resp.status === 200) {
            _this.allfreezed = resp.data
          }
        })
      },
      methods:{
          loadFreezed(){
          var _this = this
          this.$axios.get('/allfreezed').then(resp => {
            if (resp && resp.status === 200) {
              _this.allfreezed = resp.data
            }
          })
        },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
        console.log(this.currentPage)
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
                  this.loadFreezed()
                }
              })
            }
          ).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      }

    }
</script>

<style scoped>

</style>
