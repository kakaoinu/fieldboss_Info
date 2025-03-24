function showFutureTime(buttonId) {
    const now = new Date();
    const future = new Date(now.getTime() + 2 * 60 * 60 * 1000 + 10 * 1000);
    const timeDisplay = document.createElement("p");
    timeDisplay.textContent = `${future.toLocaleTimeString()}`;
    
    const recordContent = document.querySelector(`#record${buttonId} .record-content`);
    if (recordContent.children.length >= 3) {
        recordContent.removeChild(recordContent.firstChild);
    }
    
    recordContent.appendChild(timeDisplay);
}

function undoLastEntry(buttonId) {
    const recordContent = document.querySelector(`#record${buttonId} .record-content`);
    if (recordContent.lastChild) {
        recordContent.removeChild(recordContent.lastChild);
    }
}
