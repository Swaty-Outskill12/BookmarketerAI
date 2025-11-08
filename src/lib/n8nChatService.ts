import { saveChatMessage, generateConversationId } from './chatService';

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://ankursaxenaiit.app.n8n.cloud/webhook/f97b5212-483e-4e5d-a2bc-4760649f187f/chat';
const N8N_WEBHOOK_API_KEY = import.meta.env.VITE_N8N_WEBHOOK_API_KEY;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface N8NWebhookRequest {
  message: string;
  userId?: string;
  conversationId?: string;
  context?: Record<string, unknown>;
}

export interface N8NWebhookResponse {
  response: string;
  conversationId?: string;
  error?: string;
  success?: boolean;
  data?: {
    response?: string;
    message?: string;
    text?: string;
  };
}

export class N8NChatService {
  private static instance: N8NChatService;

  private constructor() {}

  static getInstance(): N8NChatService {
    if (!N8NChatService.instance) {
      N8NChatService.instance = new N8NChatService();
    }
    return N8NChatService.instance;
  }

  async sendMessage(
    message: string,
    userId?: string,
    conversationId?: string,
    context?: Record<string, unknown>
  ): Promise<N8NWebhookResponse> {
    try {
      if (!N8N_WEBHOOK_URL) {
        throw new Error('N8N webhook URL is not configured');
      }

      if (!userId) {
        throw new Error('User ID is required to send messages');
      }

      const finalConversationId = conversationId || generateConversationId();

      console.log('N8N Service: Saving user message to Supabase...');
      await saveChatMessage({
        user_id: userId,
        marketing_plan_id: context?.marketingPlanId as string | undefined,
        conversation_id: finalConversationId,
        role: 'user',
        content: message,
      });

      const payload: N8NWebhookRequest = {
        message,
        userId,
        conversationId: finalConversationId,
        context
      };

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (N8N_WEBHOOK_API_KEY) {
        headers['X-Webhook-Auth'] = N8N_WEBHOOK_API_KEY;
        headers['Authorization'] = `Bearer ${N8N_WEBHOOK_API_KEY}`;
      }

      console.log('N8N Service: Sending message to webhook...');
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = `Webhook request failed: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.error || errorData.message) {
            errorMessage = errorData.error || errorData.message;
          }
        } catch {
          const errorText = await response.text();
          if (errorText) {
            errorMessage = errorText;
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      const aiResponse =
        data.response ||
        data.data?.response ||
        data.data?.message ||
        data.data?.text ||
        data.message ||
        data.text ||
        data.output ||
        'No response from AI';

      console.log('N8N Service: Saving assistant response to Supabase...');
      await saveChatMessage({
        user_id: userId,
        marketing_plan_id: context?.marketingPlanId as string | undefined,
        conversation_id: finalConversationId,
        role: 'assistant',
        content: aiResponse,
      });

      return {
        response: aiResponse,
        conversationId: finalConversationId,
        success: data.success !== false,
      };
    } catch (error) {
      console.error('Error sending message to n8n webhook:', error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error('Failed to send message. Please check your connection and try again.');
    }
  }

  generateMessageId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const n8nChatService = N8NChatService.getInstance();
