import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import RingkasanData from './components/RingkasanData'
import FormTambahSiswa from './components/FormTambahSiswa'
import DaftarSiswa from './components/DaftarSiswa'
import DaftarGuru from './components/DaftarGuru'
import Footer from './components/Footer'
import { siswaAwal } from './data/siswaAwal'

// Endpoint API mock (data pengguna dipakai sebagai data guru pengajar)
const URL_GURU = 'https://jsonplaceholder.typicode.com/users'
// Untuk screenshot kondisi loading: ubah jadi 3000, lalu kembalikan ke 0
const JEDA_SIMULASI_MS = 0

// Mengambil data guru dari API dengan fetch. Mengembalikan array guru,
// atau melempar error jika jaringan putus / server membalas status gagal.
async function ambilDataGuru() {
  if (JEDA_SIMULASI_MS > 0) {
    await new Promise((selesai) => setTimeout(selesai, JEDA_SIMULASI_MS))
  }
  const respons = await fetch(URL_GURU)
  if (!respons.ok) {
    throw new Error(`Server membalas dengan status ${respons.status}`)
  }
  const data = await respons.json()
  // Ambil hanya field yang dibutuhkan aplikasi
  return data.map((u) => ({
    id: u.id,
    nama: u.name,
    email: u.email,
    telepon: u.phone,
    kota: u.address.city,
  }))
}

function App() {
  // State utama: daftar siswa (array of object)
  const [daftarSiswa, setDaftarSiswa] = useState(siswaAwal)

  // State pengambilan data guru dari API: 'loading' | 'success' | 'error'
  const [daftarGuru, setDaftarGuru] = useState([])
  const [statusGuru, setStatusGuru] = useState('loading')
  const [pesanErrorGuru, setPesanErrorGuru] = useState('')

  // Menjalankan pengambilan data lalu mengatur status: success atau error
  function muatDataGuru() {
    ambilDataGuru()
      .then((guru) => {
        setDaftarGuru(guru)
        setStatusGuru('success')
      })
      .catch((error) => {
        setPesanErrorGuru(error.message)
        setStatusGuru('error')
      })
  }

  // Dipanggil tombol "Coba Lagi": kembali ke status loading, lalu ambil data ulang
  function cobaLagiGuru() {
    setStatusGuru('loading')
    setPesanErrorGuru('')
    muatDataGuru()
  }

  // Panggil API satu kali saat halaman pertama dimuat
  useEffect(() => {
    muatDataGuru()
  }, [])

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
        <section className="bagian-guru">
          <h2>Guru Pengajar</h2>
          <DaftarGuru
            status={statusGuru}
            daftarGuru={daftarGuru}
            pesanError={pesanErrorGuru}
            onCobaLagi={cobaLagiGuru}
          />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
