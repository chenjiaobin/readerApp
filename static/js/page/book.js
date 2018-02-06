var params=window.location.search;//获取到?id=123
var str=params.substring(params.indexOf("?")+1);//去掉参数前面的？
var arr=str.split("&");//["id=123"]
var obj={};
for(var i=0,len=arr.length;i<len;i++){
	var item=arr[i].split("=");
	var key=item[0];
	var val=item[1];
	obj[key]=val;
}
$.get("/ajax/book?id="+obj.id,function(data){
	console.log(data);
	new Vue({
		el:'#book',
		data:{
			item:data.item,
			author_books:data.author_books,
			related:data.related
		},
		methods:{
			readBook:function(){
				location.href="/reader";
			}
		}
	})
},'json')
