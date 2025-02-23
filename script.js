const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function addMessage(role, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${role}-message`);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat box
    addMessage('user', message);
    userInput.value = '';

    // Send message to backend
    try {
        const response = await fetch('https://chatbot-71v4.onrender.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        addMessage('bot', data.reply);
    } catch (error) {
        console.error('Error:', error);
        addMessage('bot', 'Sorry, something went wrong.');
    }
}
