// Rateriet – seed-data: kjente parfymer + dupe-koblinger
// Brukes til å fylle Firestore `perfumes`-collection så appen ikke er tom ved start.
// Valgt ut fra parfymer folk faktisk søker på + har kjente duper.

export const SEED_PERFUMES = [
  // ===== ORIGINALER (priceClass: luxury/mid) =====
  {
    id: "creed-aventus", name: "Aventus", house: "Creed", concentration: "EdP",
    gender: "Masculine", year: 2010, priceClass: "luxury", dupeOf: null,
    accords: ["fruity", "smoky", "woody", "fresh"],
    topNotes: ["Pineapple", "Bergamot", "Blackcurrant", "Apple"],
    heartNotes: ["Birch", "Patchouli", "Rose", "Jasmine"],
    baseNotes: ["Musk", "Oakmoss", "Ambergris", "Vanilla"],
    description: "Fruktig-røykfylt signaturduft. En av de mest klonede parfymene som finnes."
  },
  {
    id: "dior-sauvage-edt", name: "Sauvage", house: "Dior", concentration: "EdT",
    gender: "Masculine", year: 2015, priceClass: "mid", dupeOf: null,
    accords: ["fresh spicy", "amber", "citrus"],
    topNotes: ["Calabrian Bergamot", "Pepper"],
    heartNotes: ["Sichuan Pepper", "Lavender", "Geranium"],
    baseNotes: ["Ambroxan", "Cedar", "Labdanum"],
    description: "Enorm bestselger. Frisk, peprete og ambroxan-tung – ekstremt populær."
  },
  {
    id: "mfk-baccarat-rouge-540", name: "Baccarat Rouge 540", house: "Maison Francis Kurkdjian",
    concentration: "EdP", gender: "Unisex", year: 2015, priceClass: "luxury", dupeOf: null,
    accords: ["sweet", "amber", "woody", "floral"],
    topNotes: ["Saffron", "Jasmine"],
    heartNotes: ["Amberwood", "Ambergris"],
    baseNotes: ["Fir Resin", "Cedar"],
    description: "Søtlig, saffran-amber signatur. Massivt kopiert pga. høy pris."
  },
  {
    id: "ysl-y-edp", name: "Y", house: "Yves Saint Laurent", concentration: "EdP",
    gender: "Masculine", year: 2018, priceClass: "mid", dupeOf: null,
    accords: ["aromatic", "fresh", "woody", "amber"],
    topNotes: ["Apple", "Ginger", "Bergamot"],
    heartNotes: ["Sage", "Juniper", "Geranium"],
    baseNotes: ["Amberwood", "Tonka Bean", "Cedar"],
    description: "Frisk-aromatisk moderne maskulin. Populær kontorduft."
  },
  {
    id: "paco-1million", name: "1 Million", house: "Paco Rabanne", concentration: "EdT",
    gender: "Masculine", year: 2008, priceClass: "mid", dupeOf: null,
    accords: ["spicy", "leather", "sweet", "amber"],
    topNotes: ["Blood Mandarin", "Grapefruit", "Mint"],
    heartNotes: ["Cinnamon", "Spicy Notes", "Rose"],
    baseNotes: ["Leather", "Amber", "Patchouli"],
    description: "Søt-krydret med kanel og lær. Klubbduft-klassiker."
  },
  {
    id: "bdc-parfum", name: "Bleu de Chanel", house: "Chanel", concentration: "Parfum",
    gender: "Masculine", year: 2018, priceClass: "luxury", dupeOf: null,
    accords: ["woody", "aromatic", "citrus", "amber"],
    topNotes: ["Grapefruit", "Bergamot", "Aldehydes"],
    heartNotes: ["Ginger", "Jasmine", "Sandalwood"],
    baseNotes: ["Sandalwood", "Cedar", "Tonka Bean"],
    description: "Allsidig treaktig-sitrus. En av de tryggeste signaturduftene som finnes."
  },
  {
    id: "tf-tobacco-vanille", name: "Tobacco Vanille", house: "Tom Ford", concentration: "EdP",
    gender: "Unisex", year: 2007, priceClass: "luxury", dupeOf: null,
    accords: ["tobacco", "warm spicy", "vanilla", "sweet"],
    topNotes: ["Tobacco Leaf", "Spices"],
    heartNotes: ["Tonka Bean", "Tobacco Blossom", "Vanilla"],
    baseNotes: ["Dried Fruits", "Woody Notes"],
    description: "Varm, søt tobakk-vanilje. Vinterklassiker, ofte duped."
  },
  {
    id: "tf-oud-wood", name: "Oud Wood", house: "Tom Ford", concentration: "EdP",
    gender: "Unisex", year: 2007, priceClass: "luxury", dupeOf: null,
    accords: ["woody", "oud", "warm spicy"],
    topNotes: ["Oud", "Rosewood", "Cardamom"],
    heartNotes: ["Sandalwood", "Vetiver", "Patchouli"],
    baseNotes: ["Tonka Bean", "Vanilla", "Amber"],
    description: "Myk, tilgjengelig oud. Inngangsporten til oud for mange."
  },
  {
    id: "versace-eros", name: "Eros", house: "Versace", concentration: "EdT",
    gender: "Masculine", year: 2012, priceClass: "mid", dupeOf: null,
    accords: ["sweet", "fresh", "mint", "vanilla"],
    topNotes: ["Mint", "Green Apple", "Lemon"],
    heartNotes: ["Tonka Bean", "Geranium", "Ambroxan"],
    baseNotes: ["Vanilla", "Vetiver", "Cedar", "Oakmoss"],
    description: "Søt mynte-vanilje. Veldig populær blant yngre."
  },
  {
    id: "jpg-le-male", name: "Le Male", house: "Jean Paul Gaultier", concentration: "EdT",
    gender: "Masculine", year: 1995, priceClass: "mid", dupeOf: null,
    accords: ["lavender", "vanilla", "sweet", "powdery"],
    topNotes: ["Mint", "Lavender", "Bergamot"],
    heartNotes: ["Cinnamon", "Cumin", "Orange Blossom"],
    baseNotes: ["Vanilla", "Tonka Bean", "Amber", "Sandalwood"],
    description: "Lavendel-vanilje klassiker fra 90-tallet. Tidløs."
  },
  {
    id: "mugler-angel", name: "Angel", house: "Mugler", concentration: "EdP",
    gender: "Feminine", year: 1992, priceClass: "mid", dupeOf: null,
    accords: ["sweet", "gourmand", "patchouli", "vanilla"],
    topNotes: ["Bergamot", "Mandarin", "Cotton Candy"],
    heartNotes: ["Honey", "Apricot", "Red Berries"],
    baseNotes: ["Patchouli", "Vanilla", "Caramel", "Chocolate"],
    description: "Banebrytende søt gourmand. Sukkerspinn og patchouli."
  },
  {
    id: "lancome-la-vie-est-belle", name: "La Vie Est Belle", house: "Lancôme", concentration: "EdP",
    gender: "Feminine", year: 2012, priceClass: "mid", dupeOf: null,
    accords: ["sweet", "vanilla", "gourmand", "floral"],
    topNotes: ["Blackcurrant", "Pear"],
    heartNotes: ["Iris", "Jasmine", "Orange Blossom"],
    baseNotes: ["Praline", "Vanilla", "Patchouli", "Tonka Bean"],
    description: "Søt iris-praline. En av de mest solgte feminine de siste tiåret."
  },
  {
    id: "ysl-black-opium", name: "Black Opium", house: "Yves Saint Laurent", concentration: "EdP",
    gender: "Feminine", year: 2014, priceClass: "mid", dupeOf: null,
    accords: ["coffee", "sweet", "vanilla", "white floral"],
    topNotes: ["Pink Pepper", "Orange Blossom", "Pear"],
    heartNotes: ["Coffee", "Jasmine", "Bitter Almond"],
    baseNotes: ["Vanilla", "Patchouli", "Cedar"],
    description: "Kaffe-vanilje gourmand. Stor moderne feminin bestselger."
  },
  {
    id: "chanel-coco-mademoiselle", name: "Coco Mademoiselle", house: "Chanel", concentration: "EdP",
    gender: "Feminine", year: 2001, priceClass: "luxury", dupeOf: null,
    accords: ["citrus", "patchouli", "rose", "woody"],
    topNotes: ["Orange", "Bergamot", "Mandarin"],
    heartNotes: ["Rose", "Jasmine", "Litchi"],
    baseNotes: ["Patchouli", "Vetiver", "Vanilla", "White Musk"],
    description: "Frisk-chic sitrus-patchouli. Moderne klassiker."
  },
  {
    id: "dior-homme-intense", name: "Dior Homme Intense", house: "Dior", concentration: "EdP",
    gender: "Masculine", year: 2011, priceClass: "luxury", dupeOf: null,
    accords: ["iris", "powdery", "woody", "amber"],
    topNotes: ["Lavender"],
    heartNotes: ["Iris", "Ambrette", "Pear"],
    baseNotes: ["Virginia Cedar", "Vetiver"],
    description: "Pudret iris-elegant. Et referansepunkt for iris-dufter."
  },
  {
    id: "azzaro-most-wanted", name: "The Most Wanted", house: "Azzaro", concentration: "Parfum",
    gender: "Masculine", year: 2021, priceClass: "mid", dupeOf: null,
    accords: ["sweet", "amber", "spicy", "liquor"],
    topNotes: ["Ginger", "Cardamom"],
    heartNotes: ["Toffee", "Amberwood"],
    baseNotes: ["Vetiver", "Woody Notes"],
    description: "Søt toffee-amber. Stor moderne crowd-pleaser."
  },
  {
    id: "parfums-de-marly-layton", name: "Layton", house: "Parfums de Marly", concentration: "EdP",
    gender: "Unisex", year: 2016, priceClass: "luxury", dupeOf: null,
    accords: ["sweet", "spicy", "vanilla", "apple"],
    topNotes: ["Apple", "Bergamot", "Mandarin", "Lavender"],
    heartNotes: ["Violet", "Jasmine", "Geranium"],
    baseNotes: ["Vanilla", "Cardamom", "Sandalwood", "Pepper"],
    description: "Eple-vanilje med krydder. Veldig populær niche-crowdpleaser."
  },
  {
    id: "xerjoff-naxos", name: "Naxos", house: "Xerjoff", concentration: "EdP",
    gender: "Masculine", year: 2015, priceClass: "luxury", dupeOf: null,
    accords: ["honey", "tobacco", "lavender", "vanilla"],
    topNotes: ["Bergamot", "Lavender", "Lemon"],
    heartNotes: ["Honey", "Cinnamon", "Jasmine"],
    baseNotes: ["Tobacco", "Tonka Bean", "Vanilla"],
    description: "Honning-tobakk luksusduft. Ofte beskrevet som 'voksen Le Male'."
  },

  // ===== DUPER (priceClass: budget, dupeOf peker på original) =====
  {
    id: "alexandria-ii", name: "Alexandria II", house: "Alexandria Fragrances", concentration: "EdP",
    gender: "Masculine", year: 2017, priceClass: "budget", dupeOf: "creed-aventus",
    accords: ["fruity", "smoky", "woody"],
    topNotes: ["Pineapple", "Bergamot", "Blackcurrant"],
    heartNotes: ["Birch", "Patchouli"],
    baseNotes: ["Musk", "Oakmoss", "Vanilla"],
    description: "En av de mest anerkjente Aventus-dupene."
  },
  {
    id: "armaf-club-de-nuit-intense", name: "Club de Nuit Intense Man", house: "Armaf", concentration: "EdT",
    gender: "Masculine", year: 2015, priceClass: "budget", dupeOf: "creed-aventus",
    accords: ["fruity", "smoky", "woody"],
    topNotes: ["Pineapple", "Lemon", "Blackcurrant", "Apple"],
    heartNotes: ["Birch", "Jasmine", "Rose"],
    baseNotes: ["Vanilla", "Musk", "Ambergris"],
    description: "Den mest kjente Aventus-dupen til en brøkdel av prisen. Berømt verdi."
  },
  {
    id: "lattafa-asad", name: "Asad", house: "Lattafa", concentration: "EdP",
    gender: "Masculine", year: 2021, priceClass: "budget", dupeOf: "dior-sauvage-edt",
    accords: ["fresh spicy", "amber", "woody"],
    topNotes: ["Pepper", "Bergamot", "Pineapple"],
    heartNotes: ["Lavender", "Geranium"],
    baseNotes: ["Ambroxan", "Cedar", "Vanilla"],
    description: "Rimelig Sauvage-aktig med ekstra sødme. Enorm verdi-favoritt."
  },
  {
    id: "armaf-club-de-nuit-untold", name: "Club de Nuit Untold", house: "Armaf", concentration: "EdP",
    gender: "Unisex", year: 2019, priceClass: "budget", dupeOf: "mfk-baccarat-rouge-540",
    accords: ["sweet", "amber", "woody"],
    topNotes: ["Saffron", "Jasmine"],
    heartNotes: ["Amberwood", "Cedar"],
    baseNotes: ["Fir Resin", "Musk"],
    description: "Mye omtalt BR540-alternativ til en brøkdel av prisen."
  },
  {
    id: "lattafa-yara", name: "Yara", house: "Lattafa", concentration: "EdP",
    gender: "Feminine", year: 2020, priceClass: "budget", dupeOf: "mfk-baccarat-rouge-540",
    accords: ["sweet", "vanilla", "fruity", "amber"],
    topNotes: ["Orchid", "Heliotrope"],
    heartNotes: ["Tropical Fruits"],
    baseNotes: ["Vanilla", "Sandalwood", "Musk"],
    description: "Søt, fruktig BR540-inspirert. Viral på TikTok."
  },
  {
    id: "zara-vibrant-leather", name: "Vibrant Leather", house: "Zara", concentration: "EdT",
    gender: "Masculine", year: 2018, priceClass: "budget", dupeOf: "bdc-parfum",
    accords: ["woody", "aromatic", "citrus"],
    topNotes: ["Bergamot", "Citrus"],
    heartNotes: ["Sandalwood", "Spices"],
    baseNotes: ["Cedar", "Amber"],
    description: "Billig Bleu de Chanel-aktig fra Zara. Kjent budsjettfavoritt."
  },
  {
    id: "lattafa-khamrah", name: "Khamrah", house: "Lattafa", concentration: "EdP",
    gender: "Unisex", year: 2022, priceClass: "budget", dupeOf: "tf-tobacco-vanille",
    accords: ["sweet", "warm spicy", "vanilla", "boozy"],
    topNotes: ["Cinnamon", "Nutmeg", "Bergamot"],
    heartNotes: ["Dates", "Praline", "Tuberose"],
    baseNotes: ["Vanilla", "Tonka Bean", "Benzoin", "Myrrh"],
    description: "Søt krydret dadel-vanilje. Viral Tobacco Vanille-nabo."
  },

  // ===== AKTUELLE / POPULÆRE 2025–2026 =====
  {
    id: "pdm-greenley", name: "Greenley", house: "Parfums de Marly", concentration: "EdP",
    gender: "Masculine", year: 2022, priceClass: "luxury", dupeOf: null,
    accords: ["fruity", "green", "sweet", "woody"],
    topNotes: ["Bergamot", "Green Notes", "Apple"],
    heartNotes: ["Fig", "Violet Leaf", "Geranium"],
    baseNotes: ["Vetiver", "Patchouli", "Musk"],
    description: "Frisk-fruktig fiken og grønne toner. Veldig populær niche-crowdpleaser nå."
  },
  {
    id: "valentino-born-in-roma-intense", name: "Uomo Born in Roma Intense", house: "Valentino", concentration: "EdP",
    gender: "Masculine", year: 2021, priceClass: "mid", dupeOf: null,
    accords: ["amber", "woody", "aromatic", "vanilla"],
    topNotes: ["Sage", "Lavender"],
    heartNotes: ["Vetiver", "Patchouli"],
    baseNotes: ["Vanilla", "Tonka Bean", "Amber"],
    description: "Mørk, søtlig amber-vanilje med urteaktig topp. Stor moderne bestselger."
  },
  {
    id: "prada-luna-rossa-carbon", name: "Luna Rossa Carbon", house: "Prada", concentration: "EdT",
    gender: "Masculine", year: 2017, priceClass: "mid", dupeOf: null,
    accords: ["fresh", "metallic", "lavender", "woody"],
    topNotes: ["Bergamot", "Pepper"],
    heartNotes: ["Lavender", "Coal"],
    baseNotes: ["Patchouli", "Ambroxan"],
    description: "Frisk, metallisk-lavendel signatur. Bredt elsket allsidig duft."
  },
  {
    id: "montblanc-explorer", name: "Explorer", house: "Montblanc", concentration: "EdP",
    gender: "Masculine", year: 2019, priceClass: "mid", dupeOf: "creed-aventus",
    accords: ["fruity", "woody", "leather"],
    topNotes: ["Bergamot", "Pink Pepper", "Clary Sage"],
    heartNotes: ["Leather", "Vetiver"],
    baseNotes: ["Patchouli", "Akigalawood", "Ambroxan"],
    description: "Rimelig Aventus-aktig fruktig-treaktig. Stor verdi-bestselger."
  },
  {
    id: "ch-bad-boy", name: "Bad Boy", house: "Carolina Herrera", concentration: "EdT",
    gender: "Masculine", year: 2019, priceClass: "mid", dupeOf: null,
    accords: ["sweet", "warm spicy", "amber", "cacao"],
    topNotes: ["Bergamot", "Black Pepper", "White Pepper"],
    heartNotes: ["Sage", "Cedar"],
    baseNotes: ["Tonka Bean", "Cacao", "Amber"],
    description: "Søt kakao-krydder i lynformet flaske. Populær yngre maskulin."
  },
  {
    id: "ch-good-girl", name: "Good Girl", house: "Carolina Herrera", concentration: "EdP",
    gender: "Feminine", year: 2016, priceClass: "mid", dupeOf: null,
    accords: ["sweet", "floral", "almond", "coffee"],
    topNotes: ["Almond", "Coffee", "Bergamot"],
    heartNotes: ["Tuberose", "Jasmine Sambac", "Orange Blossom"],
    baseNotes: ["Tonka Bean", "Cocoa", "Vanilla"],
    description: "Søt mandel-kaffe i hælsko-flaske. En av de største feminine bestselgerne."
  },
  {
    id: "mugler-alien", name: "Alien", house: "Mugler", concentration: "EdP",
    gender: "Feminine", year: 2005, priceClass: "mid", dupeOf: null,
    accords: ["amber", "white floral", "woody"],
    topNotes: ["Jasmine"],
    heartNotes: ["Cashmeran", "Amber"],
    baseNotes: ["Woody Notes", "White Amber"],
    description: "Kraftig jasmin-amber. Ikonisk og fortsatt en storselger."
  },
  {
    id: "sol-cheirosa-62", name: "Cheirosa 62 (Brazilian Crush)", house: "Sol de Janeiro", concentration: "EdP",
    gender: "Feminine", year: 2022, priceClass: "budget", dupeOf: null,
    accords: ["sweet", "gourmand", "vanilla", "caramel"],
    topNotes: ["Pistachio", "Salted Caramel"],
    heartNotes: ["Jasmine"],
    baseNotes: ["Vanilla", "Sandalwood"],
    description: "Søt pistasj-salt karamell. Viral TikTok-favoritt blant yngre."
  },
  {
    id: "ysl-libre", name: "Libre", house: "Yves Saint Laurent", concentration: "EdP",
    gender: "Feminine", year: 2019, priceClass: "mid", dupeOf: null,
    accords: ["lavender", "floral", "sweet", "vanilla"],
    topNotes: ["Lavender", "Mandarin", "Black Currant"],
    heartNotes: ["Lavender", "Orange Blossom", "Jasmine"],
    baseNotes: ["Vanilla", "Musk", "Cedar"],
    description: "Lavendel møter appelsinblomst. Moderne feminin storselger."
  },
  {
    id: "phlur-missing-person", name: "Missing Person", house: "Phlur", concentration: "EdP",
    gender: "Unisex", year: 2022, priceClass: "mid", dupeOf: null,
    accords: ["musky", "clean", "white floral", "powdery"],
    topNotes: ["Bergamot"],
    heartNotes: ["Jasmine", "Orange Blossom"],
    baseNotes: ["Musk", "Sandalwood", "Skin Musk"],
    description: "Ren, hudnær moskus. Gikk viral som «skin scent» på TikTok."
  },
  {
    id: "armani-acqua-di-gio-profumo", name: "Acqua di Gio Profondo", house: "Giorgio Armani", concentration: "EdP",
    gender: "Masculine", year: 2020, priceClass: "mid", dupeOf: null,
    accords: ["fresh", "aquatic", "woody", "aromatic"],
    topNotes: ["Sea Notes", "Bergamot", "Green Mandarin"],
    heartNotes: ["Rosemary", "Lavender", "Cypress"],
    baseNotes: ["Musk", "Patchouli", "Mineral Notes"],
    description: "Frisk akvatisk klassiker i moderne form. Tidløs sommerduft."
  },
  {
    id: "dior-homme-2020", name: "Dior Homme", house: "Dior", concentration: "EdT",
    gender: "Masculine", year: 2020, priceClass: "luxury", dupeOf: null,
    accords: ["woody", "powdery", "iris", "fresh"],
    topNotes: ["Bergamot", "Pink Pepper", "Elemi"],
    heartNotes: ["Cashmere Wood", "Iris"],
    baseNotes: ["Iso E Super", "Patchouli", "Haitian Vetiver"],
    description: "Elegant treaktig-iris. Sofistikert kontorduft."
  },
  {
    id: "jpg-le-beau", name: "Le Beau", house: "Jean Paul Gaultier", concentration: "EdT",
    gender: "Masculine", year: 2019, priceClass: "mid", dupeOf: null,
    accords: ["coconut", "woody", "amber", "fresh spicy"],
    topNotes: ["Bergamot", "Ginger"],
    heartNotes: ["Coconut Wood", "Tonka Bean"],
    baseNotes: ["Cedar", "Vetiver"],
    description: "Kremet kokos-treverk. Populær varm-vær maskulin."
  },
  {
    id: "lattafa-fakhar", name: "Fakhar", house: "Lattafa", concentration: "EdP",
    gender: "Masculine", year: 2022, priceClass: "budget", dupeOf: "bdc-parfum",
    accords: ["woody", "aromatic", "citrus", "amber"],
    topNotes: ["Bergamot", "Grapefruit"],
    heartNotes: ["Ginger", "Jasmine"],
    baseNotes: ["Sandalwood", "Cedar", "Labdanum"],
    description: "Rimelig Bleu de Chanel-aktig. Sterk verdi-favoritt."
  },

  // ===== FLERE KJENTE / KLASSIKERE =====
  {
    id: "chanel-no5", name: "N°5", house: "Chanel", concentration: "EdP",
    gender: "Feminine", year: 1921, priceClass: "luxury", dupeOf: null,
    accords: ["aldehydic", "floral", "powdery", "woody"],
    topNotes: ["Aldehydes", "Ylang-Ylang", "Neroli", "Bergamot"],
    heartNotes: ["Jasmine", "Rose", "Lily-of-the-Valley", "Iris"],
    baseNotes: ["Sandalwood", "Vanilla", "Musk", "Vetiver"],
    description: "Den mest ikoniske parfymen som finnes. Aldehyd-blomstret klassiker fra 1921."
  },
  {
    id: "dior-jadore", name: "J'adore", house: "Dior", concentration: "EdP",
    gender: "Feminine", year: 1999, priceClass: "luxury", dupeOf: null,
    accords: ["floral", "fruity", "white floral"],
    topNotes: ["Pear", "Melon", "Magnolia", "Bergamot"],
    heartNotes: ["Jasmine", "Rose", "Orchid", "Lily-of-the-Valley"],
    baseNotes: ["Musk", "Vanilla", "Cedar"],
    description: "Lys, blomstret bestselger. En av verdens mest solgte feminine dufter."
  },
  {
    id: "chanel-chance", name: "Chance", house: "Chanel", concentration: "EdT",
    gender: "Feminine", year: 2003, priceClass: "luxury", dupeOf: null,
    accords: ["floral", "fresh", "citrus", "powdery"],
    topNotes: ["Pink Pepper", "Lemon", "Pineapple"],
    heartNotes: ["Jasmine", "Iris", "Hyacinth"],
    baseNotes: ["Patchouli", "Vetiver", "White Musk", "Amber"],
    description: "Frisk-blomstret og lekende. Populær ung-feminin Chanel."
  },
  {
    id: "viktor-rolf-flowerbomb", name: "Flowerbomb", house: "Viktor&Rolf", concentration: "EdP",
    gender: "Feminine", year: 2005, priceClass: "mid", dupeOf: null,
    accords: ["sweet", "floral", "white floral", "powdery"],
    topNotes: ["Tea", "Bergamot", "Osmanthus"],
    heartNotes: ["Jasmine", "Orchid", "Freesia", "Rose"],
    baseNotes: ["Patchouli", "Vanilla", "Musk"],
    description: "Eksplosiv søt blomsterbombe. Storselger i granatflaske."
  },
  {
    id: "mfk-grand-soir", name: "Grand Soir", house: "Maison Francis Kurkdjian", concentration: "EdP",
    gender: "Unisex", year: 2016, priceClass: "luxury", dupeOf: null,
    accords: ["amber", "vanilla", "warm spicy", "sweet"],
    topNotes: ["Amber"],
    heartNotes: ["Benzoin", "Tonka Bean"],
    baseNotes: ["Vanilla", "Labdanum", "Cedar"],
    description: "Varm amber-vanilje, kveldselegant. Niche-favoritt."
  },
  {
    id: "lattafa-badee-al-oud", name: "Bade'e Al Oud Amethyst", house: "Lattafa", concentration: "EdP",
    gender: "Unisex", year: 2022, priceClass: "budget", dupeOf: null,
    accords: ["fruity", "sweet", "oud", "woody"],
    topNotes: ["Raspberry", "Saffron"],
    heartNotes: ["Oud", "Rose"],
    baseNotes: ["Patchouli", "Musk", "Vanilla"],
    description: "Fruktig-søt oud til lav pris. Veldig populær budsjett-oud."
  },
  {
    id: "tf-lost-cherry", name: "Lost Cherry", house: "Tom Ford", concentration: "EdP",
    gender: "Unisex", year: 2018, priceClass: "luxury", dupeOf: null,
    accords: ["sweet", "cherry", "almond", "amber"],
    topNotes: ["Cherry", "Bitter Almond", "Liqueur"],
    heartNotes: ["Turkish Rose", "Jasmine Sambac"],
    baseNotes: ["Tonka Bean", "Vanilla", "Cedar", "Peru Balsam"],
    description: "Søt kirsebær-mandel, dekadent. Mye kopiert luksusduft."
  },
  {
    id: "lattafa-eclaire", name: "Eclaire", house: "Lattafa", concentration: "EdP",
    gender: "Feminine", year: 2023, priceClass: "budget", dupeOf: "tf-lost-cherry",
    accords: ["sweet", "cherry", "gourmand", "vanilla"],
    topNotes: ["Cherry", "Almond"],
    heartNotes: ["Caramel", "Rose"],
    baseNotes: ["Vanilla", "Tonka Bean"],
    description: "Rimelig Lost Cherry-aktig kirsebær-gourmand."
  },
  {
    id: "tf-fucking-fabulous", name: "Fucking Fabulous", house: "Tom Ford", concentration: "EdP",
    gender: "Unisex", year: 2017, priceClass: "luxury", dupeOf: null,
    accords: ["leather", "amber", "aromatic", "vanilla"],
    topNotes: ["Clary Sage", "Lavender", "Almond"],
    heartNotes: ["Leather", "Orris"],
    baseNotes: ["Tonka Bean", "Vanilla", "Amber"],
    description: "Mykt lær og mandel. Sofistikert og kontroversielt navngitt."
  },
  {
    id: "creed-green-irish-tweed", name: "Green Irish Tweed", house: "Creed", concentration: "EdP",
    gender: "Masculine", year: 1985, priceClass: "luxury", dupeOf: null,
    accords: ["green", "fresh", "woody", "floral"],
    topNotes: ["Lemon Verbena", "Iris"],
    heartNotes: ["Violet Leaf", "Iris"],
    baseNotes: ["Sandalwood", "Ambergris"],
    description: "Grønn, frisk gentlemann-klassiker. Referanseduft i mange tiår."
  },
  {
    id: "davidoff-cool-water", name: "Cool Water", house: "Davidoff", concentration: "EdT",
    gender: "Masculine", year: 1988, priceClass: "budget", dupeOf: "creed-green-irish-tweed",
    accords: ["aromatic", "fresh", "aquatic", "woody"],
    topNotes: ["Sea Water", "Mint", "Lavender"],
    heartNotes: ["Geranium", "Sandalwood", "Neroli"],
    baseNotes: ["Musk", "Cedar", "Tobacco", "Amber"],
    description: "Rimelig, frisk-akvatisk 80-tallsklassiker. Ofte kalt budsjett-GIT."
  },
  {
    id: "versace-dylan-blue", name: "Dylan Blue", house: "Versace", concentration: "EdT",
    gender: "Masculine", year: 2016, priceClass: "mid", dupeOf: null,
    accords: ["aromatic", "fresh", "woody", "amber"],
    topNotes: ["Bergamot", "Grapefruit", "Fig Leaf"],
    heartNotes: ["Violet Leaf", "Black Pepper", "Patchouli"],
    baseNotes: ["Musk", "Tonka Bean", "Incense", "Saffron"],
    description: "Frisk-aromatisk allsidig maskulin. Stor bestselger."
  },
  {
    id: "dior-miss-dior", name: "Miss Dior", house: "Dior", concentration: "EdP",
    gender: "Feminine", year: 2021, priceClass: "luxury", dupeOf: null,
    accords: ["floral", "sweet", "fruity", "rose"],
    topNotes: ["Iris", "Peony"],
    heartNotes: ["Rose", "Lily-of-the-Valley"],
    baseNotes: ["Musk", "Rosewood"],
    description: "Romantisk rose-blomstret. Klassisk feminin storselger."
  },
  {
    id: "marc-jacobs-daisy", name: "Daisy", house: "Marc Jacobs", concentration: "EdT",
    gender: "Feminine", year: 2007, priceClass: "mid", dupeOf: null,
    accords: ["floral", "fresh", "fruity", "white floral"],
    topNotes: ["Wild Strawberry", "Violet Leaf", "Grapefruit"],
    heartNotes: ["Violet", "Jasmine", "Gardenia"],
    baseNotes: ["Musk", "Vanilla", "White Woods"],
    description: "Lett, ungdommelig blomstret. Populær hverdagsduft."
  },
  {
    id: "ariana-grande-cloud", name: "Cloud", house: "Ariana Grande", concentration: "EdP",
    gender: "Feminine", year: 2018, priceClass: "budget", dupeOf: null,
    accords: ["sweet", "gourmand", "creamy", "vanilla"],
    topNotes: ["Lavender", "Pear", "Bergamot"],
    heartNotes: ["Whipped Cream", "Praline", "Coconut"],
    baseNotes: ["Vanilla", "Musk", "Woods"],
    description: "Søt kremet gourmand til lav pris. Enorm hit blant unge."
  },
  {
    id: "glossier-you", name: "You", house: "Glossier", concentration: "EdP",
    gender: "Unisex", year: 2017, priceClass: "mid", dupeOf: null,
    accords: ["musky", "warm spicy", "powdery", "woody"],
    topNotes: ["Pink Pepper", "Ambrette"],
    heartNotes: ["Iris", "Ambrox"],
    baseNotes: ["Musk", "Sandalwood"],
    description: "Hudnær, personlig moskus. Kult «skin scent»-fenomen."
  },
  {
    id: "jpg-scandal", name: "Scandal", house: "Jean Paul Gaultier", concentration: "EdP",
    gender: "Feminine", year: 2017, priceClass: "mid", dupeOf: null,
    accords: ["sweet", "honey", "floral", "gourmand"],
    topNotes: ["Blood Orange", "Mandarin"],
    heartNotes: ["Honey", "Gardenia", "Jasmine"],
    baseNotes: ["Caramel", "Patchouli", "Licorice"],
    description: "Søt honning-gourmand. Populær moderne feminin."
  },
  {
    id: "hermes-terre", name: "Terre d'Hermès", house: "Hermès", concentration: "EdT",
    gender: "Masculine", year: 2006, priceClass: "luxury", dupeOf: null,
    accords: ["woody", "citrus", "mineral", "earthy"],
    topNotes: ["Orange", "Grapefruit"],
    heartNotes: ["Pepper", "Geranium"],
    baseNotes: ["Vetiver", "Cedar", "Benzoin"],
    description: "Jordnær sitrus-vetiver. Sofistikert moderne klassiker."
  },
  {
    id: "chanel-allure-homme-sport", name: "Allure Homme Sport", house: "Chanel", concentration: "EdT",
    gender: "Masculine", year: 2004, priceClass: "luxury", dupeOf: null,
    accords: ["citrus", "fresh", "woody", "aromatic"],
    topNotes: ["Orange", "Sea Notes", "Aldehydes"],
    heartNotes: ["Pepper", "Cedar", "Neroli"],
    baseNotes: ["Tonka Bean", "White Musk", "Vetiver", "Amber"],
    description: "Frisk, sporty sitrus-musk. Allsidig hverdagsduft."
  },
  {
    id: "armani-stronger-with-you", name: "Stronger With You", house: "Emporio Armani", concentration: "EdT",
    gender: "Masculine", year: 2017, priceClass: "mid", dupeOf: null,
    accords: ["sweet", "warm spicy", "vanilla", "chestnut"],
    topNotes: ["Cardamom", "Pink Pepper", "Violet"],
    heartNotes: ["Sage", "Cinnamon"],
    baseNotes: ["Vanilla", "Chestnut", "Tonka Bean"],
    description: "Søt kastanje-vanilje krydret. Populær date-duft."
  },
  {
    id: "pdm-pegasus", name: "Pegasus", house: "Parfums de Marly", concentration: "EdP",
    gender: "Masculine", year: 2011, priceClass: "luxury", dupeOf: null,
    accords: ["almond", "vanilla", "sweet", "aromatic"],
    topNotes: ["Bergamot", "Cumin"],
    heartNotes: ["Heliotrope", "Bitter Almond", "Lavender"],
    baseNotes: ["Vanilla", "Sandalwood", "Tonka Bean"],
    description: "Kremet mandel-vanilje. En av husets største favoritter."
  },
  {
    id: "initio-oud-for-greatness", name: "Oud for Greatness", house: "Initio", concentration: "EdP",
    gender: "Unisex", year: 2018, priceClass: "luxury", dupeOf: null,
    accords: ["oud", "woody", "aromatic", "saffron"],
    topNotes: ["Saffron", "Nutmeg", "Lavender"],
    heartNotes: ["Oud", "Patchouli"],
    baseNotes: ["Musk", "Marine Notes"],
    description: "Kraftig saffran-oud. Sterk niche-favoritt."
  },
  {
    id: "lattafa-asad-zukhruf", name: "Asad Zukhruf", house: "Lattafa", concentration: "EdP",
    gender: "Masculine", year: 2023, priceClass: "budget", dupeOf: "initio-oud-for-greatness",
    accords: ["oud", "saffron", "woody", "sweet"],
    topNotes: ["Saffron", "Nutmeg"],
    heartNotes: ["Oud", "Patchouli"],
    baseNotes: ["Musk", "Amber"],
    description: "Rimelig Oud for Greatness-aktig. Sterk budsjett-oud."
  },
  {
    id: "nishane-hacivat", name: "Hacivat", house: "Nishane", concentration: "Extrait",
    gender: "Unisex", year: 2017, priceClass: "luxury", dupeOf: null,
    accords: ["fruity", "woody", "fresh", "green"],
    topNotes: ["Pineapple", "Grapefruit", "Bergamot"],
    heartNotes: ["Patchouli", "Cedar", "Jasmine"],
    baseNotes: ["Oakmoss", "Musk"],
    description: "Fruktig-treaktig ananas. Ofte sammenlignet med Aventus, men grønnere."
  },
  {
    id: "le-labo-santal-33", name: "Santal 33", house: "Le Labo", concentration: "EdP",
    gender: "Unisex", year: 2011, priceClass: "luxury", dupeOf: null,
    accords: ["woody", "leather", "musky", "aromatic"],
    topNotes: ["Cardamom", "Iris", "Violet"],
    heartNotes: ["Sandalwood", "Papyrus"],
    baseNotes: ["Leather", "Cedar", "Amber"],
    description: "Kremet sandeltre-lær. Ikonisk «hipster»-signaturduft."
  },
  {
    id: "zara-bohemian-oud", name: "Bohemian Oud Saffron", house: "Zara", concentration: "EdP",
    gender: "Unisex", year: 2021, priceClass: "budget", dupeOf: "mfk-baccarat-rouge-540",
    accords: ["sweet", "amber", "saffron", "woody"],
    topNotes: ["Saffron", "Jasmine"],
    heartNotes: ["Amberwood", "Cedar"],
    baseNotes: ["Fir Resin", "Musk"],
    description: "Rimelig BR540-aktig fra Zara. Kjent budsjettfunn."
  },
  {
    id: "burberry-her", name: "Her", house: "Burberry", concentration: "EdP",
    gender: "Feminine", year: 2018, priceClass: "mid", dupeOf: null,
    accords: ["fruity", "sweet", "gourmand", "berry"],
    topNotes: ["Blackberry", "Blackcurrant", "Raspberry"],
    heartNotes: ["Violet", "Jasmine"],
    baseNotes: ["Musk", "Amber", "Vanilla"],
    description: "Fruktig bær-gourmand. Populær ung feminin."
  },
  {
    id: "prada-paradoxe", name: "Paradoxe", house: "Prada", concentration: "EdP",
    gender: "Feminine", year: 2022, priceClass: "mid", dupeOf: null,
    accords: ["floral", "musky", "amber", "sweet"],
    topNotes: ["Neroli", "Bergamot"],
    heartNotes: ["Jasmine", "Amber"],
    baseNotes: ["Musk", "Vanilla"],
    description: "Moderne blomstret-moskus. Stor ny feminin satsing."
  },
  {
    id: "dior-fahrenheit", name: "Fahrenheit", house: "Dior", concentration: "EdT",
    gender: "Masculine", year: 1988, priceClass: "mid", dupeOf: null,
    accords: ["woody", "floral", "leather", "petrol"],
    topNotes: ["Mandarin", "Hawthorn", "Nutmeg"],
    heartNotes: ["Violet", "Carnation", "Jasmine"],
    baseNotes: ["Leather", "Vetiver", "Musk"],
    description: "Slående bensin-fiol klassiker. Helt egen signatur."
  },
  {
    id: "valentino-born-in-roma-donna", name: "Donna Born in Roma", house: "Valentino", concentration: "EdP",
    gender: "Feminine", year: 2019, priceClass: "mid", dupeOf: null,
    accords: ["floral", "vanilla", "sweet", "woody"],
    topNotes: ["Blackcurrant", "Jasmine"],
    heartNotes: ["Jasmine", "Bourbon Vanilla"],
    baseNotes: ["Vanilla", "Guaiac Wood"],
    description: "Blomstret vanilje, moderne. Populær feminin motpart til herreversjonen."
  },
  {
    id: "kayali-vanilla-28", name: "Vanilla 28", house: "Kayali", concentration: "EdP",
    gender: "Feminine", year: 2018, priceClass: "mid", dupeOf: null,
    accords: ["vanilla", "sweet", "gourmand", "amber"],
    topNotes: ["Brown Sugar", "Jasmine"],
    heartNotes: ["Vanilla", "Tonka Bean"],
    baseNotes: ["Musk", "Amber", "Vanilla"],
    description: "Rik søt vanilje-gourmand. Viral TikTok-favoritt."
  },
  {
    id: "tomford-ombre-leather", name: "Ombéré Leather", house: "Tom Ford", concentration: "EdP",
    gender: "Unisex", year: 2018, priceClass: "luxury", dupeOf: null,
    accords: ["leather", "floral", "woody", "spicy"],
    topNotes: ["Cardamom"],
    heartNotes: ["Leather", "Jasmine Sambac"],
    baseNotes: ["Patchouli", "Amber", "Moss"],
    description: "Mykt, fyldig lær med blomster. Allsidig unisex-lær."
  },
  {
    id: "ysl-myslf", name: "MYSLF", house: "Yves Saint Laurent", concentration: "EdP",
    gender: "Masculine", year: 2023, priceClass: "mid", dupeOf: null,
    accords: ["floral", "woody", "musky", "fresh"],
    topNotes: ["Bergamot"],
    heartNotes: ["Orange Blossom"],
    baseNotes: ["Patchouli", "Ambrette", "Woody Notes"],
    description: "Moderne blomstret-treaktig maskulin. Stor ny YSL-lansering."
  }
];
