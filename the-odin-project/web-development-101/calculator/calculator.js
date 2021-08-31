function calculate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "x":
            return a * b;
        case "÷":
            return a / b;
        default:
            return "Not a valid operator";
    }
}

let input = {
    current: [],
    insertOperand: function (operand) {
        if (
            this.current.length === 0 ||
            this.current[this.current.length - 1].type === "operator"
        ) {
            this.current.push({
                value: [operand],
                type: "operand",
            });

        } else if (this.current[this.current.length - 1].type === "operand") {
            this.current[this.current.length - 1].value.push(operand);

        } else if (this.current[this.current.length - 1].type === "result") {
            this.current = [];
            this.current.push({
                value: [operand],
                type: "operand",
            });
        }

        this.refreshScreen();
    },
    insertOperator: function (operator) {
        if (this.current.length === 0) {
            return;

        } else if (this.current[this.current.length - 1].type === "operator") {
            this.current[this.current.length - 1].value = operator;

        } else if (
            (this.current[this.current.length - 1].type === "operand" &&
                this.current.filter((e) => e.type === "operator").length === 0) ||
            this.current[this.current.length - 1].type === "result"
        ) {
            this.current.push({
                value: operator,
                type: "operator",
            });

        } else if (
            this.current[this.current.length - 1].type === "operand" &&
            this.current.filter((e) => e.type === "operator").length > 0
        ) {
            this.operate();
            this.current.push({
                value: operator,
                type: "operator",
            });
        }

        this.refreshScreen();
    },
    insertFloatPoint: function () {
        if (this.current.length === 0 || this.current[this.current.length - 1].type === 'operator') {
            this.current.push({
                value: ['0', '.'],
                type: 'operand'
            });

        } else if (this.current[this.current.length - 1].type === 'operand'
            && !(this.current[this.current.length - 1].value.some(e => e === '.'))) {
            this.current[this.current.length - 1].value.push('.')

        } else if (this.current[this.current.length - 1].type === 'result') {
            this.current = []
            this.current.push({
                value: ['0', '.'],
                type: 'operand'
            });
        }

        this.refreshScreen();
    },
    operate: function () {
        let number1 = 0;
        
        if (this.current.length === 3) {
            if (this.current[0].type === "result") {
                number1 = this.current[0].value;
            
            } else {
                number1 = parseFloat(this.current[0].value.join(""));
            }
            let number2 = parseFloat(this.current[2].value.join(""));
            let result = calculate(number1, number2, this.current[1].value);
            this.current = [];
            this.current.push({
                value: result,
                type: "result",
            });

            this.refreshScreen();
       
        } else {
            return;
        }
    },
    refreshScreen: function () {
        let output = "";
        const screen = document.querySelector("#screen");
        input.current.forEach((obj) => {
            if (typeof obj.value === "object") {
                output += obj.value.join("") + ' ';
           
            } else {
                output += obj.value + ' ';
            }
        });
        screen.textContent = output;
    },
    backspace: function () {
        if (input.current.length === 0) {
            return
       
        } else if (input.current[input.current.length - 1].type === 'operand') {
            if (input.current[input.current.length - 1].value.length === 1) {
                input.current.pop();
          
            } else {
                input.current[input.current.length - 1].value.pop();
            }
       
        } else {
            input.current.pop();
        }
        
        this.refreshScreen();

    },
    clear: function () {
        this.current = [];
        this.refreshScreen();
    }
};

for (let i = 0; i < 10; i++) {
    document
        .querySelector(`#operand${i}`)
        .addEventListener("click", () => input.insertOperand(i));
}

document
    .querySelector("#operatorAdd")
    .addEventListener("click", () => input.insertOperator("+"));
document
    .querySelector("#operatorSubstract")
    .addEventListener("click", () => input.insertOperator("-"));
document
    .querySelector("#operatorMultiply")
    .addEventListener("click", () => input.insertOperator("x"));
document
    .querySelector("#operatorDivide")
    .addEventListener("click", () => input.insertOperator("÷"));
document
    .querySelector("#operatorEqual")
    .addEventListener("click", () => input.operate());
document
    .querySelector("#backspace")
    .addEventListener("click", () => input.backspace());
document
    .querySelector("#clear")
    .addEventListener("click", () => input.clear());
document
    .querySelector("#floatingPoint")
    .addEventListener("click", () => input.insertFloatPoint());