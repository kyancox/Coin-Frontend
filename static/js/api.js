async function postCoinbaseKeys(apiKey, apiSecret) {
    try {
        const response = await fetch('https://coinconnectapi.onrender.com/api/coinbase/keys', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('https://coinconnectapi.onrender.com/api/gemini/keys', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('https://coinconnectapi.onrender.com/api/ledger/upload-csv', {
            method: 'POST',
            credentials: 'include',
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
    const response = await fetch('https://coinconnectapi.onrender.com/api/coinbase/json', {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok when fetching Coinbase portfolio data.\nError ${response.status}: ${errorData.message}`);
    }
    return await response.json();
}

async function fetchGeminiData() {
    const response = await fetch('https://coinconnectapi.onrender.com/api/gemini/json', {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok when fetching Gemini portfolio data.\nError ${response.status}: ${errorData.message}`);
    }
    return await response.json();
}

async function fetchLedgerData() {
    const response = await fetch('https://coinconnectapi.onrender.com/api/ledger/json', {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok when fetching Ledger portfolio data.\nError ${response.status}: ${errorData.message}`);
    }
    return await response.json();
}

async function fetchMasterData() {
    const response = await fetch('https://coinconnectapi.onrender.com/api/master/json', {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok when fetching master portfolio data.\nError ${response.status}: ${errorData.message}`);
    }
    return await response.json();
}

async function fetchMasterTotalBalance() {
    const response = await fetch('https://coinconnectapi.onrender.com/api/master/total-balance', {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok when fetching Master total balance.\nError ${response.status}: ${errorData.message}`);
    }
    return await response.json();
}

// Add these functions to your api.js module

async function fetchCoinbaseTotalBalance() {
    const response = await fetch('https://coinconnectapi.onrender.com/api/coinbase/total-balance', {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok when fetching Coinbase total balance.\nError ${response.status}: ${errorData.message}`);
    }
    return await response.json();
}

async function fetchGeminiTotalBalance() {
    const response = await fetch('https://coinconnectapi.onrender.com/api/gemini/total-balance', {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok when fetching Gemini total balance.\nError ${response.status}: ${errorData.message}`);
    }
    return await response.json();
}

async function fetchLedgerTotalBalance() {
    const response = await fetch('https://coinconnectapi.onrender.com/api/ledger/total-balance', {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok when fetching Ledger total balance.\nError ${response.status}: ${errorData.message}`);
    }
    return await response.json();
}

async function downloadMasterXLSX() {
    try {
        const response = await fetch('https://coinconnectapi.onrender.com/api/master/download-xlsx', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok when downloading Master XLSX: ${response.statusText}`);
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'master_portfolio.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);
        alert('Download started successfully.');
    } catch (error) {
        console.error('Error downloading file:', error);
        alert(`Failed to start download:\n\n${error.message}`);
    }
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
