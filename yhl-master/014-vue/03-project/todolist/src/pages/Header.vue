<template>
    <div id="Header">
        <h1> TodoList </h1>
        <input
        v-model="task" 
        type="text"
        @keyup.enter="handleAdd()"
        >
    </div>
</template>
<script>
export default {
    name:'Header',
    data(){
        return{
            task:''

        }
    },
    methods:{
        handleAdd:function(){
            // 1.验证数据
			var task = this.task.trim()//自动过滤用户输入的首尾空白字符
            if(!task){
                return
            }
            // 2.生成任务和状态
            var todo = {
                task,
                tag:false
            }
            // 3.将任务对象添加到目标数组
            this.addTodo(todo)
            // 4.清空输入框值
            this.task = ''
        }
    },
    props:{
        addTodo:Function
    }
}
</script>
<style scoped>
    #Header{
        text-align: center;
        margin-top: 100px;
    }
    #Header input{
        width: 100%;
        height: 35px;
        box-sizing: border-box;
    }
</style>