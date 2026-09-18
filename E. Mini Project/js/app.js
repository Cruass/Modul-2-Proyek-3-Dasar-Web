'use strict';


const dataLayanan = [
  { id: 1, kategori: 'software', judul: 'Pengembangan Web', deskripsi: 'Pembuatan aplikasi web interaktif menggunakan HTML, CSS, dan Vanilla JS murni.' },
  { id: 2, kategori: 'infrastruktur', judul: 'Konfigurasi Jaringan', deskripsi: 'Pemasangan kabel UTP, analisis ping/latency, dan pengaturan Switch Layer 2.' },
  { id: 3, kategori: 'data', judul: 'Administrasi Database', deskripsi: 'Desain skema, modifikasi struktur, dan manajemen hak akses di MariaDB & Oracle.' },
  { id: 4, kategori: 'software', judul: 'Skrip Utilitas', deskripsi: 'Pembuatan skrip produktivitas CLI (Command Line) menggunakan bahasa C/C++.' }
];


const btnMenu = document.querySelector('#btn-menu');
const navMenu = document.querySelector('#nav-menu');
const btnTema = document.querySelector('#btn-tema');
const containerLayanan = document.querySelector('#daftar-layanan');
const filterLayanan = document.querySelector('#filter-layanan');
const faqHeaders = document.querySelectorAll('.accordion-header');
const formKontak = document.querySelector('#form-kontak');
const btnTop = document.querySelector('#btn-top');


btnMenu.addEventListener('click', () => {
  const isTerbuka = navMenu.classList.toggle('open');
  navMenu.classList.toggle('hidden-mobile');
  btnMenu.setAttribute('aria-expanded', isTerbuka);
});


function buatKartuLayanan(item) {
  const article = document.createElement('article');
  article.classList.add('kartu');

  const h3 = document.createElement('h3');
  h3.textContent = item.judul;

  const p = document.createElement('p');
  p.textContent = item.deskripsi;

  article.append(h3, p);
  return article;
}

function renderLayanan(data) {
  containerLayanan.replaceChildren(); 
  
  if (data.length === 0) {
    containerLayanan.textContent = 'Tidak ada layanan di kategori ini.';
    return;
  }

  data.forEach(item => {
    containerLayanan.appendChild(buatKartuLayanan(item));
  });
}

filterLayanan.addEventListener('change', () => {
  const kategori = filterLayanan.value;
  if (kategori === 'semua') {
    renderLayanan(dataLayanan);
  } else {
    const dataDisaring = dataLayanan.filter(item => item.kategori === kategori);
    renderLayanan(dataDisaring);
  }
});


faqHeaders.forEach(header => {
  header.addEventListener('click', () => {
    // Ambil elemen div.accordion-content tepat di bawah tombol
    const content = header.nextElementSibling;
    const isTersembunyi = content.classList.toggle('hidden');
    

    header.setAttribute('aria-expanded', !isTersembunyi);
  });
});


formKontak.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputNama = document.querySelector('#nama');
  const inputPesan = document.querySelector('#pesan');
  const errorNama = document.querySelector('#error-nama');
  const errorPesan = document.querySelector('#error-pesan');
  const statusPesan = document.querySelector('#status-pesan');

  const nama = inputNama.value.trim();
  const pesan = inputPesan.value.trim();
  let isValid = true;


  if (nama.length < 3) {
    inputNama.setAttribute('aria-invalid', 'true');
    errorNama.textContent = 'Nama minimal 3 karakter.';
    isValid = false;
  } else {
    inputNama.removeAttribute('aria-invalid');
    errorNama.textContent = '';
  }


  if (pesan === '') {
    inputPesan.setAttribute('aria-invalid', 'true');
    errorPesan.textContent = 'Pesan tidak boleh kosong.';
    isValid = false;
  } else {
    inputPesan.removeAttribute('aria-invalid');
    errorPesan.textContent = '';
  }

  if (isValid) {
    statusPesan.textContent = 'Pesan berhasil dikirim! Terima kasih.';
    statusPesan.className = 'status-msg status-success'; 
    formKontak.reset();
  } else {
    statusPesan.classList.add('hidden');
  }
});


window.addEventListener('scroll', () => {
  // Munculkan tombol jika di-scroll lebih dari 300px
  if (window.scrollY > 300) {
    btnTop.classList.remove('hidden');
  } else {
    btnTop.classList.add('hidden');
  }
});

btnTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

btnTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

renderLayanan(dataLayanan);