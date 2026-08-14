# 🚀 Perplexity AI Clone

A full-stack AI search assistant inspired by modern AI search platforms.
The application combines AI-powered responses with web, Reddit, and YouTube search to provide useful answers with relevant sources.

## ✨ Features

* 🤖 AI-powered chat
* 📝 Writing Assistant
* 🌐 Real-time Web Search
* 💬 Reddit Search
* 📺 YouTube Search
* 🔗 Source cards with clickable links
* 💡 Suggested follow-up questions
* ✍️ AI response typing animation
* 🌓 Modern dark-themed UI
* 📱 Responsive interface
* 💬 Chat interface with conversation layout
* 🧹 Clear Chat functionality
* 🔐 Environment variables for API keys

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* LangChain

### APIs / Services

* Groq
* Tavily
* Reddit
* YouTube

## 📁 Project Structure

```text
perplexity-ai-clone/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── src/
│
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/ritesh-code23/perplexity-ai-clone.git
```

### 2. Navigate to the project

```bash
cd perplexity-ai-clone
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Create `.env` in the project root:

```env
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

Never commit your `.env` file to GitHub.

### 5. Start the application

```bash
node server.js
```

Then open the local URL shown by your server in your browser.

## 🎯 Available Modes

### 📝 Writing Assistant

Generate, improve, rewrite, and work with written content.

### 🌐 Web Search

Search the web for current information and return relevant sources.

### 💬 Reddit Search

Find Reddit discussions and community opinions.

### 📺 YouTube Search

Find relevant YouTube videos and tutorials.

## 🔐 Environment Variables

The application uses environment variables for sensitive API credentials.

Example:

```env
GROQ_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here
```

The `.env` file is excluded from Git using `.gitignore`.

## 🚧 Future Improvements

Planned improvements include:

* 💾 Persistent conversation history
* 🧠 Conversation memory
* 📝 Markdown rendering
* 📋 Copy response button
* ⚡ Streaming AI responses
* 📁 File uploads
* 🎤 Voice input
* 🌙 Light/Dark theme switching
* 👤 User authentication
* ☁️ Cloud deployment

## 📸 Project Preview

Add screenshots of the application here once the UI is finalized.

```text
Coming soon...
```

## 👨‍💻 Author

**Ritesh Yadav**

GitHub:
https://github.com/ritesh-code23

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
