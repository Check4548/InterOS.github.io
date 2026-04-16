// Konfigurasi aplikasi (Simulasi "Database" Folder)
// Di GitHub Pages, kita harus mendefinisikan ini secara manual 
// karena JS client-side tidak bisa scan folder.
const appRegistry = [
    { id: 'kalkulator', name: 'Kalkulator', icon: 'aplikasi/kalkulator/icon.png', script: 'aplikasi/kalkulator/main.js' },
    { id: 'notepad', name: 'Notepad', icon: 'aplikasi/notepad/icon.png', script: 'aplikasi/notepad/main.js' }
];

const desktop = document.getElementById('desktop');
const windowContainer = document.getElementById('window-container');

// 1. Render Icon di Desktop
function initDesktop() {
    appRegistry.forEach(app => {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'app-icon';
        iconDiv.innerHTML = `
            <img src="${app.icon}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/2526/2526448.png'">
            <span>${app.name}</span>
        `;
        iconDiv.onclick = () => openApp(app);
        desktop.appendChild(iconDiv);
    });
}

// 2. Fungsi Membuka Aplikasi
async function openApp(app) {
    // Cek jika sudah terbuka (opsional)
    if (document.getElementById(`win-${app.id}`)) return;

    // Buat element Window
    const win = document.createElement('div');
    win.id = `win-${app.id}`;
    win.className = 'window';
    win.style.left = '100px';
    win.style.top = '100px';

    win.innerHTML = `
        <div class="window-header" onmousedown="dragWindow(this)">
            <span>${app.name}</span>
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
        <div class="window-body" id="body-${app.id}">
            <p>Memuat...</p>
        </div>
    `;

    windowContainer.appendChild(win);

    // 3. Load Script Aplikasi secara dinamis
    try {
        const response = await fetch(app.script);
        const scriptText = await response.text();
        
        // Menjalankan script aplikasi
        // Kita bungkus dalam function agar aplikasi punya scope sendiri
        const appFunction = new Function('container', 'windowId', scriptText);
        const bodyElement = document.getElementById(`body-${app.id}`);
        bodyElement.innerHTML = ''; // Bersihkan tulisan "Memuat..."
        
        appFunction(bodyElement, app.id);
    } catch (err) {
        console.error("Gagal memuat aplikasi:", err);
        document.getElementById(`body-${app.id}`).innerHTML = "Gagal memuat aplikasi.";
    }
}

// Fitur Drag Sederhana
function dragWindow(header) {
    const win = header.parentElement;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    header.onmousedown = (e) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
        document.onmousemove = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            win.style.top = (win.offsetTop - pos2) + "px";
            win.style.left = (win.offsetLeft - pos1) + "px";
        };
    };
}

// Jam
setInterval(() => {
    const now = new Date();
    document.getElementById('clock').innerText = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
}, 1000);

initDesktop();
