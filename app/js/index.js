require(["config"],function(){
	require(["jquery","template","header","lunbo","footer"],function($,template,header,lunbo,footer){
		
		//promise
		new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html",function(){
				header.cookie();
				resolve();
			});
			$("footer").load("/html/component/footer.html", function(){
				footer.nav();
			});
		}).then(function(){
			$(".s_nav").mouseenter(function(){
				$("ul",".s_nav").css({"display":"block"});
			})
			$(".s_nav").mouseleave(function(){
				$("ul",".s_nav").css({"display":"none"});
			})
			header.nav();
		}).then(function(){
            $("#div1").lunbo({
            	goPrev:"left",
            	goNext:"right"
            });  
           
		}).then(function(){
			$.ajax({
				method:"get",
				url:"http://rap2api.taobao.org/app/mock/116815/products",
				success:function(res){
//					console.log(res);
					var str=template("pro-template",{products:res.products});
					$("#pro-list").html(str);
                   
                    $(".list_product").on('click',"#addCart",function(){
//                  	console.log(111)
                        //获取数据
                        var products=res.products;
//                      console.log(res.products[2].id) 3
                       $.cookie("List",products,{expires:10,path:"/"});
                         console.log(products)
                        
                       
                    });
				}
			})
		})
		
	     
		
	})
})