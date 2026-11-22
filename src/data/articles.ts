import type { Article, CategoryId, DiscountPackage } from '../types/blog';

export const SAM_CORP_CONTACTS = {
  telegramHandle: '@SAMcorpManagerBot',
  telegramUrl: 'https://t.me/SAMcorpManagerBot',
  websiteDisplay: 'www.cloudbot.uz',
  websiteUrl: 'https://www.cloudbot.uz',
  phoneDisplay: '+998 77 499 71 55',
  phoneHref: 'tel:+998774997155',
};

export const BLOG_CATEGORIES: CategoryId[] = [
  'Barchasi',
  'Yangiliklar',
  'Telegram Botlar',
  'CRM Tizimlari',
  'Keyslar',
  'Qo‘llanmalar',
];

export const DISCOUNT_PACKAGES: DiscountPackage[] = [
  {
    id: 'telegram-bot',
    name: 'Telegram Bot (Savdo va Muloqot)',
    categoryLabel: 'Telegram Botlar',
    summary:
      'Katalog, tezkor buyurtma qabul qilish, Click/Payme to‘lov integratsiyasi va 24/7 mijozlar bilan muloqot.',
    basePriceUzs: 6000000,
    deliveryDays: '7–10 ish kuni',
    features: [
      'Avtomatik mahsulot katalogi va savatcha',
      'Click, Payme va Uzum to‘lov tizimlari integratsiyasi',
      'Mijozlarga buyurtma holati haqida avtomatik xabarnoma',
      'Operatorga ulash va tezkor admin boshqaruv paneli',
    ],
  },
  {
    id: 'crm-system',
    name: 'CRM Tizimi (Mijozlar va Hisobotlar)',
    categoryLabel: 'CRM Tizimlari',
    summary:
      'Barcha lidlarni yagona bazada jamlash, savdo voronkasi nazorati va rahbarlar uchun real-vaqt hisobotlari.',
    basePriceUzs: 8000000,
    deliveryDays: '10–14 ish kuni',
    features: [
      'Telegram, Instagram va saytdan tushgan lidlarni yagona voronkaga yig‘ish',
      'Har bir menejer bo‘yicha KPI va qo‘ng‘iroqlar/yozishmalar tarixi',
      'Avtomatik kunlik, haftalik va oylik moliyaviy hisobotlar',
      'Qayta sotuv va mijoz sodiqligini oshiruvchi eslatmalar tizimi',
    ],
  },
  {
    id: 'bundle',
    name: 'Kompleks: Telegram Bot + CRM Integratsiyasi',
    categoryLabel: 'Yangiliklar',
    summary:
      'Savdo boti va to‘liq CRM tizimining yagona ekotizimda uzluksiz ishlashi — maksimal samaradorlik uchun.',
    basePriceUzs: 12000000,
    deliveryDays: '14–18 ish kuni',
    features: [
      'Telegram botdagi har bir buyurtma to‘g‘ridan-to‘g‘ri CRM voronkasiga tushadi',
      'Mijoz xarid tarixi va bonus tizimini real-vaqt rejimida sinxronlash',
      'Ombor qoldig‘i va kuryerlik yetkazib berish statuslarini boshqarish',
      'Jamoani o‘qitish va ishga tushirilgandan keyingi texnik hamrohlik',
    ],
  },
];

export const HERO_FEATURED_IMAGE = '/src/assets/images/samcorp_hero_editorial_1795355645704.jpg';
export const POSTER_ARTWORK_IMAGE = '/src/assets/images/samcorp_poster_visual_1795355645939.jpg';

