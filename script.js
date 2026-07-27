async function sendMessage() {

    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const message = input.value.trim();

    if (message === "") return;

    // Display user message
    chatBox.innerHTML += `
        <div class="user">
            <b>You:</b><br>
            ${message}
        </div>
    `;

    input.value = "";

    try {

        const response = await fetch(
            "https://ai-study-assistant-z6is.onrender.com/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message
                })
            }
        );

        const data = await response.json();

        console.log("Backend response:", data);

        // Display AI response
        if (data.response) {

            chatBox.innerHTML += `
                <div class="bot">
                    <b>AI:</b><br>
                    ${data.response}
                </div>
            `;

        } else {

            chatBox.innerHTML += `
                <div class="bot">
                    <b>Error:</b><br>
                    ${data.error || "Unknown error"}
                </div>
            `;
        }

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        console.error("Connection error:", error);

        chatBox.innerHTML += `
            <div class="bot">
                <b>Error:</b><br>
                Unable to connect to AI server.
            </div>
        `;
    }
}