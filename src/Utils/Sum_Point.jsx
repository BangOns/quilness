export default async function cekJawabanDanHitungSkor(
  jawabanUser,
  dataPertanyaan
) {
  let jawabanBenar = 0;
  const nilaiJawaban = 50;
  for (let i = 0; i < jawabanUser.length; i++) {
    let userJawaban = jawabanUser[i];
    let pertanyaan = dataPertanyaan[i];

    if (pertanyaan && userJawaban.jawaban === pertanyaan.jawaban) {
      jawabanBenar++;
    }
  }
  return { jawabanUser, nilai: jawabanBenar * nilaiJawaban };
}
