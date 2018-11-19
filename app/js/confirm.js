require(["config"],function(){
	require(["jquery","header","footer"], function($,header,footer){
		//promise
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html",function(){
				header.cookie();
				resolve();
			});
			$("footer").load("/html/component/footer.html",function(){
				resolve();
			});
		}).then(function(){
			header.nav();
		})
		
})
})