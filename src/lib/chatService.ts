import { supabase } from './supabase';

export interface ChatMessage {
  id?: string;
  user_id: string;
  marketing_plan_id?: string;
  conversation_id?: string;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
  updated_at?: string;
}

export async function saveChatMessage(message: Omit<ChatMessage, 'id' | 'created_at' | 'updated_at'>): Promise<ChatMessage | null> {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: message.user_id,
        marketing_plan_id: message.marketing_plan_id || null,
        conversation_id: message.conversation_id || null,
        role: message.role,
        content: message.content,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving chat message:', error);
      return null;
    }

    return data as ChatMessage;
  } catch (err) {
    console.error('Exception saving chat message:', err);
    return null;
  }
}

export async function getChatHistory(
  userId: string,
  conversationId?: string,
  marketingPlanId?: string,
  limit: number = 50
): Promise<ChatMessage[]> {
  try {
    let query = supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (conversationId) {
      query = query.eq('conversation_id', conversationId);
    }

    if (marketingPlanId) {
      query = query.eq('marketing_plan_id', marketingPlanId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }

    return data as ChatMessage[];
  } catch (err) {
    console.error('Exception fetching chat history:', err);
    return [];
  }
}

export async function getLatestConversationId(userId: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('conversation_id')
      .eq('user_id', userId)
      .not('conversation_id', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching latest conversation ID:', error);
      return null;
    }

    return data?.conversation_id || null;
  } catch (err) {
    console.error('Exception fetching latest conversation ID:', err);
    return null;
  }
}

export async function deleteConversation(userId: string, conversationId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('user_id', userId)
      .eq('conversation_id', conversationId);

    if (error) {
      console.error('Error deleting conversation:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Exception deleting conversation:', err);
    return false;
  }
}

export function generateConversationId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}
