<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <my-edit-form @onSubmit="loadHouses()" ref="edit"></my-edit-form>
      <el-table
        :data="myhouses"
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
      <!--      <div style="margin: 20px 0 20px 0;float: left">-->
      <!--        <el-button>取消选择</el-button>-->
      <!--        <el-button>批量删除</el-button>-->
      <!--      </div>-->
    </el-card>
  </div>
</template>

<script>
  import myEditForm from "./myEditForm";
    export default {
        name: "myHouse",
      components:{myEditForm},
      data() {
          return{
            myhouses:[],
          }
      },
      created() {
          var _this=this
        this.$axios.get('/myhouses').then(resp=>{
          if (resp && resp.status === 200) {
            _this.myhouses=resp.data
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
          this.$axios.get('/myhouses').then(resp => {
            if (resp && resp.status === 200) {
              _this.myhouses = resp.data
            }
          })
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
