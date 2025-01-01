let userName = "Ram";
let welcomeSign = document.getElementById("welcome-sign")

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
    const gmtDateTime = now.toLocaleString('en-US', { 
        timeZone: 'GMT', 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      });
    
      const estDateTime = now.toLocaleString('en-US', { 
        timeZone: 'America/New_York', 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      });
    gmt.innerText = gmtDateTime + " , United Kingdom";
    est.innerText = estDateTime + " , United States";
}

caller = () => {setTimeout(() => {
    let seconds = new Date().getSeconds();
    if(seconds == 0) {
        setClock();
        setTimezones();
        let minutes = new Date().getMinutes();
        if (minutes === 0) {
            setMessage();
        }
    }
    caller();
},1000)}

caller();
setMessage();
setClock();
setTimezones();