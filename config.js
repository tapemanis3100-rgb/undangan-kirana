// Konfigurasi default untuk undangan aqiqah
const defaultConfig = {
    babyName: 'Kirana Yuki Amelia',
    eventDate: 'Sabtu, 4 Juli 2026',
    eventTime: '12.00 WIB - Selesai',
    eventPlace: 'Warung Coklat<br>Jl. Pembangunan, Kp. Lalang<br>Kec. Sunggal, Kabupaten Deli Serdang<br>Sumatera Utara 20351',
    message: 'Semoga Kirana Yuki Amelia menjadi anak yang sholehah, sehat selalu, dan menjadi kebanggaan keluarga. Aamiin Ya Rabbal \'Alamin.',
    footerText: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan do\'a restu.',
    familyName: 'Keluarga Besar',
    mapEmbed: 'https://www.google.com/maps?q=Warung%20Coklat%2C%20Jl.%20Pembangunan%2C%20Kp.%20Lalang%2C%20Kec.%20Sunggal%2C%20Kabupaten%20Deli%20Serdang%2C%20Sumatera%20Utara%2020351&output=embed',
    selectedMusic: null, // Nama file musik yang dipilih (dari files.js atau upload)
    uploadedMusic: null, // Base64 data musik yang diupload
    uploadedMusicName: null, // Nama file musik yang diupload
    musicTitle: 'Musik Latar',
    uploadedPhotos: [] // Array base64 foto yang diupload
};

// Fungsi untuk mendapatkan konfigurasi dari localStorage atau default
function getConfig() {
    const saved = localStorage.getItem('aqiqahConfig');
    if (saved) {
        return { ...defaultConfig, ...JSON.parse(saved) };
    }
    return { ...defaultConfig };
}

// Fungsi untuk menyimpan konfigurasi ke localStorage
function saveConfig(config) {
    localStorage.setItem('aqiqahConfig', JSON.stringify(config));
}

// Fungsi untuk mereset konfigurasi ke default
function resetConfig() {
    localStorage.removeItem('aqiqahConfig');
    return { ...defaultConfig };
}
