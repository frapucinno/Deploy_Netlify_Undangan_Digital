//KONFIGURASI HARMONI KE FIRESTORE

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { Fancybox } from "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.esm.js";

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

      //tanggal resepsi
      const tgl_resepsi = data.tanggal_resepsi.toDate();
      
      const hariTanggal_resepsi = tgl_resepsi.getDate();
      const formatted_resepsi = tgl_resepsi.toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric"
      });
      const namaHari_resepsi = tgl_resepsi.toLocaleDateString("id-ID", { weekday: "long" });
      const bulanTahun_resepsi = tgl_resepsi.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric"
      });

      //tanggal akad
      const tgl_akad = data.tanggal_akad.toDate();

      const hariTanggal_akad = tgl_akad.getDate(); // hanya tanggal
      const namaHari_akad = tgl_akad.toLocaleDateString("id-ID", { weekday: "long" });
      const bulanTahun_akad = tgl_akad.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric"
      });

      const foto_galeri = data.foto_galeri || [];

      document.getElementById("tanggal-resepsi-lengkap").innerText = formatted_resepsi;
      document.getElementById("bulan-tahun-resepsi").innerText = bulanTahun_resepsi;
      document.getElementById("hari-resepsi").innerText = namaHari_resepsi;
      document.getElementById("tanggal-resepsi").innerText = hariTanggal_resepsi;
      
      document.getElementById("bulan-tahun-akad").innerText = bulanTahun_akad;
      document.getElementById("hari-akad").innerText = namaHari_akad;
      document.getElementById("tanggal-akad").innerText = hariTanggal_akad;
      
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

      document.getElementById("hero-img").src = data.hero_img;
      document.getElementById("foto-prewed").src = data.foto_prewed;
      document.getElementById("foto-bride").src = data.foto_bride;
      document.getElementById("foto-groom").src = data.foto_groom;

      // INTRO
      document.getElementById('openInvitation').addEventListener('click', function() {
        document.getElementById('cover').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        const bgMusic = document.getElementById("bg-music");
        bgMusic.play().catch(() => {
          console.warn("Autoplay diblokir, silakan tekan tombol play");
        });
      });

      //LAGU BERDENDANG
        // Ambil data lagu_url dari Firestore (setelah getDoc sukses)
      const laguUrl = data.lagu_url; // pastikan field ini ada di Firestore

      const bgMusic = document.getElementById("bg-music");
      const toggleBtn = document.getElementById("music-toggle");

      if (laguUrl) {
        bgMusic.src = laguUrl;

        // Tombol toggle play/pause
        toggleBtn.addEventListener("click", () => {
          if (bgMusic.paused) {
            bgMusic.play();
            toggleBtn.innerText = "⏸";
          } else {
            bgMusic.pause();
            toggleBtn.innerText = "▶";
          }
        });
      } else {
        document.getElementById("music-controls").style.display = "none";
      }

      //GALERI FOTO
      function renderGallery(images) {
        const gallery = document.getElementById("foto-galeri");
        gallery.innerHTML = "";

        if (!Array.isArray(images) || images.length === 0) return;
        images = images.filter(url => typeof url === "string" && url.startsWith("http"));

        const horizontal = [];
        const vertical = [];

        let loadedCount = 0;

        images.forEach(url => {
          const img = new Image();
          img.src = url;

          img.onload = function () {
            const orientation = img.naturalWidth > img.naturalHeight ? "horizontal" : "vertical";
            (orientation === "horizontal" ? horizontal : vertical).push(url);

            loadedCount++;
            // Jika semua sudah diload, baru mulai render
            if (loadedCount === images.length) {
              const orderedImages = [...horizontal];
              
              // Pasangkan vertical 2-2
              for (let i = 0; i < vertical.length; i += 2) {
                if (i + 1 < vertical.length) {
                  orderedImages.push([vertical[i], vertical[i + 1]]); // pasangan vertical
                } else {
                  orderedImages.push(vertical[i]); // satuan (tidak berpasangan)
                }
              }

              // Render orderedImages
              orderedImages.forEach(item => {
                if (Array.isArray(item)) {
                  // pasangan vertical
                  const pair = document.createElement("div");
                  pair.className = "gallery-pair";
                  
                  item.forEach(url => {                   
                    const a = document.createElement("a");
                    a.href = url;
                    a.setAttribute("data-fancybox", "galeri");

                    const img = new Image();
                    img.src = url;
                    img.className = "gallery-img vertical";
                    a.appendChild(img);
                    pair.appendChild(a);
                  });

                  gallery.appendChild(pair);
                } else {
                  const a = document.createElement("a");
                  a.href = item;
                  a.setAttribute("data-fancybox", "galeri");

                  const img = new Image();
                  img.src = item;
                  img.className = "gallery-img horizontal";

                  a.appendChild(img);
                  gallery.appendChild(a);
                }
              });

              console.log("Binding Fancybox pada elemen:", document.querySelectorAll('[data-fancybox="galeri"]'));

              Fancybox.bind('[data-fancybox="galeri"]');
            }
          };
        });
      }

      if (Array.isArray(foto_galeri) && foto_galeri.length > 0) {
        renderGallery(foto_galeri);
      }
        
       // COUNTDOWN TANGGAL
      const weddingDate = data.tanggal_resepsi.toDate().getTime();

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
      
    } else {
      document.body.innerHTML = "<h2>Undangan tidak ditemukan</h2>";
    }
  }).catch((e) => {
    console.error("Gagal ambil data:", e);
    document.body.innerHTML = "<h2>Gagal mengambil data dari Firestore</h2>";
  });
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
  



