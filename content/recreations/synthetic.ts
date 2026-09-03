/**
 * Synthetic data for the stylised app-screen recreations.
 * Nothing here is real: store names, SKUs, ticket subjects, agents and numbers are invented.
 */

export const syntheticStores = [
  { code: "NORTH", name: "Northside Demo", country: "AU", status: "Active" },
  { code: "BAYVW", name: "Bayview Demo", country: "AU", status: "Active" },
  { code: "HRBR", name: "Harbour Demo", country: "NZ", status: "Active" },
  { code: "RVRSD", name: "Riverside Demo", country: "US", status: "Onboarding" },
  { code: "LKSDE", name: "Lakeside Demo", country: "AU", status: "Active" },
];

export const syntheticProducts = [
  { sku: "DEMO-CHL-10", name: "Chlorine granules 10 kg", category: "Chemicals / Sanitisers", cost: 48.2 },
  { sku: "DEMO-ALG-1L", name: "Algaecide 1 L", category: "Chemicals / Algaecides", cost: 12.9 },
  { sku: "DEMO-FLT-C", name: "Filter cartridge C", category: "Equipment / Filtration", cost: 39.0 },
  { sku: "DEMO-PMP-750", name: "Pump 750 W", category: "Equipment / Pumps", cost: 412.5 },
  { sku: "DEMO-TST-6", name: "Test strips 6-way", category: "Testing / Strips", cost: 6.4 },
];

export const syntheticAuditEntries = [
  { user: "j.demo", field: "Evo Status", from: "In progress", to: "Completed", at: "09:41" },
  { user: "a.demo", field: "Sheet ID", from: "-", to: "1AbC...xYz", at: "09:38" },
  { user: "j.demo", field: "Assigned to", from: "-", to: "a.demo", at: "09:12" },
];

export const syntheticTickets = [
  { id: "DEMO-104", subject: "Pump not showing in inventory export", status: "Open", priority: "High" },
  { id: "DEMO-103", subject: "Price book missing on new register", status: "Pending", priority: "Medium" },
  { id: "DEMO-101", subject: "Category shows blank in report", status: "Resolved", priority: "Low" },
];

export const syntheticExportMonths = [
  "2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06",
  "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12",
];
