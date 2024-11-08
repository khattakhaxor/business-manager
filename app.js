// Elements
const resultDiv = document.getElementById('result');
const saveButton = document.getElementById('saveData');
const showGraphBtn = document.getElementById('showGraph');
const dataTableBody = document.getElementById('dataTable').querySelector('tbody');
const graphCanvas = document.getElementById('graphCanvas');

// Event listener for Calculate Profit
document.getElementById('investmentForm').addEventListener('submit', calculateProfit);

// Event listener for Save Data
saveButton.addEventListener('click', saveData);

// Event listener for Show Graph
showGraphBtn.addEventListener('click', showGraph);

let savedData = JSON.parse(localStorage.getItem('businessData')) || [];

function calculateProfit(event) {
  event.preventDefault();
  const product = document.getElementById('product').value;
  const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
  const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
  const quantity = parseInt(document.getElementById('quantity').value, 10);
  const commissionRate = parseFloat(document.getElementById('commission').value);

  const totalInvestment = purchasePrice * quantity;
  const revenue = sellingPrice * quantity;
  const grossProfit = revenue - totalInvestment;
  const netProfit = grossProfit - (grossProfit * (commissionRate / 100));

  // Show result on screen
  document.getElementById('totalInvestment').innerText = totalInvestment.toFixed(2);
  document.getElementById('revenue').innerText = revenue.toFixed(2);
  document.getElementById('netProfit').innerText = netProfit.toFixed(2);

  // Show the result section
  resultDiv.style.display = 'block';

  // Show the Save Data button
  saveButton.style.display = 'inline-block';
}

// Save data to localStorage
function saveData() {
  const product = document.getElementById('product').value;
  const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
  const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
  const quantity = parseInt(document.getElementById('quantity').value, 10);
  const commissionRate = parseFloat(document.getElementById('commission').value);

  const totalInvestment = purchasePrice * quantity;
  const revenue = sellingPrice * quantity;
  const grossProfit = revenue - totalInvestment;
  const netProfit = grossProfit - (grossProfit * (commissionRate / 100));

  const entry = { product, totalInvestment, revenue, netProfit };
  savedData.push(entry);
  localStorage.setItem('businessData', JSON.stringify(savedData));

  // Add row to table
  const row = dataTableBody.insertRow();
  row.innerHTML = `
    <td>${entry.product}</td>
    <td>PKR ${entry.totalInvestment.toFixed(2)}</td>
    <td>PKR ${entry.revenue.toFixed(2)}</td>
    <td>PKR ${entry.netProfit.toFixed(2)}</td>
    <td><button onclick="deleteEntry(this)">Delete</button></td>
  `;

  // Show Graph button
  showGraphBtn.style.display = 'inline-block';
}

// Delete entry from table and localStorage
function deleteEntry(button) {
  const rowIndex = button.parentElement.parentElement.rowIndex - 1;
  savedData.splice(rowIndex, 1);
  localStorage.setItem('businessData', JSON.stringify(savedData));

  button.closest('tr').remove();
}

// Show Graph
function showGraph() {
  const labels = savedData.map(entry => entry.product);
  const data = savedData.map(entry => entry.netProfit);

  new Chart(graphCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Net Profit (PKR)',
        data: data,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Display saved data on page load
window.onload = function () {
  savedData.forEach(entry => {
    const row = dataTableBody.insertRow();
    row.innerHTML = `
      <td>${entry.product}</td>
      <td>PKR ${entry.totalInvestment.toFixed(2)}</td>
      <td>PKR ${entry.revenue.toFixed(2)}</td>
      <td>PKR ${entry.netProfit.toFixed(2)}</td>
      <td><button onclick="deleteEntry(this)">Delete</button></td>
    `;
  });
};
