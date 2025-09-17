async function renderPosts() {
  try {
    const response = await fetch("posts.json");
    const postsData = await response.json();

    const main = document.querySelector("#main");
    const postsList = document.querySelector("#sidebar .posts");

    // 기존 글 제거
    main.querySelectorAll(".post").forEach(el => el.remove());
    postsList.innerHTML = "";

    postsData.forEach(post => {
      // 메인 영역
      const mainArticle = document.createElement("article");
      mainArticle.classList.add("post");
      mainArticle.innerHTML = `
        <header>
          <div class="title">
            <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
            <p>${post.subtitle}</p>
          </div>
          <div class="meta">
            <time class="published" datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
            <a href="#" class="author">
              <span class="name">${post.author.name}</span>
              <img src="${post.author.img}" alt="" />
            </a>
          </div>
        </header>
        <a href="post.html?id=${post.id}" class="image featured">
          <img src="${post.img.src}" alt="${post.img.alt}" />
        </a>
        <p>${post.content}</p>
        <footer>
          <ul class="actions">
            <li><a href="post.html?id=${post.id}" class="button large">Continue Reading</a></li>
          </ul>
        </footer>
      `;
      main.appendChild(mainArticle);

      // 사이드바
      const li = document.createElement("li");
      li.innerHTML = `
        <article>
          <header>
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <time class="published" datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
          </header>
          <a href="post.html?id=${post.id}" class="image">
            <img src="${post.img.src}" alt="${post.img.alt}" />
          </a>
        </article>
      `;
      postsList.appendChild(li);
    });

  } catch (err) {
    console.error("글 데이터를 불러오지 못했습니다:", err);
  }
}

document.addEventListener("DOMContentLoaded", renderPosts);
