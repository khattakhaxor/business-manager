// Function to calculate revenue, profit, commission, and target
function calculateData() {
    const investment = parseFloat(document.getElementById('investment').value);
    const revenue = parseFloat(document.getElementById('revenue').value);
    const commissionRate = parseFloat(document.getElementById('commissionRate').value);

    if (isNaN(investment) || isNaN(revenue) || isNaN(commissionRate)) {
        alert('Please enter valid numbers');
        return;
    }

    const commission = (commissionRate / 100) * revenue;
    const profit = revenue - investment - commission;
    const target = revenue * 1.1; // Estimated target for next month, assuming 10% growth

    document.getElementById('profit').innerText = `Profit: PKR ${profit.toFixed(2)}`;
    document.getElementById('commission').innerText = `Commission: PKR ${commission.toFixed(2)}`;
    document.getElementById('target').innerText = `Estimated Target for Next Month: PKR ${target.toFixed(2)}`;

    // Draw the chart
    drawChart(profit, commission, target);
}

// Function to draw the chart
function drawChart(profit, commission, target) {
    const ctx = document.getElementById('profitChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Profit', 'Commission', 'Target'],
            datasets: [{
                label: 'PKR',
                data: [profit, commission, target],
                backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'],
                borderColor: ['#388E3C', '#F57C00', '#1976D2'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Save and Load Data (for local storage, later replace with online DB like Firebase)
function saveData() {
    const investment = document.getElementById('investment').value;
    const revenue = document.getElementById('revenue').value;
    const commissionRate = document.getElementById('commissionRate').value;

    if (investment && revenue && commissionRate) {
        const data = { investment, revenue, commissionRate };
        localStorage.setItem('businessData', JSON.stringify(data));
        alert('Data saved successfully!');
    } else {
        alert('Please enter valid data to save.');
    }
}

function loadData() {
    const savedData = localStorage.getItem('businessData');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('investment').value = data.investment;
        document.getElementById('revenue').value = data.revenue;
        document.getElementById('commissionRate').value = data.commissionRate;
        alert('Data loaded successfully!');
    } else {
        alert('No data found!');
    }
}
