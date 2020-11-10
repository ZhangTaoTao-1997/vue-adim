<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-star-on',
                        index: '2',
                        title: '用户信息管理',
                        subs: [
                            {
                                index: 'yonghuxinxiguanli',
                                title: '用户信息管理'
                            },
                            {
                                index: 'yonghuxinxiluru',
                                title: '用户信息录入'
                            },
//                            {
//                              index: 'mimaguanli',
//                              title: '密码管理'
//                            },
//                            {
//                              index: 'gerenziliaoguanli',
//                              title: '个人资料管理'
//                            },
                        ]
                    },

                    {
                        icon: 'el-icon-star-on',
                        index: '3',
                        title: '药品信息管理',
                        subs: [
                            {
                                index: 'leibiexinxiguanli',
                                title: '类别信息管理'
                            },
                            {
                                index: 'yaopinguanli',
                                title: '药品管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '8',
                        title: '进货管理',
                        subs: [
                            {
                                index: 'jinhuoxinxiguanli',
                                title: '进货信息管理'
                            },
                            {
                              index: 'jinhuotianjia',
                              title: '进货添加'
                            },
                            {
                              index: 'rukuxinxiguanli',
                              title: '入库信息管理'
                            },
                        ]
                    },
                  {
                    icon: 'el-icon-star-on',
                    index: '9',
                    title: '出库管理',
                    subs: [
                      {
                        index: 'dingdanxinxitianjia',
                        title: '订单信息添加'
                      },
                      {
                        index: 'dingdanxinxiguanli',
                        title: '订单信息管理'
                      },
                      {
                        index: 'yaopinliushuimingxi',
                        title: '药品流水明细'
                      },
                    ]
                  },
                  {
                    icon: 'el-icon-star-on',
                    index: '10',
                    title: '库存信息',
                    subs: [
                      {
                        index: 'kucunxinxichakan',
                        title: '库存信息查看'
                      },
                    ]
                  },
                  {
                    icon: 'el-icon-star-on',
                    index: '11',
                    title: '供应商/客户 信息',
                    subs: [
                      {
                        index: 'gongyingshangxinxi',
                        title: '供应商信息查看'
                      },
                      {
                        index: 'kehuxinxichakan',
                        title: '客户信息查看'
                      },
                    ]
                  },
                    {
                        icon: 'el-icon-lx-warn',
                        index: '7',
                        title: '错误处理',
                        subs: [
                            {
                                index: '404',
                                title: '404页面'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
