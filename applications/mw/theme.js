(function(Scratch) {
    'use strict';
const root = document.documentElement;

setInterval(() => {
  window.parent.postMessage({ type: "getAccent" }, "*");
}, 100);

window.addEventListener("message", (event) => {
  if (event.data.type === "accentResponse") {
    const [transparent, solid] = event.data.values;
    root.style.setProperty("--looks-transparent", transparent);
    root.style.setProperty("--looks-secondary", solid);
  }
});

const style = document.createElement('style');
style.textContent = `
.scratchCategoryId-webtopTheme {
    background-color: #222; /* example */
    color: #fff;
    border-radius: 6px;
    padding: 5px;
    font-weight: bold;
}
`;
document.head.appendChild(style);

    class Extension {
        getInfo() {
            return {
                id: 'webtopTheme',
                name: 'Theme',
                blocks: [
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Your current Webtop accent is in use!',
                    }
                ]
            };
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);