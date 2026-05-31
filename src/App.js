import { useState, useEffect, useCallback } from "react";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, updateProfile,
} from "firebase/auth";
import {
  collection, addDoc, getDocs, doc, setDoc, getDoc,
} from "firebase/firestore";
import { SEED_PERFUMES } from "./seedData";
import { STRINGS } from "./strings";

const ADMIN_EMAIL = "fredrik-nielsen@hotmail.com";

// ---------- helpers ----------
const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
const round1 = (n) => Math.round(n * 10) / 10;

// label-helpere som respekterer valgt språk (t)
const genderLabel = (t, g) => t[`gender_${g}`] || g;
const priceLabel = (t, p) => t[`price_${p}`] || p;

// Map duft-akkorder til farger -> gir hver flaske en unik nyanse fra duftprofilen
const ACCORD_COLORS = {
  fruity: "#e8794e", fresh: "#5fb89a", "fresh spicy": "#7fae6a", citrus: "#e8c14e",
  sweet: "#d98fb0", vanilla: "#e8d3a0", gourmand: "#c98a5a", coffee: "#6b4a32",
  woody: "#9c7048", smoky: "#7a6a5e", amber: "#d99a4e", leather: "#8a5a3c",
  floral: "#e89ac0", "white floral": "#ecd8e4", rose: "#d97a8e", iris: "#b0a4c8",
  powdery: "#d8c8d4", aromatic: "#88a87c", lavender: "#9a90c4", mint: "#6ec4a0",
  oud: "#5a4434", tobacco: "#8a6a3c", honey: "#e0a840", "warm spicy": "#c87850",
  spicy: "#c46a4a", liquor: "#b07840", boozy: "#a86838", apple: "#b8c44e",
};
const accordColor = (a) => ACCORD_COLORS[a] || "#9c7048";

// Generert flaske-ikon farget av parfymens to fremste akkorder. Ingen opphavsrett.
const AccordBottle = ({ perfume, size = 54 }) => {
  const [c1, c2] = [
    accordColor(perfume.accords?.[0]),
    accordColor(perfume.accords?.[1] || perfume.accords?.[0]),
  ];
  const gid = `g-${perfume.id}`;
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 40 50" style={{ display: "block" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="15" y="2" width="10" height="6" rx="1.5" fill="#2a2018" />
      {/* neck */}
      <rect x="17" y="7" width="6" height="4" fill="#2a2018" opacity="0.7" />
      {/* body */}
      <rect x="8" y="11" width="24" height="36" rx="5" fill={`url(#${gid})`} />
      {/* shine */}
      <rect x="11" y="14" width="5" height="28" rx="2.5" fill="#ffffff" opacity="0.18" />
      {/* label */}
      <rect x="13" y="26" width="14" height="12" rx="1.5" fill="#ffffff" opacity="0.82" />
    </svg>
  );
};

const Stars = ({ value, onChange, size = 22 }) => (
  <span style={{ fontSize: size, letterSpacing: 2, cursor: onChange ? "pointer" : "default" }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <span key={n} onClick={onChange ? () => onChange(n) : undefined}
        style={{ color: n <= value ? "#e8a23c" : "#e8d4da" }}>★</span>
    ))}
  </span>
);

