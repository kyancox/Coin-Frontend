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
        switch(portfolioType) {
            case 'coinbase':
                data = await fetchCoinbaseData();
                break;
            case 'gemini':
                data = await fetchGeminiData();
                break;
            case 'ledger':
                data = await fetchLedgerData();
                break;
            case 'master':
            default:
                data = await fetchMasterData();
        }

        console.log(data);
        const tableHead = document.getElementById('assets-table').querySelector('thead tr');
        const tableBody = document.getElementById('assets-table').querySelector('tbody');

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

// Event listener for the portfolio dropdown
document.addEventListener('DOMContentLoaded', () => {
    populateAssetsTable('master'); // Default to Master portfolio

    const portfolioSelect = document.getElementById('portfolio-select');
    portfolioSelect.addEventListener('change', () => {
        populateAssetsTable(portfolioSelect.value);
    });
});
