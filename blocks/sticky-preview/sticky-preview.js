import { toClassName } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  // build anchor footer
  const footer = document.createElement('div');
  footer.className = 'sticky-preview-footer';
  block.append(footer);
  // find section title
  const section = block.closest('.sticky-preview-container');
  const observer = new IntersectionObserver(async (entries) => {
    entries.forEach((entry) => {
      block.setAttribute('aria-hidden', entry.intersectionRatio > 0);
    });
  }, { threshold: 0 });
  observer.observe(section);
  cols.forEach((col) => {
    const colContents = [];
    [...col.children].forEach((item) => {
      const defaultContent = item.outerHTML.includes('<strong>');
      if (defaultContent) col.className = 'sticky-preview-default';
      // find content
      const id = toClassName(item.textContent);
      const el = document.getElementById(id);
      if (el) {
        // populate content
        colContents.push(item.textContent);
        const heading = document.createElement('strong');
        heading.className = 'sticky-preview-heading';
        heading.innerHTML = el.innerHTML;
        const content = [heading];
        let next = el.nextElementSibling;
        while (next && !next.nodeName.startsWith('H')) {
          content.push(next.cloneNode(true));
          next = next.nextElementSibling;
        }
        item.replaceWith(...content);
      }
    });
  });
  // create toggle button
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.innerHTML = '<span class="icon icon-arrow_upward"></span>';
  button.addEventListener('click', () => {
    const expanded = [...block.classList].includes('expanded');
    if (expanded) block.classList.remove('expanded');
    else block.classList.add('expanded');
  });
  block.prepend(button);
}
