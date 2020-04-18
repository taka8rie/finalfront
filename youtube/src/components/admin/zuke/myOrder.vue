<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">

      <el-table
        :data="myorders"
        stripe
        style="width: 100%"
        :max-height="tableHeight">
        <el-table-column

          width="55">
        </el-table-column>

        <el-table-column
          prop="houseNumber"
          label="房屋号码"
          fit>
        </el-table-column>
        <el-table-column
          prop="ownerNumber"
          label="房主编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="beginTime"
          label="开始出租时间"
          fit>
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束出租时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          fit>
        </el-table-column>
        <el-table-column
        prop="staffNumber"
        label="处理人员工号"
        fit>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteMyOrder(scope.row.dealNumber)"
              type="text"
              size="small">
              解除合同
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
  import ShowForm from "../../visit/ShowForm";
  import vSideMenu from "../../visit/vSideMenu";
    export default {
        name: "myOrder",
      components:{ShowForm,vSideMenu},
      data(){
        return {
          currentPage:1,
          pageSize:17,
          myorders:[],

        }
      },
        created(){
          var _this = this
          this.$axios.get('/myorder').then(resp => {
            if (resp && resp.status === 200) {
              _this.myorders = resp.data
            }
          })
      },
      computed: {
        tableHeight () {
          return window.innerHeight - 320
        }
      },
      methods:{

        handleCurrentChange: function (currentPage) {
          this.currentPage = currentPage
          console.log(this.currentPage)
        },
        deleteMyOrder(id) {
          this.$confirm('您确定要解除合同吗？该操作无法恢复！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.$axios
                .post('/admindeleteorder', {dealNumber: id}).then(resp => {
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
