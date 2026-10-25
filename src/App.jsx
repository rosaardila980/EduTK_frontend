import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import RingkasanData from './components/RingkasanData'
import FormTambahSiswa from './components/FormTambahSiswa'
import DaftarSiswa from './components/DaftarSiswa'
import Footer from './components/Footer'
import { siswaAwal } from './data/siswaAwal'

function App() {
  // State utama: daftar siswa (array of object)
  const [daftarSiswa, setDaftarSiswa] = useState(siswaAwal)

  // Mengembalikan teks error jika data tidak valid, atau '' jika berhasil ditambah
  function tambahSiswa(dataBaru) {
    const nama = dataBaru.nama.trim()
    const nisn = dataBaru.nisn.trim()
    const namaOrtu = dataBaru.namaOrtu.trim()

    if (nama === '' || nisn === '' || namaOrtu === '') {
      return 'Nama, NISN, dan nama orang tua wajib diisi.'
    }
    if (!/^[0-9]{7,10}$/.test(nisn)) {
      return 'NISN harus berupa 7-10 digit angka.'
    }
    if (daftarSiswa.some((s) => s.nisn === nisn)) {
      return `NISN ${nisn} sudah terdaftar.`
    }

    const siswaBaru = { id: Date.now(), nama, nisn, kelas: dataBaru.kelas, namaOrtu }
    setDaftarSiswa([...daftarSiswa, siswaBaru])
    return ''
  }

  function hapusSiswa(id) {
    setDaftarSiswa(daftarSiswa.filter((s) => s.id !== id))
  }

  const jumlahKelompokA = daftarSiswa.filter((s) => s.kelas === 'Kelompok A').length
  const jumlahKelompokB = daftarSiswa.filter((s) => s.kelas === 'Kelompok B').length

  return (
    <div className="app">
      <Header namaSekolah="TK Kasih Bunda" judul="Daftar Siswa & Kelas" />
      <main className="konten">
        <RingkasanData
          total={daftarSiswa.length}
          jumlahKelompokA={jumlahKelompokA}
          jumlahKelompokB={jumlahKelompokB}
        />
        <div className="tata-letak">
          <FormTambahSiswa onTambah={tambahSiswa} />
          <section className="bagian-daftar">
            <h2>Siswa Terdaftar</h2>
            <DaftarSiswa daftarSiswa={daftarSiswa} onHapus={hapusSiswa} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
