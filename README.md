# 🔐 SecureDocs - Government Document Sharing Platform

**SecureDocs** is a secure digital platform for storing and sharing government documents with family members. Built using **Vue**, **Tailwind.js**, and **javascript** **HTML** **CSS** with modern UI and backed by **Supabase** for secure storage and authentication.

## 🚀 Features

- 📝 Register & verify user via OTP
- 🔐 Login with secure authentication
- 📂 Upload, update, delete official documents
- 👪 Share documents with family using Aadhaar link
- 📋 Profile page showing Aadhaar-linked user details
- 🌗 Dark mode for better readability
- ⚙️ Supabase used for authentication, storage, and RLS
- 🎨 Animations and smooth UI transitions

## 🛠️ Tech Stack

- **Frontend:**
  - HTML5, CSS3, JavaScript (Vanilla)
  - Modern animations and transitions
  - Responsive design with accessibility features

- **Backend & Storage:**
  - Supabase (Authentication, Realtime DB, Storage)
  - Supabase Row-Level Security (RLS)

## 🔐 Security & Privacy

- OTP-based email verification
- Role-based access control using Supabase RLS
- Encrypted storage of sensitive data
- Document access controlled by linked Aadhaar number

## 🗃️ Functional Modules

1. **Authentication**
   - Register and login

2. **Document Management**
   - Upload, preview, update, delete, and share

3. **Profile Management**
   - View Aadhaar-linked personal details

4. **Dashboard**
   - Clean interface for document and user control

## 🧭 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/Preyapradhan/SecureDocs.git
cd SecureDocs
```

2. **Setup Supabase**
- Go to [Supabase](https://supabase.com) and create a project
- Setup authentication, storage buckets, and RLS rules
- Copy your Supabase credentials into a `.env` file:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
```

3. **Start Development**
- Open `index.html` with Live Server or use any static server.

## 📁 Folder Structure

```
project/
├── css/                # Stylesheets
├── js/                 # JavaScript modules
├── assets/             # Logos and documents
├── index.html          # Home/Login/Register
├── dashboard.html      # User dashboard
└── profile.html        # Profile info
```

## 📦 Planned Improvements

- 📲 Mobile-first optimization
- 🧾 PDF preview & annotation support
- 📬 Email notifications for shared documents
- 🧪 Test cases and CI/CD deployment


## 🙏 Acknowledgments

- Supabase for backend services
- Aadhaar API (mock/integration)
- UI references from gov portals

## 🎨 SecureDocs Images

![Screenshot 2025-04-22 151346](https://github.com/user-attachments/assets/22adef09-99a4-4d2f-ab32-e510b359b999)
