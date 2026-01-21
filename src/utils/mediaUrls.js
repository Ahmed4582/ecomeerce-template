const DEFAULT_API_BASE_URL = "https://apistore2.onpoint-teasting.com";

export function getApiBaseUrl() {
  const raw = process.env.REACT_APP_API_URL || DEFAULT_API_BASE_URL;
  return String(raw || DEFAULT_API_BASE_URL).replace(/\/$/, "");
}

// Many backends expose JSON APIs under "/api" but serve media from root ("/ProdImg", "/CateImg").
export function getMediaBaseUrl() {
  const apiBaseUrl = getApiBaseUrl();
  return apiBaseUrl.replace(/\/api$/i, "");
}

/**
 * Resolve backend-stored asset paths to a full URL.
 * Supports: filename, `${folder}/file`, `/folder/file`, full URL, data/blob URLs, and local public assets.
 */
export function resolveApiAssetUrl(src, folder) {
  const mediaBaseUrl = getMediaBaseUrl();
  const raw = String(src || "").trim();
  if (!raw) return "";

  // normalize common "api/" prefix in stored paths
  const s = raw
    .replace(/^\/api\//i, "/")
    .replace(/^api\//i, "");

  // already a URL
  if (
    s.startsWith("http://") ||
    s.startsWith("https://") ||
    s.startsWith("data:") ||
    s.startsWith("blob:")
  ) {
    return s;
  }

  // local public assets
  if (s.startsWith("/images/") || s.startsWith("/SVG/")) return s;

  // explicit /Folder/... or Folder/...
  const folderName = String(folder || "").replace(/^\/+|\/+$/g, "");
  if (folderName) {
    if (s.startsWith(`/${folderName}/`)) return `${mediaBaseUrl}${s}`;
    if (s.startsWith(`${folderName}/`)) return `${mediaBaseUrl}/${s}`;
  }

  // any other absolute path
  if (s.startsWith("/")) return s;

  // filename
  return folderName
    ? `${mediaBaseUrl}/${folderName}/${s.replace(/^\/+/, "")}`
    : `${mediaBaseUrl}/${s.replace(/^\/+/, "")}`;
}

