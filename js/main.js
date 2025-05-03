let currentTweets = [];
let selectedGroup = "All";
let selectedEvent = null;
let liveInterval = null;
let currentTab = "for-you";
let tweets = [];
let threadSummaries = {};

Promise.all([
  fetch("tweets.json").then(response => response.json()),
  fetch("grokKeywords.json").then(response => response.json()),
  fetch("grokInfo.json").then(response => response.json())
])
  .then(([tweetsData, keywordsData, infoData]) => {
    tweets = tweetsData.tweets;
    threadSummaries = tweetsData.threadSummaries;
    grokKeywords = keywordsData.keywords;
    grokInfo = infoData.info;
    currentTweets = [...tweets];
    renderTweets();
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    document.getElementById("tweet-feed").innerHTML = '<p class="p-4 text-gray-500 font-inter">Failed to load posts.</p>';
  });