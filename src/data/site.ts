// Zentrale Firmen- & Seitendaten für RG HOCHBAU & TIEFBAU

export const company = {
  brand: "RG",
  name: "RG Hoch-&Tiefbau GmbH",
  legalName: "RG Hoch-&Tiefbau GmbH",
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
  { label: "Karriere", href: "/karriere" },
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
  { value: "6", suffix: "", label: "Leistungsbereiche, ein Ansprechpartner" },
  { value: "2", suffix: "", label: "Standorte: Butzbach und Münster" },
  { value: "5000", suffix: " m³", label: "Boden in Wolbeck vor Ort aufbereitet statt abgefahren" },
];

export const advantages = [
  {
    no: "01",
    title: "Ein Ansprechpartner",
    text: "Vom Aushub bis zur Rohdecke koordinieren wir alles selbst. Sie haben eine Telefonnummer, nicht fünf.",
  },
  {
    no: "02",
    title: "Chefs auf der Baustelle",
    text: "Manuel Geis und Ulrich Rudolf sind selbst vor Ort. Entscheidungen fallen da, wo gebaut wird – nicht erst nach drei Telefonaten.",
  },
  {
    no: "03",
    title: "Klare Angebote",
    text: "Jede Position nachvollziehbar. Wenn sich etwas ändert, sagen wir es vorher – nicht erst mit der Schlussrechnung.",
  },
  {
    no: "04",
    title: "Butzbach und Münster",
    text: "Zwei Standorte, kurze Wege in Hessen und im Münsterland. Für größere Projekte sind wir auch weiter unterwegs.",
  },
];

export type Partner = {
  name: string;
  trade: string;
  description: string;
  logo: string;
  logoBg: "light" | "dark";
  logoBgColor?: string;
  street?: string;
  zip?: string;
  city?: string;
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
  {
    name: "PERI",
    trade: "Schalung · Gerüst",
    description:
      "Unser Partner für Schalungs- und Gerüsttechnik. Mit PERI-Systemen arbeiten wir auf unseren Baustellen sicher, schnell und wirtschaftlich – vom Fundament bis zur Aufstockung.",
    logo: "/partner/peri.png",
    logoBg: "light",
    website: "https://www.peri.de",
    websiteLabel: "peri.de",
  },
  {
    name: "EDA Encore Data Analytics",
    trade: "KI-Lösungen · Prozessoptimierung",
    description:
      "Unser Dienstleister für KI-Lösungen und Prozessoptimierung in der Industrie. Entwickelt automatisierte Kalkulations- und Controlling-Systeme, mit denen wir unsere Abläufe effizient halten.",
    logo: "/partner/eda.png",
    logoBg: "light",
    website: "https://encore-analytics.de",
    websiteLabel: "encore-analytics.de",
  },
];

export type Membership = {
  name: string;
  short: string;
  logo: string;
};

export const memberships: Membership[] = [
  {
    name: "BVMW – Der Mittelstand",
    short: "Bundesverband mittelständische Wirtschaft",
    logo: "/verbaende/bvmw.png",
  },
  {
    name: "Das Handwerk",
    short: "Die Wirtschaftsmacht. Von nebenan.",
    logo: "/verbaende/das-handwerk.jpg",
  },
  {
    name: "Verband baugewerblicher Unternehmer Hessen e.V.",
    short: "Bauverband Hessen",
    logo: "/verbaende/vbu-hessen.png",
  },
  {
    name: "butzbach aktiv Wirtschaftsförderung e.V.",
    short: "Wirtschaftsförderung Butzbach",
    logo: "/verbaende/butzbach-aktiv.png",
  },
];