const Bar = ({ label, value }) => (
  <div style={{ margin: "4px 0" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9a8088", marginBottom: 2 }}>
      <span>{label}</span><span>{round1(value)}/10</span>
    </div>
    <div style={{ height: 6, background: "#f3e3e9", borderRadius: 3 }}>
      <div style={{ height: "100%", width: `${value * 10}%`, background: "linear-gradient(90deg,#e8829e,#d96b8a)", borderRadius: 3 }} />
    </div>
  </div>
);

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [perfumes, setPerfumes] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [tab, setTab] = useState("discover");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("no"); // norsk standard
  const t = STRINGS[lang];

  // filters
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [accordFilter, setAccordFilter] = useState([]); // valgte akkorder (AND-match)

  const isAdmin = user?.email === ADMIN_EMAIL;

  const fetchPerfumes = useCallback(async () => {
    const snap = await getDocs(collection(db, "perfumes"));
    setPerfumes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }, []);

  const fetchRatings = useCallback(async () => {
    const snap = await getDocs(collection(db, "ratings"));
    setRatings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const ps = await getDoc(doc(db, "users", u.uid));
        if (ps.exists()) setProfile(ps.data());
      } else setProfile(null);
    });
    Promise.all([fetchPerfumes(), fetchRatings()]).finally(() => setLoading(false));
    return unsub;
  }, [fetchPerfumes, fetchRatings]);

  // ---------- ratings helpers ----------
  const ratingsFor = (perfumeId) => ratings.filter((r) => r.perfumeId === perfumeId);
  const scoreFor = (perfumeId) => round1(avg(ratingsFor(perfumeId).map((r) => r.stars)));
  const dupesFor = (perfumeId) => perfumes.filter((p) => p.dupeOf === perfumeId);

  // ---------- demographic top list ----------
  // returns perfumes ranked by avg stars among raters matching gender+age window
  const demoTopList = (gender, ageMin, ageMax) => {
    // map uid -> profile demo (we stored gender/age on the rating itself for simplicity)
    const matching = ratings.filter((r) =>
      (gender === "All" || r.raterGender === gender) &&
      (r.raterAge == null || (r.raterAge >= ageMin && r.raterAge <= ageMax))
    );
    const byPerfume = {};
    matching.forEach((r) => {
      byPerfume[r.perfumeId] = byPerfume[r.perfumeId] || [];
      byPerfume[r.perfumeId].push(r.stars);
    });
    return Object.entries(byPerfume)
      .map(([pid, stars]) => ({
        perfume: perfumes.find((p) => p.id === pid),
        score: round1(avg(stars)), count: stars.length,
      }))
      .filter((x) => x.perfume)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  };

  // ---------- seeding (admin only) ----------
  const seedDatabase = async () => {
    if (!window.confirm(`Load ${SEED_PERFUMES.length} perfumes into Firestore?`)) return;
    for (const p of SEED_PERFUMES) {
      const { id, ...rest } = p;
      await setDoc(doc(db, "perfumes", id), rest);
    }
    await fetchPerfumes();
    alert("Seeded!");
  };

  // ---------- alle unike akkorder (for filter-pills), sortert etter hvor ofte de brukes ----------
  const allAccords = (() => {
    const count = {};
    perfumes.forEach((p) => {
      if (p.dupeOf) return;
      (p.accords || []).forEach((a) => { count[a] = (count[a] || 0) + 1; });
    });
    return Object.keys(count).sort((a, b) => count[b] - count[a]);
  })();

  // ---------- filtered catalog ----------
  const filtered = perfumes.filter((p) => {
    if (p.dupeOf) return false; // duper vises på originalens side, ikke i hovedkatalogen
    if (genderFilter !== "All" && p.gender !== genderFilter) return false;
    if (priceFilter !== "All" && p.priceClass !== priceFilter) return false;
    // akkord-filter: parfymen må ha ALLE valgte akkorder
    if (accordFilter.length && !accordFilter.every((a) => (p.accords || []).includes(a))) return false;
    // søk treffer navn, hus, noter og akkorder
    const q = search.toLowerCase().trim();
    if (q) {
      const haystack = [
        p.name, p.house,
        ...(p.accords || []),
        ...(p.topNotes || []), ...(p.heartNotes || []), ...(p.baseNotes || []),
      ].join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  }).sort((a, b) => scoreFor(b.id) - scoreFor(a.id));

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>{STRINGS[lang].loading}</div>;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 16px 60px" }}>
      <Header user={user} tab={tab} setTab={setTab} setSelected={setSelected} t={t} lang={lang} setLang={setLang} />

      {selected ? (
        <PerfumeDetail
          perfume={selected} ratingsFor={ratingsFor} scoreFor={scoreFor}
          dupesFor={dupesFor} setSelected={setSelected} user={user} profile={profile}
          onRated={fetchRatings} t={t}
        />
      ) : (
        <>
          {tab === "discover" && (
            <Discover
              filtered={filtered} scoreFor={scoreFor} ratingsFor={ratingsFor} dupesFor={dupesFor}
              setSelected={setSelected} search={search} setSearch={setSearch}
              genderFilter={genderFilter} setGenderFilter={setGenderFilter}
              priceFilter={priceFilter} setPriceFilter={setPriceFilter}
              allAccords={allAccords} accordFilter={accordFilter} setAccordFilter={setAccordFilter} t={t}
            />
          )}
          {tab === "toplists" && (
            <TopLists demoTopList={demoTopList} scoreFor={scoreFor} setSelected={setSelected} t={t} />
          )}
          {tab === "account" && (
            <Account user={user} profile={profile} setProfile={setProfile}
              isAdmin={isAdmin} seedDatabase={seedDatabase} perfumeCount={perfumes.length}
              ratingCount={ratings.length} t={t} />
          )}
        </>
      )}
    </div>
  );
}

