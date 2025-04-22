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
const operations = ["÷", "-", "×", "+","*","/","="];
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
    if (numbers.some(num => num == e.key)) {
        displayDigit(e,e.key);
    }
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
document.querySelectorAll(".operator").forEach((operator) => {
    operator.addEventListener("click", (e) => {
        displayOperator(e,operator.id);
        // console.log(operator.id); //  debugging console
    })
})
document.body.addEventListener("keydown", (e) => {
    if (operations.some(op => op == e.key) || e.key == "Backspace" || e.key == "Enter") {
        displayOperator(e,e.key);    
    }
    
})
const displayOperator = (e,id) => {
    if (display.innerText.length !== 0) {
        if ((display.innerText.length >= 9) && !["Backspace","backspace","clear","=","equals-to"].includes(id)) {
            alert("max value exceed");
            return;
        }
        let hasOperator = operations.some(op => display.innerText.slice(1).includes(op)); // to avoid dublicate operators aside from negatibve value
        if (!hasOperator) {
            if (id == "add" || id == "+") {
                display.innerText += "+";
                currentOperation = "add";
            }
            else if( id == "substract" || id == "-"){
                display.innerText += "-";
                currentOperation = "substract";
            }
            else if( id == "multiply" || id == "*") {
                display.innerText += "×";
                currentOperation = "multiply";
            }
            else if (id == "divide" || id == "/") {
                display.innerText += "÷";
                currentOperation = "divide";
            }
            else if ( id == "plus-minus") {
                if (display.innerText[0] == "-") {
                    display.innerText = display.innerText.slice(1);
                    num1 = display.innerText;
                } else {
                    display.innerText = "-".concat(display.innerText);
                    num1 = display.innerText;
                }
            }
            
        }
        if ( id == "backspace" || id == "Backspace") {
            display.innerText = display.innerText.slice(0,-1);
            hasOperator ? num2 = num2.slice(0,-1) : num1 = num1.slice(0,-1);
            // console.log("n1 "+num1,"n2 "+num2); //   debugging console

        }
        else if (id == "x-squared") {
            currentOperation = "x-squared";
            calculations(currentOperation);
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
        }else {
            display.innerText = ans;
            num1 = ans.toString();
        }
        // console.log(ans, typeof ans); // //  debugging console
        num2 = "";
    }
}

