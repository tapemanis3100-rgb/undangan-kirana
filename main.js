let config = getConfig();
let audio = null;
let musicSrc = null;

// Inisialisasi website saat halaman dimuat
function initWebsite() {
    audio = document.getElementById('backgroundMusic');
    
    // Siapkan sumber musik
    if (config.selectedMusic && FILES.music.includes(config.selectedMusic)) {
        musicSrc = `music/${config.selectedMusic}`;
    } else if (FILES.music.length > 0) {
        musicSrc = `music/${FILES.music[0]}`;
    } else if (config.uploadedMusic) {
        musicSrc = config.uploadedMusic;
    }
    
    if (musicSrc) {
        audio.src = musicSrc;
        audio.loop = true;
    }
    
    // Event listener untuk tombol buka undangan
    const openBtn = document.getElementById('openInvitationBtn');
    openBtn.addEventListener('click', openInvitation);
    
    // Inisialisasi konten (tetap terapkan dulu, meskipun halaman utama disembunyikan)
    updateContent();
}

// Fungsi buka undangan dan putar musik
function openInvitation() {
    // Sembunyikan landing page
    const landingPage = document.getElementById('landingPage');
    landingPage.style.display = 'none';
    
    // Tampilkan halaman utama
    const mainContainer = document.getElementById('mainContainer');
    mainContainer.style.display = 'block';
    
    // Putar musik (ini PASTI berfungsi karena sudah ada interaksi pengguna!)
    if (musicSrc) {
        audio.play().catch(e => {
            console.log('Gagal putar musik:', e);
        });
    }
}

// Update semua konten
function updateContent() {
    document.getElementById('babyName').textContent = config.babyName;
    document.getElementById('eventDate').textContent = config.eventDate;
    document.getElementById('eventTime').textContent = config.eventTime;
    document.getElementById('eventPlace').innerHTML = config.eventPlace;
    document.getElementById('messageBox').innerHTML = `<p>${config.message}</p>`;
    document.getElementById('footerText').textContent = config.footerText;
    document.getElementById('familyName').textContent = config.familyName;
    
    // Terapkan peta
    const mapContainer = document.getElementById('mapContainer');
    mapContainer.innerHTML = `
        <iframe 
            src="${config.mapEmbed}"
            width="100%" 
            height="350" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    `;
    
    // Terapkan foto
    renderPhotos();
}

// Render galeri foto dari upload atau folder photos/
function renderPhotos() {
    const gallery = document.getElementById('photoGallery');
    let allPhotos = [];
    
    // Prioritaskan foto dari folder untuk GitHub Pages
    if (FILES.photos && FILES.photos.length > 0) {
        allPhotos = allPhotos.concat(FILES.photos.map(f => `photos/${f}`));
    }
    
    // Tambahkan foto yang diupload (untuk preview lokal saja)
    if (config.uploadedPhotos && config.uploadedPhotos.length > 0) {
        allPhotos = allPhotos.concat(config.uploadedPhotos);
    }
    
    if (allPhotos.length === 0) {
        gallery.innerHTML = `
            <div class="photo-placeholder">
                <span>🖼️</span>
                <p>Foto akan segera ditampilkan</p>
            </div>
        `;
    } else {
        gallery.innerHTML = allPhotos.map((photo, index) => `
            <img src="${photo}" class="gallery-photo" alt="Foto ${index + 1}">
        `).join('');
    }
}

// Jalankan inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', initWebsite);
