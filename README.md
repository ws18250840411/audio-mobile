
## 开发说明：
### 
	#1.在html结构里面加入：
	#<div id="audioContainer"></div>//这个元素主要用来存放audio的播放按钮样式以及位置
   	#2.本插件是由原生js写的，所以不需要引入其他依赖库，只需要引入require('audio-mobile'),然后传入配置的参数即可。示例：
 	var QkAudio = require('audio-mobile');
 	var options = {
        "url": "./bgm.mp3",//音频地址
        "playicon": "https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/doc/pic/item/9213b07eca806538df3601ba92dda144ac3482bf.jpg",//播放图标
        "pauseicon": "https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/doc/pic/item/8ad4b31c8701a18bf9c3b6e69b2f07082838fe6b.jpg",//暂停播放图标
        "width":30,//播放按钮width
        "height":30//播放按钮height
    }
    var audios = new QkAudio(options);`

## 联系方式
- `Email`：wangwenshan@qiku.com
- QQ : 1077703392
