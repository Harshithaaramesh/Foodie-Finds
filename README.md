# 🍽️ Foodie-Finds

A personalized restaurant recommendation web application that combines **content-based filtering** and **collaborative filtering** to suggest dining options tailored to your cuisine preferences, location, and budget — complete with Instagram reel previews of the restaurants.

> *"From Street Eats to Fine Treats"*

Published Paper: **"Savoring Success: Enhancing Restaurant Recommendations with Videos"**
*High Technology Letters, Volume 30, Issue 4, 2024 · ISSN: 1006-6748*

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Dataset](#dataset)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Screenshots](#screenshots)
- [Team](#team)

---

## Overview

Foodie-Finds is a full-stack web application built as a B.E. final year project at **K. S. Institute of Technology, Bengaluru** (VTU, 2023–24). It helps users discover local restaurants through a hybrid recommendation engine and enriches the experience by linking to short-form video content (Instagram reels) for each recommended restaurant.

---

## Features

- 🔐 User authentication (Login / Sign Up)
- 🍜 Preference input: cuisine type, location, cost range
- 🤖 Hybrid recommendation engine:
  - **Content-Based Filtering** for new users
  - **Collaborative Filtering** for returning users
- 📱 Restaurant recommendations with Instagram reel links
- 💬 Feedback form for continuous improvement
- 📊 Data cleaning and preprocessing pipeline

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| ML / Recommendation | Python, Pandas, Scikit-learn |
| Database | MariaDB |
| Dev Tools | VS Code, Jupyter Notebook |

---

## Project Structure

```
Foodie-Finds/
│
├── frontend/               # React.js frontend
│   ├── public/
│   └── src/
│       ├── components/
│       └── App.js
│
├── backend/                # Node.js + Express backend
│   ├── model/
│   │   └── Foodie.py       # Python recommendation engine
│   ├── app.js
│   └── package.json
│
├── data/                   # Datasets
│   ├── FoodData.csv        # Restaurant information
│   ├── ReelsData.csv       # Instagram reel links per restaurant
│   └── PeopleData.csv      # User interaction data
│
└── README.md
```

---

## Dataset

Three CSV datasets power the recommendation engine:

- **FoodData.csv** — Restaurant names, cuisines, cost for two, mean rating, city, online ordering availability
- **ReelsData.csv** — Instagram reel links mapped to restaurant IDs
- **PeopleData.csv** — User interaction history for collaborative filtering

> Data was collected from online food platforms, restaurant websites, and user reviews, then cleaned and preprocessed (duplicate removal, null handling, cost normalization, rating standardization).

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python 3.8+
- MariaDB
- npm

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/foodie-finds.git
cd foodie-finds
```

**2. Install Python dependencies**
```bash
pip install pandas scikit-learn flask
```

**3. Set up the backend**
```bash
cd backend
npm install
```

**4. Set up the frontend**
```bash
cd frontend
npm install
```

**5. Configure the database**
- Create a MariaDB database
- Update connection credentials in `backend/app.js`

**6. Run the application**
```bash
# In the backend directory
npm start
# This runs both the Node.js server (port 8081) and the Python model
```

```bash
# In the frontend directory
npm start
# Frontend runs at http://localhost:3000
```

---

## How It Works

```
User Input (Cuisine + Location + Cost Range)
            │
            ▼
    Recommendation System
            │
    ┌───────┴────────┐
    │                │
  New User?        Existing User?
    │                │
Content-Based    Hybrid (Content
Filtering        + Collaborative)
    │                │
    └───────┬────────┘
            │
    Top 5 Restaurant Recommendations
    + Instagram Reel Links
```

**Content-Based Filtering** — Filters restaurants by city and cuisine, computes cosine similarity scores against user preferences, and ranks by mean rating.

**Collaborative Filtering** — Analyzes user interaction history using matrix factorization to recommend restaurants enjoyed by users with similar tastes.

---

## Screenshots

| Page | Description |
|------|-------------|
| Home / Login | Landing page with authentication |
| Sign Up | New user registration |
| Preferences | Cuisine, location, and cost input |
| Recommendations | Top 5 restaurants with reel links |
| Feedback | User feedback submission |

*(Screenshots available in the `/docs` folder or the project report)*

---

## Team

**Department of Computer Science & Engineering**
K. S. Institute of Technology, Bengaluru — VTU, 2023–24

| Name | USN |
|------|-----|
| Anupriya C | 1KS20CS007 |
| Apeksha M | 1KS20CS010 |
| G Sanjana Raju | 1KS20CS027 |
| Harshitha B R | 1KS20CS038 |

**Guide:** Ms. Namyapriya D, Assistant Professor, Dept. of CSE, KSIT

---

## 📄 License

This project was developed for academic purposes under Visvesvaraya Technological University (VTU). The associated research paper is published in *High Technology Letters* (ISSN: 1006-6748).
