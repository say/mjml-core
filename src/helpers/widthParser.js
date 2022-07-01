const unitRegex = /[\d.,]*(\D*)$/

export default function widthParser(width, options = {}) {
  const { parseFloatToInt = true } = options

  const widthUnit = unitRegex.exec(width.toString())[1]
  const unitParsers = {
    default: parseInt,
    px: parseInt,
    '%': parseFloatToInt ? parseInt : parseFloat,
  }
  const parser = unitParsers[widthUnit] || unitParsers.default

  if (width.toString().includes("{{")) {
    const last2 = width.slice(-2);
    if (last2 !== "}}") {
      if (last2 === "px") {
        return {
          parsedWidth: width.slice(0, -2),
          unit: 'px'
        }
      }
      return {
        parsedWidth: width.slice(0, -1),
        unit: '%'
      }
    }
    return {
      parsedWidth: width,
      unit: 'px'
    }
  }
  return {
    parsedWidth: parser(width),
    unit: widthUnit || 'px',
  }
}
