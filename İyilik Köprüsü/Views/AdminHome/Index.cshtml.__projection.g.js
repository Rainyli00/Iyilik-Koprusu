﻿/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

// Grafik verilerini sunucudan çekme
$.ajax({
    url: '/********************************************/',
    type: 'GET',
    success: function (response) {
        var kategoriler = [];
        var bagisMiktarlari = [];
        var colors = []; // Renkleri tutacak dizi

        // Rastgele renk üreten fonksiyon
        function randomColor() {
            return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
        }

        // Verileri ayrıştırma ve renkleri oluşturma
        response.forEach(function (item) {
            kategoriler.push(item.KategoriAdi);
            bagisMiktarlari.push(item.ToplamBagis);
            colors.push(randomColor()); // Her kategori için rastgele renk oluştur
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
                    backgroundColor: colors, // Çubukların rastgele arka plan renkleri
                    borderColor: colors.map(color => color.replace('0.6', '1')), // Çubukların kenar renkleri
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

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

$(document).ready(function () {
    var currentPage = 1;

    // Kullanıcıları listeleme fonksiyonu
    function loadKullanicilar(search = "", page = 1) {
        currentPage = page; // Geçerli sayfayı güncelle
        $('#kullaniciListesi').html('<tr><td colspan="6" class="text-center">Yükleniyor...</td></tr>');

        $.ajax({
            url: '/**********************************************/',
            type: 'GET',
            data: { search: search, page: page, pageSize: 10 }, // Search ve page gönderiliyor
            success: function (response) {
                $('#kullaniciListesi').empty(); // Liste temizleniyor
                if (response.kullanicilar.length === 0) {
                    $('#kullaniciListesi').append('<tr><td colspan="6" class="text-center">Hiç kullanıcı bulunamadı.</td></tr>');
                } else {
                    // Kullanıcıları döngü ile tabloya ekleme
                    response.kullanicilar.forEach(function (user) {
                        $('#kullaniciListesi').append(`
                            <tr>
                                <td>${user.kullanici_id}</td>
                                <td>${user.ad_soyad}</td>
                                <td>${user.e_mail}</td>
                                <td>${user.telefon}</td>
                                <td>${user.Rol}</td>
                                <td>
                                    <button class="btn btn-warning btn-sm edit-kullanici" data-id="${user.kullanici_id}">Düzenle</button>
                                    <button class="btn btn-danger btn-sm delete-kullanici" data-id="${user.kullanici_id}">Sil</button>
                                </td>
                            </tr>
                        `);
                    });
                }

                // Sayfalama
                $('#pagination').empty();

                const totalPages = response.totalPages; // Toplam sayfa sayısı
                const maxVisiblePages = 5; // Aynı anda gösterilecek sayfa sayısı
                const currentPage = page; // Mevcut sayfa

                // Başlangıç ve Bitiş Sayfa Hesaplama
                const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                // Başlangıç noktalar (1 ve ...)
                if (startPage > 1) {
                    $('#pagination').append(`
        <li class="page-item">
            <a class="page-link" href="#" data-page="1">1</a>
        </li>
    `);
                    if (startPage > 2) {
                        $('#pagination').append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
        `);
                    }
                }

                // Orta Sayfalar
                for (let i = startPage; i <= endPage; i++) {
                    $('#pagination').append(`
        <li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
    `);
                }

                // Bitiş noktalar (... ve son sayfa)
                if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                        $('#pagination').append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
        `);
                    }
                    $('#pagination').append(`
        <li class="page-item">
            <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
        </li>
    `);
                }

            },
            error: function () {
                alert("Kullanıcılar yüklenirken bir hata oluştu.");
            }
        });
    }

    // Kullanıcı düzenleme işlemi
   $(document).on('click', '.edit-kullanici', function () {
    var id = $(this).data('id');
    $.ajax({
        url: '/*********************************************/',
        type: 'GET',
        data: { id: id },
        success: function (response) {
            if (response.success) {
                const kullanici = response.kullanici; // Gelen veriyi kullanici değişkenine al
                $('#editId').val(kullanici.kullanici_id);
                $('#editAdSoyad').val(kullanici.ad_soyad);
                $('#editEmail').val(kullanici.e_mail);
                $('#editTelefon').val(kullanici.telefon);
                $('#editKullaniciModal').modal('show'); // Modalı aç
            } else {
                alert("Kullanıcı bilgileri alınırken bir hata oluştu: " + response.message);
            }
        },
        error: function () {
            alert("Kullanıcı bilgileri alınamadı.");
        }
    });
});


    // Kullanıcı güncelleme kaydetme işlemi
    $('#saveEditBtn').click(function () {
        var id = $('#editId').val();
        var adSoyad = $('#editAdSoyad').val();
        var email = $('#editEmail').val();
        var telefon = $('#editTelefon').val();

        $.ajax({
            url: '/*****************************************/',
            type: 'POST',
            data: {
                id: id,
                adSoyad: adSoyad,
                email: email,
                telefon: telefon
            },
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    $('#editKullaniciModal').modal('hide'); // Modalı kapat
                    loadKullanicilar(); // Listeyi güncelle
                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert("Kullanıcı güncellenirken bir hata oluştu.");
            }
        });
    });

    // Kullanıcı silme işlemi
    $(document).on('click', '.delete-kullanici', function () {
        var id = $(this).data('id');
        if (confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
            $.ajax({
                url: '/*****************************************/',
                type: 'POST',
                data: { id: id },
                success: function (response) {
                    if (response.success) {
                        alert(response.message);
                        loadKullanicilar(); // Listeyi güncelle
                    } else {
                        alert("Silme işlemi sırasında bir hata oluştu: " + response.message);
                    }
                },
                error: function () {
                    alert("Kullanıcı silinirken bir hata oluştu.");
                }
            });
        }
    });

    // Sayfa tıklamalarını dinlemek için olay bağlama
    $('#pagination').on('click', '.page-link', function (e) {
        e.preventDefault(); // Varsayılan tıklama davranışını engelle
        var page = $(this).data('page'); // Tıklanan sayfanın numarası
        var searchValue = $('#searchInputKullanici').val(); // Arama değerini al
        loadKullanicilar(searchValue, page); // Yeni sayfa yüklenir
    });

    // Arama kutusuna yazıldığında filtreleme
    $('#searchInputKullanici').on('keyup', function () {
        var searchValue = $(this).val(); // Arama kutusundaki değeri al
        loadKullanicilar(searchValue, 1); // İlk sayfa ile yükleme yapılır
    });

    // İlk yükleme
    loadKullanicilar("", currentPage);
});




/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

$(document).ready(function () {
    var currentPage = 1;

    // Projeleri yükle
    loadProjeler();

    // Projeleri listeleme fonksiyonu
    function loadProjeler(search = "", page = 1) {
        $.ajax({
            url: '/*************************************/',
            type: 'POST',
            data: { search: search, page: page, pageSize: 10 },
            success: function (response) {
                if (response.success) {
                    $('#projeListesi').empty();
                    if (response.projeler.length === 0) {
                        $('#projeListesi').append('<tr><td colspan="6" class="text-center">Hiç proje bulunamadı.</td></tr>');
                    } else {
                        response.projeler.forEach(function (proje) {
                            $('#projeListesi').append(`
                                <tr>
                                    <td>${proje.proje_id}</td>
                                    <td>${proje.proje_ad}</td>
                                    <td>${proje.proje_aciklamasi}</td>
                                    <td><img src="${proje.proje_resim_link}" alt="${proje.proje_ad}" style="width: 100px; height: auto;"></td>
                                    <td>${proje.Kategori}</td>
                                    <td>
                                        <button class="btn btn-warning btn-sm edit-proje" data-id="${proje.proje_id}">Düzenle</button>
                                        <button class="btn btn-danger btn-sm delete-proje" data-id="${proje.proje_id}">Sil</button>
                                    </td>
                                </tr>
                            `);
                        });
                    }

                    // Sayfalama
                    // Sayfalama
                    $('#paginationProje').empty();

                    const totalPages = response.totalPages; // Toplam sayfa sayısı
                    const maxVisiblePages = 5; // Aynı anda gösterilecek sayfa sayısı
                    const currentPage = page; // Mevcut sayfa

                    // Başlangıç ve Bitiş Sayfa Hesaplama
                    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                    // Başlangıç noktalar (1 ve ...)
                    if (startPage > 1) {
                        $('#paginationProje').append(`
        <li class="page-item">
            <a class="page-link" href="#" data-page="1">1</a>
        </li>
    `);
                        if (startPage > 2) {
                            $('#paginationProje').append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
        `);
                        }
                    }

                    // Orta Sayfalar
                    for (let i = startPage; i <= endPage; i++) {
                        $('#paginationProje').append(`
        <li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
    `);
                    }

                    // Bitiş noktalar (... ve son sayfa)
                    if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                            $('#paginationProje').append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
        `);
                        }
                        $('#paginationProje').append(`
        <li class="page-item">
            <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
        </li>
    `);
                    }


                    // Sayfa numarasına tıklama olayı
                    $('#paginationProje .page-link').off('click').on('click', function (event) {
                        event.preventDefault();
                        var page = $(this).data('page');
                        loadProjeler(search, page);
                    });
                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert("Projeler yüklenirken bir hata oluştu.");
            }
        });
    }

    // Arama kutusuna yazıldığında projeleri filtrele
    $('#searchInputProje').on('keyup', function () {
        var searchValue = $(this).val(); // Arama kutusundaki değeri al
        loadProjeler(searchValue, 1); // İlk sayfayı yükle
    });

    // Proje düzenleme modalını doldur ve göster
    $(document).on('click', '.edit-proje', function () {
        var id = $(this).data('id');
        $.ajax({
            url: '/*****************************************/',
            type: 'GET',
            data: { id: id },
            success: function (response) {
                if (response.success) {
                    $('#projeId').val(response.data.proje_id);
                    $('#projeAd').val(response.data.proje_ad);
                    $('#projeAciklamasi').val(response.data.proje_aciklamasi);
                    $('#projeResimLink').val(response.data.proje_resim_link);
                    $('#ProjekategoriId').val(response.data.kategori_id); // Kategori ID'sini seçili yap
                    $('#modalTitle').text('Proje Düzenle');
                    $('#projeModal').modal('show');
                } else {
                    alert("Proje detayları alınırken bir hata oluştu.");
                }
            },
            error: function () {
                alert("Proje bilgileri alınamadı.");
            }
        });
    });

    // Proje silme işlemi
    $(document).on('click', '.delete-proje', function () {
        var id = $(this).data('id');
        if (confirm("Bu projeyi silmek istediğinizden emin misiniz?")) {
            $.ajax({
                url: '/*************************************/',
                type: 'POST',
                data: { id: id },
                success: function (response) {
                    if (response.success) {
                        alert("Proje başarıyla silindi.");
                        loadProjeler(); // Listeyi güncelle
                    } else {
                        alert("Silme işlemi sırasında bir hata oluştu: " + response.message);
                    }
                },
                error: function () {
                    alert("Proje silinirken bir hata oluştu.");
                }
            });
        }
    });

    // Proje ekleme ve güncelleme işlemi
    $('#saveProjeBtn').click(function () {
        var id = $('#projeId').val();
        var projeAd = $('#projeAd').val();
        var projeAciklamasi = $('#projeAciklamasi').val();
        var projeResimLink = $('#projeResimLink').val();
        var kategoriId = $('#ProjekategoriId').val();

        var url = id ? '/*************************************/' : '/**********************************/';
        var data = {
            id: id,
            projeAd: projeAd,
            projeAciklamasi: projeAciklamasi,
            projeResimLink: projeResimLink,
            kategoriId: kategoriId
        };

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    $('#projeModal').modal('hide'); // Modalı kapat
                    clearModalFields(); // Modal içindeki alanları temizle
                    loadProjeler(); // Listeyi güncelle
                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert("Proje kaydedilirken bir hata oluştu.");
            }
        });
    });

    // Modal içindeki form alanlarını temizlemek için bir fonksiyon
    function clearModalFields() {
        $('#projeId').val('');
        $('#projeAd').val('');
        $('#projeAciklamasi').val('');
        $('#projeResimLink').val('');
        $('#ProjekategoriId').val('0'); // Varsayılan kategori seçimi
    }

    // Kategorileri yükleme
    function loadKategoriler(selectedKategoriId = null) {
        $.ajax({
            url: '/****************************************/',
            type: 'GET',
            success: function (response) {
                if (response.success) {
                    $('#ProjekategoriId').empty();
                    $('#ProjekategoriId').append('<option value="0">Kategori Seçiniz</option>');
                    response.kategoriler.forEach(function (kategori) {
                        // Eğer mevcut kategori ID'si eşleşiyorsa, seçili yap
                        var selected = kategori.kategori_id == selectedKategoriId ? 'selected' : '';
                        $('#ProjekategoriId').append(`
                            <option value="${kategori.kategori_id}" ${selected}>${kategori.kategori_adi}</option>
                        `);
                    });
                } else {
                    alert("Kategoriler yüklenirken bir hata oluştu: " + response.message);
                }
            },
            error: function () {
                alert("Kategoriler yüklenirken bir hata oluştu.");
            }
        });
    }

    // Modal açıldığında kategorileri yükle
    $('#projeModal').on('show.bs.modal', function () {
        var selectedKategoriId = $('#ProjekategoriId').val(); // Eğer düzenleme yapılıyorsa, mevcut kategori ID'sini al
        loadKategoriler(selectedKategoriId);
    });
});


