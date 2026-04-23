import React, { useState } from 'react';
import TradePage      from './pages/TradePage';
import ExposurePage   from './pages/ExposurePage';
import CreditRiskPage from './pages/CreditRiskPage';
import CollateralPage from './pages/CollateralPage';
import MarketRiskPage from './pages/MarketRiskPage';
import PLPage         from './pages/PLPage';
import PricingPage    from './pages/PricingPage';
import CVAPage        from './pages/CVAPage';

const PAGES = [
  { id:'trade',      label:'Trade Decision',        group:'Decision Support'  },
  { id:'exposure',   label:'Exposure Analytics',     group:'Risk Analytics'    },
  { id:'credit',     label:'Credit Risk',            group:'Risk Analytics'    },
  { id:'collateral', label:'Collateral & Haircut',   group:'Risk Analytics'    },
  { id:'market',     label:'Market Risk',            group:'Risk Analytics'    },
  { id:'pl',         label:'P&L Attribution',        group:'Risk Analytics'    },
  { id:'pricing',    label:'Derivative Pricing',     group:'Pricing'           },
  { id:'cva',        label:'CVA Pricing',            group:'Pricing'           },
];

const NOW = new Date().toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});

export default function App() {
  const [page, setPage] = useState('trade');
  const [cpId, setCpId] = useState('DB');

  const groups = [...new Set(PAGES.map(p=>p.group))];

  function renderPage() {
    const props = { cpId, setCpId };
    switch(page){
      case 'trade':      return <TradePage      {...props} />;
      case 'exposure':   return <ExposurePage   {...props} />;
      case 'credit':     return <CreditRiskPage {...props} />;
      case 'collateral': return <CollateralPage {...props} />;
      case 'market':     return <MarketRiskPage {...props} />;
      case 'pl':         return <PLPage         {...props} />;
      case 'pricing':    return <PricingPage    {...props} />;
      case 'cva':        return <CVAPage        {...props} />;
      default:           return <TradePage      {...props} />;
    }
  }

  return (
    <>
      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-logo">
          <div className="topbar-mark">CCR</div>
          <div>
            <div className="topbar-name">CCR <span>Risk Analytics</span> Platform</div>
            <div className="topbar-sub">Counterparty Credit Risk · First Line of Defense</div>
          </div>
        </div>
        <div className="topbar-right">
          <span className="topbar-live">● LIVE</span> &nbsp;{NOW}<br/>
          CCR Desk · Derivatives
        </div>
      </header>

      <div className="app-shell">
        {/* Sidebar */}
        <nav className="sidebar">
          {groups.map(grp => (
            <div key={grp}>
              <div className="sidebar-section-label">{grp}</div>
              {PAGES.filter(p=>p.group===grp).map((p,i) => {
                const n = PAGES.indexOf(p)+1;
                return (
                  <div
                    key={p.id}
                    className={`nav-item${page===p.id?' active':''}`}
                    onClick={()=>setPage(p.id)}
                  >
                    <span className="nav-num">{n}</span>
                    {p.label}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Content */}
        <div className="main-area">
          {renderPage()}
        </div>
      </div>
    </>
  );
}
