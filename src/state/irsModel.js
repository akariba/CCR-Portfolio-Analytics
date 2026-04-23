// USD yield curve — approximate market rates (%)
const CURVE = {0.25:5.30, 0.5:5.28, 1:5.13, 2:4.87, 3:4.70, 5:4.53, 7:4.47, 10:4.40, 15:4.38, 20:4.37, 30:4.34};

function interpRate(t) {
  const keys = Object.keys(CURVE).map(Number).sort((a,b)=>a-b);
  if (t <= keys[0]) return CURVE[keys[0]];
  if (t >= keys[keys.length-1]) return CURVE[keys[keys.length-1]];
  for (let i=0; i<keys.length-1; i++) {
    if (t <= keys[i+1]) {
      const f = (t-keys[i])/(keys[i+1]-keys[i]);
      return CURVE[keys[i]] + f*(CURVE[keys[i+1]]-CURVE[keys[i]]);
    }
  }
  return CURVE[keys[keys.length-1]];
}

function df(t) { return Math.exp(-interpRate(t)/100 * t); }

function fwdRate(t1, t2) {
  if (t1 === 0) return interpRate(t2);
  return (df(t1)/df(t2) - 1) / (t2-t1) * 100;
}

function addYears(base, y) {
  const d = new Date(base);
  d.setFullYear(d.getFullYear() + Math.floor(y));
  d.setMonth(d.getMonth() + Math.round((y % 1) * 12));
  return d.toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'});
}

export function priceIRS({notional=100, fixedRate=4.5, maturity=5, freq=2, payFixed=true}) {
  const N  = parseFloat(notional);
  const r  = parseFloat(fixedRate) / 100;
  const M  = parseFloat(maturity);
  const dt = 1 / freq;
  const n  = Math.round(M * freq);
  const baseDate = new Date(2024, 3, 1);

  let pvFixed=0, pvFloat=0;
  const schedule = [];

  for (let i=1; i<=n; i++) {
    const t     = i * dt;
    const tPrev = (i-1) * dt;
    const d     = df(t);
    const fwd   = fwdRate(tPrev, t) / 100;

    const fixedPmt = N * r * dt;
    const floatPmt = N * fwd * dt;
    const net      = payFixed ? floatPmt - fixedPmt : fixedPmt - floatPmt;
    pvFixed += fixedPmt * d;
    pvFloat += floatPmt * d;

    schedule.push({
      period: i,
      date:   addYears(baseDate, t),
      t:      t.toFixed(2),
      df:     d.toFixed(4),
      fixed:  fixedPmt.toFixed(3),
      float:  floatPmt.toFixed(3),
      net:    net.toFixed(3),
      pvFixed:(fixedPmt*d).toFixed(3),
      pvFloat:(floatPmt*d).toFixed(3),
    });
  }

  const fairValue  = payFixed ? pvFloat - pvFixed : pvFixed - pvFloat;
  const annuity    = schedule.reduce((a,s) => a + parseFloat(s.df)*dt, 0);
  const parRate    = pvFloat / annuity;

  return {pvFixed, pvFloat, fairValue, parRate, schedule, n,
          yieldCurve: Object.entries(CURVE).map(([t,r])=>({t:parseFloat(t),r}))};
}

export function getRateCurve() {
  return Object.entries(CURVE).map(([t,r])=>({t:parseFloat(t),r:parseFloat(r)}));
}
