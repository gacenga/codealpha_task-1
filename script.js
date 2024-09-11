function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        const expression = document.getElementById('display').value;
        const result = eval(expression.replace(/sqrt/g, 'Math.sqrt').replace(/pow/g, 'Math.pow'));
        document.getElementById('display').value = result;
    } catch {
        document.getElementById('display').value = 'Error';
    }
}