// ---------- Header ----------
function Header({ user, tab, setTab, setSelected, t, lang, setLang }) {
  const go = (tb) => { setSelected(null); setTab(tb); };
  const Tab = ({ id, label }) => (
    <button onClick={() => go(id)} style={{
      background: "none", border: "none", cursor: "pointer", padding: "8px 4px",
      color: tab === id ? "#d96b8a" : "#a8909a", fontWeight: tab === id ? 700 : 500,
      borderBottom: tab === id ? "2px solid #d96b8a" : "2px solid transparent", fontSize: 15,
    }}>{label}</button>
  );
  const LangBtn = ({ code }) => (
    <button onClick={() => setLang(code)} style={{
      background: lang === code ? "#d96b8a" : "rgba(255,255,255,0.6)",
      color: lang === code ? "#fff" : "#9a6b78", border: "1px solid #efb6c8",
      borderRadius: 6, padding: "3px 9px", cursor: "pointer", fontSize: 12, fontWeight: 700,
    }}>{code.toUpperCase()}</button>
  );
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        background: "linear-gradient(135deg, #fce4ec 0%, #fbd9e4 45%, #f6e4ee 100%)",
        borderRadius: 18, padding: "32px 28px 26px", marginBottom: 4,
        border: "1px solid #f6d0dd", boxShadow: "0 10px 30px rgba(217,107,138,0.15)", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -10, fontSize: 150, opacity: 0.18, transform: "rotate(12deg)" }}>🌸</div>
        <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 6, zIndex: 2 }}>
          <LangBtn code="no" /><LangBtn code="en" />
        </div>
        <h1 onClick={() => go("discover")} style={{
          fontSize: 40, cursor: "pointer", letterSpacing: 1, fontWeight: 700,
          background: "linear-gradient(90deg, #d14d75, #b8627f)", WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0,
        }}>Rateriet</h1>
        <p style={{ fontSize: 14, color: "#9a6b78", marginTop: 6, maxWidth: 420, lineHeight: 1.45 }}>
          {t.tagline}
        </p>
      </div>
      <div style={{ display: "flex", gap: 8, borderBottom: "1px solid #f0dce2", paddingTop: 8 }}>
        <Tab id="discover" label={t.discover} />
        <Tab id="toplists" label={t.toplists} />
        <Tab id="account" label={user ? t.account : t.signin} />
      </div>
    </div>
  );
}

