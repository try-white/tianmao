define(["jquery","cookie"],function(o,e){function c(){}return c.prototype.nav=function(){},c.prototype.cookie=function(){var e=o.cookie("username");e&&(o("#welcome").hide(),o("#hellow").hide(),o("#welcome-success").show().html("欢迎您,"+e),o("#hellow-success").show().html("退出"),o("#hellow-success").click(function(){o.cookie("username","",{expires:-1,path:"/"})}))},new c});