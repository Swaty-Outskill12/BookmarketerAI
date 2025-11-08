# N8N Chat Widget & Supabase Integration - Implementation Summary

## Changes Implemented

### 1. Fixed N8N Chat Widget Mounting
- **File**: `src/components/N8NChatWidget.tsx`
- Added `target: '#n8n-chat-container'` parameter to `createChat()` configuration
- Added unique `id="n8n-chat-container"` to the container div
- Applied fixed positioning with high z-index (9999) for proper visibility
- Added comprehensive console logging for debugging widget initialization
- Enhanced error handling and user feedback

### 2. Created Supabase Chat Message Storage Service
- **File**: `src/lib/chatService.ts` (NEW)
- Implemented `saveChatMessage()` to store messages in Supabase `chat_messages` table
- Created `getChatHistory()` to retrieve conversation history by user/conversation ID
- Added `getLatestConversationId()` to resume previous conversations
- Implemented `deleteConversation()` for conversation management
- Added `generateConversationId()` for unique conversation tracking

### 3. Enhanced N8N Webhook Integration
- **File**: `src/lib/n8nChatService.ts`
- Integrated with Supabase chat storage service
- Automatically saves user messages before sending to webhook
- Stores AI assistant responses after receiving from webhook
- Passes user context (user_id, email, currentPage, marketingPlanId, bookBriefData)
- Generates and maintains conversation IDs for session continuity
- Enhanced error handling and logging

### 4. Implemented Chat Session Management
- **File**: `src/contexts/ChatContext.tsx`
- Added `conversationId` state to track current conversation
- Implemented `setConversationId()` to manage conversation state
- Added `resetConversation()` to start new conversations
- Loads latest conversation ID when user authenticates
- Integrated with authentication context for user-specific data

### 5. Database Structure Verified
All required tables exist in Supabase:
- `profiles` - User profiles linked to auth.users
- `marketing_plans` - User marketing plan data
- `chat_messages` - Chat conversation history
- `book_briefs` - Book information and briefs

All tables have:
- Row Level Security (RLS) enabled
- Proper policies for authenticated users
- Foreign key relationships to profiles table
- Appropriate indexes for performance

## Authentication Flow

The application uses **Supabase Authentication** exclusively:

1. User signs up/logs in via `AuthPage.tsx`
2. Supabase creates user in `auth.users` table
3. Profile is automatically created/updated in `profiles` table
4. User session is managed by Supabase Auth
5. All authenticated API calls use Supabase client with RLS enforcement

## N8N Chat Widget Flow

1. **User authenticates** → Profile created in Supabase
2. **Chat widget loads** on authenticated pages via `PageLayout.tsx`
3. **Widget initializes** with user context (user_id, email, current page)
4. **User sends message** → Saved to Supabase → Sent to N8N webhook
5. **N8N processes** → Returns AI response
6. **Response saved** to Supabase → Displayed in chat widget
7. **Conversation persists** across page navigation via conversation_id

## Key Features

### Chat Widget
- Appears on all authenticated pages (dashboard, book-brief, marketing-plan, etc.)
- Context-aware initial messages based on current page
- Fixed positioning at bottom-right corner
- High z-index ensures visibility above other content
- Properly mounted using target selector

### Message Storage
- All chat messages stored in Supabase `chat_messages` table
- Messages linked to authenticated user via `user_id`
- Conversations tracked via `conversation_id`
- Optional linking to marketing plans via `marketing_plan_id`
- RLS policies ensure users only access their own messages

### Session Persistence
- Conversation IDs stored and retrieved from Supabase
- Users can resume previous conversations
- Chat history maintained across page navigation
- New conversations can be started via `resetConversation()`

## Environment Variables

All configuration is managed through environment variables in `.env`:

```
VITE_SUPABASE_URL=https://ticnjbpxubgaebkbikne.supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
VITE_N8N_WEBHOOK_URL=https://ankursaxenaiit.app.n8n.cloud/webhook/[webhook-id]/chat
VITE_N8N_WEBHOOK_API_KEY=[your-webhook-api-key]
```

