var windowWidth=$(window).width();
	if(windowWidth<320){
		windowWidth=320;
	}
new Vue({
	el:"#search",
	data:{
		search:[],
		condition:false,
		empty:false,
		windowWidth:windowWidth
	},
	methods:{
		doSearch:function(){
			var keyword=$("#info").val();
			var that=this;
			$.get("/ajax/search",{keyword:keyword},function(data){
					that.condition=true;
					that.search=data.items;
					if(that.search.length==0){
						that.empty=true;
					}else{
						that.empty=false;
					}
			},'json')
		}
	}
})