/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    // Global olarak loadLogs fonksiyonunu tanımlayın
    function loadLogs(search = "", startDate = "", endDate = "", page = 1) {
        currentPage = page;
        $('#logListesi').html('<tr><td colspan="4" class="text-center">Yükleniyor...</td></tr>');

        // Boş tarihleri null olarak ayarlayın
        var data = {
            search: search,
            page: page,
            pageSize: 15
        };

        if (startDate) data.startDate = startDate;
        if (endDate) data.endDate = endDate;

        $.ajax({
            url: '/*********************************/',
            type: 'GET',
            data: data,
            success: function (response) {
                if (response.success) {
                    $('#logListesi').empty();
                    if (response.logs.length === 0) {
                        $('#logListesi').append('<tr><td colspan="4" class="text-center">Hiç log bulunamadı.</td></tr>');
                    } else {
                        response.logs.forEach(function (log) {
                            const readableDate = new Date(log.IslemTarihi).toLocaleString('tr-TR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            });

                            $('#logListesi').append(`
                                <tr>
                                    <td>${log.log_id}</td>
                                    <td>${log.KullaniciAdi}</td>
                                    <td>${log.IslemTuru}</td>
                                    <td>${readableDate}</td>
                                </tr>
                            `);
                        });
                    }

                    // Sayfalama
                    $('#paginationLog').empty();

                    let maxVisiblePages = 5; // Görünecek maksimum sayfa numarası
                    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
                    let endPage = Math.min(response.totalPages, startPage + maxVisiblePages - 1);

                    // Sayfalar arasını sınırlandır
                    if (startPage > 1) {
                        $('#paginationLog').append(`
        <li class="page-item">
            <a class="page-link" href="#" onclick="loadLogs('${search}', '${startDate}', '${endDate}', 1)">1</a>
        </li>
        ${startPage > 2 ? '<li class="page-item"><span class="page-link">...</span></li>' : ''}
    `);
                    }

                    for (let i = startPage; i <= endPage; i++) {
                        $('#paginationLog').append(`
        <li class="page-item ${i === page ? 'active' : ''}">
            <a class="page-link" href="#" onclick="loadLogs('${search}', '${startDate}', '${endDate}', ${i})">${i}</a>
        </li>
    `);
                    }

                    // Son sayfalar arasında boşluk varsa ekle
                    if (endPage < response.totalPages) {
                        $('#paginationLog').append(`
        ${endPage < response.totalPages - 1 ? '<li class="page-item"><span class="page-link">...</span></li>' : ''}
        <li class="page-item">
            <a class="page-link" href="#" onclick="loadLogs('${search}', '${startDate}', '${endDate}', ${response.totalPages})">${response.totalPages}</a>
        </li>
    `);
                    }

                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert("Loglar yüklenirken bir hata oluştu.");
            }
        });
    }

    $(document).ready(function () {
        // İlk yükleme
        loadLogs();

        // Arama ve filtreleme
        $('#searchLogInput, #startDate, #endDate').on('input change', function () {
            var search = $('#searchLogInput').val();
            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();
            loadLogs(search, startDate, endDate, 1);
        });
    });

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

  $(document).ready(function () {
    var currentBagisPage = 1;

    function loadBagislar(search = "", startDate = "", endDate = "", page = 1) {
        currentBagisPage = page; // Sayfa bilgisini güncelle
        $('#bagisListesiBody').html('<tr><td colspan="6" class="text-center">Yükleniyor...</td></tr>');

        $.ajax({
            url: '/*************************************/',
            type: 'GET',
            data: { search: search, startDate: startDate, endDate: endDate, page: page, pageSize: 10 },
            success: function (response) {
                if (response.success) {
                    $('#bagisListesiBody').empty(); // Mevcut liste temizleniyor

                    if (response.bagislar.length === 0) {
                        $('#bagisListesiBody').append('<tr><td colspan="6" class="text-center">Hiç bağış bulunamadı.</td></tr>');
                    } else {
                        // Gelen bağış verilerini tabloya ekleme
                        response.bagislar.forEach(function (bagis) {
                            $('#bagisListesiBody').append(`
                                <tr>
                                    <td>${bagis.bagis_id}</td>
                                    <td>${bagis.KullaniciAdi}</td>
                                    <td>${bagis.ProjeAdi}</td>
                                    <td>${bagis.OdemeYontemi}</td>
                                    <td>${bagis.bagis_miktari.toFixed(2)}</td>
                                    <td>${bagis.BagisTarihi}</td>
                                </tr>
                            `);
                        });
                    }
                    // Sayfalama işlemi
                    $('#paginationBagis').empty();

                    const totalPages = response.totalPages; // Toplam sayfa sayısı
                    const maxVisiblePages = 5; // Aynı anda gösterilecek sayfa sayısı
                    const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
                    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                    // Noktalar eklenmesi
                    if (startPage > 1) {
                        $('#paginationBagis').append(`
        <li class="page-item">
            <a class="page-link" href="#" data-page="1">1</a>
        </li>
    `);
                        if (startPage > 2) {
                            $('#paginationBagis').append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
        `);
                        }
                    }

                    for (let i = startPage; i <= endPage; i++) {
                        $('#paginationBagis').append(`
        <li class="page-item ${i === page ? 'active' : ''}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
    `);
                    }

                    // Son sayfa kontrolü ve noktalar
                    if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                            $('#paginationBagis').append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
        `);
                        }
                        $('#paginationBagis').append(`
        <li class="page-item">
            <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
        </li>
    `);
                    }

                } else {
                    alert(response.message); // Hata mesajı
                }
            },
            error: function () {
                alert("Bağışlar yüklenirken bir hata oluştu."); // Hata durumunda uyarı
            }
        });
    }

    // Sayfa geçişlerini dinlemek için olay bağlama
    $('#paginationBagis').on('click', '.page-link', function (e) {
        e.preventDefault(); // Varsayılan link davranışını engelle
        var page = $(this).data('page'); // Tıklanan sayfanın numarasını al
        var search = $('#searchInputBagis').val(); // Geçerli arama değerini al
        var startDate = $('#startDateBagis').val(); // Geçerli başlangıç tarihi
        var endDate = $('#endDateBagis').val(); // Geçerli bitiş tarihi
        loadBagislar(search, startDate, endDate, page); // Yeni sayfayı yükle
    });

    // Arama ve filtreleme için olay dinleyici
    $('#searchInputBagis, #startDateBagis, #endDateBagis').on('input', function () {
        var search = $('#searchInputBagis').val();
        var startDate = $('#startDateBagis').val();
        var endDate = $('#endDateBagis').val();
        loadBagislar(search, startDate, endDate, 1); // Filtre ile ilk sayfa yüklenir
    });

    // İlk yükleme
    loadBagislar();
});



/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    $(document).ready(function () {
    // Kategorileri yükleme
    function loadKategoriler() {
        $.ajax({
            url: '/****************************************/',
            type: 'GET',
            success: function (response) {
                if (response.success) {
                    $('#kategoriId').empty();
                    $('#kategoriId').append('<option value="0">Kategori Seçiniz</option>');
                    response.kategoriler.forEach(function (kategori) {
                        $('#kategoriId').append(`
                            <option value="${kategori.kategori_id}">${kategori.kategori_adi}</option>
                        `);
                    });
                } else {
                    alert("Kategoriler yüklenirken bir hata oluştu: " + response.message);
                }
            },
            error: function () {
                alert("Kategoriler yüklenirken bir hata oluştu.");
            }
        });
    }

    // Gider ekleme işlemi
    $('#addGiderBtn').click(function () {
        const kategoriId = $('#kategoriId').val();
        const giderMiktari = parseFloat($('#giderMiktari').val());

        if (kategoriId === "0" || !kategoriId) {
            alert("Lütfen bir kategori seçiniz.");
            return;
        }

        if (!giderMiktari || giderMiktari <= 0) {
            alert("Lütfen geçerli bir gider miktarı giriniz.");
            return;
        }

        $.ajax({
            url: '/**********************************/',
            type: 'POST',
            data: {
                kategoriId: kategoriId,
                giderMiktari: giderMiktari
            },
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    // Formu temizle
                    $('#giderForm')[0].reset();
                    location.reload();
                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert("Gider eklenirken bir hata oluştu.");
            }
        });
    });

    // Sayfa yüklendiğinde kategorileri getir
    loadKategoriler();
});


