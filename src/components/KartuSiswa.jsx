function KartuSiswa({ id, nama, nisn, kelas, namaOrtu, onHapus }) {
  const kelasClass = kelas === 'Kelompok A' ? 'lencana-a' : 'lencana-b'

  return (
    <article className="kartu-siswa">
      <div className="kartu-atas">
        <h3>{nama}</h3>
        <span className={`lencana ${kelasClass}`}>{kelas}</span>
      </div>
      <dl>
        <dt>NISN</dt>
        <dd>{nisn}</dd>
        <dt>Orang Tua / Wali</dt>
        <dd>{namaOrtu}</dd>
      </dl>
      <button type="button" className="tombol tombol-hapus" onClick={() => onHapus(id)}>
        Hapus
      </button>
    </article>
  )
}

export default KartuSiswa
