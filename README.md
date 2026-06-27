# Undangan Aqiqah - Kirana Yuki Amelia

Website undangan aqiqah yang elegan dengan tema hijau, dilengkapi dengan admin panel untuk mengelola semua konten.

## ✨ Fitur

- 🎨 **Desain Elegan** - Tema hijau yang lembut dan cocok untuk acara aqiqah
- 📋 **Admin Panel** - Kelola semua konten dari halaman admin (admin.html)
- 🖼️ **Galeri Foto** - Upload foto atau letakkan di folder photos/
- 🎵 **Musik Latar** - Upload musik atau letakkan di folder music/
- 📍 **Google Maps** - Tampilkan lokasi acara dengan embed maps
- 💬 **Kustomisasi Teks** - Ubah semua teks sesuai keinginan
- 💾 **Local Storage** - Semua perubahan disimpan secara otomatis
- 📱 **Responsive** - Tampilan sempurna di semua perangkat

## 🚀 Cara Menggunakan

### 1. Buka Admin Panel
Buka `admin.html` di browser untuk mulai mengedit.

### 2. Upload File (Cepat & Mudah)
- **Musik**: Klik "Upload File Musik (MP3)" di admin panel
- **Foto**: Klik "Upload Foto" di admin panel (bisa multiple)
- Semua file yang diupload otomatis disimpan di browser

### 3. Atau Gunakan Folder (Untuk Deployment)
Jika ingin upload ke server/GitHub Pages:
- Letakkan file musik (MP3) di folder `music/`
- Letakkan file foto (JPG/PNG) di folder `photos/`
- Buka `files.js` dan daftarkan nama file:
```javascript
const FILES = {
    music: [
        "lagu1.mp3",
        "lagu2.mp3"
    ],
    photos: [
        "foto1.jpg",
        "foto2.png"
    ]
};
```

### 4. Edit Informasi Acara
Di admin panel, ubah:
- Nama bayi, tanggal, waktu, tempat
- Kalimat ucapan dan footer
- Embed Google Maps (dapatkan dari maps.google.com)

### 5. Simpan & Lihat Hasil
Klik "💾 Simpan Semua Perubahan" lalu klik "← Lihat Undangan"

## 📂 Struktur Folder

```
undangan/
├── index.html          # Halaman utama undangan
├── admin.html          # Halaman admin panel
├── style.css           # Styling halaman utama
├── admin-style.css     # Styling admin panel
├── main.js             # Script halaman utama
├── admin.js            # Script admin panel
├── config.js           # Konfigurasi dan penyimpanan data
├── files.js            # Daftar file musik dan foto
├── music/              # Folder untuk file musik
├── photos/             # Folder untuk file foto
└── README.md           # Dokumentasi ini
```

## 🌐 Cara Deploy ke GitHub Pages

1. Buat repository di GitHub
2. Upload SEMUA file dan folder ke repository
3. Buka **Settings** → **Pages**
4. Pilih **Source**: Deploy from a branch
5. Pilih **Branch**: main
6. Klik **Save**
7. Website Anda akan live di `https://username.github.io/nama-repo/`

## 🎨 Warna Tema

- **Hijau Tua**: #2e7d32
- **Hijau Sedang**: #43a047
- **Hijau Muda**: #81c784
- **Background**: Gradient hijau lembut

Semoga acara aqiqah berjalan lancar dan penuh berkah! 🎉🌿
