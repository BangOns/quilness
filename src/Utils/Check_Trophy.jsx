export default function TrophyCheck(nilai) {
  if (nilai >= 1000) {
    return "Kamu Cocok Jadi Dosen";
  } else if (nilai >= 750 && nilai < 1000) {
    return "Keren kamu belajar dengan baik";
  } else if (nilai >= 500 && nilai < 750) {
    return "Lumayan! Tetap Semangat";
  } else if (nilai >= 250 && nilai < 500) {
    return "Belajar Lebih Giat Lagi";
  } else {
    return "Jangan Males Belajar";
  }
}
