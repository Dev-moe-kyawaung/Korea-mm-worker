# Korea-mm-worker 🇰🇷

**Korea-mm-worker** is a comprehensive mobile application designed to assist Myanmar citizens in navigating their life and work in Korea. It leverages React Native and Expo to provide a robust set of tools for visa information, exam preparation, document management, financial tracking, and community support.

This application aims to be an all-in-one companion for migrant workers, offering critical information and resources directly on their mobile devices.

[![Expo GitHub](https://img.shields.io/badge/Expo-black.svg?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-6DE7FF?style=for-the-badge&logo=react-native&logoColor=000)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://github.com/Dev-moe-kyawaung/Korea-mm-worker/blob/main/LICENSE)

## 🌟 Key Features

*   **Visa Intelligence 🛂:** Comprehensive comparison of various Korean visa types (E-9, E-7, D-4, F-5, etc.) with detailed requirements, risks, processing times, and a personalized visa finder tool.
*   **Exam Prep Engine 📚:** Study resources for EPS-TOPIK, KIIP, and TOPIK exams, featuring spaced repetition learning (SM-2 algorithm), mock exams, and detailed explanations.
*   **Document Vault 🗄️:** Secure, encrypted storage for important documents (passport, ARC, visa pages, contracts) with expiry date tracking and the ability to generate shareable PDF packets.
*   **Salary & Remittance Tools 💰:** A payroll calculator that estimates net pay based on Korean tax and insurance laws, an F-5 income tracker, and a remittance optimizer to compare FX channels.
*   **Community & Legal Aid 🤝:** Access to a peer forum for discussions, a directory of verified lawyers, an employer blacklist to report fraudulent companies, and essential emergency hotlines.
*   **SOS Functionality 🆘:** An emergency feature to quickly send location and status information to emergency contacts and access critical Korean hotlines.
*   **Multi-language Support 🌐:** The application supports English, Myanmar, and Korean languages, with auto-translation capabilities for community content.
*   **Offline First Design ✈️:** Key features and data are available offline, ensuring accessibility even without an internet connection.

## 🛠️ Tech Stack

*   **Languages:** TypeScript, JSON, Markdown
*   **Frameworks:** React Native, Expo, React Navigation, React Native Reanimated, Vercel Speed Insights
*   **State Management:** React Context API
*   **Storage:** AsyncStorage
*   **UI Components:** Custom UI components built with React Native and Expo.
*   **Other:** Various Expo modules for device features, @react-navigation for routing.

## 🚀 Installation

To get started with the project, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Dev-moe-kyawaung/Korea-mm-worker.git
    cd Korea-mm-worker
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Run the application:**
    *   **Start the Expo development server:**
        ```bash
        npm start
        # or
        yarn start
        ```
    *   **Run on Android:**
        ```bash
        npm run android
        # or
        yarn android
        ```
    *   **Run on iOS:**
        ```bash
        npm run ios
        # or
        yarn ios
        ```
    *   **Run on Web:**
        ```bash
        npm run web
        # or
        yarn web
        ```

## 📚 Usage

This application serves as a comprehensive guide and resource hub for Myanmar citizens in Korea.

### 🗺️ Onboarding & Personalization

Upon first launch, users are guided through a short onboarding process to personalize their experience:

1.  **Set Your Goal:** Select your primary objective in Korea (e.g., Factory Work, Professional Job, Study Korean).
2.  **Current Status:** Indicate whether you are in Myanmar, already in Korea, or in a third country.
3.  **Korean Language Proficiency:** Specify your Korean language level (None, Basic, TOPIK 2, TOPIK 3+).
4.  **Profile Information:** Optionally provide your name and other relevant details.
5.  **Consent:** Review and accept privacy policies.

Based on these inputs, the app provides personalized visa recommendations and tailored information.

###  visa-finding

Navigate to the **Visa** tab to:

*   **Compare Visas:** View a detailed matrix comparing different visa types across key aspects like stay length, work permission, sponsor requirements, Korean language proficiency, income floor, family inclusion, path to F-5 residency, and processing time.
*   **Visa Wizard:** Answer a quick 5-question survey to get personalized visa recommendations based on your goals, status, language level, age, and priorities.
*   **View Visa Details:** Tap on a visa code (e.g., E-9, E-7) to see in-depth information, requirements, risks, and a document checklist.
*   **Policy Feed:** Stay updated with the latest immigration policies and news.

### 📝 Document Vault

Access the **Vault** tab to:

*   **Add Documents:** Securely store digital copies of important documents like passports, ARC cards, contracts, degrees, etc.
*   **Track Expiries:** Receive notifications for expiring documents.
*   **Generate Checklist:** Create a personalized document checklist for specific visa applications.
*   **Build Share Packet:** Compile selected documents into an encrypted PDF packet for easy sharing.

### 🧠 Exam Preparation

Head to the **Exam** tab for:

*   **Study Decks:** Access question banks for EPS-TOPIK (Vocabulary, Daily Life, Workplace Safety, KIIP Society & Rights).
*   **Spaced Repetition:** Utilize the SM-2 algorithm to optimize learning and retention.
*   **Mock Exams:** Test your knowledge with timed mock exams that simulate the real test environment.
*   **Progress Tracking:** Monitor your accuracy, streak, and mastered cards.

### 💸 Money Management

Use the **Money** tab for:

*   **Salary Calculator:** Input your gross salary, dependents, and workplace details to estimate net pay, deductions (tax, pension, health insurance), and employer costs.
*   **F-5 Income Tracker:** Check your progress towards meeting the income requirements for Permanent Residency (F-5 visa).
*   **Remittance Optimizer:** Compare different channels for sending money home to find the best rates and speeds.

### 💬 Community & Support

Engage with the community via the **Community** tab:

*   **Peer Forum:** Participate in discussions on work, visa, housing, exams, and money matters.
*   **Lawyer Directory:** Find verified immigration lawyers and legal aid services, view their specialties, fees, and response times.
*   **Employer Blacklist:** Check company or broker names against a community-reported blacklist to identify potential risks.
*   **SOS Feature:** Quickly generate and share an emergency message with your location and essential status information, or access vital Korean hotlines (Immigration, Police, Fire).

## 📂 Project Structure

```
Korea-mm-worker/
├── .claude/
├── AGENTS.md
├── App.tsx
├── CLAUDE.md
├── LICENSE
├── README.md
├── app.json
├── eas.json
├── index.ts
├── package.json
├── tsconfig.json
├── vercel.json
└── src/
    ├── components/
    │   └── ui.tsx
    ├── data/
    │   ├── community.ts
    │   ├── exam.ts
    │   └── visas.ts
    ├── lib/
    │   ├── dates.ts
    │   ├── match.ts
    │   ├── salary.ts
    │   └── sm2.ts
    ├── navigation.ts
    ├── screens/
    │   ├── AddDocScreen.tsx
    │   ├── CommunityScreen.tsx
    │   ├── EmployerScreen.tsx
    │   ├── ExamScreen.tsx
    │   ├── LawyerScreen.tsx
    │   ├── MoneyScreen.tsx
    │   ├── OnboardingScreen.tsx
    │   ├── QuizScreen.tsx
    │   ├── SosScreen.tsx
    │   ├── VisaDetailScreen.tsx
    │   ├── VisaScreen.tsx
    │   ├── VaultScreen.tsx
    │   ├── WizardScreen.tsx
    │   └── SettingsScreen.tsx
    ├── store/
    │   └── AppContext.tsx
    └── theme.ts
```

## 🔗 Important Links

*   **GitHub Repository:** [Dev-moe-kyawaung/Korea-mm-worker](https://github.com/Dev-moe-kyawaung/Korea-mm-worker)

## 🤝 Contributing

Contributions are welcome! Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Footer

**Korea-mm-worker** | [Repository](https://github.com/Dev-moe-kyawaung/Korea-mm-worker) | Developed by Moe Kyaw Aung | [Profile](https://github.com/Dev-moe-kyawaung)

*   Fork the project
*   Star the repository ⭐
*   Report Issues 🐛

---

---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**