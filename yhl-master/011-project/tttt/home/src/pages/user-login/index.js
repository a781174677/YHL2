require('pages/common/footer')
require('pages/common/logo')
require('./index.css')


var _util = require('util')

var api = require('api');

//错误提示封装
var formDataMsg = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')
	}
}
var page = {
	init:function(){
		
		this.bingdEvent();

	},
	bingdEvent:function(){
		//把this(page)存下来
		var _this = this
		$('#btn-submit').on('click',function(){
			_this.submint()
		})
		//监听键盘事件提交表单

		$('input').on('keydown',function(ev){
			if(ev.keyCode == 13){ 
				_this.submint()
			}
		})
	},
	//把提交表单的方法抽取出去
	submint:function(){
		//1.获取数据
		//存到一个对象里面
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
		}
		//2.验证数据合法性
		var validateFormData = this.validate(formData)
		//3.验证通过发送请求
		if (validateFormData.status) {
			//隐藏错误提示
			formDataMsg.hide()
			
			//发送ajax请求
			api.login({
				data:formData,
				success:function(data){
					//从登录成功跳转到首页 改造成 登录成功返回到上一页点击需要登录的地址
					window.location.href = _util.getParamsFromUrl('redirect') || '/'
				},
				error:function(msg){
					formDataMsg.show(msg);
				}
			})
			/*
			$.ajax({
				url:'/sessions/users',
				method:'post',
				dataType:'json',
				data:formData,
				success:function(data){
					// console.log(data)
					if(data.code == 0){
						window.location.href = '/'
					}else{
						formDataMsg.show(data.message);
					}
					
				},
				error:function(err){
					formDataMsg.show('网络错误,请稍后再试!!');
				}

			})*/
		}else{
			formDataMsg.show(validateFormData.msg);
			
		}
	},
	validate:function(formData){
		var result = {
			status:false,
			msg:''
		}
		//用户名非空判断
		if (!_util.validate(formData.username,'required')) {
			result.msg = '请输入用户名'
			return result
		}
		//用户名合法性验证
		if (!_util.validate(formData.username,'username')) {
			result.msg = '用户名是以字母开始的3-6位字符'
			return result
		}
		//密码非空判断
		if (!_util.validate(formData.password,'required')) {
			result.msg = '请输入密码'
			return result
		}
		//密码合法性验证
		if (!_util.validate(formData.password,'password')) {
			result.msg = '密码是以字母开始的3-6位字符'
			return result
		}
		result.status = true
		return result
	}
}


//调用上面定义的方法 方便管理
$(function(){
	page.init();
})