const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');

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

itemForm.addEventListener('submit', addItem);
