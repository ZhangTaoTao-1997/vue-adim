<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 进货信息管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-input v-model="searchTableInfo" placeholder="请输入关键词" style="width:240px"></el-input>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <!--<el-button type="warning" @click="addnew()">添加</el-button>-->
      <el-table
        :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%;margin: 10px 0;text-align:center;">
        <el-table-column prop="danjuhao" label="单据号" width="150">
        </el-table-column>
        <el-table-column prop="shijian" label="进货时间" width="150">
        </el-table-column>
        <el-table-column prop="zongjiage" label="总金额" width="100">
        </el-table-column>
        <el-table-column prop="jingshouren" label="供应商" width="200">
        </el-table-column>
        <el-table-column prop="beizhu" label="备注" width="200">
        </el-table-column>
        <el-table-column label="明细" align="center" width="220">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleEdit(scope.$index, scope.row)">入库明细</el-link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <!--&lt;!&ndash;<el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>&ndash;&gt;-->
            <el-link type="warning"@click="addnew(scope.$index, scope.row)">添加入库明细</el-link>
            <!--<el-button type="danger" icon="el-icon-delete" circle @click="deleteRow(scope.row)"></el-button>-->
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!--<el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>-->

            <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <h4 style="color: mediumvioletred">进货总金额:{{totalNumber}} 元</h4>
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

    <!--入库明细弹出框 -->
    <el-dialog title="入库明细" :visible.sync="editVisible" width="50%">
      <el-table
        :data="Ruku"
        border
        style="width: 100%">
        <el-table-column
          prop="goodsId"
          label="货品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="shuliang"
          label="数量"
          width="200">
        </el-table-column>
        <el-table-column
          prop="beizhu"
          label="备注"
         >
        </el-table-column>
        <!--<el-table-column label="操作" align="center">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="danger"@click="deleteRow1(scope.row)">删除</el-button>-->
            <!--&lt;!&ndash;<el-button type="danger" icon="el-icon-delete" circle @click="deleteRow(scope.row)"></el-button>&ndash;&gt;-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </el-dialog>

    <!-- 新增提示框 -->
    <el-dialog title="添加入库明细" :visible.sync="addVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="供应商">
          <el-input v-model="form.jingshouren":disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form1" :model="form1" label-width="80px">
        <!--<el-form-item label="供应商">-->
          <!--<el-input v-model="form1.jingshouren":disabled="true"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="货品名称" prop="mingcheng">
          <el-select v-model="form1.goodsId" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.goodsId"
              :label="item.goodsId"
              :value="item.goodsId">
              <!--jingshouren对应数据库接受字段，mingcheng是获取到的内容，value是发送的内容-->
            </el-option>
          </el-select>
          <!--<el-input v-model="ruleForm.jingshouren"></el-input>-->
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form1.shuliang"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form1.beizhu"></el-input>
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
        options:[],
        Tuser:[],
        Ruku:[],
        searchTableInfo:"",
        getSearchInfo:[],
        currpage:1,//默认开始页面
        pagesize:8,//每页数据条数
        editVisible: false,
        delVisible: false,
        addVisible:false,
        form:{
          jingshouren:'',
        },
        form1:{
          jingshouren: '',
          goodsId: '',
          shuliang:'',
          beizhu:''
        }
      };
    },
    mounted() {
      this.info();
      this.getTuser();
    },
    methods: {
      getTuser(){
        var that=this;
        that.$axios({
          type: "get",
          url:'http://127.0.0.1:9202/kucun/findAll',
          dataType: 'json',
        }).then(res=>{
          that.options=res.data
        }).catch()
      },
//      getRuku(){
//        var that=this;
//        that.$axios({
//          type: "get",
//          url:'http://127.0.0.1:9202/rukumingxi/findAll',
//          dataType: 'json',
//        }).then(res=>{
//          that.Ruku=res.data
//        }).catch()
//      },
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
          url:'http://127.0.0.1:9202/ruku/findAll',
          dataType: 'json',
        }).then(res=>{
          this.Tuser=res.data
          //这些数据视情况，是你从后端拿来的。
          this.getSearchInfo =this.Tuser;
          console.log(this.getSearchInfo)
        }).catch();
      },
      //查看明细页面
      handleEdit(index, row) {
        this.editVisible = true;
        this.id = row.id;
        var that=this;
        that.$axios({
          type: "post",
          url:'http://127.0.0.1:9202/rukumingxi/findAll?id='+that.id,
          dataType: 'json',
        }).then(res=>{
          that.Ruku=res.data

        }).catch()
      },
//      saveEdit(row) {
//        var that=this;
//        that.$axios({
//          type: "post",
//          url:'http://127.0.0.1:9202/rukumingxi/findAll?id='+that.id,
//          dataType: 'json',
//        }).then(res=>{
//          that.Ruku=res.data
//        }).catch()

//        var that = this;
//        let data = {
//          id : that.id,
//          name:that.form.name,  //此title为 input 输入框的内容
//          chandi:that.form.chandi,
//          guige:that.form.guige,
//          danwei:that.form.danwei,
//          beizhu:that.form.beizhu,
//        };
//        that.$axios({
//          url: 'http://127.0.0.1:9202/goods/updateGoods',
//          method: "post",
//          data: data
//        }).then(res => {
//          if (res.data == 1) {
//            that.editVisible = false;
//            that.info();
//            that.$message({
//              message: '修改成功',
//              type: 'success'
//            });
//          }else {
//            that.$message({
//              message: '更新失败',
//              type: 'danger'
//            });
//          }
//          that.info();
//        }).catch()
//      },
      //删除
      deleteRow(row) {
        var that = this;
        let data=[];
        data.push(row.id);
        that.$axios({
          url: 'http://127.0.0.1:9202/ruku/delete',
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
      deleteRow1(row) {
        var that = this;
        let data=[];
        data.push(row.id);
        that.$axios({
          url: 'http://127.0.0.1:9202/rukumingxi/delete',
          method: "post",
          data: data
        }).then(res => {
          if (res.data == 1) {
            that.$message({
              message: '删除成功',
              type: 'success'
            });
            this.editVisible = false;
          }
        }).catch()
      },
      //增加新类别
      addnew(index, row) {
        this.addVisible = true;
        this.id = row.id;
        this.form = Object.assign({}, row);
      },
      //确认后执行增加操作
      addEdit(){
        var that = this
        let data = {
          rukuId:that.form.id,  //此title为 input 输入框的内容
          goodsId:that.form1.goodsId,
          shuliang:that.form1.shuliang,
          beizhu:that.form1.beizhu,
        };
        that.$axios({
          url: 'http://127.0.0.1:9202/rukumingxi/addRukumingxi',
          method: 'post',
          data: data
        }).then(res => {
          if (res.data == 1) {
            that.addVisible = false;
            that.$message({
              message: '添加成功',
              type: 'success'
            });
            location.reload();
//            this.$refs[form1].resetFields();
          }else {
            that.addVisible = false;
            that.$message({
              message: '添加失败',
              type: 'error'
            });
            location.reload();
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
      },
      totalNumber() {
        var number_total = 0;
        for (var i = 0; i < this.Tuser.length; i++) {
          number_total += this.Tuser[i].zongjiage;
        }
        return number_total;
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
