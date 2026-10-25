function RingkasanData({ total, jumlahKelompokA, jumlahKelompokB }) {
  return (
    <section className="ringkasan" aria-label="Ringkasan data siswa">
      <div className="ringkasan-kartu">
        <span className="ringkasan-label">Total Siswa</span>
        <strong className="ringkasan-angka">{total}</strong>
      </div>
      <div className="ringkasan-kartu">
        <span className="ringkasan-label">Kelompok A</span>
        <strong className="ringkasan-angka">{jumlahKelompokA}</strong>
      </div>
      <div className="ringkasan-kartu">
        <span className="ringkasan-label">Kelompok B</span>
        <strong className="ringkasan-angka">{jumlahKelompokB}</strong>
      </div>
    </section>
  )
}

export default RingkasanData
