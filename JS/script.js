let userName = "Ram";
let welcomeSign = document.getElementById("welcome-sign")

caller = () => {setTimeout(() => {
    let seconds = new Date().getSeconds();
    if(seconds == 0) {
        setClock();
    }
    caller();
},1000)}

const setMessage = () => {
    const now = new Date();
    let hours = now.getHours();
    let message = document.getElementById("welcome-message");
    if(hours > 22 || hours < 6) {
        message.innerText = "Hoot hoot, Ram";
    } else if (hours > 18) {
        message.innerText = "Good Evening, Ram";
    } else if (hours > 12) {
        message.innerText = "Good Afternoon, Ram";
    } else {
        message.innerText = "Good Morning, Ram";
    }
}

const setClock = () => {
    let mainClock = document.getElementById("main-clock");
    const now = new Date();
    mainClock.innerText = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
}

const setTimezones = () => {
    let gmt = document.getElementById("gmt");
    let est = document.getElementById("est");
    const now = new Date();
    gmt.innerText = now.toLocaleString('en-US', { timeZone: 'GMT' });
}

//Below calls yet to be automated
caller();
setMessage();
setClock();
setTimezones();