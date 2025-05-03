function parseLinks(content) {
  const markdownRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  content = content.replace(
    markdownRegex,
    '<a href="$2" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  const urlRegex = /(?:^|\s)(www\.[^\s]+)(?:\s|$)/g;
  return content.replace(
    urlRegex,
    ' <a href="https://$1" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">$1</a> '
  );
}

function renderTweets() {
  const feed = document.getElementById("tweet-feed");
  const groupedTweets = currentTweets.reduce((acc, tweet) => {
    const key = tweet.threadId || tweet.id;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(tweet);
    return acc;
  }, {});

  const sortedGroups = Object.values(groupedTweets).sort((a, b) => {
    const timeA = new Date(a[0].timestamp === "Just now" ? Date.now() : a[0].timestamp);
    const timeB = new Date(b[0].timestamp === "Just now" ? Date.now() : b[0].timestamp);
    return timeB - timeA;
  });

  feed.innerHTML = sortedGroups.length === 0
    ? '<p class="p-4 text-gray-500 font-inter">No posts found.</p>'
    : sortedGroups.map(group => {
        const isThread = group[0].isThread;
        return `
          <div class="relative p-4 border-b border-gray-800 flex animate-fade-in">
            ${isThread ? `
              <button class="ai-summarizer-btn" onclick="showThreadSummary(this, ${group[0].threadId})">
                <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14H6v-2h4v2zm6-4H6v-2h10v2zm0-4H6V7h10v2z"/>
                </svg>
              </button>
            ` : ''}
            <div class="w-12 h-12 bg-gray-600 rounded-full mr-3"></div>
            <div class="flex-1">
              ${group.map(tweet => `
                <div class="${group.length > 1 ? 'mb-2' : ''}">
                  <div class="flex items-center">
                    <span class="font-bold font-inter text-white">${tweet.username}</span>
                    <span class="text-gray-500 ml-1 font-inter">${tweet.handle}</span>
                    <span class="text-gray-500 ml-1 font-inter">· ${tweet.timestamp}</span>
                  </div>
                  <p class="text-white font-inter">${parseLinks(tweet.content)}</p>
                  ${tweet.image ? `<img src="${tweet.image}" alt="Tweet image" class="mt-2 rounded-lg w-full max-w-md" />` : ""}
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join("");
}

function showThreadSummary(button, threadId) {
  // Use the openSummarizerModal function to display the summary in a modal
  openSummarizerModal(button, threadId);
}