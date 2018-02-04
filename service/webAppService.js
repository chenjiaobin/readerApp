var fs=require('fs')
exports.get_test_data=function(url){
	// var content=fs.readFileSync('./mock/test.json');
	var content = fs.readFileSync(url,"utf-8");
	return content;
}
exports.get_book_id_data=function(id){
	if(!id){
		id="18218";
	}
	var content=fs.readFileSync("./mock/book/"+id+".json","utf-8");
	return content;
}
exports.get_search_data=function(start,end,keyword){
	return function(cb){
		var http=require('http');
		var qs=require('querystring');
		var data={
			s:keyword,
			start:start,
			end:end
		};
		var content=qs.stringify(data);
		var http_request={
			hostname:'dushu.xiaomi.com',
			port:80,
			path:'/store/v0/lib/query/onebox?'+content
		};
		req_obj=http.request(http_request,function(res){
			var _content='';
			res.setEncoding('utf8');
			res.on('data',function(chunk){
				// data事件每次只有一个片段chunk
				_content+=chunk;
			});
			res.on('end',function(){
				cb(null,_content);
			});
		})
		req_obj.on('error',function(){

		});
		req_obj.end();
	}
}