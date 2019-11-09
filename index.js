const { app, pool } =require('./connect')
const user = require('./router/user')
app.all('*', (req, res, next) => {
    //这里处理全局拦截，一定要写在最上面
    next()
})
//如果是请求根路径，让他跳转到首页
app.get('/', (req,res) => {  //首页路由
    res.sendFile(__dirname+'/'+'test.html')
})
//接受任意类型的的请求，
app.all('/', (req, res) => {
    pool.getConnection((err, conn) => {
        res.json({ type: 'test'})
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
app.use('/user', user)
app.listen(8888, () => {
    console.log('服务启动','localhost:8888')
})