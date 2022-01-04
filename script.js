console.log("Welcome to Spotify");

//initialise the variables
let songindex=1;
let audioElement=new Audio('./Songs/Song 1.mp3');
let masterplay=document.getElementById("masterplay")
let myProgressBar= document.getElementById("myProgressBar")
let songItems=Array.from(document.getElementsByClassName("songItem"))
let mastersongname=document.getElementById("mastersongname")


let songs=[
    {songName:"Waqt Ki Baatein", filepath:"./Songs/Song 1.mp3", coverPath:"./Covers/cover1.jpg"},
    {songName:"Raanjha", filepath:"./Songs/Song 2.mp3", coverPath:"./Covers/cover2.jpg"},
    {songName:"Humdard", filepath:"./Songs/Song 3.mp3", coverPath:"./Covers/cover3.jpg"},
    {songName:"Chandigarh Mein", filepath:"./Songs/Song 4.mp3", coverPath:"./Covers/cover4.jpg"},
    {songName:"Chaka Chak", filepath:"./Songs/Song 5.mp3", coverPath:"./Covers/cover5.jpg"},
    {songName:"Tum Hi Aana", filepath:"./Songs/Song 6.mp3", coverPath:"./Covers/cover6.jpg"}
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName

})


masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle')
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle')
        masterplay.classList.add('fa-play-circle');
    }
})

audioElement.addEventListener('timeupdate',()=>{
    //update seek bar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("songlistplay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName("songlistplay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();

         
        songindex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.src=`./Songs/Song ${songindex}.mp3`;
        mastersongname.innerText=songs[songindex-1].songName
        audioElement.currentTime=0;
        audioElement.play();

        masterplay.classList.remove('fa-play-circle')
        masterplay.classList.add('fa-pause-circle');
    })
}) 

document.getElementById("next").addEventListener('click',()=>{
    if(songindex>=6){
        songindex=1;
    }
    else{
        songindex+=1;
    }
    audioElement.src=`./Songs/Song ${songindex}.mp3`;
    mastersongname.innerText=songs[songindex-1].songName
    audioElement.currentTime=0;
    audioElement.play();

    masterplay.classList.remove('fa-play-circle')
    masterplay.classList.add('fa-pause-circle');
})

document.getElementById("previous").addEventListener('click',()=>{
    if(songindex<= 1){
        songindex=1
    }
    else{
        songindex-=1
    }
    audioElement.src=`./Songs/Song ${songindex}.mp3`;
    mastersongname.innerText=songs[songindex-1].songName
    audioElement.currentTime=0;
    audioElement.play();

    masterplay.classList.remove('fa-play-circle')
    masterplay.classList.add('fa-pause-circle');
})