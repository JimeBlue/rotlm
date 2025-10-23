export function transformErrors(errorsObj) {
  return Object.entries(errorsObj).map(([key, value]) => {
    const newKey = key.replace(/^companions\.(\d+)/, (_, number) => `companion_guests.${number}`)

    return value.map(item => ({
      ...item,
      name: newKey,
    }))
  }).flat()
}
