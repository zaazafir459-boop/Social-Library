// Data Bawaan Perpustakaan
const defaultBooks = [
    {
        id: 1,
        title: "Matematika Lanjut: Kalkulus & Aljabar SMA",
        category: "pelajaran",
        author: "Tim Edukasi Nusantara",
        cover: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
        content: "Bab 1: Limit Fungsi Aljabar.\nLimit menggambarkan seberapa jauh sebuah fungsi akan berkembang apabila variabel di dalam fungsi yang bersangkutan terus-menerus berkembang mendekati suatu nilai tertentu.\n\nRumus Dasar:\nlim (x->a) [f(x) + g(x)] = lim (x->a) f(x) + lim (x->a) g(x).\n\nLatihan Soal: Tentukan nilai limit dari (x^2 - 4)/(x - 2) saat x mendekati 2!"
    },
    {
        id: 2,
        title: "Chronicles of Emerald Mage (Komik Vol. 1)",
        category: "komik",
        author: "Akira_Art",
        cover: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=600&q=80",
        content: "[Panel 1: Langit ungu menyelimuti Akademi Sihir Arcadia]\nKaito: 'Energi kristal hijau ini... tidak salah lagi, segel kuno mulai terbuka!'\n\n[Panel 2: Aoi melompat dari atap menara dengan tongkat sihirnya]\nAoi: 'Jangan bertindak gegabah, Kaito! Kita harus mengumpulkan anggota klub perpustakaan dulu!'"
    },
    {
        id: 3,
        title: "Senja di Stasiun Kereta Kaca",
        category: "novel",
        author: "Nadia Putri",
        cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        content: "Bab 1: Tiket Tanpa Tujuan\nSetiap pukul lima sore, peron nomor empat selalu dipenuhi cahaya lembayung yang memantul di dinding kaca. Arka selalu duduk di bangku kayu paling ujung, memegang buku catatan bersampul ungu yang ia temukan setahun lalu di ruang arsip sekolah."
    },
    {
        id: 4,
        title: "Catatan Harian Kucing Penjaga Perpustakaan",
        category: "cerpen",
        author: "Mochi_Writer",
        cover: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
        content: "Namaku Kuro. Manusia mengira aku hanya tidur di atas tumpukan ensiklopedia sejarah. Padahal, setiap malam ketika lampu dipadamkan, karakter dari dalam novel dan komik keluar untuk berdiskusi tentang akhir cerita mereka."
    }
];

// Data Bawaan Chat
const defaultChats = {
    umum: [
        { sender: "Sakura_Chan", avatar: "Aoi", text: "Selamat datang di Social Library! Silakan kenalkan diri dan buku favorit kalian~" },
        { sender: "Raka_Pelajar", avatar: "Kaito", text: "Halo semua! Lagi nyari rangkuman Fisika nih, ada yang punya?" }
    ],
    belajar: [
        { sender: "Kaito_ID", avatar: "Kaito", text: "Cek kategori Pelajaran Sekolah, baru saja di-upload materi Kalkulus dasar!" }
    ],
    komik: [
        { sender: "Hana_Art", avatar: "Hana", text: "Ada yang sudah baca Chronicles of Emerald Mage Vol. 1? Gambarnya keren banget!" }
    ],
    menulis: [
        { sender: "Nadia Putri", avatar: "Aoi", text: "Tips membuat plot twist di cerpen: tanam petunjuk kecil di paragraf pertama." }
    ]
};

// State Aplikasi
let books = JSON.parse(localStorage.getItem('sl_books')) || defaultBooks;
let chats = JSON.parse(localStorage.getItem('sl_chats')) || defaultChats;
let currentUser = JSON.parse(localStorage.getItem('sl_user')) || null;
let currentCategory = 'all';
let currentChannel = 'umum';

// Inisialisasi Efek Kelopak Bunga Anime
function createSakuraPetals() {
    const container = document.getElementById('sakuraContainer');
    for (let i = 0; i < 18; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.width = (Math.random() * 10 + 8) + 'px';
        petal.style.height = (Math.random() * 10 + 8) + 'px';
        petal.style.animationDuration = (Math.random() * 6 + 6) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(petal);
    }
}

// Maskot Interaktif
const mascotQuotes = [
    "Konbanwa! Mau baca komik atau belajar matematika hari ini?",
    "Jangan lupa istirahatkan matamu setelah membaca 30 menit ya!",
    "Punya cerpen keren? Yuk bagikan di tab Tambah Karya!",
    "Diskusi bareng teman di Forum & Chat bikin belajar makin seru!"
];
setInterval(() => {
    const speech = document.getElementById('mascotSpeech');
    const randomQuote = mascotQuotes[Math.floor(Math.random() * mascotQuotes.length)];
    speech.textContent = `"${randomQuote}"`;
}, 6000);

