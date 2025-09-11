const inputText = document.querySelector('[data-input-text]');
const createBtn = document.querySelector('[data-create-button]');
const colorsBtn = document.querySelector('[data-colors]');
const mainResult = document.querySelector('[data-main-block]');

let textColor = null
let currentBordered = null;

const arrey = JSON.parse(localStorage.getItem('todos')) || []

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

colorsBtn.addEventListener('click', (event) => {
    if (event.target.classList[1] === 'red') {
        textColor = 'red'
    } else if (event.target.classList[1] === 'blue') {
        textColor = 'blue'
    } else if (event.target.classList[1] === 'green') {
        textColor = 'green'
    } else if (event.target.classList[1] === 'yellow') {
        textColor = 'yellow'
    } else if (event.target.classList[1] === 'orange') {
        textColor = 'orange'
    } else if (event.target.classList[1] === 'gray') {
        textColor = 'gray'
    } else if (event.target.classList[1] === 'violet') {
        textColor = 'violet'
    }
})

createBtn.addEventListener('click', () => {
    if (inputText.value.trim()) {
        const obj = {
            text: inputText.value,
            check: false,
            color: textColor
        }

        arrey.push(obj)

        localStorage.setItem('todos', JSON.stringify(arrey));
        render();
        
    }
    inputText.value = ''
    textColor = ''
    currentBordered.style.border = '';
})

const render = () => {
    mainResult.innerHTML = ''
    arrey.forEach((item, index) => {
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
        resText.style.textDecoration = item.check ? 'line-through' : ''
        resText.style.color = item.color

        checkboxInput.addEventListener('click', () => {
            item.check = !item.check
            if (item.check === true) {
                resText.style.textDecoration = 'line-through'
            } else {
                resText.style.textDecoration = ''
            }
            localStorage.setItem('todos', JSON.stringify(arrey));
        })

        const removeBtn = document.createElement('input');
        removeBtn.type = 'button';
        removeBtn.value = 'удалить';
        removeBtn.classList.add('btn-remove');

        removeBtn.addEventListener('click', () => {
            arrey.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(arrey));
            render();
        })

        blockCheckResult.append(checkboxInput, resText);
        blockRemove.append(blockCheckResult, removeBtn);
        mainResult.prepend(blockRemove);
    })
}

render();