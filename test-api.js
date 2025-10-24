// Simple test to check API
const testAPI = async () => {
  try {
    console.log('Testing API...');
    const response = await fetch('http://localhost:3000/api/generate-cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topics: ['test'],
        difficulty: 'intermediate'
      })
    });
    
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

testAPI();
