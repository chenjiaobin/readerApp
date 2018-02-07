$.get('/ajax/category',function(data){
	console.log(data);
	new Vue({
		el:'#category',
		data:{
			category:data
		}
	})
},'json')