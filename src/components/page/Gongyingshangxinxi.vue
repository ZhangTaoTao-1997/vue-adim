<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 供应商信息查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-input v-model="searchTableInfo" placeholder="请输入关键词" style="width:240px"></el-input>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="warning" @click="addnew()">添加</el-button>
      <!--<el-button type="primary" @click="doFilter">搜索</el-button>-->
      <el-table
        :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%;margin: 10px 0;text-align:center;">
        <el-table-column prop="mingcheng" label="供应商名称" width="150">
        </el-table-column>
        <el-table-column prop="dizhi" label="地址" width="150">
        </el-table-column>
        <el-table-column prop="lianxiren" label="联系人" width="150">
        </el-table-column>
        <el-table-column prop="dianhua" label="电话" width="150">
        </el-table-column>
        <el-table-column prop="youbian" label="邮编" width="150">
        </el-table-column>
        <el-table-column prop="chuanzhen" label="传真" width="150">
        </el-table-column>
        <el-table-column prop="youxiang" label="email" width="150">
        </el-table-column>

        <el-table-column label="操作" align="center">
        <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow(scope.row)"></el-button>
        </template>
        </el-table-column>
      </el-table>
      <!--分页的实现-->
      <div class="pagination">
        <el-pagination
          center
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[4,6,8,10,12]"
          :page-size="pagesize"
          :total="tableData.length"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </div>

    <!--编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="名称">
          <el-input v-model="form.mingcheng"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.dizhi"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.lianxiren"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.dianhua"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="form.youbian"></el-input>
        </el-form-item>
        <el-form-item label="传真">
          <el-input v-model="form.chuanzhen"></el-input>
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="form.youxiang"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 新增提示框 -->
    <el-dialog title="添加供应商" :visible.sync="addVisible" width="30%">
      <el-form ref="form1" :model="form1" label-width="100px">
        <el-form-item label="供应商名称">
          <el-input v-model="form1.mingcheng"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form1.dizhi"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form1.lianxiren"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form1.dianhua"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="form1.youbian"></el-input>
        </el-form-item>
        <el-form-item label="传真">
          <el-input v-model="form1.chuanzhen"></el-input>
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="form1.youxiang"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addEdit">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Tuser:[],
        searchTableInfo:"",
        getSearchInfo:[],
        currpage:1,//默认开始页面
        pagesize:8,//每页数据条数
        editVisible: false,
        delVisible: false,
        addVisible:false,
        form: {
        },
        form1:{
          mingcheng:'',
          dizhi:'',
          lianxiren:'',
          dianhua:'',
          youbian:'',
          chuanzhen:'',
          youxiang:'',
        }
      };
    },
    mounted() {
      this.info();
    },
    methods: {
//      getTuser(){
//        var that=this;
//        that.$axios({
//          type: "get",
//          url:'http://127.0.0.1:9202/user/findAll',
//          dataType: 'json',
//        }).then(res=>{
//          that.Tuser=res.data
//        }).catch();
////       info(){
////         let Data=Tuser;
////        that.getSearchInfo = Tuser;
////        console.log(that.getSearchInfo)
////        };
//      },
      // 分页导航
      handleCurrentChange(cpage) {
        this.currpage = cpage;
      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },
      //操作多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      info() {
        this.$axios({
          type: "get",
          url:'http://127.0.0.1:9202/gongyingshang/findAll',
          dataType: 'json',
        }).then(res=>{
          this.Tuser=res.data
          //这些数据视情况，是你从后端拿来的。
          this.getSearchInfo =this.Tuser;
          console.log(this.getSearchInfo)
        }).catch();
      },
      //编辑页面
      handleEdit(index, row) {
        this.editVisible = true;
        this.id = row.id;
        this.form = Object.assign({}, row);
      },
      saveEdit(row) {
        var that = this;
        let data = {
          id : that.id,
          mingcheng:that.form.mingcheng,  //此title为 input 输入框的内容
          dizhi:that.form.dizhi,
          lianxiren:that.form.lianxiren,
          youbian:that.form.youbian,
          dianhua:that.form.dianhua,
          chuanzhen:that.form.chuanzhen,
          youxiang:that.form.youxiang,
//          dizhi:that.form.dizhi,

        };
        that.$axios({
          url: 'http://127.0.0.1:9202/gongyingshang/update',
          method: "post",
          data: data
        }).then(res => {
          if (res.data == 1) {
            that.editVisible = false;
            that.info();
            that.$message({
              message: '修改成功',
              type: 'success'
            });
          }else {
            that.$message({
              message: '更新失败',
              type: 'danger'
            });
          }
          that.info();
        }).catch()
      },
      //删除
      deleteRow(row) {
        var that = this;
        let data=[];
        data.push(row.id);
        that.$axios({
          url: 'http://127.0.0.1:9202/gongyingshang/delete',
          method: "post",
          data: data
        }).then(res => {
          if (res.data == 1) {
            that.$message({
              message: '删除成功',
              type: 'success'
            });
          }
          that.info();
        }).catch()
      },
      //增加新类别
      addnew(){
        this.addVisible = true;
      },
      //确认后执行增加操作
      addEdit(){
        var that = this
        let data = {
          mingcheng: this.form1.mingcheng,
          dizhi: this.form1.dizhi,
          lianxiren:that.form1.lianxiren,
          youbian:that.form1.youbian,
          dianhua:that.form1.dianhua,
          chuanzhen:that.form1.chuanzhen,
          youxiang:that.form1.youxiang,
        };
        that.$axios({
          url: 'http://127.0.0.1:9202/gongyingshang/add',
          method: 'post',
          data: data
        }).then(res => {
          if (res.data == 1) {
            that.addVisible = false;
            that.$message({
              message: '添加成功',
              type: 'success'
            });
            that.info();
            location.reload();
//            this.$refs[form1].resetFields();
          } else {
            that.info();
          }
          that.info();
        }).catch()
      }



    },
    computed: {
      // 根据计算属性模糊搜索
      tableData () {
        const searchTableInfo = this.searchTableInfo
        if (searchTableInfo) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.getSearchInfo.filter(data => {
            console.log("success"+data)
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).toLowerCase().indexOf(searchTableInfo) > -1
            })
          })
        }
        return this.getSearchInfo
      }
    },
    created(){
      this.info();
    }
  }

</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
  .table{
    width: 100%;
    font-size: 14px;
  }
  .red{
    color: #ff0000;
  }
  .mr10{
    margin-right: 10px;
  }
</style>
