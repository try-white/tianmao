require(["config"],function(){require(["jquery","header","footer"],function(n,t,o){new Promise(function(o,e){n("header").load("/html/component/header.html",function(){t.cookie(),o()}),n("footer").load("/html/component/footer.html",function(){o()})}).then(function(){t.nav()})})});