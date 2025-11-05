import { supabase } from './supabase';

export interface StoredChatMessage {
  id: string;
  user_id: string;
  marketing_plan_id?: string;
  conversation_id?: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  updated_at?: string;
}

export async function saveMessage(
  userId: string,
  role: 'user' | 'assistant',
  content: string,
  conversationId?: string,
  marketingPlanId?: string
): Promise<StoredChatMessage | null> {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        role,
        content,
        conversation_id: conversationId,
        marketing_plan_id: marketingPlanId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving message:', error);
      return null;
    }

    return data as StoredChatMessage;
  } catch (error) {
    console.error('Error saving message:', error);
    return null;
  }
}

export async function loadChatHistory(
  userId: string,
  conversationId?: string,
  limit: number = 50
): Promise<StoredChatMessage[]> {
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

    const { data, error } = await query;

    if (error) {
      console.error('Error loading chat history:', error);
      return [];
    }

    return (data || []) as StoredChatMessage[];
  } catch (error) {
    console.error('Error loading chat history:', error);
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

    if (error || !data) {
      return null;
    }

    return data.conversation_id;
  } catch (error) {
    console.error('Error getting latest conversation ID:', error);
    return null;
  }
}

export async function hasUserChatHistory(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('id')
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error checking chat history:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking chat history:', error);
    return false;
  }
}

export async function insertWelcomeMessage(userId: string): Promise<StoredChatMessage | null> {
  const welcomeMessage = "Tell us about your book (name, genre, summary)";

  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        role: 'assistant',
        content: welcomeMessage,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting welcome message:', error);
      return null;
    }

    return data as StoredChatMessage;
  } catch (error) {
    console.error('Error inserting welcome message:', error);
    return null;
  }
}
