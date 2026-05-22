const keyMap = {                                                                                                   // Keymapping
    '0': 'btn-0',
    '1': 'btn-1',
    '2': 'btn-2',
    '3': 'btn-3',
    '4': 'btn-4',
    '5': 'btn-5',
    '6': 'btn-6',
    '7': 'btn-7',
    '8': 'btn-8',
    '9': 'btn-9',
    '.': 'btn-dot',
    ',': 'btn-dot',
    '+': 'btn-add',
    '-': 'btn-sub',
    '*': 'btn-mul',
    '/': 'btn-div',
    '(': 'btn-openBracket',
    ')': 'btn-closeBracket',
    'Enter': 'btn-eq',
    'Backspace': 'btn-back',
    'c': 'btn-c',
    'C': 'btn-c',
    'Escape': 'btn-c',
};                                                                                                                      // ----------------------------------------------

document.addEventListener('keydown', (event) => {                                       // Listens for key presses
    const buttonId = keyMap[event.key];
    if (!buttonId) return;

    event.preventDefault();

    const button = document.getElementById(buttonId);
    if (!button) return;

    button.classList.add('key-active');

    button.click();
});

document.addEventListener('keyup', (event) => {
    const buttonId = keyMap[event.key];
    if (!buttonId) return;

    const button = document.getElementById(buttonId);
    if (button) button.classList.remove('key-active');
});

document.getElementById('btn-eq').addEventListener('click', () => {                         // Equal key, button and function link
    const equation = `${buffer.join('')}`.replace(/\b0+(\d+)/g, '$1');
    buffer = [ eval(equation) ];
    renderBuffer(true);
});

document.getElementById('btn-c').addEventListener('click', () => {                          // Clear key, button and function link
    clearBuffer();
});

document.getElementById('btn-back').addEventListener('click', () => {                       // Backspace key, button and function link
    buffer.pop();
    renderBuffer();
});

let buffer = [];                                                                                                 // Array used for calculations

function renderBuffer(byEquals) {                                                                                 // Expression rendering
    const resultElement = document.getElementById('result');
    resultElement.textContent = buffer.length === 0 ? '0' : buffer.join('');
    resultElement.scrollLeft = byEquals ? 0 : resultElement.scrollWidth;
}

function clearBuffer() {                                                                                          // Clear buffer function
    buffer = [];
    renderBuffer();
}


const numberButtons = ['btn-0','btn-1','btn-2','btn-3','btn-4','btn-5','btn-6','btn-7','btn-8','btn-9'];        // Inserts digits into the buffer
numberButtons.forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
        const digit = document.getElementById(id).textContent.trim();
        buffer.push(digit);
        renderBuffer();
    });
});
                                                                                                                        // Calculation functions
function square(x) {
    return x * x;
}

function inverse(x) {
    return 1 / x;
}

function sqrt(x) {
    return Math.sqrt(x);
}

const operatorButtons = {                                                                                          // Operator mapping
    'btn-add': '+',
    'btn-sub': '-',
    'btn-mul': '*',
    'btn-div': '/',
    'btn-openBracket': '(',
    'btn-closeBracket': ')',
    'btn-inv': 'inverse(',
    'btn-sq': 'square(',
    'btn-sqrt': 'sqrt(',
    'btn-dot': '.',
};

Object.entries(operatorButtons).forEach(([id, op]) => {                                             // Operator processing
    document.getElementById(id).addEventListener('click', () => {
        if (op === '.' && buffer[buffer.length - 1] === '.') {
            return;
        }
        buffer.push(op);
        renderBuffer();
    });
});
