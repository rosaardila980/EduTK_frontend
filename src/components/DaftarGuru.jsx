import KartuGuru from './KartuGuru'

// status: 'loading' | 'success' | 'error'
function DaftarGuru({ status, daftarGuru, pesanError, onCobaLagi }) {
  if (status === 'loading') {
    return (
      <div className="status-kotak" role="status">
        <span className="spinner" aria-hidden="true"></span>
        <p>Memuat data guru...</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="status-kotak status-error" role="alert">
        <p><strong>Gagal memuat data guru.</strong></p>
        <p className="status-detail">{pesanError}</p>
        <button type="button" className="tombol tombol-utama tombol-kecil" onClick={onCobaLagi}>
          Coba Lagi
        </button>
      </div>
    )
  }

  if (daftarGuru.length === 0) {
    return <p className="kosong">Belum ada data guru</p>
  }

  return (
    <div className="daftar-guru">
      {daftarGuru.map((guru) => (
        <KartuGuru
          key={guru.id}
          nama={guru.nama}
          email={guru.email}
          telepon={guru.telepon}
          kota={guru.kota}
        />
      ))}
    </div>
  )
}

export default DaftarGuru
