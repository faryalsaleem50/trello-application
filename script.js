// board title
const boardTitle = document.getElementById("boardTitle");
const titleInput = document.getElementById("titleInput");

boardTitle.addEventListener("click", () => {
  titleInput.value = boardTitle.textContent;
  boardTitle.style.display = "none";
  titleInput.style.display = "inline";
  titleInput.focus();
});

titleInput.addEventListener("blur", () => {
  boardTitle.textContent = titleInput.value || "Untitled Board";
  titleInput.style.display = "none";
  boardTitle.style.display = "inline";
});

titleInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    titleInput.blur();
  }
});

// For star fill
const starBtn = document.getElementById("starBtn");
starBtn.addEventListener("click", () => {
  starBtn.classList.toggle("filled");
  if (starBtn.classList.contains("filled")) {
    starBtn.textContent = "★";  
  } else {
    starBtn.textContent = "☆"; 
  }
});
    //BOARD
const board = document.querySelector('.board');
const addListBtn = document.getElementById('addListBtn');

function createList(title = "New List") {
  const list = document.createElement('div');
  list.className = 'list';
  list.innerHTML = `
    <div class="list-header">
      <span contenteditable="true">${title}</span>
      <span class="delete-list">✖</span>
    </div>
    <div class="cards"></div>
    <div class="add-card">+ Add card</div>
  `;

  // delete list
  list.querySelector('.delete-list').addEventListener('click', () => {
    list.remove();
  });

  // add card
  list.querySelector('.add-card').addEventListener('click', () => {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.innerHTML = `
      <input type="checkbox" class="card-check">
      <span contenteditable="true"></span>
      <button class="delete-card">🗑</button>
    `;

    // delete card
    card.querySelector('.delete-card').addEventListener('click', () => {
      card.remove();
    });

    // complete task 
    const checkbox = card.querySelector('.card-check');
    const text = card.querySelector('span');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        text.style.textDecoration = "line-through";
        text.style.color = "gray";
      } else {
        text.style.textDecoration = "none";
        text.style.color = "black";
      }
    });

    list.querySelector('.cards').appendChild(card);
    text.focus(); 
    enableDragDrop();
  });

  board.appendChild(list);
}

addListBtn.addEventListener('click', () => {
  createList("To Do");
});

// drag  drop
function enableDragDrop() {
  const cards = document.querySelectorAll('.card');
  const lists = document.querySelectorAll('.cards');

  cards.forEach(card => {
    card.addEventListener('dragstart', () => {
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });
  });

  lists.forEach(list => {
    list.addEventListener('dragover', e => {
      e.preventDefault();
      const dragging = document.querySelector('.dragging');
      if (dragging) {
        list.appendChild(dragging);
      }
    });
  });
}


createList("To Do");
