# Environment Setup Guide

## Overview
This guide will help you configure all the required environment variables for the BookmarketerAI application to work with n8n workflow automation and OpenRouter AI.

## Required Environment Variables

### 1. Supabase Configuration (Already Configured)

```env
VITE_SUPABASE_URL=https://gugfjzsulcnjwczfbbbh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Purpose:** Connect to your Supabase database for user authentication and data storage.

**Status:** ✅ Already configured

---

### 2. N8N Webhook Configuration (New)

```env
VITE_N8N_WEBHOOK_URL=https://n8n.usatinc.com/webhook/f97b5212-483e-4e5d-a2bc-4760649f187f/chat
```

**Purpose:** URL endpoint for the n8n webhook that processes chat messages.

**How to Configure:**
1. This URL should match your n8n workflow webhook path
2. If you change the webhook path in n8n, update this value
3. The URL is already set to your current webhook endpoint

**Status:** ✅ Configured (verify webhook path matches n8n)

---

### 3. N8N Webhook API Key (New - Action Required)

```env
VITE_N8N_WEBHOOK_API_KEY=your_webhook_api_key_here
```

**Purpose:** Authenticates requests to the n8n webhook to prevent unauthorized access.

**How to Configure:**

#### Option A: Generate a Random API Key (Recommended)

Use one of these methods to generate a secure random key:

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Using OpenSSL:**
```bash
openssl rand -hex 32
```

**Using Python:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

**Online Generator:**
- Visit https://www.uuidgenerator.net/api/guid (not recommended for production)

#### Option B: Create a Custom Key

Use a strong password with:
- Minimum 32 characters
- Mix of uppercase, lowercase, numbers, and symbols
- No dictionary words

**Example (DO NOT USE THIS EXACT KEY):**
```
n8n_webhook_7k9mP2xQ5wR8tY3uI6oL1nB4vC7zM0aS
```

#### Steps to Configure:

1. **Generate the key** using one of the methods above
2. **Update `.env` file:**
   ```env
   VITE_N8N_WEBHOOK_API_KEY=your_generated_key_here
   ```
3. **Configure in n8n workflow:**
   - Open your n8n workflow editor
   - Go to the Webhook Trigger node
   - Enable Authentication → Header Auth
   - Set Header Name: `X-Webhook-Auth`
   - Set Header Value: Same key from step 2
   - Save and activate the workflow

**Status:** ⚠️ ACTION REQUIRED - Generate and configure API key

---

### 4. OpenRouter API Key (Optional - Fallback)

```env
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

**Purpose:**
- Direct access to OpenRouter API (if needed)
- Currently the OpenRouter key is embedded in n8n workflow
- This provides a backup option or for direct API calls

**How to Configure:**

1. **Get an OpenRouter API Key:**
   - Visit https://openrouter.ai
   - Sign up or log in
   - Go to Settings → API Keys
   - Click "Create Key"
   - Copy the key (starts with `sk-or-v1-...`)

2. **Add to `.env` file:**
   ```env
   VITE_OPENROUTER_API_KEY=sk-or-v1-1234567890abcdef...
   ```

3. **Set up billing (if not already done):**
   - OpenRouter requires credits to use
   - Add payment method in OpenRouter dashboard
   - Recommended starting balance: $10-20

**Status:** ℹ️ OPTIONAL - Only needed if calling OpenRouter directly from frontend

---

## Complete `.env` File Example

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://gugfjzsulcnjwczfbbbh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1Z2ZqenN1bGNuandjemZiYmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NTUwODAsImV4cCI6MjA3MzMzMTA4MH0.UtTpNCIg3MgfN0wjuWDV_oeGhRVd5GCvM1nYpObpuYs

# N8N Webhook Configuration
VITE_N8N_WEBHOOK_URL=https://n8n.usatinc.com/webhook/f97b5212-483e-4e5d-a2bc-4760649f187f/chat
VITE_N8N_WEBHOOK_API_KEY=n8n_webhook_7k9mP2xQ5wR8tY3uI6oL1nB4vC7zM0aS

