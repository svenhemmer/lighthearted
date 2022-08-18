(()=>{"use strict";var e,t={180:(e,t,o)=>{o.r(t),o.d(t,{initPlayer:()=>r,play:()=>s,setPlayerBuffer:()=>i,stop:()=>a});var n={context:null,mixerNode:null,module:null,buffer:null,mixingRate:44100,playing:!1,bufferFull:!1,ready:!0,loaded:!1,init:function(e,t){return this.audioWorkletSupport=e.audioWorkletSupport,this.channels=[!0,!0,!0,!0],this.context=t,this.initContext()},setBuffer:function(e){this.ready&&(this.ready=!1,this.loaded=!1,this.wasPlaying=this.playing,this.pause(),this.postMessage({message:"loadModule",buffer:e}),this.ready=!0)},initContext:function(){var e=this;return this.mixingRate=this.context.sampleRate,this.context.audioWorklet.addModule("/assets/mod-processor.js").then((function(){var t=e.audioWorkletSupport?4:2;e.filterNode=e.context.createBiquadFilter(),e.filterNode.frequency.value=22050,e.workletNode=new AudioWorkletNode(e.context,"mod-processor",{outputChannelCount:[1,1,1,1],numberOfInputs:0,numberOfOutputs:4}),e.audioWorkletSupport||(e.splitter=e.context.createChannelSplitter(t),e.filterNode.connect(e.splitter)),e.workletNode.port.onmessage=e.handleMessage.bind(e),e.postMessage({message:"init",mixingRate:e.mixingRate,audioWorkletSupport:e.audioWorkletSupport}),e.workletNode.port.start(),e.analysers=new Array;for(var o=0;o<t;++o){var n=e.context.createAnalyser();n.fftSize=256,n.minDecibels=-90,n.maxDecibels=-10,n.smoothingTimeConstant=.65,e.audioWorkletSupport?e.workletNode.connect(n,o,0):e.splitter.connect(n,o),e.analysers.push(n)}e.audioWorkletSupport?(e.merger=e.context.createChannelMerger(4),e.workletNode.connect(e.merger,0,0),e.workletNode.connect(e.merger,1,1),e.workletNode.connect(e.merger,2,1),e.workletNode.connect(e.merger,3,0),e.merger.connect(e.filterNode)):e.workletNode.connect(e.filterNode),e.filterNode.connect(e.context.destination)})).catch((function(e){return console.log(e)}))},setLowPass:function(e){this.filterNode.frequency.value=e?6e3:22050},setSpeed:function(e){this.postMessage({message:"speedUp",speedUp:e})},handleMessage:function(e){switch(e.data.message){case"moduleLoaded":this.loaded=!0;var t=new Event("moduleLoaded");t.data=e.data.data,t.data.wasPlaying=this.wasPlaying,document.dispatchEvent(t);break;case"toggleLowPass":this.setLowPass(e.data.data.activate)}},postMessage:function(e){this.workletNode&&this.workletNode.port.postMessage(e)},play:function(){this.loaded?("suspended"===this.context.state&&this.context.resume(),this.playing=!this.playing,this.playing||this.pause(),this.sendPlayingStatus()):console.log("No module loaded")},stop:function(){this.pause(),this.ready&&this.postMessage({message:"reset"}),this.setLowPass(!1)},pause:function(){this.playing=!1,this.sendPlayingStatus()},sendPlayingStatus:function(){this.postMessage({message:"setPlay",playing:this.playing})},setPlayingChannels:function(e){this.postMessage({message:"setPlayingChannels",channels:e}),this.channels=e}},r=function(e){var t=!!AudioWorkletNode.toString().match(/native code/);n.init({audioWorkletSupport:t},e).catch((function(e){console.log("Error loading module: ".concat(e))}))},i=function(e){n.ready&&e&&n.setBuffer(e)},s=function(){return n.play()},a=function(){return n.stop()}},320:function(e,t,o){var n,r=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)});Object.defineProperty(t,"__esModule",{value:!0});var i=o(640),s=o(970),a=o(177),l=o(180),u=function(e){function t(){return e.call(this,{key:"game",active:!1,visible:!1})||this}return r(t,e),t.prototype.create=function(){(0,l.setPlayerBuffer)(this.cache.binary.get("audio-mod"));var e=this.make.tilemap({key:"tilemap"}),t=e.addTilesetImage("tiles");e.createLayer(0,t,0,0),e.createLayer(1,t,0,0);var o=e.getObjectLayer("Kollision").objects.filter((function(e){return!!e.properties})).map((function(e){return(0,a.tiledObject2Block)(e,e.properties[0].value)})),n=this.physics.add.staticGroup();o.forEach((function(e){var t=e.x,o=e.y,r=e.width,i=e.height,s=n.create(t+16,o+16,null,null,!1);s.body.width=r,s.body.height=i})),this.input.keyboard.on("keydown-M",l.play),this.input.keyboard.on("keydown-N",l.stop),this._inputs=new i.default(this);var r=new s.default(this,100,40),u=e.widthInPixels,c=e.heightInPixels;this.physics.world.setBounds(0,-64,u,c+64),this.physics.world.TILE_BIAS=8,this.physics.add.collider(r,n),this.cameras.main.setBounds(0,0,u,c),this.cameras.main.startFollow(r),setTimeout((function(){return(0,l.play)()}),5e3)},Object.defineProperty(t.prototype,"inputs",{get:function(){return this._inputs},enumerable:!1,configurable:!0}),t}(Phaser.Scene);t.default=u},640:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e){this._scene=e,this._keys=this._scene.input.keyboard.addKeys("W,A,S,D,Z,X,C,up,left,down,right,space,enter,comma,period")}return Object.defineProperty(e.prototype,"keys",{get:function(){return this._keys},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"left",{get:function(){return this.keys.left.isDown||this.keys.A.isDown},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"right",{get:function(){return this.keys.right.isDown||this.keys.D.isDown},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"up",{get:function(){return this.keys.up.isDown||this.keys.W.isDown},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"down",{get:function(){return this.keys.down.isDown||this.keys.S.isDown},enumerable:!1,configurable:!0}),e}();t.default=o},966:function(e,t,o){var n,r=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)});Object.defineProperty(t,"__esModule",{value:!0});var i=o(180),s=o(349),a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.preload=function(){var e=new Phaser.Sound.WebAudioSoundManager(this.game),t=(0,s.getAudioContext)();this.game.sound=e,e.setAudioContext(t),(0,i.initPlayer)(t),this.load.tilemapTiledJSON("tilemap","./assets/tilemaps/tilemap.json"),this.load.image("tiles","./assets/images/tiles.png"),this.load.spritesheet("wizard","./assets/images/wizard.png",{frameWidth:16,frameHeight:32}),this.load.binary("audio-mod","./assets/audio/Opal - !Love&devotion!.mod")},t.prototype.create=function(){this.scene.start("game")},t}(Phaser.Scene);t.default=a},970:function(e,t){var o,n,r=this&&this.__extends||(o=function(e,t){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])},o(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.STANDING=0]="STANDING",e[e.WALKING=1]="WALKING"}(n||(n={}));var i=function(e){function t(t,o,r){var i=this,s="wizard";return i=e.call(this,t,o,r,s)||this,Object.entries({stand:{frames:[0]},walk:{frameRate:12,frames:[1,2,3,0],repeat:-1}}).forEach((function(e){var t=e[0],o=e[1],n=o.frameRate,r=o.frames,a=o.repeat;i.scene.anims.create({key:t,frameRate:n,repeat:a,frames:i.scene.anims.generateFrameNumbers(s,{frames:r})})})),i.scene.add.existing(i),i.scene.physics.world.enable(i),i.body.setSize(8,8).setOffset(4,20),i.body.setAllowDrag(!0).setMaxVelocityX(160).setMaxVelocityY(160),i.setCollideWorldBounds(!0).setDragX(Math.pow(16,2)).setDragY(Math.pow(16,2)).setState(n.STANDING),i}return r(t,e),t.prototype.setState=function(t){switch(t){case n.STANDING:this.setVelocityX(.5*this.body.velocity.x).setVelocityY(.5*this.body.velocity.y).play("stand");break;case n.WALKING:this.play("walk")}return e.prototype.setState.call(this,t)},t.prototype.preUpdate=function(t,o){var r=this.scene.inputs,i=r.left,s=r.right,a=r.down,l=r.up,u=!(!i||s)||!s&&this.flipX,c=-Number(i)+Number(s),d=-Number(l)+Number(a),p=c*Math.pow(16,2),h=d*Math.pow(16,2);switch(this.state){case n.STANDING:(i||s||l||a)&&this.setState(n.WALKING);break;case n.WALKING:this.setFlipX(u).setAccelerationX(p).setAccelerationY(h),i||s||l||a||this.setState(n.STANDING)}e.prototype.preUpdate.call(this,t,o)},t}(Phaser.Physics.Arcade.Sprite);t.default=i},294:(e,t,o)=>{o(260);var n=o(966),r=o(320),i={type:Phaser.AUTO,width:256,height:224,zoom:2,input:{keyboard:!0,gamepad:!0},render:{pixelArt:!0,antialias:!1,antialiasGL:!1},physics:{default:"arcade",arcade:{debug:!1}},scene:[n.default,r.default]};window.addEventListener("load",(function(){new Phaser.Game(i)}))},349:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getAudioContext=void 0,t.getAudioContext=function(){return window.hasOwnProperty("AudioContext")?new AudioContext:window.hasOwnProperty("webkitAudioContext")?new window.webkitAudioContext:void 0}},177:function(e,t){var o=this&&this.__assign||function(){return o=Object.assign||function(e){for(var t,o=1,n=arguments.length;o<n;o++)for(var r in t=arguments[o])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},o.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.tiledObject2Block=void 0,t.tiledObject2Block=function(e,t){var n=e.x,r=e.y,i=e.width,s=e.height,a=e.id,l=t?t.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g,'"$2": '):"";return{id:a,x:n||0,y:r||0,width:i||0,height:s||0,blockingBorders:o({left:!0,right:!0,top:!0,bottom:!0},JSON.parse(l))}}}},o={};function n(e){var r=o[e];if(void 0!==r)return r.exports;var i=o[e]={exports:{}};return t[e].call(i.exports,i,i.exports,n),i.exports}n.m=t,e=[],n.O=(t,o,r,i)=>{if(!o){var s=1/0;for(c=0;c<e.length;c++){for(var[o,r,i]=e[c],a=!0,l=0;l<o.length;l++)(!1&i||s>=i)&&Object.keys(n.O).every((e=>n.O[e](o[l])))?o.splice(l--,1):(a=!1,i<s&&(s=i));if(a){e.splice(c--,1);var u=r();void 0!==u&&(t=u)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[o,r,i]},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={179:0};n.O.j=t=>0===e[t];var t=(t,o)=>{var r,i,[s,a,l]=o,u=0;if(s.some((t=>0!==e[t]))){for(r in a)n.o(a,r)&&(n.m[r]=a[r]);if(l)var c=l(n)}for(t&&t(o);u<s.length;u++)i=s[u],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(c)},o=self.webpackChunkLighthearted=self.webpackChunkLighthearted||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var r=n.O(void 0,[426],(()=>n(294)));r=n.O(r)})();