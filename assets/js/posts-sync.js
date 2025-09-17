async function renderPosts() {
  try {
    // posts.json 불러오기
    const response = await fetch("posts.json");
    const postsData = await response.json();

    const main = document.querySelector("#main");
    const postsList = document.querySelector("#sidebar .posts");

    // main 영역 기존 글 제거
    main.querySelectorAll(".post").forEach(el => el.remove());

    // sidebar의 ul.posts 내용만 초기화
    postsList.innerHTML = "";

    postsData.forEach(post => {
      // main용 HTML
      const mainArticle = document.createElement("article");
      mainArticle.classList.add("post");
      mainArticle.innerHTML = `
        <header>
          <div class="title">
            <h2><a href="${post.link}">${post.title}</a></h2>
            <p>${post.subtitle}</p>
          </div>
          <div class="meta">
            <time class="published" datetime="${post.date}">
              ${new Date(post.date).toLocaleDateString()}
            </time>
            <a href="#" class="author">
              <span class="name">${post.author.name}</span>
              <img src="${post.author.img}" alt="" />
            </a>
          </div>
        </header>
        <a href="${post.link}" class="image featured">
          <img src="${post.img.src}" alt="${post.img.alt}" />
        </a>
        <p>${post.content}</p>
        <footer>
          <ul class="actions">
            <li><a href="${post.link}" class="button large">Continue Reading</a></li>
          </ul>
        </footer>
      `;
      main.appendChild(mainArticle);

      // sidebar용 HTML (ul.posts)
      const li = document.createElement("li");
      li.innerHTML = `
        <article>
          <header>
            <h3><a href="${post.link}">${post.title}</a></h3>
            <time class="published" datetime="${post.date}">
              ${new Date(post.date).toLocaleDateString()}
            </time>
          </header>
          <a href="${post.link}" class="image">
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

// DOM 로딩 후 실행
document.addEventListener("DOMContentLoaded", renderPosts);
