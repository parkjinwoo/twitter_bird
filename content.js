const X_SVG_SELECTOR = 'svg:has(path[d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"])';
const TWITTER_BIRD_DRAW = 'M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z';

const replaceSvgIcon = () => {
  const svgs = document.querySelectorAll(X_SVG_SELECTOR);
  if (svgs.length > 0) {
    svgs.forEach(svg => {
      const path = svg.querySelector('path');
      if (path) {
        path.setAttribute('d', TWITTER_BIRD_DRAW);
        path.setAttribute('fill', '#1da1f2');
      }
    });
    return true;
  }
  return false;
}

// observe dom change
const observer = new MutationObserver((mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList' && replaceSvgIcon()) {
      observer.disconnect();
      break;
    }
  }
});
observer.observe(document.body, { childList: true, subtree: true });

// observe resize
let prevWidth = 0;
const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    const width = entry.borderBoxSize?.[0].inlineSize;
    if (typeof width === 'number' && width !== prevWidth) {
      prevWidth = width;
      replaceSvgIcon();
    }
  }
});
resizeObserver.observe(document.body, { box: 'border-box' });

const replaceTitleText = () => {
  const titleElement = document.querySelector('title');
  const originalTitle = titleElement.innerText;

  if (originalTitle.endsWith('/ X')) {
    const newTitle = originalTitle.replace('/ X', '/ 트위터');
    titleElement.innerText = newTitle;
  } else if (originalTitle === 'X') {
    titleElement.innerText = '트위터';
  }
}
replaceTitleText();

// observe title change
const titleObserver = new MutationObserver(replaceTitleText);
titleObserver.observe(document.querySelector('title'), { subtree: true, characterData: true, childList: true });

// favicon
const link = document.querySelector('link[rel="shortcut icon"]');
if (!link) {
  link = document.createElement('link');
  link.rel = 'shortcut icon';
  document.head.appendChild(link);
}
link.href = '//abs.twimg.com/favicons/twitter.ico';
