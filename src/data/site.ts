// Zentrale Firmen- & Seitendaten für RG HOCHBAU & TIEFBAU

export const company = {
  brand: "RG",
  name: "RG Hochbau & Tiefbau",
  legalName: "RG Tiefbau GmbH",
  tagline: "Rudolf · Geis",
  city: "Butzbach",
  street: "Große Jahnstraße 11",
  zip: "35510",
  phone: "+49 176 62315466",
  phoneHref: "+4917662315466",
  email: "info@rg-tiefbau.de",
  hours: "Mo bis Fr: 7:00 bis 17:00 Uhr",
  experience: 35,
  managingDirector: "Manuel Geis",
  register: "Amtsgericht Friedberg, HRB 11108",
  vatId: "DE461097601",
  taxNumber: "20 242 62481",
} as const;

export const nav = [
  { label: "Start", href: "/" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Projekte", href: "/projekte" },
  { label: "Aktuelles", href: "/aktuelles" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const social = {
  instagram: "https://www.instagram.com/rg.tiefbau/",
  instagramHandle: "@rg.tiefbau",
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  icon: string; // key referenced in Icon component
};

export const services: Service[] = [
  {
    slug: "erdarbeiten",
    title: "Erdbau und Tiefbau",
    short: "Aushub, Verbau und Erdbewegung für jedes Bauvorhaben.",
    description:
      "Vom Baugrubenaushub über den Bodenaustausch bis zur Verfüllung und Verdichtung. Wir schaffen die tragfähige Grundlage für Ihr Projekt mit modernem Maschinenpark und erfahrenen Maschinisten.",
    bullets: [
      "Baugruben und Fundamentaushub",
      "Bodenaustausch und Verfüllung",
      "Planum und Verdichtung",
      "Kanal- und Leitungsgräben",
    ],
    icon: "excavator",
  },
  {
    slug: "grundleitungen",
    title: "Grundleitungen und Nahwärme",
    short: "Leitungsbau und Versorgungstrassen für Neubauprojekte.",
    description:
      "Fachgerechte Verlegung von Grundleitungen, Hausanschlussleitungen und kompletter Nahwärmeversorgung. Wir schließen Ihren Neubau an die Versorgungstrasse an, in enger Abstimmung mit dem Generalunternehmer.",
    bullets: [
      "Grund- und Hausanschlussleitungen",
      "Nahwärmeversorgung",
      "Anschluss an Versorgungstrassen",
      "Dichtheitsprüfung und Abnahme",
    ],
    icon: "pipe",
  },
  {
    slug: "rohbau",
    title: "Rohbau und Hochbau",
    short: "Vom Fundament bis zum tragenden Geschossbau.",
    description:
      "Mauerwerk, tragende Konstruktionen, Decken und kompletter Geschossbau für Wohn- und Gewerbeimmobilien. Fachgerecht, termintreu und aus einer Hand.",
    bullets: [
      "Mauerwerk und tragende Wände",
      "Decken und Geschossbau",
      "Wohn- und Gewerbeimmobilien",
      "Hochbau bis OK Rohdecke",
    ],
    icon: "building",
  },
  {
    slug: "schluesselfertigbau",
    title: "Schlüsselfertigbau",
    short: "Planung und Ausführung aus einer Hand.",
    description:
      "Wir übernehmen Ihr Bauvorhaben komplett. Von der ersten Planung über die Werkplanung bis zur schlüsselfertigen Übergabe. Ein Ansprechpartner, ein verantwortliches Team. Planung und Ausführung aus einer Hand.",
    bullets: [
      "Planung und Vorbereitung",
      "Werk- und Detailplanung",
      "Gewerkekoordination",
      "Schlüsselfertige Übergabe",
    ],
    icon: "building",
  },
  {
    slug: "stahlbetonbau",
    title: "Stahlbetonbau",
    short: "Bewehrung, Schalung und Betonage normkonform ausgeführt.",
    description:
      "Fundamente, Decken, Stützen und Wände. Wir setzen tragende Stahlbetonkonstruktionen fachgerecht und normkonform um. Präzise Schalung, saubere Bewehrung und dichte Betonage.",
    bullets: [
      "Fundamente und Bodenplatten",
      "Schalung und Bewehrung",
      "Stützen, Wände und Decken",
      "Normkonforme Betonage",
    ],
    icon: "rebar",
  },
  {
    slug: "industriebau",
    title: "Industrie- und Gewerbebau",
    short: "Erdbau und Außenanlagen für Industrieobjekte.",
    description:
      "Pflasterarbeiten, Fundamente, Außenanlagen und erdbaurelevante Leistungen für Industrie- und Gewerbeobjekte. Belastbar geplant und robust ausgeführt.",
    bullets: [
      "Fundamente und Bodenplatten",
      "Pflaster- und Außenanlagen",
      "Erschließung",
      "Schwerlastflächen",
    ],
    icon: "industry",
  },
];

export const stats = [
  { value: "35", suffix: "+", label: "Jahre Erfahrung in der Geschäftsführung" },
  { value: "16", suffix: "", label: "Bundesländer Einsatzgebiet" },
  { value: "6", suffix: "", label: "Gewerke aus einer Hand" },
  { value: "100", suffix: "%", label: "Einsatzbereitschaft" },
];

export const advantages = [
  {
    no: "01",
    title: "Alles aus einer Hand",
    text: "Vom Erdbau bis zum Rohbau, ein Ansprechpartner für Ihr gesamtes Projekt. Keine Schnittstellenverluste, klare Verantwortung.",
  },
  {
    no: "02",
    title: "Erfahrene Geschäftsführung",
    text: "Über 35 Jahre geballte Branchenerfahrung in der Führungsebene, von Tag eins an. Wir wissen, worauf es auf der Baustelle ankommt.",
  },
  {
    no: "03",
    title: "Faire und transparente Preise",
    text: "Detaillierte Kostenaufstellungen ohne versteckte Kosten. Sie wissen jederzeit, wofür Sie zahlen.",
  },
  {
    no: "04",
    title: "Flexibel und deutschlandweit",
    text: "Hauptsitz in Butzbach, einsatzbereit in ganz Deutschland. Kurze Reaktionszeiten und verlässliche Termintreue.",
  },
];

export type Partner = {
  name: string;
  trade: string;
  description: string;
  logo: string;
  logoBg: "light" | "dark";
  logoBgColor?: string;
  street: string;
  zip: string;
  city: string;
  phone?: string;
  phoneHref?: string;
  website?: string;
  websiteLabel?: string;
};

export const partners: Partner[] = [
  {
    name: "Schulze-Steinen Elektrotechnik",
    trade: "Elektrotechnik",
    description:
      "Verlässlicher Partner für sämtliche elektrotechnische Gewerke unserer Bauvorhaben. Von der Erstinstallation bis zur kompletten Gebäudetechnik.",
    logo: "/partner/schulze-steinen.png",
    logoBg: "dark",
    logoBgColor: "#091a2d",
    street: "Pleistermühlenweg 278",
    zip: "48157",
    city: "Münster",
    phone: "+49 251 311599",
    phoneHref: "+49251311599",
    website: "https://schulze-steinen.de",
    websiteLabel: "schulze-steinen.de",
  },
  {
    name: "Grant Immobilien GmbH",
    trade: "Immobilien und Projektentwicklung",
    description:
      "Unser Partner für Immobilien und Projektentwicklung. Gemeinsam realisieren wir Bauvorhaben für private und gewerbliche Auftraggeber.",
    logo: "/partner/grant4you.png",
    logoBg: "light",
    street: "Pleistermühlenweg 278",
    zip: "48157",
    city: "Münster",
    phone: "+49 251 374076-10",
    phoneHref: "+4925137407610",
    website: "https://www.grant4you.de",
    websiteLabel: "grant4you.de",
  },
  {
    name: "Triatic Bau GmbH",
    trade: "Rohbau · Lohnleistung",
    description:
      "Verlässlicher Partner im Rohbau. Unterstützt uns bei Lohnleistungen auf unseren Baustellen mit erfahrenen Teams.",
    logo: "/partner/triatic.png",
    logoBg: "light",
    street: "Hans-Böckler-Straße 5",
    zip: "63128",
    city: "Dietzenbach",
    website: "https://triatic-bau.de",
    websiteLabel: "triatic-bau.de",
  },
  {
    name: "OmniProjekt GmbH",
    trade: "Rohbau · Lohnleistung",
    description:
      "Partner für Rohbauarbeiten im Bereich Lohnleistung. Gemeinsam stemmen wir größere Bauvorhaben mit eingespielten Teams.",
    logo: "/partner/omni.jpg",
    logoBg: "light",
    street: "Heimatstraße 18",
    zip: "63533",
    city: "Mainhausen",
  },
];

export type Project = {
  slug: string;
  status: string;
  title: string;
  client: string;
  location: string;
  period?: string;
  image: string;
  images: string[];
  summary: string;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "rewe-erweiterung-fundamentierung",
    status: "Laufendes Projekt",
    title: "Rewe Erweiterung: Fundamentierung Fertigteilhalle",
    client: "Klebl GmbH",
    location: "Rewe-Standort",
    period: "Seit 01.06. · Fertigstellung Ende Juli geplant",
    image: "/projekte/rewe/02.jpg",
    images: [
      "/projekte/rewe/01.jpg",
      "/projekte/rewe/02.jpg",
      "/projekte/rewe/03.jpg",
    ],
    summary:
      "Großflächige Fundamentierung für die Erweiterung einer Fertigteilhalle am Rewe-Standort.",
    description:
      "Wir setzen die kompletten Köcherfundamente mit großen Bewehrungskörben um, teilweise zwei Meter hoch. Stahlbetonbau in Reihen entlang der Halle, präzise vorbereitet und termintreu in enger Abstimmung mit dem Generalunternehmer.",
    tags: ["Stahlbetonbau", "Köcherfundamente", "Bewehrung", "Industriebau"],
  },
  {
    slug: "koester-duesseldorf-nahwaerme",
    status: "Laufendes Projekt",
    title: "Studentenwohnheim Düsseldorf: Nahwärme und Erdbau",
    client: "Köster GmbH",
    location: "Düsseldorf",
    period: "Laufend",
    image: "/projekte/koester/03.jpg",
    images: [
      "/projekte/koester/01.jpg",
      "/projekte/koester/02.jpg",
      "/projekte/koester/03.jpg",
      "/projekte/koester/04.jpg",
      "/projekte/koester/05.jpg",
    ],
    summary:
      "Nahwärmeversorgungsleitung und Grundleitungsarbeiten für ein neues Studentenwohnheim.",
    description:
      "Verlegung der Nahwärmeversorgungsleitung, Grundleitungsarbeiten auf der Baugrubensohle sowie diverse Kleinarbeiten auf Abruf. Tiefbau- und Leitungsbauleistungen in enger Abstimmung mit der Köster GmbH als Generalunternehmer.",
    tags: ["Tiefbau", "Grundleitungen", "Nahwärme", "Leitungsbau"],
  },
  {
    slug: "bottrop-mauerwerk-kalksandstein",
    status: "Abgeschlossen",
    title: "Bottrop: Kalksandsteinbüro in Lagerhalle",
    client: "Privatauftraggeber",
    location: "Bottrop",
    period: "Abgeschlossen",
    image: "/projekte/bottrop/03.jpg",
    images: [
      "/projekte/bottrop/01.jpg",
      "/projekte/bottrop/02.jpg",
      "/projekte/bottrop/03.jpg",
      "/projekte/bottrop/04.jpg",
    ],
    summary:
      "Mauerwerksarbeiten für einen Bürobereich aus Kalksandstein in einer bestehenden Lagerhalle.",
    description:
      "Errichtung eines kompletten Büroeinbaus aus Kalksandstein innerhalb einer bestehenden Lagerhalle. Tragende Wände, Sturzkonstruktion und Anschluss an die bestehende Hallenstruktur. Sauber ausgeführt und fristgerecht abgeschlossen.",
    tags: ["Mauerwerk", "Kalksandstein", "Hochbau", "Innenausbau"],
  },
];
