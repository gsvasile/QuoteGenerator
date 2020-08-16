const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newElonMuskQuoteButton = document.getElementById("new-elonMusk-quote");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

const adjustForLongQuote = (text) => {
  // Reduce font size for long quotes.
  if (text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
};

// Get Quote From API
const getQuote = async (apiUrl) => {
  showLoadingSpinner();
  const proxyUrl = "https://peaceful-inlet-82493.herokuapp.com/";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If Author is blank, add 'Unknown'
    if (data.quoteAuthor === "") {
      authorText.innerHTML = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    adjustForLongQuote(data.quoteText);
    quoteText.innerText = data.quoteText;
    hideLoadingSpinner();
  } catch (error) {
    console.log(error);
    authorText.innerText = "Error: Please Try Again!";
    quoteText.innerText = "";
    hideLoadingSpinner();
  }
};

const getNewQuote = () => {
  getQuote(
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
  );
};

const getElonMuskQuote = () => {
  quoteText.innerText = generateElonMuskQuote();
  adjustForLongQuote(quoteText.innerText);
  authorText.innerText = "Elon Musk";
};

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listener
newQuoteButton.addEventListener("click", getNewQuote);
newElonMuskQuoteButton.addEventListener("click", getElonMuskQuote);
twitterButton.addEventListener("click", tweetQuote);

// On Load
getNewQuote();
