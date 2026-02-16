# Clipzter Web

Clipzter Web is a lightweight, web-based clipboard manager built with React and TypeScript. It allows you to easily save, manage, and retrieve text snippets directly in your browser.

## Features

* **Save Snippets**: Quickly add new text entries with an optional title.
* **Copy & Paste**: One-click copy functionality to retrieve your saved text.
* **Search**: Filter your saved entries by title to find what you need fast.
* **Dark Mode**: Toggle between Light and Dark themes for comfortable viewing.
* **Persistence**: Your data is saved locally in your browser (LocalStorage), so it survives page reloads.
* **Management**: Delete old or unused entries with a confirmation prompt.
* **Backup & Restore**: Export your saved clips to a JSON file and restore them later or on another device.

## Getting Started

### Prerequisites

* Node.js and npm installed on your machine.

### Installation

You can install Clipzter Web locally in two ways:

#### Option 1: Clone the Repository (Recommended)

```bash
git clone https://github.com/<your-username>/clipzter-web.git
cd clipzter-web
npm install
```

#### Option 2: Download the Source Code

1. Download the ZIP from GitHub.
2. Extract it.
3. Open a terminal inside the project folder.
4. Install dependencies:

```bash
npm install
```

## Running the App (Development)

Start the development server:

```bash
npm run dev
```

Once the server starts, your terminal will display the exact local URL where the app is running. It typically looks like:

```
http://localhost:<port>
```

The port number may vary depending on your environment.

## Building for Production

To generate an optimized production build:

```bash
npm run build
```

The output will be placed in the `dist/` folder.

You can preview the production build locally with:

```bash
npm run preview
```

## License

This project is licensed under the MIT License — see the LICENSE file for details.
