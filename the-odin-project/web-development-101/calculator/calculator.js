function calculate(a, b, operator) {
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

let input = {
    current: [],
    insertOperand: function (operand) {

        if (this.current.length === 0 || this.current[this.current.length - 1].type === 'operator') {
            this.current.push({
                value: [operand],
                type: 'operand'
            }
            );
        } else if (this.current[this.current.length - 1].type === 'operand') {
            this.current[this.current.length - 1].value.push(operand);
        } else if (this.current[this.current.length - 1].type === 'result') {
            this.current = [];
            this.current.push({
                value: [operand],
                type: 'operand'
            });
        }

        console.log(this.current); // for debugging
        this.refreshScreen();
    },
    insertOperator: function (operator) {
        if (this.current.length === 0) {
            return
        } else if (this.current[this.current.length - 1].type === 'operator') {
            this.current[this.current.length - 1].value = operator;
        } else if ((this.current[this.current.length - 1].type === 'operand' &&
            this.current.filter(e => e.type === 'operator').length === 0) ||
            this.current[this.current.length - 1].type === 'result') {
            this.current.push({
                value: operator,
                type: 'operator'
            });
        } else if (this.current[this.current.length - 1].type === 'operand' &&
            this.current.filter(e => e.type === 'operator').length > 0) {
            this.operate();
            this.current.push({
                value: operator,
                type: 'operator'
            });
        }
        console.log(this.current); // for debugging
        this.refreshScreen();
    },
    operate: function () {
        let number1 = 0;
        if (this.current.length === 3) {
            if (this.current[0].type === 'result') {
                number1 = this.current[0].value;
            } else {
                number1 = parseInt(this.current[0].value.join(''));
            }
            let number2 = parseInt(this.current[2].value.join(''));
            let result = calculate(number1, number2, this.current[1].value);
            this.current = [];
            this.current.push({
                value: result,
                type: 'result'
            });
            console.log(this.current); // for debugging
            this.refreshScreen();
        } else {
            return
        }
    },
    refreshScreen: function () {
        /*
        une todos los valores de current.value y los muestra en const
    
        */

    },
};

for (let i = 0; i < 10; i++) {
    document.querySelector(`#operand${i}`).addEventListener('click', () => input.insertOperand(i));
}

document.querySelector('#operatorAdd').addEventListener('click', () => input.insertOperator('+'));
document.querySelector('#operatorSubstract').addEventListener('click', () => input.insertOperator('-'));
document.querySelector('#operatorMultiply').addEventListener('click', () => input.insertOperator('x'));
document.querySelector('#operatorDivide').addEventListener('click', () => input.insertOperator('/'));

document.querySelector('#operatorEqual').addEventListener('click', () => input.operate());


/*

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

document.querySelector("#clear").addEventListener("click", () => {
    input = [];
    console.log(input);
    refreshScreen();
});

document.querySelector("#back").addEventListener("click", () => {
    input.pop();
    refreshScreen();
});
*/