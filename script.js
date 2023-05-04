openHTML();

function openHTML() {
  header();
  footer();
  pageCreateOrJoin();
}

function header() {
  titleBtn();
  howBtn();
}

function titleBtn() {
  document.querySelector("h1").addEventListener("click", () => {
    location.reload();
  });
}

function howBtn() {
  document.querySelector(".howBtn").addEventListener("click", () => {
    removeClassToElement(document.querySelector(".howTo"));
  });
  document.querySelector(".howCloseBtn").addEventListener("click", () => {
    addClassToElement(document.querySelector(".howTo"));
  });
  document.querySelector(".howTo").addEventListener("click", e => {
    if (e.target === document.querySelector(".howTo")) {
      addClassToElement(document.querySelector(".howTo"));
    }
  });
}

function pageCreateOrJoin() {
  tabCreateOrJoin();
  createGame();
  joinGame();
}

function tabCreateOrJoin() {
  document.querySelector(".createTabBtn").addEventListener("click", () => {
    removeClassToElement(document.querySelector(".create"));
    addClassToElement(document.querySelector(".join"));
    addClassToElement(document.querySelector(".createTabBtn"), "select");
    removeClassToElement(document.querySelector(".joinTabBtn"), "select");
  });
  document.querySelector(".joinTabBtn").addEventListener("click", () => {
    addClassToElement(document.querySelector(".create"));
    removeClassToElement(document.querySelector(".join"));
    removeClassToElement(document.querySelector(".createTabBtn"), "select");
    addClassToElement(document.querySelector(".joinTabBtn"), "select");
  });
}

function createGame() {
  let maxNumber = 3;

  document.querySelector(".setOrderNumberMinus").addEventListener("click", () => {
    if (maxNumber > 3) {
      maxNumber -= 1;
      document.querySelector(".setOrderNumberNow").textContent = maxNumber;
    }
  });
  document.querySelector(".setOrderNumberPlus").addEventListener("click", () => {
    if (maxNumber < 9) {
      maxNumber += 1;
      document.querySelector(".setOrderNumberNow").textContent = maxNumber;
    }
  });

  document.querySelector(".createBtn").addEventListener("click", () => {
    const yourOrder = 1;
    const numbers = [];
    for (let i = 0; i < maxNumber; i++) {
      numbers.push(arrayShuffle(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]));
    }
    addThisID(encrypt(numbers));

    addClassToElement(document.querySelector(".create"));
    removeClassToElement(document.querySelector(".main"));
    addClassToElement(document.querySelector(".selectCreateOrJoin"));
    removeClassToElement(document.querySelector(".thisIDtab"));
    paintCard(numbers);
  });
}

function joinGame() {
  let order = -1;
  let numbers = [];
  let error = true;
  const orderBtns = document.getElementsByClassName("orderBtn");

  document.querySelector(".joinInput").addEventListener("input", () => {
    try {
      decrypt(document.querySelector(".joinInput").value);
      addClassToElement(document.querySelector(".whatJoinID"));
      error = false;
    } catch {
      document.querySelector(".whatJoinID").textContent = "> 참가하시려는 게임의 id를 입력해주세요. 잘못된 코드입니다.";
      removeClassToElement(document.querySelector(".whatJoinID"));
      numbers = [];
      error = true;
    }
  });

  for (let i = 0; i < orderBtns.length; i++) {
    orderBtns.item(i).addEventListener("click", e => {
      for (let j = 0; j < orderBtns.length; j++) {
        removeClassToElement(orderBtns.item(j), "select");
      }
      addClassToElement(e.target, "select");
      order = e.target.value;
      addClassToElement(document.querySelector(".whatJoinOrder"));
    });
  }

  document.querySelector(".joinBtn").addEventListener("click", () => {
    if (!error && order != -1) {
      addThisID(document.querySelector(".joinInput").value);
      paintCard(decrypt(document.querySelector(".joinInput").value), order);

      addClassToElement(document.querySelector(".join"));
      removeClassToElement(document.querySelector(".main"));
      addClassToElement(document.querySelector(".selectCreateOrJoin"));
      removeClassToElement(document.querySelector(".thisIDtab"));
    }
  });
}

function addThisID(value) {
  document.querySelector(".thisID").value = value;
  document.querySelector(".thisID").setAttribute("data-clipboard-text", value);
}

function paintCard(arrs, order = 1) {
  document.querySelector(".card").textContent = arrs[order - 1][0];
}

function footer() {
  const clipboard = new ClipboardJS(".thisID");
}

function encrypt(arr) {
  return CryptoJS.AES.encrypt(JSON.stringify(arr), "").toString();
}

function decrypt(string) {
  return JSON.parse(CryptoJS.AES.decrypt(string, "").toString(CryptoJS.enc.Utf8));
}

function arrayShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * (i + 1));
    const temporary = array[i];
    array[i] = array[randomPosition];
    array[randomPosition] = temporary;
  }
  return array;
}

function addClassToElement(el, cl = "hide") {
  el.classList.add(cl);
}

function removeClassToElement(el, cl = "hide") {
  el.classList.remove(cl);
}
