// Function to append the clicked value to the expression
function appendToExpression(value) {
    const display = document.getElementById('expression');
    display.value += value;  // Directly append to the input value
}

// Clear the display
function clearDisplay() {
    const display = document.getElementById('expression');
    display.value = '';  // Clear input
}

// Evaluate the mathematical expression
function calculate() {
    const display = document.getElementById('expression');
    try {
        const result = math.evaluate(display.value);  // Use math.js to evaluate
        display.value = result;
    } catch (error) {
        display.value = 'Error';  // Show error for invalid expressions
    }
}

// Show advanced options
function showAdvancedOptions() {
    const advancedOptions = document.getElementById('advanced-options');
    advancedOptions.style.display = advancedOptions.style.display === 'none' ? 'block' : 'none';
}

// Calculate advanced functions
function calculateAdvanced() {
    const permutationInput = document.getElementById('permutation-input').value;
    const combinationInput = document.getElementById('combination-input').value;
    const regressionInput = document.getElementById('regression-input').value;
    const results = document.getElementById('advanced-results');

    let resultText = '';

    if (permutationInput) {
        const [n, r] = permutationInput.split(' Pr ').map(Number);
        if (!isNaN(n) && !isNaN(r)) {
            resultText += `Permutation (${n} P ${r}): ${math.nPr(n, r)}<br>`;
        } else {
            resultText += 'Invalid permutation input.<br>';
        }
    }

    if (combinationInput) {
        const [n, r] = combinationInput.split(' Cr ').map(Number);
        if (!isNaN(n) && !isNaN(r)) {
            resultText += `Combination (${n} C ${r}): ${math.nCr(n, r)}<br>`;
        } else {
            resultText += 'Invalid combination input.<br>';
        }
    }

    if (regressionInput) {
        try {
            const data = JSON.parse(regressionInput);
            resultText += `Regression: ${math.regression(data)}<br>`;
        } catch (error) {
            resultText += 'Invalid regression data format.<br>';
        }
    }

    results.innerHTML = resultText;
}

// Add advanced functions to math.js
math.import({
    nPr: function(n, r) {
        return math.factorial(n) / math.factorial(n - r);
    },
    nCr: function(n, r) {
        return math.factorial(n) / (math.factorial(r) * math.factorial(n - r));
    },
    regression: function(data) {
        if (!Array.isArray(data) || data.length === 0) return 'Invalid data';
        
        const x = data.map(point => point[0]);
        const y = data.map(point => point[1]);
        const n = data.length;

        const xSum = x.reduce((acc, val) => acc + val, 0);
        const ySum = y.reduce((acc, val) => acc + val, 0);
        const xySum = x.reduce((acc, val, idx) => acc + val * y[idx], 0);
        const xSqSum = x.reduce((acc, val) => acc + val * val, 0);

        const m = (n * xySum - xSum * ySum) / (n * xSqSum - xSum * xSum);
        const b = (ySum - m * xSum) / n;

        return `y = ${m.toFixed(2)}x + ${b.toFixed(2)}`;
    }
});
