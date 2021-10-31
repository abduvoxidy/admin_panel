import React from "react"
import {Layout, Menu} from "antd"
import {BranchesOutlined , UserSwitchOutlined,DollarCircleOutlined , UserOutlined ,PictureOutlined } from "@ant-design/icons"
import NavbarPanel from "./NavbarPanel"
import {Link} from "react-router-dom"
import {Routes} from "../routes"
import "../css/Admin.css"

const AdminPanel = () => {

    const {Content, Sider} = Layout

    return (
        <React.Fragment >
            <NavbarPanel/>
            <Layout style={{height:'100vh'}}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" >
                        <Menu.Item key="1" icon={<PictureOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<BranchesOutlined />}>
                            <Link to="/branch">Branch</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UserSwitchOutlined />}>
                            <Link to="/clients">ClientType</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<DollarCircleOutlined />}>
                            <Link to="/currency">Currency</Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<UserOutlined/>}>
                            <Link to="/marital">Marital</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content >
                        <div className="site-layout-background" style={{padding: 30, minHeight: '100vh'}}>
                            <Routes/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </React.Fragment>
    );
};

export default AdminPanel;