
import React from "react";
import {
    Route,
    Redirect,
    HashRouter,
    Switch
} from "react-router-dom";

import LayoutPage from "../layout";
import Login from '@/views/login'
import { connect } from "react-redux";
import { Spin } from "antd";

const Home = () => (<div>Home</div>)
const Connect = () => (<div>Connect</div>)

const List = () => (<div>List</div>)
const Rich = () => (<div>Rich</div>)
// const Login = () => (<div>Login</div>)


// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.

export const menuConfig = [
  {
    title: '首页',
    key: '/',
    icon: 'home',
    component:Home
  },
  {
    title: '用户',
    key: '/user',
    icon: 'user',
    children: [
      {
        title: '联系',
        key: '/user/connect',
        component:Connect
      },
      {
        title: '用户列表',
        key: '/user/list',
        component:List
      },
    ]
  },
  {
    title: '组件',
    key: '/tool',
    icon: 'build',
    children: [
      {
        title: '富文本',
        key: '/tool/rich',
        component:Rich
      }
    ]
  }
];

const renderComponent = (routes) => {
  return routes.map((route) => {
    if(route.children){
      // eslint-disable-next-line no-unused-vars
      return  renderComponent(route.children)
    }else {
      return  <Route key={route.url} exact path={route.url} component={route.component} />
    }
  })
}

const RenderRouter = ({user,menus}) => {
  const {token} = user
  console.log(menus,'menus---------------');
  return (
    <HashRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      {
        !token ?
        <Redirect to="/login" />
        :
        <LayoutPage>
        { menus && menus.menus ? renderComponent(menus.menus):<Spin></Spin>}
      </LayoutPage>
      }
    </Switch>
  </HashRouter>
  )
}


export default connect((state) => ({user:state.user, menus:state.menus}),{})(RenderRouter)