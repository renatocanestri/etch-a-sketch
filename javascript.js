const container = document.querySelector('.container');
const cleanBtn = document.querySelector('.clean');
const gridSizeBtn = document.querySelector('.gridSize');
const randomColorBtn = document.querySelector('.randomColor')
const blackColor = document.querySelector('.blackColor')

let drawingEnabled = false;
let randomColorEnabled = false;

container.addEventListener('click', () => {
    drawingEnabled = !drawingEnabled;
});

container.addEventListener('mouseover', (event) => {
    if (drawingEnabled && event.target.classList.contains('square')) {
        squareColor(event.target);
    }
});

cleanBtn.addEventListener('click', () => {
    cleanContainer();
});

gridSizeBtn.addEventListener('click', () => {
    const gridSizeChoice = +(prompt('Insert a number between 1 and 100:', 16));
    if (!isNaN(gridSizeChoice) && gridSizeChoice >= 1 && gridSizeChoice <= 100) {
        cleanContainer();
        createGrid(gridSizeChoice, gridSizeChoice);
    };
});

randomColorBtn.addEventListener('click', () => {
    randomColorEnabled = true;
});

blackColor.addEventListener('click', () => {
    randomColorEnabled = false;
});

function createSquare(numberRows, numberColumns) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `calc(960px / ${numberColumns})`;
    square.style.height = `calc(600px / ${numberRows})`;
    return square;
};

// Create the rows of squares and append in specific column container
function createRows(numberRows, numberColumns, columnClassName) {
    for (let index = 1; index <= numberRows; index++) {
        const square = createSquare(numberRows, numberColumns);
        const columnContainer = document.querySelector(`.${columnClassName}`);
        columnContainer.appendChild(square);
    };
};

// Create the columns with different class names and append in container
function createColumns(numberColumns) {
    for (let index = 1; index <= numberColumns; index++) {
        const createdColumn = document.createElement('div');
        createdColumn.classList.add(`column${index}`);
        container.appendChild(createdColumn);
    };
};

// Create the grid --> call the createRows function and pass the updated columnClassName each time 
function createGrid(numberRows, numberColumns) {
    createColumns(numberColumns);
    for (index = 1; index <= numberColumns; index++){
        let columnClassName = `column${index}`;
        createRows(numberRows, numberColumns, columnClassName);
    };
};

// Function to clean the container
function cleanContainer() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    };
};

// Generate random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    };
    return color;
};

// Define the color mode
function squareColor(square) {
    if (randomColorEnabled === true) {
        let randomColor = getRandomColor();
        square.style.backgroundColor = randomColor;
    } else {
        square.style.backgroundColor = 'black';
    };
};