// ---------- Discover ----------
function Discover({ filtered, scoreFor, ratingsFor, dupesFor, setSelected,
  search, setSearch, genderFilter, setGenderFilter, priceFilter, setPriceFilter,
  allAccords, accordFilter, setAccordFilter, t }) {
  const sel = { padding: "9px 11px", background: "#fff", color: "#3a2b30", border: "1px solid #f0dce2", borderRadius: 8 };
  const toggleAccord = (a) =>
    setAccordFilter(accordFilter.includes(a) ? accordFilter.filter((x) => x !== a) : [...accordFilter, a]);
  const hasFilters = accordFilter.length > 0 || genderFilter !== "All" || priceFilter !== "All" || search;
  const clearAll = () => { setAccordFilter([]); setGenderFilter("All"); setPriceFilter("All"); setSearch(""); };
  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder={t.searchPlaceholder}
        style={{ ...sel, width: "100%", marginBottom: 10 }} />
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} style={sel}>
          {["All", "Masculine", "Feminine", "Unisex"].map((g) => <option key={g} value={g}>{genderLabel(t, g)}</option>)}
        </select>
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} style={sel}>
          {["All", "budget", "mid", "luxury"].map((p) => <option key={p} value={p}>{p === "All" ? t.allPrices : priceLabel(t, p)}</option>)}
        </select>
      </div>

      {/* akkord-filter (klikkbare pills) */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: "#a8909a", marginBottom: 7 }}>{t.filterByScent}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {allAccords.map((a) => {
            const on = accordFilter.includes(a);
            return (
              <button key={a} onClick={() => toggleAccord(a)} style={{
                fontSize: 12, padding: "5px 11px", borderRadius: 14, cursor: "pointer",
                background: on ? accordColor(a) : "#fff",
                color: on ? "#fff" : "#6a555c",
                border: `1px solid ${on ? accordColor(a) : "#ecd6de"}`,
                fontWeight: on ? 700 : 500, transition: "all 0.12s",
              }}>{a}</button>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: "#a8909a" }}>{filtered.length} {t.perfumes}</span>
        {hasFilters && (
          <button onClick={clearAll} style={{ ...linkBtn, fontSize: 13 }}>{t.clearFilters}</button>
        )}
      </div>

      {filtered.length === 0 && (
        <div style={{ ...box, textAlign: "center", color: "#a8909a", padding: 24 }}>{t.noResults}</div>
      )}

      {filtered.map((p) => {
        const score = scoreFor(p.id), dupes = dupesFor(p.id).length;
        return (
          <div key={p.id} onClick={() => setSelected(p)} style={{
            ...card, padding: 0, overflow: "hidden", display: "flex", alignItems: "stretch",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#e8829e"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f0dce2"; }}>
            {/* bottle + score */}
            <div style={{
              width: 92, flexShrink: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 4, padding: "12px 0",
              background: "linear-gradient(160deg, #fdeef3, #fbe4ec)",
              borderRight: "1px solid #f0dce2",
            }}>
              <AccordBottle perfume={p} size={46} />
              {score > 0 ? (
                <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#d14d75" }}>{score}</span>
                  <span style={{ fontSize: 10, color: "#b59aa2" }}>/5</span>
                </div>
              ) : <div style={{ fontSize: 10, color: "#b59aa2" }}>{t.new}</div>}
            </div>
            {/* body */}
            <div style={{ flex: 1, padding: "13px 15px", minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2, color: "#3a2b30" }}>{p.name}</div>
              <div style={{ fontSize: 12.5, color: "#9a8088", marginTop: 2 }}>{p.house} · {p.concentration} · {p.year}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 9, flexWrap: "wrap" }}>
                <Tag>{genderLabel(t, p.gender)}</Tag>
                <Tag>{priceLabel(t, p.priceClass)}</Tag>
                {dupes > 0 && <Tag accent>🔁 {dupes} dupe{dupes > 1 ? "s" : ""}</Tag>}
                {p.accords?.slice(0, 2).map((a) => <Tag key={a}>{a}</Tag>)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- Perfume detail ----------
function PerfumeDetail({ perfume, ratingsFor, scoreFor, dupesFor, setSelected, user, profile, onRated, t }) {
  const rs = ratingsFor(perfume.id);
  const dupes = dupesFor(perfume.id);
  const [stars, setStars] = useState(0);
  const [longevity, setLongevity] = useState(5);
  const [sillage, setSillage] = useState(5);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  const myRating = user ? rs.find((r) => r.userId === user.uid) : null;

  const submit = async () => {
    if (!user) { alert(t.signinToRate); return; }
    if (stars === 0) { alert(t.pickStars); return; }
    setSaving(true);
    try {
      await addDoc(collection(db, "ratings"), {
        perfumeId: perfume.id, userId: user.uid, stars, longevity, sillage, text,
        raterGender: profile?.gender || null, raterAge: profile?.age || null,
        createdAt: new Date().toISOString(),
      });
      setText(""); setStars(0);
      await onRated();
      alert(t.thanksRating);
    } catch (e) { alert("Error: " + e.message); }
    setSaving(false);
  };

  return (
    <div>
      <button onClick={() => setSelected(null)} style={{ ...linkBtn, marginBottom: 14 }}>{t.back}</button>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ flexShrink: 0, background: "linear-gradient(160deg, #fdeef3, #fbe4ec)", borderRadius: 12, padding: "10px 14px", border: "1px solid #f0dce2" }}>
          <AccordBottle perfume={perfume} size={70} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 30, lineHeight: 1.1, color: "#3a2b30" }}>{perfume.name}</h2>
          <div style={{ color: "#9a8088", marginTop: 4 }}>{perfume.house} · {perfume.concentration} · {perfume.year}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
            <Tag>{genderLabel(t, perfume.gender)}</Tag>
            <Tag>{priceLabel(t, perfume.priceClass)}</Tag>
            {perfume.accords?.map((a) => <Tag key={a}>{a}</Tag>)}
          </div>
        </div>
      </div>
      <p style={{ color: "#5a4850", marginBottom: 16, lineHeight: 1.5 }}>{perfume.description}</p>

      {/* notes pyramid */}
      <div style={box}>
        <NoteRow label={t.top} notes={perfume.topNotes} />
        <NoteRow label={t.heart} notes={perfume.heartNotes} />
        <NoteRow label={t.base} notes={perfume.baseNotes} />
      </div>

      {/* community stats */}
      <div style={{ ...box, marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <strong>{t.community}</strong>
          <span><Stars value={Math.round(scoreFor(perfume.id))} size={16} /> {scoreFor(perfume.id) || "–"} ({rs.length})</span>
        </div>
        {rs.length > 0 && <>
          <Bar label={t.longevity} value={avg(rs.map((r) => r.longevity || 0))} />
          <Bar label={t.sillage} value={avg(rs.map((r) => r.sillage || 0))} />
        </>}
      </div>

      {/* dupes */}
      {dupes.length > 0 && (
        <div style={{ ...box, marginTop: 12 }}>
          <strong>{t.dupesOf} {perfume.name}</strong>
          <div style={{ fontSize: 12, color: "#a8909a", marginBottom: 8 }}>{t.dupesSub}</div>
          {dupes.map((d) => (
            <div key={d.id} onClick={() => setSelected(d)} style={{ ...card, marginBottom: 6, cursor: "pointer" }}>
              <div style={{ fontWeight: 700, color: "#3a2b30" }}>{d.name} <span style={{ fontWeight: 400, color: "#9a8088" }}>· {d.house}</span></div>
              <div style={{ fontSize: 12, color: "#9a8088" }}>{d.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* rate form */}
      <div style={{ ...box, marginTop: 12 }}>
        <strong>{myRating ? t.yourRating : t.rateThis}</strong>
        <div style={{ margin: "10px 0" }}><Stars value={stars} onChange={setStars} /></div>
        <SliderRow label={t.longevity} help={t.longevityHelp} value={longevity} setValue={setLongevity} />
        <SliderRow label={t.sillage} help={t.sillageHelp} value={sillage} setValue={setSillage} />
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t.optionalReview}
          style={{ width: "100%", minHeight: 60, marginTop: 8, padding: 10, background: "#fff",
            color: "#3a2b30", border: "1px solid #f0dce2", borderRadius: 8 }} />
        <button onClick={submit} disabled={saving} style={{ ...primaryBtn, marginTop: 8 }}>
          {saving ? t.saving : t.submitRating}
        </button>
      </div>

      {/* reviews */}
      {rs.filter((r) => r.text).length > 0 && (
        <div style={{ marginTop: 16 }}>
          <strong>{t.reviews}</strong>
          {rs.filter((r) => r.text).map((r) => (
            <div key={r.id} style={{ ...card, marginTop: 8 }}>
              <Stars value={r.stars} size={13} />
              <div style={{ marginTop: 4, color: "#5a4850" }}>{r.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Top Lists ----------
function TopLists({ demoTopList, setSelected, t }) {
  const ranges = { All: [0, 200], "18–29": [18, 29], "30–44": [30, 44], "45+": [45, 200] };
  return (
    <div>
      <h2 style={{ fontSize: 20, marginBottom: 4 }}>{t.top10}</h2>
      <p style={{ fontSize: 13, color: "#9a8088", marginBottom: 16 }}>
        {t.top10sub}
      </p>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <TopListColumn defaultGender="Masculine" defaultAge="All"
          ranges={ranges} demoTopList={demoTopList} setSelected={setSelected} t={t} />
        <TopListColumn defaultGender="Feminine" defaultAge="All"
          ranges={ranges} demoTopList={demoTopList} setSelected={setSelected} t={t} />
      </div>
    </div>
  );
}

function TopListColumn({ defaultGender, defaultAge, ranges, demoTopList, setSelected, t }) {
  const [gender, setGender] = useState(defaultGender);
  const [age, setAge] = useState(defaultAge);
  const [lo, hi] = ranges[age];
  const list = demoTopList(gender, lo, hi);
  const sel = { padding: "7px 9px", background: "#fff", color: "#3a2b30", border: "1px solid #f0dce2", borderRadius: 8, fontSize: 13, flex: 1 };
  return (
    <div style={{ flex: "1 1 300px", minWidth: 260 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <select value={gender} onChange={(e) => setGender(e.target.value)} style={sel}>
          {["All", "Masculine", "Feminine", "Unisex"].map((g) => <option key={g} value={g}>{genderLabel(t, g)}</option>)}
        </select>
        <select value={age} onChange={(e) => setAge(e.target.value)} style={sel}>
          {Object.keys(ranges).map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>
      {list.length === 0 && (
        <div style={{ color: "#a8909a", fontSize: 13, padding: "10px 0" }}>
          {t.noRatingsGroup}
        </div>
      )}
      {list.map((x, i) => {
        const medal = ["#e8a23c", "#bba9b0", "#c98a5a"][i];
        return (
        <div key={x.perfume.id} onClick={() => setSelected(x.perfume)}
          style={{ ...card, display: "flex", alignItems: "center", gap: 10, padding: 10,
            borderLeft: medal ? `3px solid ${medal}` : "3px solid transparent" }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: medal || "#b59aa2", width: 22, textAlign: "center" }}>{i + 1}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#3a2b30", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{x.perfume.name}</div>
            <div style={{ fontSize: 11, color: "#9a8088" }}>{x.perfume.house}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 14, color: "#d14d75", fontWeight: 800 }}>{x.score}</div>
            <div style={{ fontSize: 10, color: "#b59aa2" }}>({x.count})</div>
          </div>
        </div>
        );
      })}
    </div>
  );
}

// ---------- Account ----------
function Account({ user, profile, setProfile, isAdmin, seedDatabase, perfumeCount, ratingCount, t }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mode, setMode] = useState("login");
  const [gender, setGender] = useState(profile?.gender || "Masculine");
  const [age, setAge] = useState(profile?.age || "");

  const authAction = async () => {
    try {
      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: username });
        await setDoc(doc(db, "users", cred.user.uid), {
          username, email, gender, age: age ? Number(age) : null, createdAt: new Date().toISOString(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (e) { alert(e.message); }
  };

  const saveProfile = async () => {
    await setDoc(doc(db, "users", user.uid), {
      ...profile, gender, age: age ? Number(age) : null,
    }, { merge: true });
    setProfile((p) => ({ ...p, gender, age: age ? Number(age) : null }));
    alert(t.saved);
  };

  const sel = { padding: "10px", background: "#fff", color: "#3a2b30", border: "1px solid #f0dce2", borderRadius: 8, width: "100%", marginBottom: 8 };

  if (!user) {
    return (
      <div style={{ maxWidth: 340 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>{mode === "login" ? t.signin : t.createAccount}</h2>
        {mode === "signup" && <input style={sel} placeholder={t.username} value={username} onChange={(e) => setUsername(e.target.value)} />}
        <input style={sel} placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input style={sel} type="password" placeholder={t.password} value={password} onChange={(e) => setPassword(e.target.value)} />
        {mode === "signup" && <>
          <select style={sel} value={gender} onChange={(e) => setGender(e.target.value)}>
            {["Masculine", "Feminine", "Unisex"].map((g) => <option key={g} value={g}>{genderLabel(t, g)}</option>)}
          </select>
          <input style={sel} type="number" placeholder={t.ageForLists} value={age} onChange={(e) => setAge(e.target.value)} />
        </>}
        <button onClick={authAction} style={primaryBtn}>{mode === "login" ? t.signin : t.signup}</button>
        <button onClick={() => setMode(mode === "login" ? "signup" : "login")} style={{ ...linkBtn, marginTop: 10 }}>
          {mode === "login" ? t.newHere : t.haveAccount}
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 360 }}>
      <h2 style={{ fontSize: 20, marginBottom: 4, color: "#3a2b30" }}>{profile?.username || user.email}</h2>
      <div style={{ fontSize: 13, color: "#9a8088", marginBottom: 16 }}>{user.email}</div>

      <div style={box}>
        <strong>{t.yourDemographics}</strong>
        <div style={{ fontSize: 12, color: "#a8909a", marginBottom: 8 }}>{t.demographicsSub}</div>
        <select style={sel} value={gender} onChange={(e) => setGender(e.target.value)}>
          {["Masculine", "Feminine", "Unisex"].map((g) => <option key={g} value={g}>{genderLabel(t, g)}</option>)}
        </select>
        <input style={sel} type="number" placeholder={t.age} value={age} onChange={(e) => setAge(e.target.value)} />
        <button onClick={saveProfile} style={primaryBtn}>{t.save}</button>
      </div>

      {isAdmin && (
        <div style={{ ...box, marginTop: 12, border: "1px solid #e8829e" }}>
          <strong>{t.admin}</strong>
          <div style={{ fontSize: 13, color: "#9a8088", margin: "6px 0" }}>
            {perfumeCount} {t.perfumes} · {ratingCount} ratings {t.inDatabase}
          </div>
          <button onClick={seedDatabase} style={primaryBtn}>{t.seedBtn}</button>
        </div>
      )}

      <button onClick={() => signOut(auth)} style={{ ...linkBtn, marginTop: 16 }}>{t.signout}</button>
    </div>
  );
}

// ---------- small components & styles ----------
const Tag = ({ children, accent }) => (
  <span style={{
    fontSize: 11, padding: "3px 8px", borderRadius: 12,
    background: accent ? "#fbe4ec" : "#f6eef1", color: accent ? "#c64a72" : "#8a7079",
    border: accent ? "1px solid #efa6bc" : "1px solid #f0dce2",
  }}>{children}</span>
);

const NoteRow = ({ label, notes }) => (
  <div style={{ marginBottom: 6 }}>
    <span style={{ fontSize: 12, color: "#a8909a", width: 50, display: "inline-block" }}>{label}</span>
    <span style={{ fontSize: 13, color: "#3a2b30" }}>{notes?.join(", ") || "–"}</span>
  </div>
);

const SliderRow = ({ label, help, value, setValue }) => (
  <div style={{ margin: "10px 0" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6a555c" }}>
      <span style={{ fontWeight: 600 }}>{label}</span><span>{value}/10</span>
    </div>
    {help && <div style={{ fontSize: 11, color: "#a8909a", marginBottom: 2 }}>{help}</div>}
    <input type="range" min="1" max="10" value={value} onChange={(e) => setValue(Number(e.target.value))}
      style={{ width: "100%", accentColor: "#d96b8a" }} />
  </div>
);

const card = { background: "#ffffff", border: "1px solid #f0dce2", borderRadius: 12, padding: 14, marginBottom: 10, cursor: "pointer", boxShadow: "0 2px 10px rgba(180,120,140,0.07)" };
const box = { background: "#ffffff", border: "1px solid #f0dce2", borderRadius: 12, padding: 14, boxShadow: "0 2px 10px rgba(180,120,140,0.07)" };
const primaryBtn = { width: "100%", padding: "11px", background: "linear-gradient(90deg, #e8829e, #d96b8a)", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 };
const linkBtn = { background: "none", border: "none", color: "#d96b8a", cursor: "pointer", fontSize: 14, padding: 0 };
