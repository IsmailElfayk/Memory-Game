let controlButton = document.querySelector(".control-button span");
let restartButton = document.querySelectorAll(".restart");
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = [...document.querySelectorAll(".memory-game-blocks .game-block")];
let audioErr = new Audio("./audio/error-126627.mp3");
let audioCorr = new Audio("./audio/correct-choice-43861.mp3");
let audioSucc = new Audio("./audio/success-fanfare-trumpets-6185.mp3");

let arr = [];
audioCorr.volume = 0.3;
audioSucc.volume = 0.3;

controlButton.addEventListener("click", () => {
  let promptMsg = prompt("What Is Your Name") || "Unkown";
  document.querySelector(".name span").textContent = promptMsg;
  document.querySelector(".control-button").style.display = "none";
  // document.querySelector(".controle-button").remove();
  blocksContainer.classList.add("unclickable");
  setTimeout(() => {
    blocksContainer.classList.remove("unclickable");
  }, 4500);
  setTimeout(() => {
    blocks.forEach((e) => {
      e.classList.add("is-flipped");
    });
    setTimeout(() => {
      blocks.forEach((e) => {
        e.classList.remove("is-flipped");
      });
    }, 10000);
  }, 1500);
  play();
});
restartButton.forEach((ele) => {
  ele.addEventListener("click", () => {
    blocks.forEach((ele) => {
      ele.classList.remove("checked");
    });
    let x = 0;
    document.querySelector(".tries span").textContent = x;
    document.querySelector(".game-over").style.display = "none";
    document.querySelector(".win").style.display = "none";
    // document.querySelector(".controle-button").remove();
    blocksContainer.classList.add("unclickable");
    setTimeout(() => {
      blocksContainer.classList.remove("unclickable");
    }, 4500);
    setTimeout(() => {
      blocks.forEach((e) => {
        e.classList.add("is-flipped");
      });
      setTimeout(() => {
        blocks.forEach((e) => {
          e.classList.remove("is-flipped");
        });
      }, 10000);
    }, 1500);
    play();
  });
});

function play() {
  do {
    let x = Math.floor(Math.random() * 20);
    if (!arr.includes(x)) {
      arr.push(x);
    }
  } while (arr.length < 20);

  for (let i = 0; i < 20; i++) {
    blocks[i].style = `order:${arr[i]}`;
  }

  //############
  //############
  function stopClick() {
    blocksContainer.classList.add("unclickable");
    setTimeout(() => {
      blocksContainer.classList.remove("unclickable");
    }, 1000);
  }
  //############
  //############
  function removing() {
    setTimeout(() => {
      blocks.forEach((fl) => {
        fl.classList.remove("is-flipped");
        fl.addEventListener("click");
      });
    }, 1500);
  }
  //############
  //############
  let x = 0;
  blocks.forEach((ele) => {
    ele.addEventListener("click", () => {
      ele.classList.add("is-flipped");
      if (document.querySelectorAll(".is-flipped").length == 2) {
        stopClick();
      }
      for (let i = 0; i < blocks.length; i++) {
        if (document.querySelectorAll(".is-flipped").length == 2) {
          if (blocks[i] != ele) {
            if (
              document.querySelectorAll(".is-flipped")[0].dataset.tech ==
              document.querySelectorAll(".is-flipped")[1].dataset.tech
            ) {
              audioCorr.play();
            } else {
              audioErr.play();
            }
          }
        }
      }

      setTimeout(() => {
        for (let i = 0; i < blocks.length; i++) {
          if (document.querySelectorAll(".is-flipped").length == 2) {
            if (blocks[i] != ele) {
              if (
                document.querySelectorAll(".is-flipped")[0].dataset.tech ==
                document.querySelectorAll(".is-flipped")[1].dataset.tech
              ) {
                document
                  .querySelectorAll(".is-flipped")[0]
                  .classList.add("checked");
                document
                  .querySelectorAll(".is-flipped")[1]
                  .classList.add("checked");

                blocks.forEach((e) => {
                  e.classList.remove("is-flipped");
                });
                if (document.querySelectorAll(".checked").length == 20) {
                  document.querySelector(".win").style.display = "block";
                  audioSucc.play();
                  arr.length = 0;
                }
              } else {
                blocks.forEach((e) => {
                  e.classList.remove("is-flipped");
                });
                x++;
                document.querySelector(".tries span").textContent = x;
                if (x > 5) {
                  x = 0;
                  arr.length = 0;
                  gameOver();
                }
              }
            } else {
              continue;
            }
          } else {
            continue;
          }
        }
      }, 1500);
    });
  });
  //############
  //############
  function gameOver() {
    document.querySelector(".game-over").style.display = "block";
  }
  //##########
  //##########
}
