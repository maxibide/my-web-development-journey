function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "x":
            return a * b;
        case "/":
            return a / b;
        default:
            return "Not a valid operator";
    }
}

function pressOperand(operand) {
    input.push(operand);
    refreshScreen();
}

function pressOperator(operator) {
    input.push(operator);
    refreshScreen();
}

function refreshScreen() {
    const screen = document.querySelector("#screen");
    screen.textContent = input.join('');
}

function pressEqual() {
    let operator = "";
    let index = 0;
    for (let i = 0; i < operators.length; i++)
        if (input.some((element) => element === operators[i])) {
            operator = operators[i];
            index = input.findIndex((element) => element === operator);
        }
    let number1 = input.slice(0, index).join('');
    let number2 = input.slice(index + 1).join('');
    let result = operate(parseInt(number1), parseInt(number2), operator);
    console.log(input);
    console.log(number1);
    console.log(number2);
    console.log(operator);
    console.log(result);
    input = result.toString().split('');
    console.log(input);
    refreshScreen()
}

let input = [];
let operators = ['+', '-', 'x', '/'];

for (let i = 0; i < 10; i++) {
    document.querySelector(`#operand${i}`).addEventListener('click', () => pressOperand(i));
}

document.querySelector('#operatorAdd').addEventListener('click', () => pressOperator('+'));
document.querySelector('#operatorSubstract').addEventListener('click', () => pressOperator('-'));
document.querySelector('#operatorMultiply').addEventListener('click', () => pressOperator('x'));
document.querySelector('#operatorDivide').addEventListener('click', () => pressOperator('/'));

document.querySelector('#operatorEqual').addEventListener('click', pressEqual);

document.querySelector("#clear").addEventListener("click", () => {
    input = [];
    console.log(input);
    refreshScreen();
});

document.querySelector("#back").addEventListener("click", () => {
    input.pop();
    refreshScreen();
});