# OpenRouter Configuration (Optional)
VITE_OPENROUTER_API_KEY=sk-or-v1-1234567890abcdef...
```

---

## Verification Checklist

Before testing, verify each environment variable:

- [ ] **VITE_SUPABASE_URL** - Points to correct Supabase project
- [ ] **VITE_SUPABASE_ANON_KEY** - Valid Supabase anon key
- [ ] **VITE_N8N_WEBHOOK_URL** - Matches n8n workflow webhook path
- [ ] **VITE_N8N_WEBHOOK_API_KEY** - Generated and configured in both places
- [ ] **VITE_OPENROUTER_API_KEY** - (Optional) Valid OpenRouter API key

---

## Testing the Configuration

### 1. Test Webhook Connectivity (Basic)

```bash
curl -X POST https://n8n.usatinc.com/webhook/f97b5212-483e-4e5d-a2bc-4760649f187f/chat \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Auth: YOUR_API_KEY_HERE" \
  -d '{
    "message": "Hello, can you help me market my book?",
    "userId": "test-user-123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "response": "Hello! I'd be happy to help you market your book...",
  "conversationId": "conv_1234567890",
  "timestamp": "2024-11-06T18:30:00.000Z"
}
```

### 2. Test from Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the application in your browser

3. Log in or sign up

4. Navigate to the chat interface

5. Send a test message: "Hello, I need help marketing my fantasy novel"

6. Verify you receive an AI response

### 3. Check Browser Console

Open browser DevTools (F12) → Console tab

Look for:
- ✅ No CORS errors
- ✅ No authentication errors
- ✅ Successful webhook responses
- ❌ Check for any error messages

---

## Common Issues and Solutions

### Issue 1: "N8N webhook URL is not configured"

**Cause:** Environment variable not loaded

**Solution:**
1. Verify `.env` file exists in project root
2. Restart development server (`npm run dev`)
3. Check environment variable name is correct (must start with `VITE_`)

### Issue 2: Webhook returns 401 Unauthorized

**Cause:** API key mismatch between frontend and n8n

**Solution:**
1. Verify API key in `.env` matches n8n workflow configuration
2. Check header name in n8n is `X-Webhook-Auth`
3. Ensure no extra spaces in the API key value

### Issue 3: Webhook returns 404 Not Found

**Cause:** Webhook URL is incorrect

**Solution:**
1. Verify webhook URL in `.env` matches n8n workflow
2. Check n8n workflow is activated
3. Ensure webhook path is exactly the same (case-sensitive)

### Issue 4: CORS errors in browser

**Cause:** n8n webhook response missing CORS headers

**Solution:**
1. Add CORS headers in n8n workflow response node
2. See N8N_WORKFLOW_SETUP.md for correct header configuration

### Issue 5: OpenRouter errors

**Cause:** API key invalid or no credits

**Solution:**
1. Verify OpenRouter API key is valid
2. Check OpenRouter account has credits
3. Verify model name is correct in n8n workflow

---

## Security Best Practices

### DO:
✅ Use strong, randomly generated API keys (32+ characters)
✅ Keep API keys in `.env` file (never commit to git)
✅ Use different keys for development and production
✅ Rotate API keys periodically (every 90 days)
✅ Monitor API usage and set alerts

### DON'T:
❌ Share API keys in chat, email, or documentation
❌ Commit `.env` file to version control
❌ Use simple or guessable API keys
❌ Expose keys in client-side code (use environment variables)
❌ Use the same key across multiple projects

---

## Production Deployment

When deploying to production:

1. **Set environment variables in hosting platform:**
   - Vercel: Settings → Environment Variables
   - Netlify: Site settings → Environment → Environment variables
   - Other platforms: Follow their environment variable setup guide

2. **Use production-specific values:**
   - Different webhook API key than development
   - Production webhook URL (if different)
   - Production Supabase credentials

3. **Update CORS in n8n:**
   - Change `Access-Control-Allow-Origin` from `*` to your domain
   - Example: `https://bookmarketerai.com`

4. **Enable rate limiting:**
   - Configure rate limits in n8n workflow
   - Monitor usage patterns
   - Set up alerts for unusual activity

---

## Environment Variables Reference

| Variable | Required | Type | Default | Description |
|----------|----------|------|---------|-------------|
| `VITE_SUPABASE_URL` | ✅ Yes | URL | None | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ Yes | String | None | Supabase anonymous key |
| `VITE_N8N_WEBHOOK_URL` | ✅ Yes | URL | Hardcoded | N8N webhook endpoint |
| `VITE_N8N_WEBHOOK_API_KEY` | ⚠️ Recommended | String | None | Webhook authentication key |
| `VITE_OPENROUTER_API_KEY` | ℹ️ Optional | String | None | OpenRouter API key (backup) |

---

## Next Steps

1. ✅ Generate webhook API key
2. ✅ Update `.env` file with new keys
3. ✅ Configure API key in n8n workflow
4. ✅ Restart development server
5. ✅ Test webhook integration
6. ✅ Verify chat functionality works
7. ✅ Monitor for errors in console

---

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review n8n workflow logs for errors
3. Check browser console for error messages
4. Verify all environment variables are set correctly
5. Refer to N8N_WORKFLOW_SETUP.md for workflow configuration

---

**Last Updated:** November 6, 2024
**Version:** 1.0
