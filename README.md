# 🚀 Perplexity Clone — AI Search Assistant

> A Perplexity-inspired AI search application built with Node.js, Express, LangChain, Groq, and search APIs.

This project started as a simple AI chatbot and gradually turned into a multi-mode AI assistant. Instead of sending every question to the same model, the application lets the user choose what kind of answer they want — writing help, web search, Reddit search, or YouTube search.

The main goal of this project was to learn how an AI application is put together from the frontend all the way to the backend, agents, APIs, and external search services.

---

## ✨ Key Features

- 📝 **Writing Assistant**
  - Generate and improve content
  - Ask normal questions
  - Get AI-generated responses
  - Generate suggested follow-up questions

- 🌐 **Web Search**
  - Search the web for information
  - Generate an AI answer using search results
  - Display clickable sources

- 💬 **Reddit Search**
  - Search Reddit discussions
  - Use community opinions as part of the answer
  - Display relevant source links

- 📺 **YouTube Search**
  - Find relevant YouTube videos
  - Return video-related sources
  - Open results directly from the application

- 💡 **Suggested Questions**
  - Generate possible follow-up questions after a response
  - Click a suggestion to send it directly

- 🔗 **Source Cards**
  - Display source titles
  - Show the source domain
  - Open the original page in a new tab

- ✍️ **Typing Animation**
  - AI responses are displayed with a word-by-word typing effect

- ➕ **Mode Selector**
  - Select the required feature from the chat input
  - Popup menu keeps the interface clean

- 🧹 **Clear Chat**
  - Clear the current conversation and return to the welcome screen

- 🌑 **Dark UI**
  - Dark themed interface inspired by modern AI chat applications

---

## 🖥️ Preview

The interface currently contains:

- A sidebar for the application and recent chats
- A welcome screen
- Mode selection pills
- A chat area
- A popup feature selector
- A rounded chat input
- Source cards for search results

### Main flow

```text
Choose a mode
      ↓
Enter a question
      ↓
Frontend sends request
      ↓
Express API
      ↓
Selected Agent / AI Model
      ↓
Answer + Sources
      ↓
Displayed in Chat
```

> 📌 Add screenshots of your current application here as the UI is finalized.

---

# 🧠 How the Application Works

The frontend sends the user's prompt together with the selected mode to the backend.

Example request:

```json
{
  "prompt": "Find some good JavaScript tutorials",
  "mode": "youtube"
}
```

The backend receives the request at:

```text
POST /api/chat
```

The server checks the selected mode and routes the request accordingly.

```text
                         ┌─────────────────────┐
                         │       User          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Frontend       │
                         │ HTML / CSS / JS     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   POST /api/chat    │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
               Writing           Search          Search
                 Mode             Agents          Agents
                    │               │               │
                    ▼               ▼               ▼
                  Groq        Web / Reddit /     YouTube
                                  Search
                    │               │               │
                    └───────────────┼───────────────┘
                                    ▼
                         ┌─────────────────────┐
                         │    AI Response      │
                         │  + Suggestions      │
                         │  + Sources          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    Chat Interface   │
                         └─────────────────────┘
```

---

# 🧩 Application Modes

## 📝 Writing Assistant

The writing mode uses the Groq language model through LangChain.

The user can use it for general AI conversations and content-related tasks.

Example:

```text
Write a short introduction for my college project.
```

The backend sends the prompt to the language model and then generates suggested follow-up questions.

---

## 🌐 Web Search

The web search mode is intended for questions where current information or external sources are useful.

The web search agent searches for relevant information and passes the result to the language model.

The response can contain:

```text
AI Answer
     ↓
Sources
     ↓
Source Title
Source Domain
Clickable Link
```

---

## 💬 Reddit Search

The Reddit mode focuses on Reddit discussions and community opinions.

This is useful for questions where real user experiences and discussions can be more useful than a normal generated response.

Example:

```text
What do people think about learning React as a beginner?
```

---

## 📺 YouTube Search

The YouTube mode is intended for finding tutorials and videos.

Example:

```text
Find beginner tutorials for Node.js.
```

The response can include YouTube-related source cards that can be opened directly.

---

# 🤖 AI Components

The project separates different responsibilities into agents instead of putting all of the logic into one file.

Current agent files include:

```text
src/
└── agents/
    ├── writingAssistantAgent.js
    ├── webSearchAgent.js
    ├── redditSearchAgent.js
    ├── youtubeSearchAgent.js
    └── suggestionGeneratorAgent.js
```

### Writing Assistant Agent

Handles writing/general AI functionality.

### Web Search Agent

Handles web search related requests.

### Reddit Search Agent

Handles Reddit search requests.

### YouTube Search Agent

Handles YouTube search requests.

### Suggestion Generator Agent

Generates possible follow-up questions after a writing-mode response.

---

# 🏗️ Project Structure

```text
perplexity-ai-clone/
│
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── src/
│   └── agents/
│       ├── writingAssistantAgent.js
│       ├── webSearchAgent.js
│       ├── redditSearchAgent.js
│       ├── youtubeSearchAgent.js
│       └── suggestionGeneratorAgent.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── index.js
├── server.js
└── README.md
```

### `public/`

Contains the frontend of the application.

### `src/agents/`

Contains the different AI and search-related agents.

### `server.js`

Starts the Express server, serves the frontend, initializes the Groq model, and handles the `/api/chat` endpoint.

### `index.js`

Contains a separate command-line writing assistant implementation.

---

