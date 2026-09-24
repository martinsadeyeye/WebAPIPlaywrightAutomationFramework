// src/utils/CountryDataResolver.ts
const countryDataMap: Record<string, string> = {
  ug: "uganda.json",
  ke: "kenya.json",
  tz: "tanzania.json",
  rw: "rwanda.json",
  drc: "drc.json",
  ss: "southsudan.json",
};

const schemaDataMap: Record<string, string> = {
  qa: "userSchema.json",
};

export function getCountryDataFilePath(): string {
  const env = process.env.ENV;
  if (!env) {
    throw new Error(
      "ENV variable is not set. Use e.g. ENV=ug npx playwright test ...",
    );
  }

  const fileName = countryDataMap[env];
  if (!fileName) {
    throw new Error(
      `No JSON data file mapped for ENV="${env}". Check countryDataMap.`,
    );
  }

  return `src/testData/${fileName}`;
}

export function getSchemaDataFilePath(): string {
  const env = process.env.ENV;
  if (!env) {
    throw new Error(
      "ENV variable is not set. Use e.g. ENV=qa npx playwright test ...",
    );
  }

  const fileName = schemaDataMap[env];
  if (!fileName) {
    throw new Error(
      `No JSON data file mapped for ENV="${env}". Check schemaDataMap.`,
    );
  }

  return `src/schema/${fileName}`;
}
