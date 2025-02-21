/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

  $.ajax({
        url: '/************************************/',
        type: 'GET',
        timeout: 5000, // Zaman aþýmý 5 saniye
        success: function (data) {
            var feedbackTypeSelect = $('#feedbackType');
            feedbackTypeSelect.empty();
            feedbackTypeSelect.append('<option value="">Seçiniz</option>');

            // Gelen veriyi dropdown'a ekleyin
            $.each(data, function (index, item) {
                feedbackTypeSelect.append('<option value="' + item.geribildirim_tipi_id + '">' + item.geribildirim_adi + '</option>');
            });
        },
        error: function () {
            alert("Geri bildirim türleri yüklenemedi.");
        }
    });

    // AJAX - Geri bildirimi gönderme
    $('#submitFeedback').on('click', function () {
        var geribildirimTipiId = $('#feedbackType').val();
        var geribildirimMesaj = $('#feedbackMessage').val();

        // Mesaj alaný boþ ise uyarý göster
        if (!geribildirimMesaj.trim()) {
            alert("Lütfen mesaj alanýný boþ býrakmayýnýz.");
            return;
        }

        // Kullanýcý geri bildirimi gönderildiðini hatýrlamamalý.
        if ($("#submitFeedback").prop('disabled')) {
            alert("Lütfen iþlemin tamamlanmasýný bekleyin.");
            return;
        }

        // Butonu geçici olarak devre dýþý býrak
        $("#submitFeedback").prop('disabled', true);

        // AJAX ile geri bildirim gönderme
        $.ajax({
            url: '/******************************************/',
            type: 'POST',
            timeout: 5000, // Zaman aþýmý 5 saniye
            data: { geribildirimTipiId: geribildirimTipiId, geribildirimMesaj: geribildirimMesaj },
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    $('#feedbackMessage').val(''); // Formu temizle
                    $('#feedbackType').val(''); // Dropdown'ý sýfýrla
                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert("Bir hata oluþtu, lütfen tekrar deneyiniz.");
            },
            complete: function () {
                // Ýþlem tamamlandýðýnda butonu tekrar etkinleþtir
                $("#submitFeedback").prop('disabled', false);
            }
        });
    });
});

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

 $(document).ready(function () {
        // Ýletiþim bilgilerini güncelleme
     $('#IletisimGuncelleBtn').on('click', function () {
            var telefon = $('#telefon').val();
            var email = $('#email').val();
            var il = $('#il').val();
            var ilce = $('#ilce').val();

            $.ajax({
                url: '/****************************************/',
                type: 'POST',
                data: { telefon: telefon, email: email, il: il, ilce: ilce },
                success: function (response) {
                    if (response.success) {
                        alert(response.message);
                    } else {
                        alert(response.message);
                    }
                }
            });
        });

        // Þifreyi deðiþtirme

     $('#SifreGuncelleBtn').on('click', function () {
            const eskiSifre = $('#eskiSifre').val();
            const yeniSifre = $('#yeniSifre').val();

            $.ajax({
                url: '/*************************************/',
                type: 'POST',
                data: {
                    eskiSifre: eskiSifre,
                    yeniSifre: yeniSifre
                },
                success: function (response) {
                    if (response.succes) {
                        // Form alanlarýný boþalt
                        $('#eskiSifre').val('');
                        $('#yeniSifre').val('');

                        alert(response.message);
                    } else {
                        alert("Hata: "+response.message);
                    }

                },
                error: function (xhr,status,error) {
                    alert("Bir hata oluþtu: "+xhr.responseText);
                }
            });
        });
 });





/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

 $(document).ready(function () {
    $('#submitFeedback').on('click', function () {
    const geribildirimTipiId = $('#feedbackType').val();
    const geribildirimMesaj = $('#feedbackMessage').val();

    if (!geribildirimMesaj.trim()) {
        alert("Lütfen mesaj alanýný boþ býrakmayýnýz.");
        return;
    }

    $.ajax({
        url: '/******************************************/',
        type: 'POST',
        data: { geribildirimTipiId: geribildirimTipiId, geribildirimMesaj: geribildirimMesaj },
        success: function (response) {
            if (response.success) {
                alert(response.message);
                $('#feedbackMessage').val(''); // Formu temizle
                $('#feedbackType').val('1'); // Tipi sýfýrla (Genel)
            } else {
                alert(response.message);
            }
        },
        error: function () {
            alert("Bir hata oluþtu, lütfen tekrar deneyiniz.");
        }
    });
});

 });





