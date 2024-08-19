document.body.onload = main;
async function songsgetter(folder) {
    let info = await fetch(`/Playlists/${folder}/`)
    let text = await info.text()
    let div = document.createElement("div")
    div.innerHTML = text
    let songsname = []
    let songs = []
    let song = div.getElementsByTagName("a")
    for (i of song) {
        if (i.href.endsWith(".mp3")) {
            songs.push(i.href)
            songsname.push(i.text.replace(".mp3", ""))
        }
    }
    if (document.querySelector(".songs").childNodes.length == 1) {
        for (j of songsname) {
            let b = document.createElement("li")
            b.className = "songlist"
            b.style.listStyleType = "decimal"
            b.textContent += j
            let spn = document.createElement("span")
            spn.innerHTML = "<button class='playbutton playsong'> <svg width='60' height='60' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M15 12.3301L9 16.6603L9 8L15 12.3301Z' fill='currentColor' /></svg></button>";
            b.append(spn);


            document.querySelector(".songs").append(b)
        }
    }
    else {
        document.querySelector(".songs").innerHTML = ""
        for (j of songsname) {
            let b = document.createElement("li")
            b.className = "songlist"
            b.style.listStyleType = "decimal"
            b.textContent += j
            let spn = document.createElement("span")
            spn.innerHTML = "<button class='playbutton playsong'> <svg width='60' height='60' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M15 12.3301L9 16.6603L9 8L15 12.3301Z' fill='currentColor' /></svg></button>";
            b.append(spn);


            document.querySelector(".songs").append(b)
        }
    }


    return songs

}
let songs
let folder;
let currentstatus = false
let currentindex = null
let currentsong = null
async function main() {
   
   
   document.getElementById("volumeslider").addEventListener("change",(e)=>{
    currentsong.volume=(e.target.value)/100
    
   })
    
    
    document.querySelectorAll(".card").forEach(e => {
        e.addEventListener("click", async () => {
            // let prog=document.querySelector(".progressbar")
            // prog.style.background=`url(${e.childNodes[1].src})  no-repeat center `
            // prog.style.backgroundSize="cover"

            
            
            if(window.innerWidth < 800){
                let f = e.childNodes[3].childNodes[1].textContent
            folder = decodeURIComponent(f)
            songs = await songsgetter(folder)
            songsplayer()
            let leftdiv = document.querySelector(".left")
            let rightdiv = document.querySelector(".right")
            leftdiv.style.transition="all 1s"
            leftdiv.style.display = "block"
            leftdiv.style.width = "93vw"
            document.getElementById("cross").style.display = "block"
            }
            else{

                let f = e.childNodes[3].childNodes[1].textContent
                folder = decodeURIComponent(f)
                songs = await songsgetter(folder)
                songsplayer()
            }
            
        })
    })

    document.getElementById("play-pause").addEventListener("click", () => {

        if (currentstatus == false) {
            currentsong.play()
            currentstatus = true
            iconchecker()

        }
        else {
            currentsong.pause()
            currentstatus = false
            iconchecker()
        }
    })
    document.getElementById("next").addEventListener("click", () => {
        if (currentindex == songs.length - 1) {
            currentsong.pause()
            currentsong.currentTime = 0
            currentsong.play()
            iconchecker()
            document.querySelector(".songname").textContent = document.querySelectorAll(".songlist")[currentindex].textContent
            timeupdater()
        }
        else {

            currentsong.pause()
            currentstatus = true
            currentindex += 1
            currentsong = new Audio(songs[currentindex])
            currentsong.play()
            iconchecker()
            document.querySelector(".songname").textContent = document.querySelectorAll(".songlist")[currentindex].textContent
            timeupdater()
        }
    })
    document.getElementById("previous").addEventListener("click", () => {
        if (currentindex == 0) {
            currentstatus = true
            currentsong.pause()
            currentsong.currentTime = 0
            currentsong.play()
            iconchecker()
            document.querySelector(".songname").textContent = document.querySelectorAll(".songlist")[currentindex].textContent
            timeupdater()
        }
        else {
            currentstatus = true
            currentsong.pause()
            currentindex -= 1
            currentsong = new Audio(songs[currentindex])
            currentsong.play()
            iconchecker()
            document.querySelector(".songname").textContent = document.querySelectorAll(".songlist")[currentindex].textContent
            timeupdater()
        }
    })
    
    hamburger()

}


