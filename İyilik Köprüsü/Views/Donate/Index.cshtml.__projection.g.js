/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    $(document).ready(function () {
        // Kategori se�ildi�inde proje dropdown'�n� g�ncelle ve sa� taraf� s�f�rla
        $('#kategoriDropdown').change(function () {
            var kategoriId = $(this).val(); // Se�ilen kategori ID'sini al
            $('#projeDropdown').html('<option value="">Y�kleniyor...</option>'); // Proje dropdown'� temizle
            $('#projeDetay').addClass('d-none'); // Sa� taraf� s�f�rla

            // "Kategori Se�iniz" d���nda bir kategori se�ildiyse
            if (kategoriId && kategoriId != '0') {
                $.getJSON('/Donate/GetKategoriyeGoreProje', { kategori_id: kategoriId }, function (data) {
                    var options = '<option value="">Proje Se�iniz...</option>';
                    $.each(data, function (i, item) {
                        options += '<option value="' + item.proje_id + '">' + item.proje_ad + '</option>';
                    });
                    $('#projeDropdown').html(options);
                });
            } else if (kategoriId == '0') {
                // "T�m�n� G�ster" se�ildi�inde, t�m projeleri getir
                $.getJSON('/Donate/GetTumProjeler', function (data) {
                    var options = '<option value="">Proje Se�iniz...</option>';
                    $.each(data, function (i, item) {
                        options += '<option value="' + item.proje_id + '">' + item.proje_ad + '</option>';
                    });
                    $('#projeDropdown').html(options);
                });
            } else {
                // "Kategori Se�iniz" se�ildi�inde proje dropdown'�n� bo� b�rak
                $('#projeDropdown').html('<option value="">�nce kategori se�iniz</option>');
            }
        });

        // Proje se�ildi�inde proje detaylar�n� g�ster
        $('#projeDropdown').change(function () {
            var projeId = $(this).val(); // Se�ilen proje ID'sini al
            if (projeId) {
                $.getJSON('/Donate/GetProjeDetaylar�', { proje_id: projeId }, function (data) {
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
            var kategoriId = $(this).val(); // Se�ilen kategori ID'sini al
            $('#projeDropdown').html('<option value="">Y�kleniyor...</option>'); // Proje dropdown'� temizle

            if (kategoriId) {
                $.getJSON('/Donate/GetProjectsByCategory', { kategori_id: kategoriId }, function (data) {
                    var options = '<option value="">Proje Se�iniz...</option>';
                    $.each(data, function (i, item) {
                        options += '<option value="' + item.proje_id + '">' + item.proje_ad + '</option>';
                    });
                    $('#projeDropdown').html(options);
                });
            } else {
                $('#projeDropdown').html('<option value="">�nce kategori se�iniz...</option>');
            }
        });
    });

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    $(document).ready(function () {
        $('#kategoriDropdown').change(function () {
            var kategoriId = $(this).val(); // Se�ilen kategori ID'sini al
            $('#projeDropdown').html('<option value="">Y�kleniyor...</option>'); // Proje dropdown'� temizle

            if (kategoriId) {
                $.getJSON('/Donate/GetProjectsByCategory', { kategori_id: kategoriId }, function (data) {
                    var options = '<option value="">Proje Se�iniz...</option>';
                    $.each(data, function (i, item) {
                        options += '<option value="' + item.proje_id + '">' + item.proje_ad + '</option>';
                    });
                    $('#projeDropdown').html(options);
                });
            } else {
                $('#projeDropdown').html('<option value="">�nce kategori se�iniz...</option>');
            }
        });
    });

/* END EXTERNAL SOURCE */
