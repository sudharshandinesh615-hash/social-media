async function loadPosts() {
    let box = document.getElementById("feed");
    box.innerHTML = "Loading...";

    let res = await fetch("http://localhost:3000/posts");
    let posts = await res.json();
    box.innerHTML = "";

    posts.reverse().forEach((p, i) => {
        box.innerHTML += `
        <div class="post">
            <b>${p.user}</b><br>
            ${p.message}<br>
            ❤ Likes: ${p.likes}<br>
            <span class="time">${p.time}</span><br>

            <button onclick="likePost(${i})">❤ Like</button>
            <button onclick="editPost(${i}, \${p.message}\)">✏ Edit</button>
            <button onclick="deletePost(${i})">🗑 Delete</button>
        </div>`;
    });
}

async function addPost() {
    let user = document.getElementById("user").value;
    let msg = document.getElementById("msg").value;

    if (!user || !msg) return alert("Enter details!");

    await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user, message: msg})
    });

    document.getElementById("msg").value = "";
    loadPosts();
}

async function deletePost(id) {
    await fetch("http://localhost:3000/delete", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id})
    });
    loadPosts();
}

async function editPost(id, oldMsg) {
    let newMsg = prompt("Edit your post:", oldMsg);
    if (!newMsg) return;

    await fetch("http://localhost:3000/update", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id, message: newMsg})
    });
    loadPosts();
}

async function likePost(id) {
    await fetch("http://localhost:3000/like", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id})
    });
    loadPosts();
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

loadPosts();
