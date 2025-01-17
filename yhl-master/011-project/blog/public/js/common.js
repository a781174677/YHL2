;(function($){
	var userInfo = $('#user-info');			//登陆成功界面
	var register = $('#register');			//注册界面
	var login = $('#login');				//登陆面板
	var registerInput = $('#username')		//用户名输入框
	var passwordInput = $('#password')		//密码输入框
	var repasswordInput = $('#repassword')	//确认密码输入框
	var loginUsername = $('#login-username');
	var loginPassword = $('#login-password');

	$('#login').on('keydown',function(ev){
		if(ev.keyCode == 13){ 
			$('#sub-login').trigger('click')
		}
	})
	$('#register').on('keydown',function(ev){
		if(ev.keyCode == 13){ 
			$('#sub-register').trigger('click')
		}
	})
	$('#go-register').on('click',function(){
		//隐藏登录面板
		login.hide();
		//显示注册面板
		register.show();
	})
	$('#go-login').on('click',function(){
		//显示登录面板
		login.show();
		//隐藏注册面板
		register.hide()
	})

	//首位必须字母，最少3-10位
	var userReg = /^[a-z][0-9]{2,9}$/i;
	//首位必须字母，剩下最少6-12位
	var passwordReg = /^[a-z]\w{5,11}$/i;
	//注册信息
	$('#sub-register').on('click',function(){
		//获取注册信息
		var registerName = registerInput.val();		//用户名输入框值
		var passwordName = passwordInput.val();		//密码输入框值
		var repasswordName = repasswordInput.val();	//确认密码输入框值
		var errs = register.find('.err');			//验证输入值的p标签
		var errMsg = '';
		console.log(registerName)
		console.log(passwordName)
		console.log(repasswordName)

		//验证数据合法性
		if(!userReg.test(registerName)){
			errMsg = '请输入3-10位的账号，首位必须为字母';
		}else if(!passwordReg.test(passwordName)){
			errMsg = '请输入6-12位密码，首字母必须为字母';
		}else if(passwordName != repasswordName){
			errMsg = '请确认两次输入的密码是否一致';
		}else{
			errMsg = '';
		}

		if(errMsg){
			errs.html(errMsg);	
		}else{
			errs.html('');
			$.ajax({
				url:'/user/register',
				type:'post',
				dataType:'json',
				data:{
					username: registerName,
					password: passwordName
				}
			})
			.done(function(data){
				if(data.code == 0){		//表示注册成功
					errs.html('');
					$('#go-login').trigger('click');
				}else{
					errs.html(data.massage)
				}
			})
			.fail(function(err){
				errs.html('请求失败，请稍后再试')
			})
		}

	})

	//登录信息
	$('#sub-login').on('click',function(){
		//获取注册信息
		var loginUser = loginUsername.val();			//用户名输入框值
		var loginPassName = loginPassword.val();		//密码输入框值
		var errs = login.find('.err');					//验证输入值的p标签
		var errMsg = '';
		//验证数据合法性
		if(!userReg.test(loginUser)){
			errMsg = '请输入3-10位的账号，首位必须为字母';
		}else if(!passwordReg.test(loginPassName)){
			errMsg = '请输入6-12位密码，首字母必须为字母';
		}else{
			errMsg = '';
		}

		if(errMsg){
			errs.html(errMsg);
			
		}else{
			errs.html('');
			$.ajax({
				url:'/user/login',
				type:'post',
				dataType:'json',
				data:{
					username: loginUser,
					password: loginPassName
				}
			})
			.done(function(data){
				
				// login.hide()
				// userInfo.show()
				// userInfo.find('span').html(data.data.username)
				
				window.location.reload();

			})
			.fail(function(err){
				errs.html('请求失败，请稍后再试')
			})
		}	
	})

	/*
	//退出登录
	$('#logout').on('click',function(){
		$.ajax({
			url:'/user/logout',
			type:'get'
		})
		.done(function(data){
			console.log(data)
			if(data.code == 0){ 
				window.location.href='/' //window上面的方法回到根地址
			}
		})
		.fail(function(err){
			$userInfo.find('.err').html('退出失败')
		})
	})
	*/


	//5.首页分页器逻辑
	var $articlePage = $('#articlePage');
	function buildArticleHtml(articles){
		var html ='';
		articles.forEach(function(article){
			html +=` <div class="panel panel-default content-item">
			    	<div class="panel-heading">
			     	 	<h3 class="panel-title">
			       		<a href="/detail/${ article._id.toString() }" class="link" target="_blank">${ article.title }</a>
			      		</h3>
			    	</div>
			        <div class="panel-body">
			        ${ article.intro }
			        </div>
			        <div class="panel-footer">
			          	<span class="glyphicon glyphicon-user"></span>
			          	<span class="panel-footer-text text-muted">${ article.user.username}</span>
			          	<span class="glyphicon glyphicon-th-list"></span>
			          	<span class="panel-footer-text text-muted">${ article.category.name}</span>
			          	<span class="glyphicon glyphicon-time"></span>
			          	<span class="panel-footer-text text-muted">${article.createdAt}</span>
			          	<span class="glyphicon glyphicon-eye-open"></span>
			          	<span class="panel-footer-text text-muted"><em>${ article.click}</em>已阅读</span>
			        </div>
   				</div>`
		})
		
		return html
	}
	function buildPaginationHtml(page,list,pages){
		var html = '';
		html +='<ul class="pagination">'
		if (page == 1) {
			html += `<li class="disabled">
		     			<a href="javascript:;" aria-label="Previous">
		        		<span aria-hidden="true">&laquo;</span>
		      			</a>
		    		</li>`
		}else{
			html += `<li>
		     			<a href="javascript:;" aria-label="Previous">
		       			<span aria-hidden="true">&laquo;</span>
		      			</a>
		    		</li>`
		}
		list.forEach(function(i){
			if(i == page){
				html+=`<li class="active"><a href="javascript:;">${ i }</a></li>`
			}else{
				html+=`<li><a href="javascript:;">${ i }</a></li>`
			}
		})
		if(page == pages){
			html+=`	<li class="disabled">
		      			<a href="javascript:;" aria-label="Next">
		        		<span aria-hidden="true">&raquo;</span>
		     			</a>
		    		</li>`
		}else{
			html+=` <li>
		      		<a href="javascript:;" aria-label="Next">
		       	 	<span aria-hidden="true">&raquo;</span>
		     		</a>
		    	</li>`
		}
		html+=`</ul>`
		   
		    
		
		return html
	}
	//监听事件构建分页数据HTML结构
	$articlePage.on('get-data',function(ev,data){
		//构建首页文章列表结构
		//构建文章列表
		$('#article-wrap').html(buildArticleHtml(data.docs))
		//构建分页器
		if(data.pages>1){
			$('#articlePage').html(buildPaginationHtml(data.page,data.list,data.pages))
		}else{
			$('#articlePage').html('')
		}
	})
	$articlePage.pagination({
		url:'/articles'
	})
})(jQuery)