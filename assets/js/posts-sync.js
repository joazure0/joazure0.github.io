(async function() {
    const contentEl = document.getElementById('post-content');
    const prevBtn = document.getElementById('prev-post');
    const nextBtn = document.getElementById('next-post');

    // URL에서 id 가져오기
    const params = new URLSearchParams(window.location.search);
    let id = parseInt(params.get('id'));

    // posts.json 불러오기
    const res = await fetch('posts.json');
    const posts = await res.json();

    // 현재 포스트 찾기
    let post = posts.find(p => p.id === id);
    if (!post) {
        contentEl.innerHTML = "<p>글을 찾을 수 없습니다.</p>";
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
    }

    // 글 내용 렌더링
    contentEl.innerHTML = `
        <header>
            <div class="title">
                <h2>${post.title}</h2>
                ${post.subtitle ? `<p>${post.subtitle}</p>` : ''}
            </div>
            <div class="meta">
                <time class="published">${new Date(post.date).toLocaleDateString()}</time>
                ${post.author ? `<a href="#" class="author"><span class="name">${post.author.name}</span>
                ${post.author.img ? `<img src="${post.author.img}" alt="">` : ''}</a>` : ''}
            </div>
        </header>
        ${post.img ? `<span class="image featured"><img src="${post.img.src}" alt="${post.img.alt}"></span>` : ''}
        ${post.content ? `<p>${post.content}</p>` : ''}
    `;

    // 이전/다음 버튼 표시 여부
    const currentIndex = posts.findIndex(p => p.id === id);
    prevBtn.style.display = currentIndex > 0 ? 'inline-block' : 'none';
    nextBtn.style.display = currentIndex < posts.length - 1 ? 'inline-block' : 'none';

    // 버튼 클릭 이벤트
    prevBtn.onclick = () => {
        const prevId = posts[currentIndex - 1].id;
        window.location.href = `post.html?id=${prevId}`;
    };
    nextBtn.onclick = () => {
        const nextId = posts[currentIndex + 1].id;
        window.location.href = `post.html?id=${nextId}`;
    };
})();
