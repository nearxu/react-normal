import { Layout } from 'antd';

import SideComponent from './menu';
import Header from './header'
import './index.less'

const { Footer ,Sider, Content } = Layout;

const LayoutPage = (props) => {
    return (
        <Layout>
        <Sider>
          <SideComponent />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content>
            {props.children}
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
}

export default LayoutPage