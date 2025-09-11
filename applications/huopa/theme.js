const bgMap = [
    { selector: 'body', color: '25,25,25', alpha: 1 },
    { selector: '.page', color: '255,255,255', alpha: 1 },
    { selector: 'input', color: '40,40,40', alpha: 1 },
    { selector: 'input:hover', color: '50,50,50', alpha: 1 },
    { selector: '#newTabButton', color: '40,40,40', alpha: 1 },
    { selector: '.tab', color: '40,40,40', alpha: 1 },
    { selector: '.selectedTab', color: '55,55,55', alpha: 1 },
    { selector: '.closeTab', color: '80,80,80', alpha: 1 },
];

const style = document.createElement('style');
document.head.appendChild(style);

function updateBackgrounds() {
    style.textContent = bgMap.map(({ selector, color, alpha }) => {
        const accent = window.parent.getAccent(`rgba(${color}, ${alpha})`);
        return `${selector} { background-color: ${accent}; !important}`;
    }).join('\n');
}

setInterval(updateBackgrounds, 100);

const styleTag = document.querySelector("style");
if (styleTag) {
    styleTag.remove();
}

const linkTag = document.createElement("link");
linkTag.rel = "stylesheet";
linkTag.href = "styles.css";

document.head.appendChild(linkTag);
