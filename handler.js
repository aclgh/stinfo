const express = require('express');
const app = express();

// Express应用程序的代码
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

const port = process.env.SCF_FUNCTIONNAME ? 9000 : 8081;

app.listen(port, function () {
    console.log("Node.JS 服务器已启动，访问地址： http://localhost:" + port);
});

module.exports = {
    handler: (event, context) => {
        // 具体的请求处理代码，例如路由等，可以在这里添加
        app(event, context);
    }
};
