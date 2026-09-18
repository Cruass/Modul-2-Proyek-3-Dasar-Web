'use strict';

const peserta = [
  { id: 1, nama: 'Sahizidan', prodi: 'Teknik Informatika' },
  { id: 2, nama: 'Rayhan', prodi: 'Sistem Informasi' },
];

const form = document.querySelector('#form-peserta');
const namaInput = document.querySelector('#nama');
const prodiInput = document.querySelector('#prodi');
const filterInput = document.querySelector('#filter-prodi');
const daftar = document.querySelector('#daftar-peserta');
const status = document.querySelector('#status');
const errorNama = document.querySelector('#error-nama');
const errorProdi = document.querySelector('#error-prodi');

function validasiPeserta(calon) {
  const namaDibersihkan = calon.nama.trim();
  const namaValid = namaDibersihkan.length >= 3;
  const prodiValid = calon.prodi !== '';

  return {
    valid: namaValid && prodiValid,
    errorNama: namaValid ? '' : 'Nama minimal 3 karakter.',
    errorProdi: prodiValid ? '' : 'Program studi wajib dipilih.'
  };
}

function buatKartuPeserta(item) {
  const article = document.createElement('article');
  article.classList.add('kartu');

  const h2 = document.createElement('h2');
  h2.textContent = item.nama;

  const p = document.createElement('p');
  p.textContent = item.prodi;

  article.append(h2, p);
  return article;
}

function renderPeserta(data) {
  daftar.replaceChildren();

  if (data.length === 0) {
    status.textContent = 'Tidak ada peserta.';
  } else {
    status.textContent = '';
    data.forEach(item => {
      daftar.appendChild(buatKartuPeserta(item));
    });
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nama = namaInput.value;
  const prodi = prodiInput.value;
  const hasilValidasi = validasiPeserta({ nama, prodi });

  if (!hasilValidasi.errorNama) {
    namaInput.removeAttribute('aria-invalid');
    errorNama.textContent = '';
  } else {
    namaInput.setAttribute('aria-invalid', 'true');
    errorNama.textContent = hasilValidasi.errorNama;
  }

  if (!hasilValidasi.errorProdi) {
    prodiInput.removeAttribute('aria-invalid');
    errorProdi.textContent = '';
  } else {
    prodiInput.setAttribute('aria-invalid', 'true');
    errorProdi.textContent = hasilValidasi.errorProdi;
  }

  if (!hasilValidasi.valid) return;

  const newId = Date.now();
  
  peserta.push({
    id: newId,
    nama: nama.trim(),
    prodi: prodi
  });

  form.reset();
  
  filterInput.value = 'semua';
  renderPeserta(peserta);
});

filterInput.addEventListener('change', () => {
  const keyword = filterInput.value;
  
  if (keyword === 'semua') {
    renderPeserta(peserta);
  } else {
    const dataDisaring = peserta.filter(item => item.prodi === keyword);
    renderPeserta(dataDisaring);
  }
});

renderPeserta(peserta);