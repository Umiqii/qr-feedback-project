document.addEventListener('DOMContentLoaded', function () {
    // Yıldızlarla ilgili işlemler (index.html için)
    const stars = document.querySelectorAll('.star');
    let currentRating = 0;  // Yıldız derecelendirmesini tutacak değişken

    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('mouseover', function () {
                const hoverValue = this.getAttribute('data-value');
                updateStars(hoverValue);
            });

            star.addEventListener('mouseout', function () {
                updateStars(currentRating);
            });

            star.addEventListener('click', function () {
                currentRating = this.getAttribute('data-value');
                updateStars(currentRating);
                localStorage.setItem('userRating', currentRating);  // Seçilen puanı localStorage'a kaydet

                // 1, 2, 3 yıldızda feedback.html'e yönlendir, 4 veya 5 yıldızda redirect.html'e yönlendir
                setTimeout(() => {
                    if (currentRating <= 3) {
                        window.location.href = 'feedback.html';  // Düşük puan form sayfasına yönlendirir
                    } else {
                        window.location.href = 'redirect.html';  // Yüksek puan redirect.html'e yönlendirir
                    }
                }, 500);  // Kullanıcıya görsel değişikliği görmek için kısa bir süre ver
            });
        });

        // Yıldızları güncelleyen fonksiyon
        function updateStars(rating) {
            stars.forEach(star => {
                const starValue = star.getAttribute('data-value');
                if (starValue <= rating) {
                    star.src = 'assets/star-filled.png';
                } else {
                    star.src = 'assets/star-empty.png';
                }
            });
        }
    }

    // Feedback formu işlemleri (feedback.html için)
    const feedbackForm = document.getElementById('feedbackForm');
    const consentCheckbox = document.getElementById('consent');
    const submitButton = document.querySelector('.submit-btn');

    if (feedbackForm && consentCheckbox && submitButton) {
        // Onay kutusu işaretlenmeden buton devre dışı bırakılır
        submitButton.disabled = true;

        // Onay kutusu işaretlendiğinde buton etkinleştirilir
        consentCheckbox.addEventListener('change', function () {
            submitButton.disabled = !this.checked;
        });

        // Form gönderme işlemi
        feedbackForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const rating = localStorage.getItem('userRating');  // LocalStorage'den puanı al
            const formData = new FormData(feedbackForm);
            formData.append('rating', rating);

            // AJAX ile form verilerini gönder
            fetch('process_feedback.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                // Teşekkür mesajını alert() ile göster
                alert('Geri bildiriminiz başarıyla gönderildi. Teşekkürler!');
                
                // Formu temizleyebiliriz
                feedbackForm.reset();
                submitButton.disabled = true;  // Form gönderildikten sonra buton tekrar devre dışı
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Bir hata oluştu, lütfen tekrar deneyin.');
            });
        });
    }

    // redirect.html sayfasındaki buton işlemleri
    const redirectButtons = document.querySelectorAll('.redirect-container button');
    if (redirectButtons.length > 0) {
        redirectButtons.forEach(button => {
            button.addEventListener('click', function () {
                const url = this.getAttribute('data-url');
                if (url) {
                    window.location.href = url;
                }
            });
        });
    }
});
