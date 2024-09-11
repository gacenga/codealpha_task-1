// Append value to the input field (calculator display)
function appendToExpression(value) {
    const display = document.getElementById('expression');
    display.focus();  // Ensure the input stays focused
    display.value += value;
}

// Clear the display
function clearDisplay() {
    const display = document.getElementById('expression');
    display.value = '';
    display.focus();  // Keep input field focused
}

// Evaluate the mathematical expression entered
function calculate() {
    const display = document.getElementById('expression');
    try {
        const result = math.evaluate(display.value);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
    display.focus();  // Keep input field focused
}

// Import additional math functions (Permutation, Combination, etc.)
math.import({
    nPr: function(n, r) {
        return math.factorial(n) / math.factorial(n - r);
    },
    nCr: function(n, r) {
        return math.factorial(n) / (math.factorial(r) * math.factorial(n - r));
    },
    derivative: function(expr, variable) {
        return math.derivative(expr, variable).toString();
    },
    integral: function(expr, variable) {
        return `∫(${expr})dx`;
    },
    regression: function(dataString) {
        try {
            const data = JSON.parse(dataString);
            return linearRegression(data);
        } catch (error) {
            return 'Invalid data format. Please enter data as [[x1, y1], [x2, y2], ...]';
        }
    }
});

// Linear Regression function for advanced calculations
function linearRegression(data) {
    let xSum = 0, ySum = 0, xySum = 0, xSqSum = 0;
    const n = data.length;

    for (let i = 0; i < n; i++) {
        let x = data[i][0];
        let y = data[i][1];
        xSum += x;
        ySum += y;
        xySum += x * y;
        xSqSum += x * x;
    }

    const m = (n * xySum - xSum * ySum) / (n * xSqSum - xSum * xSum);
    const b = (ySum - m * xSum) / n;

    return `y = ${m.toFixed(2)}x + ${b.toFixed(2)}`;
}
