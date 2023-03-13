/**
 * decorates the card
 * @param {Element} block The card block element
 */
export default async function decorate(block) {
  const img = block.querySelector('img');
  if (img) {
    const figure = document.createElement('figure');
    const wrapper = img.closest('p');
    figure.append(img);
    const precap = wrapper.previousElementSibling;
    const postcap = wrapper.nextElementSibling;
    if (precap && precap.querySelector('em') && precap.querySelector('em').textContent === precap.textContent) {
      const caption = document.createElement('figcaption');
      caption.className = 'card-figure-precaption';
      caption.innerHTML = precap.querySelector('em').innerHTML;
      precap.remove();
      figure.prepend(caption);
    }
    if (postcap && postcap.querySelector('em') && postcap.querySelector('em').textContent === postcap.textContent) {
      const caption = document.createElement('figcaption');
      caption.className = 'card-figure-postcaption';
      caption.innerHTML = postcap.querySelector('em').innerHTML;
      postcap.remove();
      figure.append(caption);
    }
    wrapper.replaceWith(figure);
  }
}
