$(function(){var e=$("#div1 ul li"),n=$("#div1 ol li"),i=0,a=!1,c=null;n.click(function(){a||(a=!0,$(this).addClass("ac").siblings().removeClass("ac"),e.eq(i).fadeOut(),i=$(this).index(),e.eq(i).fadeIn(function(){a=!1}))}),$("#goPrev").click(function(){a||(a=!0,e.eq(i).fadeOut(),--i<0&&(i=e.length-1),n.eq(i).addClass("ac").siblings().removeClass("ac"),e.eq(i).fadeIn(function(){a=!1}))}),$("#goNext").click(function(){a||(a=!0,e.eq(i).fadeOut(),++i>=e.length&&(i=0),n.eq(i).addClass("ac").siblings().removeClass("ac"),e.eq(i).fadeIn(function(){a=!1}))}),$("#div1").hover(function(){clearInterval(c)},function e(){return c=setInterval(function(){$("#goNext").trigger("click")},2e3),e}())});