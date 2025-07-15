export async function fetchBrandsFromNotion() {
  const res = await fetch('/api/brands');
  return res.json();
}
