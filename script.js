openHTML();

function openHTML() {
  titleBtn();
  howBtn();
  pageCreateOrJoin();
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
    const numbers = [];
    for (let i = 0; i < maxNumber; i++) {
      numbers.push(arrayShuffle(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]));
    }
    pageMain(numbers, 1, encrypt(numbers));
  });
}

function joinGame() {
  let order = -1;
  let numbers = [];
  let error = true;
  const orderBtns = document.getElementsByClassName("orderBtn");

  document.querySelector(".joinInput").addEventListener("input", () => {
    try {
      const str = decrypt(document.querySelector(".joinInput").value);  
      for (let i = 0; i < Number(str.substring(0, 1)); i++) {
        numbers.push([])
        for (let j = 0; j < 10; j++) {
          if(str.substring(10*i+j+1,10*i+j+2) === "0") {
            numbers[i].push("10")
          } else {
            numbers[i].push(str.substring(i*10+j+1, 10*i+j+2))
          }
        }
      }
      
      addClassToElement(document.querySelector(".whatJoinID"));
      error = false;
      removeClassToElement(document.querySelector(".whatOrder"));
      for (let i = 0; i < orderBtns.length; i++) {
        if (orderBtns.item(i).value > numbers.length) {
          orderBtns.item(i).classList.add("disabled");
        }
      }
    } catch {
      document.querySelector(".whatJoinID").textContent = "> 참가하시려는 게임의 id를 입력해주세요. 잘못된 ID입니다.";
      removeClassToElement(document.querySelector(".whatJoinID"));
      numbers = [];
      error = true;
      addClassToElement(document.querySelector(".whatOrder"));
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
    if (!error && order != -1 && order <= numbers.length) {
      pageMain(numbers, order, document.querySelector(".joinInput").value);
    }
  });
}

function pageMain(arrs, order, ID) {
  const clipboard = new ClipboardJS(".thisID");
  let nowOrder = 1;
  document.querySelector(".thisID").value = ID;
  document.querySelector(".thisID").setAttribute("data-clipboard-text", ID);
  paintCard(arrs, order);
  const cardset = document.getElementsByClassName("card");

  addClassToElement(document.querySelector(".create"));
  addClassToElement(document.querySelector(".join"));
  removeClassToElement(document.querySelector(".main"));
  addClassToElement(document.querySelector(".selectCreateOrJoin"));
  removeClassToElement(document.querySelector(".thisIDtab"));

  if (order != 1) {
    addClassToElement(document.querySelector(".youArePD"));
  }

  document.querySelector(".leftCard").addEventListener("click", () => {
    if (nowOrder > 1) {
      addClassToElement(cardset.item(nowOrder - 1));
      nowOrder--;
      removeClassToElement(cardset.item(nowOrder - 1));
      document.querySelector(".order").textContent = nowOrder;
      if (order != nowOrder) {
        addClassToElement(document.querySelector(".youArePD"));
      } else {
        removeClassToElement(document.querySelector(".youArePD"));
      }
    }
  });
  document.querySelector(".rightCard").addEventListener("click", () => {
    if (nowOrder < arrs.length) {
      addClassToElement(cardset.item(nowOrder - 1));
      nowOrder++;
      removeClassToElement(cardset.item(nowOrder - 1));
      document.querySelector(".order").textContent = nowOrder;
      if (order != nowOrder) {
        addClassToElement(document.querySelector(".youArePD"));
      } else {
        removeClassToElement(document.querySelector(".youArePD"));
      }
    }
  });
}

function paintCard(arrs, order) {
  try {
    for (let i = 1; i < arrs.length; i++) {
      document.querySelector(".cardSet").append(document.querySelector(".card").cloneNode(true));
    }
    const cardset = document.getElementsByClassName("card");
    for (let i = 0; i < cardset.length; i++) {
      cardset.item(i).textContent = arrs[i][order - 1];
      if (arrs.length === 9 && i === order - 1) {
        cardset.item(i).textContent = `X`;
      }
      if (i != 0) {
        addClassToElement(cardset.item(i));
      }
    }
  } catch (err) {
    document.querySelector(".card").textContent = "잘못된 ID입니다. 다시 처음부터 시도해주세요.";
  }
}

function encrypt(arr) {
  let str = arr.length.toString()
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < 10; j++) {
      if (arr[i][j] === "10") {
        str += "0"
      } else {
        str += arr[i][j].toString()
      }
    }
  }

  const newarr = []
  const num = Number(str.substring(0, 1))
  for (let i = 0; i < num; i++) {
    newarr.push([])
    for (let j = 0; j < 10; j++) {
      if(str.substring(10*i+j+1,10*i+j+2) === "0") {
        newarr[i].push("10")
      } else {
        newarr[i].push(str.substring(i*10+j+1, 10*i+j+2))
      }
    }
  }
  console.log(CryptoJS.AES.encrypt(JSON.stringify(str), "").toString())
  return CryptoJS.AES.encrypt(JSON.stringify(str), "").toString();
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
