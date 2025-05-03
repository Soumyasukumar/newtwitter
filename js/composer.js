function setupAutocomplete(inputId, suggestionId) {
  const input = document.getElementById(inputId);
  const suggestionBox = document.createElement("div");
  suggestionBox.id = suggestionId;
  suggestionBox.className = "absolute bg-gray-800 border border-gray-700 rounded-lg mt-1 w-full max-h-40 overflow-y-auto hidden";
  input.parentNode.style.position = "relative";
  input.parentNode.appendChild(suggestionBox);

  let selectedIndex = -1;

  input.addEventListener("input", function () {
    const value = input.value;
    const cursorPosition = input.selectionStart;
    const textBeforeCursor = value.substring(0, cursorPosition);
    const lastWord = textBeforeCursor.split(/\s+/).pop();

    if (lastWord.startsWith("@")) {
      const query = lastWord.substring(1).toLowerCase();
      const suggestions = users
        .filter(user => user.handle.toLowerCase().includes(query))
        .map(user => user.handle);

      if (suggestions.length > 0) {
        suggestionBox.innerHTML = suggestions
          .map((suggestion, index) => `
            <div class="p-2 text-white hover:bg-gray-700 cursor-pointer suggestion-item ${index === selectedIndex ? 'bg-gray-700' : ''}" data-index="${index}">
              ${suggestion}
            </div>
          `)
          .join("");
        suggestionBox.classList.remove("hidden");
      } else {
        suggestionBox.classList.add("hidden");
      }
    } else {
      suggestionBox.classList.add("hidden");
    }

    selectedIndex = -1;
  });

  input.addEventListener("keydown", function (e) {
    const suggestionItems = suggestionBox.querySelectorAll(".suggestion-item");
    if (suggestionItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % suggestionItems.length;
      updateSuggestionHighlight(suggestionItems, selectedIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + suggestionItems.length) % suggestionItems.length;
      updateSuggestionHighlight(suggestionItems, selectedIndex);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      selectSuggestion(input, suggestionItems[selectedIndex].textContent);
      suggestionBox.classList.add("hidden");
      selectedIndex = -1;
    } else if (e.key === "Escape") {
      suggestionBox.classList.add("hidden");
      selectedIndex = -1;
    }
  });

  suggestionBox.addEventListener("click", function (e) {
    const target = e.target.closest(".suggestion-item");
    if (target) {
      selectSuggestion(input, target.textContent);
      suggestionBox.classList.add("hidden");
      selectedIndex = -1;
    }
  });

  document.addEventListener("click", function (e) {
    if (!input.contains(e.target) && !suggestionBox.contains(e.target)) {
      suggestionBox.classList.add("hidden");
      selectedIndex = -1;
    }
  });
}

function updateSuggestionHighlight(suggestionItems, selectedIndex) {
  suggestionItems.forEach((item, index) => {
    item.classList.toggle("bg-gray-700", index === selectedIndex);
  });
}

function selectSuggestion(input, suggestion) {
  const cursorPosition = input.selectionStart;
  const textBeforeCursor = input.value.substring(0, cursorPosition);
  const textAfterCursor = input.value.substring(cursorPosition);
  const wordsBefore = textBeforeCursor.split(/\s+/);
  wordsBefore.pop();
  const newTextBefore = wordsBefore.length > 0 ? wordsBefore.join(" ") + " " : "";
  input.value = newTextBefore + suggestion + " " + textAfterCursor;
  const newCursorPosition = newTextBefore.length + suggestion.length + 1;
  input.setSelectionRange(newCursorPosition, newCursorPosition);
  input.dispatchEvent(new Event("input"));
}

function openTweetModal() {
  document.getElementById("tweet-modal").classList.remove("hidden");
  const input = document.getElementById("tweet-input");
  input.focus();
  setupAutocomplete("tweet-input", "suggestion-box-mobile");
}

function closeTweetModal() {
  document.getElementById("tweet-modal").classList.add("hidden");
  document.getElementById("tweet-input").value = "";
  updateCharCount();
}

function updateCharCount() {
  const input = document.getElementById("tweet-input");
  const value = input.value;
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(www\.[^\s]+)/g;
  let count = value.length;
  (value.match(linkRegex) || []).forEach(match => {
    count -= match.length - 23;
  });
  const charCount = document.getElementById("char-count");
  charCount.textContent = `${count}/280`;
  const submitBtn = document.getElementById("tweet-submit");
  submitBtn.disabled = !value.trim() || count > 280;
  const preview = document.getElementById("link-preview");
  const urls = value.match(/(https?:\/\/[^\s)]+)|(www\.[^\s]+)/g) || [];
  preview.textContent = urls.length ? `Links: ${urls.map(url => url.startsWith("www.") ? url : new URL(url).hostname).join(", ")}` : "";
  preview.classList.toggle("hidden", !urls.length);
}

function submitTweet() {
  const input = document.getElementById("tweet-input").value;
  if (input.trim()) {
    tweets.unshift({
      id: tweets.length + 1,
      username: "Soumya Sukuma...",
      handle: "@soukumya_sukuma",
      content: input,
      timestamp: "Just now",
      group: "Friends",
      threadId: null,
      isThread: false,
      event: selectedEvent,
    });
    filterTweets();
    closeTweetModal();
  }
}

function updateCharCountDesktop() {
  const input = document.getElementById("tweet-input-desktop");
  const value = input.value;
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(www\.[^\s]+)/g;
  let count = value.length;
  (value.match(linkRegex) || []).forEach(match => {
    count -= match.length - 23;
  });
  const charCount = document.getElementById("char-count-desktop");
  charCount.textContent = `${count}/280`;
  const submitBtn = document.getElementById("tweet-submit-desktop");
  submitBtn.disabled = !value.trim() || count > 280;
  const preview = document.getElementById("link-preview-desktop");
  const urls = value.match(/(https?:\/\/[^\s)]+)|(www\.[^\s]+)/g) || [];
  preview.textContent = urls.length ? `Links: ${urls.map(url => url.startsWith("www.") ? url : new URL(url).hostname).join(", ")}` : "";
  preview.classList.toggle("hidden", !urls.length);
}

function submitTweetDesktop() {
  const input = document.getElementById("tweet-input-desktop").value;
  if (input.trim()) {
    tweets.unshift({
      id: tweets.length + 1,
      username: "Soumya Sukuma...",
      handle: "@soukumya_sukuma",
      content: input,
      timestamp: "Just now",
      group: "Friends",
      threadId: null,
      isThread: false,
      event: selectedEvent,
    });
    document.getElementById("tweet-input-desktop").value = "";
    updateCharCountDesktop();
    filterTweets();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupAutocomplete("tweet-input-desktop", "suggestion-box-desktop");
});