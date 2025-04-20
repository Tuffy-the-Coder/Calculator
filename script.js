let mouseUsed = false;
let btn1Hover = false;
let buttons = document.querySelectorAll("button");

// removes focus style to avoid two hover effects from mouse and tab 

buttons.forEach((btn) => {
    btn.addEventListener("mouseover", () => {
        document.querySelectorAll("button").forEach((e) => {
            e.classList.remove("usingKeyboard");
        })
        mouseUsed = true;
        if (btn === buttons[0]) {
            btn1Hover = true;
        }
    })
})

// restore mouse hover effect

document.body.addEventListener("mousemove", () => {
    buttons.forEach((el) => {
        el.style.pointerEvents = "";
        el.addEventListener("mouseleave", () => {
            if (el === buttons[0]) {
                btn1Hover = false;
            }
        })
    })
})

// adds focus style & removes active mouse hover
document.body.addEventListener("keydown", (e) => {
    buttons.forEach((el) => {
        el.classList.add("usingKeyboard");
        el.style.pointerEvents = "none";
    })
    if (mouseUsed) {
        e.preventDefault(); // prevents deafult tab behaviour 
        mouseUsed = false;
        if (btn1Hover) {
            buttons[1].focus();
        } else {
            buttons[0].focus();
        }
    }
})
