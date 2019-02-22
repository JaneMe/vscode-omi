const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');

const eco = require("./ecosystem/index");  //omi生态更新、下载、项目创建(创建项目包含在线和离线两种方式)
const hover = require("./hover/index");  //鼠标悬停提示功能模块
const jump = require("./jump/index");  //跳转功能模块

const ayjson = require("./ayjson/index");  //json文件解析功能模块
const wv = require('./webview/index');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const cmd = require("./command/index");  //命令模块


/**
 * 插件被激活时触发，所有代码总入口。
 * 激活扩展时调用此方法，您的扩展将在命令第一次执行时被激活。
 * @依赖文件 const vscode = require('vscode');
 * @param {vscode.ExtensionContext} context 扩展内容
 */
function activate(context) {
	//omi生态更新、下载、项目创建(创建项目包含在线和离线两种方式)
	const ecoProvider = new eco.ecoProvider(context);
	context.subscriptions.push(vscode.window.registerTreeDataProvider('omi-view-ecosystem', ecoProvider));




	//鼠标悬停提示功能注册
	const provideHover = hover.provideHover;
	context.subscriptions.push(vscode.languages.registerHoverProvider(['json', 'javascript'], {provideHover}));

	//跳转功能注册
	const provideDefinition = jump.provideDefinition;
	context.subscriptions.push(vscode.languages.registerDefinitionProvider(['json', 'javascript'], {provideDefinition}));



	//json文件解析功能注册
	const jsonOutlineProvider = new ayjson.JsonOutlineProvider(context);
	context.subscriptions.push(vscode.window.registerTreeDataProvider('omi-view-json', jsonOutlineProvider));
	vscode.commands.registerCommand('extension.openJsonSelection', range => jsonOutlineProvider.select(range));
	//Webview功能注册(命令:"omi wv")(实验)
	context.subscriptions.push(vscode.commands.registerCommand('omi.webview', wv.showWebviewIndex));
	//其他命令，暂无特定功能
	context.subscriptions.push(vscode.commands.registerCommand('omi.help', cmd.commandOmiHelp));  //"omi"命令注册
	
    
    
	//context.subscriptions.push(vscode.languages.registerCompletionItemProvider(['json', 'javascript'], {provideCompletionItems, resolveCompletionItem}, '.'));  //代码提示功能注册(未出效果，待解决...)
	


}
exports.activate = activate;
exports.deactivate = deactivate;

/**
 * 插件被释放时触发。
 * 当您的扩展被停用时，将调用此方法。
 */
function deactivate() {
	console.log('Your extension "omi" has been released');
}








// /**
//  * (未出效果，待解决...)
//  * 自动提示实现，这里模拟一个很简单的操作
//  * 当输入 this.dependencies.xxx时自动把package.json中的依赖带出来
//  * 当然这个例子没啥实际意义，仅仅是为了演示如何实现功能
//  * @param {*} document 
//  * @param {*} position 
//  * @param {*} token 
//  * @param {*} context 
//  */
// function provideCompletionItems(document, position, token, context) {
//     const line        = document.lineAt(position);
//     const projectPath = __dirname;

//     // 只截取到光标位置为止，防止一些特殊情况
//     const lineText = line.text.substring(0, position.character);
//     // 简单匹配，只要当前光标前的字符串为`this.dependencies.`都自动带出所有的依赖
//     if(/(^|=| )\w+\.dependencies\.$/g.test(lineText)) {
//         const json = require(`${projectPath}/package.json`);
// 		const dependencies = Object.keys(json.dependencies || {}).concat(Object.keys(json.devDependencies || {}));
// 		//return new vscode.CompletionItem(dependencies[0], vscode.CompletionItemKind.Field);
//         return dependencies.map( (dep) => {
//             // vscode.CompletionItemKind 表示提示的类型
//             return new vscode.CompletionItem(dep, vscode.CompletionItemKind.Field);
//         })
//     }
// }

// /**
//  * 光标选中当前自动补全item时触发动作，一般情况下无需处理
//  * @param {*} item 
//  * @param {*} token 
//  */
// function resolveCompletionItem(item, token) {
//     return item;
// }