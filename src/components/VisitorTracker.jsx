import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ccr_visitor_data';

function formatDate(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  }) + ' ' + new Date(ts).toLocaleTimeString(undefined, {
    hour: '2-digit', minute: '2-digit',
  });
}

export default function VisitorTracker() {
  const [info, setInfo]       = useState(null); // { city, country, views, timestamp }
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raw  = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : { views: 0, lastCity: null, lastCountry: null, lastVisit: null };

    const prevCity    = data.lastCity;
    const prevCountry = data.lastCountry;
    const prevVisit   = data.lastVisit;
    const totalViews  = (data.views || 0) + 1;

    // Show notification immediately using stored data (don't wait for geo)
    if (prevVisit) {
      setInfo({ city: prevCity, country: prevCountry, views: totalViews, timestamp: prevVisit });
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }

    // Fetch geo and persist for next visitor to see
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .catch(() => null)
      .then(geo => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          views:       totalViews,
          lastCity:    geo?.city         || data.lastCity,
          lastCountry: geo?.country_name || data.lastCountry,
          lastVisit:   Date.now(),
        }));
      });
  }, []);

  if (!info || !visible) return null;

  const loc = info.city && info.country ? `${info.city}, ${info.country}`
            : info.country              ? info.country
            : 'Unknown location';

  return (
    <>
      <style>{`
        @keyframes vtSlideIn {
          from { opacity:0; transform:translateX(30px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes vtShrink {
          from { width:100%; }
          to   { width:0%; }
        }
        #vt-bar { animation: vtShrink 5s linear forwards; }
      `}</style>
      <div style={{
        position:'fixed', top:20, right:20, zIndex:99999,
        background:'rgba(15,23,42,0.95)',
        border:'1px solid rgba(99,102,241,0.4)',
        borderRadius:12, padding:'14px 18px',
        minWidth:220, maxWidth:280,
        boxShadow:'0 8px 32px rgba(0,0,0,0.4)',
        backdropFilter:'blur(10px)',
        animation:'vtSlideIn 0.4s ease-out',
        fontFamily:'inherit',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
          <span style={{ fontSize:13, fontWeight:600, color:'#a5b4fc', letterSpacing:'0.02em' }}>
            📍 Last Visitor
          </span>
          <button
            onClick={() => setVisible(false)}
            style={{ background:'none', border:'none', color:'#64748b', cursor:'pointer', fontSize:18, lineHeight:1, padding:'0 2px' }}
          >×</button>
        </div>
        <div style={{ fontSize:14, color:'#e2e8f0', marginBottom:4 }}>From: {loc}</div>
        <div style={{ fontSize:12, color:'#94a3b8', marginBottom:4 }}>Total views: {info.views}</div>
        <div style={{ fontSize:11, color:'#64748b' }}>{formatDate(info.timestamp)}</div>
        <div style={{ marginTop:8, height:2, background:'rgba(99,102,241,0.15)', borderRadius:2, overflow:'hidden' }}>
          <div id="vt-bar" style={{ height:'100%', background:'rgba(99,102,241,0.6)' }} />
        </div>
      </div>
    </>
  );
}
