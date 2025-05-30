const contentEl = document.getElementById('content');

// let render =
//  `

// `

async function getData() {
    const response = await fetch('assets/data.json');
    const data = await response.json();
    return data;
}
