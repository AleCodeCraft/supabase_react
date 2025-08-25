# Google OAuth Setup Guide

This guide provides step-by-step instructions to configure Google OAuth authentication for your Supabase React application.

## 📋 Prerequisites

Before starting, ensure you have:
- A Google Cloud Console account
- Access to your Supabase project dashboard
- Your application running locally

## 🚀 Step-by-Step Setup

### Step 1: Create Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create a New Project**
   - Click on the project dropdown at the top
   - Click "New Project"
   - Enter a project name (e.g., "supabase-react-auth")
   - Click "Create"

3. **Select Your Project**
   - Make sure your new project is selected in the dropdown

### Step 2: Enable Google+ API

1. **Navigate to APIs & Services**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" or "Google Identity"
   - Click on "Google+ API" or "Google Identity"
   - Click "Enable"

### Step 3: Configure OAuth Consent Screen

1. **Go to OAuth Consent Screen**
   - Navigate to "APIs & Services" → "OAuth consent screen"
   - Select "External" user type
   - Click "Create"

2. **Fill in App Information**
   ```
   App name: Supabase React Auth
   User support email: your-email@gmail.com
   Developer contact information: your-email@gmail.com
   ```

3. **Add Scopes**
   - Click "Add or Remove Scopes"
   - Select the following scopes:
     - `.../auth/userinfo.email`
     - `.../auth/userinfo.profile`
   - Click "Update"

4. **Add Test Users** (Optional)
   - Add your email address as a test user
   - This allows you to test the OAuth flow

5. **Save and Continue**
   - Click "Save and Continue" through all sections

### Step 4: Create OAuth 2.0 Credentials

1. **Go to Credentials**
   - Navigate to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"

2. **Configure OAuth Client**
   - **Application type**: Web application
   - **Name**: Supabase React Auth

3. **Add Authorized JavaScript Origins**
   ```
   http://localhost:5173
   https://your-project-ref.supabase.co
   ```

4. **Add Authorized Redirect URIs**
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   http://localhost:5173
   ```

5. **Create Client**
   - Click "Create"
   - **Save your Client ID and Client Secret** (you'll need these later)

### Step 5: Download Credentials

1. **Download JSON File**
   - In the credentials page, click the download icon (⬇️) next to your OAuth client
   - Save the file as `google_client_secret.json` in your project root
   - **Important**: This file is already in `.gitignore` for security

2. **Verify File Structure**
   Your `google_client_secret.json` should look like this:
   ```json
   {
     "web": {
       "client_id": "your-client-id.apps.googleusercontent.com",
       "project_id": "your-project-id",
       "auth_uri": "https://accounts.google.com/o/oauth2/auth",
       "token_uri": "https://oauth2.googleapis.com/token",
       "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
       "client_secret": "your-client-secret",
       "redirect_uris": [
         "https://your-project-ref.supabase.co/auth/v1/callback",
         "http://localhost:5173"
       ]
     }
   }
   ```

### Step 6: Configure Supabase Dashboard

1. **Go to Supabase Dashboard**
   - Visit [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Navigate to Authentication Settings**
   - Go to "Authentication" → "Providers"
   - Find "Google" in the list

3. **Enable Google Provider**
   - Toggle the "Enable" switch for Google
   - Enter your credentials:
     - **Client ID**: Your Google OAuth Client ID
     - **Client Secret**: Your Google OAuth Client Secret
   - Click "Save"

### Step 7: Update Your Supabase URL

1. **Get Your Supabase URL**
   - In Supabase Dashboard, go to "Settings" → "API"
   - Copy your "Project URL"

2. **Update Google Cloud Console**
   - Go back to Google Cloud Console
   - Navigate to "APIs & Services" → "Credentials"
   - Edit your OAuth 2.0 Client ID
   - Update the redirect URI with your actual Supabase URL:
     ```
     https://your-actual-project-ref.supabase.co/auth/v1/callback
     ```

### Step 8: Test the Integration

1. **Start Your Application**
   ```bash
   npm run dev
   ```

2. **Test Google Login**
   - Go to your application
   - Click "Accedi con Google"
   - You should be redirected to Google's OAuth consent screen
   - After authorization, you should be redirected back to your app

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue: "Error: redirect_uri_mismatch"
**Solution**: 
- Check that your redirect URI in Google Cloud Console exactly matches your Supabase callback URL
- Ensure there are no trailing slashes or extra characters

#### Issue: "Error: invalid_client"
**Solution**:
- Verify your Client ID and Client Secret are correct in Supabase dashboard
- Make sure you copied the credentials from the correct OAuth client

#### Issue: "Error: access_denied"
**Solution**:
- Check that your OAuth consent screen is properly configured
- Ensure your email is added as a test user (if in testing mode)

#### Issue: Google login button not working
**Solution**:
- Check browser console for JavaScript errors
- Verify that the Google provider is enabled in Supabase dashboard
- Ensure your environment variables are set correctly

### Debugging Steps

1. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for any error messages in the Console tab

2. **Verify Supabase Configuration**
   - Check that Google provider is enabled
   - Verify Client ID and Secret are correct

3. **Test OAuth Flow**
   - Try accessing the Google OAuth URL directly
   - Check if you're redirected properly

## 🔒 Security Considerations

### Best Practices

1. **Keep Credentials Secure**
   - Never commit `google_client_secret.json` to version control
   - Use environment variables in production
   - Regularly rotate your Client Secret

2. **Configure Proper Scopes**
   - Only request the scopes you actually need
   - Avoid requesting unnecessary permissions

3. **Use HTTPS in Production**
   - Always use HTTPS for production deployments
   - Update redirect URIs accordingly

4. **Monitor Usage**
   - Check Google Cloud Console for usage statistics
   - Monitor for any suspicious activity

### Environment Variables

For production, set these environment variables:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## 📱 Mobile Considerations

### PWA Support
If you're building a PWA, add these origins to Google Cloud Console:
```
https://your-domain.com
```

### Deep Linking
For mobile apps, you might need to configure deep linking URLs in your OAuth client.

## 🔄 Updating Configuration

### Adding New Domains
When deploying to new domains, remember to:
1. Add the new domain to Google Cloud Console OAuth client
2. Update Supabase site URL settings
3. Test the OAuth flow on the new domain

### Changing Client Secret
If you need to regenerate your Client Secret:
1. Go to Google Cloud Console → Credentials
2. Edit your OAuth 2.0 Client ID
3. Click "Reset Secret"
4. Update the new secret in Supabase dashboard

## 📞 Support

If you're still having issues:

1. **Check Documentation**
   - [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
   - [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)

2. **Community Support**
   - [Supabase Discord](https://discord.supabase.com/)
   - [Google Cloud Community](https://cloud.google.com/support)

3. **Debug Information**
   - Browser console logs
   - Network tab in Developer Tools
   - Supabase dashboard logs

---

**Note**: This guide assumes you're using the standard OAuth 2.0 flow. For advanced use cases, refer to the official documentation.
