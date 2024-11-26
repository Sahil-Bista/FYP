const generateUniqueId = () => {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

const tokendecode = (base64) => {
  // Convert Base64Url to standard Base64
  const standardBase64 = base64.replace(/-/g, "+").replace(/_/g, "/");
  // Decode Base64 to UTF-8 string
  const decoded = atob(standardBase64);
  return JSON.parse(decoded);
}

export { generateUniqueId, tokendecode};

//This function is used to decode Base64Url-encoded data into a usable JavaScript object by first converting the Base64Url to standard Base64, decoding it, and then parsing it as JSON. This is typically done when working with URL-safe Base64 encoded data that represents JSON objects (e.g., JWT payloads).