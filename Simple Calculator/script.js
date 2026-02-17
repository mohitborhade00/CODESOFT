function calculate() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operation = document.getElementById("operation").value;
    const resultDisplay = document.getElementById("result");

    if (isNaN(num1) || isNaN(num2)) {
        resultDisplay.textContent = "⚠ Please enter valid numbers!";
        return;
    }

    let result;

    switch (operation) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                resultDisplay.textContent = "❌ Cannot divide by zero!";
                return;
            }
            result = num1 / num2;
            break;
        default:
            resultDisplay.textContent = "Invalid operation!";
            return;
    }

    resultDisplay.textContent = "Result: " + result;
}
