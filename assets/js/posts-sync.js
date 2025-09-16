// 글 데이터 배열
const postsData = [
  {
    title: "테스트",
    subtitle: "크리스마스 사진",
    link: "single.html",
    date: "2025-09-16",
    author: { name: "Joseph Song", img: "Christmas1.png" },
    img: { src: "images/pic01.jpg", alt: "" },
    content: "Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at."
  },
  {
    title: "Ultricies sed magna euismod",
    subtitle: "Lorem ipsum dolor amet nullam consequat",
    link: "single.html",
    date: "2015-10-25",
    author: { name: "Jane Doe", img: "images/avatar.jpg" },
    img: { src: "images/pic02.jpg", alt: "" },
    content: "Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at."
  },
  {
    title: "Euismod et accumsan",
    subtitle: "Lorem ipsum dolor amet nullam consequat",
    link: "single.html",
    date: "2015-10-22",
    author: { name: "Jane Doe", img: "images/avatar.jpg" },
    img: { src: "images/pic03.jpg", alt: "" },
    content: "Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at."
  }
  // 필요하면 여기 글 추가 가능
];

// main과 sidebar 동기화 함수
function renderPosts() {
  const main = document.querySelector("#main");
  const postsList = document.querySelector("#sidebar .posts");

  main.innerHTML = "";       // main 초기화
  postsList.innerHTML = "";  // sidebar 초기화

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
          <time class="published" datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
          <a href="#" class="author"><span class="name">${post.author.name}</span><img src="${post.author.img}" alt="" /></a>
        </div>
      </header>
      <a href="${post.link}" class="image featured"><img src="${post.img.src}" alt="${post.img.alt}" /></a>
      <p>${post.content}</p>
      <footer>
        <ul class="actions">
          <li><a href="${post.link}" class="button large">Continue Reading</a></li>
        </ul>
      </footer>
    `;
    main.appendChild(mainArticle);

    // sidebar용 HTML
    const li = document.createElement("li");
    li.innerHTML = `
      <article>
        <header>
          <h3><a href="${post.link}">${post.title}</a></h3>
          <time class="published" datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
        </header>
        <a href="${post.link}" class="image"><img src="${post.img.src}" alt="${post.img.alt}" /></a>
      </article>
    `;
    postsList.appendChild(li);
  });
}

// DOM 로딩 후 실행
document.addEventListener("DOMContentLoaded", renderPosts);
