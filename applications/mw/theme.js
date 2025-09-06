(function(Scratch) {
    'use strict';
    class Extension {
        getInfo() {
            return {
                id: 'toolsforwebtop',
                name: 'Webtop',
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

}
`;
document.head.appendChild(style);

const observer = new MutationObserver(() => {
  const menu = document.querySelector('.scratchCategoryMenu');
  if (!menu) return;

  const row = menu.querySelector('.scratchCategoryId-toolsforwebtop')?.closest('.scratchCategoryMenuRow');
  if (!row) return;

  row.querySelector('.scratchCategoryItemBubble')?.remove();
  menu.prepend(row);

  observer.disconnect();
});

observer.observe(document.body, { childList: true, subtree: true });