import React,{ Component,Fragment} from 'react'
import './app.css'

// 在jsx语法中使用组件分为html组件和自定义组件,自定义组件必须大写字母开头
// render方法的return语句后面不能是空白行,可以用()来格式化代码 
// 在返回组件内容时,如果不想有多余的标签,可以使用React.Fragment来代替html标签
class App extends Component {
	handleClick(){
		console.log(this)
		console.log('aaaa');
	}
	handleChange(ev){
		console.log(ev.target.value);
	}
 	render(){
    return (
    		<Fragment>
    		{
    		//<input style={{width:200,height:35}}/>
    		//<button style={{width:200,height:35}}>提交</button>
    		}
    		<div className='app'>
    		{
    			//获取输入框的数据
    			// 给输入框添绑定onChange事件
				// 在onChange的事件函数中通过event.target.value获取值,将获取到的值赋值给this.state
    		}
    		<input className='input' onChange={ this.handleChange} />
    		<button className ='btn' onClick={this.handleClick.bind(this)}>提交</button>
    		<ul className='list'>
	    		<li>吃饭</li>
	    		<li>睡觉</li>
	    		<li>打游戏</li>
    		</ul>
    		</div>
    		</Fragment>
    	)
  }
}

export default App
