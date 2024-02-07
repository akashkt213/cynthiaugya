// for smooth scrolling.
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

//circle followers
function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (details) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(${xscale},${yscale})`;
  });
}

// function minicircleAppear() {
//   window.addEventListener("movemove", function () {
//     document.querySelector("#minicircle").opacity = 1;
//   });
// }

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

let timeout;
function circleChaptaKaro() {
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (details) {
    clearInterval(timeout);
    var xdiff = details.clientX - xprev;
    var ydiff = details.clientX - yprev;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    xprev = details.clientX;
    yprev = details.clientY;

    circleMouseFollower(xscale, yscale);

    //ek issue tha jiske wajah se mouse circle distort hone k baad
    // wapas se circle nhi ban rha tha toh ussi k liye ye function h
    // ye har 100ms me refresh hoga aur circle normal shape me aa jayega

    timeout = this.setInterval(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(1,1)`;
    }, 100);
  });
}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

// minicircleAppear();

// teeno element ko select kro,uske baad teeno par ek mousemove lagao,
// jab mousemove ho to pata karo ki mouse kaha par hai, jiska matlab h
// ki mouse ki x aur y position pata kro , ab mouse ki x y position k badle uss
// image ko show kro and us image ko move karo, move karte waqt rotate karo,
// and jaise jais mouse tez chale waise waise rotation v tez ho jaye

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (details) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });

  elem.addEventListener("mousemove", function (details) {
    var diff = details.clientY - elem.getBoundingClientRect().top;

    diffrot = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot),
    });
  });
});

setInterval(() => {
  let t = new Date();
  document.querySelector(".time").innerHTML = t.toLocaleTimeString();
}, 1000);
