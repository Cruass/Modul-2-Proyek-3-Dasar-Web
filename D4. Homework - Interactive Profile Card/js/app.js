'use strict';

const statusEl = document.querySelector('#status');
const cobaLagiBtn = document.querySelector('#coba-lagi');
const profilCard = document.querySelector('#profil-card');
const profilNama = document.querySelector('#profil-nama');
const profilDeskripsi = document.querySelector('#profil-deskripsi');
const btnToggleDetail = document.querySelector('#toggle-detail');
const btnToggleTema = document.querySelector('#toggle-tema');
const keterampilanSection = document.querySelector('#keterampilan-section');
const daftarKeterampilan = document.querySelector('#daftar-keterampilan');
const formKeterampilan = document.querySelector('#form-keterampilan');
const inputKeterampilan = document.querySelector('#input-keterampilan');
const errorKeterampilan = document.querySelector('#error-keterampilan');
const btnTambah = document.querySelector('#btn-tambah');

function aturState(state, pesan) {
  statusEl.dataset.state = state;
  statusEl.textContent = pesan;
  cobaLagiBtn.hidden = state !== 'error';
  
  const sukses = state === 'success';
  profilCard.hidden = !sukses;
  keterampilanSection.hidden = !sukses;
  statusEl.hidden = sukses; 
}

async function muatProfil() {
  aturState('loading', 'Memuat profil...');
  
  try {
    const response = await fetch('data/profile.json');
    if (!response.ok) throw new Error('Network error');
    
    const data = await response.json();
    
    if (Object.keys(data).length === 0) {
      aturState('empty', 'Data profil kosong.');
      return;
    }

    renderProfil(data);
    aturState('success', '');
  } catch (error) {
    aturState('error', 'Gagal memuat data. Periksa file json atau koneksi server.');
  }
}

function renderProfil(data) {
  profilNama.textContent = data.nama;
  profilDeskripsi.textContent = data.deskripsi;
  
  daftarKeterampilan.replaceChildren();
  data.keterampilan.forEach(skill => buatElemenKeterampilan(skill));
}

function buatElemenKeterampilan(namaSkill) {
  const li = document.createElement('li');
  
  const span = document.createElement('span');
  span.textContent = namaSkill;
  
  const btnHapus = document.createElement('button');
  btnHapus.textContent = 'Hapus';
  btnHapus.classList.add('btn-hapus');
  btnHapus.addEventListener('click', () => {
    li.remove();
  });

  li.append(span, btnHapus);
  daftarKeterampilan.appendChild(li);
}

btnToggleDetail.addEventListener('click', () => {
  const tersembunyi = profilDeskripsi.classList.toggle('hidden');
  btnToggleDetail.setAttribute('aria-expanded', !tersembunyi);
  btnToggleDetail.textContent = tersembunyi ? 'Lihat Detail' : 'Sembunyikan Detail';
});

btnToggleTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

formKeterampilan.addEventListener('submit', (e) => {
  e.preventDefault();
  
  btnTambah.disabled = true; 
  
  const skillBaru = inputKeterampilan.value.trim();

  if (skillBaru === '') {
    inputKeterampilan.setAttribute('aria-invalid', 'true');
    errorKeterampilan.textContent = 'Nama keterampilan tidak boleh kosong!';
    btnTambah.disabled = false;
    return;
  }

  inputKeterampilan.removeAttribute('aria-invalid');
  errorKeterampilan.textContent = '';
  
  buatElemenKeterampilan(skillBaru);
  formKeterampilan.reset();
  
  btnTambah.disabled = false;
});

cobaLagiBtn.addEventListener('click', muatProfil);
document.addEventListener('DOMContentLoaded', muatProfil); 