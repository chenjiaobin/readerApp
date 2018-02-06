$.get("/ajax/index",function(data){
	console.log(data);
	var windowWidth=$(window).width();
	if(windowWidth<320){
		windowWidth=320;
	}
	 /*Zepto.js文檔--offset() 方法返回或设置匹配元素相对于文档的偏移（位置）。*/
   var offset = $($('.swipe-tab').find('a')[0]).offset();
   var index_header_tab_width = offset.width;
	new Vue({
		el:'#app',
		data:{
			screenWidth:windowWidth,
			doubleScreenWidth:windowWidth*2,
			index_header_tab_width:index_header_tab_width,
			bannerScroll:data.items[0].data.data,
			hot:data.items[1].data.data,
			recommend:data.items[2].data.data,
			female:data.items[3].data.data,
			male:data.items[4].data.data,
			free:data.items[5].data.data,
			zt:data.items[6].data.data,
			duration:0,
			position:0,
			head_duration:0,
			head_position:0,
			tab_1_class:'tab-on',
			tab_2_class:''
		},
		methods:{
			tabSwitch:function(pos){
				this.duration=0.5;
				this.head_duration=0.5;
				if(pos==0){
					this.position=0;
					this.head_position=0;
					this.tab_1_class='tab-on';
					this.tab_2_class='';
				}else{
					this.position=(-windowWidth);
					this.head_position=index_header_tab_width;;
					this.tab_2_class='tab-on';
					this.tab_1_class='';
				}
			},
			switchToBook:function(){
				location.href='/book?id=18218';
			}
		}
	})
},"json")