async function openApp(app) {
    if (document.getElementById(`win-${app.id}`)) return;

    // --- TAMBAHAN: Load CSS Aplikasi ---
    if (!document.getElementById(`css-${app.id}`)) {
        const link = document.createElement('link');
        link.id = `css-${app.id}`;
        link.rel = 'stylesheet';
        link.href = `aplikasi/${app.id}/style.css`; // Mengambil CSS dari folder aplikasi
        document.head.appendChild(link);
    }
    // ------------------------------------

    const win = document.createElement('div');
    win.id = `win-${app.id}`;
    // Tambahkan class spesifik ID agar bisa di-target di CSS
    win.className = `window app-${app.id}`; 
    
    // ... sisa kode openApp sama seperti sebelumnya ...
}
