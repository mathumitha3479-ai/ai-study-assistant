async function sendMessage() {

    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const message = input.value.trim();

    if (message === "") return;

    chatBox.innerHTML += `<div class="user"><b>You:</b><br>${message}</div>`;

    input.value = "";

    try {

        const response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        if (data.response) {
            chatBox.innerHTML += `<div class="bot"><b>AI:</b><br>${data.response}</div>`;
        } else {
            chatBox.innerHTML += `<div class="bot">Error: ${data.error}</div>`;
        }

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        chatBox.innerHTML += `<div class="bot">Connection Error</div>`;
    }
}