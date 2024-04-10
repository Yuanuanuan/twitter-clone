module.exports = {
  changeToBase64(data) {
    const base64Image = data.toString("base64");

    return `data:image/png;base64,${base64Image}`;
  },
};
