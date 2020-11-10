<template>
    <div>
        <div class="container" width="30%">

            <!--<el-upload-->
                    <!--class="upload-demo"-->
                    <!--name="img"-->
                    <!--action="http://127.0.0.1:9202/file/uploadimg"-->
                    <!--:on-preview="handlePreview"-->
                    <!--:on-remove="handleRemove"-->
                    <!--:file-list="fileList"-->
                    <!--list-type="picture">-->
                <!--<el-button size="small" type="primary">上传照片</el-button>-->
                <!--<div slot="tip" class="el-upload__tip">此按钮为上传封面图片</div>-->
            <!--</el-upload>-->
            <div><br></div>
            <el-upload
                    class="upload-demo"
                    name="mv"
                    action="http://127.0.0.1:9202/file/uploadmv"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="file">
                <el-button size="small" type="primary">上传MV</el-button>
                <div slot="tip" class="el-upload__tip">此按钮为上传MV文件</div>
            </el-upload>
        </div>
        <div><br></div>
        <div id="app">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="歌曲名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <!--<el-form-item label="歌手名" prop="singer">-->
                    <!--<el-input v-model="ruleForm.singer"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="歌曲全称" prop="mvPath">
                    <el-input v-model="ruleForm.mvPath"></el-input>
                </el-form-item>
                <!--<el-form-item label="封面图片名称" prop="img_path">-->
                    <!--<el-input v-model="ruleForm.img_path" placeholder="封面图片名称.jpg"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="上传日期" required>-->
                    <!--<el-col :span="11">-->
                        <!--<el-date-picker type="date" placeholder="选择日期"-->
                                        <!--v-model="ruleForm.time"-->
                                        <!--value-format="yyyy-MM-dd"-->
                                        <!--style="width: 100%;">-->

                        <!--</el-date-picker>-->
                    <!--</el-col>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                    <el-button type="danger" @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import VueCropper  from 'vue-cropperjs';
    export default {
        name: 'upload',
        data: function(){
            return {
                ruleForm: {
                    name:'',
                    mvPath:'',

                },

                rules: {
                    name: [
                        { required: true, message: '请输入MV名', trigger: 'blur' },
                    ],
                    mvPath: [
                        { required: true, message: '请输入全称', trigger: 'blur' },
                    ],
                },
            }
        },
        components: {
            VueCropper
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var that = this
                        let data = {
                            name:that.ruleForm.name,

                            mvPath: that.ruleForm.mvPath,

                        };
                        that.$axios({
                            url: 'http://127.0.0.1:9202/manage/addMv',
                            method: 'post',
                            data: data
                        }).then(res => {
                                if (res.data == 1) {
                                    that.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    this.$refs[formName].resetFields();
                                }
                            }
                        ).catch()
                    }else {
                        this.$message.error('请正确添加信息');
                        return false;
                    }
                });
            },
            resetForm(formName)
            {
                this.$refs[formName].resetFields();
            },

        },
    }
</script>

<style scoped>
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>