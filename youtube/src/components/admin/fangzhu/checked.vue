<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <my-checked @onSubmit="loadHouses()" ref="edit"></my-checked>
      <el-table
        :data="myuncheck.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        style="width: 100%"
        :max-height="tableHeight"
      >
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
            <el-button
              @click.native.prevent="deleteHouse(scope.row.houseNumber)"
              type="text"
              size="small">
              下架
            </el-button>
          </template>

        </el-table-column>
      </el-table>


      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total=myuncheck.length>
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
  import myChecked from "./myChecked";
    export default {
        name: "checked",
      components: { myChecked},
      data() {
        return {
          myuncheck:[],
          currentPage:1,
          pageSize:4,
          sortType:'houseNumber',
        }
      },
      created() {
        var _this=this
        this.$axios.get('/myUncheck').then(resp=>{
          if (resp && resp.status === 200) {
            _this.myuncheck=resp.data
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
          this.$axios.get('/myUncheck').then(resp => {
            if (resp && resp.status === 200) {
              _this.myuncheck = resp.data
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
        },
        deleteHouse(id) {
          console.log("myHouse的deleteHouse函数，选中的houseNumber是: "+id)
          this.$confirm('此操作将永久删除该房屋, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.$axios
                .post('/delete', {houseNumber: id}).then(resp => {
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
        handleCurrentChange: function (currentPage) {
          this.currentPage = currentPage
          console.log(this.currentPage)
        },


      }
    }
</script>

<style scoped>

</style>
