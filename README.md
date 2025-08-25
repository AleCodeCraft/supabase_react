# Supabase React Authentication App

A modern, full-stack authentication application built with React, Vite, and Supabase. This project demonstrates a complete user authentication system with email/password login, Google OAuth integration, user profile management, and avatar upload functionality.

## 🚀 Features

### Authentication
- **Email/Password Authentication**: Traditional login and registration
- **Google OAuth Integration**: One-click login with Google accounts
- **Session Management**: Automatic session handling and persistence
- **Secure Logout**: Complete session termination

### User Management
- **Profile Management**: Update username, website, and avatar
- **Avatar Upload**: Upload and manage profile pictures
- **Real-time Updates**: Instant profile synchronization
- **Responsive Design**: Works seamlessly on all devices

### Technical Features
- **Modern React**: Built with React 18 and functional components
- **Vite Build Tool**: Fast development and optimized production builds
- **Supabase Backend**: Real-time database and authentication
- **Storage Integration**: Secure file uploads with Supabase Storage
- **Row Level Security**: Database security at the record level

## 🏗️ Architecture

### Frontend Stack
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with modern design patterns
- **ES6+**: Modern JavaScript features

### Backend Stack
- **Supabase**: Backend-as-a-Service platform
- **PostgreSQL**: Relational database
- **Supabase Auth**: Authentication and authorization
- **Supabase Storage**: File storage for avatars
- **Row Level Security**: Database security policies

### Project Structure
```
supabase-react/
├── src/
│   ├── components/
│   │   ├── Auth.jsx          # Login/Signup component
│   │   ├── SignUp.jsx        # Registration component
│   │   ├── Account.jsx       # User profile management
│   │   └── Avatar.jsx        # Avatar upload component
│   ├── App.jsx               # Main application component
│   ├── supabaseClient.js     # Supabase client configuration
│   └── main.jsx              # Application entry point
├── public/                   # Static assets
├── user_managment_starter.sql # Database schema
├── google_client_secret.json # Google OAuth credentials
└── package.json              # Dependencies and scripts
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** or **pnpm** package manager
- **Git** for version control
- **Supabase Account** (free tier available)
- **Google Cloud Console Account** (for OAuth)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/supabase-react.git
cd supabase-react
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Set Up Supabase Project

#### Create Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `supabase-react-auth`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

#### Configure Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `user_managment_starter.sql`
3. Click "Run" to execute the schema

#### Get Supabase Credentials
1. Go to **Settings** → **API**
2. Copy your **Project URL** and **anon public key**
3. Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
```

### 4. Configure Google OAuth

Follow the detailed guide in [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)

### 5. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key

# Google OAuth (optional)
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### Database Schema
The application uses the following database structure:

#### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);
```

#### Storage Bucket
- **Bucket Name**: `avatars`
- **Public Access**: Enabled for avatar images
- **Security**: Row Level Security policies applied

## 🚀 Usage

### Authentication Flow
1. **Registration**: Users can create accounts with email/password or Google OAuth
2. **Login**: Multiple authentication methods available
3. **Profile Management**: Update personal information and avatar
4. **Logout**: Secure session termination

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Profile changes sync immediately
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during operations

## 📱 Features in Detail

### Authentication Components
- **Auth.jsx**: Handles login with email/password and Google OAuth
- **SignUp.jsx**: User registration with validation
- **Account.jsx**: Profile management and logout
- **Avatar.jsx**: Image upload and display

### Security Features
- **Row Level Security**: Database-level access control
- **JWT Tokens**: Secure session management
- **Input Validation**: Client and server-side validation
- **Secure File Upload**: Avatar images stored securely

## 🧪 Testing

### Manual Testing
1. **Registration**: Test email/password and Google OAuth registration
2. **Login**: Verify both authentication methods
3. **Profile Updates**: Test avatar upload and profile editing
4. **Logout**: Ensure complete session termination

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
pnpm build
```

### Deploy Options
- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **Firebase Hosting**: Use Firebase CLI
- **GitHub Pages**: Configure GitHub Actions

### Environment Variables in Production
Ensure all environment variables are set in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_GOOGLE_CLIENT_ID` (if using Google OAuth)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Review the [Google OAuth Setup Guide](./GOOGLE_OAUTH_SETUP.md)
3. Open an issue on GitHub
4. Check the browser console for error messages

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

## 📊 Project Status

- ✅ Authentication System
- ✅ Google OAuth Integration
- ✅ User Profile Management
- ✅ Avatar Upload
- ✅ Responsive Design
- ✅ Security Implementation
- ✅ Documentation

---

**Built with ❤️ using React, Vite, and Supabase**
