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
async function populateAssetsTable() {
    try {
        console.log('Populating assets.')
        const masterData = await fetchMasterData();
        console.log(masterData);

        // Assuming masterData is an object where each key is a cryptocurrency symbol
        const tableBody = document.getElementById('assets-table').querySelector('tbody');
        tableBody.innerHTML = ''; // Clear existing table rows

        Object.entries(masterData).forEach(([symbol, details]) => {
            const [name, amount, balance, realTimePrice, exchanges] = details;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${symbol}</td>
                <td>${name}</td>
                <td>${amount}</td>
                <td>$${balance}</td>
                <td>$${realTimePrice}</td>
                <td>${exchanges.join(', ')}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching and populating assets:', error);
        alert(`Failed to load assets into table:\n\n${error.message}`);
    }
}

// Call this function when the assets.html page is loaded
document.addEventListener('DOMContentLoaded', populateAssetsTable);