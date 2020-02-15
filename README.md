#文档说明

##引用说明
import Audio from '@kali/audio';


##方法说明

###newAudio 
新建音频，返回一个<aduio>对象

###playAudio
单次播放某音频

##参数说明

{
  autoplay: false,    //如果出现该属性，则音频在就绪后马上播放。
  controls: false,    //如果出现该属性，则向用户显示音频控件（比如播放/暂停按钮）。
  loop: false,    //如果出现该属性，则每当音频结束时重新开始播放。
  muted: false,    //如果出现该属性，则音频输出为静音.
  volume: 1   //音量黑夜为1，最大  0-1之间
  //playTime  播放时长
}

##例子

import Audio from '@kali/audio';

Audio.newAudio({
	src: '/static/media/notice.wav', 
	params:{
	  loop: true
	}
});

Audio.playAudio('/static/media/notice.wav');