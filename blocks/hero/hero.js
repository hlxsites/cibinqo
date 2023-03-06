/**
 * decorates the hero
 * @param {Element} block The hero block element
 */
export default async function decorate(block) {
  const text = document.createElement('div');
  text.className = 'hero-text';
  [...block.firstElementChild.firstElementChild.children].forEach((child) => {
    const picture = child.querySelector('picture');
    if (picture && picture.parentElement.textContent === child.textContent) {
      child.className = 'hero-image';
    } else {
      // wrap non-picture content in text container
      text.append(child);
    }
  });
  block.firstElementChild.firstElementChild.append(text);
}
