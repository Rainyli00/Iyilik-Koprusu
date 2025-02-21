var currentPage = 1;

// Kullanıcı Listesi Yükleme
function loadKullanicilar(page) {
    currentPage = page;
    $('#kullaniciListesi').html('<tr><td colspan="6" class="text-center">Yükleniyor...</td></tr>');

    $.ajax({
        url: '@Url.Action("GetPagedKullanicilar", "AdminHome")',
        type: 'GET',
        data: { page: page, pageSize: 10 },
        success: function (response) {
            $('#kullaniciListesi').empty();
            response.kullanicilar.forEach(function (user) {
                $('#kullaniciListesi').append(`
                    <tr>
                        <td>${user.kullanici_id}</td>
                        <td>${user.ad_soyad}</td>
                        <td>${user.e_mail}</td>
                        <td>${user.telefon}</td>
                        <td>${user.Rol}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editUser(${user.kullanici_id})">Düzenle</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.kullanici_id})">Sil</button>
                        </td>
                    </tr>
                `);
            });

            // Sayfalama
            $('#pagination').empty();
            for (var i = 1; i <= response.totalPages; i++) {
                $('#pagination').append(`
                    <li class="page-item ${i === page ? 'active' : ''}">
                        <a class="page-link" href="#" onclick="loadKullanicilar(${i})">${i}</a>
                    </li>
                `);
            }
        },
        error: function () {
            alert("Kullanıcılar yüklenirken bir hata oluştu.");
        }
    });
}

// Kullanıcı Düzenle
function editUser(id) {
    $.ajax({
        url: '@Url.Action("GetKullaniciById", "AdminHome")',
        type: 'GET',
        data: { id: id },
        success: function (user) {
            $('#editId').val(user.kullanici_id);
            $('#editAdSoyad').val(user.ad_soyad);
            $('#editEmail').val(user.e_mail);
            $('#editTelefon').val(user.telefon);
            $('#editKullaniciModal').modal('show');
        },
        error: function () {
            alert("Kullanıcı bilgileri yüklenirken bir hata oluştu.");
        }
    });
}

$('#saveEditBtn').click(function () {
    $.ajax({
        url: '@Url.Action("UpdateKullanici", "AdminHome")',
        type: 'POST',
        data: {
            id: $('#editId').val(),
            adSoyad: $('#editAdSoyad').val(),
            email: $('#editEmail').val(),
            telefon: $('#editTelefon').val()
        },
        success: function () {
            $('#editKullaniciModal').modal('hide');
            loadKullanicilar(currentPage);
        },
        error: function () {
            alert("Kullanıcı güncellenirken bir hata oluştu.");
        }
    });
});

// Kullanıcı Sil
function deleteUser(id) {
    if (confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
        $.ajax({
            url: '@Url.Action("DeleteKullanici", "AdminHome")',
            type: 'POST',
            data: { id: id },
            success: function () {
                loadKullanicilar(currentPage);
            },
            error: function () {
                alert("Kullanıcı silinirken bir hata oluştu.");
            }
        });
    }
}

// Grafik verilerini sunucudan çekme
$.ajax({
    url: '@Url.Action("GetBagisByKategori", "AdminHome")',
    type: 'GET',
    success: function (response) {
        var kategoriler = [];
        var bagisMiktarlari = [];

        // Verileri ayrıştırma
        response.forEach(function (item) {
            kategoriler.push(item.KategoriAdi);
            bagisMiktarlari.push(item.ToplamBagis);
        });

        // Grafik oluşturma
        var ctx = document.getElementById('bagisChart').getContext('2d');
        var bagisChart = new Chart(ctx, {
            type: 'bar',  // Grafik türü: bar (çubuk grafik)
            data: {
                labels: kategoriler,  // X eksenindeki etiketler (kategori isimleri)
                datasets: [{
                    label: 'Bağış Miktarı (₺)',  // Y eksenindeki etiket
                    data: bagisMiktarlari,  // Bağış miktarları
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',  // Çubukların arka plan rengi
                    borderColor: 'rgba(54, 162, 235, 1)',  // Çubukların kenar rengi
                    borderWidth: 1  // Çubuğun kenar kalınlığı
                }]
            },
            options: {
                responsive: true,  // Grafik responsive (mobil uyumlu)
                scales: {
                    y: {
                        beginAtZero: true  // Y ekseni sıfırdan başlasın
                    }
                }
            }
        });
    },
    error: function () {
        alert("Bağış verileri çekilirken bir hata oluştu.");
    }
});

// İlk yükleme
loadKullanicilar(currentPage);
