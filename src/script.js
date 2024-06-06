
function generateTableRow(series, startIndex, isImageRow, addThickBorder, length = 15) {
    let row = '';
    for (let i = 0; i < length; i++) {
        const num = series[startIndex + i];
        const content = isImageRow ? `<img src="${numberToImageMap[num]}" alt="${num}">` : num;
        const extraClass = addThickBorder && (i === 9) ? 'thick-border-right' : '';
        row += `<td class="${extraClass}" data-original-text="${num}">${content}</td>`;
    }
    return row;
}


let numberToImageMap = {
    1: 'src/img/1.png',
    2: 'src/img/2.png',
    3: 'src/img/3.png',
    4: 'src/img/4.png',
    5: 'src/img/5.png',
    6: 'src/img/6.png',
    7: 'src/img/7.png',
    8: 'src/img/8.png',
    9: 'src/img/9.png'
};

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const now = new Date();
    timerElement.textContent = now.toLocaleTimeString();
}

function replaceNumbersWithImages(text) {
    return text.split('').map(char => {
        const imageUrl = numberToImageMap[char];
        return imageUrl ? `<img src="${imageUrl}" alt="${char}">` : char;
    }).join('');
}

function shuffleMappings() {
    const numbers = Object.keys(numberToImageMap);
    const images = Object.values(numberToImageMap);

    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }

    numberToImageMap = {};
    for (let i = 0; i < numbers.length; i++) {
        numberToImageMap[numbers[i]] = images[i];
    }

    console.log("New Mapping: ", numberToImageMap);
}

function updateTable() {
    const firstRowCells = document.querySelectorAll('.table_box tr:nth-child(1) td');
    firstRowCells.forEach(cell => {
        const originalText = cell.getAttribute('data-original-text');
        cell.innerHTML = replaceNumbersWithImages(originalText);
    });
}

window.onload = function () {
    // updateTimer();

    const keyTable = document.querySelector('.top_box table tbody');
    keyTable.innerHTML = `
        <tr>${generateTableRow([1, 2, 3, 4, 5, 6, 7, 8, 9], 0, false, false, 9)}</tr>
        <tr>${generateTableRow([1, 2, 3, 4, 5, 6, 7, 8, 9], 0, false, false, 9)}</tr>
    `;

    const formBoxContainer = document.getElementById('formBoxContainer');

    for (let i = 0; i < 8; i++) { // Skapar 8 st form_box-tabeller
        const startIndex = i * 15;
        const formBox = document.createElement('div');
        formBox.classList.add('table_box', 'form_box');
        formBox.innerHTML = `
            <table>
                <tbody>
                    <tr>${generateTableRow(numberSeries, startIndex, true, i === 0)}</tr>
                    <tr>${generateTableRow(numberSeries, startIndex, false, i === 0)}</tr>
                </tbody>
            </table>
        `;
        formBoxContainer.appendChild(formBox);
    }

    setInterval(updateTimer, 1000);

    // Initial mapping
    updateTable();

    // Shuffle and update table every 3 seconds
    setInterval(function () {
        shuffleMappings();
        updateTable();
    }, 2000);
}
