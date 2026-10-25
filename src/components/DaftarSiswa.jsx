import KartuSiswa from './KartuSiswa'

function DaftarSiswa({ daftarSiswa, onHapus }) {
  // Conditional rendering: tampilkan teks khusus jika daftar kosong
  if (daftarSiswa.length === 0) {
    return <p className="kosong">Belum ada data siswa</p>
  }

  return (
    <div className="daftar-siswa">
      {daftarSiswa.map((siswa) => (
        <KartuSiswa
          key={siswa.id}
          id={siswa.id}
          nama={siswa.nama}
          nisn={siswa.nisn}
          kelas={siswa.kelas}
          namaOrtu={siswa.namaOrtu}
          onHapus={onHapus}
        />
      ))}
    </div>
  )
}

export default DaftarSiswa
