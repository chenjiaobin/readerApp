var koa=require("koa");
var controller=require("koa-route");
var app=koa();
var views=require('co-views');
var render=views('./view',{
	map:{html:'ejs'}
});
var koa_static=require('koa-static-server');
var querystring=require('querystring');

var service=require('./service/webAppService.js');
app.use(koa_static({
	rootDir:'./static/',
	rootPath:'/chen/',//这个是用路径访问的时候的路径，不用再前面加点，这个值可以是任意值，访问静态文件会经过rootDir
	maxage:0//设置静态文件缓存

}));

app.use(controller.get("/route_test",function* (){
	this.set("Cache-Control","no-cache");
	this.body="hellow koa";
}));


// 渲染模板
app.use(controller.get("/ejs_test",function* (){
	this.set("Cache-Control","no-cache");
	this.body = yield render("test",{
		title: "title_test"
	});
}));


app.use(controller.get("/",function *() {
	this.set("Cache-Control","no-cache");
	this.body = yield render("index",{
		title: "书城首页"
	});
}));

app.use(controller.get("/bookbacket",function *() {
	this.set("Cache-Control","no-cache");
	this.body = yield render("bookbacket",{
		title: "书架页"
	});
}));

app.use(controller.get("/category",function *() {
	this.set("Cache-Control","no-cache");
	this.body = yield render("category",{
		title: "分类页"
	});
}));

app.use(controller.get("/female",function *() {
	this.set("Cache-Control","no-cache");
	this.body = yield render("female",{
		title: "女性页"
	});
}));

app.use(controller.get("/male",function *() {
	this.set("Cache-Control","no-cache");
	this.body = yield render("male",{
		title: "男性页"
	});
}));

app.use(controller.get("/book",function *() {
	this.set("Cache-Control","no-cache");
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	this.body = yield render("book",{
		title: "详情页",
		bookId: bookId
	});
}));
//排行页面view
app.use(controller.get('/rank',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('rank',{
		nav:'排行页面'
	});
}));
app.use(controller.get("/search",function *() {
	this.set("Cache-Control","no-cache");
	this.body = yield render("search",{
		title: "搜索页"
	});
}));
//gernerate是一种一部执行的方案，是一种语言特性，完异步函数的执行
//promise是一种设计模式，做异步函数的执行

// 获取测试数据的api路由
app.use(controller.get("/api_test",function* (){
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/test.json");
}));

app.use(controller.get("/ajax/index",function *() {
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/home.json");
}));

app.use(controller.get("/ajax/bookbacket",function *() {
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/bookbacket.json");
}));

app.use(controller.get("/ajax/category",function *() {
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/category.json");
}));

app.use(controller.get("/ajax/rank",function *() {
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/rank.json");
}));

app.use(controller.get("/ajax/female",function *() {
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/channel/female.json");
}));
app.use(controller.get("/ajax/male",function *() {
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/channel/male.json");
}));

app.use(controller.get("/ajax/book",function *() {
	this.set("Cache-Control","no-cache");
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	if (!bookId) {
		bookId = ""
	}
	this.body = service.get_book_id_data(bookId);
}));

app.use(controller.get("/ajax/search",function *() {
	this.set("Cache-Control","no-cache");
	var params = querystring.parse(this.req._parsedUrl.query); // 把url上带的参数串转成数组对象
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start,end,keyword);
}));
app.listen(3001);
console.log("koa is started");

