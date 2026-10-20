import { US_STATES } from "./states";
import imagePools from "./image_pools.json";

export type ListingType = "rent" | "sale";
export type PropertyType =
  | "Single Family"
  | "Townhouse"
  | "Condo"
  | "Apartment"
  | "Villa"
  | "Cottage"
  | "Loft"
  | "Ranch";

export interface Agent {
  name: string;
  title: string;
  phone: string;
  email: string;
  initials: string;
}

export interface House {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  stateName: string;
  zip: string;
  price: number;
  listingType: ListingType;
  propertyType: PropertyType;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: number;
  yearBuilt: number;
  garage: number;
  description: string;
  features: string[];
  images: string[];
  agent: Agent;
  featured: boolean;
  latitude: number;
  longitude: number;
  available: string;
  status: "Available" | "Pending" | "New";
}

// Image pools grouped by category
type ImagePools = Record<string, string[]>;
const POOLS: ImagePools = imagePools as ImagePools;

// All exterior image pools we can pick from for the main house photo
const EXTERIOR_POOL_KEYS = [
  "modern_family_exterior",
  "suburban_exterior",
  "luxury_villa",
  "condo_building",
  "cottage",
  "ranch",
  "townhouse",
  "glass_house",
  "a_frame",
  "beach_house",
  "lakefront",
  "mountain_house",
  "house_entry",
  "balcony",
  "house_garage",
];

const INTERIOR_POOL_KEYS = [
  "interior_living",
  "interior_kitchen",
  "interior_bedroom",
  "interior_bathroom",
  "interior_dining",
  "interior_office",
  "interior_stairs",
  "interior_closet",
  "interior_theater",
];

const OUTDOOR_POOL_KEYS = ["outdoor_yard", "outdoor_pool"];

function flattenPools(keys: string[]): string[] {
  const out: string[] = [];
  for (const k of keys) {
    const arr = POOLS[k];
    if (Array.isArray(arr)) out.push(...arr);
  }
  return out;
}

const EXTERIOR_IMAGES = flattenPools(EXTERIOR_POOL_KEYS);
const INTERIOR_IMAGES = flattenPools(INTERIOR_POOL_KEYS);
const OUTDOOR_IMAGES = flattenPools(OUTDOOR_POOL_KEYS);

// Pick property type from the exterior pool key based on index for some variety
const TYPE_BY_KEY: Record<string, PropertyType> = {
  modern_family_exterior: "Single Family",
  suburban_exterior: "Single Family",
  luxury_villa: "Villa",
  condo_building: "Condo",
  cottage: "Cottage",
  ranch: "Ranch",
  townhouse: "Townhouse",
  glass_house: "Villa",
  a_frame: "Cottage",
  beach_house: "Single Family",
  lakefront: "Single Family",
  mountain_house: "Cottage",
  house_entry: "Single Family",
  balcony: "Apartment",
  house_garage: "Single Family",
};