// Render Koleksi Buku
function renderBooks(searchQuery = '') {
    const grid = document.getElementById('bookGrid');
    grid.innerHTML = '';

    const filtered = books.filter(book => {
        const matchCat = currentCategory === 'all' || book.category === currentCategory;
        const matchSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align:center;">Tidak ada karya yang cocok dengan pencarianmu.</p>`;
        return;
    }

    filtered.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-cover" style="background-image: url('${book.cover}')">
                <span class="book-tag">${book.category}</span>
            </div>
            <div class="book-info">
                <div>
                    <h3>${book.title}</h3>
                    <p class="book-author"><i class="fa-solid fa-user-pen"></i> ${book.author}</p>
                </div>
                <button class="btn-read" onclick="openReader(${book.id})"><i class="fa-solid fa-book-open"></i> Baca Sekarang</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Buka Modal Baca Buku
window.openReader = function(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    const body = document.getElementById('readerBody');
    body.innerHTML = `
        <span class="badge-anime">${book.category.toUpperCase()}</span>
        <h2 style="margin-bottom: 0.3rem;">${book.title}</h2>
        <p style="color: var(--purple-primary); margin-bottom: 1.5rem;">Oleh: ${book.author}</p>
        <div style="white-space: pre-line; line-height: 1.8; background: rgba(15,12,29,0.6); padding: 1.5rem; border-radius: 14px; border: 1px solid var(--border-glass);">
            ${book.content}
        </div>
    `;
    document.getElementById('readerModal').classList.add('active');
};

// Render Chat
function renderChat() {
    const container = document.getElementById('chatMessages');
    container.innerHTML = '';
    const messages = chats[currentChannel] || [];

    messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = 'msg-item';
        div.innerHTML = `
            <img src="https://api.dicebear.com/9.x/adventurer/svg?seed=${msg.avatar}&backgroundColor=c0aede" alt="Avatar">
            <div class="msg-bubble">
                <div class="msg-sender">${msg.sender}</div>
                <div>${msg.text}</div>
            </div>
        `;
        container.appendChild(div);
    });
    container.scrollTop = container.scrollHeight;
}

// Update Tampilan Login User
function updateUserUI() {
    const userSection = document.getElementById('userSection');
    if (currentUser) {
        userSection.innerHTML = `
            <div class="user-pill">
                <img src="https://api.dicebear.com/9.x/adventurer/svg?seed=${currentUser.avatar}&backgroundColor=c0aede" alt="User">
                <span>${currentUser.username}</span>
                <button class="btn-logout" onclick="logoutUser()" title="Keluar"><i class="fa-solid fa-power-off"></i></button>
            </div>
        `;
        document.getElementById('bookAuthor').value = currentUser.username;
    } else {
        userSection.innerHTML = `<button class="btn-login" id="openLoginBtn"><i class="fa-solid fa-right-to-bracket"></i> Masuk / Daftar</button>`;
        document.getElementById('openLoginBtn').addEventListener('click', () => {
            document.getElementById('loginModal').classList.add('active');
        });
    }
}

window.logoutUser = function() {
    currentUser = null;
    localStorage.removeItem('sl_user');
    updateUserUI();
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    createSakuraPetals();
    updateUserUI();
    renderBooks();
    renderChat();

    // Navigasi Tab
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            link.classList.add('active');
            document.getElementById(`tab-${link.dataset.tab}`).classList.add('active');
        });
    });

    // Filter Kategori
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderBooks(document.getElementById('searchInput').value);
        });
    });

    // Pencarian Real-time
    document.getElementById('searchInput').addEventListener('input', (e) => {
        renderBooks(e.target.value);
    });

    // Pindah Channel Chat
    document.querySelectorAll('#channelList li').forEach(li => {
        li.addEventListener('click', () => {
            document.querySelectorAll('#channelList li').forEach(item => item.classList.remove('active'));
            li.classList.add('active');
            currentChannel = li.dataset.channel;
            document.getElementById('currentChannelTitle').textContent = li.textContent;
            renderChat();
        });
    });

    // Kirim Pesan Chat
    document.getElementById('chatForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert("Silakan masuk (Login) terlebih dahulu untuk mengirim pesan!");
            document.getElementById('loginModal').classList.add('active');
            return;
        }
        const input = document.getElementById('chatInput');
        if (!input.value.trim()) return;

        chats[currentChannel].push({
            sender: currentUser.username,
            avatar: currentUser.avatar,
            text: input.value.trim()
        });
        localStorage.setItem('sl_chats', JSON.stringify(chats));
        input.value = '';
        renderChat();
    });

    // Upload Karya Baru
    document.getElementById('uploadForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const defaultCovers = {
            pelajaran: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
            komik: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
            novel: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
            cerpen: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80"
        };

        const cat = document.getElementById('bookCategory').value;
        const newBook = {
            id: Date.now(),
            title: document.getElementById('bookTitle').value,
            category: cat,
            author: document.getElementById('bookAuthor').value,
            cover: document.getElementById('bookCover').value || defaultCovers[cat],
            content: document.getElementById('bookContent').value
        };

        books.unshift(newBook);
        localStorage.setItem('sl_books', JSON.stringify(books));
        e.target.reset();
        alert("Karya berhasil diterbitkan ke Social Library!");
        document.querySelector('[data-tab="library"]').click();
        renderBooks();
    });

    // Form Login
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser = {
            username: document.getElementById('loginUsername').value.trim(),
            avatar: document.getElementById('loginAvatar').value
        };
        localStorage.setItem('sl_user', JSON.stringify(currentUser));
        document.getElementById('loginModal').classList.remove('active');
        updateUserUI();
    });

    // Tutup Modal
    document.getElementById('closeLoginModal').onclick = () => document.getElementById('loginModal').classList.remove('active');
    document.getElementById('closeReaderModal').onclick = () => document.getElementById('readerModal').classList.remove('active');
});
