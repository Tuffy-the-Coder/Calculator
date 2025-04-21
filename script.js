// Styling part

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
        if (e.key == "Tab") {
            el.classList.add("usingKeyboard");
            el.style.pointerEvents = "none";
        }

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

// operations part

let num1 = "";
let num2 = "";
const operations = ["÷", "-", "×", "+"];
const numbers = [1,2,3,4,5,6,7,8,9,0]
let display = document.querySelector(".display");
let currentOperation;
document.querySelectorAll(".digit").forEach((digit) => {
    digit.addEventListener("click", (e) => {
        displayDigit(e,digit.innerText);
        // console.log(digit.innerText); // debugging console
    })
})
document.body.addEventListener("keydown", (e) => {
    displayDigit(e,e.key);
    // console.log(e.key); // debugging console
})

const displayDigit = (e,digit) => {
    if (display.innerText.length >= 9) {
        alert("max value exceed");
        return;
    } else {
        let hasOperator = operations.some(op => display.innerText.slice(1).includes(op)); // for placing value on num1 & num2
        if(!hasOperator){
            if (digit == ".") {
                if (!num1.includes(".")) {  // to avoid dublicate . in num1
                    num1 += digit;
                    display.innerText += digit;
                }
            } else {
                num1 += digit;
                display.innerText +=digit;
            }
        } else {
            if (!num2.includes(".")) {     // to avoid dublicate . in num2
                num2 +=digit;
                display.innerText += digit;
            } else {
                num2 +=digit;
                display.innerText += digit;
            }
            
        }
    }
}
