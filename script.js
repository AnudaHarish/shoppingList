const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');

function addItem(e){
  e.preventDefault();
  const value = itemInput.value;
  
  if(value === ''){
    alert("Please enter a value");
    return;
  }
  
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(value));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
  itemInput.value = '';
  checkUI();

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

function removeItem(e){
  if(e.target.parentElement.classList.contains('remove-item')){
    if(confirm("Are you sure?")){
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
}

function removeAll(){
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }
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


itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', removeAll);
filter.addEventListener('input', filterListItems);
checkUI();
