const textInput = document.querySelector('[data-text-input]');
const createBtn =  document.querySelector('[data-create-btn]');
const textResult = document.querySelector('[data-text-result]');

let tasks = JSON.parse(localStorage.getItem('todo')) || [];


createBtn.addEventListener('click', () => {
    const taskText = textInput.value.trim();
    if (taskText) {
        const newTask = {
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        localStorage.setItem('todo', JSON.stringify(tasks));
        render();
    }
})


const render = () => {
    textResult.innerHTML = ''
    tasks.forEach((task, index) => {
        const list = document.createElement('li');
        list.classList.add('list');

        const textCheckbox = document.createElement('div');
        textCheckbox.classList.add('text-checkbox');

        const checkboxBtn = document.createElement('input');
        checkboxBtn.type = 'checkbox';
        checkboxBtn.classList.add('checkbox');
        checkboxBtn.checked = task.completed;

        const textRes = document.createElement('p');
        textRes.textContent = task.text;
        textRes.classList.add('text-result');
        if (task.completed) {
            textRes.classList.add('completed');
        }

        checkboxBtn.addEventListener('click', () => {
            task.completed = !task.completed;
            localStorage.setItem('todo', JSON.stringify(tasks));
            render();
        })

        const removeBtn = document.createElement('input');
        removeBtn.type = 'button';
        removeBtn.value = 'Удалить';
        removeBtn.classList.add('btn-remove');

        removeBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            localStorage.setItem('todo', JSON.stringify(tasks));
            render();
        })

        textCheckbox.append(checkboxBtn, textRes);
        list.append(textCheckbox, removeBtn);
        textResult.append(list);
    })
}

render()