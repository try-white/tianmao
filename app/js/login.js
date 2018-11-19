require(["config"],function(){
	require(["jquery","header","migrate","cookie"],function($,header,migrate,cookie){
		new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			});
			
		}).then(function(){
			header.cookie();
		}).then(function(){
			//处理表单提交
			console.log($("form"));
			$("form").submit(function(e){
				var	username=$("#username").val(),
				   console.log(username)
					password=$("#password").val()
					if(username=="" || username==null){
						alert("请输入您的用户名");
					}else if(username!=="" && password == ""){
						alert("请输入您的密码");
					}else{
						var data={
							username:username,
							password:password
						};
						//记住登陆状态的判断
						var expires;
						if($("#remember").prop("checked")){
							expires=3;
						}else{expires="";}
						
						$.ajax({
					         method:"post",
					         data:data,
					         dataType:"json",
					         url:"http://localhost/project/projectserver/api/login.php",
					        success:function(res){
						     if(res.code === 1){
						     	alert("登陆成功！");
						     	//https://blog.csdn.net/qiuych3/article/details/51566704
//							document.cookie = "login=true;path=/"; //使用cookie记录登录状态
						       	$.cookie("username",username,{
							          expires:expires,
							          path:"/"
						      });
							location.href="http://localhost:2333/index.html";		
						}else{
							alert("用户名或者密码错误");
							if(confirm("是否忘记密码？找回密码"));
						}
					}
				})
			   
			   }
				e.preventDefault();
			})
		})
	})
})
