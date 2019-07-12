export function action(type, payload, meta) {
  return { type, payload, error: payload instanceof Error, meta }
}