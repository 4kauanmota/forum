const url = "https://jsonplaceholder.typicode.com/posts";

const postId = new URLSearchParams(window.location.search).get("id");

const loading = document.querySelectorAll(".loading");
const createCommentForm = document.getElementById("createCommentForm");
const email = document.getElementById("email").value;
const body = document.getElementById("body").value;
const postContainer = document.getElementById("postContainer");
const commentsContainer = document.getElementById("commentsContainer");

async function post(postId) {
  const [post, comments] = await Promise.all([
    fetch(`${url}/${postId}`),
    fetch(`${url}/${postId}/comments`),
  ]);
  const commentsData = await comments.json();

  createPost(await post.json());

  commentsData.map((comment) => createComments(comment));

  loading.forEach((e) => {e.classList.add("hide");});
  createCommentForm.classList.remove("hide");
}

function createPost(post) {
  const div = document.createElement("div");
  const postTitle = document.createElement("h1");
  const postBody = document.createElement("p");

  postTitle.innerHTML = post.title;
  postBody.innerHTML = post.body;

  div.appendChild(postTitle);
  div.appendChild(postBody);
  postContainer.appendChild(div);
}

function createComments(comment) {
  const div = document.createElement("div");
  const commentEmail = document.createElement("h3");
  const commentText = document.createElement("p");

  commentEmail.innerText = comment.email;
  commentText.innerText = comment.body;

  div.appendChild(commentEmail);
  div.appendChild(commentText);
  div.classList.add("comment");

  commentsContainer.appendChild(div);
}

async function postComment(comment) {
  const data = await fetch(url, {
    method: "POST",
    body: comment,
    headers: {
      "Content-type": "application/json",
    },
  });

  createComments(await data.json());
}

document.getElementById("createCommentForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let newComment = {
    email: email,
    body: body,
  };

  postComment(JSON.stringify(newComment));
});

post(postId);
