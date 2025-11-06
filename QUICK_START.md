# Quick Start Guide - N8N & OpenRouter Integration

## 🚀 Setup in 5 Minutes

### Step 1: Generate Webhook API Key
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output (64 character hex string)

### Step 2: Update `.env` File
Replace `your_webhook_api_key_here` with the key you generated:
```env
VITE_N8N_WEBHOOK_API_KEY=paste_your_generated_key_here
```

### Step 3: Configure N8N Workflow

1. Open n8n workflow editor: https://n8n.usatinc.com
2. Find the webhook trigger node
3. Enable Authentication:
   - Type: Header Auth
   - Header Name: `X-Webhook-Auth`
   - Header Value: (paste the same key from Step 2)
4. Save and activate workflow

### Step 4: Verify OpenRouter in N8N

1. In n8n workflow, find the "OpenRouter API" node
2. Verify the API key is set in credentials
3. Confirm the endpoint is: `https://openrouter.ai/api/v1/chat/completions`
4. Check model is set to: `anthropic/claude-3.5-sonnet`

### Step 5: Test

```bash
# Test the webhook
curl -X POST https://n8n.usatinc.com/webhook/f97b5212-483e-4e5d-a2bc-4760649f187f/chat \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Auth: YOUR_KEY_HERE" \
  -d '{"message": "Hello, test message", "userId": "test-123"}'
```

Expected response:
```json
{
  "success": true,
  "response": "AI response here...",
  "conversationId": "conv_1234567890"
}
```

### Step 6: Run the Application

```bash
npm run dev
```

Navigate to the chat interface and send a message!

---

## ✅ Checklist

- [ ] Webhook API key generated
- [ ] `.env` file updated with API key
- [ ] N8N webhook configured with authentication
- [ ] OpenRouter API key verified in n8n
- [ ] Test curl command successful
- [ ] Application running and chat working

---

## 📚 Detailed Documentation

- **Full Setup Guide:** `ENVIRONMENT_SETUP.md`
- **N8N Workflow Configuration:** `N8N_WORKFLOW_SETUP.md`
- **Workflow Template:** `n8n-workflow-template.json`

---

## 🔧 Troubleshooting

### Chat not working?
1. Check browser console for errors (F12)
2. Verify `.env` file has all variables
3. Restart dev server: `npm run dev`

### Webhook returns 401?
- API key in `.env` must match n8n configuration exactly
- Check for extra spaces or quotes

### No response from AI?
- Verify OpenRouter has credits
- Check n8n workflow is activated
- Review n8n execution logs for errors

---

## 🆘 Quick Help

**Can't generate API key?**
```bash
# Alternative method using openssl
openssl rand -hex 32
```

**Need to view current env vars?**
```bash
cat .env
```

**Check if webhook is accessible?**
```bash
curl -I https://n8n.usatinc.com/webhook/f97b5212-483e-4e5d-a2bc-4760649f187f/chat
```

---

**Ready to go? Start at Step 1! 🎉**
