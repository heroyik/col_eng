# Colloquial English Search Web App

A premium, high-performance web application designed to search and discover authentic English colloquial expressions. Built with a modern "glassmorphism" aesthetic and powered by Firebase Firestore.

## ✨ Features

- **Premium UI/UX**: Featuring a sleek glassmorphism design with dynamic background animations and fluid transitions.
- **Enhanced Search**: Instant search with client-side filtering that checks across titles, meanings, synonyms, and example conversations.
- **Enter Key Trigger**: Immediate search results update on hitting "Enter" for a faster user experience.
- **Persistent UI Logic**: Improved state management that separates search results from status elements (Loading, Initial, No Results) to ensure reliable repeated searches.
- **Real-time Loading**: All expressions are loaded once on initialization to provide instant, lag-free search results.
- **Mobile Responsive**: Fully optimized for a seamless experience across desktop, tablet, and mobile devices (including Safari/iOS compatibility).
- **High Typography**: Uses premium fonts (Outfit and Playfair Display) for a professional look and feel.

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML5, CSS3 (Custom Design System with -webkit prefixes for glassmorphism)
- **Logic**: JavaScript (ES6+ Modules)
- **Backend/Database**: Firebase Firestore
- **Hosting**: Firebase Hosting

## 🔍 Search Logic & UI Architecture

To provide a superior user experience with standard Firestore (which has limited partial search capabilities), this app uses a refined client-side filtering strategy:
1. **Initial Load**: All expressions are fetched from the `EnglishExpressions` collection on page load.
2. **Multi-Field Filtering**: The search query is matched against the following fields (case-insensitive):
    - `primary`: The title/main expression.
    - `meaning`: The definition or Korean translation.
    - `similar`: An array of synonyms or related phrases.
    - `example`: The usage example or conversation snippet.
3. **Persistent State**: The UI separates the results grid from status messages. This prevents search logic from breaking when results are cleared or updated repeatedly.
4. **Trigger**: Search updates live as you type (300ms debounce) or instantly when you press **Enter**.

## 🚀 Getting Started

### Prerequisites

- A Firebase project with Firestore enabled.
- A collection named `EnglishExpressions` in your Firestore database.
- Documents should follow this schema:
    - `primary` (string): The main English expression.
    - `meaning` (string): The meaning or translation.
    - `similar` (array): A list of synonyms.
    - `example` (string): A usage example.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/heroyik/col_eng.git
   cd col_eng
   ```

2. Configure Firebase:
   Update the `firebaseConfig` object in `app.js` with your project's credentials.

3. Run locally:
   You can use any static server. For example:
   ```bash
   npx serve .
   ```

## 📸 Screenshots

![Initial View](https://raw.githubusercontent.com/heroyik/col_eng/master/previews/app_initial_view.png)
*Modern glassmorphism search interface.*

## 📄 License

MIT License - feel free to use and modify for your own projects!
