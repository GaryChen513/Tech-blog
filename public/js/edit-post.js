const updatepost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-editpost').value;
  const content = document.querySelector('#content-editpost').value;
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        title,
        content,
        
    }),
    headers: {
        'Content-Type': 'application/json'
    }
  });
  
  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#update').addEventListener('click', updatepost)