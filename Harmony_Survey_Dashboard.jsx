import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from "recharts";

const COLORS = {
  harmony: "#2D6A4F",
  ashirwad: "#E76F51",
  accent: "#457B9D",
  gold: "#E9C46A",
  soft: "#A8DADC",
  bg: "#F8F9FA",
  dark: "#1D3557",
  light: "#F1FAEE",
  muted: "#6C757D",
};

const PALETTE = ["#2D6A4F","#E76F51","#457B9D","#E9C46A","#A8DADC","#F4A261","#264653","#2A9D8F"];

// ── DATA ──────────────────────────────────────────────────────────────────────
const outletTypeData = [
  { name: "Kirana", value: 65 },
  { name: "Supermarket", value: 22 },
  { name: "Bakery", value: 7 },
  { name: "Traders", value: 2 },
];

const primaryBrandData = [
  { name: "Ashirwad", value: 82 },
  { name: "Harmony", value: 12 },
  { name: "Silver Coin", value: 1 },
];

const productsSoldData = [
  { name: "Maida", value: 96 },
  { name: "Chakki Atta", value: 91 },
  { name: "Sooji", value: 86 },
  { name: "Dalia", value: 60 },
];

const reasonsData = [
  { name: "Quality", value: 87 },
  { name: "Price", value: 85 },
  { name: "Customer Demand", value: 84 },
  { name: "Availability", value: 78 },
  { name: "Brand Name", value: 77 },
];

const switchFactorsData = [
  { name: "Better Quality", value: 83 },
  { name: "Better Margin", value: 83 },
  { name: "Regular Supply", value: 81 },
  { name: "Lower Price", value: 58 },
];

const maidaBrandsData = [
  { name: "Harmony", value: 58 },
  { name: "Annapurna", value: 11 },
  { name: "Ashirwad", value: 10 },
  { name: "Captain", value: 4 },
  { name: "Loose", value: 4 },
  { name: "Others", value: 12 },
];

const soojiBrandsData = [
  { name: "Harmony", value: 60 },
  { name: "Ashirwad", value: 10 },
  { name: "Annapurna", value: 9 },
  { name: "Others", value: 7 },
];

const daliaBrandsData = [
  { name: "Harmony", value: 49 },
  { name: "Ashirwad", value: 10 },
  { name: "Loose", value: 2 },
  { name: "Others", value: 6 },
];

const areaData = [
  { name: "MVP Colony", value: 11 },
  { name: "Gajuwaka", value: 10 },
  { name: "Purna Market", value: 9 },
  { name: "Marripalem", value: 5 },
  { name: "HB Colony", value: 5 },
  { name: "Visalakshi Nagar", value: 5 },
  { name: "Kurmannapalem", value: 5 },
  { name: "Akkayyapalem", value: 4 },
  { name: "Adarsh Nagar", value: 4 },
];

const radarData = [
  { subject: "Maida", Harmony: 58, Ashirwad: 10 },
  { subject: "Sooji", Harmony: 60, Ashirwad: 10 },
  { subject: "Dalia", Harmony: 49, Ashirwad: 10 },
  { subject: "Chakki Atta", Harmony: 12, Ashirwad: 82 },
];

const suggestions = [
  { area: "Gajuwaka", outlet: "Sri Rama Kirana", note: "Company vehicle doesn't stop; stock info not shared in advance" },
  { area: "Gajuwaka", outlet: "G Mart Supermarket", note: "Weekly payments needed instead of cash; no salesman visits" },
  { area: "Gajuwaka", outlet: "Gajuwaka Supermarket", note: "Need monthly price updates; no regular rep visits" },
  { area: "MVP Colony", outlet: "Sri surya Generals", note: "No Harmony contact since COVID; supply stopped" },
  { area: "MVP Colony", outlet: "Sri Devi General Stores", note: "No demand after D-Mart; no retail sales" },
  { area: "MVP Colony", outlet: "Hanuman Stores", note: "Company service required" },
  { area: "MVP Colony", outlet: "SKML Kirana", note: "Company supply needed" },
  { area: "Visalakshi Nagar", outlet: "New Sai Srinivasa Super Market", note: "Company executive never visited" },
  { area: "Visalakshi Nagar", outlet: "Sri Sai Durga Generals", note: "Expiry too short — 3 months minimum needed" },
  { area: "Madhavadhara", outlet: "Durga Laxmi Super Market", note: "No Harmony distributors in this area" },
  { area: "Railway New Colony", outlet: "J.M Stores", note: "Silver Coin offers same price; price intimation missing" },
  { area: "Kurmannapalem", outlet: "Rama General Store", note: "Lalitha brand is direct competition to Harmony" },
  { area: "Kurmannapalem", outlet: "Sri Srinivasa Dept. Store", note: "Sooji getting spoiled before expiry date" },
  { area: "N.A.D", outlet: "Neeharika Supermarket", note: "Bulk bags only; need 1kg loose packs" },
  { area: "N.A.D", outlet: "S.K.M.L Departmental Stores", note: "Getting better prices at Walmart" },
  { area: "Arilova", outlet: "Sri Venkata Sai Kirana", note: "No company representative has approached" },
  { area: "Viman Nagar", outlet: "Vijaya General Store", note: "Representative visits lacking" },
  { area: "Allipuram", outlet: "Jai Santoshi Matha", note: "Order-based system should be implemented" },
  { area: "Madhurawada", outlet: "Sri Ayyappa Supermarket", note: "Rate differences from outside market" },
  { area: "Muralinagar", outlet: "Roja Super Market", note: "Atta quality needs improvement" },
];

