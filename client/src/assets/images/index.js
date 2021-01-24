function importAll(r) {
  let images = {};
  r.keys().map((item) => (images[item.replace("./", "")] = r(item)));
  return images;
}

const images = importAll(require.context("../images", false, /.png$/));

export default images;
