import {
  fetchCoinbaseData,
  fetchCoinbaseTotalBalance,
  fetchGeminiData,
  fetchGeminiTotalBalance,
  fetchLedgerData,
  fetchLedgerTotalBalance,
  fetchMasterData,
  fetchMasterTotalBalance,
  downloadMasterXLSX,
} from "./api.js";

// Function to populate the assets table on the assets.html page
async function populateAssetsTable(portfolioType) {
    try {
        console.log('Populating assets.')
        let data;
        let balance;
        switch(portfolioType) {
            case 'coinbase':
                data = await fetchCoinbaseData();
                balance = await fetchCoinbaseTotalBalance();
                break;
            case 'gemini':
                data = await fetchGeminiData();
                balance = await fetchGeminiTotalBalance();
                break;
            case 'ledger':
                data = await fetchLedgerData();
                balance = await fetchLedgerTotalBalance();
                break;
            case 'master':
            default:
                data = await fetchMasterData();
                balance = await fetchMasterTotalBalance();
        }

        console.log(data);
        const tableHead = document.getElementById('assets-table').querySelector('thead tr');
        const tableBody = document.getElementById('assets-table').querySelector('tbody');
        const header = document.getElementById('assets-header');
        let portfolioName = portfolioType.charAt(0).toUpperCase() + portfolioType.slice(1);

        balance = `$${formatBalance(balance.balance)} USD`
        header.textContent = `${portfolioName} Portfolio (Total Balance: ${balance})`;

        // Update table headers based on the portfolio type
        tableHead.innerHTML = `
        <th>Symbol</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Balance</th>
        <th>Real-Time Price</th>
        `;

        if (portfolioType === 'master') {
            tableHead.innerHTML += `<th>Exchanges with Asset</th>`;
        }
  
        tableBody.innerHTML = ''; // Clear existing table rows

        Object.entries(data).forEach(([symbol, details]) => {
            const [name, amount, balance, realTimePrice, exchanges] = details;
            let rowHTML = `
                <td>${symbol}</td>
                <td>${name}</td>
                <td>${amount}</td>
                <td>$${balance}</td>
                <td>$${realTimePrice}</td>
            `;

            // Include 'Exchanges with Asset' only for 'master' portfolio
            if (portfolioType === 'master' && exchanges) {
                rowHTML += `<td>${exchanges.join(', ')}</td>`;
            }

            const row = document.createElement('tr');
            row.innerHTML = rowHTML;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching and populating assets:', error);
        alert(`Failed to load assets into table:\n\n${error.message}`);
    }
}

function formatBalance(balanceString) {
    const pattern = /[\d,]+.\d+/; // Regular expression to find the number in the string
    const matches = balanceString.match(pattern);
    if (matches && matches[0]) {
      const number = parseFloat(matches[0].replace(/,/g, '')); // Remove commas for thousands
      return number.toFixed(2); // Convert to string with 2 decimal places
    } else {
      console.error('Invalid balance format');
      return '0.00'; // Return a default or error value
    }
  }

// This function sets up the event listener for the download button
function setupDownloadButton() {
    const downloadBtn = document.getElementById('download-xlsx-button');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async () => {
            try {
                await downloadMasterXLSX();
                alert('Download started successfully.');
            } catch (error) {
                console.error('Error downloading file:', error);
                alert(`Failed to start download:\n\n${error.message}`);
            }
        });
    } else {
        console.error('Download button not found.');
    }
}

// Event listener for the portfolio dropdown
document.addEventListener('DOMContentLoaded', () => {
    populateAssetsTable('master'); // Default to Master portfolio
    setupDownloadButton();

    const portfolioSelect = document.getElementById('portfolio-select');
    portfolioSelect.addEventListener('change', () => {
        populateAssetsTable(portfolioSelect.value);
    });
});
