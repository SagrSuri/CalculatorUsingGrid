document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.input');
    const result = document.querySelector('.input-result');
    let currentInput = '';
    let calculation = '';
    let memory = 0;
    let isResultDisplayed = false;
    const history = []; // Stack to keep track of previous states

    const updateDisplay = (value) => {
        input.textContent = value;
        // Hide the placeholder if there's any input
        if (value.trim() !== '') {
            input.classList.add('hidden');
        } else {
            input.classList.remove('hidden');
        }
    };

    const performCalculation = () => {
        try {
            const evalResult = eval(calculation);
            result.textContent = evalResult;
            calculation = evalResult;
            currentInput = evalResult.toString();
            isResultDisplayed = true;
        } catch (error) {
            result.textContent = 'Error';
            isResultDisplayed = false;
        }
    };

    const handleButtonClick = (event) => {
        const button = event.target;
        const value = button.textContent.trim();

        if (value === 'AC') {
            currentInput = '';
            calculation = '';
            updateDisplay(''); // Clear input display
            result.textContent = ''; // Clear result display
            isResultDisplayed = false;
            history.length = 0; // Clear history on reset
        } else if (value === '←') { // Handle the back arrow
            if (history.length > 0) {
                // Revert to previous state
                const previousState = history.pop();
                currentInput = previousState.currentInput;
                calculation = previousState.calculation;
                updateDisplay(currentInput || ''); // Update display
                result.textContent = result.textContent; // Keep result as is
                isResultDisplayed = false;
            }
        } else if (value === '=') {
            performCalculation();
        } else if (value === '√') {
            calculation = Math.sqrt(parseFloat(calculation)).toString();
            currentInput = calculation;
            updateDisplay(currentInput);
        } else if (value === '%') {
            calculation = (parseFloat(calculation) / 100).toString();
            currentInput = calculation;
            updateDisplay(currentInput);
        } else if (value === '.') {
            if (!currentInput.includes('.')) {
                calculation += '.';
                currentInput += '.';
                updateDisplay(currentInput);
            }
        } else if (value === 'M+') {
            memory += parseFloat(result.textContent) || 0;
        } else if (value === 'M-') {
            memory -= parseFloat(result.textContent) || 0;
        } else if (value === 'MR') {
            calculation = memory.toString();
            currentInput = calculation;
            updateDisplay(currentInput);
        } else {
            // Save current state before making changes
            history.push({ currentInput, calculation });
            calculation += value;
            currentInput += value;
            updateDisplay(currentInput);
            isResultDisplayed = false;
        }
    };

    const handleKeyboardInput = (event) => {
        const key = event.key;

        if (key === 'Enter') {
            performCalculation();
        } else if (key === 'Backspace') {
            if (history.length > 0) {
                // Revert to previous state
                const previousState = history.pop();
                currentInput = previousState.currentInput;
                calculation = previousState.calculation;
                updateDisplay(currentInput || ''); // Update display
                result.textContent = result.textContent; // Keep result as is
                isResultDisplayed = false;
            }
        } else if (key === 'Escape') {
            currentInput = '';
            calculation = '';
            updateDisplay(''); // Clear input display
            result.textContent = ''; // Clear result display
            isResultDisplayed = false;
            history.length = 0; // Clear history on reset
        } else if (['+', '-', '*', '/'].includes(key)) {
            history.push({ currentInput, calculation });
            calculation += ` ${key} `;
            currentInput += ` ${key} `;
            updateDisplay(currentInput);
            isResultDisplayed = false;
        } else if (key >= '0' && key <= '9' || key === '.') {
            history.push({ currentInput, calculation });
            calculation += key;
            currentInput += key;
            updateDisplay(currentInput);
            isResultDisplayed = false;
        } else if (key === '%') {
            calculation = (parseFloat(calculation) / 100).toString();
            currentInput = calculation;
            updateDisplay(currentInput);
            isResultDisplayed = false;
        } else if (key === 'r') {
            calculation = Math.sqrt(parseFloat(calculation)).toString();
            currentInput = calculation;
            updateDisplay(currentInput);
            isResultDisplayed = false;
        }
    };

    document.querySelectorAll('.box').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    document.addEventListener('keydown', handleKeyboardInput);
});
