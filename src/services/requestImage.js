export default function getImage(domain, name) {
  const url = `https://www.the${domain}db.com/images/ingredients/${name}-Small.png`;
  return url;
}
