import { useState } from 'react'

const formKosong = { nama: '', nisn: '', kelas: 'Kelompok A', namaOrtu: '' }

// onTambah(dataBaru) mengembalikan teks error, atau '' jika berhasil
function FormTambahSiswa({ onTambah }) {
  const [form, setForm] = useState(formKosong)
  const [pesanError, setPesanError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const error = onTambah(form)
    if (error) {
      setPesanError(error)
      return
    }
    setForm(formKosong)
    setPesanError('')
  }

  return (
    <section className="kartu-form">
      <h2>Tambah Siswa</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-baris">
          <label htmlFor="nama">Nama Lengkap</label>
          <input id="nama" name="nama" type="text" placeholder="Contoh: Aditya Pratama"
            value={form.nama} onChange={handleChange} />
        </div>
        <div className="form-baris">
          <label htmlFor="nisn">NISN</label>
          <input id="nisn" name="nisn" type="text" placeholder="7-10 digit angka"
            value={form.nisn} onChange={handleChange} />
        </div>
        <div className="form-baris">
          <label htmlFor="kelas">Kelas</label>
          <select id="kelas" name="kelas" value={form.kelas} onChange={handleChange}>
            <option value="Kelompok A">Kelompok A</option>
            <option value="Kelompok B">Kelompok B</option>
          </select>
        </div>
        <div className="form-baris">
          <label htmlFor="namaOrtu">Nama Orang Tua / Wali</label>
          <input id="namaOrtu" name="namaOrtu" type="text" placeholder="Contoh: Budi Santoso"
            value={form.namaOrtu} onChange={handleChange} />
        </div>

        {pesanError && <p className="pesan-error" role="alert">{pesanError}</p>}

        <button type="submit" className="tombol tombol-utama">Tambah</button>
      </form>
    </section>
  )
}

export default FormTambahSiswa
