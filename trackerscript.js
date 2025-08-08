const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
// Local Storage Setup
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorageTransactions !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = '';
    amount.value = '';
  }
}

// Generate ID
function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text} <span>${sign}&#8377;${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
  list.appendChild(item);
}

// Update values
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expense = (
    amounts
      .filter(item => item < 0)
      .reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balance.innerHTML = `&#8377;${total}`;
  money_plus.innerHTML = `+&#8377;${income}`;
  money_minus.innerHTML = `-&#8377;${expense}`;
}

form.addEventListener('submit', addTransaction);


// ========================
// Dark / Light Mode Toggle
// ========================



// Load saved theme from localStorage
// Theme Toggle (Dark/Light Mode)
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark");
    themeToggle.checked = true;
    themeIcon.textContent = "🌙";
  } else {
    document.documentElement.classList.remove("dark");
    themeIcon.textContent = "🌞";
  }

  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      themeIcon.textContent = "🌙";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      themeIcon.textContent = "🌞";
    }
  });
});
