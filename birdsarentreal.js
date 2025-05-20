// init score
let score = 0;

// scoreboard
let html_score = document.getElementById("shop-name");
html_score.innerHTML = "<h1>score: " + score + "</h1>";

// store initial settings
let orig_cursor = document.getElementById("splash").style.cursor;
let orig_pointerEvents = document.getElementsByClassName("global-header")[0].style.pointerEvents;

// add play button
let menu = document.getElementsByClassName("header-links")[0];
let play_btn = document.createElement("button");
play_btn.innerHTML = "&#9658";
play_btn.classList.add("header-link", "btn-primary", "btn-sm");
play_btn.id = "play_btn";
play_btn.addEventListener("click", start_game());
menu.insertBefore(play_btn, menu.childNodes[0]);

// add timer (60s)
function startTimer(count, display) {
    const timer = setInterval(function() {
        count--;
        display.innerHTML = count + "s";
        if (count === 0) {
            clearInterval(timer);
            clear_game();
            alert("Score: " + score + "\nGo back to page ->");
            // location.reload();
        }
    }, 1000);
}

function click_bird(id) {
    item = document.getElementById(id);
    item.style.top = `${Math.random() * 70 + 30}vh`;
    item.style.left = "100vw";
    const ani = item.style.animation;
    item.style.animation = undefined;

    setTimeout(function () {
        item.style.animation = ani;
    }, 4000);

    score += 10;
    html_score.innerHTML = "<h1>score: " + score + "</h1>";
}

function click_spy(id) {
    item = document.getElementById(id);
    item.style.left = "100vw";
    const ani = item.style.animation;
    item.style.animation = undefined;

    setTimeout(function () {
        item.style.animation = ani;
    }, 4000);

    score -= 50;
    html_score.innerHTML = "<h1>score: " + score + "</h1>";
}

// the game
function start_game() {

    html_score.innerHTML = "<h1>score: " + score + "</h1>";

    startTimer(60, document.getElementById("play_btn"));

    document.getElementById("splash").style.cursor = "crosshair";
    document.getElementsByClassName("global-header")[0].style.pointerEvents = "none";

    // make birds killable
    let birds = document.getElementsByClassName("birds")[0];
    var bird = birds.childNodes;
    bird.forEach(function (item) {
        console.log(item.tagName)
        if (item.tagName == "img" || item.tagName == "IMG") {
            item.addEventListener("click", click_bird(item.id));
        }
    });

    // make other objects clickable
    // spying(document.getElementById("plane-video"));
    // spying(document.getElementById("parachute"));
    // spying(document.getElementById("blimp"));
    // spying(document.getElementsByClassName("road")[0].children[0]);
    // spying(document.getElementsByClassName("road")[0].children[1]);

}

function spying(spies) {
    var item = spies;
    item.addEventListener("click", click_spy(item.id));

    const spy = spies.children;
    Array.from(spy).forEach(function (item) {
        item.removeAttribute("href");
        item.style.cursor = "crosshair";
        // remove hover
    });
}

function clear_game() {
    html_score.innerHTML = "<h1>Birds Aren't Real</h1>"
    document.getElementById("play_btn").innerHTML = "&#9658";
    document.getElementById("splash").style.cursor = orig_cursor;
    document.getElementsByClassName("global-header")[0].style.pointerEvents = orig_pointerEvents;
}