function Header({ namaSekolah, judul }) {
  return (
    <header className="header">
      <p className="header-sekolah">{namaSekolah}</p>
      <h1>{judul}</h1>
    </header>
  )
}

export default Header
