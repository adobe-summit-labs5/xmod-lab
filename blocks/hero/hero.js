export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length >= 2) {
    const imageRow = rows[0];
    const contentRow = rows[1];
    const contentCell = contentRow.querySelector(':scope > div') || contentRow;

    // Preserve existing <picture> with its <source> elements; fall back to wrapping bare <img>
    const picture = imageRow.querySelector('picture');
    if (picture) {
      block.replaceChildren(picture, contentCell);
    } else {
      const img = imageRow.querySelector('img');
      if (img) {
        const pic = document.createElement('picture');
        pic.append(img);
        block.replaceChildren(pic, contentCell);
      } else {
        block.replaceChildren(contentCell);
      }
    }
  }

  // Tag pills: eyebrow p and em-wrapped tags
  const contentDiv = block.querySelector(':scope > div');
  if (contentDiv) {
    const firstP = contentDiv.querySelector(':scope > p:first-child');
    if (firstP && !firstP.querySelector('a, img')) firstP.classList.add('tag-pill');
    contentDiv.querySelectorAll('em').forEach((em) => {
      if (!em.querySelector('a')) em.classList.add('tag-pill');
    });
  }

  // Floating emoji decorations — each emoji bobs independently
  const bottomEmojis = ['🌸', '🐾', '🌷', '☁️', '🌼', '🐾', '🌸', '☁️', '🌺', '🐾', '🌷', '🌸'];
  const topEmojis = ['🌸', '☁️', '🌼', '🐾', '🌷'];

  function createEmojiRow(emojis, className) {
    const row = document.createElement('div');
    row.className = className;
    row.setAttribute('aria-hidden', 'true');
    emojis.forEach((emoji, i) => {
      const span = document.createElement('span');
      span.textContent = emoji;
      span.style.animationDelay = `${(i * 0.35).toFixed(2)}s`;
      row.append(span);
    });
    return row;
  }

  const wrapper = block.closest('.hero-wrapper');
  if (wrapper) {
    wrapper.append(createEmojiRow(bottomEmojis, 'hero-emoji-bottom'));
    wrapper.append(createEmojiRow(topEmojis, 'hero-emoji-top'));
  }
}
