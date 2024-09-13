let cards = document.querySelectorAll(".card");
var checkedSound = new Audio(
  "https://ismailelfayk.github.io/Memory-Game/audio/correct-choice-43861.mp3"
);
var errorSound = new Audio(
  "https://ismailelfayk.github.io/Memory-Game/audio/error-126627.mp3"
);
var successSound = new Audio(
  "https://ismailelfayk.github.io/Memory-Game/audio/success-fanfare-trumpets-6185.mp3"
);

function MixCard() {
  let orders = [];
  do {
    let x = Math.floor(Math.random() * 20);
    if (!orders.includes(x)) {
      orders.push(x);
    } else {
      continue;
    }
  } while (orders.length != 19);

  for (let i = 0; i < cards.length; i++) {
    cards[i].style = `order:${orders[i]}`;
  }
}

function Play() {
  let card_one, card_two, card_one_src, card_two_src;
  let a = 0,
    b = 0,
    c = 0;
  document.querySelector(".header > span > span").innerHTML = c;
  for (let cd of cards) {
    cd.addEventListener("click", async (e) => {
      a = 0;
      await new Promise((resolve, reject) => {
        if (!e.target.classList.contains("card")) {
          resolve("");
        }
      });
      e.target.offsetParent.offsetParent.classList.add("clicked");
      // await new Promise((resolve, reject) => {
      //   resolve("");
      // });
      // await new Promise((resolve, reject) => {
      // resolve("");
      // });
      for (let cd of cards) {
        if (cd.classList.contains("clicked")) {
          a++;
        }
      }
      if (a == 1) {
        card_one = e.target.offsetParent.offsetParent;
        card_one_src =
          e.target.offsetParent.offsetParent.firstElementChild.firstElementChild
            .src;
      } else {
        if (a == 2) {
          card_two = e.target.offsetParent.offsetParent;
          card_two_src =
            e.target.offsetParent.offsetParent.firstElementChild
              .firstElementChild.src;
          for (let cd of cards) {
            cd.classList.add("unclickable");
          }
          await new Promise((resolve, reject) => {
            if (card_one_src == card_two_src) {
              b++;
              setTimeout(() => {
                checkedSound.play();
                card_one.classList.add("checked");
                card_two.classList.add("checked");
                for (let cd of cards) {
                  cd.classList.remove("clicked", "unclickable");
                }
                if (b == 10) {
                  successSound.play();
                  document.querySelector(".restart").style = `display: block`;
                  b = 0;
                  c = 0;
                }
                resolve("");
              }, 1000);
            } else {
              c++;
              setTimeout(() => {
                if (c == 6) {
                  document.querySelector(".restart").style = `display: block`;
                  c = 0;
                  b = 0;
                }
                for (let cd of cards) {
                  cd.classList.remove("clicked", "unclickable");
                }
                document.querySelector(".header > span > span").innerHTML = c;
                errorSound.play();
                resolve("");
              }, 1000);
            }
          });
        }
      }
    });
  }
}

function Reset() {
  for (let cd of cards) {
    cd.classList.add("unclickable");
  }
  for (let cd of cards) {
    cd.classList.remove("clicked", "checked");
  }
}
// function Unclickable(){
//   for (let cd of cards) {
//     cd.classList.remove("clicked", "checked");
//   }
// }
async function Showing() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add(`clicked`);
      }
      resolve("");
    }, 1000);
  });
  setTimeout(() => {
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove(`clicked`, `unclickable`);
    }
  }, 8000);
}

document.querySelector(".restart > div").addEventListener("click", async () => {
  console.log("restart");
  document.querySelector(".header > span > span").innerHTML = 0;
  Reset();
  MixCard();
  document.querySelector(".restart").style = `display: none`;
  Showing();
});
document.querySelector(".start > div").addEventListener("click", async () => {
  Reset();
  MixCard();
  document.querySelector(".start").style = `display: none`;
  Showing();
  Play();
});
