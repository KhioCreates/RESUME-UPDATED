// Parallax BG effect
const parallax = document.querySelector('.parallax-bg');
window.addEventListener('scroll', () => {
  let y = window.scrollY * 0.18;
  parallax.style.backgroundPosition = `${20 + y}px ${50 + y/2}px, center, ${100-y/1.8}% ${100-y}px`;
});

// Animate cards on entrance
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Animate once
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.card').forEach(card => observer.observe(card));

// Animate skills graph fill
const skillsCard = document.querySelector('.skills-card');
function animateBars() {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.width = bar.dataset.width + "%";
  });
}
let barsAnimated = false;
window.addEventListener('scroll', () => {
  if(!barsAnimated && skillsCard.getBoundingClientRect().top < window.innerHeight-65){
    animateBars();
    barsAnimated = true;
  }
});
if(window.scrollY > 200) animateBars();

// Download Resume button
document.getElementById('downloadBtn').onclick = function(){
  // For demo, just downloads the page as HTML (replace with actual PDF for production)
  const link = document.createElement('a');
  link.href = window.location.href;
  link.download = 'Khio_Ramos_Resume.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const formResponse = document.getElementById('formResponse');
  formResponse.textContent = "Thank you! Your message is sent 🚀";
  setTimeout(()=> { formResponse.textContent = ''; this.reset(); }, 3200);
});
// Comments
const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');
commentForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('commentName').value.trim();
  const comment = document.getElementById('commentText').value.trim();
  if(name && comment){
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML = `<strong>${name}</strong><br>${comment}`;
    commentList.prepend(item);
    commentForm.reset();
  }
});