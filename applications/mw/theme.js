(function(Scratch) {
    'use strict';
    class Extension {
        getInfo() {
            return {
                id: 'toolsforwebtop',
                name: 'Webtop Tools',
                blocks: [
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Your current Webtop accent is in use.',
                    }
                ]
            };
        }
    }
    Scratch.extensions.register(new Extension());
})(Scratch);

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
.scratchCategoryId-toolsforwebtop {
    background-color: #222;
    color: #fff;
    border-radius: 6px;
}
`;
document.head.appendChild(style);

const menu = document.querySelector('.scratchCategoryMenu');
const row = menu.querySelector('.scratchCategoryId-toolsforwebtop').closest('.scratchCategoryMenuRow');
const bubble = row.querySelector('.scratchCategoryItemBubble');
if (bubble) bubble.remove();
menu.prepend(row);