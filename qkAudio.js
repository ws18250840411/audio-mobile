/**
 * Created by wangwenshan on 2018/8/24.
 */
var QkAudio = function (option) {
	this.options = {
        src: "", //声音来源
        auto: true, //是否自动播放，默认是false
        loop: true, //是否循环播放，默认是false
        width:30,//播放图标大小
        height:30,//播放图标大小
        playicon: "https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/doc/pic/item/9213b07eca806538df3601ba92dda144ac3482bf.jpg",
        pauseicon: "https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/doc/pic/item/8ad4b31c8701a18bf9c3b6e69b2f07082838fe6b.jpg",
    };
    option = option || {};
    for (key in option) {
        if (option.hasOwnProperty(key)) {
            this.options[key] = option[key];
        }
    }
    this._init();
}
QkAudio.prototype = {
    constructor: QkAudio,
    /**
     * 初始化入口函数
     * @private
     */
    _init: function () {
    	var options = this.options;
    	this.createElement(options);
    	this.createAudioElement(options);
    	this.setEditorEvents();
    },
    /**
     * 生成radio容器节点
     * @private
     */
    createElement: function(options){
    	var parentNodes = document.createElement('div');//父节点
    	parentNodes.className = "audio-body";
    	parentNodes.style.cssText = "position: relative;width: "+ options.width +"px; height:" + options.height +"px;";
    	var playNodes = document.createElement('div');//播放元素
    	playNodes.className = "audio-play";
    	playNodes.style.cssText = "width: 100%;height: 100%;position: absolute; top: 0;left: 0;bottom: 0; right: 0;text-align: center;background-position: center;background-repeat: no-repeat;background-size: contain;background-image: url("+ options.pauseicon +")";
    	var pauseNodes = document.createElement('div');//暂停元素
		pauseNodes.className = "audio-pause";
		pauseNodes.style.cssText = "width: 100%;height: 100%;position: absolute; top: 0;left: 0;bottom: 0; right: 0;text-align: center;background-position: center;background-repeat: no-repeat;background-size: contain;background-image: url("+ options.playicon +")";
		parentNodes.appendChild(playNodes);
		parentNodes.appendChild(pauseNodes);
		document.getElementById('audioContainer').appendChild(parentNodes); 	
    },
    /**
     * 生成radio节点
     * @private
     */
    createAudioElement: function(t){
    	var audio = document.createElement("audio"), 
        source = document.createElement("source");
        audio.className = "audio-core";
        source.src = t.url;
        if(t.loop && (audio.loop = !0)){
        	audio.appendChild(source);
            document.body.appendChild(audio);
            audio.play();
            document.addEventListener("WeixinJSBridgeReady", function() {
                audio.play();
            })
        }   
    },
    setEditorEvents:function(){
    	var audioCon = document.getElementById('audioContainer'),
            audioCore = document.querySelector(".audio-core"),
            playDom = audioCon.querySelector(".audio-play"),
            pasueDom = audioCon.querySelector(".audio-pause");
        if (audioCore.play || (audioCore.play = audioCore.pause = function() {}),audioCore.onplay = changeSty,audioCore.onended = audioCore.onpause = changeSty,changeSty(), !{}.inEditor) {
            var status;
            window.addEventListener("blur", function() {
                status = audioCore.paused,
                audioPause()
            });
            window.addEventListener("focus", function() {
                !1 === status && audioPlay()
            });
            var events = "ontouchstart" in document ? "tap" : "click";
            audioCon.addEventListener(events, function() {
                audioCore.paused ? audioPlay() : audioPause()
            })
        }
        function audioPlay() {
            audioCore.play()
        }
        function audioPause() {
            audioCore.pause()
        }
        function changeSty() {
            audioCore.paused ? (playDom.style.display = "block",pasueDom.style.display = "none") : (playDom.style.display = "none",pasueDom.style.display = "block")
        }
    },
    once:function(type, callback) {  
	    var handle = function() {  
	        callback()  
	        this.removeEventListener(type, handle)
	    }  
	    this.addEventListener(type, handle)  
	}
}
module.exports = QkAudio;
