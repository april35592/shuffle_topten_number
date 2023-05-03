openHtml();

function openHtml() {
  let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  let maxNumber = 3;
  let yourOrder = -1;

  howButton();
  setNumber();
  tabCreateOrJoin();

  function howButton() {
    document.querySelector(".howBtn").addEventListener("click", () => {
      removeClassToElement(document.querySelector(".howTo"));
    });
    document.querySelector(".howCloseBtn").addEventListener("click", () => {
      addClassToElement(document.querySelector(".howTo"));
    });
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

  function setNumber() {
    document.querySelector(".setNumberMinus").addEventListener("click", () => {
      if (maxNumber > 3) {
        maxNumber -= 1;
        document.querySelector(".setNumberNow").textContent = maxNumber;
      }
    });
    document.querySelector(".setNumberPlus").addEventListener("click", () => {
      if (maxNumber < 10) {
        maxNumber += 1;
        document.querySelector(".setNumberNow").textContent = maxNumber;
      }
    });
  }
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
