function showDiv(id) {
  // Hide all divs
  document.getElementById("connect-coinbase").style.display = "none";
  document.getElementById("connect-gemini").style.display = "none";
  document.getElementById("connect-ledger").style.display = "none";
  document.getElementById("submit-coinbase").style.display = "none";
  document.getElementById("submit-gemini").style.display = "none";
  document.getElementById("submit-ledger").style.display = "none";
  document.getElementsByClassName("tutorials")[0].style.display = "none";
  

  accountName = id.charAt(0).toUpperCase() + id.slice(1);

  // Show the selected div
  document.getElementById("connect-" + id).style.display = "block";
  // Update instructions text
  document.getElementById("instructions").textContent =
    "To view your balances, please provide API keys from Coinbase & Gemini, as well as a CSV file from your Ledger Live application.";
  // Update tutorial text
  document.getElementById("tutorial-text").textContent =
    "Tutorial for " + accountName + ":";
  // Update information text
  document.getElementById("info-header").style.display = "block";
  document.getElementById("info-header").textContent = "Enter " + accountName + " information below:";
  // Show tutorial block 
  document.getElementsByClassName("tutorials")[0].style.display = "block";
  // Show submit button 
  document.getElementById("submit-"+id).style.display = "block";
}
