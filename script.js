document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const startBtn = document.getElementById("start-btn");
    const pauseBtn = document.getElementById("pause-btn");
    const resetBtn = document.getElementById("reset-btn");
    const noteBtn = document.getElementById("note-btn");
    const notesList = document.getElementById("notes-list");

    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;

    function timeToString(time) {
        let diffInHrs = time / 3600000;
        let hh = Math.floor(diffInHrs);

        let diffInMin = (diffInHrs - hh) * 60;
        let mm = Math.floor(diffInMin);

        let diffInSec = (diffInMin - mm) * 60;
        let ss = Math.floor(diffInSec);

        let diffInMs = (diffInSec - ss) * 1000;
        let ms = Math.floor(diffInMs);

        let formattedHH = hh.toString().padStart(2, "0");
        let formattedMM = mm.toString().padStart(2, "0");
        let formattedSS = ss.toString().padStart(2, "0");
        let formattedMS = ms.toString().padStart(3, "0");

        return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
    }

    function startTimer() {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            display.innerHTML = timeToString(elapsedTime);
        }, 1);
        showButton("PAUSE");
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        showButton("START");
    }

    function resetTimer() {
        clearInterval(timerInterval);
        display.innerHTML = "00:00:00.000";
        elapsedTime = 0;
        notesList.innerHTML = "";
        showButton("START");
    }

    function noteTime() {
        const noteItem = document.createElement("li");
        noteItem.textContent = timeToString(elapsedTime);
        notesList.appendChild(noteItem);
    }

    function showButton(buttonKey) {
        const buttonToShow = buttonKey === "START" ? startBtn : pauseBtn;
        const buttonToHide = buttonKey === "START" ? pauseBtn : startBtn;
        buttonToShow.style.display = "inline-block";
        buttonToHide.style.display = "none";
    }

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);
    noteBtn.addEventListener("click", noteTime);

    showButton("START");
});
