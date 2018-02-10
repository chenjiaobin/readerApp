var koa=require("koa");
var controller=require("koa-route");//koa 的路由
var app=koa();//实例化koa
var views=require('co-views');//可以通过这个来设定我们在html里面要使用的模板引擎
var render=views('./view',{
	map:{html:'ejs'}//这里我们设置为ejs模板引擎
});
var koa_static=require('koa-static-server');//koa设置静态资源的访问
var querystring=require('querystring');//这个是为了对路径的参数进行序列化和反序列化

var service=require('./service/webAppService.js');//调用我们自己写的服务层的文件，里面封装了请求数据的方法
//下面这个是设置静态资源访问的方式
app.use(koa_static({
	rootDir:'./static/',
	rootPath:'/chen/',//这个是用路径访问的时候的路径，不用再前面加点，这个值可以是任意值，访问静态文件会经过rootDir
	maxage:0//设置静态文件缓存

}));

//测试路由
app.use(controller.get("/route_test",function* (){
	this.set("Cache-Control","no-cache");
	this.body="hellow koa";
}));


// ejs模板渲染测试
app.use(controller.get("/ejs_test",function* (){
	this.set("Cache-Control","no-cache");
	this.body = yield render("test",{
		title: "title_test"//这个title属性可以通过ejs模板的语法渲染出来<%=title%>
	});
}));

//yield方法，是es6的一种方法，gernerate是一种一部执行的方案，是一种语言特性，完异步函数的执行
//promise是一种设计模式，做异步函数的执行
//返回首页模板
app.use(controller.get("/",function *() {
	this.set("Cache-Control","no-cache");
	this.body = yield render("index",{
		title: "书城首页"
	});
}));

//返回书架模板
app.use(controller.get("/bookbacket",function *() {
	this.set("Cache-Control","no-cache");
	this.body = yield render("bookbacket",{
		title: "书架页"
	});
}));
//返回分类模板
app.use(controller.get("/category",function *() {
	this.set("Cache-Control","no-cache");
	this.body = yield render("category",{
		nav:'分类页面',
		title: "分类页"
	});
}));
//返回女性模板
app.use(controller.get("/female",function *() {
	this.set("Cache-Control","no-cache");
	this.body = yield render("female",{
		nav:'女生频道',
		title: "女性页"
	});
}));
//返回男性模板
app.use(controller.get("/male",function *() {
	this.set("Cache-Control","no-cache");
	this.body = yield render("male",{
		nav:'男生频道',
		title: "男性页"
	});
}));
// 返回书籍详情
app.use(controller.get("/book",function *() {
	this.set("Cache-Control","no-cache");
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	this.body = yield render("book",{
		title: "详情页",
		nav:'书籍详情',
		bookId: bookId
	});
}));
// 返回用户中心模板
app.use(controller.get("/usercenter",function *(){
	this.set("Cache-Control","no-cache");
	this.body=yield render("user-center",{
		nav:'用户中心'
	})
}))
//排行页面view
app.use(controller.get('/rank',function *(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('rank',{
		nav:'排行页面'
	});
}));
// 点击导航上面的搜索后跳转到这个搜索页面进行搜索
app.use(controller.get("/search",function *() {
	this.set("Cache-Control","no-cache");
	this.body = yield render("search",{
		nav:'搜索',
		title: "搜索页"
	});
}));
//这个是文章阅读的页面
app.use(controller.get("/reader",function *() {
	this.set("Cache-Control","no-cache");
	this.body = yield render("reader",{
		title: "看书"
	});
}));


// 获取测试数据的api路由
app.use(controller.get("/api_test",function* (){
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/test.json");
}));

/*
**下面这些请求数据的方法已经在服务层webappservice里面封装好了
*/

// 获取首页数据
app.use(controller.get("/ajax/index",function *() {
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/home.json");
}));
// 获取书架数据
app.use(controller.get("/ajax/bookbacket",function *() {
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/bookbacket.json");
}));
// 获取分类书籍的数据
app.use(controller.get("/ajax/category",function *() {
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/category.json");
}));
// 获取排行书籍数据
app.use(controller.get("/ajax/rank",function *() {
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/rank.json");
}));
// 获取女性图书数据
app.use(controller.get("/ajax/female",function *() {
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/channel/female.json");
}));
// 获取男性书籍数据
app.use(controller.get("/ajax/male",function *() {
	this.set("Cache-Control","no-cache");
	this.body = service.get_test_data("./mock/channel/male.json");
}));
// 获取具体书本的文章内容，需要传递书籍的id进行获取
app.use(controller.get("/ajax/book",function *() {
	this.set("Cache-Control","no-cache");
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	if (!bookId) {
		bookId = ""
	}
	this.body = service.get_book_id_data(bookId);
}));
//获取检索的数据，这个数据是真实的从doshu.ximiao.com里获取到的
app.use(controller.get("/ajax/search",function *() {
	this.set("Cache-Control","no-cache");
	var params = querystring.parse(this.req._parsedUrl.query); // 把url上带的参数串转成数组对象
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start,end,keyword);
}));

//目录view
app.use(controller.get('/chapter',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('catolog',{nav:'目录'});
}));

//获取目录标题列表
app.use(controller.get('/ajax/chapter', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_test_data('./mock/reader/chapter.json');
}));
//获取书籍的文章内容
app.use(controller.get('/ajax/chapter_data', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
	   id = "";
	}
	this.body = service.get_chapter_content_data(id);
}));

app.listen(3001);
console.log("koa is started");

