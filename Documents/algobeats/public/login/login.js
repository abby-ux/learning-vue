// public/login/login.js
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = event.target.username.value;
    const password = event.target.password.value;
  
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        username,
        password
      })
    });
  
    const result = await response.text();
    if (response.ok) {
      alert('Login successful');
    } else {
      alert('Login failed: ' + result);
    }
  });
  