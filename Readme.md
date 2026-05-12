# PrepWise AI

PrepWise AI is an AI-powered mock interview platform designed to help users prepare for real-world interviews by generating personalized questions based on their resume. Unlike generic platforms, it analyzes your skills, projects, and experience to create tailored technical, HR, and behavioral questions, providing instant feedback and scoring for a realistic practice experience.

##  Features

- **Resume-Based Question Generation**: Upload your PDF resume to generate personalized interview questions.
- **Multiple Interview Types**: Technical, HR, and Behavioral mock interviews with AI-driven questions.
- **Aptitude Testing**: Built-in aptitude modules for comprehensive skill assessment.
- **Video-Based Interviews**: Interactive sessions with AI avatars (male/female) for immersive practice.
- **Automated Feedback & Scoring**: Real-time evaluation of answers with detailed feedback and performance reports.
- **Interview History & Reports**: Track progress with session history, downloadable PDF reports, and analytics.
- **Secure Authentication**: Firebase-based login with Google sign-in and JWT token management.
- **Payment Integration**: Credit-based system with Razorpay for premium features.
- **Responsive Design**: Fully responsive UI built with React and Tailwind CSS.

## 🛠 Tech Stack

### Frontend
- **React** - Component-based UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **Firebase** - Authentication and hosting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for APIs
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload handling
- **PDF.js** - Resume PDF parsing

### AI & Integrations
- **OpenRouter API** - AI-powered question generation and feedback
- **Razorpay** - Payment gateway
- **Firebase Auth** - User authentication

## 📖 Usage

1. **Sign Up/Login**: Create an account or sign in with Google.
2. **Upload Resume**: Upload your PDF resume to get started.
3. **Select Interview Type**: Choose from Technical, HR, Behavioral, or Aptitude tests.
4. **Practice**: Answer questions in a timed, video-based session.
5. **Review Feedback**: Receive instant scoring and detailed feedback.
6. **Track Progress**: View interview history and download reports.

## 🎯 How It Works

1. **Resume Upload**: User uploads a PDF resume.
2. **Text Extraction**: Backend parses the PDF using PDF.js.
3. **Question Generation**: OpenRouter API generates personalized questions based on extracted data.
4. **Mock Interview**: User answers in a simulated environment with AI avatars.
5. **Evaluation**: AI analyzes responses and provides feedback/scoring.
6. **Reporting**: Results are stored and presented in downloadable reports.


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.


[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue?style=for-the-badge)](https://prepwiseai-tau.vercel.app)
---

