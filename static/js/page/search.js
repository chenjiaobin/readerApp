new Vue({
	el:"#search",
	data:{
		search:[],
		condition:false,
		empty:false
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