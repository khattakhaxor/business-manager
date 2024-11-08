// Elements
const resultDiv = document.getElementById('result');
const dataTableBody = document.getElementById('dataTable').querySelector('tbody');
const graphCanvas = document.getElementById('graphCanvas');
const showGraphBtn = document.getElementById('showGraph');

// Event listener for Save Data
document.getElementById('saveData').addEventListener('click', saveData);

// Event listener for Show Graph
showGraphBtn.addEventListener('click', showGraph);

// Event listener for Calculate Profit
document.getElementById('investmentForm').addEventListener('submit', calculateProfit);

let savedData = JSON.parse(localStorage.getItem('businessData')) || [];

// Calculate profit and display
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

  resultDiv.innerHTML = `
    <h3>Result for ${product}</h3>
    <p><strong>Total Investment:</strong> PKR ${totalInvestment.toFixed(2)}</p>
    <p><strong>Revenue:</strong> PKR ${revenue.toFixed(2)}</p>
    <p><strong>Net Profit after ${commissionRate}% commission:</strong> PKR ${netProfit.toFixed(2)}</p>
  `;
  resultDiv.classList.add('visible');
}

// Save data
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
  displayData();
}

// Display saved data
function displayData() {
  dataTableBody.innerHTML = '';
  savedData.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.product}</td>
      <td>PKR ${entry.totalInvestment.toFixed(2)}</td>
      <td>PKR ${entry.revenue.toFixed(2)}</td>
      <td>PKR ${entry.netProfit.toFixed(2)}</td>
      <td>
        <button onclick="editEntry(${index})">Edit</button>
        <button onclick="deleteEntry(${index})">Delete</button>
      </td>
    `;
    dataTableBody.appendChild(row);
  });
}

// Edit an entry
function editEntry(index) {
  const entry = savedData[index];
  document.getElementById('product').value = entry.product;
  document.getElementById('purchasePrice').value = entry.totalInvestment;
  document.getElementById('sellingPrice').value = entry.revenue;
  document.getElementById('quantity').value = entry.quantity;
  document.getElementById('commission').value = entry.commission;
  deleteEntry(index);
}

// Delete an entry
function deleteEntry(index) {
  savedData.splice(index, 1);
  localStorage.setItem('businessData', JSON.stringify(savedData));
  displayData();
}

// Show Graph
function showGraph() {
  if (!savedData.length) return alert("No data available for graph");

  graphCanvas.style.display = 'block';
  const labels = savedData.map(entry => entry.product);
  const data = savedData.map(entry => entry.netProfit);

  new Chart(graphCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Net Profit Comparison',
        data: data,
        backgroundColor: 'rgba(40, 167, 69, 0.6)',
        borderColor: 'rgba(40, 167, 69, 1)',
        borderWidth: 1,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              return `${tooltipItem.label}: PKR ${tooltipItem.raw.toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Initialize data on page load
displayData();