export const ARTICLES: Article[] = [
  {
    id: 'samcorp-ekotizim-maqola',
    slug: 'sam-corp-biznesni-avtomatlashtirish-ekotizimi',
    category: 'Yangiliklar',
    title: 'Biznesni Avtomatlashtirish Ekotizimi: Telegram Botlar va CRM Qanday Birgalikda Ishlaydi?',
    subtitle:
      'SAM CORP muhandislik yondashuvi: mijozlar bilan birinchi aloqadan tortib yakuniy moliyaviy hisobotgacha yagona raqamli zanjir.',
    excerpt:
      'Zamonaviy biznesda muloqot tezligi va tizimli nazorat hal qiluvchi ahamiyatga ega. Telegram botlar va CRM tizimlarini birlashtirish orqali kompaniyangizni qanday yangi bosqichga olib chiqish mumkin?',
    publishedAt: '22 Noyabr, 2026',
    readTimeMinutes: 5,
    author: {
      name: 'Ismoilov Shohjahon',
      role: 'SAM CORP Tizim Arxitektori',
    },
    image: HERO_FEATURED_IMAGE,
    imageAlt: 'SAM CORP biznes avtomatlashtirish ekotizimi illyustratsiyasi',
    featured: true,
    keyTakeaways: [
      'SAM CORP rasmiy blogida biznes avtomatlashtirish, texnik arxitektura va amaliy keyslar muntazam yoritib boriladi.',
      'Telegram bot mijoz bilan tezkor aloqa va buyurtma qabul qilish vazifasini bajaradi, CRM esa barcha ma’lumotlarni tizimli boshqaradi.',
      'Joriy mavsumda barcha yangi mijozlar uchun Telegram bot va CRM xizmatlariga 50% maxsus chegirma amal qilmoqda.',
    ],
    metrics: [
      {
        label: 'Ishga tushirish muddati',
        value: '7–14 kun',
        context: 'Loyiha murakkabligiga qarab',
      },
      {
        label: 'Uzluksiz ishlash',
        value: '24/7',
        context: 'Avtomatik savdo va qo‘llab-quvvatlash',
      },
      {
        label: 'Joriy aksiya',
        value: '50%',
        context: 'Yangi bot va CRM loyihalari uchun chegirma',
      },
    ],
    sections: [
      {
        heading: 'Nima uchun alohida vositalar emas, yagona ekotizim kerak?',
        paragraphs: [
          'Ko‘plab kompaniyalar dastlab alohida Telegram bot yasattiradi, keyin esa mijozlar ro‘yxatini Excel yoki alohida dasturda yuritishga urinadi. Natijada ma’lumotlar ikki joyda qolib ketadi va xodimlar vaqtini nusxa ko‘chirishga sarflaydi.',
          'SAM CORP yondashuvida Telegram bot va CRM tizimi bitta organizm kabi ishlaydi: mijoz botda tugmani bosishi bilan CRM tizimida uning profili, buyurtma tarixi va to‘lov holati avtomatik yangilanadi.',
        ],
        pullQuote:
          'Haqiqiy avtomatlashtirish — bu xodimlarni ortiqcha qo‘l mehnatidan ozod qilib, biznes egasiga shaffof raqamlar berishdir.',
      },
      {
        heading: 'SAM CORP blogida nimalarni o‘qiysiz?',
        paragraphs: [
          'Ushbu rasmiy blog sahifasida biz faqat mahsulot yangiliklarini emas, balki O‘zbekiston bozoridagi real tajribalarni ham bo‘lishamiz.',
        ],
        bulletPoints: [
          'Telegram botlar arxitekturasi, Click/Payme integratsiyalari va savdo voronkalari.',
          'CRM tizimlarini noldan joriy etish va jamoani o‘qitish bo‘yicha amaliy qo‘llanmalar.',
          'Hamkor kompaniyalarda erishilgan aniq raqamli natijalar va keyslar.',
          'Maxsus takliflar va mavsumiy aksiyalar haqida rasmiy e’lonlar.',
        ],
      },
    ],
    claimSteps: [
      {
        step: '01',
        title: 'Murojaat yuboring',
        description:
          'Telegramda @SAMcorpManagerBot ga yozing yoki www.cloudbot.uz saytida so‘rov qoldiring.',
      },
      {
        step: '02',
        title: 'Bepul texnik audit',
        description:
          'Muhandislarimiz savdo va muloqot jarayoningizni tahlil qilib, eng samarali yechimni taklif etadi.',
      },
      {
        step: '03',
        title: 'Tezkor joriy etish',
        description:
          '7–14 kun ichida tayyor tizim ishga tushiriladi va jamoangizga to‘liq o‘rgatiladi.',
      },
    ],
    relatedIds: ['chegirma-50-imkoniyat', 'telegram-botlar-savdo-muloqot', 'crm-tizimlari-mijozlar-hisobotlar'],
  },
  {
    id: 'chegirma-50-imkoniyat',
    slug: '50-chegirma-biznesni-avtomatlashtirish-imkoniyati',
    category: 'Yangiliklar',
    title: 'SAM CORPdan Maxsus Taklif: Telegram Botlar va CRM Tizimlariga 50% Chegirma!',
    subtitle:
      'Biznesingizni avtomatlashtiring va rivojlantiring! Telegram botlar va CRM tizimlariga 50% chegirma haqida batafsil.',
    excerpt:
      'Biznes jarayonlarini raqamlashtirish xarajatlarini ikki barobar kamaytirish, arizalarni yo‘qotmaslik va joriy aksiya muddatida 50% chegirmani band qilish tartibi.',
    publishedAt: '21 Noyabr, 2026',
    readTimeMinutes: 4,
    author: {
      name: 'Karimboyev Mamurjon',
      role: 'Loyihalar va Strategiya Rahbari',
    },
    image: '/src/assets/images/samcorp_poster_visual_1795355645939.jpg',
    imageAlt: 'SAM CORP 50% chegirma aksiyasi rasmiy posteri',
    keyTakeaways: [
      'Chegirma ham yangi Telegram bot yaratish, ham korporativ CRM tizimini joriy etish loyihalariga tatbiq etiladi.',
      'Aksiya doirasida dastlabki texnik audit, biznes jarayonlari xaritasi va jamoani o‘qitish bepul taqdim etiladi.',
      'Chegirmani band qilish uchun @SAMcorpManagerBot, www.cloudbot.uz yoki +998 77 499 71 55 orqali ariza qoldirish kifoya.',
    ],
    metrics: [
      {
        label: 'Maxsus chegirma miqdori',
        value: '50%',
        context: 'Standart ishlab chiqish narxidan tejamkorlik',
      },
      {
        label: 'Ishga tushirish muddati',
        value: '7–14 kun',
        context: 'Texnik topshiriq tasdiqlanganidan so‘ng',
      },
      {
        label: 'Arizalarga javob tezligi',
        value: '< 15 daqiqa',
        context: '@SAMcorpManagerBot orqali murojaatda',
      },
    ],
    sections: [
      {
        heading: 'Aksiya shartlari va kimlar uchun mo‘ljallangan?',
        paragraphs: [
          'SAM CORP jamoasi kichik va o‘rta biznes vakillariga raqamli transformatsiyani qulaylashtirish maqsadida Telegram botlar va CRM tizimlarini ishlab chiqishga 50% chegirma e’lon qildi.',
          'Ushbu taklif onlayn do‘konlar, xizmat ko‘rsatish markazlari, o‘quv markazlari, klinikalar hamda B2B savdo bilan shug‘ullanuvchi barcha kompaniyalar uchun amal qiladi.',
        ],
        bulletPoints: [
          'Onlayn do‘konlar va chakana savdo: katalog, savatcha, Click/Payme to‘lovlari va yetkazib berish kuzatuvi.',
          'Xizmat ko‘rsatish markazlari va klinikalar: navbatga yozilish, avtomatik eslatmalar va mijoz tarixi.',
          'O‘quv markazlari va B2B kompaniyalar: lidlarni saralash, menejerlarga biriktirish va oylik to‘lovlar nazorati.',
        ],
      },
      {
        heading: 'Taklif tugashidan oldin qanday foydalanish mumkin?',
        paragraphs: [
          '50% chegirma kvotasi texnik jamoa yuklamasidan kelib chiqib cheklangan miqdordagi loyihalar uchun ajratilgan. Ariza topshirganingizdan so‘ng mutaxassislarimiz biznes modelingizni tahlil qilib, aniq smeta va muddatni taqdim etadilar.',
        ],
      },
    ],
    claimSteps: [
      {
        step: '01',
        title: 'Murojaat yuboring',
        description:
          'Telegramda @SAMcorpManagerBot ga yozing, www.cloudbot.uz saytida so‘rov qoldiring yoki +998 77 499 71 55 raqamiga qo‘ng‘iroq qiling.',
      },
      {
        step: '02',
        title: 'Bepul biznes audit',
        description:
          'Muhandislarimiz savdo voronkangizni tahlil qilib, sizga qaysi bot va CRM moduli kerakligini aniqlab beradi.',
      },
      {
        step: '03',
        title: '50% chegirmali shartnoma',
        description:
          'Loyiha qiymatining yarmi chegirma asosida hisoblanadi va 7–14 kun ichida tayyor tizim ishga tushiriladi.',
      },
    ],
    relatedIds: ['samcorp-ekotizim-maqola', 'telegram-botlar-savdo-muloqot', 'crm-tizimlari-mijozlar-hisobotlar'],
  },
  {
    id: 'telegram-botlar-savdo-muloqot',
    slug: 'telegram-botlar-savdo-muloqot-va-avtomatlashtirish',
    category: 'Telegram Botlar',
    title: 'Telegram Botlar: Savdo, Muloqot va Avtomatlashtirish',
    subtitle:
      'Mijozlar bilan 24/7 aloqa, avtomatlashtirilgan savdo voronkalari va buyurtmalarni xatosiz qabul qilish arxitekturasi.',
    excerpt:
      'Oddiy menyuli botlardan tortib to‘liq to‘lov va CRM bilan bog‘langan savdo platformalarigacha: Telegram bot biznesingiz uchun qanday ishlaydi?',
    publishedAt: '20 Noyabr, 2026',
    readTimeMinutes: 5,
    author: {
      name: 'Olloberganov Aslbek',
      role: 'Telegram Botlar Muhandisi',
    },
    image: '/src/assets/images/article_telegram_bots_1795355645821.jpg',
    imageAlt: 'Zamonaviy Telegram bot savdo va muloqot interfeysi studiya kompozitsiyasi',
    keyTakeaways: [
      'Telegram WebApp va bot interfeysi mijozga ilova yuklamasdan turib 30 soniyada xarid qilish imkonini beradi.',
      'Avtomatik javob ssenariylari tungi va dam olish kunlaridagi murojaatlarning 100% ini qamrab oladi.',
      'Buyurtma rasmiylashtirilishi bilan menejer va omborga bir vaqtda bildirishnoma yuboriladi.',
    ],
    metrics: [
      {
        label: 'Muloqot qamrovi',
        value: '24/7',
        context: 'Tanaffus va dam olish kunlarisiz xizmat',
      },
      {
        label: 'Buyurtma rasmiylashtirish',
        value: '45 soniya',
        context: 'Katalogdan to‘lovgacha o‘rtacha vaqt',
      },
      {
        label: 'Operator yuklamasi',
        value: '-65%',
        context: 'Takroriy savollarga avtomatik javob hisobiga',
      },
    ],
    sections: [
      {
        heading: 'Muloqotdan bevosita savdoga o‘tish',
        paragraphs: [
          'O‘zbekistonda mijozlarning katta qismi muloqot va xarid uchun Telegramdan foydalanadi. Mijoz sizning reklama havolangizni bosganida, uni uzoq yuklanadigan veb-sahifaga emas, balki tanish va tezkor Telegram bot muhitiga olib kirish konversiyani keskin oshiradi.',
          'SAM CORP yaratadigan botlar oddiy tugmalar to‘plami emas. Ular foydalanuvchining tilini, avvalgi xaridlarini va qiziqishlarini eslab qoladigan aqlli savdo vositasidir.',
        ],
        pullQuote:
          'Mijoz narxni so‘ragan lahzada 15 daqiqa kutishi shart emas — bot 1 soniyada aniq katalog va hisob-kitobni taqdim etadi.',
      },
      {
        heading: 'Avtomatlashtirilgan buyurtma va to‘lov zanjiri',
        paragraphs: [
          'Savdo botining asosiy kuchi — inson omilisiz to‘liq siklni yakunlay olishida. Mijoz mahsulotni tanlaydi, lokatsiya yuboradi va Click, Payme yoki Uzum orqali to‘lovni amalga oshiradi.',
        ],
        bulletPoints: [
          'Dinamik katalog: narx va qoldiqlar avtomatik yangilanadi.',
          'Segmentatsiyalangan xabarnomalar: faqat tegishli mijozlarga chegirma va yangilik yuborish.',
          'Ko‘p tilli interfeys: o‘zbek va rus tillarida birdek qulay muloqot.',
          'To‘g‘ridan-to‘g‘ri CRM integratsiyasi: har bir harakat mijoz kartasida saqlanadi.',
        ],
      },
    ],
    claimSteps: [
      {
        step: '01',
        title: 'Bot ssenariysini tanlang',
        description:
          'Savdo do‘koni, xizmatga yozilish yoki qo‘llab-quvvatlash botidan birini yoki gibrid modelni belgilang.',
      },
      {
        step: '02',
        title: '@SAMcorpManagerBot orqali bog‘laning',
        description:
          'Biznes turini yozing va joriy 50% chegirma asosida texnik taklifni oling.',
      },
      {
        step: '03',
        title: '7 kunda ishga tushiring',
        description:
          'To‘lov tizimlari va katalogingiz ulanib, botingiz mijozlarni qabul qilishni boshlaydi.',
      },
    ],
    relatedIds: ['telegram-buyurtma-arxitekturasi', 'chegirma-50-imkoniyat', 'crm-tizimlari-mijozlar-hisobotlar'],
  },
  {
    id: 'crm-tizimlari-mijozlar-hisobotlar',
    slug: 'crm-tizimlari-mijozlar-boshqaruvi-va-hisobotlar',
    category: 'CRM Tizimlari',
    title: 'CRM Tizimlari: Mijozlar Boshqaruvi va Hisobotlar',
    subtitle:
      'Har bir lidni nazorat qilish, savdo voronkasini shaffoflashtirish va rahbarlar uchun aniq analitik hisobotlar.',
    excerpt:
      'Mijozlar bazasini tartibga solish, menejerlar ishini baholash va biznes qarorlarini taxminlarga emas, aniq raqamlarga tayanib qabul qilish.',
    publishedAt: '18 Noyabr, 2026',
    readTimeMinutes: 6,
    author: {
      name: 'Ismoilov Shohjahon',
      role: 'SAM CORP Tizim Arxitektori',
    },
    image: '/src/assets/images/article_crm_systems_1795355646817.jpg',
    imageAlt: 'CRM tizimi savdo voronkasi va analitik dashboard ekrani',
    keyTakeaways: [
      'Barcha kanallardan (Telegram, Instagram, telefon, veb-sayt) kelgan so‘rovlar bitta voronkaga tushadi.',
      'Menejer almashganda ham mijoz bilan bo‘lgan barcha yozishma va kelishuvlar tarixi saqlanib qoladi.',
      'Avtomatik hisobotlar har kuni kechqurun rahbar Telegramiga tushum va konversiya ko‘rsatkichlarini yuboradi.',
    ],
    metrics: [
      {
        label: 'Yo‘qotilgan lidlar',
        value: '0%',
        context: 'Har bir so‘rov avtomatik qayd etiladi',
      },
      {
        label: 'Qayta xarid ulushi',
        value: '+38%',
        context: 'Eslatma va segmentatsiya mexanizmlari bilan',
      },
      {
        label: 'Hisobot tayyorlash',
        value: 'Real-vaqt',
        context: 'Qo‘lda Excel jadval to‘ldirish shart emas',
      },
    ],
    sections: [
      {
        heading: 'Mijozlar bazasi nega tartibdan chiqadi?',
        paragraphs: [
          'Savdo jamoasi kattalashgan sari mijozlar haqidagi ma’lumotlar menejerlarning shaxsiy telefonlarida, daftarchalarda yoki tarqoq jadvallarda qolib ketadi. Natijada mijozga o‘z vaqtida qayta qo‘ng‘iroq qilinmaydi, rahbar esa qaysi bosqichda savdo to‘xtab qolayotganini bilmaydi.',
          'SAM CORP joriy etadigan CRM tizimi har bir mijozga alohida raqamli profil ochadi: birinchi murojaatdan tortib takroriy xaridlargacha bo‘lgan barcha tarix yagona oynada ko‘rinadi.',
        ],
        pullQuote:
          'O‘lchab bo‘lmaydigan jarayonni boshqarib bo‘lmaydi. CRM sizga biznesingizning har bir raqamini real vaqtda ko‘rsatib turadi.',
      },
      {
        heading: 'Savdo voronkasi va avtomatik hisobotlar',
        paragraphs: [
          'CRM dashboard orqali siz nafaqat joriy bitimlarni, balki kelgusi oy uchun kutilayotgan tushum prognozini ham ko‘rasiz.',
        ],
        bulletPoints: [
          'Bosqichma-bosqich Kanban voronkasi: Yangi lid, Muzokara, Hisob yuborildi, To‘lov qilindi.',
          'Avtomatik vazifalar: agar menejer 30 daqiqada javob bermasa, tizim rahbarga ogohlantirish yuboradi.',
          'Moliyaviy va marketing analitikasi: qaysi reklama kanali eng arzon va sifatli mijoz keltirganini aniqlash.',
          'Xodimlar KPI tizimi: har bir menejerning konversiya foizi va o‘rtacha cheki.',
        ],
      },
    ],
    claimSteps: [
      {
        step: '01',
        title: 'Jamoa hajmini aniqlang',
        description:
          'Nechta menejer va qanday savdo kanallari ulanishini mutaxassislarimizga ayting.',
      },
      {
        step: '02',
        title: 'Tizimni joriy eting',
        description:
          'Mavjud mijozlar bazangizni xavfsiz ko‘chirish va kanallarni ulashni amalga oshiramiz.',
      },
      {
        step: '03',
        title: 'Jamoani o‘qitish va nazorat',
        description:
          'Xodimlaringiz uchun amaliy trening o‘tkazamiz va birinchi haftadanoq shaffof hisobotlarni olasiz.',
      },
    ],
    relatedIds: ['crm-rahbar-hisobotlari', 'exceldan-crmga-otish', 'keys-konversiya-oshishi'],
  },
  {
    id: 'keys-konversiya-oshishi',
    slug: 'telegram-bot-va-crm-integratsiyasi-savdo-konversiyasi',
    category: 'Keyslar',
    title: 'Telegram Bot va CRM Integratsiyasi Savdo Konversiyasini Qanday 2.4 Barobar Oshirdi?',
    subtitle:
      'Toshkentdagi chakana va xizmat ko‘rsatish biznesi misolida avtomatlashtirishning birinchi 60 kunlik natijalari.',
    excerpt:
      'Qo‘lda buyurtma yozib olishdan to‘liq avtomatik Telegram bot va CRM zanjiriga o‘tish orqali javob tezligi 40 daqiqadan 4 daqiqaga tushirildi.',
    publishedAt: '15 Noyabr, 2026',
    readTimeMinutes: 5,
    author: {
      name: 'Olloberganov Aslbek',
      role: 'Telegram Botlar Muhandisi',
    },
    image: '/src/assets/images/article_case_study_1795355646893.jpg',
    imageAlt: 'SAM CORP mutaxassislari biznes avtomatlashtirish loyihasini muhokama qilmoqda',
    keyTakeaways: [
      'Bot va CRM birgalikda ishlaganda qo‘lda ma’lumot kiritish xatolari to‘liq bartaraf etiladi.',
      'Mijozga tezkor javob berish konversiyani 2.4 barobar oshirishning asosiy omili bo‘ldi.',
      'Avtomatlashtirilgan qayta aloqa xabarnomalari takroriy savdoni sezilarli ko‘paytirdi.',
    ],
    metrics: [
      {
        label: 'Savdo konversiyasi',
        value: '2.4x',
        context: 'Integratsiyadan keyingi 60 kun ichida',
      },
      {
        label: 'O‘rtacha javob vaqti',
        value: '4 daqiqa',
        context: 'Avvalgi 42 daqiqa o‘rniga',
      },
      {
        label: 'Qo‘l mehnati tejalishi',
        value: '60%',
        context: 'Kunlik operator va menejer vaqti',
      },
    ],
    sections: [
      {
        heading: 'Avvalgi holat: yo‘qotilgan xabarlar va sekin hisob-kitob',
        paragraphs: [
          'Hamkor kompaniyamiz kuniga o‘rtacha 120 ta murojaat qabul qilar, biroq operatorlar har bir mijozga narx va rasmni qo‘lda yuborishga majbur edi. Kechki soat 19:00 dan keyingi arizalar esa faqat ertasi kuni tushlikka yaqin ko‘rib chiqilardi.',
          'SAM CORP jamoasi 12 kun ichida maxsus Telegram savdo botini yaratib, uni kompaniyaning yangi CRM tizimiga to‘g‘ridan-to‘g‘ri bog‘ladi.',
        ],
      },
      {
        heading: 'Natija: uzluksiz zanjir va shaffof boshqaruv',
        paragraphs: [
          'Mijoz bot orqali mahsulotni tanlagan zahoti CRMda bitim ochiladi va mas’ul menejer darhol xabardor qilinadi. Rahbar esa kun yakunida necha so‘mlik buyurtma yopilganini bir qarashda ko‘radi.',
        ],
        bulletPoints: [
          'Tungi soatlardagi buyurtmalarning 84 foizi operatorsiz yakunlandi.',
          'Har bir menejerning oylik qayta ishlash quvvati ikki barobarga oshdi.',
          'Reklama byudjeti oshirilmasdan turib, umumiy tushum sezilarli o‘sdi.',
        ],
      },
    ],
    claimSteps: [
      {
        step: '01',
        title: 'Kompleks yechimni tanlang',
        description:
          'Telegram bot + CRM integratsiyasini birgalikda buyurtma qilib, joriy 50% chegirmadan foydalaning.',
      },
      {
        step: '02',
        title: 'Mutaxassis bilan bog‘laning',
        description:
          '+998 77 499 71 55 raqamiga qo‘ng‘iroq qiling yoki @SAMcorpManagerBot ga yozing.',
      },
    ],
    relatedIds: ['samcorp-ekotizim-maqola', 'telegram-botlar-savdo-muloqot', 'crm-tizimlari-mijozlar-hisobotlar'],
  },
  {
    id: 'telegram-buyurtma-arxitekturasi',
    slug: 'buyurtmalarni-qabul-qilishdan-yetkazib-berishgacha-bot-arxitekturasi',
    category: 'Telegram Botlar',
    title: 'Buyurtmani Qabul Qilishdan Yetkazib Berishgacha: Mukammal Bot Arxitekturasi',
    subtitle:
      'Mijoz tajribasini buzmasdan buyurtmalarni qabul qilish, ombor bilan sinxronlash va kuryerlik nazorati.',
    excerpt:
      'Elektron tijorat va yetkazib berish xizmatlari uchun barqaror Telegram bot tizimini qurishda e’tibor berish kerak bo‘lgan asosiy modullar.',
    publishedAt: '12 Noyabr, 2026',
    readTimeMinutes: 4,
    author: {
      name: 'Karimboyev Mamurjon',
      role: 'Loyihalar va Strategiya Rahbari',
    },
    image: '/src/assets/images/article_telegram_bots_1795355645821.jpg',
    imageAlt: 'Buyurtmalarni avtomatlashtiruvchi Telegram bot moduli',
    keyTakeaways: [
      'Geolokatsiya qabul qilish kuryer xatolarini va manzil so‘rash qo‘ng‘iroqlarini yo‘qotadi.',
      'To‘lov tasdiqlanganda avtomatik elektron chek va buyurtma raqami beriladi.',
      'Mijoz istalgan vaqtda "Mening buyurtmalarim" bo‘limidan statusni ko‘ra oladi.',
    ],
    sections: [
      {
        heading: 'Tezkorlik — mijoz sodiqligining asosi',
        paragraphs: [
          'Agar foydalanuvchi Telegram botda 3 tadan ko‘p ortiqcha qadam tashlasa, buyurtmani oxiriga yetkazmasdan chiqib ketish ehtimoli ortadi. Shu sababli SAM CORP interfeys dizaynida minimal klik tamoyiliga amal qiladi.',
        ],
        bulletPoints: [
          'Bir tugma bilan telefon raqami va manzilni ulashish.',
          'Oldingi buyurtmani bir marta bosish orqali takrorlash.',
          'Kuryer yo‘lga chiqqanda avtomatik push-xabar yuborish.',
        ],
      },
    ],
    claimSteps: [
      {
        step: '01',
        title: 'Katalog hajmini yuboring',
        description:
          'Mahsulotlaringiz soni va yetkazib berish hududini @SAMcorpManagerBot ga yuboring.',
      },
      {
        step: '02',
        title: 'Loyiha muddatini belgilang',
        description:
          'Texnik topshiriq tasdiqlangach, 7–10 ish kunida tayyor botingizni qabul qilib oling.',
      },
    ],
    relatedIds: ['telegram-botlar-savdo-muloqot', 'chegirma-50-imkoniyat'],
  },
  {
    id: 'crm-rahbar-hisobotlari',
    slug: 'rahbarlar-uchun-real-vaqt-hisobotlari-crm-dashboard',
    category: 'CRM Tizimlari',
    title: 'Rahbarlar Uchun Real-Vaqt Hisobotlari: CRM Dashboardda Nimani Kuzatish Kerak?',
    subtitle:
      'Kunlik tushum, lidlar narxi, menejerlar tezligi va mijoz qayta xaridi bo‘yicha eng muhim ko‘rsatkichlar.',
    excerpt:
      'Ortiqcha murakkab grafiklarsiz faqat biznes o‘sishiga ta’sir qiladigan asosiy CRM metrikalarini to‘g‘ri sozlash bo‘yicha qo‘llanma.',
    publishedAt: '09 Noyabr, 2026',
    readTimeMinutes: 5,
    author: {
      name: 'Ismoilov Shohjahon',
      role: 'SAM CORP Tizim Arxitektori',
    },
    image: '/src/assets/images/article_crm_systems_1795355646817.jpg',
    imageAlt: 'Rahbarlar uchun real vaqt CRM analitika paneli',
    keyTakeaways: [
      'Birinchi javob vaqti (Response Time) savdo hajmiga to‘g‘ridan-to‘g‘ri ta’sir qiluvchi birinchi raqamli ko‘rsatkichdir.',
      'Bosqichlararo konversiya qaysi xodimga qo‘shimcha trening kerakligini darhol ko‘rsatadi.',
      'Kunlik Telegram hisobotlari rahbarni doimiy tizimga kirib tekshirish majburiyatidan ozod qiladi.',
    ],
    sections: [
      {
        heading: 'Raqamlarga asoslangan boshqaruv madaniyati',
        paragraphs: [
          'Ko‘p rahbarlar oy oxirida kassadagi qoldiqqa qarab xulosa chiqaradi. Biroq muammo odatda oy o‘rtasida — lidlarga sekin javob berilgan yoki taklif yuborilgandan keyin qayta aloqa qilinmagan nuqtada boshlangan bo‘ladi.',
          'SAM CORP CRM tizimlari sizga muammoni oy tugashidan oldin ko‘rish va tuzatish imkonini beradi.',
        ],
        bulletPoints: [
          'Kunlik yangi murojaatlar va yopilgan bitimlar balansi.',
          'Har bir reklama manbasi bo‘yicha sof ROI ko‘rsatkichi.',
          'Mijozlarning o‘rtacha cheki va qayta xarid davri.',
        ],
      },
    ],
    claimSteps: [
      {
        step: '01',
        title: 'Hisobot shablonini tanlang',
        description:
          'Biznesingiz uchun muhim bo‘lgan 5–7 ta asosiy KPI ko‘rsatkichini belgilang.',
      },
      {
        step: '02',
        title: 'www.cloudbot.uz orqali so‘rov bering',
        description:
          'Mutaxassislarimiz sizga moslashtirilgan CRM dashboardni sozlab beradi.',
      },
    ],
    relatedIds: ['crm-tizimlari-mijozlar-hisobotlar', 'exceldan-crmga-otish'],
  },
  {
    id: 'exceldan-crmga-otish',
    slug: 'exceldan-zamonaviy-crm-tizimiga-otish-qollanma',
    category: 'Qo‘llanmalar',
    title: 'Exceldan Zamonaviy CRM Tizimiga O‘tish: Biznes Egalari Uchun 5 Ta Amaliy Qadam',
    subtitle:
      'Jamoani qarshiligisiz yangi tizimga o‘tkazish, mavjud mijozlar bazasini tozalash va dastlabki 14 kunlik reja.',
    excerpt:
      'Ko‘p kompaniyalar CRM joriy etishdan qo‘rqadi, chunki xodimlar odatlangan jadvallardan voz kechishni istamaydi. Muammosiz o‘tish uchun amaliy yo‘riqnoma.',
    publishedAt: '05 Noyabr, 2026',
    readTimeMinutes: 6,
    author: {
      name: 'Karimboyev Mamurjon',
      role: 'Loyihalar va Strategiya Rahbari',
    },
    image: '/src/assets/images/article_case_study_1795355646893.jpg',
    imageAlt: 'CRM tizimiga o‘tish va jamoani o‘qitish jarayoni',
    keyTakeaways: [
      'Avval mavjud mijozlar bazasini takroriy va eskirgan yozuvlardan tozalash zarur.',
      'Savdo bosqichlarini murakkablashtirmasdan 4–5 ta aniq ustundan boshlash eng samarali usuldir.',
      'SAM CORP har bir loyihada jamoani amaliy trening bilan qo‘llab-quvvatlaydi.',
    ],
    sections: [
      {
        heading: 'O‘tish davrida yo‘l qo‘yiladigan asosiy xatolar',
        paragraphs: [
          'Eng ko‘p uchraydigan xato — birinchi kundanoq 20 ta majburiy maydon va murakkab qoidalar kiritish. Menejer bundan charchaydi va yana eski daftarga qaytadi.',
          'Biz tizimni bosqichma-bosqich joriy etamiz: avval telefon, Telegram va Instagram arizalari avtomatik tushishi yo‘lga qo‘yiladi, shundan so‘ng analitika va avtomatik eslatmalar qo‘shiladi.',
        ],
        bulletPoints: [
          '1-qadam: Savdo voronkasi bosqichlarini soddalashtirish.',
          '2-qadam: Barcha kiruvchi kanallarni yagona oynaga ulash.',
          '3-qadam: Xodimlar uchun 2 soatlik jonli amaliy mashg‘ulot.',
          '4-qadam: Kunlik qisqa nazorat va rahbar hisobotlarini yoqish.',
        ],
      },
    ],
    claimSteps: [
      {
        step: '01',
        title: 'Maslahatga yoziling',
        description:
          '+998 77 499 71 55 orqali yoki @SAMcorpManagerBot da jamoangiz hajmi haqida yozing.',
      },
      {
        step: '02',
        title: '14 kunlik o‘tish rejasi',
        description:
          'SAM CORP mutaxassislari ma’lumotlaringizni xavfsiz ko‘chirib, tizimni ishga tushiradi.',
      },
    ],
    relatedIds: ['crm-tizimlari-mijozlar-hisobotlar', 'crm-rahbar-hisobotlari'],
  },
];
