# N8N Workflow Configuration Guide

## Overview
This document provides step-by-step instructions for configuring the n8n workflow to integrate with OpenRouter AI and handle chat requests from the BookmarketerAI application.

## Prerequisites
- Access to n8n workflow editor at https://n8n.usatinc.com
- OpenRouter API key (get one at https://openrouter.ai)
- Webhook API key for authentication (generate a secure random string)

## Workflow Architecture

```
[Webhook Trigger] → [Validate Request] → [Fetch Chat History] → [Build Context] → [Call OpenRouter] → [Format Response] → [Return to Webhook]
```

## Step-by-Step Configuration

### 1. Webhook Trigger Node Setup

**Node Type:** Webhook

**Configuration:**
- **Webhook Path:** `/webhook/f97b5212-483e-4e5d-a2bc-4760649f187f/chat`
- **HTTP Method:** POST
- **Response Mode:** "Respond to Webhook" or "Last Node"
- **Response Code:** 200

**Authentication:**
- **Authentication:** Header Auth
- **Header Name:** `X-Webhook-Auth` or `Authorization`
- **Expected Value:** Your webhook API key (set in credentials)

**Response Headers:**
```json
{
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Webhook-Auth"
}
```

**Expected Request Body:**
```json
{
  "message": "User's chat message",
  "userId": "uuid-of-user",
  "conversationId": "optional-conversation-id",
  "context": {
    "marketingPlanId": "optional-plan-id"
  }
}
```

---

### 2. Request Validation Node

**Node Type:** IF / Switch

**Purpose:** Validate that required fields are present

**Conditions:**
```javascript
// Check if message exists and is not empty
{{ $json.body.message && $json.body.message.trim().length > 0 }}
```

**On Validation Failure:**
- Return error response:
```json
{
  "success": false,
  "error": "Message is required and cannot be empty",
  "response": "Sorry, I didn't receive a valid message. Please try again."
}
```

---

### 3. Fetch Chat History (Optional)

**Node Type:** Supabase

**Purpose:** Retrieve previous conversation messages for context

**Configuration:**
- **Operation:** Select Rows
- **Table:** chat_messages
- **Filters:**
  - `user_id` equals `{{ $json.body.userId }}`
  - `conversation_id` equals `{{ $json.body.conversationId }}` (if provided)
- **Order By:** created_at ASC
- **Limit:** 10 (last 10 messages for context)

**Credentials:**
- **Supabase URL:** Your Supabase project URL
- **Supabase Key:** Service role key (not anon key, for server-side operations)

---

### 4. Build Context Node

**Node Type:** Code / Function

**Purpose:** Format conversation history and context for OpenRouter

**JavaScript Code:**
```javascript
// Get webhook data
const webhookData = $input.first().json.body;
const chatHistory = $input.all()[1]?.json || [];

// Build messages array for OpenRouter
const messages = [];

// Add system prompt
messages.push({
  role: "system",
  content: "You are an AI assistant for BookmarketerAI, helping authors create effective marketing strategies for their books. Be helpful, professional, and provide actionable advice. Ask clarifying questions when needed to understand the author's book, genre, target audience, and marketing goals."
});

// Add chat history
chatHistory.forEach(msg => {
  if (msg.role === 'user' || msg.role === 'assistant') {
    messages.push({
      role: msg.role,
      content: msg.content
    });
  }
});

// Add current message
messages.push({
  role: "user",
  content: webhookData.message
});

return {
  messages: messages,
  userId: webhookData.userId,
  conversationId: webhookData.conversationId,
  context: webhookData.context
};
```

---

### 5. OpenRouter API Request Node

**Node Type:** HTTP Request

**Configuration:**

**Request Method:** POST

**URL:** `https://openrouter.ai/api/v1/chat/completions`

**Authentication:**
- Type: Header Auth
- Header Name: `Authorization`
- Value: `Bearer YOUR_OPENROUTER_API_KEY`

**Headers:**
```json
{
  "Content-Type": "application/json",
  "HTTP-Referer": "https://bookmarketerai.com",
  "X-Title": "BookmarketerAI"
}
```

**Body (JSON):**
```json
{
  "model": "anthropic/claude-3.5-sonnet",
  "messages": "={{ $json.messages }}",
  "temperature": 0.7,
  "max_tokens": 1000,
  "top_p": 1,
  "stream": false
}
```

**Recommended Models:**
- `anthropic/claude-3.5-sonnet` - Best quality, balanced cost
- `anthropic/claude-3-haiku` - Fast and economical
- `openai/gpt-4-turbo` - Alternative high-quality option
- `openai/gpt-3.5-turbo` - Economical option

**Timeout:** 30000ms (30 seconds)

---

### 6. Parse OpenRouter Response Node

**Node Type:** Code / Function

**Purpose:** Extract the AI response from OpenRouter's response format

**JavaScript Code:**
```javascript
const openRouterResponse = $input.first().json;

// Extract the AI's message
let aiMessage = '';

if (openRouterResponse.choices && openRouterResponse.choices.length > 0) {
  aiMessage = openRouterResponse.choices[0].message.content;
} else if (openRouterResponse.error) {
  aiMessage = `I apologize, but I encountered an error: ${openRouterResponse.error.message}. Please try again.`;
} else {
  aiMessage = 'I apologize, but I was unable to generate a response. Please try again.';
}

// Get the conversation data from previous node
const contextData = $('Build Context').first().json;

return {
  response: aiMessage,
  conversationId: contextData.conversationId || `conv_${Date.now()}`,
  userId: contextData.userId,
  success: true,
  metadata: {
    model: openRouterResponse.model,
    tokensUsed: openRouterResponse.usage?.total_tokens || 0
  }
};
```

---

### 7. Save Response to Database (Optional)

**Node Type:** Supabase

**Purpose:** Store the assistant's response in the database

**Configuration:**
- **Operation:** Insert Row
- **Table:** chat_messages
- **Data:**
```json
{
  "user_id": "={{ $json.userId }}",
  "conversation_id": "={{ $json.conversationId }}",
  "role": "assistant",
  "content": "={{ $json.response }}",
  "created_at": "={{ new Date().toISOString() }}",
  "updated_at": "={{ new Date().toISOString() }}"
}
```

---

### 8. Format Final Response Node

**Node Type:** Code / Function or Respond to Webhook

**Purpose:** Format the response to match what the frontend expects

**Response Body:**
```json
{
  "success": true,
  "response": "={{ $json.response }}",
  "conversationId": "={{ $json.conversationId }}",
  "timestamp": "={{ new Date().toISOString() }}"
}
```

---

## Error Handling

### Global Error Handler

Add an error workflow or error handling nodes that catch any failures and return:

```json
{
  "success": false,
  "error": "An unexpected error occurred",
  "response": "I apologize, but I'm having trouble processing your request. Please try again in a moment.",
  "conversationId": "={{ $json.conversationId || null }}"
}
```

### Common Errors to Handle:

1. **OpenRouter API Errors:**
   - Rate limit exceeded
   - Invalid API key
   - Model unavailable
   - Request timeout

2. **Database Errors:**
   - Connection failure
   - Invalid user ID
   - RLS policy violations

3. **Validation Errors:**
   - Empty message
   - Missing required fields
   - Invalid request format

---

## Testing the Workflow

### Test Request (using cURL):

```bash
curl -X POST https://n8n.usatinc.com/webhook/f97b5212-483e-4e5d-a2bc-4760649f187f/chat \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Auth: your_webhook_api_key" \
  -d '{
    "message": "Hello! I am writing a fantasy novel and need help marketing it.",
    "userId": "test-user-123",
    "conversationId": "test-conv-456"
  }'
```

### Expected Response:

```json
{
  "success": true,
  "response": "Hello! I'd be happy to help you market your fantasy novel. To create the most effective marketing strategy, I'd like to learn more about your book. Could you tell me:\n\n1. What's the title of your fantasy novel?\n2. What sub-genre does it fall into (epic fantasy, urban fantasy, dark fantasy, etc.)?\n3. Who is your target audience?\n4. What makes your book unique?\n\nThis information will help me provide tailored marketing advice for your specific situation.",
  "conversationId": "test-conv-456",
  "timestamp": "2024-11-06T18:30:00.000Z"
}
```

---

## Environment Variables

Update your application's `.env` file with:

```env
VITE_N8N_WEBHOOK_URL=https://n8n.usatinc.com/webhook/f97b5212-483e-4e5d-a2bc-4760649f187f/chat
VITE_N8N_WEBHOOK_API_KEY=your_webhook_api_key_here
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

---

## Security Best Practices

1. **Webhook Authentication:**
   - Generate a strong random API key (at least 32 characters)
   - Store it securely in n8n credentials
   - Never expose it in client-side code

2. **OpenRouter API Key:**
   - Keep it in n8n credentials only
   - Set usage limits in OpenRouter dashboard
   - Monitor API usage regularly

3. **Rate Limiting:**
   - Implement rate limiting in n8n (e.g., max 10 requests per minute per user)
   - Use n8n's built-in rate limiter or custom code

4. **Input Validation:**
   - Validate all incoming data
   - Sanitize user input to prevent injection attacks
   - Set maximum message length (e.g., 2000 characters)

5. **CORS Configuration:**
   - Only allow requests from your application's domain in production
   - For development, use `*` but restrict in production

---

## Monitoring and Logging

### Add Logging Nodes:

1. **Request Logger:**
   - Log incoming requests with userId and timestamp
   - Track conversation IDs

2. **Response Logger:**
   - Log successful responses
   - Track token usage from OpenRouter

3. **Error Logger:**
   - Log all errors with stack traces
   - Alert on critical failures

### Recommended Monitoring:

- Track average response time
- Monitor OpenRouter API usage and costs
- Alert on error rate > 5%
- Track most common user questions
- Monitor conversation abandonment rate

---

## Workflow JSON Export

To export your workflow configuration:

1. Open the workflow in n8n editor
2. Click the three dots menu (⋮) in the top right
3. Select "Download"
4. Save the JSON file
5. Store it in version control for backup

---

## Troubleshooting

### Issue: Webhook returns 404
- **Solution:** Verify webhook path matches exactly
- Check that webhook node is activated

### Issue: Authentication fails
- **Solution:** Verify API key is correctly set in headers
- Check n8n credentials configuration

### Issue: OpenRouter returns errors
- **Solution:** Verify API key is valid
- Check account has credits
- Verify model name is correct

### Issue: Slow responses
- **Solution:** Reduce max_tokens in OpenRouter request
- Consider using faster model (claude-3-haiku)
- Check if database queries are optimized

### Issue: CORS errors in browser
- **Solution:** Add proper CORS headers in webhook response
- Verify domain is whitelisted

---

## Next Steps

1. ✅ Configure webhook authentication in n8n
2. ✅ Set up OpenRouter API credentials
3. ✅ Test workflow with sample requests
4. ✅ Monitor initial conversations
5. ✅ Optimize based on usage patterns
6. ✅ Set up alerting for errors
7. ✅ Document any customizations

---

## Support Resources

- **n8n Documentation:** https://docs.n8n.io
- **OpenRouter API Docs:** https://openrouter.ai/docs
- **Supabase Docs:** https://supabase.com/docs

---

**Last Updated:** November 6, 2024
**Version:** 1.0
