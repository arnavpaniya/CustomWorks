export interface ShippingDetails {
  amount: number;
  distance: number;
  inBangalore: boolean;
  areaName: string;
  message: string;
}

// Dictionary of major Bangalore pincodes and their distance from CustomWorks (MG Road / 560001) in km
const BANGALORE_PINCODES: Record<string, { area: string; distance: number }> = {
  "560001": { area: "MG Road / Shivaji Nagar", distance: 0.5 },
  "560002": { area: "Chickpet / City Market", distance: 3.5 },
  "560003": { area: "Malleshwaram", distance: 5.0 },
  "560004": { area: "Basavanagudi", distance: 6.2 },
  "560005": { area: "Fraser Town / Cox Town", distance: 3.8 },
  "560006": { area: "RT Nagar / JC Nagar", distance: 5.5 },
  "560007": { area: "Vasanth Nagar / Benson Town", distance: 2.2 },
  "560008": { area: "Halasuru / Indiranagar", distance: 3.0 },
  "560009": { area: "Majestic / Kempegowda Bus Station", distance: 4.2 },
  "560010": { area: "Rajajinagar / West of Chord Road", distance: 6.5 },
  "560011": { area: "Jayanagar", distance: 6.0 },
  "560012": { area: "IISc / Yeshwanthpur", distance: 8.0 },
  "560013": { area: "Jalahalli / Vidyaranyapura", distance: 11.5 },
  "560014": { area: "Jalahalli East", distance: 12.0 },
  "560015": { area: "Jalahalli West / PEENYA", distance: 13.5 },
  "560016": { area: "Ramamurthy Nagar / Banaswadi", distance: 9.8 },
  "560017": { area: "HAL / Old Airport Road", distance: 7.5 },
  "560018": { area: "Chamrajpet", distance: 5.2 },
  "560019": { area: "Gavipuram / Hanumanthnagar", distance: 6.0 },
  "560020": { area: "Seshadripuram", distance: 3.2 },
  "560021": { area: "Srirampuram", distance: 4.8 },
  "560022": { area: "Yeshwanthpur Suburb", distance: 8.5 },
  "560023": { area: "Magadi Road / Chord Road", distance: 7.2 },
  "560024": { area: "Hebbal / Ganganagar", distance: 7.8 },
  "560025": { area: "Richmond Town / Langford Town", distance: 1.8 },
  "560026": { area: "Mysore Road / Kasturiba Nagar", distance: 7.0 },
  "560027": { area: "Shanti Nagar / Wilson Garden", distance: 2.8 },
  "560029": { area: "Tavarekere / BTM Layout 1st Stage", distance: 6.8 },
  "560030": { area: "Adugodi / Lakkasandra", distance: 4.5 },
  "560032": { area: "RT Nagar / Dinnur", distance: 5.8 },
  "560033": { area: "Kalyan Nagar / Kammanahalli", distance: 8.2 },
  "560034": { area: "Koramangala 1st-3rd Blocks", distance: 5.8 },
  "560035": { area: "Sarjapur Road / Kaikondrahalli", distance: 12.5 },
  "560036": { area: "KR Puram / Krishnarajapuram", distance: 11.8 },
  "560037": { area: "Marathahalli / Kundalahalli", distance: 12.2 },
  "560038": { area: "Indiranagar 100 Feet Road", distance: 4.5 },
  "560040": { area: "Vijayanagar / RPC Layout", distance: 8.2 },
  "560041": { area: "Jayanagar 4th/9th Blocks", distance: 6.8 },
  "560042": { area: " Shivaji Nagar / Commercial Street", distance: 1.0 },
  "560043": { area: "Banaswadi / Kalyan Nagar", distance: 7.2 },
  "560045": { area: "Arabic College / KG Halli", distance: 6.0 },
  "560047": { area: "Austin Town / Ejipura", distance: 3.2 },
  "560048": { area: "Mahadevapura / Hoodi", distance: 10.5 },
  "560049": { area: "Dooravani Nagar / TC Palya", distance: 11.2 },
  "560050": { area: "Banashankari / Kathriguppe", distance: 8.0 },
  "560051": { area: " Shivaji Nagar / Tasker Town", distance: 1.8 },
  "560052": { area: "High Grounds / Madhavanagar", distance: 2.8 },
  "560053": { area: "Cottonpet / Chickpet", distance: 4.0 },
  "560054": { area: "Mathikere / New BEL Road", distance: 8.2 },
  "560055": { area: "Sadashivanagar", distance: 5.8 },
  "560056": { area: "Bangalore University / Kengeri", distance: 13.8 },
  "560061": { area: "Uttarahalli / Subramanyapura", distance: 12.2 },
  "560064": { area: "Yelahanka New Town", distance: 16.5 },
  "560066": { area: "Whitefield / Varthur", distance: 15.8 },
  "560067": { area: "Kadugodi / Hope Farm", distance: 18.2 },
  "560068": { area: "Bommanahalli / Hosur Road", distance: 8.8 },
  "560070": { area: "Padmanabhanagar", distance: 9.8 },
  "560072": { area: "Nagarabhavi", distance: 11.2 },
  "560075": { area: "Banaswadi / HRBR Layout", distance: 7.8 },
  "560076": { area: "JP Nagar 1st-5th Phases", distance: 8.5 },
  "560078": { area: "JP Nagar 6th-8th Phases", distance: 10.2 },
  "560079": { area: "Basaveshwaranagar", distance: 8.2 },
  "560081": { area: "Kalyan Nagar / Chelekere", distance: 8.5 },
  "560082": { area: "Banashankari 3rd Stage / Hosakerehalli", distance: 9.2 },
  "560085": { area: "Banashankari 3rd Stage", distance: 9.8 },
  "560086": { area: "Rajajinagar 6th Block", distance: 7.0 },
  "560092": { area: "Hebbal / Kempapura", distance: 9.2 },
  "560093": { area: "Kasturi Nagar / Ramamurthy Nagar", distance: 9.0 },
  "560094": { area: "Sanjaynagar / RMV 2nd Stage", distance: 8.0 },
  "560095": { area: "Koramangala 4th-8th Blocks", distance: 6.8 },
  "560096": { area: "Yeshwanthpur Industrial Area", distance: 9.8 },
  "560097": { area: "Vidyaranyapura", distance: 14.2 },
  "560098": { area: "Rajarajeshwari Nagar", distance: 11.8 },
  "560099": { area: "Bommasandra / Jigani", distance: 22.5 },
  "560100": { area: "Electronic City Phase 1", distance: 19.8 },
  "560102": { area: "HSR Layout Sectors 1-7", distance: 9.5 },
  "560103": { area: "Bellandur / Outer Ring Road", distance: 11.8 },
  "560104": { area: "HSR Layout Sector 2", distance: 10.5 },
  "560107": { area: "Soladevanahalli / Chikkabanavara", distance: 18.0 },
};

