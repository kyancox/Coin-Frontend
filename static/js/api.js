async function postCoinbaseKeys(apiKey, apiSecret) {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/coinbase/keys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: apiKey,
                api_secret: apiSecret
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            // Here, response.status will contain the HTTP status code
            throw new Error(`Error ${response.status}: ${errorData.message}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error so the caller can handle it
    }
}


async function postGeminiKeys(apiKey, apiSecret) {

    try {
        const response = await fetch('http://127.0.0.1:5000/api/gemini/keys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: apiKey,
                api_secret: apiSecret
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            // Here, response.status will contain the HTTP status code
            throw new Error(`Error ${response.status}: ${errorData.message}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error so the caller can handle it
    }
}

async function uploadLedgerCSV(fileInput) {
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('http://127.0.0.1:5000/api/ledger/upload-csv', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message || 'Failed to upload file'}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error during file upload:', error);
        throw error; // Rethrow the error so the caller can handle it
    }
}


async function fetchCoinbaseData() {
    const response = await fetch('http://127.0.0.1:5000/api/coinbase/json', {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Network response was not ok when fetching Coinbase data');
    }
    return await response.json();
}

async function fetchGeminiData() {
    const response = await fetch('http://127.0.0.1:5000/api/gemini/json', {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Network response was not ok when fetching Gemini data');
    }
    return await response.json();
}

async function fetchLedgerData() {
    const response = await fetch('http://127.0.0.1:5000/api/ledger/json', {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Network response was not ok when fetching Ledger data');
    }
    return await response.json();
}

async function fetchMasterData() {
    const response = await fetch('http://127.0.0.1:5000/api/master/json', {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Network response was not ok when fetching master portfolio data');
    }
    return await response.json();
}

async function fetchMasterTotalBalance() {
    const response = await fetch('http://127.0.0.1:5000/api/master/total-balance', {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Network response was not ok when fetching master total balance');
    }
    return await response.json();
}

// Add these functions to your api.js module

async function fetchCoinbaseTotalBalance() {
    const response = await fetch('/api/coinbase/total-balance', {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok when fetching Coinbase total balance');
    }
    return await response.json();
}

async function fetchGeminiTotalBalance() {
    const response = await fetch('/api/gemini/total-balance', {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok when fetching Gemini total balance');
    }
    return await response.json();
}

async function fetchLedgerTotalBalance() {
    const response = await fetch('/api/ledger/total-balance', {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok when fetching Ledger total balance');
    }
    return await response.json();
}

async function downloadMasterXLSX() {
    const response = await fetch('/api/master/download-xlsx', {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok when downloading Master XLSX');
    }
    // Assuming you want to trigger a download in the browser:
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'master_portfolio.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(downloadUrl);
}

export {
    postCoinbaseKeys, 
    postGeminiKeys, 
    uploadLedgerCSV, 
    fetchCoinbaseData, 
    fetchGeminiData, 
    fetchLedgerData,
    fetchMasterData,
    fetchMasterTotalBalance,
    fetchCoinbaseTotalBalance, 
    fetchGeminiTotalBalance, 
    fetchLedgerTotalBalance,
    downloadMasterXLSX
};
