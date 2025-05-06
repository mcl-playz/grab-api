function apiFetch(url, options = {}) {
    const token = localStorage.getItem('token');
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.status === 401 || res.status === 403) {
        // token expired or invalid, maybe redirect to login
        localStorage.removeItem('token');
        window.location.href = '/logout';
      }
      return res.json();
    });
  }