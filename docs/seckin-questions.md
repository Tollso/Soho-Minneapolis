# Soho Lounge Web Sitesi: Seçkin'e Sorular

**Tarih:** 5 Kasım 2026

Soho Lounge web sitesini TableHere'e bağlamaya başlıyoruz. Sitede yapılan rezervasyonlar TableHere'e düşecek. Misafir kat planında masasını kendisi seçecek ve bu seçim de TableHere'e gidecek.

**Şimdiye kadar kararlaştırılanlar:**
- Rezervasyon ekranları sitenin kendi tasarımında olacak. Arka planda TableHere'e bağlanacak.
- Mekân ya da masa doluysa rezervasyon kabul edilmeyecek. Aynı masaya iki rezervasyon asla olmayacak.
- Dolu masalar haritada gri görünecek. Her masada masa numarası, kişi sayısı ve minimum harcama yazacak.
- Kat planındaki masa yerleri TableHere'den gelecek, ama Soho'nun kendi stilinde (altın/neon) çizilecek.
- TableHere'e ulaşılamazsa misafire "biraz sonra tekrar deneyin ya da bizi arayın" mesajı gösterilecek.
- Google AI Studio'da yapılan **bütün özellikler kalacak**.
- Sitedeki fiyatlar ve menü şimdilik test amaçlı. Gerçekleri en sonda menüyle birlikte belirlenecek.
- Site sadece İngilizce olacak.

Aşağıdaki soruların cevabını en iyi sen bilirsin. Her sorunun altındaki **Cevap:** kısmını doldurman yeterli. Emin olmadığın soruyu boş bırakabilirsin, sonra konuşuruz. Köşeli parantezdeki numaralar (ör. [9]) bizim proje notlarımızdaki numaralardır.

---

## 1. Kapıda ve TableHere'de çalışma

**1.1 [9]** Soho çalışanları kapıda TableHere'in Host Station ekranını kullanacak mı? Yani rezervasyon onaylama, misafiri oturtma ve giriş kontrolü orada mı yapılacak? Kimler kullanacak (kapı görevlisi, host, müdür)?

**Cevap:**

**1.2 [12]** Sitedeki bir rezervasyon gelince ne olsun?
- **(a) Beklemede:** Rezervasyon "talep" olarak gelir. Bir çalışan TableHere'de onaylayınca misafire onay gider. Sitedeki şu anki sistem de böyle çalışıyor.
- **(b) Direkt onaylı:** Masa boşsa rezervasyon anında onaylanır.

**Cevap:**

**1.3 [15]** Rezervasyonların tek kaydı TableHere'de olacak. Şu an sitenin kendi sunucusunda ayrı bir rezervasyon listesi var. İki ayrı kayıt zamanla birbirini tutmaz hale gelir, o yüzden sitenin kendi listesi kaldırılacak. Bu senin için uygun mu?

**Cevap:**

**1.4 [33]** Sitenin yönetim paneli (admin hub) kalıyor. Ama rezervasyonlar artık TableHere'de olacağı için paneldeki "Reservations" sekmesi ne yapsın?
- **(a)** TableHere'deki rezervasyonları sadece göstersin. Onay/ret TableHere Host Station'da yapılsın. *(Bizim önerimiz: en basit yol, onay tek yerden yapılır.)*
- **(b)** Panelden de onay/ret yapılabilsin. Bunun için TableHere tarafına ek geliştirme gerekir.
- **(c)** Sadece TableHere'e link versin.

**Cevap:**

---

## 2. Masa seçimi ve kat planı

**2.1 [17]** Misafir neyi seçsin?
- **(a)** Tam olarak bir masayı (ör. "A-102").
- **(b)** Sadece bölümü (ör. "VIP sol taraf"). Masayı ekip ya da TableHere belirlesin.

Ayrıca kalabalık bir grup birden fazla masa ayırtabilsin mi?

**Cevap:**

**2.2 [19]** Kat planı her gece aynı mı? Yoksa etkinlik gecelerinde farklı düzen, kapalı bölümler ya da ekstra masalar oluyor mu?

**Cevap:**

**2.3 [22]** Masa ya da bölüm başına en az ve en fazla kaç kişi olabilir? Minimum harcama masaya göre mi, bölüme göre mi, geceye göre mi değişiyor? (TableHere'de şu an minimum harcama alanı yok, eklenmesi gerekecek.)

**Cevap:**

---

## 3. Şişe siparişi, ödeme ve onay mesajları

**3.1 [23]** Misafir rezervasyon sırasında şişe seçiyor. Bu bilgi nereye gitsin?
- **(a)** TableHere'deki rezervasyonun notuna.
- **(b)** POS sistemine (NewGate POS).
- **(c)** Sadece ekibe e-posta olarak.

**Cevap:**

**3.2 [24]** Masayı garantilemek için ön ödeme (depozito) ya da kart provizyonu alınsın mı? Alınacaksa hangi ödeme sistemi (Fiserv, Stripe vb.)? Aynı soru VIP kart ücretleri için de geçerli: şu an sitede ödeme gerçekten alınmıyor, sadece "ödendi" görünüyor.

**Cevap:**

**3.3 [25]** Misafire rezervasyon onayını kim göndersin?
- **(a)** TableHere (SMS ve/veya e-posta)
- **(b)** Soho sitesi (e-posta)

Misafirin e-postası TableHere'de de kayıtlı olsun mu?

**Cevap:**

**3.4 [26]** Misafir rezervasyonunu siteden iptal edebilsin ya da değiştirebilsin mi? Edebilecekse, kendisine verilen bir onay koduyla mı?

**Cevap:**

---

## 4. VIP kartlar ve misafir bilgileri

**4.1 [27]** VIP üyeler TableHere'deki müşteri profiline mi bağlansın, yoksa sadece Soho sitesinde mi tutulsun? VIP kartı olanlar rezervasyonda öncelik ya da ayrıcalık alsın mı (ör. dolu gecede yer ayrılması)?

**Cevap:**

**4.2 [28]** Etkinlik guestlist kayıtları ve iletişim formundan gelen mesajlar nereye gitsin (e-posta, panel, ikisi birden)?

**Cevap:**

**4.3 [34]** VIP başvuruları, guestlist kayıtları ve iletişim mesajları TableHere'e ait veriler değil. Bunlar için sitenin kendi veritabanı olacak (şu an sunucu yeniden başlayınca hepsi siliniyor). Bu uygun mu?

**Cevap:**

**4.4 [37]** Misafirler nasıl rezervasyon yapsın?
- **(a)** Hesap açmadan: her seferinde isim, telefon ve e-posta girerek.
- **(b)** TableHere misafir hesabıyla giriş yaparak (geçmiş rezervasyonlarını görür).

**Cevap:**

---

## 5. Yaş sınırı

**5.1 [36]** Yaş sınırı 21+ mı? Sitede yaş doğrulama ekranı olsun mu? Gruptaki herkesin 21 yaş üstü olması ve kapıda kimlik göstermesi gerekiyor mu?

**Cevap:**

---