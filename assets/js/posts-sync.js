async function renderPosts() {
  try {
    const response = await fetch("posts.json");
    const posts = await response.json();

    const postsList = document.querySelector("#sidebar .posts");
    const postsContainer = document.getElementById("posts-container");

    // 기존 내용 초기화
    postsList.innerHTML = "";
    postsContainer.innerHTML = "";

    posts.forEach(post => {
      // 사이드바 포스트 목록
      const li = document.createElement("li");
      li.innerHTML = `
        <article>
          <header>
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            ${post.date ? `<time class="published">${new Date(post.date).toLocaleDateString()}</time>` : ""}
          </header>
        </article>`;
      postsList.appendChild(li);

      // 메인 페이지 미리보기(요약)
      const article = document.createElement("article");
      article.classList.add("post");
      article.innerHTML = `
        <header>
          <div class="title">
            <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
            ${post.subtitle ? `<p>${post.subtitle}</p>` : ""}
          </div>
          <div class="meta">
            ${post.date ? `<time class="published">${new Date(post.date).toLocaleDateString()}</time>` : ""}
            ${post.author ? `<span class="name">${post.author.name}</span>` : ""}
          </div>
        </header>
        ${post.img ? `<a href="post.html?id=${post.id}" class="image featured">
          <img src="${post.img.src}" alt="${post.img.alt || ""}" />
        </a>` : ""}
        ${post.content ? `<p>${post.content}</p>` : ""}
        <footer>
          <ul class="actions">
            <li><a href="post.html?id=${post.id}" class="button large">Continue Reading</a></li>
          </ul>
        </footer>
      `;
      postsContainer.appendChild(article);
    });

  } catch (err) {
    console.error("글 데이터를 불러오지 못했습니다:", err);
  }
}

document.addEventListener("DOMContentLoaded", renderPosts);
