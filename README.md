# Colloquial English Search Web App

A premium, high-performance web application designed to search and discover authentic English colloquial expressions. Built with a modern "glassmorphism" aesthetic and powered by Firebase Firestore.

## ✨ Features

- **Expression of the Day**: A premium, daily-changing expression featured prominently on the home screen to encourage unparalleled discovery.
- **Vast Database**: A rich database of **1,483 expressions**, curated for real-world utility and high-frequency usage in NYC and professional settings.
- **NYC-Style Content**: Every expression is enriched with 5 modern, trendy synonyms and a standardized **6-line realistic A/B dialogue example**, reflecting current NYC slang (e.g., "deadass", "no cap", "facts", "brick").
- **Multilingual Colloquial Support**: All 1,483 records are rigorously enriched with colloquial translations in **Spanish**, **Chinese** (HSK 4 Standard), **Vietnamese** (OPIC IM2 Standard), and **Japanese** (OPIC AL level), capturing specific cultural nuances and trendy expressions (e.g., "Es pan comido", "没毛病", "Đỉnh của chóp").
- **Premium UI/UX**: Featuring a sleek glassmorphism design with dynamic background animations and fluid transitions.
- **Enriched Data Export**: A high-performance export feature that allows users to download the local cache as a cleaned `YYYYMMDD_COL_ENG_XXX.json` file, containing only essential fields.
- **Enhanced Search**: Instant search with client-side filtering that checks across titles, meanings, synonyms, and example conversations.
- **Improved Download Progress**: A premium, real-time visual progress bar with an immediate "0% feedback" system, ensuring visibility during Firestore synchronization.
- **Firestore Read Optimization**: Implements **IndexedDB Persistence** and **Delta-Sync** logic. Only new or modified records are fetched from the server, preventing `QUOTA EXCEEDED` errors and reducing daily read counts from 40k+ to nearly zero for existing users.
- **Mobile-First Layout**: Fully optimized for mobile with a "one-screen" philosophy, featuring compact loading states to maximize visibility on smaller screens.
- **Keyword Highlighting**: Automatically highlights the primary expression and its synonyms within usage examples for better focus.
- **Smart Deduplication & Curation**: The database is algorithmically curated to maintain zero duplicates and high-quality learning content.
- **Standardized Data Schema**: Every document is mapped with a consistent `expression_XXXX` ID and an internal `id` field for superior administration.

## 📊 Datasets

The application utilizes several specialized datasets for a comprehensive learning experience:

- **Full Enriched Collection**: 1,483 high-frequency expressions, enriched with colloquial meanings, realistic A/B dialogues, and **multilingual support** (Korean, Spanish, Chinese, Vietnamese, Japanese).
- **NY Colloquial 2025**: Specialized dataset focusing on the latest NYC and SNS-driven slang.
- **OPIC AL Prep**: Expressions specifically curated for achieving Advanced Low level in English proficiency tests.

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML5, CSS3 (Custom Design System with -webkit prefixes for glassmorphism)
- **Logic**: JavaScript (ES6+ Modules)
- **Backend/Database**: Firebase Firestore
- **Hosting**: Firebase Hosting / Netlify

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

