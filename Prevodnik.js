const rates = {                                                                                                    // Currency exchange rates
    CZK: 23.4,
    USD: 1,
    EUR: 0.93,
    GBP: 0.79,
};

const defaults = {                                                                                                 // Default values
    fromCurrency: 'USD',
    toCurrency: 'CZK',
    amount: '1',
};

const fromAmount = document.getElementById('fromAmount');                                         // HTML elements
const toAmount = document.getElementById('toAmount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const rateLine = document.getElementById('rateLine');
const swapButton = document.getElementById('swapButton');

let lastConvertedValue = null;

function normalizeInput(value) {                                                                                        // Input correction
    let cleaned = value.replace(',', '.').replace(/[^\d.]/g, '');

    if (cleaned.startsWith('.')) {
        cleaned = `0${cleaned}`;
    }

    const firstDot = cleaned.indexOf('.');
    if (firstDot !== -1) {
        cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '');
    }

    return cleaned;
}

function parseAmount(value) {                                                                                   // NaN check
    const normalized = normalizeInput(value);
    if (normalized === '' || normalized === '.') {
        return NaN;
    }
    return Number(normalized);
}

function formatOutput(value) {                                                                                          // Limit decimals on output
    return value.toLocaleString('en-US', {
        maximumFractionDigits: 4,
    });
}

function formatInput(value) {                                                                                           // Limit decimals on input
    return value.toLocaleString('en-US', {
        maximumFractionDigits: 4,
        useGrouping: false,
    });
}

function updateConversion() {                                                                                     // Input-output line switching
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const rate = rates[to] / rates[from];

    rateLine.textContent = `1 ${from} = ${formatOutput(rate)} ${to}`;

    const amountValue = parseAmount(fromAmount.value);
    if (!Number.isFinite(amountValue)) {
        toAmount.value = '';
        lastConvertedValue = null;
        return;
    }

    const converted = amountValue * rate;
    lastConvertedValue = converted;
    toAmount.value = formatOutput(converted);
}

function setFromAmount(value) {                                                                                   // Sets conversion ammount
    const normalized = normalizeInput(value);
    fromAmount.value = normalized === '' ? '0' : normalized;
    updateConversion();
}

function appendDigit(digit) {                                                                                     // Pushes a digit to the buffer
    let current = fromAmount.value;
    if (current === '0' && digit !== '.') {
        current = '';
    }

    if (digit === '.' && current.includes('.')) {
        return;
    }

    setFromAmount(current + digit);
}

function backspaceInput() {                                                                                       // Enables the use of backspace
    const current = fromAmount.value;
    if (current.length <= 1) {
        setFromAmount('0');
        return;
    }
    setFromAmount(current.slice(0, -1));
}

function clearEntry() {                                                                                           // Clears the buffer
    setFromAmount('0');
}

function clearAll() {                                                                                             // Resets the buffer
    fromCurrency.value = defaults.fromCurrency;
    toCurrency.value = defaults.toCurrency;
    setFromAmount(defaults.amount);
}

function swapCurrencies() {                                                                                       // Swaps the two conversion buffers
    const currentFrom = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = currentFrom;

    if (lastConvertedValue !== null) {
        fromAmount.value = formatInput(lastConvertedValue);
    }

    updateConversion();
}

fromAmount.addEventListener('input', () => {                                                         // Input listeners and processing
    const normalized = normalizeInput(fromAmount.value);
    if (normalized !== fromAmount.value) {
        fromAmount.value = normalized;
    }
    updateConversion();
});

fromCurrency.addEventListener('change', updateConversion);
toCurrency.addEventListener('change', updateConversion);
swapButton.addEventListener('click', swapCurrencies);

document.getElementById('btn-ce').addEventListener('click', clearEntry);
document.getElementById('btn-c').addEventListener('click', clearAll);
document.getElementById('btn-back').addEventListener('click', backspaceInput);
document.getElementById('btn-dot').addEventListener('click', () => appendDigit('.'));

const numberButtons = ['btn-0','btn-1','btn-2','btn-3','btn-4','btn-5','btn-6','btn-7','btn-8','btn-9'];
numberButtons.forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
        appendDigit(document.getElementById(id).textContent.trim());
    });
});

document.getElementById('btn-eq').addEventListener('click', updateConversion);                            // ----------------------------------------------

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
    'Enter': 'btn-eq',
    'Backspace': 'btn-back',
    'Delete': 'btn-ce',
    'Escape': 'btn-c',
    'c': 'btn-c',
    'C': 'btn-c',
};

document.addEventListener('keydown', (event) => {
    if (document.activeElement === fromAmount) return;
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

clearAll();