const CITIES_BY_STATE: Record<string, string[]> = {
  AL: ["Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa"],
  AK: ["Anchorage", "Fairbanks", "Juneau", "Wasilla", "Sitka"],
  AZ: ["Phoenix", "Tucson", "Mesa", "Scottsdale", "Tempe"],
  AR: ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Hot Springs"],
  CA: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose", "Oakland", "Fresno"],
  CO: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Boulder"],
  CT: ["Hartford", "New Haven", "Stamford", "Bridgeport", "Greenwich"],
  DE: ["Wilmington", "Dover", "Newark", "Rehoboth Beach", "Middletown"],
  DC: ["Washington", "Georgetown", "Capitol Hill", "Adams Morgan", "Foggy Bottom"],
  FL: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale", "Naples", "Sarasota"],
  GA: ["Atlanta", "Savannah", "Augusta", "Athens", "Macon"],
  HI: ["Honolulu", "Maui", "Hilo", "Kailua", "Kapolei"],
  ID: ["Boise", "Meridian", "Nampa", "Idaho Falls", "Coeur d'Alene"],
  IL: ["Chicago", "Springfield", "Naperville", "Aurora", "Peoria"],
  IN: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel"],
  IA: ["Des Moines", "Cedar Rapids", "Davenport", "Iowa City", "Ames"],
  KS: ["Wichita", "Topeka", "Kansas City", "Overland Park", "Lawrence"],
  KY: ["Louisville", "Lexington", "Bowling Green", "Covington", "Frankfort"],
  LA: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"],
  ME: ["Portland", "Augusta", "Bangor", "Lewiston", "Bar Harbor"],
  MD: ["Baltimore", "Annapolis", "Rockville", "Frederick", "Bethesda"],
  MA: ["Boston", "Cambridge", "Worcester", "Springfield", "Salem"],
  MI: ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing", "Traverse City"],
  MN: ["Minneapolis", "Saint Paul", "Rochester", "Duluth", "Bloomington"],
  MS: ["Jackson", "Gulfport", "Biloxi", "Oxford", "Hattiesburg"],
  MO: ["Kansas City", "St. Louis", "Springfield", "Columbia", "Jefferson City"],
  MT: ["Billings", "Missoula", "Bozeman", "Helena", "Great Falls"],
  NE: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"],
  NV: ["Las Vegas", "Reno", "Henderson", "Carson City", "Sparks"],
  NH: ["Manchester", "Nashua", "Concord", "Portsmouth", "Hanover"],
  NJ: ["Newark", "Jersey City", "Trenton", "Princeton", "Atlantic City"],
  NM: ["Albuquerque", "Santa Fe", "Las Cruces", "Roswell", "Taos"],
  NY: ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse", "Brooklyn"],
  NC: ["Charlotte", "Raleigh", "Asheville", "Greensboro", "Wilmington"],
  ND: ["Fargo", "Bismarck", "Grand Forks", "Minot", "Mandan"],
  OH: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
  OK: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond"],
  OR: ["Portland", "Eugene", "Salem", "Bend", "Medford"],
  PA: ["Philadelphia", "Pittsburgh", "Harrisburg", "Allentown", "Bethlehem"],
  RI: ["Providence", "Newport", "Warwick", "Cranston", "Pawtucket"],
  SC: ["Charleston", "Columbia", "Greenville", "Myrtle Beach", "Spartanburg"],
  SD: ["Sioux Falls", "Rapid City", "Pierre", "Aberdeen", "Brookings"],
  TN: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Franklin"],
  TX: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "Plano", "El Paso"],
  UT: ["Salt Lake City", "Provo", "Park City", "Ogden", "St. George"],
  VT: ["Burlington", "Montpelier", "Stowe", "Rutland", "Brattleboro"],
  VA: ["Richmond", "Virginia Beach", "Arlington", "Alexandria", "Charlottesville"],
  WA: ["Seattle", "Spokane", "Tacoma", "Bellevue", "Olympia"],
  WV: ["Charleston", "Morgantown", "Huntington", "Wheeling", "Harpers Ferry"],
  WI: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Eau Claire"],
  WY: ["Cheyenne", "Casper", "Jackson Hole", "Laramie", "Cody"],
};

const STREET_NAMES = [
  "Maple Avenue", "Oak Street", "Cedar Lane", "Elm Street", "Pine Drive",
  "Sunset Boulevard", "Park Avenue", "Washington Street", "Lake View Drive",
  "River Road", "Hill Crest Lane", "Forest Drive", "Meadow Lane",
  "Garden Street", "Highland Avenue", "Birch Lane", "Willow Court",
  "Cherry Street", "Aspen Drive", "Magnolia Avenue", "Rosewood Lane",
  "Brookside Drive", "Heritage Lane", "Eagle Ridge Road", "Sycamore Street",
  "Hickory Lane", "Jasmine Court", "Chestnut Street", "Holly Drive",
  "Linden Avenue", "Juniper Lane", "Cottonwood Drive", "Hawthorn Lane",
];

const PROPERTY_TYPES_FALLBACK: PropertyType[] = [
  "Single Family", "Townhouse", "Condo", "Apartment", "Villa", "Cottage", "Loft", "Ranch",
];

