const deletepost = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/post/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      post_id: id,
    }),
    header: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard')
  } else {
    alert(reponse.statusText);
  }
};

document.querySelector('#delete').addEventListener('click', deletepost)