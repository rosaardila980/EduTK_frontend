function KartuGuru({ nama, email, telepon, kota }) {
  return (
    <article className="kartu-guru">
      <h3>{nama}</h3>
      <dl>
        <dt>Email</dt>
        <dd>{email}</dd>
        <dt>Telepon</dt>
        <dd>{telepon}</dd>
        <dt>Kota Asal</dt>
        <dd>{kota}</dd>
      </dl>
    </article>
  )
}

export default KartuGuru
