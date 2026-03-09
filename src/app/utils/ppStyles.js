const PP_COLORS = {
  sage: "#A5C89E",
  cream: "#FFFBB1",
  lime: "#D8E983",
  olive: "#AEB877"
};
const ppButtonStyle = {
  backgroundColor: PP_COLORS.sage,
  color: "white"
};
const ppGradientStyle = {
  background: `linear-gradient(90deg, ${PP_COLORS.sage} 0%, ${PP_COLORS.olive} 100%)`,
  color: "white"
};
export {
  PP_COLORS,
  ppButtonStyle,
  ppGradientStyle
};