## Testing Checklist

To verify the implementation:

1. **Authentication**
   - [ ] User can register with email/password
   - [ ] User can login with existing credentials
   - [ ] Profile is created in Supabase profiles table
   - [ ] User session persists across page refreshes

2. **Chat Widget Visibility**
   - [ ] Widget appears on dashboard page
   - [ ] Widget appears on book-brief page
   - [ ] Widget appears on marketing-plan page
   - [ ] Widget appears on organic-posts page
   - [ ] Widget appears on paid-posts page
   - [ ] Widget appears on facebook-setup page
   - [ ] Widget appears on manage-ads page
   - [ ] Widget does NOT appear on homepage (before login)

3. **Chat Functionality**
   - [ ] User can send messages via chat widget
   - [ ] AI responses are displayed in chat widget
   - [ ] Messages are saved to Supabase chat_messages table
   - [ ] Conversation ID is generated and maintained
   - [ ] Chat history persists across page navigation

4. **Context Awareness**
   - [ ] Initial message changes based on current page
   - [ ] User context (email, user_id) sent to N8N webhook
   - [ ] Marketing plan ID sent when available
   - [ ] Book brief data sent when available

5. **N8N Webhook**
   - [ ] Webhook receives messages from frontend
   - [ ] Webhook has access to user context
   - [ ] Webhook returns AI responses
   - [ ] Response format is properly parsed

## Troubleshooting

### Chat Widget Not Visible
1. Check browser console for N8N Chat Widget logs
2. Verify user is authenticated (user object exists)
3. Confirm VITE_N8N_WEBHOOK_URL is set in .env
4. Check that chat container element exists in DOM
5. Verify no CSS conflicts hiding the widget

### Messages Not Saving
1. Check Supabase RLS policies allow inserts for authenticated users
2. Verify user_id matches authenticated user
3. Check browser console for Supabase errors
4. Confirm chat_messages table exists and is accessible

### N8N Webhook Errors
1. Verify VITE_N8N_WEBHOOK_URL is correct
2. Check VITE_N8N_WEBHOOK_API_KEY is valid
3. Confirm N8N workflow is active and deployed
4. Check N8N workflow logs for execution errors
5. Verify webhook is configured to accept POST requests

## Files Modified/Created

### New Files
- `src/lib/chatService.ts` - Supabase chat message storage service

### Modified Files
- `src/components/N8NChatWidget.tsx` - Added target parameter and enhanced logging
- `src/lib/n8nChatService.ts` - Integrated Supabase storage
- `src/contexts/ChatContext.tsx` - Added conversation management

### Unchanged (Already using Supabase)
- `src/lib/supabase.ts` - Supabase client initialization
- `src/lib/bookApi.ts` - Book brief API (already using Supabase)
- `src/AuthContext.tsx` - Authentication context (already using Supabase)
- `src/AuthPage.tsx` - Authentication UI (already using Supabase)

## Next Steps

1. **Deploy to production** - Ensure all environment variables are set
2. **Configure N8N workflow** - Set up the webhook to process messages
3. **Test end-to-end** - Verify complete flow from authentication to chat
4. **Monitor Supabase** - Check RLS policies and database performance
5. **Add analytics** - Track chat usage and user engagement

## Database Schema

### profiles
- `id` (uuid, PK, references auth.users)
- `email` (text, unique)
- `full_name` (text)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### chat_messages
- `id` (uuid, PK)
- `user_id` (uuid, FK to profiles)
- `marketing_plan_id` (uuid, FK to marketing_plans, nullable)
- `conversation_id` (text, nullable)
- `role` (text: 'user' or 'assistant')
- `content` (text)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### marketing_plans
- `id` (uuid, PK)
- `user_id` (uuid, FK to profiles)
- `book_title` (text)
- `book_genre` (text)
- `target_audience` (text)
- `campaign_goal` (text)
- `monthly_budget` (numeric)
- `plan_data` (jsonb)
- `status` (text)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)