/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */


    $(document).ready(function () {
    const loadDonations = (page) => {
        $.get('/**********************************/', { page: page }, function (data) {
            const donationList = $('#donationList');
            const pagination = $('#pagination');
            donationList.empty();
            pagination.empty();

            // Baðýþlarý listele
            data.bagislar.forEach(function (bagis) {
                donationList.append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${bagis.proje_ad}</strong> - ${new Date(bagis.bagis_tarihi).toLocaleString('tr-TR')} - <strong>${bagis.bagis_miktari} ?</strong>
                        </div>
                        <button class="btn btn-sm btn-outline-primary yorumYapBtn" data-projeid="${bagis.proje_id}">Yorum Yap</button>
                    </li>
                `);
            });

            // "Yorum Yap" butonuna týklama
            $('.yorumYapBtn').on('click', function () {
                const projeId = $(this).data('projeid');
                $('#selectedProjeId').val(projeId);
                $('#yorumKismi').modal('show');
            });

            // Sayfalama butonlarý
            for (let i = 1; i <= data.totalPages; i++) {
                pagination.append(`
                    <li class="page-item ${i === page ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${i}">${i}</a>
                    </li>
                `);
            }

            $('.page-link').off('click').on('click', function (e) {
                e.preventDefault();
                const selectedPage = $(this).data('page');
                loadDonations(selectedPage);
            });
        });
    };

    // Ýlk sayfa yükleme
    loadDonations(1);

    // Yorum gönderme
    $('#yorumGonderBtn').on('click', function () {
        const projeId = $('#selectedProjeId').val();
        const yorumMetni = $('#yorumMetni').val();

        $.ajax({
            url: '/********************************/',
            type: 'POST',
            data: { projeId: projeId, yorumMetni: yorumMetni },
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    $('#yorumKismi').modal('hide');
                    $('#yorumMetni').val('');
                } else {
                    alert(response.message);
                }
            }
        });
    });
});


/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    // Statik baðýþ verisi
    const donations = [
        { ProjeAdi: "Eðitim Desteði", BagisTarihi: "2024-12-01", Tutar: 250.00 },
        { ProjeAdi: "Saðlýk Projesi", BagisTarihi: "2024-11-25", Tutar: 500.00 },
        { ProjeAdi: "Afet Yardýmý", BagisTarihi: "2024-11-20", Tutar: 300.50 },
        { ProjeAdi: "Barýnak Yardýmý", BagisTarihi: "2024-11-15", Tutar: 150.00 },
        { ProjeAdi: "Gýda Yardýmý", BagisTarihi: "2024-11-10", Tutar: 100.00 },
        { ProjeAdi: "Eðitim Projesi", BagisTarihi: "2024-10-25", Tutar: 400.00 },
        { ProjeAdi: "Saðlýk Desteði", BagisTarihi: "2024-10-15", Tutar: 600.00 },
        { ProjeAdi: "Afet Projesi", BagisTarihi: "2024-09-30", Tutar: 200.00 },
        { ProjeAdi: "Barýnma Desteði", BagisTarihi: "2024-09-20", Tutar: 350.00 },
        { ProjeAdi: "Gýda Projesi", BagisTarihi: "2024-09-10", Tutar: 180.00 },
        { ProjeAdi: "Kýyafet Yardýmý", BagisTarihi: "2024-08-30", Tutar: 120.00 },
    ];

    const itemsPerPage = 10;
    let currentPage = 1;
    let filteredDonations = [...donations];

    function renderDonations() {
        const donationList = document.getElementById("donationList");
        donationList.innerHTML = "";

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const donationsToRender = filteredDonations.slice(startIndex, endIndex);

        if (donationsToRender.length === 0) {
            donationList.innerHTML = "<li class='list-group-item'>Hiç baðýþ bulunamadý.</li>";
            return;
        }

        donationsToRender.forEach(donation => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.innerHTML = `
                <strong>${donation.ProjeAdi}</strong>
                - ${new Date(donation.BagisTarihi).toLocaleDateString("tr-TR")}
                - <strong>${donation.Tutar.toFixed(2)} ?</strong>
            `;
            donationList.appendChild(listItem);
        });
    }

    function renderPagination() {
        const pagination = document.getElementById("pagination");
        pagination.innerHTML = "";

        const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement("li");
            pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;

            const pageLink = document.createElement("a");
            pageLink.className = "page-link";
            pageLink.href = "#";
            pageLink.innerText = i;

            pageLink.addEventListener("click", (e) => {
                e.preventDefault();
                currentPage = i;
                renderDonations();
                renderPagination();
            });

            pageItem.appendChild(pageLink);
            pagination.appendChild(pageItem);
        }
    }

    function filterAndSortDonations() {
        const searchInput = document.getElementById("searchInput").value.toLowerCase();
        const sortSelect = document.getElementById("sortSelect").value;

        filteredDonations = donations.filter(donation =>
            donation.ProjeAdi.toLowerCase().includes(searchInput)
        );

        switch (sortSelect) {
            case "dateDesc":
                filteredDonations.sort((a, b) => new Date(b.BagisTarihi) - new Date(a.BagisTarihi));
                break;
            case "dateAsc":
                filteredDonations.sort((a, b) => new Date(a.BagisTarihi) - new Date(b.BagisTarihi));
                break;
            case "amountDesc":
                filteredDonations.sort((a, b) => b.Tutar - a.Tutar);
                break;
            case "amountAsc":
                filteredDonations.sort((a, b) => a.Tutar - b.Tutar);
                break;
        }

        currentPage = 1;
        renderDonations();
        renderPagination();
    }

    document.getElementById("searchInput").addEventListener("input", filterAndSortDonations);
    document.getElementById("sortSelect").addEventListener("change", filterAndSortDonations);

    // Ýlk render
    renderDonations();
    renderPagination();
                
/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
