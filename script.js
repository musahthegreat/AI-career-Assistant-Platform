// theme toggle + persist + smooth scroll + contact form mailto fallback
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('theme');
  if(stored) document.documentElement.setAttribute('data-theme', stored);
  // set initial icon
  toggle.textContent = (document.documentElement.getAttribute('data-theme') === 'dark') ? '☀️' : '🌙';

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    toggle.textContent = isDark ? '🌙' : '☀️';
  });

  // set year in footer
  const year = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = year.toString();

  // contact form: open mailto as fallback
  const form = document.getElementById('contact-form');
  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message').value.trim();
    const subject = encodeURIComponent(`Website message from ${name || 'visitor'}`);
    const bodyParts = [];
    if(msg) bodyParts.push(msg);
    if(email) bodyParts.push(`Reply: ${email}`);
    const body = encodeURIComponent(bodyParts.join('\n\n') || '(no message)');
    // change the email below to your preferred address
    window.location.href = `mailto:musahthegreat@example.com?subject=${subject}&body=${body}`;
  });

  // smooth scrolling for nav anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(!href || href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // update hash without jumping
        history.pushState(null, '', href);
      }
    });
  });
})();
