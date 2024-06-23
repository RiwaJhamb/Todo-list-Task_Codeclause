class Calculator {
    constructor(screenElement) {
        this.screenElement = screenElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateScreen();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateScreen();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateScreen();
    }

    updateScreen() {
        this.screenElement.value = this.currentOperand;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateScreen();
    }
}

const calculator = new Calculator(document.querySelector('.calculator-screen'));

document.querySelectorAll('.calculator-keys button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('operator')) {
            calculator.chooseOperation(button.value);
        } else if (button.classList.contains('all-clear')) {
            calculator.clear();
        } else if (button.classList.contains('equal-sign')) {
            calculator.compute();
        } else {
            calculator.appendNumber(button.value);
        }
    });
});
