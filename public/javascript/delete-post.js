async function deleteFormHandler(event) {
  event.preventDefault(event);
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else alert(response);
}

document
  .querySelector(".delete-post-btn")
  .addEventListener("click", deleteFormHandler);
