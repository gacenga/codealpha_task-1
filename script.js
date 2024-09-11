// Append to the expression
function appendToExpression(value) {
    document.getElementById('expression').value += value;
}

// Clear the display
function clearDisplay() {
    document.getElementById('expression').value = '';
}

// Calculate the result
function calculate() {
    const expr = document.getElementById('expression').value;
    try {
        const result = math.evaluate(expr);
        document.getElementById('expression').value = result;
    } catch (error) {
        document.getElementById('expression').value = 'Error';
    }
}

// Extra functionalities (Permutation, Combination, etc.)
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
        // Placeholder for integrals
        return `∫(${expr})dx`; // You can integrate with symbolic computation libraries
    },
    regression: function(dataString) {
        try {
            const data = JSON.parse(dataString); // Parse data points
            return linearRegression(data); // Perform linear regression
        } catch (error) {
            return 'Invalid data format. Please enter data as [[x1, y1], [x2, y2], ...]';
        }
    }
});

// Linear Regression function
function linearRegression(data) {
    let xSum = 0, ySum = 0, xySum = 0, xSqSum = 0;
    const n = data.length;

    // Calculate summations for x, y, x*y, and x^2
    for (let i = 0; i < n; i++) {
        let x = data[i][0];
        let y = data[i][1];
        xSum += x;
        ySum += y;
        xySum += x * y;
        xSqSum += x * x;
    }

    // Calculate slope (m) and y-intercept (b)
    const m = (n * xySum - xSum * ySum) / (n * xSqSum - xSum * xSum);
    const b = (ySum - m * xSum) / n;

    // Return the equation of the line
    return `y = ${m.toFixed(2)}x + ${b.toFixed(2)}`;
}
