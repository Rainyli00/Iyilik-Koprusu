$(document).ready(function () {
    $('#kategoriDropdown').change(function () {
        var kategoriId = $(this).val();
        $('#projeDropdown').html('<option value="">Yükleniyor...</option>');
        $('#projeDetay').addClass('d-none');

        if (kategoriId && kategoriId != '0') {
            $.getJSON('/Donate/GetKategoriyeGoreProje', { kategori_id: kategoriId }, function (data) {
                var options = '<option value="">Proje Seçiniz...</option>';
                $.each(data, function (i, item) {
                    options += '<option value="' + item.proje_id + '">' + item.proje_ad + '</option>';
                });
                $('#projeDropdown').html(options);
            });
        } else if (kategoriId == '0') {
            $.getJSON('/Donate/GetTumProjeler', function (data) {
                var options = '<option value="">Proje Seçiniz...</option>';
                $.each(data, function (i, item) {
                    options += '<option value="' + item.proje_id + '">' + item.proje_ad + '</option>';
                });
                $('#projeDropdown').html(options);
            });
        } else {
            $('#projeDropdown').html('<option value="">Önce kategori seçiniz</option>');
        }
    });

    $('#projeDropdown').change(function () {
        var projeId = $(this).val();
        if (projeId) {
            $.getJSON('/Donate/GetProjeDetayları', { proje_id: projeId }, function (data) {
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