(() => {
  if (document.querySelector('script[data-kakao-kas-loader="1"]')) {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://t1.daumcdn.net/kas/static/ba.min.js";
  script.async = true;
  script.setAttribute("data-kakao-kas-loader", "1");
  document.body.appendChild(script);
})();
