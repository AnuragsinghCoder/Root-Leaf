export function unwrapResponse(response) {
  return response?.data ?? response;
}

export function getList(response, key) {
  const payload = unwrapResponse(response);

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.[key])) return payload[key];
  if (Array.isArray(payload?.data?.[key])) return payload.data[key];

  return [];
}