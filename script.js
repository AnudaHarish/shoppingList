const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');

function onItemAddSumbit(e){
  e.preventDefault();
  const value = itemInput.value;
  
  if(value === ''){
    alert("Please enter a value");
    return;
  }
  
  addItemsToDOM(value);

  addItemsToStorage(value);
  
  itemInput.value = '';
  checkUI();

}

function addItemsToDOM(item){
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
}

function addItemsToStorage(item){
  let itemlistArray = getDataFromStorage();
  
  itemlistArray.push(item);

  localStorage.setItem("items", JSON.stringify(itemlistArray));
}

function createButton(classes){
  const btn = document.createElement('button');
  btn.className = classes;
  const i = createIcon('fa-solid fa-xmark');
  btn.appendChild(i);
  return btn;
}

function createIcon(classes){
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function onClickRemove(e){
  if(e.target.parentElement.classList.contains('remove-item')){
    removeItem(e.target.parentElement.parentElement);
  }
}

function removeItem(item){
  if(confirm("Are you sure?")){
      item.remove();
      updateStorage(item.firstChild.textContent);
      checkUI();
    }
}

function removeAll(){
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }
  localStorage.removeItem('items');
  checkUI();
}

function filterListItems(e){
  const items = itemList.querySelectorAll('li');
  const value = e.target.value.toLowerCase();
  items.forEach((item) => {
    const text = item.firstChild.textContent.toLowerCase();
    if(text.indexOf(value) !== -1){
      item.style.display = 'flex';
    }else{
      item.style.display = 'none';
    }
  });
}

function getDataFromStorage(){
  let itemListArray;
  if(localStorage.getItem('items') === null){
    itemiLstArray = [];
  }else{
    itemListArray = JSON.parse(localStorage.getItem("items"));
  }
  return itemListArray;
}

function loadData(){
  const items = getDataFromStorage();
  items.forEach((item) => addItemsToDOM(item));
  checkUI();
}

function updateStorage(value){
  let items = getDataFromStorage();
  items = items.filter((item) => item !== value);
  localStorage.setItem('items', JSON.stringify(items));
}

function checkUI(){
  const items = itemList.querySelectorAll('li');
  if(items.length === 0){
    clearBtn.style.display = 'none';
    filter.style.display = 'none';
  }else{
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
  }
}

function init(){
  itemForm.addEventListener('submit', onItemAddSumbit);
  itemList.addEventListener('click', onClickRemove);
  clearBtn.addEventListener('click', removeAll);
  filter.addEventListener('input', filterListItems);
  document.addEventListener('DOMContentLoaded', loadData);
  checkUI();
}

init();

