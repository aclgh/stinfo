// 引入 express 框架 -> 需 npm 安装
var express = require('express');

/**
 * 初始化框架,并将初始化后的函数给予 '当前页面'全局变量 app
 * 也就是说, app 是 express 
 */
var app = express();


/* 配置框架环境 S */


// 设置EJS作为模板引擎
app.set('view engine', 'ejs');

// 设置 public 为静态文件的存放文件夹
app.use('/public', express.static('public'));

/*steam api */
const fs = require('fs');
const SteamAPI = require('steamapi');
const steam = new SteamAPI('4279AE41A700074639985D10439C3C3F');


/*ejs*/
var id = "76561198163756141"
app.get('/', (req, res) => {
    steam.getUserSummary(id).then(summary => {
        console.log(summary);
        summary.lastLogOff = timeAgo(summary.lastLogOff);
        if (!(summary.gameExtraInfo === undefined)) {
            steam.getGameDetails(summary.gameID, false, "us").then(infor => {
                console.log(infor);
                const data = {
                    summary: summary // 添加summary属性到data对象中
                };
                res.render('index', data);
            }).catch(error => {
                console.error('Error fetching summary:', error);
                res.status(500).send('Internal Server Error');
            });
        }
        else {
            const data = {
                summary: summary // 添加summary属性到data对象中
            };
            res.render('index', data);
        }
    });
});
/*函数*/
function timeAgo(timestamp) {
    timestamp = timestamp * 1000
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - timestamp;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} 天前`;
    } else if (hours > 0) {
        return `${hours} 小时前`;
    } else if (minutes > 0) {
        return `${minutes} 分钟前`;
    } else {
        return `${seconds} 秒前`;
    }
}


/* 配置框架环境 E */


