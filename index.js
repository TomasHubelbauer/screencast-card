const LOCAL_STORAGE_KEY = 'screencast-card-archive';

/** @type {HTMLDivElement} */
const editorDiv = document.querySelector('#editorDiv');

/** @type {HTMLButtonElement} */
const exportButton = document.querySelector('#exportButton');

/** @type {HTMLDivElement} */
const archiveDiv = document.querySelector('#archiveDiv');

/** @typedef {{ stamp: string; content: string; }} Entry */
/** @typedef {Entry[]} Archive */

document.addEventListener('visibilitychange', () => {
  switch (document.visibilityState) {
    case 'visible': {
      editorDiv.textContent = '';
      renderArchive();
      break;
    }
    case 'hidden': {
      if (editorDiv.textContent) {
        /** @type {Archive} */
        const archive = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');

        const entry = { stamp: new Date().toISOString(), content: editorDiv.textContent.trim() };
        archive.unshift(entry);

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(archive));
      }

      break;
    }
    default: {
      throw new Error(`Unknown visibilityState: ${document.visibilityState}`);
    }
  }
});

function renderArchive() {
  archiveDiv.replaceChildren();

  /** @type {Archive} */
  const archive = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');

  for (const entry of archive) {
    const div = document.createElement('div');
    div.className = 'entryDiv';

    const metaDiv = document.createElement('div');
    metaDiv.className = 'metaDiv';

    const recallButton = document.createElement('button');
    recallButton.className = 'recallButton';
    recallButton.textContent = '⇑';
    recallButton.addEventListener('click', () => {
      editorDiv.textContent = entry.content;
    });

    metaDiv.appendChild(recallButton);

    const stamp = new Date(entry.stamp);

    const stampDiv = document.createElement('div');
    stampDiv.className = 'stampDiv';
    stampDiv.textContent = stamp.toLocaleString();

    metaDiv.appendChild(stampDiv);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = '⌫';
    deleteButton.addEventListener('click', () => {
      if (!confirm('Delete this entry?')) {
        return;
      }

      const index = archive.indexOf(entry);
      archive.splice(index, 1);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(archive));
      renderArchive();
    });

    metaDiv.appendChild(deleteButton);

    div.appendChild(metaDiv);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'contentDiv';
    contentDiv.textContent = entry.content;

    div.appendChild(contentDiv);

    archiveDiv.appendChild(div);
  }

  exportButton.disabled = archive.length === 0;
}

renderArchive();

exportButton.addEventListener('click', () => {
  /** @type {Archive} */
  const archive = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  if (archive.length === 0) {
    alert('No archive entries to export.');
    return;
  }

  const blob = new Blob([JSON.stringify(archive, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const downloadA = document.createElement('a');
  downloadA.href = url;
  downloadA.download = 'screencast-card.txt';
  downloadA.click();

  URL.revokeObjectURL(url);
  downloadA.remove();
});