const FEATURES_POOL = [
  "Central Air Conditioning", "Hardwood Floors", "Granite Countertops", "Stainless Steel Appliances",
  "Walk-in Closets", "Fireplace", "Two-Car Garage", "Spacious Backyard",
  "Swimming Pool", "Smart Home System", "Solar Panels", "Energy Efficient Windows",
  "Open Concept Layout", "Vaulted Ceilings", "Bay Windows", "Skylights", "Walk-in Pantry",
  "Master Suite", "En-Suite Bathroom", "Walk-in Shower", "Soaking Tub", "Double Vanity",
  "Modern Kitchen", "Kitchen Island", "Wine Cooler", "Outdoor Kitchen", "Deck/Patio",
  "Landscaped Garden", "Fenced Yard", "Sprinkler System", "Storage Shed", "Finished Basement",
  "Laundry Room", "Mudroom", "Home Office", "Bonus Room", "Crown Molding",
  "Recessed Lighting", "Ceiling Fans", "Tankless Water Heater", "Smart Thermostat",
  "Security System", "Smoke Detectors", "Carbon Monoxide Detectors", "EV Charging Station",
];

const AGENTS: Agent[] = [
  { name: "Sarah Mitchell", title: "Senior Real Estate Agent", phone: "(212) 555-0142", email: "sarah.mitchell@estateusa.com", initials: "SM" },
  { name: "James Carter", title: "Property Consultant", phone: "(310) 555-0188", email: "james.carter@estateusa.com", initials: "JC" },
  { name: "Emily Rodriguez", title: "Luxury Specialist", phone: "(312) 555-0167", email: "emily.rodriguez@estateusa.com", initials: "ER" },
  { name: "Michael Chen", title: "Residential Agent", phone: "(415) 555-0123", email: "michael.chen@estateusa.com", initials: "MC" },
  { name: "Jessica Williams", title: "Sales Associate", phone: "(617) 555-0199", email: "jessica.williams@estateusa.com", initials: "JW" },
  { name: "David Thompson", title: "Broker Associate", phone: "(206) 555-0156", email: "david.thompson@estateusa.com", initials: "DT" },
  { name: "Amanda Foster", title: "Relocation Specialist", phone: "(503) 555-0177", email: "amanda.foster@estateusa.com", initials: "AF" },
  { name: "Robert Garcia", title: "Property Advisor", phone: "(404) 555-0134", email: "robert.garcia@estateusa.com", initials: "RG" },
];

