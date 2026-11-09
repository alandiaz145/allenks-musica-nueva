const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mainNav?.classList.toggle('open', open);
});

mainNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menú');
  });
});

const navLinks = [...document.querySelectorAll('.main-nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const href = `#${entry.target.id}`;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === href));
    }
  }, { rootMargin: '-20% 0px -62% 0px', threshold: 0 });
  document.querySelectorAll('main section[id], footer[id]').forEach(section => observer.observe(section));
}

const storyToggle = document.getElementById('story-toggle');
const storyExtra = document.getElementById('story-extra');
storyToggle?.addEventListener('click', () => {
  const expanding = storyToggle.getAttribute('aria-expanded') !== 'true';
  storyToggle.setAttribute('aria-expanded', String(expanding));
  storyExtra.hidden = !expanding;
  storyToggle.innerHTML = expanding
    ? 'Mostrar menos <span aria-hidden="true">↑</span>'
    : 'Conocé un poco más de mi historia <span aria-hidden="true">↗</span>';
});

const listen = document.getElementById('listen-riddim');
const player = document.getElementById('soundcloud-player');
const slot = document.getElementById('soundcloud-slot');
const closePlayer = document.getElementById('close-player');
const trackUrl = 'https://soundcloud.com/allenksmusic/riddim-riot';

function hidePlayer() {
  if (!player) return;
  player.hidden = true;
  if (slot) slot.replaceChildren();
  listen?.setAttribute('aria-expanded', 'false');
  if (listen) listen.innerHTML = '<span class="button-icon">▶</span> Escuchar preview';
}

listen?.addEventListener('click', () => {
  if (!player.hidden) return hidePlayer();
  const iframe = document.createElement('iframe');
  const options = new URLSearchParams({ url: trackUrl, color: '#30c9f0', auto_play: 'false', hide_related: 'true', show_comments: 'false', show_reposts: 'false', visual: 'false' });
  iframe.src = `https://w.soundcloud.com/player/?${options.toString()}`;
  iframe.title = 'Escuchar RIDDIM RIOT de ALLEN KS en SoundCloud';
  iframe.setAttribute('allow', 'autoplay');
  iframe.loading = 'lazy';
  slot.replaceChildren(iframe);
  player.hidden = false;
  listen.setAttribute('aria-expanded', 'true');
  listen.innerHTML = '<span class="button-icon">■</span> Ocultar preview';
});
closePlayer?.addEventListener('click', hidePlayer);

const dialog = document.getElementById('product-dialog');
const dialogTitle = document.getElementById('dialog-title');
const dialogDescription = document.getElementById('dialog-description');
const dialogContact = document.getElementById('dialog-contact');
const packData = {
  tearout: {
    name: 'TEAROUT VOL. 1',
    description: 'Sample pack de ALLEN KS enfocado en sonidos pesados de Tearout. Estamos preparando la ficha con el contenido, los formatos, la licencia y la demostración.'
  },
  magnetic: {
    name: 'MAGNETIC',
    description: 'El universo sonoro de MAGNETIC en formato sample pack. Estamos preparando la ficha con el contenido, los formatos, la licencia y la demostración.'
  }
};

let previousFocus = null;
document.querySelectorAll('[data-pack]').forEach(button => button.addEventListener('click', () => {
  const pack = packData[button.dataset.pack];
  if (!pack || !dialog) return;
  previousFocus = button;
  dialogTitle.textContent = pack.name;
  dialogDescription.textContent = pack.description;
  dialogContact.href = `mailto:soyallenks@gmail.com?subject=${encodeURIComponent(`Consulta por sample pack: ${pack.name}`)}`;
  dialog.showModal();
}));

document.getElementById('dialog-close')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog?.addEventListener('close', () => previousFocus?.focus());
