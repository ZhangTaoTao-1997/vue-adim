<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 库存信息查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-input v-model="searchTableInfo" placeholder="请输入关键词" style="width:240px"></el-input>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <!--<el-button type="warning" @click="addnew()">新增类别</el-button>-->
      <!--<el-button type="primary" @click="doFilter">搜索</el-button>-->
      <el-table
        :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%;margin: 10px 0;text-align:center;">
        <el-table-column prop="goodsId" label="货品名称" width="400">
        </el-table-column>
        <el-table-column prop="shuliang" label="库存数量" width="400">
        </el-table-column>

        <el-table-column  prop="zhuangtai" label="状态" >
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Tuser:[ ],
        searchTableInfo:"",
        getSearchInfo:[],
        currpage:1,//默认开始页面
        pagesize:8,//每页数据条数
        editVisible: false,
        delVisible: false,
        addVisible:false,
        form: {
          name: '',
          jieshao: '',
        },
        form1:{
          name:'',
          jiehsao:'',
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
          url:'http://127.0.0.1:9202/kucun/findAll',
          dataType: 'json',
        }).then(res=>{
          this.Tuser=res.data
          //这些数据视情况，是你从后端拿来的。
          this.getSearchInfo =this.Tuser;
          console.log(this.getSearchInfo)
        }).catch();
      },


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