// Deterministic pseudo-random
function seedRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function pickMany<T>(arr: T[], count: number, rand: () => number): T[] {
  const result: T[] = [];
  const used = new Set<number>();
  while (result.length < count && used.size < arr.length) {
    const idx = Math.floor(rand() * arr.length);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
}

function zipCode(rand: () => number): string {
  const n = Math.floor(10000 + rand() * 89999);
  return n.toString().padStart(5, "0");
}

// Pick a pool key (and thus property type) deterministically per house index
function pickExteriorKey(index: number): string {
  const keys = EXTERIOR_POOL_KEYS.filter((k) => POOLS[k] && POOLS[k].length > 0);
  if (keys.length === 0) return "listing_exterior";
  return keys[index % keys.length];
}

// State center coordinates (approximate)
const STATE_COORDS: Record<string, [number, number]> = {
  AL: [32.6, -86.8], AK: [61.4, -152.3], AZ: [33.7, -111.9], AR: [34.8, -92.4],
  CA: [36.7, -119.4], CO: [38.9, -105.6], CT: [41.5, -72.7], DE: [39.0, -75.5],
  DC: [38.9, -77.0], FL: [27.8, -81.7], GA: [32.7, -83.4], HI: [20.5, -157.0],
  ID: [43.7, -114.4], IL: [40.0, -89.2], IN: [40.1, -86.3], IA: [41.9, -93.3],
  KS: [38.5, -98.0], KY: [37.5, -85.3], LA: [30.8, -92.0], ME: [45.2, -69.0],
  MD: [38.8, -77.2], MA: [42.2, -71.5], MI: [44.2, -84.5], MN: [45.9, -94.2],
  MS: [32.7, -89.5], MO: [38.3, -92.5], MT: [46.9, -109.5], NE: [41.5, -99.8],
  NV: [39.4, -116.9], NH: [43.4, -71.6], NJ: [40.1, -74.5], NM: [34.4, -106.0],
  NY: [42.5, -75.5], NC: [35.5, -79.2], ND: [47.5, -100.5], OH: [40.2, -82.7],
  OK: [35.5, -97.5], OR: [44.0, -120.5], PA: [40.9, -77.5], RI: [41.7, -71.5],
  SC: [34.0, -81.0], SD: [44.0, -100.0], TN: [35.8, -86.3], TX: [31.5, -98.5],
  UT: [39.5, -111.5], VT: [44.0, -72.7], VA: [37.5, -78.5], WA: [47.4, -121.0],
  WV: [38.5, -80.5], WI: [44.0, -89.5], WY: [43.0, -107.5],
};

const PREMIUM_STATES = ["CA", "NY", "HI", "MA", "WA", "DC", "NJ", "CT", "MD", "CO", "FL"];

function generateHouse(index: number): House {
  const rand = seedRandom(index * 7919 + 13);
  const state = US_STATES[index % US_STATES.length];
  const cities = CITIES_BY_STATE[state.code] || [state.capital];
  const city = pick(cities, rand);
  const street = `${Math.floor(100 + rand() * 9899)} ${pick(STREET_NAMES, rand)}`;

  // Pick an exterior key (and thus property type)
  const exteriorKey = pickExteriorKey(index);
  const exteriorPool = POOLS[exteriorKey] || EXTERIOR_IMAGES;
  const propertyType: PropertyType = TYPE_BY_KEY[exteriorKey] || pick(PROPERTY_TYPES_FALLBACK, rand);

  // In some cases, override to Apartment for variety when condo_building
  const listingType: ListingType = rand() > 0.45 ? "sale" : "rent";

  const beds = 1 + Math.floor(rand() * 5);
  const baths = Math.max(1, Math.min(beds, Math.floor(rand() * beds) + 1));
  const sqft = 800 + Math.floor(rand() * 3500);
  const yearBuilt = 1950 + Math.floor(rand() * 74);
  const lotSize = sqft + 500 + Math.floor(rand() * 8000);
  const garage = Math.floor(rand() * 3);

  const premiumMultiplier = PREMIUM_STATES.includes(state.code) ? 1.5 : 1;
  // Price caps per the platform's policy:
  //   - Rentals: never above $4,000 / month — wide spread from ~$100 to $4,000
  //   - Sales:   never above $200,000 — wide spread from ~$1,500 to $200,000
  // Per-sqft price factors are intentionally wide AND rounded to small
  // increments ($10 for rent, $100 for sale) so almost every listing has
  // a distinct price — no two houses on the site share the same number.
  const RENT_CAP = 4000;
  const SALE_CAP = 200_000;
  let price: number;
  if (listingType === "sale") {
    // Sale per sqft ranges ~$2 to ~$50 (very wide), * premium multiplier,
    // rounded to nearest $100 for distinct-but-realistic prices.
    // Smallest non-premium: 800 sqft * $2 = $1,600
    // Mid-range: 1500 sqft * $25 = $37,500
    // Largest premium: 4300 sqft * $50 * 1.5 = $322,500 → capped at $200,000
    const raw = Math.round((sqft * (2 + rand() * 48) * premiumMultiplier) / 100) * 100;
    price = Math.min(Math.max(raw, 1000), SALE_CAP);
  } else {
    // Rent per sqft ranges ~$0.15 to ~$2.5 (very wide), * premium multiplier,
    // rounded to nearest $10 for distinct-but-realistic prices.
    // Smallest non-premium: 800 sqft * $0.15 ≈ $120/mo
    // Mid-range: 1500 sqft * $1.25 ≈ $1,875/mo
    // Largest premium: 4300 sqft * $2.5 * 1.5 ≈ $16,125/mo → capped at $4,000
    const raw = Math.round((sqft * (0.15 + rand() * 2.35) * premiumMultiplier) / 10) * 10;
    price = Math.min(Math.max(raw, 50), RENT_CAP);
  }

  const featured = rand() < 0.12;
  const status: House["status"] = rand() < 0.15 ? "New" : rand() < 0.25 ? "Pending" : "Available";

  // Build image gallery: pick a DIFFERENT exterior per house using a
  // hash-of-index so consecutive houses in the same category still get
  // distinct main photos. Then add 4-5 interiors + 1 outdoor + 1-2
  // extra exteriors from any category for variety.
  const mainImg =
    exteriorPool[(index * 7 + 3) % exteriorPool.length] ||
    EXTERIOR_IMAGES[(index * 11 + 5) % EXTERIOR_IMAGES.length];

  // 4-5 interiors spanning multiple interior categories
  const interiorCount = 4 + Math.floor(rand() * 2);
  const interiors = pickMany(INTERIOR_IMAGES, interiorCount, rand);

  // 1 outdoor
  const outdoor = pickMany(OUTDOOR_IMAGES, 1, rand);

  // 1-2 extra exteriors from ANY exterior category (for variety, not same as main)
  const extraExteriors = pickMany(EXTERIOR_IMAGES, 1 + Math.floor(rand() * 2), rand).filter(
    (u) => u !== mainImg
  );

  const gallery = [mainImg, ...interiors, ...outdoor, ...extraExteriors];
  // Dedupe while preserving order
  const uniqueGallery = Array.from(new Set(gallery));
  // Ensure at least 6 images — top up with shuffled interiors not already in gallery
  let i = 0;
  while (uniqueGallery.length < 6 && i < INTERIOR_IMAGES.length) {
    const candidate = INTERIOR_IMAGES[(index * 3 + i) % INTERIOR_IMAGES.length];
    if (!uniqueGallery.includes(candidate)) uniqueGallery.push(candidate);
    i++;
  }

  const agent = pick(AGENTS, rand);
  const features = pickMany(FEATURES_POOL, 7 + Math.floor(rand() * 5), rand);

  const adjective = pick(["Stunning", "Charming", "Beautiful", "Elegant", "Modern", "Spacious", "Immaculate", "Prime"], rand);
  const descriptor = pick([
    "in a quiet neighborhood",
    "with scenic views",
    "near top-rated schools",
    "close to downtown",
    "with easy highway access",
    "near parks and recreation",
    "in a family-friendly community",
    "with waterfront access",
    "on a tree-lined street",
    "near shopping and dining",
  ], rand);
  const description = `${adjective} ${beds}-bed, ${baths}-bath ${propertyType.toLowerCase()} located in ${city}, ${state.name}. This ${sqft.toLocaleString()} sq ft residence features ${descriptor}. The property boasts ${features.slice(0, 3).join(", ").toLowerCase()}, offering both comfort and contemporary style. Built in ${yearBuilt} and meticulously maintained, this home is move-in ready. Schedule a private tour today with our ${agent.title.toLowerCase()} ${agent.name}.`;

  const baseCoord = STATE_COORDS[state.code] || [39.5, -98.5];
  const latOffset = (rand() - 0.5) * 2;
  const lngOffset = (rand() - 0.5) * 2;
  const latitude = baseCoord[0] + latOffset;
  const longitude = baseCoord[1] + lngOffset;

  const availableDate = new Date(2026, 9 + Math.floor(rand() * 3), 1 + Math.floor(rand() * 28));
  const available = availableDate.toISOString().split("T")[0];

  const title = `${adjective} ${beds}-Bed ${propertyType} in ${city}`;

  return {
    id: `H-${index.toString().padStart(4, "0")}`,
    title,
    address: street,
    city,
    state: state.code,
    stateName: state.name,
    zip: zipCode(rand),
    price,
    listingType,
    propertyType,
    beds,
    baths,
    sqft,
    lotSize,
    yearBuilt,
    garage,
    description,
    features,
    images: uniqueGallery,
    agent,
    featured,
    latitude,
    longitude,
    available,
    status,
  };
}

// Generate 320 houses (>300)
const TOTAL_HOUSES = 320;
export const HOUSES: House[] = Array.from({ length: TOTAL_HOUSES }, (_, i) => generateHouse(i + 1));

export function getHouseById(id: string): House | undefined {
  return HOUSES.find((h) => h.id === id);
}

export function getHousesByState(stateCode: string): House[] {
  return HOUSES.filter((h) => h.state === stateCode);
}

export function getFeaturedHouses(limit = 6): House[] {
  const featured = HOUSES.filter((h) => h.featured);
  return featured.slice(0, limit);
}

export function getHousesByListingType(type: ListingType, limit?: number): House[] {
  const filtered = HOUSES.filter((h) => h.listingType === type);
  return limit ? filtered.slice(0, limit) : filtered;
}

export function formatPrice(house: House): string {
  if (house.listingType === "rent") {
    return `$${house.price.toLocaleString()}/mo`;
  }
  if (house.price >= 1_000_000) {
    return `$${(house.price / 1_000_000).toFixed(2)}M`;
  }
  return `$${house.price.toLocaleString()}`;
}

export function getHouseCountByState(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const h of HOUSES) {
    counts[h.state] = (counts[h.state] || 0) + 1;
  }
  return counts;
}
