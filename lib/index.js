//生成audio的默认id前缀
const idPrefix = 'gobal-audio'; 

//生成audio的默认id后缀自增数
let idSuffix = 0;

const defaultParams = () => ({
  autoplay: false,    //如果出现该属性，则音频在就绪后马上播放。
  controls: false,    //如果出现该属性，则向用户显示音频控件（比如播放/暂停按钮）。
  loop: false,    //如果出现该属性，则每当音频结束时重新开始播放。
  muted: false,    //如果出现该属性，则音频输出为静音.
  volume: 1   //音量黑夜为1，最大  0-1之间
  //playTime  播放时长
})

//事件流
const eventTypes = {
  onabort: null, 
  oncanplay: null, 
  onended: null, 
  onerror: null, 
  onloadstart: null, 
  onpause: null, 
  onplay: function() {
    if(this.playTime){
      setTimeout(() => {
        this.pause();
      }, this.playTime * 1000);
    }
  }, 
  onvolumechange: null
};



//初始化事件
const initEvent = (audio, params) => {
  for(let item in eventTypes){
    audio[item] = e => {
      (typeof eventTypes[item]).toLocaleLowerCase() == 'function' && eventTypes[item].call(audio);
      params[item] && (typeof params[item]).toLocaleLowerCase() == 'function' && params[item]();
    }
  }
  audio.getStatus = () => {
    if(audio.paused){
      return 'paused';
    }
    else if(audio.ended){
      return 'ended';
    }
    else{
      return 'playing';
    }
  }
  return audio;
}

//创建audio
const newAudio = ({params, src, id} = {}) => {
  if(id && document.querySelector('#' + id)){
    alert('id已存在！');
    return false;
  }
  params = Object.assign(defaultParams(), params||{});
  idSuffix++;
  params.id = idPrefix + idSuffix;
  let audio = document.createElement('audio');
  Object.keys(params).forEach(key => {
    if(!Object.keys(eventTypes).includes(key)){
      audio[key] = params[key];
    }
  });
  initEvent(audio, params);
  audio.style.display = "none";
  audio.setAttribute('src', src);
  document.body.appendChild(audio);
  return audio;
}

//单次播放音频
const playAudio = src => {
  let audio = newAudio({
    params:{
      onended: e => {
        audio.remove();
      }
    }, 
    src
  });
  audio.play();
}

export default {
  newAudio,
  playAudio
}