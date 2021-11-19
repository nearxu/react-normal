
import { Form, Input, Button, Spin } from "antd";
import { useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { getUserInfo } from "@/store/actions";
import './index.less'
const Login = (props) => {
    const {getUserInfo}  = props 

    const history = useHistory()
    const [loading,setLoading] = useState(false)


    const handleSubmit = (value) => {
       setLoading(true)
       getUserInfo(value).then(res => {
        setLoading(false)
        history.replace('/')
       }).catch(() => {
           setLoading(false)
       })
    }

    return (
      <div className="login-container">
        <Form onFinish={handleSubmit} className="content">
          <div className="title">
            <h2>用户登录</h2>
          </div>
          <Spin spinning={loading} tip="登录中...">
            <Form.Item name="username" initialValue="admin" rules={[
                {
                    required: true,
                    whitespace: true,
                    message: "请输入用户名",
                }
                ]}>
                <Input
                  placeholder="用户名"
                />
            </Form.Item>
            <Form.Item name="password" initialValue="123456" rules={[
                {
                    required: true,
                    whitespace: true,
                    message: "请输入密码",
                }
                ]}>
        
                <Input
                  type="password"
                  placeholder="密码"
                />
    
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
            <Form.Item>
              <span>账号 : admin 密码 : 随便填</span>
              <br />
              <span>账号 : editor 密码 : 随便填</span>
              <br />
              <span>账号 : guest 密码 : 随便填</span>
            </Form.Item>
          </Spin>
        </Form>
      </div>
    )
}

// eslint-disable-next-line no-unused-expressions
export default connect((store) => store.user,{getUserInfo})(Login) 