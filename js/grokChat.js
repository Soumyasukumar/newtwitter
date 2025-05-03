let grokKeywords = [];
let grokInfo = [];

function sendGrokMessage() {
  const input = document.getElementById("grok-input");
  const chat = document.getElementById("grok-chat");
  const userMessage = input.value.trim().toLowerCase();

  if (!userMessage) return;

  // Display user message
  chat.innerHTML += `<p class="text-gray-300 mt-2"><strong>You:</strong> ${input.value}</p>`;
  input.value = "";

  // Find matching keyword
  const matchedKeyword = grokKeywords.find(keyword => userMessage.includes(keyword.keyword.toLowerCase()));
  let response = "Sorry, I didn't understand that. Try asking about features, premium, events, or groups!";

  if (matchedKeyword) {
    const info = grokInfo.find(item => item.id === matchedKeyword.responseId);
    if (info) {
      response = info.content;
    }
  }

  // Display Grok's response
  chat.innerHTML += `<p class="text-white mt-2"><strong>Grok:</strong> ${response}</p>`;
  chat.scrollTop = chat.scrollHeight;
}