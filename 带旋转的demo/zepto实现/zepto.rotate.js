;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD support
        define(['zepto'], factory);
    } else {
        //Browser global
        factory(Zepto);
    }
})(function($) {
    for (var d, f, l = document.getElementsByTagName("head")[0].style, h = ["transformProperty", "WebkitTransform",
                "OTransform", "msTransform", "MozTransform"], g = 0; g < h.length; g++) void 0 !== l[h[g]] && (d = h[g]);
    d && (f = d.replace(/[tT]ransform/, "TransformOrigin"), "T" == f[0] && (f[0] = "t"));
    eval('IE = "v"=="\v"');
    window.QKrotate = function(option){
        this.options = {
            src: "", //声音来源
            auto: true, //是否自动播放，默认是false
            loop: true, //是否循环播放，默认是false
            width:30,//播放图标大小
            height:30,//播放图标大小
            isRotate:true,//是否旋转
            speed:50,//旋转速度
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
    QKrotate.prototype = {
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
            var that = this;
            var audio = document.createElement("audio"), 
            source = document.createElement("source");
            audio.className = "audio-core";
            source.src = t.url;
            if(t.loop && (audio.loop = !0)){
                audio.appendChild(source);
                document.body.appendChild(audio);
                audio.play();
                that.rotate();
                document.addEventListener("WeixinJSBridgeReady", function() {
                    audio.play();
                    that.rotate();
                })
            }   
        },
        setEditorEvents:function(){
            var that = this;
            var audioCon = document.getElementById('audioContainer'),
                audioCore = document.querySelector(".audio-core"),
                playDom = audioCon.querySelector(".audio-play"),
                pasueDom = audioCon.querySelector(".audio-pause");
            if (audioCore.play || (audioCore.play = audioCore.pause = function() {}),audioCore.onplay = changeSty,audioCore.onended = audioCore.onpause = changeSty,changeSty(), !{}.inEditor) {
                var status;
                window.addEventListener("blur", function() {
                    status = audioCore.paused,
                    audioPause()
                },false);
                window.addEventListener("focus", function() {
                    !1 === status && audioPlay()
                },false);
                var events = "ontouchstart" in document ? "tap" : "click";
                audioCon.addEventListener(events, function() {
                    audioCore.paused ? audioPlay() : audioPause()
                },false)
            }
            function audioPlay() {
                audioCore.play();
                that.rotate();
            }
            function audioPause() {
                audioCore.pause();
                that.stopRotate();
            }
            function changeSty() {
                audioCore.paused ? (playDom.style.display = "block",pasueDom.style.display = "none") : (playDom.style.display = "none",pasueDom.style.display = "block")
            }
        },
        rotate:function(options){
            var that = this;
            that.timer = null;
            if(that.options.isRotate){
                var angle = 0;  
                if(that.timer){
                    clearTimeout(that.timer);
                    that.timer = null;
                }
                that.timer = setInterval(function() {  
                    angle += 10; 
                    that.startRotate($("#audioContainer"),angle);
                }, that.options.speed)  
            }
             
        },
        startRotate:function(el,a){
            //旋转
            if (0 !== el.length && "undefined" != typeof a) {
                "number" == typeof a && (a = {
                    angle: a
                });
                for (var b = [], c = 0, d = el.length; c < d; c++) {
                    var e = el.get(c);
                    if (e.ImageRotate && e.ImageRotate.PhotoEffect){
                        e.ImageRotate.PhotoEffect._handleRotation(a);
                    } else {
                        var f = $.extend(!0, {}, a),
                            e = (new ImageRotate.PhotoEffect(e, f))._rootObj; 
                        b.push($(e))
                    }
                }
                return b
            }
        },
        stopRotate:function(){
            var that = $("#audioContainer");
            if(this.timer){
                clearTimeout(this.timer);
                this.timer = null;
            }
            for (var a = 0, b = that.length; a < b; a++) {
                var c = that.get(a);
                c.ImageRotate && c.ImageRotate.PhotoEffect && clearTimeout(c.ImageRotate.PhotoEffect._timer)
            }
        }
    }
    ImageRotate = window.ImageRotate || {};
    ImageRotate.PhotoEffect = function () {
        return d ? function (a, b) {
            a.ImageRotate = {
                PhotoEffect: this
            };
            this._img = this._rootObj = this._eventObj = a;
            this._handleRotation(b)
        } : function (a, b) {
            this._img = a;
            this._onLoadDelegate = [b];
            this._rootObj = document.createElement("span");
            this._rootObj.style.display = "inline-block";
            this._rootObj.ImageRotate = {
                PhotoEffect: this
            };
            a.parentNode.insertBefore(this._rootObj, a);
            if (a.complete) this._Loader();
            else {
                var c = this;
                Zepto(this._img).bind("load", function () {
                    c._Loader()
                })
            }
        }
    }();
    ImageRotate.PhotoEffect.prototype = {
        _setupParameters: function (a) {
            this._parameters = this._parameters || {};
            "number" !==
                typeof this._angle && (this._angle = 0);
            "number" === typeof a.angle && (this._angle = a.angle);
            this._parameters.animateTo = "number" === typeof a.animateTo ? a.animateTo : this._angle;
            this._parameters.step = a.step || this._parameters.step || null;
            this._parameters.easing = a.easing || this._parameters.easing || this._defaultEasing;
            this._parameters.duration = a.duration || this._parameters.duration || 1E3;
            this._parameters.callback = a.callback || this._parameters.callback || this._emptyFunction;
            this._parameters.center = a.center || this._parameters.center || ["50%", "50%"];
            this._rotationCenterX = "string" == typeof this._parameters.center[0] ? parseInt(this._parameters.center[0],
                10) / 100 * this._imgWidth * this._aspectW : this._parameters.center[0];
            this._rotationCenterY = "string" == typeof this._parameters.center[1] ? parseInt(this._parameters.center[1],
                10) / 100 * this._imgHeight * this._aspectH : this._parameters.center[1];
            a.bind && a.bind != this._parameters.bind && this._BindEvents(a.bind)
        },
        _emptyFunction: function () {},
        _defaultEasing: function (a, b, c, d, e) {
            return -d * ((b = b / e - 1) * b * b * b -
                1) + c
        },
        _handleRotation: function (a, b) {
            d || this._img.complete || b ? (this._setupParameters(a), this._angle == this._parameters.animateTo ? this._rotate(
                this._angle) : this._animateStart()) : this._onLoadDelegate.push(a)
        },
        _BindEvents: function (a) {
            if (a && this._eventObj) {
                if (this._parameters.bind) {
                    var b = this._parameters.bind,
                        c;
                    for (c in b) b.hasOwnProperty(c) && Zepto(this._eventObj).unbind(c, b[c])
                }
                this._parameters.bind = a;
                for (c in a) a.hasOwnProperty(c) && Zepto(this._eventObj).bind(c, a[c])
            }
        },
        _Loader: function () {
            return IE ? function () {
                var a =
                    this._img.width,
                    b = this._img.height;
                this._imgWidth = a;
                this._imgHeight = b;
                this._img.parentNode.removeChild(this._img);
                this._vimage = this.createVMLNode("image");
                this._vimage.src = this._img.src;
                this._vimage.style.height = b + "px";
                this._vimage.style.width = a + "px";
                this._vimage.style.position = "absolute";
                this._vimage.style.top = "0px";
                this._vimage.style.left = "0px";
                this._aspectW = this._aspectH = 1;
                this._container = this.createVMLNode("group");
                this._container.style.width = a;
                this._container.style.height = b;
                this._container.style.position =
                    "absolute";
                this._container.style.top = "0px";
                this._container.style.left = "0px";
                this._container.setAttribute("coordsize", a - 1 + "," + (b - 1));
                this._container.appendChild(this._vimage);
                this._rootObj.appendChild(this._container);
                this._rootObj.style.position = "relative";
                this._rootObj.style.width = a + "px";
                this._rootObj.style.height = b + "px";
                this._rootObj.setAttribute("id", this._img.getAttribute("id"));
                this._rootObj.className = this._img.className;
                for (this._eventObj = this._rootObj; a = this._onLoadDelegate.shift();) this._handleRotation(a, !0)
            } : function () {
                this._rootObj.setAttribute("id", this._img.getAttribute("id"));
                this._rootObj.className = this._img.className;
                this._imgWidth = this._img.naturalWidth;
                this._imgHeight = this._img.naturalHeight;
                var a = Math.sqrt(this._imgHeight * this._imgHeight + this._imgWidth * this._imgWidth);
                this._width = 3 * a;
                this._height = 3 * a;
                this._aspectW = this._img.offsetWidth / this._img.naturalWidth;
                this._aspectH = this._img.offsetHeight / this._img.naturalHeight;
                this._img.parentNode.removeChild(this._img);
                this._canvas = document.createElement("canvas");
                this._canvas.setAttribute("width", this._width);
                this._canvas.style.position = "relative";
                this._canvas.style.left = -this._img.height * this._aspectW + "px";
                this._canvas.style.top = -this._img.width * this._aspectH + "px";
                this._canvas.ImageRotate = this._rootObj.ImageRotate;
                this._rootObj.appendChild(this._canvas);
                this._rootObj.style.width = this._img.width * this._aspectW + "px";
                this._rootObj.style.height = this._img.height * this._aspectH + "px";
                this._eventObj = this._canvas;
                for (this._cnv = this._canvas.getContext("2d"); a = this._onLoadDelegate.shift();) this._handleRotation(
                        a, !0)
            }
        }(),
        _animateStart: function () {
            this._timer && clearTimeout(this._timer);
            this._animateStartTime = +new Date;
            this._animateStartAngle = this._angle;
            this._animate()
        },
        _animate: function () {
            var a = +new Date,
                b = a - this._animateStartTime > this._parameters.duration;
            if (b && !this._parameters.animatedGif) clearTimeout(this._timer);
            else {
                if (this._canvas || this._vimage || this._img) a = this._parameters.easing(0, a - this._animateStartTime,
                        this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters
                        .duration),
                this._rotate(~~(10 * a) / 10);
                this._parameters.step && this._parameters.step(this._angle);
                var c = this;
                this._timer = setTimeout(function () {
                    c._animate.call(c)
                }, 10)
            }
            this._parameters.callback && b && (this._angle = this._parameters.animateTo, this._rotate(this._angle),
                this._parameters.callback.call(this._rootObj))
        },
        _rotate: function () {
            var a = Math.PI / 180;
            return IE ? function (a) {
                this._angle = a;
                this._container.style.rotation = a % 360 + "deg";
                this._vimage.style.top = -(this._rotationCenterY - this._imgHeight / 2) + "px";
                this._vimage.style.left = -(this._rotationCenterX - this._imgWidth / 2) + "px";
                this._container.style.top = this._rotationCenterY - this._imgHeight / 2 + "px";
                this._container.style.left = this._rotationCenterX - this._imgWidth / 2 + "px"
            } : d ? function (a) {
                this._angle = a;
                this._img.style[d] = "rotate(" + a % 360 + "deg)";
                this._img.style[f] = this._parameters.center.join(" ")
            } : function (b) {
                this._angle = b;
                b = b % 360 * a;
                this._canvas.width = this._width;
                this._canvas.height = this._height;
                this._cnv.translate(this._imgWidth * this._aspectW, this._imgHeight * this._aspectH);
                this._cnv.translate(this._rotationCenterX,
                    this._rotationCenterY);
                this._cnv.rotate(b);
                this._cnv.translate(-this._rotationCenterX, -this._rotationCenterY);
                this._cnv.scale(this._aspectW, this._aspectH);
                this._cnv.drawImage(this._img, 0, 0)
            }
        }()
    };
    IE && (ImageRotate.PhotoEffect.prototype.createVMLNode = function () {
        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            return !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
            function (a) {
                return document.createElement("<rvml:" + a + ' class="rvml">')
            }
        } catch (a) {
            return function (a) {
                return document.createElement("<" +
                    a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
        }
    }())
})