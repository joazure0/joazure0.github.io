async function renderPosts() {
  try {
    const response = await fetch("posts.json");
    const posts = await response.json();

    const postsList = document.querySelector("#sidebar .posts");
    const postsContainer = document.getElementById("posts-container");

    // POSTS 목록이 있으면 채우기
    if (postsList) {
      postsList.innerHTML = "";
      posts.forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `
          <article>
            ${post.img ? `<a href="post.html?id=${post.id}" class="image"><img src="${post.img.src}" alt="${post.img.alt || ""}" /></a>` : ""}
            <header>
              <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
              ${post.date ? `<time class="published">${new Date(post.date).toISOString().slice(0,10)}</time>` : ""}
            </header>
          </article>`;
        postsList.appendChild(li);
      });
    }

    // 메인 페이지(posts-container)가 있으면 미리보기 채우기
    if (postsContainer) {
      postsContainer.innerHTML = "";
      posts.forEach(post => {
        const preview = post.content ? post.content.replace(/<[^>]+>/g,"").slice(0,120)+"..." : "";
        const article = document.createElement("article");
        article.classList.add("post");
        article.innerHTML = `
          <header>
            <div class="title">
              <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
              ${post.subtitle ? `<p>${post.subtitle}</p>` : ""}
            </div>
            <div class="meta">
              ${post.date ? `<time class="published">${new Date(post.date).toISOString().slice(0,10)}</time>` : ""}
              ${post.author ? `<span class="name">${post.author.name}</span>` : ""}
            </div>
          </header>
          ${post.img ? `<a href="post.html?id=${post.id}" class="image featured"><img src="${post.img.src}" alt="${post.img.alt || ""}" /></a>` : ""}
          <p>${preview}</p>
          <footer>
            <ul class="actions">
              <li><a href="post.html?id=${post.id}" class="button large">Continue Reading</a></li>
            </ul>
          </footer>
        `;
        postsContainer.appendChild(article);
      });
    }

  } catch (err) {
    console.error("글 데이터를 불러오지 못했습니다:", err);
  }
}

document.addEventListener("DOMContentLoaded", renderPosts);
