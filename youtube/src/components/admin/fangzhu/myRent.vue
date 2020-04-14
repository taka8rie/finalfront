<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">

      <el-table
        :data="myrents"
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
    export default {
        name: "myRent",
      data() {
          return{
            myrents:[]
          }
      },
      computed: {
        tableHeight () {
          return window.innerHeight - 320
        }
      },
      created() {
        var _this = this
        this.$axios.get('/myrents').then(resp => {
          if (resp && resp.status === 200) {
            _this.myrents = resp.data
          }
        })
      }
    }
</script>

<style scoped>

</style>
