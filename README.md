# 🥗 DietCraft

**DietCraft** is a comprehensive nutrition and fitness tracking web application. It allows users to manage their dietary goals, monitor meal intake, and receive insights based on their activity and nutritional needs.

## 🚀 Features

- 👤 User registration and authentication
- 🥘 Meal logging with macronutrient breakdown
- 📊 Daily and weekly progress tracking
- ⚖️ Goal customization (weight loss, maintenance, gain)
- 🔢 BMR and TDEE calculators
- 📅 Calendar for logged meals

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** FastApi
- **Database:** Supabase
- **Auth:** supabase
- **Charting:** rechart

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/hassan9khaled/DietCraft.git
cd DietCraft

# Install frontend dependencies
cd FrontEnd
npm install --legacy-peer-deps

# Install backend dependencies
cd BackEnd
pip install -r requirements.txt
```

## ⚙️ Environment Variables

In the `FrontEnd` folder, create a `.env` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

## 🧪 Running the App

### Start Frontend

```bash
cd FrontEnd
npm run dev
```

### Start Backend

```bash
cd BackEnd
uvicorn app:app --reload --port=344
```

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👤 Author

- GitHub: [@hassan9khaled](https://github.com/hassan9khaled) | [@AhmeedDahy](https://github.com/AhmeedDahy) | [@ZiadTamer32](https://github.com/ZiadTamer32) | [@Mohamed-Heggazy](https://github.com/Mohamed-Heggazy) | [@EslamAymann](https://github.com/EslamAymann)
- LinkedIn: [Ahmed S. Dahy](www.linkedin.com/in/ahmed-s-dahy-b34741253) | [Ziad Tamer](https://www.linkedin.com/in/ziad-tamer-b74850284) | [Mohamed Ahmed](https://www.linkedin.com/in/mohamed-ahmed-343a6029b) | [Eslam Ayman](http://www.linkedin.com/in/eslam-ayman-06b76825b)
