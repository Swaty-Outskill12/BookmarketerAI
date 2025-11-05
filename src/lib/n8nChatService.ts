const N8N_WEBHOOK_URL = 'https://ankursaxenaiit.app.n8n.cloud/webhook/f97b5212-483e-4e5d-a2bc-4760649f187f/chat';

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
      const payload: N8NWebhookRequest = {
        message,
        userId,
        conversationId,
        context
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook request failed: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        response: data.response || data.message || data.text || 'No response from AI',
        conversationId: data.conversationId || conversationId,
      };
    } catch (error) {
      console.error('Error sending message to n8n webhook:', error);
      throw new Error('Failed to send message. Please try again.');
    }
  }

  generateMessageId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const n8nChatService = N8NChatService.getInstance();
