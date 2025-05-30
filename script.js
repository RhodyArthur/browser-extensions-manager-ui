const contentEl = document.getElementById('content');
const activeBtn = document.getElementById('active');
const inactiveBtn = document.getElementById('inactive');
const allBtn = document.getElementById('all');
const themeEl = document.querySelector('.theme-toggler');
const sunEl = document.querySelector('.sun');
const moonEl = document.querySelector('.moon');
const body = document.querySelector('body');

let extensions = [];


function toggleTheme() {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme')
        sunEl.classList.add('hidden')
        moonEl.classList.remove('hidden')
    }
    else {
        body.classList.add('light-theme')
        sunEl.classList.remove('hidden');
        moonEl.classList.add('hidden');
    }
    console.log('clicked')
}

async function getData() {
    const response = await fetch('assets/data.json');
    const data = await response.json();
    return data;
}

function resetButtonStyles() {
    [allBtn, activeBtn, inactiveBtn].forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });
}

function renderData(list) {
    contentEl.innerHTML = '';

    const markup = list.map((extension, index) => `
        <div class="card">
            <div class="col">
                <div class="icon">
                    <img src="${extension.logo}" alt="${extension.name}">
                </div>

                <div class="details">
                    <h3 class="name">${extension.name}</h3>
                    <p class="description">${extension.description}</p>
                </div>
            </div>

            <div class="actions">
                <button class="btn">Remove</button>

                <div class="toggle-container">
                    <input type="checkbox" id="toggle-${index}" class="toggle-checkbox" ${extension.isActive ? 'checked' : ''}>
                    <label for="toggle-${index}" class="toggle-label"></label>
                </div>
            </div>
        </div>
    `).join('');

    contentEl.innerHTML = markup;
}

function setActiveColors(button) {
    button.style.backgroundColor = '#F25C54';
    button.style.color = '#091540';
}

(async () => {
    extensions = await getData();
    renderData(extensions);
    setActiveColors(allBtn)
})()

allBtn.addEventListener('click', () => {
    resetButtonStyles()
    setActiveColors(allBtn)
    renderData(extensions)
})

activeBtn.addEventListener('click', () => {
   const active = extensions.filter(extension => extension.isActive);
   resetButtonStyles()
   setActiveColors(activeBtn)
   renderData(active);
})

inactiveBtn.addEventListener('click', () => {
    const inactive = extensions.filter(extension => !extension.isActive);
    resetButtonStyles()
    setActiveColors(inactiveBtn)
    renderData(inactive)
})

themeEl.addEventListener('click', toggleTheme)
