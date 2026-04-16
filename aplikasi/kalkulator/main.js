// Logic Aplikasi Kalkulator
const style = document.createElement('style');
style.textContent = `
    .calc-btn { width: 40px; height: 40px; margin: 2px; }
    #display { width: 100%; margin-bottom: 10px; text-align: right; }
`;
container.appendChild(style);

const html = `
    <input type="text" id="display" disabled value="0">
    <br>
    <button class="calc-btn" onclick="addNum(1)">1</button>
    <button class="calc-btn" onclick="addNum(2)">2</button>
    <button class="calc-btn" onclick="addNum(3)">3</button>
    <button class="calc-btn" onclick="alert('Hasil: ' + document.getElementById('display').value)">=</button>
    <button class="calc-btn" onclick="document.getElementById('display').value='0'">C</button>
`;

container.innerHTML = html;

// Fungsi harus ditaruh di scope window agar tombol onclick bisa akses
window.addNum = (n) => {
    const disp = document.getElementById('display');
    if(disp.value === '0') disp.value = n;
    else disp.value += n;
};
