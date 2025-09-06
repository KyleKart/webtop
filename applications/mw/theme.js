setInterval(() => {
  ["0.35","1"].forEach((a,i)=>
    document.documentElement.style.setProperty(["--looks-transparent","--looks"][i], window.parent.getAccent(`rgba(255 107 107 ${a})`))
  );
}, 100);