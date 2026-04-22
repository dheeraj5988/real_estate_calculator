/* ═══════════════════════════════════════════════
   SHARED JS — RE Research 2026
═══════════════════════════════════════════════ */

/* ─── THEME ─── */
function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('re-theme', next);
}
(function() {
  const saved = localStorage.getItem('re-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

/* ─── CITY STATE ─── */
function getCity() {
  return localStorage.getItem('re-city') || 'bangalore';
}
function setCity(id) {
  localStorage.setItem('re-city', id);
}
function getCityData() {
  const id = getCity();
  return CITIES.find(c => c.id === id) || CITIES[0];
}

/* ─── FORMAT UTILITIES ─── */
const fmt = n => '₹' + Math.round(n).toLocaleString('en-IN');
const fmtCr = n => {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + 'Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + 'L';
  return fmt(n);
};
const fmtL = n => '₹' + (n / 100000).toFixed(1) + 'L';

/* ─── EMI CALC ─── */
function calcEMI(principal, annualRate, months) {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

/* ─── FUTURE VALUE ─── */
function fv(principal, annualRatePct, years) {
  return principal * Math.pow(1 + annualRatePct / 100, years);
}

/* ─── SIP FUTURE VALUE (monthly) ─── */
function sipFV(monthlyAmt, annualRatePct, months) {
  const r = annualRatePct / 12 / 100;
  if (r === 0) return monthlyAmt * months;
  return monthlyAmt * (Math.pow(1 + r, months) - 1) / r * (1 + r);
}
