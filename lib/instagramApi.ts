import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const fetchSavedPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*');

  if (error) {
    console.error('Error fetching saved posts:', error);
    return [];
  }

  return data;
};

const fetchPostDetails = async (postId) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (error) {
    console.error('Error fetching post details:', error);
    return null;
  }

  return data;
};

const authenticateUser = async (code) => {
  const response = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI,
      code,
    }),
  });

  const data = await response.json();

  if (data.error) {
    console.error('Error authenticating user:', data.error);
    return null;
  }

  return data.access_token;
};

const fetchUserProfile = async (accessToken) => {
  const response = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
  const data = await response.json();

  if (data.error) {
    console.error('Error fetching user profile:', data.error);
    return null;
  }

  return data;
};

export { fetchSavedPosts, fetchPostDetails, authenticateUser, fetchUserProfile };