# ⚙️ Tech Stack

| Technology | Used For |
|---|---|
| HTML5 | Frontend structure |
| CSS3 | UI and styling |
| JavaScript | Frontend logic |
| Node.js | Backend runtime |
| Express.js | Backend server and API |
| LangChain | AI application framework |
| Groq | Language model provider |
| Tavily | Web search |
| Reddit | Reddit search functionality |
| YouTube | YouTube search functionality |
| dotenv | Environment variables |

---

# 🔌 API

## `POST /api/chat`

Main API endpoint used by the frontend.

### Request

```json
{
  "prompt": "Your question",
  "mode": "writing"
}
```

### Available modes

```text
writing
web
reddit
youtube
```

### Writing response

The writing mode returns:

```json
{
  "success": true,
  "answer": "...",
  "suggestions": []
}
```

### Search response

Search modes can return:

```json
{
  "success": true,
  "answer": "...",
  "suggestions": [],
  "sources": []
}
```

---

# 📦 Installation

## 1. Clone the repository

```bash
git clone https://github.com/ritesh-code23/perplexity-ai-clone.git
```

## 2. Open the project

```bash
cd perplexity-ai-clone
```

## 3. Install dependencies

```bash
npm install
```

---

# 🔐 Environment Configuration

Create a `.env` file in the project root.

```env
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

Do not upload the `.env` file to GitHub.

It is already included in `.gitignore`.

> ⚠️ Never put real API keys directly inside JavaScript source files or the README.

---

# ▶️ Running the Application

Start the server with:

```bash
npm start
```

The application runs at:

```text
http://localhost:3000
```

Open the URL in your browser.

---

# 🧪 Development

The project is currently being developed locally.

A typical development cycle is:

```text
Change code
    ↓
Run npm start
    ↓
Test in browser
    ↓
Check console / server output
    ↓
Fix issues
    ↓
Commit changes
    ↓
Push to GitHub
```

---

# 📚 What I Learned

This project has been a practical way for me to learn how different parts of an AI application work together.

Some of the main things I worked with are:

### Frontend ↔ Backend Communication

I learned how a frontend can send a user's prompt to an Express API using `fetch()` and receive a JSON response.

### Working With LLM APIs

I learned how to initialize a language model and send user prompts to it through LangChain.

### Search + AI

Instead of relying only on the language model, search modes can bring external information into the application before generating the final response.

### Agent-Based Structure

I started separating functionality into different agent files so that web search, Reddit search, YouTube search, writing, and suggestions are easier to work on independently.

### Environment Variables

I learned how API keys should be stored outside the source code using `.env`.

### Git and GitHub

I also used Git throughout the project to track changes, clean up unnecessary files, protect API keys, and maintain the project on GitHub.

---

# 🚧 Current Limitations

This is not intended to be a finished production application yet.

Some things still need improvement:

- Chat history is not fully persistent.
- Conversation memory is not implemented as a complete feature.
- AI responses are not actually streamed from the backend.
- The current typing effect is frontend-based.
- Markdown rendering still needs to be added.
- File uploads are not available yet.
- Voice input is not implemented.
- Authentication is not implemented.
- Mobile UI can be improved further.
- The application currently runs locally.

---

# 🔮 Planned Improvements

## 💾 Persistent Chat History

Save conversations and display them in the sidebar.

## 🧠 Conversation Memory

Allow the AI to use previous messages from the same conversation.

## ⚡ Real-Time Streaming

Replace the current typing animation with actual streamed AI responses.

## 📝 Markdown Rendering

Improve response formatting with:

- Headings
- Lists
- Tables
- Code blocks
- Bold and italic text

## 📋 Copy Response

Add a copy button for AI responses and code blocks.

## 📁 File Uploads

Allow users to upload documents and ask questions about them.

## 🎤 Voice Input

Add voice-based input to the chat interface.

## 📱 Responsive UI

Improve the experience on phones and smaller screens.

---

# 🔒 Security

API keys are stored in environment variables.

The project uses:

```text
.env
```

for local credentials and:

```text
.gitignore
```

to prevent `.env` from being committed.

If you fork or clone the project, create your own API keys rather than using someone else's credentials.

---

# 🌱 Project Status

```text
🟢 Core chat                 Working
🟢 Writing mode              Working
🟢 Web search                Working
🟢 Reddit search             Working
🟢 YouTube search            Working
🟢 Source links              Working
🟢 Suggested questions       Working
🟢 Mode selector             Working
🟢 Typing animation          Working
🟡 Persistent chat history   Planned
🟡 Streaming responses       Planned
🟡 Markdown                  Planned
🟡 File uploads              Planned
🟡 Voice input               Planned
```

---

# 🤝 Contributing

This is currently a personal learning project, but suggestions and improvements are welcome.

If you want to experiment with the project:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test the application locally.
5. Create a pull request.

---

# 👨‍💻 Author

## Ritesh Yadav

BTech CSE student and developer interested in AI, web development, UI/UX, and building projects while learning.

GitHub:

https://github.com/ritesh-code23

---

# ⭐ Final Note

This project is still evolving.

I built it mainly to understand how an AI-powered application works when the frontend, backend, language model, search APIs, and different agents are connected together.

It started as a basic chatbot and slowly turned into a multi-mode AI search assistant.

There is still a lot I want to improve, but that's also what makes the project useful as a learning project.

If you find it interesting, feel free to explore the code and try it locally.

⭐ If you like the project, consider giving the repository a star.
