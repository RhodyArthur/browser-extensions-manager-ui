const contentEl = document.getElementById('content');


async function getData() {
    const response = await fetch('assets/data.json');
    const data = await response.json();
    return data;
}

(async () => {
    const extensions = await getData();

    extensions.map(extension => {
        contentEl.innerHTML +=
        `
            <div class="card">
                    <div class="col">
                        <div class="icon">
                            <img src="${extension.logo}" alt="${extension.name}">
                        </div>

                        <div class="details">
                            <h3 class="name">${extension.name}</h5>
                            <p class="description">${extension.description}</p>
                        </div>
                    </div>

                    <div class="actions">
                        <button class="btn">Remove</button>

                        <div class="toggle-container">
                            <input type="checkbox" id="toggle" class="toggle-checkbox">
                            <label for="toggle" class="toggle-label"></label>
                        </div>
                    </div>

                </div>
        `
    })
})()