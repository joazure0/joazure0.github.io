async function renderPosts() {
  try {
    const response = await fetch("posts.json");
    const postsData = await response.json();

    const main = document.querySelector("#main");
    const postsList = document.querySelector("#sidebar .posts");

    // 기존 글 제거
    main.querySelectorAll(".post").forEach(el => el.remove());
    postsList.innerHTML = "";

    // 글 순서대로 정렬
    const sortedPosts = postsData.sort((a,b) => a.id - b.id);

    sortedPosts.forEach(post => {
      const postUrl = `post.html?id=${post.id}`;

      // 메인 영역
      const mainArticle = document.createElement("article");
      mainArticle.classList.add("post");
      mainArticle.innerHTML = `
        <header>
          <div class="title">
            <h2><a href="${postUrl}">${post.title}</a></h2>
            ${post.subtitle ? `<p>${post.subtitle}</p>` : ''}
          </div>
          <div class="meta">
            <time class="published" datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
            ${post.author ? `<a href="#" class="author">
              <span class="name">${post.author.name}</span>
              <img src="${post.author.img}" alt="" />
            </a>` : ''}
          </div>
        </header>
        ${post.img ? `<a href="${postUrl}" class="image featured"><img src="${post.img.src}" alt="${post.img.alt}" /></a>` : ''}
        ${post.content ? `<p>${post.content}</p>` : ''}
        <footer>
          <ul class="actions">
            <li><a href="${postUrl}" class="button large">Continue Reading</a></li>
          </ul>
        </footer>
      `;
      main.appendChild(mainArticle);

      // 사이드바
      const li = document.createElement("li");
      li.innerHTML = `
        <article>
          <header>
            <h3><a href="${postUrl}">${post.title}</a></h3>
            <time class="published" datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
          </header>
          ${post.img ? `<a href="${postUrl}" class="image"><img src="${post.img.src}" alt="${post.img.alt}" /></a>` : ''}
        </article>
      `;
      postsList.appendChild(li);
    });

  } catch (err) {
    console.error("글 데이터를 불러오지 못했습니다:", err);
  }
}

// DOM 로딩 후 실행
document.addEventListener("DOMContentLoaded", renderPosts);
