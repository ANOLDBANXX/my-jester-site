// JESTER frontend application
const state = { theme: localStorage.getItem("jester-theme") || "light", currentChat: "Maya Rose" };

document.addEventListener("DOMContentLoaded", () => {
  if (state.theme === "dark") document.body.classList.add("dark");
  document.getElementById("globalSearch")?.addEventListener("input", searchSite);
  document.getElementById("chatSearch")?.addEventListener("input", searchChats);
});

function showSection(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");
  document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.section === id));
  window.scrollTo({top: 0, behavior: "smooth"});
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("jester-theme", document.body.classList.contains("dark") ? "dark" : "light");
}

function toggleNotifications() {
  document.getElementById("notifications").classList.toggle("open");
  document.getElementById("notificationDot").style.display = "none";
}

function showToast(message) {
  const t = document.getElementById("toast");
  t.textContent = message; t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

function toggleLike(button) {
  const post = button.closest(".post");
  const count = post.querySelector(".like-count");
  const liked = button.dataset.liked === "true";
  const number = Number(count.textContent);
  button.dataset.liked = (!liked).toString();
  button.textContent = liked ? "♡" : "♥";
  count.textContent = liked ? number - 1 : number + 1;
}

function focusComment(el) {
  const post = el.closest(".post");
  post?.querySelector(".comment-row input")?.focus();
}

function handleComment(event, input) {
  if (event.key === "Enter") submitComment(input);
}

function submitComment(buttonOrInput) {
  const row = buttonOrInput.closest(".comment-row");
  const input = row.querySelector("input");
  if (!input.value.trim()) return;
  showToast("Comment added");
  input.value = "";
}

function openComposer() {
  document.getElementById("composer").classList.add("open");
}
function closeComposer() {
  document.getElementById("composer").classList.remove("open");
}

function createPost() {
  const text = document.getElementById("postText").value.trim();
  const media = document.getElementById("mediaInput").files[0];
  if (!text && !media) { showToast("Add text or a photo/video first"); return; }

  const post = document.createElement("article");
  post.className = "post";
  post.innerHTML = `
    <div class="post-head">
      <div class="user"><div class="avatar">A</div><div><strong>You</strong><small>@yourusername · now</small></div></div>
      <button class="more">•••</button>
    </div>
    ${media && media.type.startsWith("image/") ? `<img class="post-media" style="width:100%;object-fit:cover" src="${URL.createObjectURL(media)}">` :
      `<div class="post-media gradient-two"><div class="media-text">YOUR<br>JESTER<br>MOMENT</div></div>`}
    <div class="post-actions"><button onclick="toggleLike(this)">♡</button><button onclick="focusComment(this)">◯</button><button>↗</button><button class="save">♧</button></div>
    <div class="likes"><b class="like-count">0</b> likes</div>
    <p class="caption"><b>You</b> ${escapeHtml(text)}</p>
    <div class="comment-row"><input placeholder="Add a comment..." onkeydown="handleComment(event, this)"><button onclick="submitComment(this)">Post</button></div>`;
  document.getElementById("feed").prepend(post);
  document.getElementById("postText").value = "";
  document.getElementById("mediaInput").value = "";
  closeComposer(); showSection("home"); showToast("Posted to JESTER");
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

function selectChat(name, initial, preview) {
  state.currentChat = name;
  document.getElementById("chatName").textContent = name;
  document.getElementById("chatAvatar").textContent = initial;
  document.getElementById("chatMessages").innerHTML = `
    <div class="bubble received">${escapeHtml(preview)}</div>
    <div class="bubble sent">Sounds good! 👍</div>`;
  document.querySelectorAll(".chat-user").forEach(x => x.classList.remove("active"));
  event?.currentTarget?.classList.add("active");
}

function sendOnEnter(e) { if (e.key === "Enter") sendMessage(); }

function sendMessage() {
  const input = document.getElementById("messageInput");
  const value = input.value.trim();
  if (!value) return;
  const msg = document.createElement("div");
  msg.className = "bubble sent"; msg.textContent = value;
  document.getElementById("chatMessages").appendChild(msg);
  input.value = "";
  const box = document.getElementById("chatMessages");
  box.scrollTop = box.scrollHeight;
  setTimeout(() => {
    const reply = document.createElement("div");
    reply.className = "bubble received";
    reply.textContent = "Got it! 👍";
    box.appendChild(reply); box.scrollTop = box.scrollHeight;
  }, 900);
}

function searchChats(e) {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll(".chat-user").forEach(c => {
    c.style.display = c.textContent.toLowerCase().includes(q) ? "grid" : "none";
  });
}

function searchSite(e) {
  const q = e.target.value.trim().toLowerCase();
  if (!q) return;
  if (q.includes("chat") || q.includes("message")) showSection("messages");
  else if (q.includes("reel") || q.includes("video")) showSection("reels");
  else if (q.includes("profile")) showSection("profile");
  else showSection("explore");
}
