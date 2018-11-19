require(["config"],function(){
	require(["jquery","header"], function($,header){
		//promise
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			});
			
		}).then(function(){
			var arr=[false,false,false,false];
              $("#username").blur(function(){
              	  var flag =true;
                        var uname=$("#username");
                     	var  ename=$("#errorName");
                     	  // 用户名为空/不为空 
                     	  if(uname.val()=="" || uname.val()==null){
					        ename.html("*用户名不能为空!");
					        flag = false;
					      }else if (uname.val().length<4 || uname.val().length>16){// 用户名长度
					        ename.html("长度为4-16!");
					          flag = false;
					      }else{
					        ename.html("");
					     }
					     if(flag){
					   	 arr[0]=true;
					   }  
                 });
                          
             $("#password").blur(function(){
             	    var flag =true;
                       	var pwd=$("#password");
                      	var epwd=$("#errorPassword");
                       	  // 密码为空/不为空 
					       if (pwd.val()=="" || pwd.val()==null) {
					          epwd.html("*密码不为空!");
					          flag = false;
					       }else if (pwd.val().length<6 || pwd.val().length>16){//密码长度
						        epwd.html("长度为6-16!");
						         flag = false;
						    }else {
						        epwd.html("");
						    }
						    if(flag){
					   	      arr[1]=true;
					   		}
                });
                       
             $("#InputRepassword").blur(function(){
                 	var flag =true;
                 	     var pwd=$("#password");
                       	 var rpwd=$("#InputRepassword");
                         var erpwd=$("#errorRepassword");
                        	// 确认密码不为空 
                        	if (rpwd.val()==""  || rpwd.val()==null){
						        erpwd.html("*确认密码不为空!");
						        flag=false;
						    }else if(pwd.val() != rpwd.val()){// 确认密码与密码不一致 
						    	erpwd.html("*密码不一致!");
						    	flag=false;
						    }else{
						    	 erpwd.html("");
						    }
						    if(flag){
						    	arr[2]=true;
						    }   
                       });    
                       
                       
                       $("#email").blur(function(){
                       	  var flag =true;
                               var eemail=$("#errorEmail");
                                // 邮箱格式验证 
						       var reg=/^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
                        	    //邮箱不为空 
                        	   var email=$("#email");
                        	   if (email.val()=="" || email.val()==null){
						        eemail.html("*邮箱不为空!");
						        flag=false;
						       }else if(reg.test(email.val())==false){
						    	eemail.html("邮箱格式错误!");
						    	flag=false;
						      }else{eemail.html("")}
						    if(flag){
						    	arr[3]=true;
						    }  
                       });
                       
                    $("form").submit(function(e){
						var	uname = $("#username").val(),
							pwd = $("#password").val(),
							Repassword = $("#InputRepassword").val(),
							email = $("#email").val()  
                    
                     	var isSucc=arr.every(function(item){
                     		return item;
                     	})
                     	if(isSucc){
                     		var data={
                     			uname:uname,
                     			email:email,
                     			pwd:pwd
                     		};
                     		$.ajax({
								method:"post",
								data:data,
								dataType:"json",
								url:"http://localhost/project/projectserver/api/register.php",
								success:function(res){
									if(res.code === 1){
										alert("注册成功！");
										window.location.href = "http://localhost:2333/html/login.html";
										e.preventDefault();
									}else{
										alert("注册失败！请重新注册");
										location.href = "http://localhost:2333/html/register.html";
									}
								}
							})
							
                     	}
                     	e.preventDefault();
                     	
                    });
				
				
			
		}).then(function(){
			/*https://blog.csdn.net/cc1258000/article/details/51458987*/
		})

	})
})
