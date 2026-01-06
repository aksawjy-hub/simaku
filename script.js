// Data Dummy & LocalStorage
let transactions = JSON.parse(localStorage.getItem('my_transactions')) || [];

// 1. Animasi Emoji Bergerak (Tetap Sama)
const emojis = ['🚀', '🐷', '👽', '🤡', '💖', '🌻', '🍬', '🎃', '💰', '📊'];
function createEmoji() {
    const emojiContainer = document.getElementById('floating-emojis');
    if(!emojiContainer) return;
    const emoji = document.createElement('div');
    emoji.classList.add('floating');
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDuration = (Math.random() * 3 + 5) + "s";
    emojiContainer.appendChild(emoji);
    setTimeout(() => emoji.remove(), 8000);
}
setInterval(createEmoji, 2000);

// 2. Fungsi Login (DIUBAH: Sekarang menyimpan nama)
function handleLogin() {
    const userField = document.getElementById('login-user');
    if (userField && userField.value.trim() !== "") {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('namaUser', userField.value); // Menyimpan nama ke memori browser
        window.location.href = 'index.html';
    } else {
        alert("Masukkan nama kamu dulu ya!");
    }
}

function handleRegister() {
    const user = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;

    if (user.trim() !== "" && pass.trim() !== "") {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('namaUser', user); // Simpan nama untuk dashboard
        alert("Pendaftaran berhasil!");
        window.location.href = 'index.html';
    } else {
        alert("Isi username dan password dulu ya!");
    }
}

// 3. Fungsi Render Tabel & Tampilkan Nama (DIUBAH)
function renderTable() {
    // Menampilkan Nama di Dashboard
    const displayNama = document.getElementById('username-display');
    const namaTersimpan = localStorage.getItem('namaUser');
    if (displayNama && namaTersimpan) {
        displayNama.innerText = namaTersimpan;
    }

    const list = document.getElementById('transaction-list');
    const totalDisp = document.getElementById('total-saldo');
    if(!list) return;

    let total = 0;
    list.innerHTML = "";
    
    transactions.forEach(t => {
        if(t.tipe === "Pemasukan") total += parseInt(t.jumlah);
        else total -= parseInt(t.jumlah);

        list.innerHTML += `
            <tr>
                <td><button onclick="hapus(${t.id})" style="color:red; border:none; background:none; cursor:pointer">Hapus</button></td>
                <td>${t.kategori}</td>
                <td>${t.tipe}</td>
                <td>Rp ${parseInt(t.jumlah).toLocaleString()}</td>
                <td>${t.keterangan}</td>
                <td>${t.tanggal}</td>
            </tr>
        `;
    });
    if(totalDisp) totalDisp.innerText = total.toLocaleString();
}

// 4. Fungsi Simpan Transaksi (Tetap Sama)
function saveTransaction() {
    const data = {
        id: Date.now(),
        kategori: document.getElementById('kategori').value,
        tipe: document.getElementById('tipe').value,
        jumlah: document.getElementById('jumlah').value,
        keterangan: document.getElementById('keterangan').value,
        tanggal: document.getElementById('tanggal').value
    };
    
    transactions.push(data);
    localStorage.setItem('my_transactions', JSON.stringify(transactions));
    window.location.href = 'index.html';
}

function hapus(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('my_transactions', JSON.stringify(transactions));
    renderTable();
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('namaUser');
    window.location.href = 'login.html';
}

// Jalankan renderTable saat halaman dashboard dibuka
if (document.getElementById('transaction-list') || document.getElementById('username-display')) {
    window.onload = renderTable;
}