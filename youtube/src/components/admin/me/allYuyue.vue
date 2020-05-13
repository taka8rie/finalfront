<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <admin-kanfang @onSubmit="loadYuyue()" ref="edit"></admin-kanfang>
      <el-table
        :data="allyuyue.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        style="width: 100%"
        :max-height="tableHeight">
        <el-table-column

          width="55">
        </el-table-column>

        <el-table-column
          prop="showNumber"
          label="预约单号"
          fit>
        </el-table-column>
        <el-table-column
          prop="seeTime"
          label="预约时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="houseNumber"
          label="预约房屋编号"
          fit>
        </el-table-column>

        <el-table-column
          prop="tenantNumber"
          label="租客编号"
          fit>
        </el-table-column>


        <el-table-column
          fixed="right"
          label="操作"
          width="120">

          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editYuyue(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteYuyue(scope.row.showNumber)"
              type="text"
              size="small">
              取消
            </el-button>
          </template>


        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total=allyuyue.length>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import adminKanfang from "../../visit/adminKanfang";
    export default {
        name: "allYuyue",
        components:{adminKanfang},
      data() {
        return{
          allyuyue:[],
          currentPage:1,
          pageSize:4,
          sortType:'showNumber',
        }
      },
      created() {
        var _this=this
        this.$axios.get('/allyuyues').then(resp=>{
          if (resp && resp.status === 200) {
            _this.allyuyue=resp.data
          }
        })
      },
      computed: {
        tableHeight () {
          return window.innerHeight - 320
        }
      },
      methods:{
        loadYuyue() {
          var _this=this
          this.$axios.get('/allyuyues').then(resp=>{
            if (resp && resp.status === 200) {
              _this.allyuyue=resp.data
            }
          })
        },
        deleteYuyue(id) {
          // console.log("myYuyue的deleteHouse函数，选中的houseNumber是: "+id)
          this.$confirm('此操作将永久删除该预约订单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.$axios
                .post('/deleteyuyue', {showNumber: id}).then(resp => {
                if (resp && resp.status === 200) {
                  console.log("woshinidie")
                  this.loadYuyue()
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
        editYuyue(item) {
          this.$refs.edit.dialogFormVisible = true
          this.$refs.edit.form = {
            seeTime:item.seeTime,
            showNumber:item.showNumber,
            houseNumber:item.houseNumber
          }
        },
        handleCurrentChange: function (currentPage) {
          this.currentPage = currentPage
          console.log(this.currentPage)
        },
      }

    }
</script>

<style scoped>

</style>