/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

$(document).ready(function () {
    var currentGeriBildirimPage = 1;

    function loadGeriBildirimler(search = "", startDate = "", endDate = "", page = 1) {
        currentGeriBildirimPage = page;
        $('#geriBildirimListesi').html('<tr><td colspan="5" class="text-center">Yükleniyor...</td></tr>');

        $.ajax({
            url: '/********************************************/',
            type: 'GET',
            data: { search: search, startDate: startDate, endDate: endDate, page: page, pageSize: 10 },
            success: function (response) {
                if (response.success) {
                    $('#geriBildirimListesi').empty();
                    if (response.geriBildirimler.length === 0) {
                        $('#geriBildirimListesi').append('<tr><td colspan="5" class="text-center">Hiç geri bildirim bulunamadı.</td></tr>');
                    } else {
                        response.geriBildirimler.forEach(function (geriBildirim) {
                            $('#geriBildirimListesi').append(`
                                <tr>
                                    <td>${geriBildirim.geribildirim_id}</td>
                                    <td>${geriBildirim.KullaniciAdi}</td>
                                    <td>${geriBildirim.GeriBildirimTuru}</td>
                                    <td>${geriBildirim.Mesaj}</td>
                                    <td>${geriBildirim.GeriBildirimTarihi}</td>
                                </tr>
                            `);
                        });
                    }

                    // Sayfalama
                    $('#paginationGeriBildirim').empty();

                    const totalPages = response.totalPages; // Toplam sayfa sayısı
                    const maxVisiblePages = 5; // Aynı anda gösterilecek sayfa sayısı
                    const currentPage = page; // Mevcut sayfa

                    // Başlangıç ve Bitiş Sayfa Hesaplama
                    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                    // Başlangıç noktalar (1 ve ...)
                    if (startPage > 1) {
                        $('#paginationGeriBildirim').append(`
        <li class="page-item">
            <a class="page-link" href="#" data-page="1">1</a>
        </li>
    `);
                        if (startPage > 2) {
                            $('#paginationGeriBildirim').append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
        `);
                        }
                    }

                    // Orta Sayfalar
                    for (let i = startPage; i <= endPage; i++) {
                        $('#paginationGeriBildirim').append(`
        <li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
    `);
                    }

                    // Bitiş noktalar (... ve son sayfa)
                    if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                            $('#paginationGeriBildirim').append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
        `);
                        }
                        $('#paginationGeriBildirim').append(`
        <li class="page-item">
            <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
        </li>
    `);
                    }

                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert("Geri bildirimler yüklenirken bir hata oluştu.");
            }
        });
    }

    // İlk yükleme
    loadGeriBildirimler();

    // Dinamik sayfa değişikliği için delegasyon
    $('#paginationGeriBildirim').on('click', 'a', function (e) {
        e.preventDefault();
        var page = $(this).data('page');
        var search = $('#searchInputGeriBildirim').val();
        var startDate = $('#startDateGeriBildirim').val();
        var endDate = $('#endDateGeriBildirim').val();
        loadGeriBildirimler(search, startDate, endDate, page);
    });

    // Arama ve filtreleme
    $('#searchInputGeriBildirim, #startDateGeriBildirim, #endDateGeriBildirim').on('input', function () {
        var search = $('#searchInputGeriBildirim').val();
        var startDate = $('#startDateGeriBildirim').val();
        var endDate = $('#endDateGeriBildirim').val();
        loadGeriBildirimler(search, startDate, endDate, 1);
    });
});

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    $(document).ready(function () {
        var currentYorumPage = 1;

        function loadYorumlar(search = "", startDate = "", endDate = "", page = 1) {
            currentYorumPage = page;
            $('#yorumListesi').html('<tr><td colspan="5" class="text-center">Yükleniyor...</td></tr>');

            $.ajax({
                url: '/*******************************************/',
                type: 'GET',
                data: { search: search, startDate: startDate, endDate: endDate, page: page, pageSize: 10 },
                success: function (response) {
                    if (response.success) {
                        $('#yorumListesi').empty();
                        if (response.yorumlar.length === 0) {
                            $('#yorumListesi').append('<tr><td colspan="5" class="text-center">Hiç yorum bulunamadı.</td></tr>');
                        } else {
                            response.yorumlar.forEach(function (yorum) {
                                $('#yorumListesi').append(`
                                    <tr>
                                        <td>${yorum.yorum_id}</td>
                                        <td>${yorum.KullaniciAdi}</td>
                                        <td>${yorum.ProjeAdi}</td>
                                        <td>${yorum.YorumMetni}</td>
                                        <td>${yorum.YorumTarihi}</td>
                                    </tr>
                                `);
                            });
                        }

                        // Sayfalama
                        $('#paginationYorum').empty();

                        const totalPages = response.totalPages; // Toplam sayfa sayısı
                        const maxVisiblePages = 5; // Aynı anda gösterilecek sayfa sayısı
                        const currentPage = page; // Mevcut sayfa

                        // Başlangıç ve Bitiş Sayfa Hesaplama
                        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                        // Başlangıç noktalar (1 ve ...)
                        if (startPage > 1) {
                            $('#paginationYorum').append(`
        <li class="page-item">
            <a class="page-link" href="#" data-page="1">1</a>
        </li>
    `);
                            if (startPage > 2) {
                                $('#paginationYorum').append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
        `);
                            }
                        }

                        // Orta Sayfalar
                        for (let i = startPage; i <= endPage; i++) {
                            $('#paginationYorum').append(`
        <li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
    `);
                        }

                        // Bitiş noktalar (... ve son sayfa)
                        if (endPage < totalPages) {
                            if (endPage < totalPages - 1) {
                                $('#paginationYorum').append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
        `);
                            }
                            $('#paginationYorum').append(`
        <li class="page-item">
            <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
        </li>
    `);
                        }

                    } else {
                        alert(response.message);
                    }
                },
                error: function () {
                    alert("Yorumlar yüklenirken bir hata oluştu.");
                }
            });
        }

        // İlk yükleme
        loadYorumlar();

        // Sayfalama olayını dinle
        $('#paginationYorum').on('click', '.page-link', function (e) {
            e.preventDefault();
            var page = $(this).data('page');
            var search = $('#searchInputYorum').val();
            var startDate = $('#startDateYorum').val();
            var endDate = $('#endDateYorum').val();
            loadYorumlar(search, startDate, endDate, page);
        });

        // Arama ve filtreleme
        $('#searchInputYorum, #startDateYorum, #endDateYorum').on('input', function () {
            var search = $('#searchInputYorum').val();
            var startDate = $('#startDateYorum').val();
            var endDate = $('#endDateYorum').val();
            loadYorumlar(search, startDate, endDate, 1);
        });
    });

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    $(document).ready(function () {
        var currentYoneticiPage = 1;

        // Yönetici Listesini Yükle
        function loadYoneticiListesi(search = "", page = 1) {
            currentYoneticiPage = page;
            $('#yoneticiListesiBody').html('<tr><td colspan="5" class="text-center">Yükleniyor...</td></tr>');

            $.ajax({
                url: '/********************************************/',
                type: 'GET',
                data: { search: search, page: page, pageSize: 10 },
                success: function (response) {
                    if (response.success) {
                        $('#yoneticiListesiBody').empty();
                        if (response.yoneticiler.length === 0) {
                            $('#yoneticiListesiBody').append('<tr><td colspan="5" class="text-center">Hiç yönetici bulunamadı.</td></tr>');
                        } else {
                            response.yoneticiler.forEach(function (yonetici) {
                                $('#yoneticiListesiBody').append(`
                                    <tr>
                                        <td>${yonetici.yonetici_id}</td>
                                        <td>${yonetici.yonetici_ad_soyad}</td>
                                        <td>${yonetici.yonetici_mail}</td>
                                        <td>${yonetici.yonetici_telefon}</td>
                                        <td>
                                            <button class="btn btn-warning btn-sm edit-yonetici" data-id="${yonetici.yonetici_id}">Düzenle</button>
                                            <button class="btn btn-danger btn-sm delete-yonetici" data-id="${yonetici.yonetici_id}">Sil</button>
                                        </td>
                                    </tr>
                                `);
                            });
                        }
                        // Sayfalama
                        $('#paginationYonetici').empty();

                        const totalPages = response.totalPages; // Toplam sayfa sayısı
                        const maxVisiblePages = 5; // Aynı anda gösterilecek sayfa sayısı
                        const currentPage = page; // Mevcut sayfa

                        // Başlangıç ve Bitiş Sayfa Hesaplama
                        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                        // Başlangıç noktalar (1 ve ...)
                        if (startPage > 1) {
                            $('#paginationYonetici').append(`
        <li class="page-item">
            <a class="page-link" href="#" onclick="loadYoneticiListesi('${search}', 1)">1</a>
        </li>
    `);
                            if (startPage > 2) {
                                $('#paginationYonetici').append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
        `);
                            }
                        }

                        // Orta Sayfalar
                        for (let i = startPage; i <= endPage; i++) {
                            $('#paginationYonetici').append(`
        <li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" onclick="loadYoneticiListesi('${search}', ${i})">${i}</a>
        </li>
    `);
                        }

                        // Bitiş noktalar (... ve son sayfa)
                        if (endPage < totalPages) {
                            if (endPage < totalPages - 1) {
                                $('#paginationYonetici').append(`
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
        `);
                            }
                            $('#paginationYonetici').append(`
        <li class="page-item">
            <a class="page-link" href="#" onclick="loadYoneticiListesi('${search}', ${totalPages})">${totalPages}</a>
        </li>
    `);
                        }

                    } else {
                        alert(response.message);
                    }
                },
                error: function () {
                    alert("Yöneticiler yüklenirken bir hata oluştu.");
                }
            });
        }

        // İlk Yükleme
        loadYoneticiListesi(currentYoneticiPage);

        // Arama kutusuna yazıldığında filtrele
        $('#searchInputYonetici').on('keyup', function () {
            var searchValue = $(this).val();
            loadYoneticiListesi(searchValue, 1);
        });

        // Yönetici Ekleme Butonu Tıklama
        $('#addYoneticiBtn').click(function () {
            // Modalı temizle
            $('#yoneticiForm')[0].reset();
            $('#yoneticiId').val('');
            $('#yoneticiModal .modal-title').text('Yeni Yönetici Ekle');
        });

        // Yönetici Kaydetme Butonu
        $('#saveYoneticiBtn').click(function () {
            var id = $('#yoneticiId').val();
            var adSoyad = $('#yoneticiAdSoyad').val();
            var email = $('#yoneticiMail').val();
            var telefon = $('#yoneticiTelefon').val();
            var sifre = $('#yoneticiSifre').val();

            // Form Validasyonu
            if (!adSoyad || !email || !telefon) {
                alert("Lütfen tüm zorunlu alanları doldurun.");
                return;
            }

            var url = id ? '/****************************************/' : '/*************************************/';
            var data = {
                id: id,
                yoneticiAdSoyad: adSoyad,
                yoneticiMail: email,
                yoneticiTelefon: telefon,
                yoneticiSifre: sifre
            };

            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                success: function (response) {
                    if (response.success) {
                        alert(response.message);
                        $('#yoneticiModal').modal('hide');
                        loadYoneticiListesi(currentYoneticiPage);
                    } else {
                        alert("İşlem sırasında bir hata oluştu: " + response.message);
                    }
                },
                error: function () {
                    alert("İşlem sırasında bir hata oluştu.");
                }
            });
        });

        // Yönetici Düzenleme Butonu
        $(document).on('click', '.edit-yonetici', function () {
            var id = $(this).data('id');

            $.ajax({
                url: '/********************************************/',
                type: 'GET',
                data: { id: id },
                success: function (response) {
                    if (response.success) {
                        $('#yoneticiId').val(response.data.yonetici_id);
                        $('#yoneticiAdSoyad').val(response.data.yonetici_ad_soyad);
                        $('#yoneticiMail').val(response.data.yonetici_mail);
                        $('#yoneticiTelefon').val(response.data.yonetici_telefon);
                        $('#yoneticiSifre').val(''); // Şifre alanını boş bırak
                        $('#yoneticiModal .modal-title').text('Yönetici Düzenle');
                        $('#yoneticiModal').modal('show');
                    } else {
                        alert("Yönetici bilgileri alınırken bir hata oluştu: " + response.message);
                    }
                },
                error: function () {
                    alert("Yönetici bilgileri alınırken bir hata oluştu.");
                }
            });
        });

        // Yönetici Silme Butonu
        $(document).on('click', '.delete-yonetici', function () {
            var id = $(this).data('id');
            if (confirm("Bu yöneticiyi silmek istediğinizden emin misiniz?")) {
                $.ajax({
                    url: '/****************************************/',
                    type: 'POST',
                    data: { id: id },
                    success: function (response) {
                        if (response.success) {
                            alert(response.message);
                            loadYoneticiListesi(currentYoneticiPage);
                        } else {
                            alert("Silme işlemi sırasında bir hata oluştu: " + response.message);
                        }
                    },
                    error: function () {
                        alert("Silme işlemi sırasında bir hata oluştu.");
                    }
                });
            }
        });

    });

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

// Grafik verilerini sunucudan çekme
$.ajax({
    url: '@Url.Action("GetBagisByKategori", "AdminHome")',
    type: 'GET',
    success: function (response) {
        var kategoriler = [];
        var bagisMiktarlari = [];
        var colors = []; // Renkleri tutacak dizi

        // Rastgele renk üreten fonksiyon
        function randomColor() {
            return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
        }

        // Verileri ayrıştırma ve renkleri oluşturma
        response.forEach(function (item) {
            kategoriler.push(item.KategoriAdi);
            bagisMiktarlari.push(item.ToplamBagis);
            colors.push(randomColor()); // Her kategori için rastgele renk oluştur
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
                    backgroundColor: colors, // Çubukların rastgele arka plan renkleri
                    borderColor: colors.map(color => color.replace('0.6', '1')), // Çubukların kenar renkleri
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

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

$(document).ready(function () {
    var currentPage = 1;

    // Kullanıcıları listeleme fonksiyonu
    function loadKullanicilar(search = "", page = 1) {
        currentPage = page; // Geçerli sayfayı güncelle
        $('#kullaniciListesi').html('<tr><td colspan="6" class="text-center">Yükleniyor...</td></tr>');

        $.ajax({
            url: '@Url.Action("GetPagedKullanicilar", "AdminHome")',
            type: 'GET',
            data: { search: search, page: page, pageSize: 10 }, // Search ve page gönderiliyor
            success: function (response) {
                $('#kullaniciListesi').empty(); // Liste temizleniyor
                if (response.kullanicilar.length === 0) {
                    $('#kullaniciListesi').append('<tr><td colspan="6" class="text-center">Hiç kullanıcı bulunamadı.</td></tr>');
                } else {
                    // Kullanıcıları döngü ile tabloya ekleme
                    response.kullanicilar.forEach(function (user) {
                        $('#kullaniciListesi').append(`
                            <tr>
                                <td>${user.kullanici_id}</td>
                                <td>${user.ad_soyad}</td>
                                <td>${user.e_mail}</td>
                                <td>${user.telefon}</td>
                                <td>${user.Rol}</td>
                                <td>
                                    <button class="btn btn-warning btn-sm edit-kullanici" data-id="${user.kullanici_id}">Düzenle</button>
                                    <button class="btn btn-danger btn-sm delete-kullanici" data-id="${user.kullanici_id}">Sil</button>
                                </td>
                            </tr>
                        `);
                    });
                }

                // Sayfalama
                $('#pagination').empty();
                for (let i = 1; i <= response.totalPages; i++) {
                    $('#pagination').append(`
                        <li class="page-item ${i === page ? 'active' : ''}">
                            <a class="page-link" href="#" data-page="${i}">${i}</a>
                        </li>
                    `);
                }
            },
            error: function () {
                alert("Kullanıcılar yüklenirken bir hata oluştu.");
            }
        });
    }

    // Kullanıcı düzenleme işlemi
   $(document).on('click', '.edit-kullanici', function () {
    var id = $(this).data('id');
    $.ajax({
        url: '@Url.Action("GetKullaniciDetayli", "AdminHome")',
        type: 'GET',
        data: { id: id },
        success: function (response) {
            if (response.success) {
                const kullanici = response.kullanici; // Gelen veriyi kullanici değişkenine al
                $('#editId').val(kullanici.kullanici_id);
                $('#editAdSoyad').val(kullanici.ad_soyad);
                $('#editEmail').val(kullanici.e_mail);
                $('#editTelefon').val(kullanici.telefon);
                $('#editKullaniciModal').modal('show'); // Modalı aç
            } else {
                alert("Kullanıcı bilgileri alınırken bir hata oluştu: " + response.message);
            }
        },
        error: function () {
            alert("Kullanıcı bilgileri alınamadı.");
        }
    });
});


    // Kullanıcı güncelleme kaydetme işlemi
    $('#saveEditBtn').click(function () {
        var id = $('#editId').val();
        var adSoyad = $('#editAdSoyad').val();
        var email = $('#editEmail').val();
        var telefon = $('#editTelefon').val();

        $.ajax({
            url: '@Url.Action("UpdateKullanici", "AdminHome")',
            type: 'POST',
            data: {
                id: id,
                adSoyad: adSoyad,
                email: email,
                telefon: telefon
            },
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    $('#editKullaniciModal').modal('hide'); // Modalı kapat
                    loadKullanicilar(); // Listeyi güncelle
                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert("Kullanıcı güncellenirken bir hata oluştu.");
            }
        });
    });

    // Kullanıcı silme işlemi
    $(document).on('click', '.delete-kullanici', function () {
        var id = $(this).data('id');
        if (confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
            $.ajax({
                url: '@Url.Action("DeleteKullanici", "AdminHome")',
                type: 'POST',
                data: { id: id },
                success: function (response) {
                    if (response.success) {
                        alert(response.message);
                        loadKullanicilar(); // Listeyi güncelle
                    } else {
                        alert("Silme işlemi sırasında bir hata oluştu: " + response.message);
                    }
                },
                error: function () {
                    alert("Kullanıcı silinirken bir hata oluştu.");
                }
            });
        }
    });

    // Sayfa tıklamalarını dinlemek için olay bağlama
    $('#pagination').on('click', '.page-link', function (e) {
        e.preventDefault(); // Varsayılan tıklama davranışını engelle
        var page = $(this).data('page'); // Tıklanan sayfanın numarası
        var searchValue = $('#searchInputKullanici').val(); // Arama değerini al
        loadKullanicilar(searchValue, page); // Yeni sayfa yüklenir
    });

    // Arama kutusuna yazıldığında filtreleme
    $('#searchInputKullanici').on('keyup', function () {
        var searchValue = $(this).val(); // Arama kutusundaki değeri al
        loadKullanicilar(searchValue, 1); // İlk sayfa ile yükleme yapılır
    });

    // İlk yükleme
    loadKullanicilar("", currentPage);
});




/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

$(document).ready(function () {
    var currentPage = 1;

    // Projeleri yükle
    loadProjeler();

    // Projeleri listeleme fonksiyonu
    function loadProjeler(search = "", page = 1) {
        $.ajax({
            url: '@Url.Action("GetProjeler", "AdminHome")',
            type: 'POST',
            data: { search: search, page: page, pageSize: 10 },
            success: function (response) {
                if (response.success) {
                    $('#projeListesi').empty();
                    if (response.projeler.length === 0) {
                        $('#projeListesi').append('<tr><td colspan="6" class="text-center">Hiç proje bulunamadı.</td></tr>');
                    } else {
                        response.projeler.forEach(function (proje) {
                            $('#projeListesi').append(`
                                <tr>
                                    <td>${proje.proje_id}</td>
                                    <td>${proje.proje_ad}</td>
                                    <td>${proje.proje_aciklamasi}</td>
                                    <td><img src="${proje.proje_resim_link}" alt="${proje.proje_ad}" style="width: 100px; height: auto;"></td>
                                    <td>${proje.Kategori}</td>
                                    <td>
                                        <button class="btn btn-warning btn-sm edit-proje" data-id="${proje.proje_id}">Düzenle</button>
                                        <button class="btn btn-danger btn-sm delete-proje" data-id="${proje.proje_id}">Sil</button>
                                    </td>
                                </tr>
                            `);
                        });
                    }

                    // Sayfalama
                    $('#paginationProje').empty();
                    for (let i = 1; i <= response.totalPages; i++) {
                        $('#paginationProje').append(`
                            <li class="page-item ${i === page ? 'active' : ''}">
                                <a class="page-link" href="#" data-page="${i}">${i}</a>
                            </li>
                        `);
                    }

                    // Sayfa numarasına tıklama olayı
                    $('#paginationProje .page-link').off('click').on('click', function (event) {
                        event.preventDefault();
                        var page = $(this).data('page');
                        loadProjeler(search, page);
                    });
                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert("Projeler yüklenirken bir hata oluştu.");
            }
        });
    }

    // Arama kutusuna yazıldığında projeleri filtrele
    $('#searchInputProje').on('keyup', function () {
        var searchValue = $(this).val(); // Arama kutusundaki değeri al
        loadProjeler(searchValue, 1); // İlk sayfayı yükle
    });

    // Proje düzenleme modalını doldur ve göster
    $(document).on('click', '.edit-proje', function () {
        var id = $(this).data('id');
        $.ajax({
            url: '@Url.Action("GetProjeDetayli", "AdminHome")',
            type: 'GET',
            data: { id: id },
            success: function (response) {
                if (response.success) {
                    $('#projeId').val(response.data.proje_id);
                    $('#projeAd').val(response.data.proje_ad);
                    $('#projeAciklamasi').val(response.data.proje_aciklamasi);
                    $('#projeResimLink').val(response.data.proje_resim_link);
                    $('#ProjekategoriId').val(response.data.kategori_id); // Kategori ID'sini seçili yap
                    $('#modalTitle').text('Proje Düzenle');
                    $('#projeModal').modal('show');
                } else {
                    alert("Proje detayları alınırken bir hata oluştu.");
                }
            },
            error: function () {
                alert("Proje bilgileri alınamadı.");
            }
        });
    });

    // Proje silme işlemi
    $(document).on('click', '.delete-proje', function () {
        var id = $(this).data('id');
        if (confirm("Bu projeyi silmek istediğinizden emin misiniz?")) {
            $.ajax({
                url: '@Url.Action("DeleteProje", "AdminHome")',
                type: 'POST',
                data: { id: id },
                success: function (response) {
                    if (response.success) {
                        alert("Proje başarıyla silindi.");
                        loadProjeler(); // Listeyi güncelle
                    } else {
                        alert("Silme işlemi sırasında bir hata oluştu: " + response.message);
                    }
                },
                error: function () {
                    alert("Proje silinirken bir hata oluştu.");
                }
            });
        }
    });

    // Proje ekleme ve güncelleme işlemi
    $('#saveProjeBtn').click(function () {
        var id = $('#projeId').val();
        var projeAd = $('#projeAd').val();
        var projeAciklamasi = $('#projeAciklamasi').val();
        var projeResimLink = $('#projeResimLink').val();
        var kategoriId = $('#ProjekategoriId').val();

        var url = id ? '@Url.Action("UpdateProje", "AdminHome")' : '@Url.Action("AddProje", "AdminHome")';
        var data = {
            id: id,
            projeAd: projeAd,
            projeAciklamasi: projeAciklamasi,
            projeResimLink: projeResimLink,
            kategoriId: kategoriId
        };

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    $('#projeModal').modal('hide'); // Modalı kapat
                    clearModalFields(); // Modal içindeki alanları temizle
                    loadProjeler(); // Listeyi güncelle
                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert("Proje kaydedilirken bir hata oluştu.");
            }
        });
    });

    // Modal içindeki form alanlarını temizlemek için bir fonksiyon
    function clearModalFields() {
        $('#projeId').val('');
        $('#projeAd').val('');
        $('#projeAciklamasi').val('');
        $('#projeResimLink').val('');
        $('#ProjekategoriId').val('0'); // Varsayılan kategori seçimi
    }

    // Kategorileri yükleme
    function loadKategoriler(selectedKategoriId = null) {
        $.ajax({
            url: '@Url.Action("GetKategoriler", "AdminHome")',
            type: 'GET',
            success: function (response) {
                if (response.success) {
                    $('#ProjekategoriId').empty();
                    $('#ProjekategoriId').append('<option value="0">Kategori Seçiniz</option>');
                    response.kategoriler.forEach(function (kategori) {
                        // Eğer mevcut kategori ID'si eşleşiyorsa, seçili yap
                        var selected = kategori.kategori_id == selectedKategoriId ? 'selected' : '';
                        $('#ProjekategoriId').append(`
                            <option value="${kategori.kategori_id}" ${selected}>${kategori.kategori_adi}</option>
                        `);
                    });
                } else {
                    alert("Kategoriler yüklenirken bir hata oluştu: " + response.message);
                }
            },
            error: function () {
                alert("Kategoriler yüklenirken bir hata oluştu.");
            }
        });
    }

    // Modal açıldığında kategorileri yükle
    $('#projeModal').on('show.bs.modal', function () {
        var selectedKategoriId = $('#ProjekategoriId').val(); // Eğer düzenleme yapılıyorsa, mevcut kategori ID'sini al
        loadKategoriler(selectedKategoriId);
    });
});



/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    // Global olarak loadLogs fonksiyonunu tanımlayın
    function loadLogs(search = "", startDate = "", endDate = "", page = 1) {
        currentPage = page;
        $('#logListesi').html('<tr><td colspan="4" class="text-center">Yükleniyor...</td></tr>');

        // Boş tarihleri null olarak ayarlayın
        var data = {
            search: search,
            page: page,
            pageSize: 15
        };

        if (startDate) data.startDate = startDate;
        if (endDate) data.endDate = endDate;

        $.ajax({
            url: '@Url.Action("GetLogs", "AdminHome")',
            type: 'GET',
            data: data,
            success: function (response) {
                if (response.success) {
                    $('#logListesi').empty();
                    if (response.logs.length === 0) {
                        $('#logListesi').append('<tr><td colspan="4" class="text-center">Hiç log bulunamadı.</td></tr>');
                    } else {
                        response.logs.forEach(function (log) {
                            const readableDate = new Date(log.IslemTarihi).toLocaleString('tr-TR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            });

                            $('#logListesi').append(`
                                <tr>
                                    <td>${log.log_id}</td>
                                    <td>${log.KullaniciAdi}</td>
                                    <td>${log.IslemTuru}</td>
                                    <td>${readableDate}</td>
                                </tr>
                            `);
                        });
                    }

                    // Sayfalama
                    $('#paginationLog').empty();

                    let maxVisiblePages = 5; // Görünecek maksimum sayfa numarası
                    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
                    let endPage = Math.min(response.totalPages, startPage + maxVisiblePages - 1);

                    // Sayfalar arasını sınırlandır
                    if (startPage > 1) {
                        $('#paginationLog').append(`
        <li class="page-item">
            <a class="page-link" href="#" onclick="loadLogs('${search}', '${startDate}', '${endDate}', 1)">1</a>
        </li>
        ${startPage > 2 ? '<li class="page-item"><span class="page-link">...</span></li>' : ''}
    `);
                    }

                    for (let i = startPage; i <= endPage; i++) {
                        $('#paginationLog').append(`
        <li class="page-item ${i === page ? 'active' : ''}">
            <a class="page-link" href="#" onclick="loadLogs('${search}', '${startDate}', '${endDate}', ${i})">${i}</a>
        </li>
    `);
                    }

                    // Son sayfalar arasında boşluk varsa ekle
                    if (endPage < response.totalPages) {
                        $('#paginationLog').append(`
        ${endPage < response.totalPages - 1 ? '<li class="page-item"><span class="page-link">...</span></li>' : ''}
        <li class="page-item">
            <a class="page-link" href="#" onclick="loadLogs('${search}', '${startDate}', '${endDate}', ${response.totalPages})">${response.totalPages}</a>
        </li>
    `);
                    }

                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert("Loglar yüklenirken bir hata oluştu.");
            }
        });
    }

    $(document).ready(function () {
        // İlk yükleme
        loadLogs();

        // Arama ve filtreleme
        $('#searchLogInput, #startDate, #endDate').on('input change', function () {
            var search = $('#searchLogInput').val();
            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();
            loadLogs(search, startDate, endDate, 1);
        });
    });

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

  $(document).ready(function () {
    var currentBagisPage = 1;

    function loadBagislar(search = "", startDate = "", endDate = "", page = 1) {
        currentBagisPage = page; // Sayfa bilgisini güncelle
        $('#bagisListesiBody').html('<tr><td colspan="6" class="text-center">Yükleniyor...</td></tr>');

        $.ajax({
            url: '@Url.Action("GetBagislar", "AdminHome")',
            type: 'GET',
            data: { search: search, startDate: startDate, endDate: endDate, page: page, pageSize: 10 },
            success: function (response) {
                if (response.success) {
                    $('#bagisListesiBody').empty(); // Mevcut liste temizleniyor

                    if (response.bagislar.length === 0) {
                        $('#bagisListesiBody').append('<tr><td colspan="6" class="text-center">Hiç bağış bulunamadı.</td></tr>');
                    } else {
                        // Gelen bağış verilerini tabloya ekleme
                        response.bagislar.forEach(function (bagis) {
                            $('#bagisListesiBody').append(`
                                <tr>
                                    <td>${bagis.bagis_id}</td>
                                    <td>${bagis.KullaniciAdi}</td>
                                    <td>${bagis.ProjeAdi}</td>
                                    <td>${bagis.OdemeYontemi}</td>
                                    <td>${bagis.bagis_miktari.toFixed(2)}</td>
                                    <td>${bagis.BagisTarihi}</td>
                                </tr>
                            `);
                        });
                    }

                    // Sayfalama işlemi
                    $('#paginationBagis').empty();
                    for (let i = 1; i <= response.totalPages; i++) {
                        $('#paginationBagis').append(`
                            <li class="page-item ${i === page ? 'active' : ''}">
                                <a class="page-link" href="#" data-page="${i}">${i}</a>
                            </li>
                        `);
                    }
                } else {
                    alert(response.message); // Hata mesajı
                }
            },
            error: function () {
                alert("Bağışlar yüklenirken bir hata oluştu."); // Hata durumunda uyarı
            }
        });
    }

    // Sayfa geçişlerini dinlemek için olay bağlama
    $('#paginationBagis').on('click', '.page-link', function (e) {
        e.preventDefault(); // Varsayılan link davranışını engelle
        var page = $(this).data('page'); // Tıklanan sayfanın numarasını al
        var search = $('#searchInputBagis').val(); // Geçerli arama değerini al
        var startDate = $('#startDateBagis').val(); // Geçerli başlangıç tarihi
        var endDate = $('#endDateBagis').val(); // Geçerli bitiş tarihi
        loadBagislar(search, startDate, endDate, page); // Yeni sayfayı yükle
    });

    // Arama ve filtreleme için olay dinleyici
    $('#searchInputBagis, #startDateBagis, #endDateBagis').on('input', function () {
        var search = $('#searchInputBagis').val();
        var startDate = $('#startDateBagis').val();
        var endDate = $('#endDateBagis').val();
        loadBagislar(search, startDate, endDate, 1); // Filtre ile ilk sayfa yüklenir
    });

    // İlk yükleme
    loadBagislar();
});



/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    $(document).ready(function () {
    // Kategorileri yükleme
    function loadKategoriler() {
        $.ajax({
            url: '@Url.Action("GetKategoriler", "AdminHome")',
            type: 'GET',
            success: function (response) {
                if (response.success) {
                    $('#kategoriId').empty();
                    $('#kategoriId').append('<option value="0">Kategori Seçiniz</option>');
                    response.kategoriler.forEach(function (kategori) {
                        $('#kategoriId').append(`
                            <option value="${kategori.kategori_id}">${kategori.kategori_adi}</option>
                        `);
                    });
                } else {
                    alert("Kategoriler yüklenirken bir hata oluştu: " + response.message);
                }
            },
            error: function () {
                alert("Kategoriler yüklenirken bir hata oluştu.");
            }
        });
    }

    // Gider ekleme işlemi
    $('#addGiderBtn').click(function () {
        const kategoriId = $('#kategoriId').val();
        const giderMiktari = parseFloat($('#giderMiktari').val());

        if (kategoriId === "0" || !kategoriId) {
            alert("Lütfen bir kategori seçiniz.");
            return;
        }

        if (!giderMiktari || giderMiktari <= 0) {
            alert("Lütfen geçerli bir gider miktarı giriniz.");
            return;
        }

        $.ajax({
            url: '@Url.Action("AddGider", "AdminHome")',
            type: 'POST',
            data: {
                kategoriId: kategoriId,
                giderMiktari: giderMiktari
            },
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    // Formu temizle
                    $('#giderForm')[0].reset();
                    location.reload();
                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert("Gider eklenirken bir hata oluştu.");
            }
        });
    });

    // Sayfa yüklendiğinde kategorileri getir
    loadKategoriler();
});


/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

$(document).ready(function () {
    var currentGeriBildirimPage = 1;

    function loadGeriBildirimler(search = "", startDate = "", endDate = "", page = 1) {
        currentGeriBildirimPage = page;
        $('#geriBildirimListesi').html('<tr><td colspan="5" class="text-center">Yükleniyor...</td></tr>');

        $.ajax({
            url: '@Url.Action("GetGeriBildirimler", "AdminHome")',
            type: 'GET',
            data: { search: search, startDate: startDate, endDate: endDate, page: page, pageSize: 10 },
            success: function (response) {
                if (response.success) {
                    $('#geriBildirimListesi').empty();
                    if (response.geriBildirimler.length === 0) {
                        $('#geriBildirimListesi').append('<tr><td colspan="5" class="text-center">Hiç geri bildirim bulunamadı.</td></tr>');
                    } else {
                        response.geriBildirimler.forEach(function (geriBildirim) {
                            $('#geriBildirimListesi').append(`
                                <tr>
                                    <td>${geriBildirim.geribildirim_id}</td>
                                    <td>${geriBildirim.KullaniciAdi}</td>
                                    <td>${geriBildirim.GeriBildirimTuru}</td>
                                    <td>${geriBildirim.Mesaj}</td>
                                    <td>${geriBildirim.GeriBildirimTarihi}</td>
                                </tr>
                            `);
                        });
                    }

                    // Sayfalama
                    $('#paginationGeriBildirim').empty();
                    for (let i = 1; i <= response.totalPages; i++) {
                        $('#paginationGeriBildirim').append(`
                            <li class="page-item ${i === page ? 'active' : ''}">
                                <a class="page-link" href="#" data-page="${i}">${i}</a>
                            </li>
                        `);
                    }
                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert("Geri bildirimler yüklenirken bir hata oluştu.");
            }
        });
    }

    // İlk yükleme
    loadGeriBildirimler();

    // Dinamik sayfa değişikliği için delegasyon
    $('#paginationGeriBildirim').on('click', 'a', function (e) {
        e.preventDefault();
        var page = $(this).data('page');
        var search = $('#searchInputGeriBildirim').val();
        var startDate = $('#startDateGeriBildirim').val();
        var endDate = $('#endDateGeriBildirim').val();
        loadGeriBildirimler(search, startDate, endDate, page);
    });

    // Arama ve filtreleme
    $('#searchInputGeriBildirim, #startDateGeriBildirim, #endDateGeriBildirim').on('input', function () {
        var search = $('#searchInputGeriBildirim').val();
        var startDate = $('#startDateGeriBildirim').val();
        var endDate = $('#endDateGeriBildirim').val();
        loadGeriBildirimler(search, startDate, endDate, 1);
    });
});

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    $(document).ready(function () {
        var currentYorumPage = 1;

        function loadYorumlar(search = "", startDate = "", endDate = "", page = 1) {
            currentYorumPage = page;
            $('#yorumListesi').html('<tr><td colspan="5" class="text-center">Yükleniyor...</td></tr>');

            $.ajax({
                url: '@Url.Action("GetProjeYorumlari", "AdminHome")',
                type: 'GET',
                data: { search: search, startDate: startDate, endDate: endDate, page: page, pageSize: 10 },
                success: function (response) {
                    if (response.success) {
                        $('#yorumListesi').empty();
                        if (response.yorumlar.length === 0) {
                            $('#yorumListesi').append('<tr><td colspan="5" class="text-center">Hiç yorum bulunamadı.</td></tr>');
                        } else {
                            response.yorumlar.forEach(function (yorum) {
                                $('#yorumListesi').append(`
                                    <tr>
                                        <td>${yorum.yorum_id}</td>
                                        <td>${yorum.KullaniciAdi}</td>
                                        <td>${yorum.ProjeAdi}</td>
                                        <td>${yorum.YorumMetni}</td>
                                        <td>${yorum.YorumTarihi}</td>
                                    </tr>
                                `);
                            });
                        }

                        // Sayfalama
                        $('#paginationYorum').empty();
                        for (let i = 1; i <= response.totalPages; i++) {
                            $('#paginationYorum').append(`
                                <li class="page-item ${i === page ? 'active' : ''}">
                                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                                </li>
                            `);
                        }
                    } else {
                        alert(response.message);
                    }
                },
                error: function () {
                    alert("Yorumlar yüklenirken bir hata oluştu.");
                }
            });
        }

        // İlk yükleme
        loadYorumlar();

        // Sayfalama olayını dinle
        $('#paginationYorum').on('click', '.page-link', function (e) {
            e.preventDefault();
            var page = $(this).data('page');
            var search = $('#searchInputYorum').val();
            var startDate = $('#startDateYorum').val();
            var endDate = $('#endDateYorum').val();
            loadYorumlar(search, startDate, endDate, page);
        });

        // Arama ve filtreleme
        $('#searchInputYorum, #startDateYorum, #endDateYorum').on('input', function () {
            var search = $('#searchInputYorum').val();
            var startDate = $('#startDateYorum').val();
            var endDate = $('#endDateYorum').val();
            loadYorumlar(search, startDate, endDate, 1);
        });
    });

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    $(document).ready(function () {
        var currentYoneticiPage = 1;

        // Yönetici Listesini Yükle
        function loadYoneticiListesi(search = "", page = 1) {
            currentYoneticiPage = page;
            $('#yoneticiListesiBody').html('<tr><td colspan="5" class="text-center">Yükleniyor...</td></tr>');

            $.ajax({
                url: '@Url.Action("GetYoneticiListesi", "AdminHome")',
                type: 'GET',
                data: { search: search, page: page, pageSize: 10 },
                success: function (response) {
                    if (response.success) {
                        $('#yoneticiListesiBody').empty();
                        if (response.yoneticiler.length === 0) {
                            $('#yoneticiListesiBody').append('<tr><td colspan="5" class="text-center">Hiç yönetici bulunamadı.</td></tr>');
                        } else {
                            response.yoneticiler.forEach(function (yonetici) {
                                $('#yoneticiListesiBody').append(`
                                    <tr>
                                        <td>${yonetici.yonetici_id}</td>
                                        <td>${yonetici.yonetici_ad_soyad}</td>
                                        <td>${yonetici.yonetici_mail}</td>
                                        <td>${yonetici.yonetici_telefon}</td>
                                        <td>
                                            <button class="btn btn-warning btn-sm edit-yonetici" data-id="${yonetici.yonetici_id}">Düzenle</button>
                                            <button class="btn btn-danger btn-sm delete-yonetici" data-id="${yonetici.yonetici_id}">Sil</button>
                                        </td>
                                    </tr>
                                `);
                            });
                        }

                        // Sayfalama
                        $('#paginationYonetici').empty();
                        for (let i = 1; i <= response.totalPages; i++) {
                            $('#paginationYonetici').append(`
                                <li class="page-item ${i === page ? 'active' : ''}">
                                    <a class="page-link" href="#" onclick="loadYoneticiListesi('${search}', ${i})">${i}</a>
                                </li>
                            `);
                        }
                    } else {
                        alert(response.message);
                    }
                },
                error: function () {
                    alert("Yöneticiler yüklenirken bir hata oluştu.");
                }
            });
        }

        // İlk Yükleme
        loadYoneticiListesi(currentYoneticiPage);

        // Arama kutusuna yazıldığında filtrele
        $('#searchInputYonetici').on('keyup', function () {
            var searchValue = $(this).val();
            loadYoneticiListesi(searchValue, 1);
        });

        // Yönetici Ekleme Butonu Tıklama
        $('#addYoneticiBtn').click(function () {
            // Modalı temizle
            $('#yoneticiForm')[0].reset();
            $('#yoneticiId').val('');
            $('#yoneticiModal .modal-title').text('Yeni Yönetici Ekle');
        });

        // Yönetici Kaydetme Butonu
        $('#saveYoneticiBtn').click(function () {
            var id = $('#yoneticiId').val();
            var adSoyad = $('#yoneticiAdSoyad').val();
            var email = $('#yoneticiMail').val();
            var telefon = $('#yoneticiTelefon').val();
            var sifre = $('#yoneticiSifre').val();

            // Form Validasyonu
            if (!adSoyad || !email || !telefon) {
                alert("Lütfen tüm zorunlu alanları doldurun.");
                return;
            }

            var url = id ? '@Url.Action("UpdateYonetici", "AdminHome")' : '@Url.Action("AddYonetici", "AdminHome")';
            var data = {
                id: id,
                yoneticiAdSoyad: adSoyad,
                yoneticiMail: email,
                yoneticiTelefon: telefon,
                yoneticiSifre: sifre
            };

            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                success: function (response) {
                    if (response.success) {
                        alert(response.message);
                        $('#yoneticiModal').modal('hide');
                        loadYoneticiListesi(currentYoneticiPage);
                    } else {
                        alert("İşlem sırasında bir hata oluştu: " + response.message);
                    }
                },
                error: function () {
                    alert("İşlem sırasında bir hata oluştu.");
                }
            });
        });

        // Yönetici Düzenleme Butonu
        $(document).on('click', '.edit-yonetici', function () {
            var id = $(this).data('id');

            $.ajax({
                url: '@Url.Action("GetYoneticiDetayli", "AdminHome")',
                type: 'GET',
                data: { id: id },
                success: function (response) {
                    if (response.success) {
                        $('#yoneticiId').val(response.data.yonetici_id);
                        $('#yoneticiAdSoyad').val(response.data.yonetici_ad_soyad);
                        $('#yoneticiMail').val(response.data.yonetici_mail);
                        $('#yoneticiTelefon').val(response.data.yonetici_telefon);
                        $('#yoneticiSifre').val(''); // Şifre alanını boş bırak
                        $('#yoneticiModal .modal-title').text('Yönetici Düzenle');
                        $('#yoneticiModal').modal('show');
                    } else {
                        alert("Yönetici bilgileri alınırken bir hata oluştu: " + response.message);
                    }
                },
                error: function () {
                    alert("Yönetici bilgileri alınırken bir hata oluştu.");
                }
            });
        });

        // Yönetici Silme Butonu
        $(document).on('click', '.delete-yonetici', function () {
            var id = $(this).data('id');
            if (confirm("Bu yöneticiyi silmek istediğinizden emin misiniz?")) {
                $.ajax({
                    url: '@Url.Action("DeleteYonetici", "AdminHome")',
                    type: 'POST',
                    data: { id: id },
                    success: function (response) {
                        if (response.success) {
                            alert(response.message);
                            loadYoneticiListesi(currentYoneticiPage);
                        } else {
                            alert("Silme işlemi sırasında bir hata oluştu: " + response.message);
                        }
                    },
                    error: function () {
                        alert("Silme işlemi sırasında bir hata oluştu.");
                    }
                });
            }
        });

    });

/* END EXTERNAL SOURCE */
