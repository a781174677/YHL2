const fs = require('fs');
const path = require('path')
const util =require('util')


const readFile = util.promisify(fs.readFile);

const writeFile = util.promisify(fs.writeFile);

//获取json文件地址
const filepath = path.normalize(__dirname+'/../data/item.json');

// 异步处理获取json数据
async function get(){
	// 异步读取json文件数据
	const data =await readFile(filepath,{flag:'r',encoding:'utf-8'})
	//返回数据
	console.log(data)
	const arr = JSON.parse(data)
	return arr
}

//添加数据
async function add(task){
	console.log(task)
}
//删除数据






module.exports= {
	get,
	add,
}
