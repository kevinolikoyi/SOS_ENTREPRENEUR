import fs from "node:fs";
import path from "node:path";

import * as XLSX from "xlsx";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILENAMES = [
  "candidatures-retenues.xlsx",
  "candidatures-retenues.xls",
  "candidatures-retenues.csv",
  "candidatures-retenues.json",
];

const EMAIL_KEYS = new Set([
  "email",
  "mail",
  "courriel",
  "adresseemail",
  "adressemail",
]);

const PHONE_KEYS = new Set([
  "telephone",
  "tel",
  "phone",
  "mobile",
  "whatsapp",
  "numero",
  "numerotelephone",
  "numerodetelephone",
]);

const STATUS_KEYS = new Set([
  "statut",
  "status",
  "resultat",
  "selection",
  "selectionne",
  "retenu",
]);

const SELECTED_VALUES = new Set([
  "1",
  "oui",
  "yes",
  "true",
  "retenu",
  "retenue",
  "selectionne",
  "selectionnee",
  "selected",
  "admis",
  "admise",
]);

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeKey(value) {
  return normalizeText(value).replace(/[^a-z0-9]/g, "");
}

function normalizeEmail(value) {
  return normalizeText(value);
}

function normalizePhone(value) {
  return String(value ?? "").replace(/\D/g, "");
}

function getCandidateDataFile() {
  for (const filename of DATA_FILENAMES) {
    const filePath = path.join(DATA_DIR, filename);

    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
      return filePath;
    }
  }

  return null;
}

export function hasCandidateDataFile() {
  return Boolean(getCandidateDataFile());
}

function readRows(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".json") {
    const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return Array.isArray(json) ? json : json.candidatures ?? json.rows ?? [];
  }

  const workbook = XLSX.readFile(filePath, { cellDates: false });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    return [];
  }

  return XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], {
    defval: "",
  });
}

function getRowFields(row) {
  return Object.entries(row).map(([key, value]) => ({
    key: normalizeKey(key),
    value: String(value ?? "").trim(),
  }));
}

function rowHasExplicitStatus(fields) {
  return fields.some((field) => STATUS_KEYS.has(field.key));
}

function rowIsSelected(fields) {
  const statusFields = fields.filter((field) => STATUS_KEYS.has(field.key));

  if (statusFields.length === 0) {
    return true;
  }

  return statusFields.some((field) =>
    SELECTED_VALUES.has(normalizeKey(field.value))
  );
}

function rowMatchesIdentifier(fields, identifier) {
  const email = normalizeEmail(identifier);
  const phone = normalizePhone(identifier);

  return fields.some((field) => {
    const fieldEmail = normalizeEmail(field.value);
    const fieldPhone = normalizePhone(field.value);
    const canMatchEmail = EMAIL_KEYS.has(field.key) || email.includes("@");
    const canMatchPhone = PHONE_KEYS.has(field.key) || phone.length >= 6;

    if (canMatchEmail && email.includes("@") && fieldEmail === email) {
      return true;
    }

    return canMatchPhone && phone.length >= 6 && fieldPhone === phone;
  });
}

export function checkCandidate(identifier) {
  const filePath = getCandidateDataFile();

  if (!filePath) {
    return { ready: false, found: false, selected: false };
  }

  const rows = readRows(filePath);

  for (const row of rows) {
    const fields = getRowFields(row);

    if (rowMatchesIdentifier(fields, identifier)) {
      const hasStatus = rowHasExplicitStatus(fields);
      const selected = rowIsSelected(fields);

      return {
        ready: true,
        found: true,
        selected,
        pending: hasStatus && !selected,
      };
    }
  }

  return { ready: true, found: false, selected: false };
}
