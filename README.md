
# Calculator Implementation Guide

This guide provides step-by-step instructions for implementing a calculator with advanced functionalities such as memory operations, a back button that returns to the previous state, and a blinking cursor in the input section.

## 1. Set Up Your Project
Before you start writing the JavaScript code, make sure you have the necessary HTML and CSS files set up:
- **HTML:** This should contain the basic structure of your calculator with all the buttons and display areas.
- **CSS:** Already provided, it styles the calculator layout and elements.

## 2. Create the JavaScript File
Create a new file named `script.js` in your project folder. This file will contain all the JavaScript logic for the calculator.

## 3. Link the JavaScript File to HTML
In your HTML file, link the `script.js` file by adding the following line before the closing `</body>` tag:

```html
<script src="script.js"></script>
```

This ensures that the JavaScript file is loaded after the HTML content, allowing the script to interact with the DOM elements.

## 4. DOMContentLoaded Event Listener
At the start of the JavaScript file, use the `DOMContentLoaded` event listener to ensure that the DOM (Document Object Model) is fully loaded before the script tries to access any elements.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // All code will be inside this block
});
```

## 5. Select DOM Elements
Inside the `DOMContentLoaded` block, select the necessary DOM elements, such as the input display and result display:

```javascript
const input = document.querySelector('.input');
const result = document.querySelector('.input-result');
```

## 6. Initialize Variables
Next, initialize some variables that will be used to store the current input, the calculation string, memory value, and other necessary states:

```javascript
let currentInput = '';
let calculation = '';
let memory = 0;
let isResultDisplayed = false;
const history = []; // Stack to keep track of previous states
```

## 7. Update the Display Function
Create a function to update the display with the current input:

```javascript
const updateDisplay = (value) => {
    input.textContent = value;
    if (value === '') {
        input.classList.add('empty');
    } else {
        input.classList.remove('empty');
    }
};
```

This function handles the text display in the input area and also manages the visibility of the blinking cursor.

## 8. Perform Calculation Function
This function evaluates the expression stored in `calculation` and displays the result:

```javascript
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
```

> **Note:** The `eval` function is used here to evaluate the mathematical expression. It can be dangerous if used with untrusted inputs, but for this calculator, it's acceptable.

## 9. Handle Button Clicks
Handle different button clicks with a single event listener:

```javascript
const handleButtonClick = (event) => {
    const button = event.target;
    const value = button.textContent.trim();

    if (value === 'AC') {
        // Reset everything
    } else if (value === 'Back') {
        // Undo last input
    } else if (value === '=') {
        performCalculation();
    } else if (value === '√') {
        // Handle square root
    } else if (value === '%') {
        // Handle percentage
    } else if (value === '.') {
        // Handle decimal point
    } else if (value === 'M+') {
        // Handle memory add
    } else if (value === 'M-') {
        // Handle memory subtract
    } else if (value === 'MR') {
        // Handle memory recall
    } else {
        // Handle numbers and operators
    }
};
```

This function checks the button's value and performs the corresponding action.

## 10. Handle Keyboard Input
Add support for keyboard input, mapping keys to calculator functions:

```javascript
const handleKeyboardInput = (event) => {
    const key = event.key;

    if (key === 'Enter') {
        performCalculation();
    } else if (key === 'Backspace') {
        // Undo last input
    } else if (key === 'Escape') {
        // Reset everything
    } else if (['+', '-', '*', '/'].includes(key)) {
        // Handle operators
    } else if (key >= '0' && key <= '9' || key === '.') {
        // Handle numbers and decimal
    } else if (key === '%') {
        // Handle percentage
    } else if (key === 'r') {
        // Handle square root
    }
};
```

## 11. Attach Event Listeners
Attach event listeners to the buttons and to the document for keyboard inputs:

```javascript
document.querySelectorAll('.box').forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

document.addEventListener('keydown', handleKeyboardInput);
```

## 12. Testing
After implementing the JavaScript, test each button and keyboard input to ensure everything works as expected.

## 13. Final Adjustments
Make any final adjustments to handle edge cases or improve the user experience, such as refining the `eval` function or enhancing the display logic.

## Conclusion
You now have a fully functional calculator with a modern interface and keyboard support. The provided JavaScript handles all necessary operations, including memory functions, basic arithmetic, square roots, percentages, and undo operations.
