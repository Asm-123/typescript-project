class Videoplayer{
  video :HTMLVideoElement  
  src:string 
  isntance:Element
  controls:HTMLElement
  listLeft:Element
  listright:Element
  progressAreaTime:Element
  progressBar:HTMLElement
  progressArea:HTMLElement
  
constructor( createVideo:string, src:string ,colorbar?:string,colorarea?:string ,colorprogress?:string){

this.isntance =document.querySelector(createVideo)as HTMLElement

const section = document.createElement("section") as HTMLElement;
const container = document.createElement("div");
container.classList.add("container");
const videoplayerDiv = document.createElement("div");
videoplayerDiv.classList.add("videoplayer");
container.appendChild(videoplayerDiv);
section.appendChild(container);
this.isntance.append(section)
this.src=src
this.progressAreaTime=document.createElement("div")
this.progressAreaTime.classList.add("progressAreaTime")
//create video
this.video=document.createElement("video")
this.video.classList.add("mainVideo")
this.video.src=this.src;
this.video.controls=false;
this.controls=document.createElement("div")
/////////////////////////////////////////////////
this.controls=document.createElement("div")
this.controls.classList.add("controls")
this.controls.style.backgroundColor = `${colorbar}`;
const controlslist=document.createElement("div")
 controlslist.classList.add("controlslist")
this.listLeft=document.createElement("div")
this.listLeft.classList.add("listLeft")
this.listright=document.createElement("div")
this.listright.classList.add("listright")
controlslist.append( this.listLeft,this.listright)
/////////////////////////////////////////////////////////////////////////////
this.progressArea=document.createElement("div")
this.progressArea.classList.add("progressArea")
this.progressArea.style.backgroundColor=`${colorarea}`

this.progressBar=document.createElement("div")
this.progressBar.classList.add("progressBar")
this.progressBar.style.backgroundColor=`${colorprogress}`
this.progressArea.append(this.progressBar)
this.controls.append(this.progressArea,controlslist)

////////////////////////////////////////////////////////////////////
this.controls.classList.add("controls")
this.controlsAdd()
this.addeventlitener()
videoplayerDiv.append( this.video,this.progressAreaTime,this.controls)
}
controlsAdd(){
  this.listLeft.innerHTML+=`<i class="fa-solid fa-backward-step backward"></i>
<div class="playPause">
  <a href="#" class="play"><i class="fa-solid fa-play" ></i></a>
  <a href="#"class="pause hidden"><i class="fa-solid fa-pause"></i></a>
</div>


  <a href="#"class="forward" ><i class="fa-solid fa-forward-step forward"></i> </a>

   <a href="#"class="sound"><i class="fa-solid fa-volume-high notmute"></i>
   <i class="fa-solid fa-volume-xmark mute hidden"></i></a>
   <input type="range" min="0"max="1"step="0.1"value="1" class="soundRange "/>


   <div class="timer"><span class="current">0:00  / </span> <span class="duration"> / </span> </div>`
   this.listright.innerHTML+=`<i class="fa-solid fa-gear"></i>
   
   <i class="fa-solid fa-expand fullScreen"></i>`
}

addeventlitener(){
  const playVideo =this.controls.querySelector(".play")as HTMLAnchorElement
  const pause=this.controls.querySelector(".pause")as HTMLAnchorElement
  const sound=this.controls.querySelector(".sound")as HTMLAnchorElement
  const notmute=this.controls.querySelector(".notmute")as Element
  const mute=this.controls.querySelector(".mute")as Element
  const soundRange=this.controls.querySelector(".soundRange")as HTMLInputElement //input
  const fullScreen=this.controls.querySelector(".fullScreen")as HTMLInputElement
  const videoPlayer=this.controls.querySelector(".mainVideo")
  const duration= this.controls.querySelector(".duration") as Element
  const current= this.controls.querySelector(".current") as Element
  const progressBar=this.controls.querySelector(".progressBar") as HTMLElement //HTML element if i want to style
  const progressArea=this.controls.querySelector(".progressArea") as HTMLElement
  const backward=this.controls.querySelector(".backward") as HTMLElement
  const forward=this.controls.querySelector(".forward") as HTMLElement
  const playPause=this.controls.querySelector(".playPause")as HTMLAnchorElement

// playVideo.addEventListener("click",()=>{

//      this.video.play()
//       playVideo.classList.add("hidden")
//       pause.classList.remove("hidden")
      
// })
// pause.addEventListener("click",()=>{
//     this.video.pause()
//   playVideo.classList.remove("hidden")
//   pause.classList.add("hidden")
// })
////////////////////////////////////////////////
playPause.addEventListener("click",()=>{
if(this.video.paused){
  this.video.play()
  playVideo.classList.add("hidden")
    pause.classList.remove("hidden")
}else{
  this.video.pause()
  playVideo.classList.remove("hidden")
  pause.classList.add("hidden")
}

})




//////////////////////////////////////////////////

//sound
sound.addEventListener("click",()=>{
  this.video.muted=!this.video.muted
  if(this.video.muted===true){
    soundRange.value="0"
  notmute.classList.add("hidden")
  mute.classList.remove("hidden")
}
  else{
  soundRange.value=String(this.video.volume)
  notmute.classList.remove("hidden")
  mute.classList.add("hidden")
}
})

soundRange.addEventListener("input",(event)=>{
const realRange= Number((event.target as HTMLInputElement).value)
  this.video.volume= realRange
  console.log( this.video.volume,realRange)

  if( realRange===0){
  notmute.classList.add("hidden")
  mute.classList.remove("hidden")
   }
   else{         
  notmute.classList.remove("hidden")
  mute.classList.add("hidden")
   }
})
///////////////////////////////////////////////////////////////////
//fullscreen
fullScreen.addEventListener("click", () => {
  this.video.requestFullscreen(); // Trigger fullscreen mode
});



//////////////////////////////////////////////////////////////////////////////
this.video.addEventListener("loadeddata",(event)=>{
  let totalDuration=(event.target as HTMLVideoElement).duration //defult value
  
  let timeMinutes= Math.floor(totalDuration/60)
  let timeSeconds= Math.floor(totalDuration%60)
  console.log(totalDuration,timeMinutes,timeSeconds)
   const secs=timeSeconds<10?"0" + timeSeconds:timeSeconds 
   duration.innerHTML=`${timeMinutes}:${secs}`
})
this.video.addEventListener("timeupdate",(event)=>{
  let currentTime=(event.target as HTMLVideoElement).currentTime//defult value
  let totalDuration=(event.target as HTMLVideoElement).duration //defult value
  let Minutes= Math.floor(currentTime/60)
  let Seconds= Math.floor(currentTime%60)
  console.log(currentTime,Minutes,Seconds)
   const secss=Seconds<10?"0" + Seconds:Seconds 
  
  current.innerHTML=`${Minutes}:${secss}`
  //progress-bar
  
  let progressWidth=(currentTime /totalDuration)*100
  progressBar.style.width=`${progressWidth}%`
   
})
// when i click on progress bar time changes depending on where i have clicked
progressArea.addEventListener("click",(event)=>{
  let totalDuration=(this.video as HTMLVideoElement).duration //event.target=> progressArea/ this=>video because of arrow fn refers to the parent not the actual element
  let x = event.offsetX; // Use event.offsetX directly  it's like target dont need to type target and it's also ="current width"
let totalWidth= progressArea.clientWidth //total width
let newTime=(x/totalWidth)*totalDuration
this.video.currentTime=newTime
  console.log(x);
})
////////////////////////////////////////////////////
backward.addEventListener("click",()=>{
  this.video.currentTime -=0.7
})
forward.addEventListener("click",()=>{
  this.video.currentTime +=0.7
})


////////////////////////////////////////////////////////////

// دالة لإظهار شريط الصوت
const showSoundRange = () => {
  soundRange.style.opacity = "1";
  soundRange.style.visibility = "visible";
  soundRange.style.width = "60px";
};

// دالة لإخفاء شريط الصوت بعد التأكد أن الماوس مش عليه
const hideSoundRange = () => {
  setTimeout(() => {
    //!matches(":hover") معناها "هل الماوس مش عليه؟"      
    if (!sound.matches(":hover") && !soundRange.matches(":hover")) {
      soundRange.style.opacity = "0";
      soundRange.style.visibility = "hidden";
      soundRange.style.width = "0px";
    }
  }, 300);
};

// لما الماوس يمر على زر الصوت أو شريط الصوت
sound.addEventListener("mouseenter", showSoundRange);
soundRange.addEventListener("mouseenter", showSoundRange);

// لما الماوس يخرج من زر الصوت أو شريط الصوت
sound.addEventListener("mouseleave", hideSoundRange);
soundRange.addEventListener("mouseleave", hideSoundRange);
////////////////////////////////////////

// دالة لإخفاء شريط الصوت بعد التأكد أن الماوس مش عليه
const hideControls = () => {
  setTimeout(() => {
    //!matches(":hover") معناها "هل الماوس مش عليه؟"      
    if (!this.video.matches(":hover") && !this.controls.matches(":hover")) {
      
      this.controls.style.visibility = "hidden";
     
    }
  }, 300);
};

const showControls = () => {
 
  this.controls.style.visibility = "visible";
 
};

// لما الماوس يمر على زر الصوت أو شريط الصوت
this.video.addEventListener("mouseenter", showControls);
this.controls.addEventListener("mouseenter", showControls);

// لما الماوس يخرج من زر الصوت أو شريط الصوت
this.video.addEventListener("mouseleave", hideControls);
this.controls.addEventListener("mouseleave", hideControls);

}}
/////////////////////////////////////////////////
new Videoplayer(".createNewInstance","animation.mp4","black","gray","purple")
//  new Videoplayer(".createNew","WhatsApp Video 2025-01-30 at 10.53.50 PM.mp4")
