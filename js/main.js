'use strict'
var gNum = 1;
var gStartTime = null;
var gSize = 4;
var gIntervalTime = null;

function init() {
    createBoard(gSize);
}

function refresh(size = gSize) {
    createBoard(gSize = size);
}


function createBoard(size) {
    clearTime();
    gNum = 1;
    var nums = [];
    for (var i = 1; i <= size ** 2; i++) {
        nums.push(i);
    }
    var classSize = '';
    switch (size) {
        case 4:
            classSize = 'eazy';
            break;
        case 5:
            classSize = 'hard';
            break;
        case 6:
            classSize = 'advanced';
            break;
    }
    var strHtml = ``;
    for (var i = 0; i < size ** 2; i++) {
        if (i % size === 0) {
            strHtml += `<tr>`
        }
        strHtml += `<td class='open ${classSize}' onclick=cellClicked(this)>${nums.splice(getRandomInt(0, nums.length),1)[0]}</td>`
        if (i % size === size - 1) {
            strHtml += `</tr>`
        }
    }
    var elTable = document.querySelector(`.board`);
    elTable.innerHTML = strHtml;
    var elNum = document.querySelector('.num');
    elNum.innerHTML = 1;
}

function clearTime() {
    if (gIntervalTime) clearInterval(gIntervalTime);
    var strTime = '00:00:000'
    var elmTime = document.querySelector('.time');
    elmTime.innerHTML = strTime;

}

function setTime() {
    gStartTime = Date.now();
    if (gIntervalTime) clearInterval(gIntervalTime);
    gIntervalTime = setInterval(function() {
        var time = new Date(Date.now() - gStartTime);
        var ms = time.getMilliseconds();
        if (ms < 10) ms = '00' + ms;
        else if (ms < 100) ms = '0' + ms;
        var strTime = `${ms}`;
        var sec = time.getSeconds();
        if (sec === 0) sec = '00';
        else if (sec < 10) sec = '0' + sec;
        strTime = `${sec}:${strTime}`;

        var mint = time.getMinutes();
        if (mint === 0) mint = '00';
        else if (mint < 10) mint = '0' + mint;
        strTime = `${mint}:${strTime}`;

        var elmTime = document.querySelector('.time');
        elmTime.innerHTML = strTime;
    }, 1)
}

function cellClicked(el) {
    if (el.innerHTML == gNum) {
        if (gNum === gSize ** 2) {
            endGame();
            return;
        }
        if (gNum === 1) setTime();
        el.classList.remove('open');
        el.classList.add('close');
        gNum++;
        var elNum = document.querySelector('.num');
        elNum.innerHTML = gNum;
    }
}

function endGame() {
    clearInterval(gIntervalTime);
    var time = new Date(Date.now() - gStartTime);
    if (confirm(`You win in ${time.getTime()/1000} secend.\n you whant to game again?`)) {
        refresh();
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}