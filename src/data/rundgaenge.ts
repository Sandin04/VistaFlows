// Beispiel-Rundgänge für die Demo. Die Panoramen sind fremde Aufnahmen von
// Poly Haven (Lizenz CC0) und werden immer als Beispiel gekennzeichnet.
// Die Infopunkte zeigen, was in einem echten Rundgang möglich ist.
// Sobald Sandin eigene Aufnahmen hat: Szene hier ergänzen oder ersetzen.

export type Infopunkt = {
  id: string;
  pitch: number;
  yaw: number;
  titel: string;
  text: string;
  cta?: { label: string; href: string };
};

export type Szene = {
  id: string;
  titel: string;
  kurz: string;
  panorama: { gross: string; klein: string };
  poster: string;
  start: { yaw: number; pitch: number; hfov: number };
  /**
   * Nur bei fremden Beispielpanoramen (Poly Haven, CC0): Name, Fotograf, Link.
   * Eigene Aufnahmen ohne „quelle“ eintragen; dann entfallen Beispiel-Hinweis und Fremd-Nachweis.
   */
  quelle?: { name: string; autor: string; url: string };
  infopunkte: Infopunkt[];
};

const anfrage = { label: "Eigenen Rundgang anfragen", href: "/kontakt?paket=rundgang-business" };

export const szenen: Szene[] = [
  {
    id: "cafe",
    titel: "Café",
    kurz: "Gastraum mit Galerie",
    panorama: { gross: "/panoramen/cafe-4096.webp", klein: "/panoramen/cafe-2048.webp" },
    poster: "tour-cafe",
    start: { yaw: 18, pitch: -6, hfov: 104 },
    quelle: { name: "Comfy Café", autor: "Sergej Majboroda", url: "https://polyhaven.com/a/comfy_cafe" },
    infopunkte: [
      {
        id: "cafe-plaetze",
        pitch: -15,
        yaw: 41,
        titel: "Infopunkt: Plätze am Fenster",
        text: "So sieht ein Infopunkt aus: ein kurzer Text genau dort, wo die Frage entsteht. Etwa ob Plätze reserviert werden können oder wie viele Personen an den Tisch passen.",
        cta: anfrage,
      },
      {
        id: "cafe-galerie",
        pitch: 9,
        yaw: -52,
        titel: "Mehrere Standpunkte",
        text: "In einem echten Rundgang führt ein Klick auf die Galerie zum nächsten Standpunkt. Besucher gehen so durch alle Räume, die du zeigen möchtest.",
      },
      {
        id: "cafe-tv",
        pitch: 9,
        yaw: 119,
        titel: "Speisekarte, Video, PDF",
        text: "Infopunkte können mehr als Text: Sie öffnen eine Speisekarte, ein Video oder eine Preisliste, ohne dass jemand die Seite verlassen muss.",
      },
      {
        id: "cafe-anfrage",
        pitch: -4,
        yaw: 68,
        titel: "Anfrage direkt im Rundgang",
        text: "Der wichtigste Infopunkt ist ein Button zur Anfrage oder Reservierung. Er ist sichtbar, während sich Besucher umsehen, und nicht versteckt im Menü.",
        cta: anfrage,
      },
    ],
  },
  {
    id: "hotelzimmer",
    titel: "Hotelzimmer",
    kurz: "Doppelzimmer mit Arbeitsplatz",
    panorama: { gross: "/panoramen/hotelzimmer-4096.webp", klein: "/panoramen/hotelzimmer-2048.webp" },
    poster: "tour-hotelzimmer",
    start: { yaw: 78, pitch: -12, hfov: 110 },
    quelle: { name: "Hotel Room", autor: "Greg Zaal", url: "https://polyhaven.com/a/hotel_room" },
    infopunkte: [
      {
        id: "hotel-bett",
        pitch: -20,
        yaw: 100,
        titel: "Zimmerkategorie",
        text: "Bettgröße, Ausstattung und Preis pro Nacht direkt am Bett. Gäste sehen, was sie buchen, statt eine Liste zu lesen.",
        cta: anfrage,
      },
      {
        id: "hotel-schreibtisch",
        pitch: 8,
        yaw: -65,
        titel: "Ausstattung erklären",
        text: "Schreibtisch, WLAN, Fernseher: Ein Infopunkt ersetzt lange Ausstattungslisten und beantwortet Rückfragen, bevor sie gestellt werden.",
      },
      {
        id: "hotel-fenster",
        pitch: 13,
        yaw: 34,
        titel: "Fragen vor der Buchung",
        text: "„Ist das Zimmer ruhig?“, „Wie ist der Ausblick?“ Solche Fragen beantwortet ein Infopunkt genau dort, wo Gäste hinsehen.",
      },
      {
        id: "hotel-buchen",
        pitch: 9,
        yaw: -133,
        titel: "Direkt buchen",
        text: "Ein Buchungs-Button im Rundgang führt Gäste zur Buchung, solange der Eindruck frisch ist.",
        cta: anfrage,
      },
    ],
  },
];
