const sendBtn = document.getElementById("sendBtn");
const promptBox = document.getElementById("prompt");
const chatContainer = document.getElementById("chatContainer");
const clearBtn = document.getElementById("clearBtn");
const welcomeScreen = document.getElementById("welcomeScreen");
const plusBtn = document.getElementById("plusBtn");
const featureMenu = document.getElementById("featureMenu");
const modeButtons = document.querySelectorAll(".mode-btn");
const featureItems = document.querySelectorAll(".feature-item");

plusBtn.addEventListener("click", () => {

    if (
        featureMenu.style.display === "block"
    ) {

        featureMenu.style.display = "none";

    } else {

        featureMenu.style.display = "block";

    }

});

featureItems.forEach((item) => {

    item.addEventListener("click", () => {

        featureItems.forEach((i) =>
            i.classList.remove("active")
        );

        item.classList.add("active");

        currentMode =
            item.dataset.mode;

        featureMenu.style.display =
            "none";

        console.log(
            "Selected:",
            currentMode
        );

    });

});

let currentMode = "writing";
modeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        modeButtons.forEach((btn) =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentMode =
            button.dataset.mode;

    });

});

    clearBtn.addEventListener("click", () => {

        chatContainer.innerHTML = "";

        welcomeScreen.style.display = "block";

    });

promptBox.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
    }

});

    sendBtn.addEventListener("click", async () => {

        const mode = currentMode;

        const prompt = promptBox.value.trim();

    if(!prompt) return;

        welcomeScreen.style.display = "none";

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

            const card =
                document.createElement("a");

            card.href = source.url;
            card.target = "_blank";

            card.className = "source-card";

            card.innerHTML = `
                <div class="source-title">
                    ${
                        mode === "youtube"
                        ? "📺 " + (source.title || "Video").slice(0, 80)
                        : source.title || "Source"
                    }
                </div>

                <div class="source-url">
                ${new URL(source.url).hostname}
                </div>
            `;

            sourcesDiv.appendChild(card);

        }); // closes forEach

        aiDiv.appendChild(sourcesDiv);

    } // closes if(data.sources?.length)

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior:"smooth"
    });

    }); // closes sendBtn click handler