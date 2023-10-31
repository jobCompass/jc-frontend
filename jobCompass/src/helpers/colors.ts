const getRGBColor = (hex:string) => {
  const color = hex.replace(/#/g, "")
  // rgb values
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)
  return {r,g,b}
}
export const getBgColor = (hex:string) => {
  const {r, g, b} = getRGBColor(hex)
  return `rgb(${r}, ${g}, ${b}, 0.8)`
}
/////////////////////////////////////////////////////////////////////
// Determine the accessible color of text
/////////////////////////////////////////////////////////////////////
export const textColor = (hex:string) => {
  const {r,g,b} = getRGBColor(hex)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#000000" : "#FFFFFF"
}