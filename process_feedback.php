<?php
// Veritabanı bağlantısı (bu alanı kendi sunucu ayarlarınıza göre güncelleyin)
$servername = "localhost"; // Sunucu adı
$username = "root"; // Veritabanı kullanıcı adı
$password = ""; // Veritabanı şifresi
$dbname = "feedback_db"; // Veritabanı adı

// Bağlantı oluştur
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}

// POST ile gelen form verilerini al
$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
$review = isset($_POST['review']) ? $_POST['review'] : '';
$rating = isset($_POST['rating']) ? $_POST['rating'] : 0;

// Veritabanına ekleme sorgusu
$sql = "INSERT INTO feedback (name, email, phone, feedback, rating) 
        VALUES ('$name', '$email', '$phone', '$review', '$rating')";

if ($conn->query($sql) === TRUE) {
    echo "Geri bildirim başarıyla kaydedildi.";
} else {
    echo "Hata: " . $sql . "<br>" . $conn->error;
}

// Bağlantıyı kapat
$conn->close();
?>
