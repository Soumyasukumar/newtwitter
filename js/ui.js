function toggleSidebar() {
  const sidebar = document.getElementById("left-sidebar");
  sidebar.classList.toggle("hidden");
  sidebar.classList.toggle("md:block");
}

function openMoreOptions() {
  document.getElementById("more-options-modal").classList.remove("hidden");
}

function closeMoreOptions() {
  document.getElementById("more-options-modal").classList.add("hidden");
}

function switchTab(tab) {
  currentTab = tab;
  document.getElementById("for-you-tab").classList.toggle("text-white", tab === "for-you");
  document.getElementById("for-you-tab").classList.toggle("text-gray-500", tab !== "for-you");
  document.getElementById("for-you-tab").classList.toggle("border-b-2", tab === "for-you");
  document.getElementById("for-you-tab").classList.toggle("border-blue-500", tab === "for-you");
  document.getElementById("following-tab").classList.toggle("text-white", tab === "following");
  document.getElementById("following-tab").classList.toggle("text-gray-500", tab !== "following");
  document.getElementById("following-tab").classList.toggle("border-b-2", tab === "following");
  document.getElementById("following-tab").classList.toggle("border-blue-500", tab === "following");
  filterTweets();
}

function openGrokModal() {
  document.getElementById("grok-modal").classList.remove("hidden");
  document.getElementById("grok-input").focus();
}

function closeGrokModal() {
  document.getElementById("grok-modal").classList.add("hidden");
  document.getElementById("grok-input").value = "";
  document.getElementById("grok-chat").innerHTML = `<p>Welcome! I'm Grok, created by xAI. Ask me about features, premium, events, groups, or anything else!</p>`;
}

function toggleGrokModal() {
  const modal = document.getElementById("grok-modal");
  if (modal.classList.contains("hidden")) {
    openGrokModal();
  } else {
    closeGrokModal();
  }
}
function openSummarizerModal(button, tweetId) {
  const modal = document.getElementById("summarizer-modal");
  const modalContent = document.getElementById("summarizer-modal-content");
  const contentDiv = document.getElementById("summarizer-content");

  // Show the modal
  modal.classList.remove("hidden");

  // Position the modal near the button
  const rect = button.getBoundingClientRect();
  modalContent.style.position = "fixed";
  modalContent.style.top = `${rect.top - 10}px`;
  modalContent.style.left = `${rect.left - modalContent.offsetWidth - 10}px`;

  // Load summary content
  const summary = threadSummaries[tweetId] || "No summary available for this thread.";
  contentDiv.innerHTML = `<p>${summary}</p>`;
}

function closeSummarizerModal() {
  document.getElementById("summarizer-modal").classList.add("hidden");
  document.getElementById("summarizer-content").innerHTML = `<p>Loading summary...</p>`;
}