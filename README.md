Hey! 👋  
This is a React Native app built using **Expo**. If you're looking to run it locally, follow the steps below — it’s pretty straightforward.

---

## 🔧 What You’ll Need

Before you get started, make sure you’ve got these things set up:

- **Node.js** (LTS version is best)
- **npm** (comes with Node.js)
- **Expo CLI**  
  If you haven’t installed it yet, run:

  ```bash
  npm install -g expo-cli
  ```

- **Expo Go app** on your phone (optional, but super handy for testing on a real device)

---

## 🚀 How to Run the App

1. **Clone the project**

   ```bash
   git clone https://github.com/nastaran-mohammadi/kloudius.git
   cd kloudius
   ```

2. **Install the dependencies**

   Just run:

   ```bash
   npm install
   ```

3. **Set up your environment**

   Make sure you’ve added a `.env` file in the root of the project.  

4. **Start the app**

   ```bash
   npx expo start
   ```

   This will open the Expo Dev Tools in your browser. From there, you can:

   - Scan the QR code with the Expo Go app on your phone
   - Run the app on an emulator/simulator

---

## 💡 Extra Tips

- If things get weird, try clearing the cache:

  ```bash
  npx expo start --clear
  ```

- Don’t forget to **keep your `.env` file out of version control** (add it to `.gitignore` if needed).

---
