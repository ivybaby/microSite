(function($){
	
	var tipsopt;
	$.fn.tips=function(options){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop; //滚动的高度
		tipsopt = $.extend({}, $.fn.tips.defaults, options);
		if($(tipsopt.tipName).length==0){
			
			
		var el=tipsopt.tipName.split("#").join("");
		$(tipsopt.tipInsert).append("<div id="+el+" class='cl'></div>");
		$(tipsopt.tipName).append("<p class='text-white row'>"+tipsopt.tipContent+"</p>").css({"background":"#000","-moz-opacity":"0.7","opacity":".70", 
            "filter":"alpha(opacity=70)","padding":"8px 0","top":-$(tipsopt.tipName).outerHeight()+'px',"position":"absolute","z-index":"1003","width":"100%","display":"none","left":0,
            "-webkit-transition":"top .5s ease-in .1s",
            "-o-transition":"top .5s ease-in .1s",
            "-moz-transition":"top .5s ease-in .1s",
            "transition":"top .5s ease-in .1s"}).addClass("text-center");
        if(scrollTop>44){
        	 $(tipsopt.tipName).css({"top":(scrollTop-44)+'px',"display":"block"});
        }else{
        	$(tipsopt.tipName).css({"top":0,"display":"block"});
        }
        $("body").css({"overflow-y":"hidden"});
        var permit=0;
        document.body.addEventListener('touchmove', function (event) {//阻止下滑
        if(permit==0){
                	event.preventDefault();
                   }
        }, false);
        
        setTimeout(function() { 
            $(tipsopt.tipName).remove();
            permit=1;
            $("body").css({"overflow-y":"scroll"});
            if(tipsopt.tipArea&&(!tipsopt.notText)){
        	   $(tipsopt.tipArea).val("请输入您对我们的反馈");
            }
        },2000);
         
		}
		
        
            
	}
	$.fn.inFocus=function(){
		$(this).focus(function(){
			$(this).val("");
		})
	}
	
	/*返回上一界面*/
	/*$.fn.back=function(){
		window.history.go(-1);
	}*/
	/*跳转到另一界面*/
	$.fn.ahrefTarget=function(){
 	    self.location.href=$(this).attr("datasrc");
	}
	/*搜索*/
	$.fn.getSearch=function (){
		$(this).find("input").on("focus keypress",function(){
			if($(this).val().length>0){
				$(this).closest(".search-bar").children(".cancel-icon").show();
			}
		});
		
		$(this).children(".cancel-icon").on("click",function(e){
			e.preventDefault();
			$(this).prev("input").val("").focus();
		})
	}
	var opt,option,opts,opti;
	/*登录*/
	$.fn.login=function(options){
		var oUserTel=15968172193;
		var oUserPwd=172193;
	    opti = $.extend({}, $.fn.login.defaults, options);
		if($(opti.userTel).val()==null||$(opti.userTel).val()!=oUserTel){
			$(opti.textShow).text("您输入的账户不存在!");
			$(opti.userTel).val("").focus();
		}else if($(opti.userPwd).val()==null||$(opti.userPwd).val()!=oUserPwd){
			$(opti.textShow).text("密码错误！");
			$(opti.userPwd).val("").focus();
		}else if(($(opti.userTel).val()==oUserTel)&&($(opti.userPwd).val()==oUserPwd)){
			$(opti.textShow).text("");
			window.location.href="./index.html";	
		}
		
	}
	function stopPropagation(e) { 
            if (e.stopPropagation) 
               e.stopPropagation(); 
            else 
               e.cancelBubble = true; 
        } 
	
	
	
	$.fn.modal=function(options){//遮罩
		opt = $.extend({}, $.fn.modal.defaults, options);
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop; //滚动的高度
		var screenHeight=document.body.scrollHeight;//屏幕的高度
		var screenWidth=document.body.scrollWidth;//屏幕的宽度
		
		var windowHeight=window.screen.height;
		
		var finalHeight=windowHeight;
		//alert(screenHeight+" "+$(document.body).outerHeight(true)+" "+window.screen.height);
		if(opt.getClose){
		    $(this).css({"height":$(this).outerHeight()+'px'});		
	    }
		/*阴影  start*/
		if(opt.maskShadow){
			$(opt.maskName).css({"display":"block"});
			$(this).css({"display":"block"});
			                   	    
            $("body").css({"overflow-y":"hidden"});
            if(!opt.getOverflow){
            	var permit=0;
                document.body.addEventListener('touchmove', function (event) {//阻止下滑
                if(permit==0){
                	event.preventDefault();
                   }
                }, false);
            }
            
            $(opt.maskName).css("top",scrollTop);
			if(opt.actionBottom&&!opt.actionCenter){
				$(this).css({"bottom":0-scrollTop});
				
			}else{
				if(opt.positionFix){
				    var hSpace=finalHeight-$(opt.bgLong).offset().top;
					$(opt.bgLong).css({"height":hSpace+"px"});
					
				}else{  
					if((screenHeight>windowHeight)&&(scrollTop==0)){
						finalHeight=windowHeight;
				        $(this).css({"top":parseInt((finalHeight-$(this).outerHeight()+scrollTop)/2)+"px","left":parseInt((screenWidth-$(this).outerWidth())/2)+"px"});
					}else{
						finalHeight=screenHeight;
				        $(this).css({"top":parseInt((finalHeight-$(this).outerHeight()+scrollTop)/2)+"px","left":parseInt((screenWidth-$(this).outerWidth())/2)+"px"});
					}
					
				}
			};
			
			
			$(opt.maskName).on('click',function(){ 
				$(""+opt.targetObject+","+opt.maskName+"").css({"display":"none"});
				if(!(opt.positionFix||opt.doubleNum)){
					$(opt.targetObject).css({"bottom":-200+scrollTop});
				}
				$("body").css({"overflow-y":"scroll"});
				permit=1;
            }); 
            
			
		}
		/*阴影  end*/
	}
	
	//tab 轮换
	$.fn.tab=function(options){//tab
		opt = $.extend({}, $.fn.tab.defaults, options);
		$(opt.tabContent).hide();
		$(opt.tabItem).each(function(){
			if($(this).hasClass("tab-item-active")){
				var $itemHref=$(this).attr("href");
				$($itemHref).show();
				return;
			}
		});
		$(opt.tabItem).on("click",function(e){
			e.preventDefault();
			if($(this).hasClass("tab-item-active")){
				return;
			}
			else{
				$(opt.tabItem).removeClass("tab-item-active");
			    $(this).addClass("tab-item-active");
			    $(opt.tabContent).hide();
			    $($(this).attr("href")).show();
			}
			
		})
		
	}
	function clearInput($obj){//清除input内容
		$obj.find("input").each(function(){
			$(this).focus(function(){
				$(this).val("").removeClass("text-danger");
			})
		})
	}
	//修改密码
	$.fn.modifyPwd=function(options){
		var step2=0,step3=0;
		var oripwd="172193";
		opt = $.extend({}, $.fn.tab.defaults, options);
		clearInput($(this));
		var $nuserPwd=$("#user_pwd_n");
		var regx= /(^[A-Za-z0-9]{6,11}$)/;
		
		function modPwd(a,b,a1,b1){
			if(a1){
				if(a.val().length==0||a.val().length==' '){
		    	   $(opt.textAlert).text("新密码为空！");
		    	   step3=0;
		        }else{
 			       if(regx.test(a.val())){
		    	       $(opt.textAlert).text("");
		    	       step3=1;
		         }else{
		    	       $(opt.textAlert).text("格式错误");
		    	       step3=0;
		           }
		        }
			}
			if(b1){
				if(b.val()!=oripwd){
				   $(opt.textAlert).text("原密码错误！");
				   step2=0;
				}else{
				   $(opt.textAlert).text("");
				    step2=1;
				}
			}
			
		}
 			
		$nuserPwd.blur(function(){
             modPwd($(this),false,true,false);
		});
		$(opt.oriPwd).blur(function(){
             modPwd(false,$(this),false,true);
		});
		
		
	    var userTel_data=15968172193;
	    
		$(opt.btnSave).on("click",function(e){
			e.preventDefault();
			if(!opt.small){
				step2=1;
			}
		
 			var $suserPwd=$("#user_pwd_sure");
 			
 		    if(step2==1){
 			    if(step3==1){
            	    if($suserPwd.val()!=$nuserPwd.val()){
		    	        $(opt.textAlert).text("两次密码不一致");
		    	        return;
		            }else{
		            	self.location.href="../login.html";
		            }
                }else{
                    modPwd($nuserPwd,false,true,false);	
                }
 			}else{
 				modPwd(false,$(opt.oriPwd),false,true);
 			} 		
 		})
	}
	
	//计时
	var countdown=60; 
    function settime(obj) { 
          if (countdown == 0) {   
             obj.text("重新获取").removeClass("text-danger").css({"border":"solid 1px #008ce6"}); 
             countdown=60;
             return;
          } else { 
             obj.addClass("text-danger").css({"border":"solid 1px #ff0000"}).text("重新发送(" + countdown + "s)"); 
             countdown--; 
          } 
         setTimeout(function() { 
            settime(obj); },1000) 
    }
	
	
	$.fn.forgetPwd=function(options){//忘记密码
		option = $.extend({}, $.fn.tab.defaults, options);
		
		var sData=15968172193;
 		$(option.isInput).bind({
           keyup: function() {
              if($(this).val().length==11){
                 $(option.btnCode).css({"border-color":"#008ce6","color":"#008ce6"})
              }else{
              	$(option.btnCode).css({"border-color":"#414141","color":"#414141"})
              }
           }
        });
        /*计时*/
       if(option.forget){
       	$(option.textShow).hide(); 
       }else{
       	$(option.textShow).show(); 

       }
        
        $(option.btnCode).on("click",function(e){
        	e.preventDefault();
        	if($(option.isInput).val()!=sData){
        		$(option.textShow).text("当前用户不是系统用户，请确认后再输入！").show();
        		return;
        	}
        	$(option.textShow).hide();
            settime($(this));
        });
        $(option.btnNext).on("click",function(e){
        	e.preventDefault();
        	e.stopPropagation();//防止触发冒泡
        	var $vcode=$(option.codeNum);
        	if($(option.btnCode).text()=="重新获取"){
        		$(option.textShow).text("验证码输入错误！").show();
        	}else{
        		if($vcode.val()==null||$vcode.val()!=111111){
        		    $(option.textShow).text("验证码输入错误！").show();
        	    }else{
        	    	if(option.forget){
        	    		self.location.href="modify-pwd.html";
        	    	}
        	    	else{
        	    		self.location.href="../index.html";
			         /*$(option.alertTarget).modal({
				         maskShadow:true,
				         actionBottom:true,
				         actionCenter:true
			          });*/
	
        	    	}
        		    
        	    }

        	}
        })
		
	};
	
	$.fn.register=function(opts){//会员注册
		var opt,step1=0,step2=0;
		opt = $.extend({}, $.fn.userConfirm.defaults,opts);
		
		function getStep(a,b,a1,b1){
			if(a1){
				if(a.val().length==0||a.val()==' '){
					$(opt.textAlert).text("真实姓名不能为空");
					a.val("");
					step1=0;
				}else{
					var namestring=a.val().split(" ").join(""); 
					var contactstring=namestring.substring(0,1)+' '+namestring.substring(1);
					a.val(contactstring);
					step1=1;
					$(opt.textAlert).text("");
				}
			}
			if(b1){
				if(b.val().length==0||b.val()==' '){
					$(opt.textAlert).text("手机号码不能为空");
					step2=0;
				}else{
					if(b.val().length==11){
					   step2=1; 
					}else{
					    $(opt.textAlert).text("手机号码不是11位");
					   step2=0;
					}
				}
			}
			
		}
		
		
		$(opt.trueName).bind({
			blur:function(){
				getStep($(opt.trueName),false,true,false);
			}
		});
		$(opt.userTelphone).bind({
			blur:function(){	
				getStep(false,$(opt.userTelphone),false,true);
			},
           keyup: function() {
              if($(this).val().length==11){
                 $(opt.btnCode).css({"border-color":"#008ce6","color":"#008ce6"});
                 $(opt.btnCode).on("click",function(e){
        	         e.preventDefault();
        	         $(opt.textAlert).text();
                     settime($(this));
                  });
              }else{
              	$(opt.btnCode).css({"border-color":"#414141","color":"#414141"});
              }
           }
			
		});
		  $(opt.btnRegister).on("click",function(e){//注册按钮的实现
		  	var ocode=111111;
        	e.preventDefault();
        	e.stopPropagation();//防止触发冒泡
        	var $vcode=$(opt.codeNum);
        	if(step1==1){
        		if(step2==1){
        			if($(opt.btnCode).text()=="重新获取"){
        		           $(opt.textAlert).text("验证码输入错误！");
        	        }else{
        		       if($vcode.val()==null||$vcode.val()!=ocode){
        		           $(opt.textAlert).text("验证码输入错误！");
        	           }else{
        	               self.location.href="../index.html";
        	           }
        	        }
        		}else{
        		   getStep(false,$(opt.userTelphone),false,true);
        		}
        	}else{
        	   getStep($(opt.trueName),false,true,false);
        	}
        
        });
	}
	
	$.fn.userConfirm=function(options){//修改手机号后返回个人中心确认账户
 			opts = $.extend({}, $.fn.userConfirm.defaults, options);
 			var data=15968172193;
 			if(data==15968172193){
 				$("#bWorning").modal({
 					     maskName:"#mask",
				         targetObject:"#bWorning",
				         maskShadow:true,
				         actionBottom:true,
				         actionCenter:true
			          });
			     return;
 			}
 		}
	
	$.fn.getSlide=function(options){//楼层，业态下拉
		var kinds = $.extend({}, $.fn.getSlide.defaults, options);
		$(kinds.slideCell).each(function(){

			$(this).on("click",function(e){
				e.preventDefault();
				$(kinds.slideCell).removeClass("text-primary").find("img").attr({"src":"../../img/activity_slidedown_icon.png","datasrc":"../../img/activity_slideup_icon.png"});
				
				var $datasrc=$(this).find("img").attr("datasrc");
				
				$(this).addClass("text-primary");
				$(this).find("img").attr({"datasrc":$(this).find("img").attr("src"),"src":$datasrc});
				
				$(kinds.slideFloorList).children("div").hide();
				var ohref=$(this).children("a").attr("href");
				$(ohref).show();
				$(kinds.slideFloorList+','+kinds.mask).css({"display":"block"});
				
				if($(ohref).hasClass("split-kinds")){
					$(ohref).find(kinds.splitItem).children("img").hide();
					$(ohref).find(kinds.splitItem).each(function(){
						if($(this).hasClass(kinds.splitActive)){
							$(this).children("img").show();
						}
						$(this).on("click",function(e){
							e.preventDefault();
							$(ohref).find(kinds.splitItem).removeClass(kinds.splitActive).children("img").hide();
							$(this).addClass(kinds.splitActive).children("img").show();
						});
					});
				}
				
				$(kinds.mask).on("click",function(e){
					e.preventDefault();
					$(kinds.slideFloorList+','+kinds.mask).css({"display":"none"});
					$(kinds.slideCell).removeClass("text-primary").find("img").attr({"src":"../../img/activity_slidedown_icon.png","datasrc":"../../img/activity_slideup_icon.png"});
				});
			});
		});
		
	}
	
	
	
})(jQuery)