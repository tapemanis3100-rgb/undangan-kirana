let config = getConfig();

// Inisialisasi admin panel saat halaman dimuat
function initAdmin() {
    // Isi form dengan konfigurasi yang ada
    document.getElementById('adminBabyName').value = config.babyName;
    document.getElementById('adminEventDate').value = config.eventDate;
    document.getElementById('adminEventTime').value = config.eventTime;
    document.getElementById('adminEventPlace').value = config.eventPlace.replace(/<br\s*\/?>/gi, '\n');
    document.getElementById('adminMessage').value = config.message;
    document.getElementById('adminFooterText').value = config.footerText;
    document.getElementById('adminFamilyName').value = config.familyName;
    document.getElementById('adminMusicTitle').value = config.musicTitle;
    document.getElementById('adminMapEmbed').value = config.mapEmbed;
    
    // Render daftar musik
    renderMusicList();
    
    // Render daftar foto
    renderAdminPhotos();
    
    // Render preview peta
    renderMapPreview();
    
    // Event listener untuk upload musik
    document.getElementById('musicUpload').addEventListener('change', handleMusicUpload);
    
    // Event listener untuk upload foto
    document.getElementById('photoUpload').addEventListener('change', handlePhotoUpload);
}

// Handle upload musik
function handleMusicUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            config.uploadedMusic = e.target.result;
            config.uploadedMusicName = file.name;
            config.selectedMusic = file.name;
            renderMusicList();
            alert(`Musik "${file.name}" berhasil diupload!`);
        };
        reader.readAsDataURL(file);
    }
}

// Handle upload foto
function handlePhotoUpload(event) {
    const files = Array.from(event.target.files);
    let uploadedCount = 0;
    
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            config.uploadedPhotos.push(e.target.result);
            uploadedCount++;
            if (uploadedCount === files.length) {
                renderAdminPhotos();
                alert(`${files.length} foto berhasil diupload!`);
            }
        };
        reader.readAsDataURL(file);
    });
    
    // Reset input file
    event.target.value = '';
}

// Render daftar musik di admin panel
function renderMusicList() {
    const musicList = document.getElementById('musicList');
    const musicSelect = document.getElementById('adminMusicSelect');
    
    let options = [{ value: '', text: '-- Pilih Musik --' }];
    let listItems = [];
    
    // Tambahkan musik yang diupload
    if (config.uploadedMusic && config.uploadedMusicName) {
        listItems.push(`
            <div class="file-item">
                <span class="file-icon">📤</span>
                <span>${config.uploadedMusicName}</span>
                <button class="delete-btn" onclick="deleteUploadedMusic()">Hapus</button>
            </div>
        `);
        options.push({ value: config.uploadedMusicName, text: config.uploadedMusicName });
    }
    
    // Tambahkan musik dari folder
    if (FILES.music && FILES.music.length > 0) {
        FILES.music.forEach(file => {
            listItems.push(`
                <div class="file-item">
                    <span class="file-icon">📁</span>
                    <span>${file}</span>
                </div>
            `);
            options.push({ value: file, text: file });
        });
    }
    
    if (listItems.length === 0) {
        musicList.innerHTML = '<p style="color:#666">Belum ada musik</p>';
    } else {
        musicList.innerHTML = listItems.join('');
    }
    
    musicSelect.innerHTML = options.map(opt => 
        `<option value="${opt.value}" ${config.selectedMusic === opt.value ? 'selected' : ''}>${opt.text}</option>`
    ).join('');
}

// Hapus musik yang diupload
function deleteUploadedMusic() {
    if (confirm('Yakin ingin menghapus musik ini?')) {
        config.uploadedMusic = null;
        config.uploadedMusicName = null;
        config.selectedMusic = FILES.music.length > 0 ? FILES.music[0] : null;
        renderMusicList();
    }
}

// Render foto di admin panel
function renderAdminPhotos() {
    const gallery = document.getElementById('photoAdminGallery');
    let items = [];
    
    // Tambahkan foto yang diupload
    if (config.uploadedPhotos && config.uploadedPhotos.length > 0) {
        config.uploadedPhotos.forEach((photo, index) => {
            items.push(`
                <div class="admin-photo-item">
                    <img src="${photo}" alt="Foto ${index + 1}">
                    <button class="delete-photo-btn" onclick="deleteUploadedPhoto(${index})">×</button>
                </div>
            `);
        });
    }
    
    // Tambahkan foto dari folder
    if (FILES.photos && FILES.photos.length > 0) {
        FILES.photos.forEach((file, index) => {
            items.push(`
                <div class="admin-photo-item">
                    <img src="photos/${file}" alt="Foto ${index + 1}">
                </div>
            `);
        });
    }
    
    if (items.length === 0) {
        gallery.innerHTML = '<p style="color:#666; grid-column:1/-1; text-align:center; padding:20px;">Belum ada foto</p>';
    } else {
        gallery.innerHTML = items.join('');
    }
}

// Hapus foto yang diupload
function deleteUploadedPhoto(index) {
    if (confirm('Yakin ingin menghapus foto ini?')) {
        config.uploadedPhotos.splice(index, 1);
        renderAdminPhotos();
    }
}

// Render preview peta
function renderMapPreview() {
    const preview = document.getElementById('mapPreview');
    const mapEmbed = document.getElementById('adminMapEmbed').value;
    
    if (mapEmbed) {
        preview.innerHTML = mapEmbed;
    } else {
        preview.innerHTML = '<p style="color: #666; padding:20px; text-align:center;">Peta akan ditampilkan di sini</p>';
    }
}

// Test musik
function testMusic() {
    const audio = document.getElementById('testAudio');
    const selectedMusic = document.getElementById('adminMusicSelect').value;
    
    if (!selectedMusic) {
        alert('Pilih musik terlebih dahulu!');
        return;
    }
    
    let musicSrc = null;
    if (config.uploadedMusicName === selectedMusic && config.uploadedMusic) {
        musicSrc = config.uploadedMusic;
    } else if (FILES.music.includes(selectedMusic)) {
        musicSrc = `music/${selectedMusic}`;
    }
    
    if (musicSrc) {
        if (audio.src === musicSrc && !audio.paused) {
            audio.pause();
        } else {
            audio.src = musicSrc;
            audio.play();
        }
    }
}

// Simpan semua perubahan
function saveAllChanges() {
    // Ambil nilai dari form
    config.babyName = document.getElementById('adminBabyName').value;
    config.eventDate = document.getElementById('adminEventDate').value;
    config.eventTime = document.getElementById('adminEventTime').value;
    config.eventPlace = document.getElementById('adminEventPlace').value.replace(/\n/g, '<br>');
    config.message = document.getElementById('adminMessage').value;
    config.footerText = document.getElementById('adminFooterText').value;
    config.familyName = document.getElementById('adminFamilyName').value;
    config.musicTitle = document.getElementById('adminMusicTitle').value;
    config.selectedMusic = document.getElementById('adminMusicSelect').value;
    config.mapEmbed = document.getElementById('adminMapEmbed').value;
    
    // Simpan ke localStorage
    saveConfig(config);
    
    alert('Semua perubahan berhasil disimpan!');
}

// Reset ke konfigurasi default
function resetToDefault() {
    if (confirm('Yakin ingin mereset semua ke pengaturan default?')) {
        config = resetConfig();
        initAdmin();
        alert('Berhasil direset ke default!');
    }
}

// Event listener untuk preview peta saat mengetik
document.getElementById('adminMapEmbed').addEventListener('input', renderMapPreview);

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', initAdmin);
