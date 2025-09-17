const main = document.getElementById("main");
const sidebarPosts = document.querySelector(".posts");

fetch("posts.json")
  .then(response => response.json())
  .then(postsData => {

    postsData.forEach(post => {
      // 메인 화면용 article
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

      // 사이드바 목록용 li
      const li = document.createElement("li");
      li.innerHTML = `<a href="${post.link}">${post.title}</a>`;
      sidebarPosts.appendChild(li);
    });

  });
