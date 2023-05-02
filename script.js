openHtml();

let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
let order = -1;
let shuffled = false;

function openHtml() {
  const shuffleBtn = document.querySelector("#shuffleBtn");
  const remindInput = document.querySelector("#remindInput");
  const remindBtn = document.querySelector("#remindBtn");
  const card = document.querySelector(".card");
  const orderBtnGroup = document.querySelector(".orderBtnGroup");
  const orderBtns = document.getElementsByClassName("orderBtn");
  const selectOrder = document.querySelector(".selectOrder");
  const errorMessage = document.querySelector(".error");

  shuffleBtn.addEventListener("click", clickShuffle);
  remindBtn.addEventListener("click", clickRemind);
  for (let i = 0; i < orderBtns.length; i++) {
    orderBtns.item(i).addEventListener("click", clickOrder);
  }

  function clickShuffle(event) {
    event.preventDefault();
    numbers = arrayShuffle(numbers);
    remindInput.value = encrypt(numbers);
    shuffled = true;
    cardWrite();
  }

  function clickRemind(event) {
    event.preventDefault();
    try {
      numbers = decrypt(remindInput.value);
      shuffled = true;
      cardWrite();
    } catch {
      errorMessage.textContent = "잘못된 코드입니다.";
    }
  }

  function clickOrder(event) {
    selectOrder.textContent = this.textContent;
    order = Number(this.value) - 1;
    hideElement(orderBtnGroup);
    displayElement(selectOrder);
    if (shuffled) {
      cardWrite();
    }
  }

  function cardWrite() {
    if (order != -1) {
      card.textContent = numbers[order];
      errorMessage.textContent = "";
    } else {
      errorMessage.textContent = "상단에서 자신에게 부여된 번호를 선택햐야 정상 작동합니다.";
    }
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

function hideElement(el) {
  el.classList.add("hide");
}

function displayElement(el) {
  el.classList.remove("hide");
}
