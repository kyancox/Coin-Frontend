import { postCoinbaseKeys, postGeminiKeys, uploadLedgerCSV, fetchCoinbaseData, fetchGeminiData, fetchLedgerData } from './api.js';
//import { updateCoinbaseUI, updateGeminiUI, updateLedgerUI } from './ui.js';

// Global state object
var accountState = {
  coinbase: false,
  gemini: false,
  ledger: false
};

document.getElementById('submit-coinbase').addEventListener('click', async function(event) {
    event.preventDefault();

    document.getElementById('check').style.display = "none";
    document.getElementById("loading-gif").style.display = "block";

    var apiKey = document.getElementById('coinbaseApiKey').value;
    var apiSecret = document.getElementById('coinbaseApiSecret').value;

    // Check if either input is empty
    if (!apiKey || !apiSecret) {
      console.log('API Key or API Secret not entered.')
      alert('Please enter both the API Key and the API Secret.');
      return; 
    }
  
    try {
        const data = await postCoinbaseKeys(apiKey, apiSecret);
        console.log('Success:', data);
        document.getElementById("loading-gif").style.display = "none";
        document.getElementById('check').style.display = "block";
        //updateCoinbaseUI(data);
        updateLoadedAccounts('coinbase', true);
    } catch (error) {
        document.getElementById("loading-gif").style.display = "none";
        document.getElementById('check').style.display = "none";
        updateLoadedAccounts('coinbase', false);
        alert(`Failed to update API keys: \n\n${error.message}`);
    }
});

document.getElementById('submit-gemini').addEventListener('click',  async function(event) {
  event.preventDefault();

  document.getElementById('check').style.display = "none";
  document.getElementById("loading-gif").style.display = "block";

  var apiKey = document.getElementById('geminiApiKey').value;
  var apiSecret = document.getElementById('geminiApiSecret').value;

  // Check if either input is empty
  if (!apiKey || !apiSecret) {
    alert('Please enter both the API Key and the API Secret.');
    return; 
  }
    
  try {
      const data = await postGeminiKeys(apiKey, apiSecret);
      console.log('Success:', data);
      document.getElementById("loading-gif").style.display = "none";
      document.getElementById('check').style.display = "block";
      //updateCoinbaseUI(data);
      updateLoadedAccounts('gemini', true);
  } catch (error) {
      document.getElementById("loading-gif").style.display = "none";
      document.getElementById('check').style.display = "none";
      updateLoadedAccounts('gemini', false);
      alert(`Failed to update API keys: \n\n${error.message}`);
  }
});

document.getElementById('submit-ledger').addEventListener('click', async function(event) {
    event.preventDefault();
    var fileInput = document.getElementById('file'); // Reference to the file input

    document.getElementById('check').style.display = "none";
    document.getElementById("loading-gif").style.display = "block";


    if (fileInput.files.length > 0) {
        try {
            const data = await uploadLedgerCSV(fileInput);
            console.log('File uploaded successfully:', data);
            document.getElementById("loading-gif").style.display = "none";
            document.getElementById('check').style.display = "block";
            updateLoadedAccounts('ledger', true);
        } catch (error) {
            console.error('Error during file upload:', error);
            document.getElementById("loading-gif").style.display = "none";
            document.getElementById('check').style.display = "none";
            updateLoadedAccounts('ledger', false);
            alert(`Failed to upload file: \n\n${error.message}`);
        }
    } else {
        console.error('No file selected.');
        document.getElementById("loading-gif").style.display = "none";
        updateLoadedAccounts('ledger', false);
        alert('No file selected. Please select a file to upload.');
    }
});

function updateLoadedAccounts(name, status) {
  accountState[name] = status;  // Correctly update the state using bracket notation

  var loadedAccounts = Object.keys(accountState).filter(function(account) {
      return accountState[account]; // Filter only loaded accounts
  });

  var str = loadedAccounts.map(function(account) {
      return account.charAt(0).toUpperCase() + account.slice(1); // Capitalize account names
  }).join(', ');

  const loaded = document.getElementById("loaded");
  
  if (loaded.style.display === "none") {
    loaded.style.display = "block";
  }

  loaded.textContent = `Loaded: ${str}`; // Update text content
}
