let config = getConfig();

// Inisialisasi website saat halaman dimuat
function initWebsite() {
    // Terapkan semua konfigurasi
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
    
    // Terapkan musik dari upload atau folder music/ dan autoplay
    const audio = document.getElementById('backgroundMusic');
    let musicSrc = null;
    
    if (config.uploadedMusic) {
        musicSrc = config.uploadedMusic;
    } else if (config.selectedMusic && FILES.music.includes(config.selectedMusic)) {
        musicSrc = `music/${config.selectedMusic}`;
    } else if (FILES.music.length > 0) {
        musicSrc = `music/${FILES.music[0]}`;
    }
    
    if (musicSrc) {
        audio.src = musicSrc;
        // Coba autoplay musik
        audio.play().catch((error) => {
            console.log('Autoplay diblokir oleh browser:', error);
            // Jika autoplay diblokir, coba putar saat user berinteraksi dengan halaman
            document.body.addEventListener('click', function playOnInteraction() {
                audio.play().catch(() => {});
                document.body.removeEventListener('click', playOnInteraction);
            }, { once: true });
        });
    }
    
    // Terapkan foto dari upload atau folder photos/
    renderPhotos();
}

// Render galeri foto dari upload atau folder photos/
function renderPhotos() {
    const gallery = document.getElementById('photoGallery');
    let allPhotos = [];
    
    // Tambahkan foto yang diupload
    if (config.uploadedPhotos && config.uploadedPhotos.length > 0) {
        allPhotos = allPhotos.concat(config.uploadedPhotos);
    }
    
    // Tambahkan foto dari folder (jika ada)
    if (FILES.photos && FILES.photos.length > 0) {
        allPhotos = allPhotos.concat(FILES.photos.map(f => `photos/${f}`));
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