/**
 * Checks if a given city and pincode represent a location in Bangalore
 */
export function isLocationInBangalore(city: string, pincode: string): boolean {
  const normCity = city.trim().toLowerCase();
  const isBangaloreName = normCity === "bangalore" || normCity === "bengaluru" || normCity.includes("bangalore") || normCity.includes("bengaluru");
  const isBangalorePincode = pincode.trim().startsWith("560") && pincode.trim().length === 6;
  return isBangaloreName || isBangalorePincode;
}

/**
 * Calculates delivery charge based on subtotal, city, and pincode
 */
export function calculateShippingCharge(
  subtotal: number,
  city: string,
  pincode: string
): ShippingDetails {
  const cleanedPincode = pincode.trim().replace(/\s+/g, "");
  const cleanedCity = city.trim();

  const inBangalore = isLocationInBangalore(cleanedCity, cleanedPincode);

  if (!inBangalore) {
    // National delivery
    const amount = subtotal >= 999 ? 0 : 99;
    return {
      amount,
      distance: -1,
      inBangalore: false,
      areaName: cleanedCity || "Outside Bengaluru",
      message: subtotal >= 999 ? "FREE National Shipping" : "Flat Rate National Shipping",
    };
  }

  // Local Bangalore delivery
  let distance = 10.0; // Default fallback distance
  let areaName = "Bengaluru";

  const lookup = BANGALORE_PINCODES[cleanedPincode];
  if (lookup) {
    distance = lookup.distance;
    areaName = lookup.area;
  } else if (cleanedPincode.startsWith("560")) {
    // Estimate distance for unmapped Bangalore pincodes based on numeric suffix
    const suffix = parseInt(cleanedPincode.slice(3)) || 0;
    distance = 8.0 + (suffix % 15); // deterministic distance between 8 and 22 km
    areaName = `Bengaluru (Zone ${cleanedPincode})`;
  }

  // Base charge: ₹40 for first 3 km
  // Surcharge: ₹8 per km after 3 km
  let amount = 40;
  if (distance > 3) {
    amount += Math.round((distance - 3) * 8);
  }

  // Cap at max ₹250 to keep it reasonable
  amount = Math.min(amount, 250);

  return {
    amount,
    distance,
    inBangalore: true,
    areaName,
    message: `Local delivery (${distance.toFixed(1)} km from store)`,
  };
}
