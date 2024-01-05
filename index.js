let postsArr = []
const newPostForm = document.getElementById('new-post-form')


// Render posts to the DOM
function renderPosts() {
    let html = ""
        for (let post of postsArr) {
            html += `
                <h3 class="post-title">${post.title}</h3>
                <p class="post-body">${post.body}</p>
                <hr />
            `
        }
        document.getElementById("blog-list").innerHTML = html
}


// Fetch the posts from the server and assign them to the posts array
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArr = data.slice(0, 5)
        renderPosts()
    })
    

// Handle new post form submit
newPostForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const newPostFormData = new FormData(newPostForm)
    const data = Object.fromEntries(newPostFormData.entries())
    
    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.json())
    .then(post => {
        postsArr.unshift(post)
        renderPosts()
        newPostForm.reset()
    })
})