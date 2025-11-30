# PM2 Controller API

API service untuk mengontrol aplikasi PM2 (start, stop, restart, daftar services) melalui REST API.  
Dilengkapi dengan proteksi keamanan berupa API Key, JWT Auth, HMAC, Rate Limit, dan IP Whitelist.

---

## 📦 Environment Variables

Buat file `.env` di root project dengan isi seperti berikut:

API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
HMAC_SECRET=your_hmac_secret_here
JWT_EXPIRES=1d
ALLOWED_IPS=127.0.0.1,192.168.1.5
PORT=3000


### Penjelasan:

| Variable | Deskripsi |
|---------|-----------|
| **API_KEY** | API Key untuk autentikasi header (`x-api-key`). |
| **JWT_SECRET** | Secret untuk generate & verify JWT. |
| **HMAC_SECRET** | Secret untuk validasi HMAC signature. |
| **JWT_EXPIRES** | Durasi token JWT (misal: `1d`, `12h`). |
| **ALLOWED_IPS** | Daftar IP yang diizinkan akses API (dipisah koma). |
| **PORT** | Port aplikasi Express berjalan. |

---

## 🚀 Cara Menjalankan

npm install
npm start / nodemon


---

## 🔐 Fitur Keamanan

- API Key authentication  
- JWT authentication  
- HMAC signature validation  
- Rate limit global  
- IP whitelist  
- Logging (winston / pino)  
- PM2 management (via Node.js)  

---

## 📡 API Endpoints

| Method | Endpoint | Keterangan |
|--------|----------|-------------|
| GET | `/pm2/services` | List semua aplikasi PM2 |
| POST | `/pm2/start/:name` | Start service berdasarkan nama |
| POST | `/pm2/stop/:name` | Stop service |
| POST | `/pm2/restart/:name` | Restart service |
| POST | `/pm2/start-by-path` | Jalankan aplikasi dari path |
| POST | `/pm2/register` | Register aplikasi baru ke PM2 |
| POST | `/auth/token` | Generate JWT token |

---

## 📝 Catatan

- Pastikan Node.js aplikasi ditargetkan jalan di lingkungan Windows/WSL sesuai path PM2 Anda.
- Jalankan PM2 dengan hak akses yang sesuai.

---

## 📄 Lisensi

MIT License
