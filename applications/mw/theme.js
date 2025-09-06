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
    root.style.setProperty("--looks", solid);
  }
});
    class Extension {
        getInfo() {
            return {
                id: 'webtopTheme',
                name: 'Theme',
                blocks: [
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Loaded Webtop theme!',
                    }
                ]
            };
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);