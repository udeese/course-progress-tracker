let progress = parseFloat(localStorage.getItem('courseProgress')) || 20;
let progressHistory = JSON.parse(localStorage.getItem('progressHistory')) || [];
let redoHistory = JSON.parse(localStorage.getItem('redoHistory')) || [];

function updateUI() {
  document.getElementById('progressBar').style.width = progress + '%';
  document.getElementById('percentText').textContent = `Progress: ${progress}%`;
  const daysLeft = Math.ceil((100 - progress) / 2);
  document.getElementById('daysLeft').textContent = `Days remaining: ${daysLeft}`;
  document.getElementById('undoStepsText').textContent = `Undo steps available: ${progressHistory.length}`;
  document.getElementById('redoStepsText').textContent = `Redo steps available: ${redoHistory.length}`;
}

function saveProgress() {
  progressHistory.push(progress);
  localStorage.setItem('progressHistory', JSON.stringify(progressHistory));
  redoHistory = []; // clear redo when new action is made
  localStorage.setItem('redoHistory', JSON.stringify(redoHistory));
  localStorage.setItem('courseProgress', progress);
}

function addProgress() {
  if (progress < 100) {
    saveProgress();
    progress += 2;
    if (progress > 100) progress = 100;
    localStorage.setItem('courseProgress', progress);
    updateUI();
  }
}

function resetProgress() {
  const confirmReset = confirm("Are you sure you want to reset your progress?");
  if (confirmReset) {
    saveProgress();
    progress = 0;
    localStorage.setItem('courseProgress', progress);
    updateUI();
  }
}

function undoProgress() {
  if (progressHistory.length > 0) {
    redoHistory.push(progress); // store current for redo
    progress = progressHistory.pop();
    localStorage.setItem('courseProgress', progress);
    localStorage.setItem('progressHistory', JSON.stringify(progressHistory));
    localStorage.setItem('redoHistory', JSON.stringify(redoHistory));
    updateUI();
  } else {
    alert("Nothing to undo!");
  }
}

function redoProgress() {
  if (redoHistory.length > 0) {
    progressHistory.push(progress); // store current for undo again
    progress = redoHistory.pop();
    localStorage.setItem('courseProgress', progress);
    localStorage.setItem('progressHistory', JSON.stringify(progressHistory));
    localStorage.setItem('redoHistory', JSON.stringify(redoHistory));
    updateUI();
  } else {
    alert("Nothing to redo!");
  }
}

// Initial UI update
updateUI();

document.addEventListener('keydown', function (e) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;
  
    // Undo: Ctrl+Z or Cmd+Z
    if (ctrlOrCmd && e.key.toLowerCase() === 'z' && !e.shiftKey) {
      e.preventDefault();
      undoProgress();
    }
  
    // Redo: Ctrl+Y or Cmd+Shift+Z
    if ((ctrlOrCmd && e.key.toLowerCase() === 'y') || (isMac && ctrlOrCmd && e.key.toLowerCase() === 'z' && e.shiftKey)) {
      e.preventDefault();
      redoProgress();
    }
  });
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('[Service Worker] Registered:', reg.scope))
      .catch(err => console.error('[Service Worker] Error:', err));
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('[Service Worker] Registered:', reg.scope))
      .catch(err => console.error('[Service Worker] Error:', err));
  }
  