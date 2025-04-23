// Styling part

let mouseUsed = false;
let btn0 = document.createElement("button");
btn0.style.position = "absolute";
btn0.style.left = "-100%";
btn0.setAttribute("tabindex", "-1")
document.body.prepend(btn0);
let buttons = document.querySelectorAll("button");

// removes focus style to avoid two hover effects from mouse and tab 

buttons.forEach((btn) => {
    btn.addEventListener("mouseover", () => {
        btn.classList.remove("usingKeyboard");
        mouseUsed = true;
        btn0.focus();
    })
})

// restore mouse hover effect

document.body.addEventListener("mousemove", () => {
    buttons.forEach((el) => {
        el.style.pointerEvents = "";
    })
})
buttons.forEach((btn) => {
    btn.addEventListener("mouseleave", () => {
        btn0.focus();
    })
})

// adds focus style & removes active mouse hover
document.body.addEventListener("keydown", (e) => {
    if (e.key == "Tab" && document.activeElement == btn0) { 
        e.preventDefault();
        buttons[1].focus();
    }
    if (e.key !== "Tab" && e.key !== "Enter" && e.key !== "=" && e.key !== "Backspace") {
        btn0.focus();
    }
    buttons.forEach((el) => {
        if (e.key != "Shift") {
            el.style.pointerEvents = "none";
        }       
        if (e.key == "Tab") {
            el.classList.add("usingKeyboard");
            
        }

    })
    const ignoreKeys = ["Tab", "Enter", "Shift", "Escape","Backspace"];
    if (!ignoreKeys.includes(e.key)) {
        btn0.focus();
        btn0Focus = true;
    }
    if (mouseUsed) {
        e.preventDefault();  // prevents deafult tab behaviour 
        mouseUsed = false;
    }
})


// ribbon-cat effect

const cat = document.getElementById("cat-ribbon");
let catDefault = true;
const audio = new Audio();
audio.src = "cat-ribbon/cat-sfx.mp3";

cat.addEventListener("click", () => {
    if (audio.paused) {
        audio.currentTime = 0;
        audio.play();
        audio.addEventListener("timeupdate",() => {
        })        
    }
    if (catDefault) {
        cat.id = "";
        cat.classList.add("cat-ribbon-new");
        catDefault = false;
    } else {
        cat.id = "cat-ribbon";
        cat.classList.remove("cat-ribbon-new");
        catDefault = true;
    }
})

// operations part

let num1 = "";
let num2 = "";
const operations = ["÷", "-", "×", "+", "*", "/", "="];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
let display = document.querySelector(".display");
let currentOperation;
document.querySelectorAll(".digit").forEach((digit) => {
    digit.addEventListener("click", (e) => {
        displayDigit(e, digit.innerText);
        // console.log(digit.innerText); // debugging console
    })
})
document.body.addEventListener("keydown", (e) => {
    if (numbers.some(num => num == e.key)) {
        displayDigit(e, e.key);
    }
    // console.log(e.key); // debugging console
})

const displayDigit = (e, digit) => {
    if (display.innerText.length >= 9) {
        alert("max value exceed");
        return;
    } else {
        let hasOperator = operations.some(op => display.innerText.slice(1).includes(op)); // for placing value on num1 & num2
        if (!hasOperator) {
            if (digit == ".") {
                if (!num1.includes(".")) {  // to avoid dublicate . in num1
                    num1 += digit;
                    display.innerText += digit;
                }
            } else {
                num1 += digit;
                display.innerText += digit;
            }
        } else {
            if (!num2.includes(".")) {     // to avoid dublicate . in num2
                num2 += digit;
                display.innerText += digit;
            } else {
                num2 += digit;
                display.innerText += digit;
            }
        }
    }
}
document.querySelectorAll(".operator").forEach((operator) => {
    operator.addEventListener("click", (e) => {
        displayOperator(e, operator.id);
        // console.log(operator.id); //  debugging console
    })
})
document.body.addEventListener("keydown", (e) => {
    if (operations.some(op => op == e.key) || e.key == "Backspace" || e.key == "Enter") {
        // console.log(e.key) // debugging console
        displayOperator(e, e.key);
    }

})
const displayOperator = (e, id) => {
    if (display.innerText.length !== 0) {
        if ((display.innerText.length >= 9) && !["Backspace", "backspace", "clear", "=", "equals-to"].includes(id)) {
            alert("max value exceed");
            return;
        }
        let hasOperator = operations.some(op => display.innerText.slice(1).includes(op)); // to avoid dublicate operators aside from negatibve value
        if (!hasOperator) {
            if (id == "add" || id == "+") {
                display.innerText += "+";
                currentOperation = "add";
            }
            else if (id == "substract" || id == "-") {
                display.innerText += "-";
                currentOperation = "substract";
            }
            else if (id == "multiply" || id == "*") {
                display.innerText += "×";
                currentOperation = "multiply";
            }
            else if (id == "divide" || id == "/") {
                display.innerText += "÷";
                currentOperation = "divide";
            }
            else if (id == "plus-minus") {
                if (display.innerText[0] == "-") {
                    display.innerText = display.innerText.slice(1);
                    num1 = display.innerText;
                } else {
                    display.innerText = "-".concat(display.innerText);
                    num1 = display.innerText;
                }
            }
            else if (id == "x-squared") {
                currentOperation = "x-squared";
                calculations(currentOperation);
            }
        }
        if (id == "backspace" || id == "Backspace") {
            display.innerText = display.innerText.slice(0, -1);
            hasOperator ? num2 = num2.slice(0, -1) : num1 = num1.slice(0, -1);
            // console.log("n1 "+num1,"n2 "+num2); //   debugging console

        }

        else if (id == "clear") {
            display.innerText = "";
            num1 = "";
            num2 = "";
        }
        else if ((id == "equals-to" || id == "=" || id == "Enter") && num2.length != 0) {
            calculations(currentOperation);
        }
    }
}

const calculations = (currentOperation) => {
    let ans;
    switch (currentOperation) {
        case "add":
            ans = Number(num1) + Number(num2);
            break;
        case "substract":
            ans = Number(num1) - Number(num2);
            break;
        case "multiply":
            ans = Number(num1) * Number(num2);
            break;
        case "divide":
            ans = Number(num1) / Number(num2);
            break;
        case "x-squared":
            ans = Number(num1) * Number(num1);
            break;
        default:
            break;
    }
    if (ans >= 999999999) {
        alert("max value exceed");
    } else {
        if (!Number.isInteger(ans)) {       // to check if ans is decimal or int
            display.innerText = ans.toFixed(2);
            num1 = ans.toFixed(2);
        } else {
            display.innerText = ans;
            num1 = ans.toString();
        }
        // console.log(ans, typeof ans); // //  debugging console
        num2 = "";
    }
}

