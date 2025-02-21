/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    $(document).ready(function () {
        // Kategori seçildiðinde proje dropdown'ýný güncelle ve sað tarafý sýfýrla
        $('#kategoriDropdown').change(function () {
            var kategoriId = $(this).val(); // Seçilen kategori ID'sini al
            $('#projeDropdown').html('<option value="">Yükleniyor...</option>'); // Proje dropdown'ý temizle
            $('#projeDetay').addClass('d-none'); // Sað tarafý sýfýrla

            // "Kategori Seçiniz" dýþýnda bir kategori seçildiyse
            if (kategoriId && kategoriId != '0') {
                $.getJSON('/Donate/GetKategoriyeGoreProje', { kategori_id: kategoriId }, function (data) {
                    var options = '<option value="">Proje Seçiniz...</option>';
                    $.each(data, function (i, item) {
                        options += '<option value="' + item.proje_id + '">' + item.proje_ad + '</option>';
                    });
                    $('#projeDropdown').html(options);
                });
            } else if (kategoriId == '0') {
                // "Tümünü Göster" seçildiðinde, tüm projeleri getir
                $.getJSON('/Donate/GetTumProjeler', function (data) {
                    var options = '<option value="">Proje Seçiniz...</option>';
                    $.each(data, function (i, item) {
                        options += '<option value="' + item.proje_id + '">' + item.proje_ad + '</option>';
                    });
                    $('#projeDropdown').html(options);
                });
            } else {
                // "Kategori Seçiniz" seçildiðinde proje dropdown'ýný boþ býrak
                $('#projeDropdown').html('<option value="">Önce kategori seçiniz</option>');
            }
        });

        // Proje seçildiðinde proje detaylarýný göster
        $('#projeDropdown').change(function () {
            var projeId = $(this).val(); // Seçilen proje ID'sini al
            if (projeId) {
                $.getJSON('/Donate/GetProjeDetaylarý', { proje_id: projeId }, function (data) {
                    if (data) {
                        $('#projeAd').text(data.proje_ad);
                        $('#projeResim').attr('src', data.proje_resim);
                        $('#projeAciklama').text(data.proje_aciklama);
                        $('#projeDetay').removeClass('d-none');
                    } else {
                        $('#projeDetay').addClass('d-none');
                    }
                });
            } else {
                $('#projeDetay').addClass('d-none');
            }
        });
    });

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    $(document).ready(function () {
        $('#kategoriDropdown').change(function () {
            var kategoriId = $(this).val(); // Seçilen kategori ID'sini al
            $('#projeDropdown').html('<option value="">Yükleniyor...</option>'); // Proje dropdown'ý temizle

            if (kategoriId) {
                $.getJSON('/Donate/GetProjectsByCategory', { kategori_id: kategoriId }, function (data) {
                    var options = '<option value="">Proje Seçiniz...</option>';
                    $.each(data, function (i, item) {
                        options += '<option value="' + item.proje_id + '">' + item.proje_ad + '</option>';
                    });
                    $('#projeDropdown').html(options);
                });
            } else {
                $('#projeDropdown').html('<option value="">Önce kategori seçiniz...</option>');
            }
        });
    });

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    $(document).ready(function () {
        $('#kategoriDropdown').change(function () {
            var kategoriId = $(this).val(); // Seçilen kategori ID'sini al
            $('#projeDropdown').html('<option value="">Yükleniyor...</option>'); // Proje dropdown'ý temizle

            if (kategoriId) {
                $.getJSON('/Donate/GetProjectsByCategory', { kategori_id: kategoriId }, function (data) {
                    var options = '<option value="">Proje Seçiniz...</option>';
                    $.each(data, function (i, item) {
                        options += '<option value="' + item.proje_id + '">' + item.proje_ad + '</option>';
                    });
                    $('#projeDropdown').html(options);
                });
            } else {
                $('#projeDropdown').html('<option value="">Önce kategori seçiniz...</option>');
            }
        });
    });

/* END EXTERNAL SOURCE */
