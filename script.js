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
let display = document.querySelector(".display");
let currentOperation;
// displaying digits

document.querySelectorAll(".digit").forEach((digit) => {
    digit.addEventListener("click", () => {
        if (display.innerText.length >= 9) {
            alert("max value exceed");
            return;
        }
        else {
            if (digit.innerText == ".") {
                if (!operations.some(op => display.innerText.includes(op))) {
                    if (!num1.includes(".")) {
                        num1 += ".";
                        display.innerText += ".";
                    }
                }
                else {
                    if (display.innerText[0].includes("-")) {
                        num1 += ".";
                        display.innerText += ".";
                    }
                    else {
                        if (!num2.includes(".")) {
                            num2 += ".";
                            display.innerText += ".";
                        }
                    }
                }
            }
            else {
                if (!operations.some(op => display.innerText.includes(op))) {
                    num1 += digit.innerText;
                }
                else {
                    if (display.innerText[0].includes("-")) {
                        num1 += digit.innerText;
                    }
                    else {
                        num2 += digit.innerText;
                    }
                }
                display.innerText += digit.innerText;
            }
        }

    })

})

// displaying operators

document.querySelectorAll(".operator").forEach((operator) => {
    operator.addEventListener("click", () => {
        if (display.innerText.length !== 0) {
            if (!operations.some(op => display.innerText.includes(op))) {
                displayingOperators(operator);
            } else {
                if (display.innerText[0] == "-") {
                    displayingOperators(operator);
                }
            }
            if (operator.id == "equals-to") {
                operation(currentOperation)
            }
            else if (operator.id == "x-squared") {
                operation("x^2");
            }
            else if (operator.id == "backspace") {
                backspace();
            }
            else if (operator.id == "clear") {
                display.innerText = "";
                num1 = "";
                num2 = "";
            }
            else if (operator.id == "plus-minus") {
                if (display.innerText[0] == "-") {
                    display.innerText = display.innerText.slice(1);
                    num1 = num1.slice(1);
                } else {
                    display.innerText = "-".concat(display.innerText);
                    num1 = "-".concat(num1);
                }
            }
        }

    })
})
function displayingOperators(operator) {
    if (operator.id == "add") {
        display.innerText += "+";
        currentOperation = "+";
    }
    else if (operator.id == "substract") {
        display.innerText += "-";
        currentOperation = "-";
    }
    else if (operator.id == "multiply") {
        display.innerText += "×";
        currentOperation = "×";
    }
    else if (operator.id == "divide") {
        display.innerText += "÷";
        currentOperation = "÷";
    }

}
// backspace 

function backspace() {
    console.log("Backspace button clicked!"); 
    display.innerText = display.innerText.slice(0, -1);
    if (!operations.some(op => display.innerText.includes(op))) {
        num1 = num1.slice(0, -1);
    }
    else {
        if (display.innerText[0].includes("-")) {
            num1 = num1.slice(0, -1);
        }
        else {
            num2 = num2.slice(0, -1);
        }
    }
}



document.addEventListener("keydown", (e) => {
    if (e.key == "Backspace") {
        backspace();
    }
})

// operation
function operation(currentOperation) {

    switch (currentOperation) {
        case "+":
            ans = Number(num1) + Number(num2);
            break;
        case "-":
            ans = Number(num1) - Number(num2);
            break;
        case "×":
            ans = Number(num1) * Number(num2);
            break;
        case "÷":
            ans = Number(num1) / Number(num2);
            break;
        case "x^2":
            ans = Number(num1) * Number(num1);
            if (ans>=99999999) {
                alert("max value exceed");
                return;
            }
            break;
        default:
            display.innerText = display.innerText;
            break;
    }
    if (ans % 1 != 0) {
        display.innerText = ans.toFixed(2);
        num1 = ans.toFixed(2);
        num2 = ""
    }
    else {
        display.innerText = ans;
        num1 = ans.toString();
        num2 = "";
    }

}