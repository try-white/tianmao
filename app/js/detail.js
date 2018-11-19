require(["config"],function(){
	require(["jquery","header","footer","template","cookie"],function($,header,footer,template){
      new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html",function(){
				header.cookie();
				header.nav();
				resolve();
			});
			$("footer").load("/html/component/footer.html",function(){
				resolve();
			});
		}).then(function(){
			header.nav();
		}).then(function(){
			  $(function(){	
				$("#detail").on('mouseenter',"img.smallImage",function(){
				     var bigImgURL = $(this).attr("src");
//				     console.log(bigImgURL)
					  $("img.bigImg").attr("src",bigImgURL);     
			     })	   
				});
			  $("img.bigImg").load(function(){
				 $("img.smallImage").each(function(){
					var bigImgURL = $(this).attr("bigImgURL");
					img = new Image();
					img.src = bigImgURL;
					img.onload = function(){
					$("div.imgload").append($(img));
						};
					});			
				});
        }).then(function(){
        	$(function(){
        		var stock=98;
        		$("#detail").on('keyup',".productNumberSetting",function(){
        			var num=$(".productNumberSetting").val();
        			num=parseInt(num);
        			if(isNaN(num)) num=1;
        			if(num<=0) num=1;
        			if(num>stock) num=stock;
        			$(".productNumberSetting").val(num);
        		});
        		
        		$("#detail").on('click',".increaseNumber",function(){ 
				var num= $(".productNumberSetting").val();
				 num++;
				 if(num>stock)
					num = stock;
				$(".productNumberSetting").val(num);
			  });	

			  $("#detail").on('click',".decreaseNumber",function(){ 
				var num= $(".productNumberSetting").val();
				 --num;
				 if(num<=0)
					num = 1;
				$(".productNumberSetting").val(num);
			  });	
			  
//			  $("#productReviewDiv").on('click',"a.productDetailTopReviewLink",function(){ 
//			  alert(11)
//			  });
			  
			  
	     });
	      
        }).then(function(){
				//同时发送异步请求渲染主体部分
			   //从url上取出id参数，然后携带这个参数去请求当前数据
			var str=location.search.slice(1);
			var arr=str.split("=");
			var obj={};
			obj[arr[0]]=arr[1];
			 $.ajax({
				url:"http://localhost/project/projectserver/api/detail.php",
				data:obj,
				method:"POST",
				dataType:"json",
				success:function(res){
//					console.log(res);
	             if(res.code===1){
	             	$.cookie.json=true;
						   	    var user=$.cookie("username");
						   	  if(!user)
						   	  location.href:"/html/login.html";
			             	var str=template("detail-template",{product:res.product});
			             	$("#detail").html(str);
			             	
			             	//获取数据
			             	var id=res.product.id;
//			             	console.log(id);
			             	var bigImg=res.product.bigImg;
//			             	console.log(smallImage1)
			             	var productTitle=res.product.productTitle;
			             	var promotionPrice=res.product.promotionPrice;
			             	
			             	
                             //点击加入购物车
					         $("#detail").on('click',".addCartLink",function(){
			            	 $(".addCartButton").html("已加入购物车");
			            	 $(".addCartButton").attr("disabled","disabled");
			            	 $(".addCartButton").css("background-color","lightgray");
			            	 $(".addCartButton").css("border-color","lightgray");
			            	 $(".addCartButton").css("color","black");
			            	  $(".check").click(function(){
						      	var acount=$("#acount").html();
						          acount=parseInt(acount);
						           ++acount;
						            $("#acount").html(acount);
			                      //console.log(acount)
						      })
				             acount=acount;
	                      var arr={
			             		id:id,
			             		bigImg:bigImg,
			             		productTitle:productTitle,
			             		promotionPrice:promotionPrice,
			             		amount:1
			             	}

                          $.cookie.json=true;// 配置自动在JS值与JSON文本之间相互转换
                          var products = $.cookie("Shopping") || [];
                          //判断是否已有选购
                          var has=products.some(function(prod){
                          	if(prod.id==arr.id){//已经有选购商品
                          		prod.amount++;//数量自增
                          		return true;
                          	}
                          	return false;
                          });
                          if(!has)//未选购
                           products.push(arr);
	                        //保存购物车：存回cookie
	                        $.cookie("Shopping",products,{expires:10,path:"/"});
	                           //console.log(products);
	                    });
	                   
	                   
	                  }
				  }
			  })
		}).then(function(){
			console.log($("#productReviewDiv"));
			
			
		  });
	       
     })
 })
