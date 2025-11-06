# BookmarketerAI

AI-powered marketing platform for book authors, featuring intelligent chat assistance powered by n8n workflows and OpenRouter AI.

## 🚀 Quick Start

**New to the project?** Start here: [QUICK_START.md](./QUICK_START.md)

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- n8n workflow automation instance
- OpenRouter API account (for AI chat)

## 🔧 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` (if available)
   - Update variables as per [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
   - Generate webhook API key: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

3. **Configure n8n workflow:**
   - See detailed guide: [N8N_WORKFLOW_SETUP.md](./N8N_WORKFLOW_SETUP.md)
   - Import template: [n8n-workflow-template.json](./n8n-workflow-template.json)

4. **Run development server:**
   ```bash
   npm run dev
   ```

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)** - Complete environment configuration guide
- **[N8N_WORKFLOW_SETUP.md](./N8N_WORKFLOW_SETUP.md)** - Detailed n8n workflow setup
- **[n8n-workflow-template.json](./n8n-workflow-template.json)** - Importable workflow template

## 🏗️ Architecture

```
React Frontend → N8N Webhook → OpenRouter AI → Supabase Database
```

### Key Components:

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **AI Integration:** OpenRouter (Claude 3.5 Sonnet)
- **Workflow Automation:** n8n
- **Chat Service:** Custom n8n webhook integration

## 🔐 Environment Variables

Required variables in `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_N8N_WEBHOOK_URL=your_n8n_webhook_url
VITE_N8N_WEBHOOK_API_KEY=your_webhook_api_key
VITE_OPENROUTER_API_KEY=your_openrouter_key (optional)
```

## 🧪 Testing

Run build to verify setup:
```bash
npm run build
```

Test webhook integration:
```bash
curl -X POST $VITE_N8N_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Auth: $VITE_N8N_WEBHOOK_API_KEY" \
  -d '{"message": "Hello", "userId": "test"}'
```

## 🚀 Deployment

Build for production:
```bash
npm run build
npm run preview
```

Deploy to your preferred platform (Vercel, Netlify, etc.) and set environment variables in the hosting dashboard.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Test webhook integration before committing
4. Update documentation for any configuration changes

## 📞 Support

For issues with:
- **Setup:** Check [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
- **N8N Workflow:** See [N8N_WORKFLOW_SETUP.md](./N8N_WORKFLOW_SETUP.md)
- **Quick fixes:** Refer to [QUICK_START.md](./QUICK_START.md)

## 📄 License

Private project - All rights reserved
