let data = [];

window.onload = function () {
  let simpan = localStorage.getItem("pelajar");

  if (simpan) {
    data = JSON.parse(simpan);
    tampilkanData();
  }

  document.getElementById("tambahBtn").addEventListener("click", tambah);
};

function tambah() {
  let nama = document.getElementById("nama");
  let kelasElement = document.querySelector('input[name="kelas"]:checked');
  let jurusan = document.getElementById("jurusan");
  let ekskul = document.getElementById("ekskul");
  let editIndex = document.getElementById("editIndex");

  if (!nama.value.trim() || !kelasElement || !jurusan.value || !ekskul.value) {
    alert("Semua data harus diisi!");
    return;
  }

  let isi = {
    nama: nama.value.trim(),
    kelas: kelasElement.value,
    jurusan: jurusan.value,
    ekskul: ekskul.value,
  };

  if (editIndex.value === "") {
    // Tambah Data Baru
    data.push(isi);
  } else {
    // Edit Data
    data[editIndex.value] = isi;
    editIndex.value = "";
    document.getElementById("tambahBtn").textContent = "Tambah Data";
  }

  simpanData();
  resetForm();
  tampilkanData();
}

function resetForm() {
  document.getElementById("nama").value = "";
  let radioChecked = document.querySelector('input[name="kelas"]:checked');
  if (radioChecked) radioChecked.checked = false;
  document.getElementById("jurusan").value = "";
  document.getElementById("ekskul").value = "";
}

function simpanData() {
  localStorage.setItem("pelajar", JSON.stringify(data));
}

function tampilkanData() {
  let daftar = document.getElementById("daftarPelajar");
  daftar.innerHTML = "";

  data.forEach((item, index) => {
    let tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.nama}</td>
      <td>${item.kelas}</td>
      <td>${item.jurusan}</td>
      <td>${item.ekskul}</td>
      <td>
        <button class="btn-edit" onclick="editData(${index})">Edit</button>
        <button class="btn-delete" onclick="hapusData(${index})">Delete</button>
      </td>
    `;

    daftar.appendChild(tr);
  });
}

function editData(index) {
  let item = data[index];
  document.getElementById("nama").value = item.nama;
  document.querySelector(`input[name="kelas"][value="${item.kelas}"]`).checked =
    true;
  document.getElementById("jurusan").value = item.jurusan;
  document.getElementById("ekskul").value = item.ekskul;
  document.getElementById("editIndex").value = index;
  document.getElementById("tambahBtn").textContent = "Update Data";
}

function hapusData(index) {
  let konfirmasi = confirm("Yakin ingin menghapus data ini?");

  if (konfirmasi) {
    data.splice(index, 1);
    simpanData();
    tampilkanData();
    alert("Data berhasil di hapus");
  }
}
