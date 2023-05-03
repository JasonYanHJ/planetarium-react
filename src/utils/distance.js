export default function distance(p1, p2) {
  const [x1, y1, z1] = (p1 instanceof Array) ? p1 : [p1.x, p1.y, p1.z];
  const [x2, y2, z2] = (p2 instanceof Array) ? p2 : [p2.x, p2.y, p2.z];
  
  return Math.sqrt((x1 - x2) ** 2 + (z1 - z2) ** 2);
}