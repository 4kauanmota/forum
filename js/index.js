const url = "https://jsonplaceholder.typicode.com/posts";

const loading = document.querySelectorAll('.loading');

function getPosts(){
    return fetch(url)
    .then(data => data.json())
    .catch(error => console.log(error))
}
 
async function posts(){
    const posts = await getPosts();

    posts.map((e, i) =>{createPosts(e, i);})

    loading.forEach((e) => {e.classList.add("hide");});
}

function createPosts(post, indice){
    const div = document.createElement('div');
    const postTitle = document.createElement('a');
    const postBody = document.createElement('p');

    postTitle.innerHTML = `${indice + 1}. ` + post.title;
    postTitle.setAttribute('href', `html/post.html?id=${post.id}`);
    postBody.innerHTML = post.body;
    
    div.appendChild(postTitle);
    div.appendChild(postBody);
    document.getElementById('postsContainer').appendChild(div);
}

posts()