async function songsplayer() {

    document.querySelectorAll(".songlist").forEach((element, index) => {
        element.addEventListener("click", ()=> {
            document.querySelector(".progressbar").style.animation="gradientMove 5s linear infinite"
            if (currentsong == null) {
                currentsong = new Audio(songs[index])
                currentsong.play()
                currentstatus = true
                currentindex = index
                currentvolume=currentsong.volume
                let songname = document.querySelector(".songname")
                songname.textContent = element.textContent
                iconchecker()
                timeupdater()
                console.log(currentvolume);
                
                
            }

            else {
                currentstatus = false
                currentsong.pause()
                currentsong = new Audio(songs[index])
                currentsong.play()
                currentstatus = true
                currentvolume=currentsong.volume
                currentindex = index
                let songname = document.querySelector(".songname")
                songname.textContent = element.textContent
                iconchecker()
                timeupdater()
            }
        })
    });





}
async function hamburger() {
    let ham = document.getElementById("hamburger")
    ham.addEventListener("click", () => {
        let leftdiv = document.querySelector(".left")
        let rightdiv = document.querySelector(".right")
        leftdiv.style.display = "block"
        leftdiv.style.width = "93vw"
        document.getElementById("cross").style.display = "block"


    })
    let cross = document.getElementById("cross")
    cross.addEventListener("click", () => {
        let leftdiv = document.querySelector(".left")
        leftdiv.style.display = "none"
    })
    async function prog() {
        let button = document.querySelector(".songlist")
        button.addEventListener("click", () => {
            document.querySelector(".progressbar").style.display = "flex"
        })
    }
}

async function iconchecker() {
    if (currentstatus == false) {
        let btn = document.querySelector("#play-pause ")
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">' +
            '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />' +
            '<path d="M15.4531 12.3948C15.3016 13.0215 14.5857 13.4644 13.1539 14.3502C11.7697 15.2064 11.0777 15.6346 10.5199 15.4625C10.2893 15.3913 10.0793 15.2562 9.90982 15.07C9.5 14.6198 9.5 13.7465 9.5 12C9.5 10.2535 9.5 9.38018 9.90982 8.92995C10.0793 8.74381 10.2893 8.60868 10.5199 8.53753C11.0777 8.36544 11.7697 8.79357 13.1539 9.64983C14.5857 10.5356 15.3016 10.9785 15.4531 11.6052C15.5156 11.8639 15.5156 12.1361 15.4531 12.3948Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />' +
            '</svg>';


    }
    else {
        let btn = document.querySelector("#play-pause")
        let svgMarkup = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">' +
            '<path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="currentColor" stroke-width="1.5" />' +
            '<path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="currentColor" stroke-width="1.5" />' +
            '</svg>';

        btn.innerHTML = svgMarkup;

    }
}
function formatTime(seconds) {
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    // Pad minutes and seconds with leading zeros if needed
    const minutesString = minutes.toString().padStart(2, '0');
    const secondsString = secs.toString().padStart(2, '0');

    // Return formatted time string
    return `${minutesString}:${secondsString}`;
}
function timeupdater() {
    currentsong.addEventListener("timeupdate",async () => {
        const currentTime =  await currentsong.currentTime;
        const duration = await currentsong.duration;
        document.querySelector(".time").textContent = await `${formatTime(currentTime)}/${formatTime(duration)}`;
        document.querySelector(".seekbar > svg").style.left = (currentTime / duration) * 100 + "%"
        if(currentTime==duration){
            document.querySelector(".seekbar > svg").style.left=0 +"%"
            currentindex+=1
            currentsong= new Audio(songs[currentindex])
            currentsong.play()
            
            
        }
    });
}
document.querySelector(".seekbar").addEventListener("click", e => {
    document.querySelector(".seekbar > svg").style.left = (e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%"
    currentsong.currentTime = (e.offsetX / e.target.getBoundingClientRect().width) * currentsong.duration
    
    
})
