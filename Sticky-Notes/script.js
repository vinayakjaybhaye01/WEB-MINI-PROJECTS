let color = document.getElementById('color');
let createBtn = document.getElementById('createBtn');
let list = document.getElementById('list');


// this function gives lighter shade of color given
function lightenColor(hex, percent) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Lighten the color
    r = Math.min(255, Math.floor(r + (255 - r) * percent));
    g = Math.min(255, Math.floor(g + (255 - g) * percent));
    b = Math.min(255, Math.floor(b + (255 - b) * percent));

    // Convert RGB back to hex
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
}

// this function gives lighter shade of color given
function darkenColor(hex, percent) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Darken the color
    r = Math.max(0, Math.floor(r * (1 - percent)));
    g = Math.max(0, Math.floor(g * (1 - percent)));
    b = Math.max(0, Math.floor(b * (1 - percent)));

    // Convert RGB back to hex
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
}

// Create a new note
createBtn.onclick = () => {
    let newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.innerHTML = `
        <span class="close">X</span>
        <textarea rows="10" cols="30" placeholder="Write note..."></textarea>
    `;
    newNote.style.borderColor = darkenColor(color.value, 0.2);
    newNote.style.backgroundColor = lightenColor(color.value, 0.2);

    let textarea = newNote.querySelector('textarea');
    textarea.style.color = lightenColor(color.value, 1);

    newNote.style.position = 'absolute';
    newNote.style.left = '200px';
    newNote.style.top = '200px';
    list.appendChild(newNote);
};


// Object to track note and cursor information
let note = {
    dom: null,
    x: 0,
    y: 0
};

let cursor = {
    x: 0,
    y: 0
};

// Event delegation to handle dynamically created notes
document.addEventListener('mousedown', (event) => {
    // Check if the click is on a .note but not inside a textarea
    if (event.target.classList.contains('note') && event.target.tagName !== 'TEXTAREA') {
        cursor = {
            x: event.clientX,
            y: event.clientY
        };
        // console.log(cursor)

        // Store the note's initial position and reference to the DOM element
        note = {
            dom: event.target,
            x: event.target.getBoundingClientRect().left,
            y: event.target.getBoundingClientRect().top
        };

        note.dom.style.cursor = 'grabbing';
    }
});




// Move the note with mouse movement
document.addEventListener('mousemove', (event) => {
    if (!note.dom) return; // If no note is being dragged, return

    let currentCursor = {
        x: event.clientX,
        y: event.clientY
    };

    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    };


    // this is code for prevent note from dragged out of screen
    let newLeft = note.x + distance.x;
    let newTop = note.y + distance.y;

    let noteWidth = note.dom.offsetWidth;
    let noteHeight = note.dom.offsetHeight;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + noteWidth > viewportWidth) newLeft = viewportWidth - noteWidth;
    if (newTop + noteHeight > viewportHeight) newTop = viewportHeight - noteHeight;

    // Move the note to the new position
    note.dom.style.left = newLeft + 'px';
    note.dom.style.top = newTop + 'px';
});

// Stop dragging on mouseup
document.addEventListener('mouseup', () => {
    if (note.dom) {
        note.dom.style.cursor = 'grab'; // Set the cursor back to grab
        note.dom = null; // Reset the note
    }
});

// Event delegation to handle the 'close' button dynamically
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('close')) {
        event.target.parentNode.remove();
        console.log('Note removed');
    }
});


// Prevent cursor from vanishing while interacting with textarea
document.addEventListener('mousedown', (event) => {
    if (event.target.tagName === 'TEXTAREA') {
        event.target.style.cursor = 'text'; // Make sure the cursor stays as text for textarea
    }
});
