function toggleLiveEvent() {
  const select = document.getElementById("event-select");
  selectedEvent = select.value === "none" ? null : select.value;
  document.getElementById("event-refresh").classList.toggle("hidden", !selectedEvent);
  if (selectedEvent) {
    if (!liveInterval) {
      liveInterval = setInterval(refreshEventFeed, 5000);
    }
  } else {
    clearInterval(liveInterval);
    liveInterval = null;
  }
  filterTweets();
}

function refreshEventFeed() {
  if (selectedEvent) {
    const eventTweets = tweets.filter(t => t.event === selectedEvent);
    if (eventTweets.length) {
      const newTweet = { ...eventTweets[Math.floor(Math.random() * eventTweets.length)] };
      newTweet.id = tweets.length + 1;
      newTweet.timestamp = "Just now";
      tweets.unshift(newTweet);
      filterTweets();
    }
  }
}

function filterByGroup() {
  selectedGroup = document.getElementById("group-select").value;
  filterTweets();
}

function filterTweets() {
  currentTweets = tweets.filter(tweet => {
    const matchesGroup = selectedGroup === "All" || tweet.group === selectedGroup;
    const matchesEvent = !selectedEvent || tweet.event === selectedEvent;
    const matchesTab = currentTab === "for-you" || (currentTab === "following" && tweet.group === "Friends");
    return matchesGroup && matchesEvent && matchesTab;
  });
  renderTweets();
}