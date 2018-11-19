require(["config"],function(){
	require(["jquery","header","footer","template","cookie"],function($,header,footer,template){
	new Promise(function(resolve,reject){
		   $("header").load("/html/component/header.html",function(){
		   	     resolve();
			    header.cookie();
				
			});
			$("footer").load("/html/component/footer.html",function(){
				resolve();
			});
			
	 }).then(function(){
	 	         function Shopping(){
	 	         	this.products=null;
	 	         	this.load();
	 	         	this.addListener();
	 	         }
	 	         
	   	        Shopping.prototype={
	   	        	constructor:Shopping,
	   	        	load:function(){   	        	
	   	        		// 配置 cookie 插件自动转换 JS 与 JSON
	   	        	$.cookie.json = true;
	   	        		// 读取cookie中保存的购物车
	   	        	var products = this.products = $.cookie("Shopping") || [];
//	   	        	console.log(products);
	   	        	//渲染模板
//	   	        	console.log(products)
						var data = {products: products}
						var str = template("cart-body-template",data);
						$(".cart-table tbody").html(str);
	   	        	},
	   	        	// 注册事件监听
			  addListener: function() {
				// 删除
				$(".cart-table tbody").on("click", ".del", $.proxy(this.delHandler, this))
				// +/-数量
				$(".cart-table tbody").on("click", ".decrement,.increment", $.proxy(this.decIncHandler, this))
				// 输入修改数量
				$(".cart-table tbody").on("blur", ".amount", $.proxy(this.inputHandler, this));
				// 全选
				$(".ck_all").on("click", $.proxy(this.ckAllHandler, this));
				// 部分选中
				$(".cart-table tbody").on("click", ".ck_prod", $.proxy(this.ckProdHandler, this));
			  },
	   	        	// 删除单行
			delHandler: function(event) {
				// 获取事件源元素(DOM元素)
				var src = event.target;
				// 获取事件源元素所在行(jQuery对象)
				var tr = $(src).parents("tr");
				// 获取商品 id
				var id = tr.find(".id").text();
				// 从数组中删除该 id 对应的商品对象
				this.products = this.products.filter(function(prod) {
					return !(prod.id == id);
					/*if (prod.id == id)
						return false;
					return true;*/
				});
				// this.products = this.products.filter(prod => !(prod.id == id));

				// 从 cookie 中保存的购物车结构中删除商品数据
				$.cookie("Shopping", this.products, {expires: 10, path: "/"});
				// 从 DOM 树中删除 DOM 行结构
				tr.remove();

				// 计算合计
				this.calcTotal();

				// 判断是否有购物车商品
				/*if (this.products.length === 0) { // 购物车为空
					$(".empty").show().siblings(".not-empty").hide();
				}*/
			},
			// +/-数量处理
			decIncHandler: function(event) {
				// 事件源元素（DOM）
				var src = event.target;
				// 事件源元素所在行(jQuery对象)
				var tr = $(src).parents("tr");
				// 商品 id
				var id = tr.find(".id").text();
				// 商品对象
				var products = this.products.filter(function(prod) {
					return prod.id == id;
					
				})[0];
				// +/-数量
				if ($(src).is(".decrement")) { 
					if (products.amount <= 1)
						return;
					products.amount--;
				} else { 
					products.amount++;
				}
				// 保存到 cookie 中（修改数量后的数组）
				$.cookie("Shopping", this.products, {expires:10, path:"/"});

				// 页面渲染
				tr.find(".amount").val(products.amount);
				tr.find(".sub").text(products.amount*products.promotionPrice);

				// 计算合计
				this.calcTotal();
			},
			// 输入数量处理
			inputHandler: function(event) {
				// 事件源
				var src = event.target;
				// 所在行
				var tr = $(src).parents("tr");
				// 商品 id
				var id = tr.find(".id").text();
				// 商品对象
				var products = this.products.filter(prod=>prod.id == id)[0];
				// 修改数量
				var _amount = $(src).val();
				var reg = /^[1-9]\d*$/;
				if (!reg.test(_amount)) { // 格式有误，则还原为原有数量值
					$(src).val(products.amount);
					return;
				}
				products.amount = _amount;
				// 保存回 cookie 中
				$.cookie("Shopping", this.products, {expires:10, path:"/"});
				// 显示小计
				tr.find(".sub").text(products.amount * products.promotionPrice);

				// 计算合计
				this.calcTotal();
			},
               // 全选处理
			ckAllHandler: function(event) {
				var status = $(event.target).prop("checked") // element.checked
				console.log(status);
				// 将各商品行前复选框选中状态设置为全选的选中状态
				$(".ck_all").prop("checked", status);
               /* var src=event.target;
                var all=$(".ck_all");
                $(src).toggleClass("checked");
                if($(".ck_prod").length==this.products.length){
                	all.addClass("all-checked");
                }else{
                	all.removeClass("all-checked");
                }*/
                 
				// 计算合计
				this.calcTotal();
			},
			// 部分选中处理
			ckProdHandler: function(event) {
				/* 获取购物车主体中选中的复选框个数
				var count = $(".ck_prod:checked").length;
				 设置全选复选框选中状态
				var status = count === this.products.length;
				$(".ck_prod").prop("checked", status);*/
                
				// 计算合计
				this.calcTotal();
			},
			// 计算合计金额
			calcTotal: function() {
				// 将选中行中的小计金额累加
				var sum = 0;
				// 选中行中的复选框
				$(".ck_prod:checked").each(function(index, element) {
					// console.log(index, element, this, element == this);
					sum += Number($(this).parents("tr").find(".sub").text());
				});
				// 显示
				console.log($(".total"));
				$(".total").text(sum);
			}
	   	   
	   	   
	   	    }
	   	       new Shopping();
	   })
	})
})
