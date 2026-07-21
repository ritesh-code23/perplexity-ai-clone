const sendBtn = document.getElementById("sendBtn");
const promptBox = document.getElementById("prompt");
const chatContainer = document.getElementById("chatContainer");

promptBox.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
    }

});

sendBtn.addEventListener("click", async () => {

    const mode =
    document.getElementById("mode").value;

    const prompt = promptBox.value.trim();

    if(!prompt) return;

    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.textContent = prompt;

    chatContainer.appendChild(userDiv);

    const aiDiv = document.createElement("div");
    aiDiv.className = "ai-message";
    aiDiv.textContent = "🤔 Thinking...";

    chatContainer.appendChild(aiDiv);

    promptBox.value = "";

    const res = await fetch("/api/chat", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
        prompt,
        mode
        })
    });

    const data = await res.json();
    console.log(data);

    aiDiv.innerHTML = `
    <div>${data.answer}</div>
    `;

   if (data.suggestions?.length) {

    const suggestionsDiv =
        document.createElement("div");

    suggestionsDiv.style.marginTop = "15px";

    suggestionsDiv.innerHTML =
        "<strong>Suggested Questions:</strong><br><br>";

    data.suggestions.forEach((suggestion) => {

        const btn =
            document.createElement("button");

        btn.textContent = suggestion;

        btn.style.display = "block";
        btn.style.margin = "8px 0";

        btn.onclick = () => {
            promptBox.value = suggestion;
            sendBtn.click();
        };

        suggestionsDiv.appendChild(btn);

    });

    aiDiv.appendChild(suggestionsDiv);
}

    if (data.sources?.length) {

    const sourcesDiv =
        document.createElement("div");

    sourcesDiv.style.marginTop = "15px";

    sourcesDiv.innerHTML =
        "<strong>Sources:</strong><br><br>";

    data.sources.forEach((source) => {

        const link =
            document.createElement("a");

        link.href = source.url;
        link.target = "_blank";

        link.textContent =
            source.title || source.url;

        link.style.display = "block";
        link.style.margin = "8px 0";
        link.style.color = "#60a5fa";

        sourcesDiv.appendChild(link);

    });

    aiDiv.appendChild(sourcesDiv);
}

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior:"smooth"
    });

});