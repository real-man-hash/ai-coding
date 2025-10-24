// Test NextAuth session
const testSession = async () => {
  try {
    console.log('Testing NextAuth session...');
    
    const response = await fetch('http://localhost:3000/api/auth/session');
    console.log('Session API status:', response.status);
    
    if (response.ok) {
      const session = await response.json();
      console.log('Session data:', session);
    } else {
      const error = await response.text();
      console.error('Session API error:', error);
    }
  } catch (error) {
    console.error('Session test error:', error);
  }
};

testSession();
