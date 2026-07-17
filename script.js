(function(){
  var steps = [
    {
      eyebrow: "Step 1 of 4",
      title: "Tap Login",
      body: "Open Quora and tap Login to get started."
    },
    {
      eyebrow: "Step 2 of 4",
      title: "Continue with Google",
      body: "Google sign-in is the quickest way in \u2014 just one tap."
    },
    {
      eyebrow: "Step 3 of 4",
      title: "Tap Ask",
      body: "Find the AstroChitra profile and hit the Ask button."
    },
    {
      eyebrow: "Step 4 of 4",
      title: "Ask Your Question",
      body: "Type what\u2019s on your mind, then tap Add \u2014 Guruji replies personally."
    }
  ];

  var current = 0;
  var AUTO_MS = 4200;
  var timer = null;

  var imgs      = Array.prototype.slice.call(document.querySelectorAll(".frame__img"));
  var dots      = Array.prototype.slice.call(document.querySelectorAll(".dot"));
  var eyebrowEl = document.getElementById("stepEyebrow");
  var titleEl   = document.getElementById("stepTitle");
  var bodyEl    = document.getElementById("stepBody");
  var prevBtn   = document.getElementById("prevBtn");
  var nextBtn   = document.getElementById("nextBtn");

  function render(i){
    current = (i + steps.length) % steps.length;

    imgs.forEach(function(img){
      img.classList.toggle("is-active", Number(img.dataset.step) === current);
    });
    dots.forEach(function(dot){
      dot.classList.toggle("is-active", Number(dot.dataset.step) === current);
    });

    var s = steps[current];
    eyebrowEl.textContent = s.eyebrow;
    titleEl.textContent   = s.title;
    bodyEl.textContent    = s.body;
  }

  function goTo(i){
    render(i);
    restartAuto();
  }

  function next(){ goTo(current + 1); }
  function prev(){ goTo(current - 1); }

  function restartAuto(){
    if (timer) clearInterval(timer);
    timer = setInterval(next, AUTO_MS);
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  dots.forEach(function(dot){
    dot.addEventListener("click", function(){ goTo(Number(dot.dataset.step)); });
  });

  // simple swipe support
  var touchStartX = null;
  var frame = document.getElementById("shots");
  frame.addEventListener("touchstart", function(e){
    touchStartX = e.changedTouches[0].clientX;
  }, {passive:true});
  frame.addEventListener("touchend", function(e){
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 30){ dx < 0 ? next() : prev(); }
    touchStartX = null;
  }, {passive:true});

  render(0);
  restartAuto();
})();
