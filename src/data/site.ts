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
  hours: "Mo – Fr: 07:00 – 17:00 Uhr",
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
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

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
    title: "Erd- & Tiefbau",
    short: "Aushub, Verbau und Erdbewegung für jedes Bauvorhaben.",
    description:
      "Vom Baugrubenaushub über Bodenaustausch bis zur Verfüllung und Verdichtung – wir schaffen die tragfähige Grundlage für Ihr Projekt. Mit modernem Maschinenpark und erfahrenen Maschinisten.",
    bullets: ["Baugruben & Fundamentaushub", "Bodenaustausch & Verfüllung", "Planum & Verdichtung", "Kanal- & Leitungsgräben"],
    icon: "excavator",
  },
  {
    slug: "grundleitungen",
    title: "Grundleitungen & Nahwärme",
    short: "Leitungsbau und Versorgungstrassen für Neubauprojekte.",
    description:
      "Fachgerechte Verlegung von Grund- und Hausanschlussleitungen sowie kompletter Nahwärmeversorgung – inklusive Anschluss an die Versorgungstrasse, in enger Abstimmung mit Generalunternehmern.",
    bullets: ["Grund- & Hausanschlussleitungen", "Nahwärmeversorgung", "Anschluss an Versorgungstrassen", "Dichtheitsprüfung & Abnahme"],
    icon: "pipe",
  },
  {
    slug: "rohbau",
    title: "Rohbau & Hochbau",
    short: "Vom Fundament bis zum schlüsselfertigen Geschossbau.",
    description:
      "Mauerwerk, tragende Konstruktionen, Decken und kompletter Geschossbau für Wohn- und Gewerbeimmobilien – fachgerecht, termintreu und aus einer Hand.",
    bullets: ["Mauerwerk & tragende Wände", "Decken & Geschossbau", "Wohn- & Gewerbeimmobilien", "Schlüsselfertiger Ausbau"],
    icon: "building",
  },
  {
    slug: "stahlbetonbau",
    title: "Stahlbetonbau",
    short: "Bewehrung, Schalung und Betonage normkonform ausgeführt.",
    description:
      "Fundamente, Decken, Stützen und Wände – wir setzen tragende Stahlbetonkonstruktionen fachgerecht und normkonform um. Präzise Schalung, saubere Bewehrung, dichte Betonage.",
    bullets: ["Fundamente & Bodenplatten", "Schalung & Bewehrung", "Stützen, Wände & Decken", "Normkonforme Betonage"],
    icon: "rebar",
  },
  {
    slug: "industriebau",
    title: "Industrie- & Gewerbebau",
    short: "Erdbau und Außenanlagen für Industrieobjekte.",
    description:
      "Pflasterarbeiten, Fundamente, Außenanlagen und erdbaurelevante Leistungen für Industrie- und Gewerbeobjekte – belastbar geplant und robust ausgeführt.",
    bullets: ["Fundamente & Bodenplatten", "Pflaster- & Außenanlagen", "Erschließung", "Schwerlastflächen"],
    icon: "industry",
  },
  {
    slug: "galabau",
    title: "Garten- & Landschaftsbau",
    short: "Außenanlagen, Pflasterarbeiten und Geländemodellierung.",
    description:
      "Gestaltung von Außenanlagen, Pflasterarbeiten, Bepflanzung und Geländemodellierung. Wir machen aus dem Gelände rund um Ihr Gebäude einen fertigen, gepflegten Raum.",
    bullets: ["Pflaster- & Wegebau", "Geländemodellierung", "Bepflanzung & Grünflächen", "Einfassungen & Mauern"],
    icon: "tree",
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
    text: "Vom Erdbau bis zum Rohbau – ein Ansprechpartner für Ihr gesamtes Projekt. Keine Schnittstellenverluste, klare Verantwortung.",
  },
  {
    no: "02",
    title: "Erfahrene Geschäftsführung",
    text: "Über 35 Jahre geballte Branchenerfahrung in der Führungsebene – von Tag eins an. Wir wissen, worauf es auf der Baustelle ankommt.",
  },
  {
    no: "03",
    title: "Faire & transparente Preise",
    text: "Detaillierte Kostenaufstellungen ohne versteckte Kosten. Sie wissen jederzeit, wofür Sie zahlen.",
  },
  {
    no: "04",
    title: "Flexibel & deutschlandweit",
    text: "Hauptsitz in Butzbach, einsatzbereit in ganz Deutschland. Kurze Reaktionszeiten und verlässliche Termintreue.",
  },
];

export const projects = [
  {
    slug: "duesseldorf-muensterer-strasse",
    status: "Laufendes Projekt",
    title: "Neubau Düsseldorf – Münsterer Straße",
    client: "Köster GmbH",
    location: "Düsseldorf",
    image: "/img/projekt-duesseldorf.jpeg",
    summary:
      "Ausführung der Grundleitungen sowie der kompletten Nahwärmeversorgung für ein neues Bauvorhaben in Düsseldorf.",
    description:
      "Tiefbauleistungen, Leitungsbau und Anschluss an die Versorgungstrasse – termintreu und in enger Abstimmung mit dem Generalunternehmer.",
    tags: ["Tiefbau", "Grundleitungen", "Nahwärme", "Neubau"],
  },
];
