var sex=window.location.href.split('/').pop();
$.get('/ajax/'+sex,function(data){
	console.log(data);
	new Vue({
		el:'#channel',
		data:{
			sex:data
		}
	})
},'json')