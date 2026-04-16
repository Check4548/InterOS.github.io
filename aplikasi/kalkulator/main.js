// Buat element style
const style = document.createElement('style');
style.textContent = `
    .app-notepad .window-body {
        background: #fffbe6; /* Warna kertas kuning */
        padding: 0;
    }
    .app-notepad textarea {
        width: 100%;
        height: 100%;
        border: none;
        resize: none;
        background: transparent;
        font-family: 'Courier New', monospace;
        padding: 10px;
        outline: none;
    }
`;
document.head.appendChild(style);

// Render HTML
container.innerHTML = `
    <textarea placeholder="Tulis catatan di sini..."></textarea>
`;
