// Image sources
const freeImage = "/src/img/free.webp";
const busyImage = "/src/img/busy.gif";
const pendingImage = "/src/img/pending.png";

// Images
let images = document.querySelectorAll('.laundry-image');

// timer
const timer = document.querySelector(".timer");
let timer_minutes = document.querySelectorAll(".minutes");
let timer_seconds = document.querySelectorAll(".seconds");
let timer_buttons = document.querySelectorAll('.timer-starter');

// tags
let pending = false; 
let busy = false; 
let free = true; 

//  buttons 
let pendingButtons = document.querySelectorAll('.pending_button');
let busyButtons = document.querySelectorAll('.busy_button');
let freeButtons = document.querySelectorAll('.free_button');

// number of used machines (can't use more than 2)
let usingMachines = 0; 

// warning popup
let warning = document.querySelector('.warning');



// Making every timer button "listen" click event
for( timer_button of timer_buttons ) {
    timer_button.addEventListener('click', Timer);
}

for ( pending_button of pendingButtons ) { 
    pending_button.addEventListener('click', Collecter);
}



function Collecter() { 
    // User emptied the machine 
    usingMachines--;
    // After enough machines are free, user can use them again
    warning.style.opacity = "0%";

    // In this case, "this" is pendingButton
    this.style.display = "none";
    // 
    timer_buttons[Number(this.id -1)].style.display = "inline-block";
    freeButtons[Number(this.id) - 1].style.display = "inline-block";
    images[Number(this.id) - 1].src = freeImage;
    
}

function Timer() { 
    // User can't use more than 3 machines at a time
    if(usingMachines >= 3) {
        warning.style.opacity = "100%";
        return;
    }
    // Counting the number of machines user uses
    usingMachines++;
    // Waitseconds are adjustable by developer
    let waitSeconds = 5; 
    // Making "busy" button appear instead of "free" button
    busyButtons[Number(this.id) - 1].style.display = "inline-block";
    freeButtons[Number(this.id) - 1].style.display = "none";
    pendingButtons[Number(this.id) - 1].style.display = "none";
    // "this" is the button in this case 
    this.style.display = "none";
    images[Number(this.id) - 1].src = busyImage;
    this.logic = () => {
            timer_minutes[Number(this.id) - 1].textContent = Math.floor(waitSeconds / 60); 
            timer_seconds[Number(this.id) - 1].textContent = waitSeconds%60;
            waitSeconds--;
            
    };
    // Calling a function before setInterval to run instantly
    this.logic();
    let interval = setInterval(this.logic, 1000);
    setTimeout(() => {
        
        busyButtons[Number(this.id) - 1].style.display = "none";
        // freeButtons[Number(this.id) - 1].style.display = "inline-block";
        pendingButtons[Number(this.id) - 1].style.display = "inline-block";
        images[Number(this.id) - 1].src = pendingImage;
        clearInterval(interval);
    }, (waitSeconds+1) * 1000);
}
