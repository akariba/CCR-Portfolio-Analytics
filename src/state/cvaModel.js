// CVA = LGD × Σ EE(tᵢ) × [S(tᵢ₋₁) − S(tᵢ)] × DF(tᵢ)
// S(t) = exp(−λt)  |  DF(t) = exp(−r×t)

const DISC_RATE = 0.044; // flat discount rate for CVA (USD)

function df(t)   { return Math.exp(-DISC_RATE * t); }
function surv(t, lambda) { return Math.exp(-lambda * t); }

function tenorYear(label) {
  const map = {'6M':0.5,'1Y':1,'2Y':2,'3Y':3,'4Y':4,'5Y':5,'7Y':7,'10Y':10};
  return map[label] ?? parseFloat(label) ?? 1;
}

export function computeCVA(cp) {
  let cva = 0;
  const buckets = [];

  cp.tenors.forEach((tenor, i) => {
    const t     = tenorYear(tenor);
    const tPrev = i === 0 ? 0 : tenorYear(cp.tenors[i-1]);
    const ee    = cp.ee[i];
    const d     = df(t);
    const sPrev = surv(tPrev, cp.lambda);
    const sCurr = surv(t,     cp.lambda);
    const pd    = sPrev - sCurr;          // marginal PD in interval
    const contrib = cp.lgd * ee * pd * d;
    cva += contrib;
    buckets.push({
      tenor,
      t:      t.toFixed(2),
      ee:     ee.toFixed(1),
      survPct:(sCurr*100).toFixed(2),
      pdPct:  (pd*100).toFixed(3),
      df:     d.toFixed(4),
      lgd:    (cp.lgd*100).toFixed(0)+'%',
      contrib:contrib.toFixed(3),
      cumCVA: (cva).toFixed(3),
    });
  });

  const rfValue   = cp.fairValue;
  const adjValue  = rfValue - cva;
  const cvaRate   = cva / cp.currentPFE * 100;

  return {cva, rfValue, adjValue, cvaRate, buckets,
          lambda:cp.lambda, lgd:cp.lgd, cdsSpread:cp.cdsSpread};
}

export function computePortfolioCVA(counterparties) {
  return Object.values(counterparties).map(cp => {
    const {cva, rfValue, adjValue} = computeCVA(cp);
    return {id:cp.id, name:cp.name, cva, rfValue, adjValue,
            cvaShare:(cva/rfValue*100).toFixed(1)};
  });
}
