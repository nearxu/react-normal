import { useEffect, useState } from 'react';
import {Menu, Spin} from 'antd'
import { useHistory, useLocation } from 'react-router';
import { onFloatRoutes } from '../utils';
import { connect } from 'react-redux';
import {getMenus} from '@/store/actions'

const { SubMenu,Item } = Menu;

const Sider = (props) => {
    const {getMenus} = props
    const history = useHistory()
    const location = useLocation() 
    const [loading,setLoading] = useState(false)
    const [menus,setMenus] = useState([])
    const [openKeys, setOpenkeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const handleClick = (menu) => {
      setSelectedKeys(menu.key || menu.path)
      history.push(menu.key)
    }

    async function fetchMenu(){
      setLoading(true)
      try {
        let response = await getMenus()
        setMenus(response)
        // onOpenMenu(menus)
        setLoading(false)
        return response
      } catch (error) {
        setLoading(false)
      }
    }

    const onOpenMenu = (menus) => {
       // *all menu open
       const onChildKeys = (routes) =>  routes.reduce((pre,cur) => {
        let clones = pre.concat() 
        if(cur.children){
          clones.push(cur.key)
          onChildKeys(cur.children)
        }
        return clones
      },[])

      const openKeyArr = onChildKeys(menus)
      setOpenkeys(openKeyArr)

      // * first select key
      const floatPaths = onFloatRoutes(menus)
      const selectPath = floatPaths.find((path) => location.pathname === path.key)
      setSelectedKeys(selectPath.key)
    }

     // didMount
     useEffect(() => {
      fetchMenu()
    },[])

    const renderMenus = (menus) => {

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


    return (
      <>
      {
        loading || !menus.length ?
         <Spin></Spin>
         :
         <Menu
          mode="inline"
          theme="dark"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          className="layout-page-sider-menu"
        >    
          {renderMenus(menus)}
        </Menu>
      }
      </>
    
    
    )
}

export default connect((state) => ({menus:state.menus}) ,{getMenus})(Sider)
