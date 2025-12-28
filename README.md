# Colloquial English Search Web App

A premium, high-performance web application designed to search and discover authentic English colloquial expressions. Built with a modern "glassmorphism" aesthetic and powered by Firebase Firestore.

## ✨ Features

- **Expression of the Day**: A premium, daily-changing expression featured prominently on the home screen to encourage unparalleled discovery.
- **NYC-Style Content**: A rich database of 850+ expressions, each enriched with 5 modern, context-aware synonyms and a 6-line realistic dialogue example.
- **Premium UI/UX**: Featuring a sleek glassmorphism design with dynamic background animations and fluid transitions.
- **Enhanced Search**: Instant search with client-side filtering that checks across titles, meanings, synonyms, and example conversations.
- **Enter Key Trigger**: Immediate search results update on hitting "Enter" for a faster user experience.
- **Persistent UI Logic**: Improved state management that separates search results from status elements (Loading, Initial, No Results).
- **Mobile-First Layout**: Fully optimized for mobile with a "one-screen" philosophy, eliminating scroll fatigue and maximizing content visibility.
- **Keyword Highlighting**: Automatically highlights the primary expression and its synonyms within usage examples for better focus.
- **Smart Deduplication**: The database is algorithmically curated to maintain zero duplicates for a clean learning experience.
- **Wildcard Search**: Type `*` in the search box to view all expressions currently stored in the database.
- **Cross-Browser Styling**: Safari-ready glassmorphism effects using `-webkit-backdrop-filter`.
- **Improved Readability**: Enhanced text contrast, distinct example blocks, and refined typography (Outfit & Playfair Display).

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

## 🛡️ Data Integrity & Management

This project employs a suite of custom Node.js scripts to ensure a clean, high-quality database:

- **Batch Upload**: REST API-based uploader for efficient handling of large datasets (500+ records).
- **Automated Renaming**: Migrated legacy numeric IDs (e.g., `680`) to a standardized `expression_ID` format.
- **Smart Deduplication**: Custom algorithm to detect and remove near-match duplicates using Levenshtein distance analysis.
- **Enrichment Pipeline**: Automated enrichment process to add synonyms and dialogue examples to raw text inputs.

## 📧 Contact & Maintenance

This project is maintained by **heroyik**.
For inquiries, please contact: [heroyik@gmail.com](mailto:heroyik@gmail.com)
