let display = document.getElementById('display');
let historyList = document.getElementById('historyList');
let currentInput = '';

function appendNumber(num) {
  currentInput += num;
  updateDisplay();
}
function appendOperator(op) {
  if (currentInput === '') return;
  const lastChar = currentInput.slice(-1);
  if ('+-*/'.includes(lastChar)) {
    currentInput = currentInput.slice(0, -1);
  }
  currentInput += op;
  updateDisplay();
}
function appendFunction(func) {
  currentInput += func;
  updateDisplay();
}
function clearDisplay() {
  currentInput = '';
  updateDisplay();
}
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}
function updateDisplay() {
  display.textContent = currentInput || '0';
}
function calculateResult() {
  try {
    let result = eval(currentInput);
    display.textContent = result;
    historyList.innerHTML += `<li>${currentInput} = ${result}</li>`;
    currentInput = result.toString();
  } catch {
    display.textContent = 'Error';
    currentInput = '';
  }
}
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}
function startVoiceInput() {
  if (!('webkitSpeechRecognition' in window)) {
    alert('Voice recognition not supported');
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    currentInput += transcript.replace(/plus/g, '+').replace(/minus/g, '-').replace(/times/g, '*').replace(/divided by/g, '/');
    updateDisplay();
  };
  recognition.start();
}
