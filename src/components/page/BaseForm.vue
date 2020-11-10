<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> MV信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll(multipleSelection)">批量删除</el-button>
            </div>
            <el-table :data="mv.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                      stripe
                      border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="MV名称" width="200">
                </el-table-column>
                <!--<el-table-column prop="singer" label="歌手" width="200">-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="time" label="上传时间"  >-->
                <!--</el-table-column>-->
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <!--<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页的实现-->
            <div class="pagination">
                <el-pagination background
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :page-size="pagesize"
                               :current-page="currentPage"
                               layout="prev, pager, next"
                               :total="mv.length">
                </el-pagination>
            </div>
        </div>

        <!--编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="上传时间">
                    <el-date-picker type="date" placeholder="选择日期"
                                    v-model="form.time" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="歌曲名">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="歌手">
                    <el-input v-model="form.singer"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除后不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                mv: [],
                currentPage:1,//默认开始页面
                pagesize:9,//每页数据条数
                multipleSelection: [],
                msg:"",//记录每一条的信息，便于取id
                delarr:[],//存放删除的数据
                val:[],
                select_word: '',
                del_list: [],
                editVisible: false,
                delVisible: false,
                form: {
                    title: '',
                    time: '',
                    singer: '',
                },
            }
        },
        mounted() {
            this.getMv();
        },
//        computed: {
//            data() {
//                return this.tableData.filter((d) => {
//                    let is_del = false;
//                    for (let i = 0; i < this.del_list.length; i++) {
//                        if (d.name === this.del_list[i].name) {
//                            is_del = true;
//                            break;
//                        }
//                    }
//                    if (!is_del) {
//                        if (d.address.indexOf(this.select_cate) > -1 &&
//                            (d.name.indexOf(this.select_word) > -1 ||
//                                d.address.indexOf(this.select_word) > -1)
//                        ) {
//                            return d;
//                        }
//                    }
//                })
//            }
//        },
        methods: {
            getMv(){
                var that=this;
                that.$axios({
                    type: "get",
                    url:'http://127.0.0.1:9202/manage/getAllMv',
                    dataType: 'json',
                }).then(res=>{
                    that.mv=res.data
                }).catch()
            },
            // 分页导航
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange:function(currentPage) {
                this.currentPage=currentPage;
            },
            //筛选
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
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
                    time:that.form.time,  //此title为 input 输入框的内容
                    title:that.form.title,
                    singer:that.form.singer,

                };
                that.$axios({
                    url: 'http://127.0.0.1:9202/manage/updateMusic',
                    method: "post",
                    data: data
                }).then(res => {
                    if (res.data == 1) {
                        that.editVisible = false;
                        that.getMusic();
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
                    that.getMusic();
                }).catch()
            },
            //删除
            handleDelete(index, row){
                this.delVisible=true;
                this.idx = index;
                this.msg=row;//每一条数据的记录
                this.delarr.push(this.msg.id);

            },
            //批量删除
            delAll() {
                this.delVisible = true;//显示删除弹框
                const length = this.multipleSelection.length;
                for (let i = 0; i < length; i++) {
                    this.delarr.push(this.multipleSelection[i].id)
                }
            },
            //操作多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deleteRow() {
                var that = this;
                let data=that.delarr;
                that.$axios({
                    url: 'http://127.0.0.1:9202/manage/deleteMv',
                    method: "post",
                    data: data
                }).then(res => {
                    if (res.data == 1) {
                        that.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        that.delVisible=false;
                    }
                    location.reload();   //刷新当前页面  删除后更新未解决
                }).catch()
            },
        },


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
