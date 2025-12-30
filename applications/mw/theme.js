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

const baseDataUri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScyMCcgaGVpZ2h0PScyMCcgZmlsbD0nYmx1ZScvPjwvc3ZnPg==";

const demoImg = document.createElement("img");
demoImg.id = "accentSvg";
document.body.appendChild(demoImg);

window.addEventListener("message", (event) => {
  if (event.data.type === "accentResponse") {
    const [transparent, solid] = event.data.values;
    root.style.setProperty("--looks-transparent", transparent);
    root.style.setProperty("--looks-secondary", transparent);
    root.style.setProperty("--looks-light-transparent", transparent);
    root.style.setProperty("--looks-secondary-dark", solid);
    root.style.setProperty("--extensions-primary", solid);

    const base64 = baseDataUri.split(",")[1];
    let svgCode = atob(base64);

    svgCode = svgCode.replace(/fill=['"][^'"]*['"]/g, `fill="${solid}"`);

    const newBase64 = btoa(svgCode);
    const newDataUri = "data:image/svg+xml;base64," + newBase64;

    demoImg.src = newDataUri;
  }
});