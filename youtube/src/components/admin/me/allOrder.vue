<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <Deals @onSubmit="loadOrder()" ref="edit"></Deals>
      <el-table
        :data="allorder"
        stripe
        style="width: 100%"
        :max-height="tableHeight">
        <el-table-column

          width="55">
        </el-table-column>

        <el-table-column
          prop="dealNumber"
          label="订单编号"
          fit>
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
          prop="tenantNumber"
          label="租客编号"
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
                      @click.native.prevent="editOrder(scope.row)"
                      type="text"
                      size="small">
                      编辑
                    </el-button>
                    <el-button
                      @click.native.prevent="deleteOrder(scope.row.dealNumber)"
                      type="text"
                      size="small">
                      移除
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
import Deals from "../../visit/Deals";
    export default {
        name: "allOrder",
      components:{Deals},
      data() {
          return{
            allorder:[],
          }
      },
      created(){
        var _this = this
        this.$axios.get('/allorder').then(resp => {
          if (resp && resp.status === 200) {
            _this.allorder = resp.data
          }
        })
      },
      computed: {
        tableHeight () {
          return window.innerHeight - 320
        }
      },
      methods:{
        loadOrder(){
          this.$refs.Order.dialogFormVisible=false //不会马上跳出
          var _this = this
          this.$axios.get('/allorder').then(resp => {
            if (resp && resp.status === 200) {
              _this.myhouses = resp.data
            }
          })
        },
        deleteOrder(id) {
          // console.log("myHouse的deleteOrder函数，选中的houseNumber是: "+id)
          this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
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
        },
        editOrder(item) {
          this.$refs.edit.dialogFormVisible = true
          this.$refs.edit.form = {
            dealNumber:item.dealNumber,
            houseNumber: item.houseNumber,
            ownerNumber: item.ownerNumber,
            tenantNumber: item.tenantNumber,
            beginTime: item.beginTime,
            endTime: item.endTime,
            price: item.price,
            staffNumber: item.staffNumber,
          }
        }
      }

    }
</script>

<style scoped>

</style>
