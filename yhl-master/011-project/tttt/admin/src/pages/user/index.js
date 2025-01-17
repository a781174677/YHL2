import React,{ Component,Fragment} from 'react'
import { Breadcrumb, Icon,Table, Divider, Tag } from 'antd';

import { connect } from 'react-redux' 

import { actionCreators }  from './store/index.js'

import axios from 'axios'


import moment from 'moment'

import AdminLayout from 'common/layout/index.js'

//调用this必须用constructor
class User extends Component {
    componentDidMount(){
    this.props.handlePage(1)
  }
 //生命周期函数
    render(){
      const columns = [
            {
              title: '用户名',
              dataIndex: 'username',
              key: 'username',
              render: username => <a>{username}</a>,
            },
            {
              title: '是否事管理员',
              dataIndex: 'isAdmin',
              key: 'isAdmin',
              render:(isAdmin)=>(isAdmin ? '是' : '否')
            },
            {
              title: '邮箱',
              dataIndex: 'email',
              key: 'email',
            },
            {
              title: 

              '电话',
              key: 'phone',
              dataIndex: 'phone',
             
            },
            {
              title: '创建时间',
              key: 'createdAt',
              dataIndex:'createdAt',
            },
          ];

          const { list,current,pageSize,total,handlePage,isFetching } = this.props;
          const dataSource = list.map((item)=>{
            return {
                    key: item.get('_id'),
                    username: item.get('username'),
                    isAdmin: item.get('isAdmin'),
                    email: item.get('email'),
                    phone:item.get('phone'),
                    createdAt:moment(item.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
              }
          }).toJS()
          // console.log(dataSource)
        return (
                <div className = 'User' >
                   <AdminLayout >
                    <Breadcrumb style={{ margin: '16px 0'}}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>用户列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='content'>
                        <Table columns={columns}
                        dataSource={dataSource} 
                        loading={isFetching}
                        pagination ={{
                          total:total,
                          pageSize:pageSize,
                          current:current,
                        }}
                        onChange={(page)=>{
                          handlePage(page.current)
                        }}
                        />
                    </div>
                   </AdminLayout>
                </div>
            )
        }
}




//将数据,属性从store映射到组件
const mapStateToProps = (state /*, ownProps*/) => {
  return {
 
      list:state.get('user').get('list'),
      current:state.get('user').get('current'),
      pageSize:state.get('user').get('pageSize'),
      total:state.get('user').get('total'),
      isFetching:state.get('user').get('isFetching'),
  }
}

//将数据,方法从store映射到组件
const mapDispatchToProps = (dispatch /*, ownProps*/) => {
  return {
       handlePage:(page)=>{
          dispatch(actionCreators.getPageAction(page))
      }
    }
}
export default connect( mapStateToProps, mapDispatchToProps)(User)