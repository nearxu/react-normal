
// auto load
// const modulesFiles = import.meta.globEager('../views/test/*.js')



const modulesFiles = {
  'views/auth/system/access/index.vue': () => import('@/views/test/a.js'), // 资源管理
  'views/auth/system/account/index.vue': () => import('@/views/test/b.js'), // 账号管理
  'views/auth/system/dict/index.vue': () => import('@/views/test/c.js'), // 字典管理
  'views/auth/system/role/index.vue': () => import('@/views/test/d.js'), // 角色管理
  'views/shared/demos/form/rule-form.vue': () => import('@/views/test/e.js'), // 验证表单
  'views/shared/demos/icons/Iconfont.vue': () => import('@/views/test/f.js'), // 自定义图标
  'views/shared/demos/tables/summary-table/index.vue': () => import('@/views/test/g.js'), // 合计表格
  'views/shared/demos/button.vue': () => import('@/views/test/h.js'), // 自定义按钮
  'views/shared/demos/custom-modal.vue': () => import('@/views/test/i.js') // 自定义模态框
}

let constantRouterComponents = {}

for(let key in modulesFiles){
  console.log(modulesFiles[key]);
  constantRouterComponents[key] = modulesFiles[key]
}


const list2Tree = (items) => {
  return items.map(item => {
    if(item.children){
      return list2Tree(item.children)
    }else {
      return {
        ...item,
        component:item.viewPath ? constantRouterComponents[item.viewPath]:undefined,
        title:item.name,
        key:item.url
      }
    }
  })
}

export const getAsyncRouter = (routes) => {
    const routers = list2Tree(routes)
    return routers
}