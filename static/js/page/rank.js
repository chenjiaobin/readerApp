$.get('/ajax/rank',function(data){
	console.log(data);
	new Vue({
		el:'#rank',
		data:{
			rank:data.items
		}
	})
},'json')