export type Project = {
  slug: string;
  status: string;
  title: string;
  client: string;
  location: string;
  period?: string;
  motif?: "hochbau" | "tiefbau" | "site";
  image: string;
  images: string[];
  summary: string;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "grant-immobilien-muenster-erdbau",
    status: "Abgeschlossen",
    title: "Münster-Wolbeck: Erdbauarbeiten für Grant Immobilien",
    client: "Grant Immobilien GmbH",
    location: "Münster-Wolbeck (Amelunxenstraße)",
    period: "Juli 2026 · rund drei Wochen Bauzeit",
    image: "/projekte/grant-immobilien-muenster/01.jpg",
    images: [
      "/projekte/grant-immobilien-muenster/01.jpg",
      "/projekte/grant-immobilien-muenster/02.jpg",
      "/projekte/grant-immobilien-muenster/03.jpg",
      "/projekte/grant-immobilien-muenster/04.jpg",
      "/projekte/grant-immobilien-muenster/05.jpg",
    ],
    summary:
      "Erdbau- und Bodenaufbereitung mit vollständigem Wiedereinbau vor Ort – ressourcenschonend statt Deponie.",
    description:
      "Für den neuen Hallenkomplex der Grant Immobilien GmbH in Münster-Wolbeck haben wir rund 5.000 m³ Erdreich aufbereitet und auf einer Fläche von 5.000 m² wieder fachgerecht eingebaut. Der Boden wurde vor Ort gesiebt und über eine Brechanlage aufbereitet – so blieb das gesamte Material auf der Baustelle und musste nicht abgefahren werden. Das spart LKW-Fahrten, Deponiekosten und CO₂. Recycling-Kies-Konzept gemeinsam mit unserem Partner Gaarmann-Overhaus. Bauzeit rund drei Wochen im Juli 2026.",
    tags: ["Erdbau", "Bodenaufbereitung", "Siebanlage", "Brechanlage", "Nachhaltig", "Recycling"],
  },
  {
    slug: "koester-duesseldorf-nahwaerme",
    status: "Laufendes Projekt",
    title: "Studentenwohnheim Düsseldorf: Nahwärme und Erdbau",
    client: "Köster GmbH",
    location: "Düsseldorf, Vogelsanger Weg",
    period: "April 2026 bis März 2027",
    image: "/projekte/koester/04.jpg",
    images: [
      "/projekte/koester/01.jpg",
      "/projekte/koester/02.jpg",
      "/projekte/koester/03.jpg",
      "/projekte/koester/04.jpg",
      "/projekte/koester/05.jpg",
      "/projekte/koester/06.jpg",
      "/projekte/koester/08.jpg",
      "/projekte/koester/09.jpg",
      "/projekte/koester/10.jpg",
    ],
    summary:
      "Nahwärmeversorgungsleitung und Grundleitungsarbeiten für ein neues Studentenwohnheim am Vogelsanger Weg.",
    description:
      "Verlegung der Nahwärmeversorgungsleitung und Grundleitungsarbeiten auf der Baugrubensohle für ein neues Studentenwohnheim am Vogelsanger Weg in Düsseldorf. Bauherr ist die RS Immo GmbH, ausgeführt in enger Abstimmung mit der Köster GmbH als Generalunternehmer. Auftragsvolumen rund 400.000 Euro. Bauzeit von April 2026 bis voraussichtlich März 2027.",
    tags: ["Tiefbau", "Grundleitungen", "Nahwärme", "Leitungsbau"],
  },
  {
    slug: "rewe-erweiterung",
    status: "Abgeschlossen",
    title: "Neu-Isenburg: Neubau REWE-Markt mit Erweiterung Hochregallager",
    client: "Klebl GmbH",
    location: "Neu-Isenburg (An der Gehspitz 30)",
    period: "Juni 2026 bis August 2026",
    image: "/projekte/rewe-erweiterung/11.jpg",
    images: [
      "/projekte/rewe-erweiterung/11.jpg",
      "/projekte/rewe-erweiterung/01.jpg",
      "/projekte/rewe-erweiterung/02.jpg",
      "/projekte/rewe-erweiterung/03.jpg",
      "/projekte/rewe-erweiterung/04.jpg",
      "/projekte/rewe-erweiterung/05.jpg",
      "/projekte/rewe-erweiterung/06.jpg",
      "/projekte/rewe-erweiterung/07.jpg",
      "/projekte/rewe-erweiterung/08.jpg",
      "/projekte/rewe-erweiterung/09.jpg",
      "/projekte/rewe-erweiterung/10.jpg",
    ],
    summary:
      "Erdarbeiten, Köcherfundamente und Bodenplatten für den Neubau eines REWE-Markts inklusive Erweiterung des angrenzenden Hochregallagers.",
    description:
      "Für den Neubau eines REWE-Marktes mit Erweiterung des angrenzenden Hochregallagers in Neu-Isenburg haben wir die kompletten Erdarbeiten – Aushub- und Anfüllarbeiten – sowie die Herstellung der Köcherfundamente, Bodenplatten und das Anarbeiten der Fertigteilelemente ausgeführt. Auftraggeber war die Klebl GmbH, Bauherr die REWE Group. Auftragsvolumen rund 250.000 Euro. Bauzeit Juni bis August 2026.",
    tags: ["REWE", "Erdarbeiten", "Köcherfundamente", "Bodenplatten", "Fertigteile", "Handelsimmobilie"],
  },
  {
    slug: "koenigstein-umbau-aufstockung",
    status: "Laufendes Projekt",
    title: "Königstein: Umbau und Aufstockung Einfamilienhaus",
    client: "Privater Bauherr",
    location: "Königstein im Taunus, Im Harderheck 40",
    period: "Juni 2026 bis November 2026",
    image: "/projekte/koenigstein/03.jpg",
    images: [
      "/projekte/koenigstein/03.jpg",
      "/projekte/koenigstein/04.jpg",
      "/projekte/koenigstein/05.jpg",
      "/projekte/koenigstein/06.jpg",
      "/projekte/koenigstein/08.jpg",
      "/projekte/koenigstein/09.jpg",
      "/projekte/koenigstein/01.jpg",
      "/projekte/koenigstein/02.jpg",
    ],
    summary:
      "Erd- und Rohbauarbeiten für Umbau, Kellerabdichtung und Aufstockung eines Einfamilienhauses aus den 1960er-Jahren im Harderheck.",
    description:
      "Umbau und Aufstockung eines Einfamilienhauses aus den 1960er-Jahren im Harderheck in Königstein im Taunus. Wir übernehmen die Erdarbeiten inklusive Freigraben des Bestandsgebäudes und bringen eine neue Außenwandabdichtung für den Keller auf. Anschließend folgen die Rohbauarbeiten mit Stahlträgereinbau, Mauerwerksergänzungen sowie die Aufstockung des Dachgeschosses. Herausforderung ist die enge Baustelle mit direkter Nachbarbebauung – logistisch anspruchsvoll, aber sauber machbar. Erdbau, Rohbau und Kellerabdichtung aus einer Hand. Auftragsvolumen rund 150.000 Euro. Bauzeit Juni bis November 2026.",
    tags: ["Erdarbeiten", "Rohbau", "Kellerabdichtung", "Umbau", "Aufstockung", "Bestand", "60er-Jahre"],
  },
  {
    slug: "rs-immo-duesseldorf-wohnanlage",
    status: "Laufendes Projekt",
    title: "Wohnanlage Düsseldorf: Grundleitungen, Rigolen und Schachtbauwerke",
    client: "RS Immo GmbH",
    location: "Düsseldorf",
    motif: "tiefbau",
    image: "/projekte/rs-immo/09.jpg",
    images: [
      "/projekte/rs-immo/09.jpg",
      "/projekte/rs-immo/01.jpg",
      "/projekte/rs-immo/07.jpg",
      "/projekte/rs-immo/10.jpg",
      "/projekte/rs-immo/02.jpg",
      "/projekte/rs-immo/06.jpg",
      "/projekte/rs-immo/08.jpg",
      "/projekte/rs-immo/05.jpg",
      "/projekte/rs-immo/03.jpg",
    ],
    summary:
      "Direktauftrag der Bauherrschaft für eine große Wohnanlage in mehreren Bauabschnitten – Grundleitungen, Rigolen, Schachtbauwerke und erweiterte Anfüllarbeiten.",
    description:
      "Für unser bereits laufendes Düsseldorfer Projekt haben wir von der RS Immo GmbH einen Direktauftrag erhalten. Die Leistungen umfassen Grundleitungsarbeiten, Versickerungsrigolen, Schachtbauwerke sowie erweiterte Anfüllarbeiten – über mehrere Bauabschnitte für eine große Wohnanlage. Damit arbeiten wir in Düsseldorf neben der Köster GmbH nun auch im direkten Auftragsverhältnis mit der Bauherrschaft.",
    tags: ["Tiefbau", "Grundleitungen", "Rigolen", "Schachtbauwerke", "Anfüllarbeiten"],
  },
  {
    slug: "kronberg-aufstockung-sanierung",
    status: "Neuer Auftrag",
    title: "Kronberg: Aufstockung und Sanierung Wohnhaus",
    client: "Privater Bauherr",
    location: "Kronberg im Taunus",
    motif: "hochbau",
    image: "/projekte/kronberg/01.jpg",
    images: ["/projekte/kronberg/01.jpg"],
    summary:
      "Aufstockung eines Bestandsgebäudes mit statischer Ertüchtigung der vorhandenen Tragstruktur in Kronberg im Taunus.",
    description:
      "In Kronberg im Taunus wird ein bestehendes Wohnhaus um ein weiteres Geschoss aufgestockt und dabei grundlegend saniert. Bevor die neue Etage entstehen kann, ertüchtigen wir die vorhandene Tragstruktur: Der Bestand wird gezielt dort verstärkt, wo die zusätzlichen Lasten der Aufstockung es erfordern. Bauen im Bestand verlangt saubere Planung, Erfahrung mit älterer Bausubstanz und eine sorgfältige Ausführung – genau das bringen wir mit. So entsteht zusätzlicher Wohnraum auf vorhandener Fläche, ohne neuen Boden zu versiegeln. Abbildung: Visualisierung des geplanten Zustands.",
    tags: ["Aufstockung", "Sanierung", "Statische Ertüchtigung", "Bauen im Bestand", "Rohbau", "Wohnungsbau"],
  },
  {
    slug: "bitterfeld-antennenfeld-gruendung",
    status: "Abgeschlossen",
    title: "Bitterfeld: Gründungs- und Erdarbeiten für Antennenfeld",
    client: "Weltweit tätiges Telekommunikationsunternehmen",
    location: "Bitterfeld",
    period: "Ausführung August 2026",
    motif: "tiefbau",
    image: "/projekte/bitterfeld/01.jpg",
    images: [
      "/projekte/bitterfeld/01.jpg",
      "/projekte/bitterfeld/02.jpg",
      "/projekte/bitterfeld/03.jpg",
      "/projekte/bitterfeld/04.jpg",
    ],
    summary:
      "Gründung, Fundamentierung der Antennen und Erdungsanlage für ein neues Antennenfeld in Bitterfeld.",
    description:
      "Für ein neues Antennenfeld eines weltweit tätigen Telekommunikationsunternehmens in Bitterfeld haben wir die kompletten Erd- und Gründungsarbeiten ausgeführt. Umfang: Herstellung von Schottertragschichten, Bodenbewegungen von rund 1.000 m², Fundamentierung der Antennenmasten sowie Aufbau der Erdungsanlage. Ausführung im August 2026.",
    tags: ["Erdarbeiten", "Gründung", "Antennenfundamente", "Erdungsanlage", "Schottertragschicht", "Telekommunikation"],
  },
  {
    slug: "alsfeld-lagerhalle-erweiterung",
    status: "Laufendes Projekt",
    title: "Alsfeld: Erweiterung Lagerhalle für W&B Projektportfolio",
    client: "W&B Projektportfolio GmbH",
    location: "Alsfeld, Carl-Zeiss-Straße",
    period: "September 2026 bis Dezember 2026",
    motif: "hochbau",
    image: "/projekte/alsfeld/01.jpg",
    images: [
      "/projekte/alsfeld/01.jpg",
      "/projekte/alsfeld/02.jpg",
      "/projekte/alsfeld/03.jpg",
      "/projekte/alsfeld/04.jpg",
    ],
    summary:
      "Fundamentierung, Mauerwerk aus Kalksandstein und Fertigteildecken für die Erweiterung einer Lagerhalle in Alsfeld.",
    description:
      "Für die W&B Projektportfolio GmbH erweitern wir eine bestehende Lagerhalle in der Carl-Zeiss-Straße in Alsfeld um rund 600 m² Grundfläche. Wir übernehmen die Fundamentierung, das Mauerwerk aus Kalksandstein und den Einbau der Fertigteildecken. Rohbauleistungen aus einer Hand. Bauzeit September bis Dezember 2026.",
    tags: ["Fundamente", "Mauerwerk", "Kalksandstein", "Fertigteildecken", "Rohbau", "Gewerbebau"],
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
