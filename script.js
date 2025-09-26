const inputText = document.querySelector('[data-input-text]');
const createBtn = document.querySelector('[data-create-button]');
const colorsBtn = document.querySelector('[data-colors]');
const removeAll = document.querySelector('[data-remove-all]');
const searchText = document.querySelector('[data-search-text]');
const mainResult = document.querySelector('[data-main-block]');

let textColor = null;
let currentBordered = null;

let filteredArrey = [];

const arrey = JSON.parse(localStorage.getItem('todos')) || [];

document.addEventListener('DOMContentLoaded', function() {
    const colorButtons = document.querySelectorAll('.btn-color');

    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentBordered) {
                currentBordered.style.border = '';
            }

            this.style.border = '2px solid black';
            currentBordered = this;
        });
    });
});

document.addEventListener('click', () => {
    textColor = '';
    if (currentBordered) {
        currentBordered.style.border = '';
    }
});

colorsBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.classList[1] === 'red') {
        textColor = 'red';
    } else if (event.target.classList[1] === 'blue') {
        textColor = 'blue';
    } else if (event.target.classList[1] === 'green') {
        textColor = 'green';
    } else if (event.target.classList[1] === 'yellow') {
        textColor = 'yellow';
    } else if (event.target.classList[1] === 'orange') {
        textColor = 'orange';
    } else if (event.target.classList[1] === 'gray') {
        textColor = 'gray';
    } else if (event.target.classList[1] === 'violet') {
        textColor = 'violet';
    }
});

const searchTextInput = document.createElement('input');
searchTextInput.type = 'text';
searchTextInput.placeholder = 'Поиск текста';
searchTextInput.classList.add('search-filter');

const buttonRemoveAll = document.createElement('input');
buttonRemoveAll.type = 'button';
buttonRemoveAll.value = 'Удалить всё';
buttonRemoveAll.classList.add('remove-all');

buttonRemoveAll.addEventListener('click', () => {
    const askForRemove = confirm('Вы действительно хотите удалить всё?');
    if (askForRemove) {
        arrey.length = 0;
        removeAll.textContent = '';
        searchText.textContent = '';
        localStorage.setItem('todos', JSON.stringify(arrey));
        render();
    }
});


function mainCode() {
    if (inputText.value.trim()) {
        const obj = {
            text: inputText.value,
            check: false,
            color: textColor
        }

        arrey.push(obj);

        localStorage.setItem('todos', JSON.stringify(arrey));
        render();
    }
    inputText.value = '';
    textColor = '';
    if (currentBordered) {
        currentBordered.style.border = '';
    }
}

inputText.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        mainCode();
    }
})

inputText.addEventListener('click', (event) => {
    event.stopPropagation();
})

createBtn.addEventListener('click', () => {
    mainCode();
})

function addMainCode(item, index) {
    const blockRemove = document.createElement('div');
    blockRemove.classList.add('block-remove');
    
    const blockCheckResult = document.createElement('div');
    blockCheckResult.classList.add('block-checkbox-result');
    
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.classList.add('checkbox');
    checkboxInput.checked = item.check;
    
    const resText = document.createElement('p');
    resText.textContent = item.text;
    resText.classList.add('result');
    resText.style.textDecoration = item.check ? 'line-through' : '';
    resText.style.color = item.color;
    
    checkboxInput.addEventListener('click', () => {
        item.check = !item.check;
        if (item.check === true) {
            resText.style.textDecoration = 'line-through';
        } else {
            resText.style.textDecoration = '';
        }
        localStorage.setItem('todos', JSON.stringify(arrey));
    });
    
    const removeBtn = document.createElement('input');
    removeBtn.type = 'button';
    removeBtn.value = 'удалить';
    removeBtn.classList.add('btn-remove');
    
    removeBtn.addEventListener('click', () => {
        arrey.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(arrey));
        render();
        if (mainResult.textContent === '') {
            removeAll.textContent = '';
            searchText.textContent = '';
        }
    });
    
    blockCheckResult.append(checkboxInput, resText);
    blockRemove.append(blockCheckResult, removeBtn);
    mainResult.prepend(blockRemove);
    removeAll.append(buttonRemoveAll);
}

const render = () => {
    mainResult.innerHTML = '';
    searchText.innerHTML = '';
    arrey.forEach((item, index) => {
        addMainCode(item, index)
    });

    if (arrey.length > 0 && !searchText.querySelector('.search-filter')) {
        const searchTextInput = document.createElement('input');
        searchTextInput.type = 'text';
        searchTextInput.placeholder = 'Поиск текста';
        searchTextInput.classList.add('search-filter');

        searchTextInput.addEventListener('input', (event) => {
            const search = event.target.value.toLowerCase();

            filteredArrey = arrey.filter((element) => {
                return element.text.toLowerCase().includes(search);
            });

            mainResult.innerHTML = '';

            filteredArrey.forEach((element, index) => {
                addMainCode(element, index);
            });
        });
        searchText.append(searchTextInput);
    }
}

render();