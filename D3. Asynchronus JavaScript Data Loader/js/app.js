'use strict';

const status = document.querySelector('#status');
const daftar = document.querySelector('#daftar-materi');
const tombolMuat = document.querySelector('#muat');
const tombolCobaLagi = document.querySelector('#coba-lagi');

function aturState(state, pesan) {
  status.dataset.state = state;
  status.textContent = pesan;
  tombolCobaLagi.hidden = state !== 'error';
}

async function ambilMateri() {
  const response = await fetch('data/materi.json');
  
  if (!response.ok) {
    throw new Error(`Gagal mengambil data. Status: HTTP ${response.status}`);
  }
  
  return await response.json();
}

function renderMateri(data) {
  daftar.replaceChildren();

  data.forEach(item => {
    const article = document.createElement('article');
    article.classList.add('kartu');

    const h3 = document.createElement('h3');
    h3.textContent = item.judul;

    const p = document.createElement('p');
    p.textContent = `Durasi: ${item.durasi} menit`;

    article.append(h3, p);
    daftar.appendChild(article);
  });
}

async function muatData() {
  aturState('loading', 'Memuat data...');
  tombolMuat.disabled = true;
  daftar.replaceChildren(); 
  try {
    const data = await ambilMateri();

    if (data.length === 0) {
      aturState('empty', 'Tidak ada materi yang tersedia saat ini.');
    } else {
      renderMateri(data);
      aturState('success', 'Materi berhasil dimuat.');
    }
  } catch (error) {
    console.error(error);
    aturState('error', 'Gagal memuat materi. Silakan periksa koneksi Anda dan coba lagi.');
  } finally {
    tombolMuat.disabled = false;
  }
}

tombolMuat.addEventListener('click', muatData);
tombolCobaLagi.addEventListener('click', muatData);