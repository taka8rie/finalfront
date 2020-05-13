<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <admin-edit-form @onSubmit="loadHouses()" ref="edit"></admin-edit-form>
      <el-table
        :data="uncheck.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
          prop="houseAddr"
          label="房屋地址"
          width="100">
        </el-table-column>
        <el-table-column
          prop="houseArea"
          label="房屋面积"
          fit>
        </el-table-column>
        <el-table-column
          prop="soldPrice"
          label="售价"
          width="120">
        </el-table-column>
        <el-table-column
          prop="addNote"
          label="要求"
          fit>
        </el-table-column>

        <el-table-column
          prop="ownerNumber"
          label="房主账号"
          fit>
        </el-table-column>


        <el-table-column
          fixed="right"
          label="操作"
          width="120">

          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editHouse(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
<!--            <el-button-->
<!--              @click.native.prevent="deleteHouse(scope.row.houseNumber)"-->
<!--              type="text"-->
<!--              size="small">-->
<!--              下架-->
<!--            </el-button>-->
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total=uncheck.length>
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
  import adminEditForm from "./adminEditForm";
    export default {
        name: "notCheck",
      components:{adminEditForm},
      data() {
          return{
            uncheck:[],
            currentPage:1,
            pageSize:4,
            sortType:'houseNumber',
          }
      },
      created() {
        var _this=this
        var value=0 //0:未审核 1:已审核
        var url = 'type/' + value + '/check'
        this.$axios.get(url).then(resp => {
          if (resp && resp.status === 200) {
            _this.uncheck = resp.data
          }
        })
      },
      computed: {
        tableHeight () {
          return window.innerHeight - 320
        }
      },
      methods:{
        loadHouses(){
          var _this = this
          this.$axios.get('/allNotCheckHouse').then(resp => {
            if (resp && resp.status === 200) {
              _this.uncheck = resp.data
            }
          })
        },
        editHouse(item) {
          this.$refs.edit.dialogFormVisible = true
          this.$refs.edit.form = {
            ownerNumber:item.ownerNumber,//新增房屋对应的房主账号
            houseNumber: item.houseNumber,
            houseAddr: item.houseAddr,
            // houseType:'测试的别墅',
            houseType: item.houseType,
            houseArea: item.houseArea,
            houseStatus: item.houseStatus,
            houseCover: item.houseCover,
            lastupdateTime: item.lastupdateTime,
            soldPrice:item.soldPrice,
            addNote:item.addNote,
            adminCheck:item.adminCheck,//是否对房屋进行审查
          }
          this.loadHouses();//4.24 尝试修改后自动刷新表格信息
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
