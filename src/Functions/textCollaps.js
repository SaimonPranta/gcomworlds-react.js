const textCollaps = (text) => {
    console.log(text.length)
  const newText = text.toString();
  if (newText.length > 42) { 
    let collapsText = text.slice(0, 42);
    return `${collapsText}...`;
  }
  return text;
};

export default textCollaps;
