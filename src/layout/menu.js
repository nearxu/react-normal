import { useEffect, useState } from 'react';
import {Menu} from 'antd'
import {menuConfig} from '@/router'
import { useHistory, useLocation } from 'react-router';
import { onFloatRoutes } from '../utils';

const { SubMenu,Item } = Menu;

const Sider = () => {
    const history = useHistory()
    const location = useLocation() 
    const [openKeys, setOpenkeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const handleClick = (menu) => {
      setSelectedKeys(menu.key || menu.path)
      history.push(menu.key)
    }

    const getMenus = (menus) => {
        return menus?.map(menu => {
            return menu.children ? (
                <SubMenu key={menu.key || menu.path} title={menu.title}>
                {getMenus(menu.children)}
              </SubMenu>
            ):(
                <Item key={menu.key || menu.path} onClick={() => handleClick(menu)}>
                { menu.title}
              </Item>
            )
        })
    }

    const onOpenChange = (keys) => {
      setOpenkeys(keys);
    };

    // didMount
    useEffect(() => {
      // *all menu open
      const onChildKeys = (routes) =>  routes.reduce((pre,cur) => {
        let clones = pre.concat() 
        if(cur.children){
          clones.push(cur.key)
          onChildKeys(cur.children)
        }
        return clones
      },[])

      const openKeyArr = onChildKeys(menuConfig)
      setOpenkeys(openKeyArr)

      // * first select key
      const floatPaths = onFloatRoutes(menuConfig)
      const selectPath = floatPaths.find((path) => location.pathname === path.key)
      setSelectedKeys(selectPath.key)

    },[])

    return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      className="layout-page-sider-menu"
    >
      {getMenus(menuConfig)}
    </Menu>
    
    )
}

export default Sider


// <Menu
// onClick={handleClick}
// style={{ width: 256 }}
// defaultSelectedKeys={['1']}
// defaultOpenKeys={['sub1']}
// mode="inline"
// >
// <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
//   <Menu.ItemGroup key="g1" title="Item 1">
//     <Menu.Item key="1">Option 1</Menu.Item>
//     <Menu.Item key="2">Option 2</Menu.Item>
//   </Menu.ItemGroup>
//   <Menu.ItemGroup key="g2" title="Item 2">
//     <Menu.Item key="3">Option 3</Menu.Item>
//     <Menu.Item key="4">Option 4</Menu.Item>
//   </Menu.ItemGroup>
// </SubMenu>
// <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
//   <Menu.Item key="5">Option 5</Menu.Item>
//   <Menu.Item key="6">Option 6</Menu.Item>
//   <SubMenu key="sub3" title="Submenu">
//     <Menu.Item key="7">Option 7</Menu.Item>
//     <Menu.Item key="8">Option 8</Menu.Item>
//   </SubMenu>
// </SubMenu>
// <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
//   <Menu.Item key="9">Option 9</Menu.Item>
//   <Menu.Item key="10">Option 10</Menu.Item>
//   <Menu.Item key="11">Option 11</Menu.Item>
//   <Menu.Item key="12">Option 12</Menu.Item>
// </SubMenu>
// </Menu>