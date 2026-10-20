export interface USState {
  code: string;
  name: string;
  capital: string;
  region: "Northeast" | "Midwest" | "South" | "West";
}

export const US_STATES: USState[] = [
  { code: "AL", name: "Alabama", capital: "Montgomery", region: "South" },
  { code: "AK", name: "Alaska", capital: "Juneau", region: "West" },
  { code: "AZ", name: "Arizona", capital: "Phoenix", region: "West" },
  { code: "AR", name: "Arkansas", capital: "Little Rock", region: "South" },
  { code: "CA", name: "California", capital: "Sacramento", region: "West" },
  { code: "CO", name: "Colorado", capital: "Denver", region: "West" },
  { code: "CT", name: "Connecticut", capital: "Hartford", region: "Northeast" },
  { code: "DE", name: "Delaware", capital: "Dover", region: "South" },
  { code: "DC", name: "District of Columbia", capital: "Washington", region: "South" },
  { code: "FL", name: "Florida", capital: "Tallahassee", region: "South" },
  { code: "GA", name: "Georgia", capital: "Atlanta", region: "South" },
  { code: "HI", name: "Hawaii", capital: "Honolulu", region: "West" },
  { code: "ID", name: "Idaho", capital: "Boise", region: "West" },
  { code: "IL", name: "Illinois", capital: "Springfield", region: "Midwest" },
  { code: "IN", name: "Indiana", capital: "Indianapolis", region: "Midwest" },
  { code: "IA", name: "Iowa", capital: "Des Moines", region: "Midwest" },
  { code: "KS", name: "Kansas", capital: "Topeka", region: "Midwest" },
  { code: "KY", name: "Kentucky", capital: "Frankfort", region: "South" },
  { code: "LA", name: "Louisiana", capital: "Baton Rouge", region: "South" },
  { code: "ME", name: "Maine", capital: "Augusta", region: "Northeast" },
  { code: "MD", name: "Maryland", capital: "Annapolis", region: "South" },
  { code: "MA", name: "Massachusetts", capital: "Boston", region: "Northeast" },
  { code: "MI", name: "Michigan", capital: "Lansing", region: "Midwest" },
  { code: "MN", name: "Minnesota", capital: "Saint Paul", region: "Midwest" },
  { code: "MS", name: "Mississippi", capital: "Jackson", region: "South" },
  { code: "MO", name: "Missouri", capital: "Jefferson City", region: "Midwest" },
  { code: "MT", name: "Montana", capital: "Helena", region: "West" },
  { code: "NE", name: "Nebraska", capital: "Lincoln", region: "Midwest" },
  { code: "NV", name: "Nevada", capital: "Carson City", region: "West" },
  { code: "NH", name: "New Hampshire", capital: "Concord", region: "Northeast" },
  { code: "NJ", name: "New Jersey", capital: "Trenton", region: "Northeast" },
  { code: "NM", name: "New Mexico", capital: "Santa Fe", region: "West" },
  { code: "NY", name: "New York", capital: "Albany", region: "Northeast" },
  { code: "NC", name: "North Carolina", capital: "Raleigh", region: "South" },
  { code: "ND", name: "North Dakota", capital: "Bismarck", region: "Midwest" },
  { code: "OH", name: "Ohio", capital: "Columbus", region: "Midwest" },
  { code: "OK", name: "Oklahoma", capital: "Oklahoma City", region: "South" },
  { code: "OR", name: "Oregon", capital: "Salem", region: "West" },
  { code: "PA", name: "Pennsylvania", capital: "Harrisburg", region: "Northeast" },
  { code: "RI", name: "Rhode Island", capital: "Providence", region: "Northeast" },
  { code: "SC", name: "South Carolina", capital: "Columbia", region: "South" },
  { code: "SD", name: "South Dakota", capital: "Pierre", region: "Midwest" },
  { code: "TN", name: "Tennessee", capital: "Nashville", region: "South" },
  { code: "TX", name: "Texas", capital: "Austin", region: "South" },
  { code: "UT", name: "Utah", capital: "Salt Lake City", region: "West" },
  { code: "VT", name: "Vermont", capital: "Montpelier", region: "Northeast" },
  { code: "VA", name: "Virginia", capital: "Richmond", region: "South" },
  { code: "WA", name: "Washington", capital: "Olympia", region: "West" },
  { code: "WV", name: "West Virginia", capital: "Charleston", region: "South" },
  { code: "WI", name: "Wisconsin", capital: "Madison", region: "Midwest" },
  { code: "WY", name: "Wyoming", capital: "Cheyenne", region: "West" },
];

export const REGIONS = ["Northeast", "Midwest", "South", "West"] as const;

export function getStateByCode(code: string): USState | undefined {
  return US_STATES.find((s) => s.code === code);
}

export function getStatesByRegion(region: string): USState[] {
  return US_STATES.filter((s) => s.region === region);
}
