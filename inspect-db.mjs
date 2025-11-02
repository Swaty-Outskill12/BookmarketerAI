import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zqnshtacjqnzhgylxmst.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbnNodGFjenFuemhneWx4bXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTc0MDcsImV4cCI6MjA3Njk3MzQwN30.9sggCaxN8N8D62YfBDjXtddNcmeuWbidoMsoZ6b0cag';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectDatabase() {
  console.log('=== INSPECTING SUPABASE DATABASE (Outskill AIG4) ===\n');
  
  // Check profiles table
  console.log('1. Checking profiles table:');
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .limit(5);
  
  if (profilesError) {
    console.log('   Error:', profilesError.message);
    console.log('   Code:', profilesError.code);
  } else {
    console.log('   Found', profiles?.length || 0, 'records');
    if (profiles && profiles.length > 0) {
      console.log('   Sample record:', JSON.stringify(profiles[0], null, 2));
    }
  }
  
  // Check marketing_plans table
  console.log('\n2. Checking marketing_plans table:');
  const { data: plans, error: plansError } = await supabase
    .from('marketing_plans')
    .select('*')
    .limit(5);
  
  if (plansError) {
    console.log('   Error:', plansError.message);
    console.log('   Code:', plansError.code);
  } else {
    console.log('   Found', plans?.length || 0, 'records');
    if (plans && plans.length > 0) {
      console.log('   Sample record:', JSON.stringify(plans[0], null, 2));
    }
  }
  
  // Check chat_messages table
  console.log('\n3. Checking chat_messages table:');
  const { data: messages, error: messagesError } = await supabase
    .from('chat_messages')
    .select('*')
    .limit(5);
  
  if (messagesError) {
    console.log('   Error:', messagesError.message);
    console.log('   Code:', messagesError.code);
  } else {
    console.log('   Found', messages?.length || 0, 'records');
    if (messages && messages.length > 0) {
      console.log('   Sample record:', JSON.stringify(messages[0], null, 2));
    }
  }
  
  // Check book_briefs table
  console.log('\n4. Checking book_briefs table:');
  const { data: briefs, error: briefsError } = await supabase
    .from('book_briefs')
    .select('*')
    .limit(5);
  
  if (briefsError) {
    console.log('   Error:', briefsError.message);
    console.log('   Code:', briefsError.code);
  } else {
    console.log('   Found', briefs?.length || 0, 'records');
    if (briefs && briefs.length > 0) {
      console.log('   Sample record:', JSON.stringify(briefs[0], null, 2));
    }
  }
  
  console.log('\n=== INSPECTION COMPLETE ===');
}

inspectDatabase().catch(console.error);
