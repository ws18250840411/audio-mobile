
### 开发说明： 

    ##例子用法（原生版本）：
    # 1.在html结构里面加入：
    ```
    <div class="audios"></div>//这个元素主要用来存放audio的播放按钮样式以及位置
    ```    

    使用方式一：
    然后直接下载audio_rotate.js，在项目里引入<script src="./audio_rotate.js"></script>，然后实例化即可：
    ```
    var options = {
        "url": "./bgm.mp3",//音频地址
        "playicon": "https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/doc/pic/item/9213b07eca806538df3601ba92dda144ac3482bf.jpg",//播放图标
        "pauseicon": "https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/doc/pic/item/8ad4b31c8701a18bf9c3b6e69b2f07082838fe6b.jpg",//暂停播放图标
        "width":30,//播放按钮width
        "height":30,//播放按钮height
        "isRotate": true, //是否旋转
        "speed":50 //旋转速度
    }
    var audios = new QKrotate(options);//实例化
    ```
    使用方式二：
    通过require('audio-rotate')或者import QKrotate from 'audio-rotate';然后实例化即可：
    ```
    var audios = new QKrotate(options);//实例化
    ```
## 联系方式
- `Email`：wangwenshan@qiku.com
- QQ : 1077703392