// ── COMPONENTS ────────────────────────────────────────────────────────────────

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.dark, margin: 0, fontFamily: "'Georgia', serif", letterSpacing: "-0.3px" }}>
      {children}
    </h2>
    {sub && <p style={{ fontSize: 12, color: COLORS.muted, margin: "4px 0 0", fontFamily: "sans-serif" }}>{sub}</p>}
  </div>
);

const KpiCard = ({ label, value, sub, color }) => (
  <div style={{
    background: "#fff", borderRadius: 12, padding: "18px 22px",
    borderLeft: `4px solid ${color || COLORS.harmony}`,
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)", flex: 1, minWidth: 130
  }}>
    <div style={{ fontSize: 28, fontWeight: 900, color: color || COLORS.harmony, fontFamily: "sans-serif" }}>{value}</div>
    <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.dark, marginTop: 2 }}>{label}</div>
    {sub && <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>{sub}</div>}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <div style={{ fontWeight: 700, color: COLORS.dark, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name === "value" ? "" : `${p.name}: `}{p.value}
          {p.payload.total ? ` (${Math.round(p.value / p.payload.total * 100)}%)` : ""}
        </div>
      ))}
    </div>
  );
};

const TABS = ["Overview", "Brand Share", "Products", "Motivations", "Area & Suggestions"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ fontFamily: "sans-serif", background: COLORS.bg, minHeight: "100vh", padding: "0" }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.dark} 0%, #2D6A4F 100%)`,
        padding: "28px 32px 22px", color: "#fff"
      }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", opacity: 0.7, marginBottom: 6 }}>
          Market Survey Analysis
        </div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, fontFamily: "'Georgia', serif", letterSpacing: "-0.5px" }}>
          Harmony Foods — Chakki Atta
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, opacity: 0.75 }}>
          Field Survey · Visakhapatnam · 99 Outlets · 2026
        </p>
      </div>

      {/* KPI Strip */}
      <div style={{ display: "flex", gap: 12, padding: "16px 24px", flexWrap: "wrap" }}>
        <KpiCard label="Outlets Surveyed" value="99" sub="Across 32 areas" color={COLORS.dark} />
        <KpiCard label="Kirana Stores" value="65%" sub="Dominant outlet type" color={COLORS.accent} />
        <KpiCard label="Ashirwad Dominance" value="87%" sub="Primary Chakki Atta brand" color={COLORS.ashirwad} />
        <KpiCard label="Harmony's Strength" value="Maida/Sooji" sub="Leader in non-atta products" color={COLORS.harmony} />
        <KpiCard label="Quality Matters" value="92/99" sub="Outlets say yes" color={COLORS.gold} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, padding: "0 24px", borderBottom: "2px solid #e8e8e8", background: "#fff" }}>
        {TABS.map((tab, i) => (
          <button key={i} onClick={() => setActiveTab(i)} style={{
            border: "none", background: "none", padding: "12px 18px",
            fontSize: 13, fontWeight: activeTab === i ? 700 : 400,
            color: activeTab === i ? COLORS.harmony : COLORS.muted,
            borderBottom: activeTab === i ? `3px solid ${COLORS.harmony}` : "3px solid transparent",
            cursor: "pointer", transition: "all 0.2s", marginBottom: -2, whiteSpace: "nowrap"
          }}>
            {tab}
          </button>
        ))}
      </div>

      <div style={{ padding: "24px 24px 32px" }}>

        {/* ── TAB 0: OVERVIEW ── */}
        {activeTab === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {/* Outlet Types - Pie */}
              <div style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", flex: "1 1 300px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <SectionTitle sub="Who was surveyed?">Outlet Type Distribution</SectionTitle>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={outletTypeData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {outletTypeData.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Area Distribution */}
              <div style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", flex: "1 1 350px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <SectionTitle sub="Top 9 areas by outlet count">Area-wise Coverage</SectionTitle>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={areaData} layout="vertical" margin={{ left: 80, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={80} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill={COLORS.accent} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Products sold */}
            <div style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <SectionTitle sub="How many outlets sell each product (out of 99)">Wheat Product Portfolio at Outlets</SectionTitle>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={productsSoldData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 600 }} />
                  <YAxis domain={[0, 99]} tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {productsSoldData.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p style={{ fontSize: 11, color: COLORS.muted, margin: "8px 0 0" }}>
                💡 Maida and Chakki Atta are near-universal. Dalia has the most room to grow.
              </p>
            </div>
          </div>
        )}

        {/* ── TAB 1: BRAND SHARE ── */}
        {activeTab === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {/* Primary Chakki Atta */}
              <div style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", flex: "1 1 280px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <SectionTitle sub="Primary Chakki Atta brand used/sold">Chakki Atta Brand Share</SectionTitle>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={primaryBrandData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}>
                      <Cell fill={COLORS.ashirwad} />
                      <Cell fill={COLORS.harmony} />
                      <Cell fill={COLORS.gold} />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ background: "#FFF3EE", borderRadius: 8, padding: "10px 14px", fontSize: 11, color: "#8B3A0A", marginTop: 8 }}>
                  ⚠️ Ashirwad controls 87% of primary Chakki Atta. Harmony's atta share is just 13% — a major growth opportunity.
                </div>
              </div>

              {/* Radar — Harmony vs Ashirwad across categories */}
              <div style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", flex: "1 1 320px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <SectionTitle sub="Outlets selling each brand per category">Harmony vs Ashirwad — Category Presence</SectionTitle>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 90]} tick={{ fontSize: 9 }} />
                    <Radar name="Harmony" dataKey="Harmony" stroke={COLORS.harmony} fill={COLORS.harmony} fillOpacity={0.4} />
                    <Radar name="Ashirwad" dataKey="Ashirwad" stroke={COLORS.ashirwad} fill={COLORS.ashirwad} fillOpacity={0.3} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
                <p style={{ fontSize: 11, color: COLORS.muted, margin: "8px 0 0" }}>
                  💡 Harmony dominates Maida, Sooji & Dalia — Chakki Atta is the only gap.
                </p>
              </div>
            </div>

            {/* Maida / Sooji / Dalia brands */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { title: "Maida Brand Share", data: maidaBrandsData },
                { title: "Sooji Brand Share", data: soojiBrandsData },
                { title: "Dalia Brand Share", data: daliaBrandsData },
              ].map(({ title, data }, idx) => (
                <div key={idx} style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", flex: "1 1 220px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <SectionTitle>{title}</SectionTitle>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={data} cx="50%" cy="50%" outerRadius={70} dataKey="value"
                        label={({ name, percent }) => percent > 0.06 ? `${name}\n${(percent*100).toFixed(0)}%` : ""} labelLine={false}>
                        {data.map((entry, i) => (
                          <Cell key={i} fill={entry.name === "Harmony" ? COLORS.harmony : entry.name === "Ashirwad" ? COLORS.ashirwad : PALETTE[i+2]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 2: PRODUCTS ── */}
        {activeTab === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", flex: "1 1 300px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <SectionTitle sub="Pack sizes preferred for Chakki Atta">Pack Size Preference</SectionTitle>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={[{ name: "1 Kg", value: 91 }, { name: "5 Kg", value: 11 }]}
                      cx="50%" cy="50%" outerRadius={80} dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent*100).toFixed(0)}%`}>
                      <Cell fill={COLORS.harmony} />
                      <Cell fill={COLORS.gold} />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <p style={{ fontSize: 11, color: COLORS.muted, margin: "8px 0 0" }}>
                  💡 1Kg packs are overwhelmingly preferred — retail / household-driven demand.
                </p>
              </div>

              <div style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", flex: "1 1 360px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <SectionTitle sub="Number of outlets selling each product">Product Penetration Across Outlets</SectionTitle>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={productsSoldData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 99]} tick={{ fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {productsSoldData.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quality card */}
            <div style={{ background: `linear-gradient(135deg, ${COLORS.harmony}15, ${COLORS.harmony}05)`, border: `1px solid ${COLORS.harmony}30`, borderRadius: 14, padding: "22px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.harmony }}>92%</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.dark, marginTop: 4 }}>of outlets say quality consistency matters</div>
              <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 6, maxWidth: 520 }}>
                This is a critical signal — if Harmony can guarantee consistent quality across batches, it has a strong lever to grow Chakki Atta market share, where Ashirwad currently dominates on perceived quality.
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: MOTIVATIONS ── */}
        {activeTab === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", flex: "1 1 320px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <SectionTitle sub="Why do outlets choose their primary Chakki Atta brand?">Reasons for Brand Choice</SectionTitle>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={reasonsData} layout="vertical" margin={{ left: 120, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 99]} tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fontWeight: 600 }} width={120} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill={COLORS.accent} radius={[0, 6, 6, 0]}>
                      {reasonsData.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p style={{ fontSize: 11, color: COLORS.muted, margin: "8px 0 0" }}>
                  💡 Quality, Price, and Customer Demand are almost equally important — no single factor dominates.
                </p>
              </div>

              <div style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", flex: "1 1 320px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <SectionTitle sub="What would make an outlet switch brands?">Switch Triggers</SectionTitle>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={switchFactorsData} layout="vertical" margin={{ left: 120, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 99]} tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fontWeight: 600 }} width={120} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill={COLORS.harmony} radius={[0, 6, 6, 0]}>
                      {switchFactorsData.map((_, i) => <Cell key={i} fill={[COLORS.harmony, COLORS.harmony, COLORS.accent, COLORS.gold][i]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p style={{ fontSize: 11, color: COLORS.muted, margin: "8px 0 0" }}>
                  💡 Better Quality + Better Margin + Regular Supply = the trifecta to win over outlets.
                </p>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <SectionTitle>Key Takeaways from Motivations</SectionTitle>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {[
                  { icon: "🏆", title: "Quality is King", body: "87 of 99 outlets cite quality as a reason — Harmony's product quality is its biggest competitive lever." },
                  { icon: "💰", title: "Margins Matter", body: "83 outlets would switch if offered better margins — pricing and trade incentive programs are critical." },
                  { icon: "🚚", title: "Reliable Supply", body: "81 outlets want regular supply — visit frequency and stock reliability directly impact brand loyalty." },
                  { icon: "📊", title: "Brand Awareness Gap", body: "77 outlets cite brand name as a reason — Harmony needs stronger brand building in Chakki Atta specifically." },
                ].map(({ icon, title, body }, i) => (
                  <div key={i} style={{ flex: "1 1 200px", background: COLORS.light, borderRadius: 10, padding: "16px 18px" }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.dark, marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted, lineHeight: 1.5 }}>{body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: AREA & SUGGESTIONS ── */}
        {activeTab === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <SectionTitle sub="21 outlets shared feedback — grouped by area">Area-wise Suggestions from Outlets</SectionTitle>

              {/* Theme summary */}
              <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                {[
                  { label: "No Rep Visits", count: 9, color: "#E76F51" },
                  { label: "Pricing Issues", count: 5, color: "#457B9D" },
                  { label: "Supply / Logistics", count: 5, color: "#2D6A4F" },
                  { label: "Product Issues", count: 3, color: "#E9C46A" },
                ].map(({ label, count, color }) => (
                  <div key={label} style={{ background: color + "15", border: `1px solid ${color}40`, borderRadius: 8, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.dark }}>{label}</span>
                    <span style={{ fontSize: 12, fontWeight: 900, color }}>{count}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {suggestions.map((s, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, alignItems: "flex-start",
                    padding: "12px 16px", borderRadius: 10,
                    background: i % 2 === 0 ? "#F8FAFB" : "#fff",
                    border: "1px solid #eee"
                  }}>
                    <div style={{
                      background: COLORS.harmony, color: "#fff", borderRadius: 6,
                      padding: "3px 10px", fontSize: 10, fontWeight: 700,
                      whiteSpace: "nowrap", flexShrink: 0, marginTop: 1
                    }}>
                      {s.area}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.dark }}>{s.outlet}</div>
                      <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>{s.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
