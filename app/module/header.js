define(["jquery","cookie"],function($,cookie){
	function Header(){
	}
	Header.prototype.nav=function(){
		
	}
	Header.prototype.cookie=function(){
		var username=$.cookie("username");
		if(username){
			//存在，登陆成功
//			$(".login-success").removeClass("hidden").prev("ul").remove();
//			$(".login-success a:first").html("欢迎："+user);
                //登陆注册按钮隐藏，欢迎显示
           //退出
          /* $("#").click(function(){
           	$.cookie("username","",{expires:-1,path:"/"})
           });*/
           //登陆注册显示，欢迎隐藏
           
           $("#welcome").hide();
           $("#hellow").hide();
           $("#welcome-success").show().html("欢迎您,"+username);
           $("#hellow-success").show().html("退出");
            $("#hellow-success").click(function(){
           	$.cookie("username","",{expires:-1,path:"/"})
           });
           
		}
	}
	return new Header();
})

