# Colloquial English Search Web App

A premium, high-performance web application designed to search and discover authentic English colloquial expressions. Built with a modern "glassmorphism" aesthetic and powered by Firebase Firestore.

## 📂 Project Structure

- `app.js`: Main application logic.
- `index.html`: Entry point of the web app.
- `index.css`: Styling for the application.
- `public/`: Assets and public files.
- `temp/`: Temporary scripts, JSON data batches, and logs.
- `firebase.json`: Firebase configuration.
- `firestore.rules` & `firestore.indexes.json`: Security rules and index configuration.

## 💠 Quota Optimization

To ensure high reliability and minimize costs, the application implements:
- **Metadata-based Sync**: Instead of scanning thousands of records, the app reads a single `SystemMetadata/sync` document to detect updates. This reduces "initial check" read operations by 99%+.
- **Automatic Quota Cooldown**: If a `429 Resource Exhausted` error is encountered, the app automatically enters a **2-hour cooldown**, during which it relies exclusively on the local IndexedDB cache.
- **Optimized Search**: All search operations are performed client-side on the cached dataset, incurring zero Firestore read costs during browsing.

## 🔍 Search Logic & UI Architecture

To provide a superior user experience with standard Firestore (which has limited partial search capabilities), this app uses a refined client-side filtering strategy:

1. **Initial Load**: All expressions are fetched from the `EnglishExpressions` collection on page load.
2. **Multi-Field Filtering**: The search query is matched against `primary`, `meaning`, `similar`, and `example` fields (case-insensitive).
3. **Trigger**: Search updates live as you type (300ms debounce) or instantly when you press **Enter**.
4. **Wildcard Search**: Type `*` in the search box to view all expressions currently stored in the database.

## 🚀 Getting Started

### Prerequisites

- A Firebase project with Firestore enabled.
- A collection named `EnglishExpressions` in your Firestore database.

## ✨ Features

- **Expression of the Day**: A random expression is featured daily to encourage learning.
- **Multi-language Support**: Displays translations in Japanese, Chinese, Vietnamese, and Spanish when available.
- **Offline Capable**: Uses IndexedDB for persistence, creating a seamless offline experience after the initial sync.
- **Data Export**: Users can download the entire dataset as a JSON file directly from the UI.

## 🤝 Credits

Maintained by [heroyik@gmail.com](mailto:heroyik@gmail.com).

Based on the investment strategy and learning tools designed by nIcK.
