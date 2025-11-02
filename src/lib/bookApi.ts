import { supabase } from './supabase';

export interface BookInfo {
  bookTitle?: string;
  authorName?: string;
  bookType?: string;
  formats?: string[];
  genre?: string;
  marketingBudget?: string;
  bookPrice?: string;
  bookCost?: string;
  painPoints?: string[];
  targetAudience?: string[];
  geography?: string[];
  competitors?: string[];
  uniqueOfferings?: string[];
  brandVoice?: string;
}

export interface BookBriefRecord {
  id?: string;
  user_id: string;
  author_id?: string;
  book_title?: string;
  author_name?: string;
  book_type?: string;
  format?: string[];
  genre?: string;
  marketing_budget?: number;
  book_price?: number;
  book_cost?: number;
  pain_points?: string[];
  target_audience?: string[];
  geography?: string[];
  competitors?: string[];
  unique_offerings?: string[];
  brand_voice?: string;
  created_at?: string;
  updated_at?: string;
}

export async function fetchBookInfo(authorId: string): Promise<BookInfo | null> {
  try {
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get_book_info`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ author_id: authorId })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch book info: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      bookTitle: data.book_title || data.bookTitle,
      authorName: data.author_name || data.authorName,
      bookType: data.book_type || data.bookType,
      formats: data.formats || data.format || [],
      genre: data.genre,
      marketingBudget: data.marketing_budget?.toString() || data.marketingBudget?.toString(),
      bookPrice: data.book_price?.toString() || data.bookPrice?.toString(),
      bookCost: data.book_cost?.toString() || data.bookCost?.toString(),
      painPoints: data.pain_points || data.painPoints || [],
      targetAudience: data.target_audience || data.targetAudience || [],
      geography: data.geography || [],
      competitors: data.competitors || [],
      uniqueOfferings: data.unique_offerings || data.uniqueOfferings || [],
      brandVoice: data.brand_voice || data.brandVoice,
    };
  } catch (error) {
    console.error('Error fetching book info:', error);
    throw error;
  }
}

export async function saveBookBrief(userId: string, authorId: string, data: BookInfo): Promise<BookBriefRecord> {
  const record: Partial<BookBriefRecord> = {
    user_id: userId,
    author_id: authorId,
    book_title: data.bookTitle,
    author_name: data.authorName,
    book_type: data.bookType,
    format: data.formats,
    genre: data.genre,
    marketing_budget: data.marketingBudget ? parseFloat(data.marketingBudget) : undefined,
    book_price: data.bookPrice ? parseFloat(data.bookPrice) : undefined,
    book_cost: data.bookCost ? parseFloat(data.bookCost) : undefined,
    pain_points: data.painPoints,
    target_audience: data.targetAudience,
    geography: data.geography,
    competitors: data.competitors,
    unique_offerings: data.uniqueOfferings,
    brand_voice: data.brandVoice,
    updated_at: new Date().toISOString()
  };

  const { data: existing, error: fetchError } = await supabase
    .from('book_briefs')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw fetchError;
  }

  if (existing) {
    const { data: updated, error: updateError } = await supabase
      .from('book_briefs')
      .update(record)
      .eq('id', existing.id)
      .select()
      .single();

    if (updateError) throw updateError;
    return updated as BookBriefRecord;
  } else {
    const { data: inserted, error: insertError } = await supabase
      .from('book_briefs')
      .insert(record)
      .select()
      .single();

    if (insertError) throw insertError;
    return inserted as BookBriefRecord;
  }
}

export async function getBookBrief(userId: string): Promise<BookBriefRecord | null> {
  const { data, error } = await supabase
    .from('book_briefs')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}
