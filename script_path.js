//KONFIGURASI HARMONI KE FIRESTORE

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ✅ Konfigurasi Firebase (GANTI dengan punyamu!)
const firebaseConfig = {
  apiKey: "AIzaSyCtpcwFxUsllDtfJFksKZWKA3iKWjjIyCQ",
  authDomain: "formbase-skalainvee.firebaseapp.com",
  projectId: "formbase-skalainvee",
  storageBucket: "formbase-skalainvee.appspot.com",
  messagingSenderId: "195305733982",
  appId: "1:195305733982:web:ad589279eb0d02687c99cf"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Jalankan setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const undanganId = path.replace(/^\/+/, ""); // hapus / di awal
  if (!undanganId) {
    document.body.innerHTML = "<h2>URL tidak memiliki parameter ?id=...</h2>";
    return;
  }

  const docRef = doc(db, "undangan", undanganId);
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      //isian dari form (koleksi firestore)
      document.getElementById("nama-mempelai-intro").innerText = `${data.nama_wanita} & ${data.nama_pria}`;
      document.getElementById("nama-mempelai-judul").innerText = `${data.nama_wanita} & ${data.nama_pria}`;

      document.getElementById("nama-panggilan-wanita").innerText = data.nama_wanita;
      document.getElementById("nama-lengkap-wanita").innerText = data.nama_lengkap_wanita;
      
      document.getElementById("nama-panggilan-pria").innerText = data.nama_pria;
      document.getElementById("nama-lengkap-pria").innerText = data.nama_lengkap_pria;
      
      document.getElementById("nama-ayah-wanita-ke").innerText = `Putri ${data.wanita_anak_ke} dari Bapak ${data.nama_ayah_wanita}`;
      document.getElementById("nama-ibu-wanita").innerText = `& Ibu ${data.nama_ibu_wanita}`;
      
      document.getElementById("nama-ayah-pria-ke").innerText = `Putra ${data.pria_anak_ke} dari Bapak ${data.nama_ayah_pria}`;
      document.getElementById("nama-ibu-pria").innerText = `& Ibu ${data.nama_ibu_pria}`;
     
      document.getElementById("lokasi-akad").innerText = `📍${data.lokasi_akad}`;
      document.getElementById("link-lokasi-akad").href = data.link_lokasi_akad;

      document.getElementById("tanggal-resepsi").innerText = data.tanggal_resepsi;
      document.getElementById("lokasi-resepsi").innerText = `📍${data.lokasi_resepsi}`;
      document.getElementById("link-lokasi-resepsi").href = data.link_lokasi_resepsi;

      document.getElementById("nama-bank1").innerText = data.nama_bank1;
      document.getElementById("no-rek1").innerText = data.no_rek1;
      document.getElementById("an-bank1").innerText = data.an_bank1;

      document.getElementById("nama-bank2").innerText = data.nama_bank2;
      document.getElementById("no-rek2").innerText = data.no_rek2;
      document.getElementById("an-bank2").innerText = data.an_bank2;

      document.getElementById("nama-penerima-hadiah").innerText = `Nama Penerima: ${data.nama_penerima_hadiah}`;
      document.getElementById("no-hp-penerima").innerText = `No HP:${data.no_hp_penerima}`;
      document.getElementById("alamat-penerima").innerText = `Alamat:${data.alamat_penerima}`;
      
    } else {
      document.body.innerHTML = "<h2>Undangan tidak ditemukan</h2>";
    }
  }).catch((e) => {
    console.error("Gagal ambil data:", e);
    document.body.innerHTML = "<h2>Gagal mengambil data dari Firestore</h2>";
  });
});


// INTRO
document.getElementById('openInvitation').addEventListener('click', function() {
  document.getElementById('cover').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';
});

// Animasi: buat teks muncul perlahan dari bawah
gsap.registerPlugin(ScrollTrigger);
  
gsap.from(".keterangan1", {
  y: 50,           // geser dari bawah 50px
  opacity: 0,      // mulai dari transparan
  duration: 1.2    // selama 1.2 detik
});

gsap.from(".judul", {
  y: 50,           // geser dari bawah 50px
  opacity: 0,      // mulai dari transparan
  duration: 1.2,    // selama 1.2 detik
  delay:0.5
});
  
gsap.from(".deskripsi", {
  y: 50,
  opacity: 0,
  duration: 1.2,
  delay: 1       // muncul setengah detik setelah judul
});
  
gsap.from(".acara", {
  scrollTrigger: ".detail-acara", // elemen yang memicu
  y: 50,
  opacity: 0,
  duration: 2.5,
});
  
gsap.from(".scroll-hint", {
  y: 50,           // geser dari bawah 50px
  opacity: 0,      // mulai dari transparan
  duration: 1.2,    // selama 1.2 detik
  delay:2
})
  
gsap.to(".scroll-hint", {
  scrollTrigger: {
    trigger: ".detail-acara", // ketika bagian acara muncul
    start: "top 80%",
    once: true
    
  },
  opacity: 0,
  duration: 0.5,
  pointerEvents: "none"
});

gsap.from(".fade-left", {
  scrollTrigger: ".fade-left",
  x: -100,
  opacity: 0,
  duration: 2,
  ease: "power2.out"
});
  
gsap.from(".fade-right", {
  scrollTrigger: ".fade-right",
  x: 100,
  opacity: 0,
  duration: 2,
  ease: "power2.out"
});

  // Ubah tanggal ini ke tanggal pernikahanmu (format: YYYY-MM-DDTHH:MM:SS)
const weddingDate = new Date("2025-11-25T09:00:00").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "Selamat Menempuh Hidup Baru!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
};

setInterval(updateCountdown, 1000);
updateCountdown();

  
const sliderContainer = document.querySelector(".slider-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

prevBtn.addEventListener("click", () => {
  sliderContainer.scrollBy({ left: -320, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
  sliderContainer.scrollBy({ left: 320, behavior: "smooth" });
});

let countHadir = 0;
let countTidak = 0;

document.getElementById("rsvpForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const ucapan = document.getElementById("ucapan").value.trim();
    const status = document.getElementById("statusHadir").value;

    if (!nama || !ucapan || !status) return;

    const commentsDiv = document.getElementById("comments");

    const newComment = document.createElement("div");
    newComment.classList.add("comment-item");
    newComment.innerHTML = `<strong>${nama}</strong>: ${ucapan}`;

    commentsDiv.prepend(newComment); // Tambahkan ke atas

    // Update counter
    if (status === "Hadir") {
        countHadir++;
        document.getElementById("count-hadir").textContent = countHadir;
    } else {
        countTidak++;
        document.getElementById("count-tidak").textContent = countTidak;
    }

    // Reset form
    document.getElementById("rsvpForm").reset();
});