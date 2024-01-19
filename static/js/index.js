import { postCoinbaseKeys, postGeminiKeys, uploadLedgerCSV, fetchCoinbaseData, fetchGeminiData, fetchLedgerData } from './api.js';
//import { updateCoinbaseUI, updateGeminiUI, updateLedgerUI } from './ui.js';


document.getElementById('submit-coinbase').addEventListener('click', async function(event) {
    event.preventDefault();

    document.getElementById('coinbase-check').style.display = "none";
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
        document.getElementById('coinbase-check').style.display = "block";
        //updateCoinbaseUI(data);
        document.getElementById("loaded").textContent = "Coinbase";
    } catch (error) {
        document.getElementById("loading-gif").style.display = "none";
        document.getElementById('coinbase-check').style.display = "none";
        alert(`Failed to update API keys: \n\n${error.message}`);
    }
});

document.getElementById('submit-gemini').addEventListener('click',  async function(event) {
  event.preventDefault();
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
      //updateCoinbaseUI(data);
      document.getElementById("loaded").textContent = "Gemini";
  } catch (error) {
      console.error('Error:', error);
  }
});

document.getElementById('submit-ledger').addEventListener('click', async function(event) {
    event.preventDefault();
    var fileInput = document.getElementById('file'); // Reference to the file input

    if (fileInput.files.length > 0) {
        try {
            const data = await uploadLedgerCSV(fileInput);
            console.log('File uploaded successfully:', data);
            // Handle success - update UI accordingly
        } catch (error) {
            console.error('Error during file upload:', error);
            // Handle error - update UI accordingly
        }
    } else {
        console.error('No file selected.');
        // Handle no file selected - update UI accordingly
    }
});

