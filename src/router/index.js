import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode : 'history',
  base: '/dist/',  //添加的地方
  routes: [
    // {
    //   path: '/',
    //   redirect: '/yonghuxinxiguanli'
    // },
    {
      path: '/guanliyuan',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children:[
        {
          path: '/yonghuxinxiguanli',
          component: resolve => require(['../components/page/Yonghuxinxiguanli.vue'], resolve),
          meta: { title: '用户信息管理' }
        },
        {
          path: '/yonghuxinxiluru',
          component: resolve => require(['../components/page/Yonghuxinxiluru.vue'], resolve),
          meta: { title: '用户信息录入' }
        },
        {
          path: '/mimaguanli',
          component: resolve => require(['../components/page/Mimaguanli.vue'], resolve),
          meta: { title: ' 密码管理' }
        },
        {
          path: '/gerenziliaoguanli',
          component: resolve => require(['../components/page/Gerenziliaoguanli.vue'], resolve),
          meta: { title: '个人资料管理' }
        },
        {
          path: '/leibiexinxiguanli',
          component: resolve => require(['../components/page/Leibiexinxiguanli.vue'], resolve),
          meta: { title: '类别信息管理' }
        },
        {
          path: '/yaopinguanli',
          component: resolve => require(['../components/page/Yaopinguanli.vue'], resolve),
          meta: { title: '药品管理' }
        },
        {
          path: '/jinhuoxinxiguanli',
          component: resolve => require(['../components/page/Jinhuoxinxiguanli.vue'], resolve),
          meta: { title: '进货信息管理' }
        },
        {
          path: '/jinhuotianjia',
          component: resolve => require(['../components/page/Jinhuotianjia.vue'], resolve),
          meta: { title: '进货添加' }
        },
        {
          path: '/rukuxinxiguanli',
          component: resolve => require(['../components/page/Rukuxinxiguanli.vue'], resolve),
          meta: { title: '入库信息管理' }
        },
        {
          path: '/dingdanxinxitianjia',
          component: resolve => require(['../components/page/Dingdanxinxitianjia.vue'], resolve),
          meta: { title: '订单信息添加' }
        },
        {
          path: '/dingdanxinxiguanli',
          component: resolve => require(['../components/page/Dingdanxinxiguanli.vue'], resolve),
          meta: { title: '订单信息管理' }
        },
        {
          path: '/yaopinliushuimingxi',
          component: resolve => require(['../components/page/Yaopinliushuimingxi.vue'], resolve),
          meta: { title: '药品流水明细' }
        },
        {
          path: '/kucunxinxichakan',
          component: resolve => require(['../components/page/Kucunxinxichakan.vue'], resolve),
          meta: { title: '库存信息查看' }
        },
        {
          path: '/gongyingshangxinxi',
          component: resolve => require(['../components/page/Gongyingshangxinxi.vue'], resolve),
          meta: { title: '供应商信息查看' }
        },
        {
          path: '/kehuxinxichakan',
          component: resolve => require(['../components/page/Kehuxinxi.vue'], resolve),
          meta: { title: '客户信息查看' }
        },
        {
          path: '/404',
          component: resolve => require(['../components/page/404.vue'], resolve),
          meta: { title: '404' }
        },
      ]
    },
    {
      path: '/yuangong',
      component: resolve => require(['../components/common/Index.vue'], resolve),
      meta: { title: '自述文件' },
      children:[
        {
          path: '/jinhuoxinxiguanli1',
          component: resolve => require(['../components/page/Jinhuoxinxiguanli.vue'], resolve),
          meta: { title: '进货信息管理' }
        },
        {
          path: '/jinhuotianjia1',
          component: resolve => require(['../components/page/Jinhuotianjia.vue'], resolve),
          meta: { title: '进货添加' }
        },
        {
          path: '/rukuxinxiguanli1',
          component: resolve => require(['../components/page/Rukuxinxiguanli.vue'], resolve),
          meta: { title: '入库信息管理' }
        },
        {
          path: '/dingdanxinxitianjia1',
          component: resolve => require(['../components/page/Dingdanxinxitianjia.vue'], resolve),
          meta: { title: '订单信息添加' }
        },
        {
          path: '/dingdanxinxiguanli1',
          component: resolve => require(['../components/page/Dingdanxinxiguanli.vue'], resolve),
          meta: { title: '订单信息管理' }
        },
        {
          path: '/yaopinliushuimingxi1',
          component: resolve => require(['../components/page/Yaopinliushuimingxi.vue'], resolve),
          meta: { title: '药品流水明细' }
        },
        {
          path: '/kucunxinxichakan1',
          component: resolve => require(['../components/page/Kucunxinxichakan.vue'], resolve),
          meta: { title: '库存信息查看' }
        },
        {
          path: '/404',
          component: resolve => require(['../components/page/404.vue'], resolve),
          meta: { title: '404' }
        },
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
