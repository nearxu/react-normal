import React from 'react'
import { Breadcrumb, Spin } from "antd";


import { Layout } from 'antd';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';

const { Header } = Layout;

const getPath = (menuList, pathname) => {
    let temppath = [];
    try {
      function getNodePath(node) {
        temppath.push(node);
        //找到符合条件的节点，通过throw终止掉递归
        if (node.key === pathname) {
          throw new Error("GOT IT!");
        }
        if (node.children && node.children.length > 0) {
          for (var i = 0; i < node.children.length; i++) {
            getNodePath(node.children[i]);
          }
          //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
          temppath.pop();
        } else {
          //找到叶子节点时，删除路径当中的该叶子节点
          temppath.pop();
        }
      }
      for (let i = 0; i < menuList.length; i++) {
        getNodePath(menuList[i]);
      }
    } catch (e) {
      return temppath;
    }
  };

const BreadCrumb = ({menus}) => {
 
    // if(!menus || !menus.length) {
    //   return <div />
    // } 
 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation()
    const {pathname} = location
    let path = getPath(menus,pathname)
    const first = path && path[0];
    if (first && first.title.trim() !== "首页") {
      path = [{ title: "首页", key: "/dashboard" }].concat(path);
    }
    return (
        <div className="bread-container">
            <Breadcrumb>
                {
                    path && path.length ? path.map((route) => {
                      return (
                          route.title === '首页' ?
                        (
                            <Breadcrumb.Item key={route.key}>
                                <a href={`#${route.key}`}>{route.title}</a>
                            </Breadcrumb.Item>
                        )  :
                        (
                            <Breadcrumb.Item key={route.key}>{route.title}</Breadcrumb.Item>
                        )
                      )
                    })
                    :
                    <Spin></Spin>
                }
            </Breadcrumb>
        </div>
    )
}

const HeaderComponent = () => {
    return (
        <>
            <Header />
            {/* <BreadCrumb /> */}
        </>
    )
}

export default connect((state) => ({menus:state.menus}),{})(HeaderComponent)