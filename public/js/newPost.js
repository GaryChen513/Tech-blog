const newpost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-newpost').value;
  const content = document.querySelector('#content-newpost').value;

  if (title && content) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText)
    }
  }
};

document.querySelector('.newpost-form').addEventListener('submit', newpost);