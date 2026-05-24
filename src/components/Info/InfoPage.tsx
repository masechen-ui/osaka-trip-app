export default function InfoPage() {
  return (
    <div className="p-4 pb-6">

      {/* ── 訂位資訊 ── */}
      <h2 className="font-journal text-lg text-stamp mb-3">🗂️ 訂位資訊</h2>

      {/* 機票 去程 */}
      <div className="rounded-2xl overflow-hidden border-2 border-border shadow-card mb-3">
        <div className="p-4" style={{ background: "#6B8FA8" }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-white text-[10px] opacity-80">桃園</div>
              <div className="text-white text-3xl font-bold font-journal">TPE</div>
            </div>
            <div className="text-white text-xl">✈</div>
            <div className="text-right">
              <div className="text-white text-[10px] opacity-80">關西</div>
              <div className="text-white text-3xl font-bold font-journal">KIX</div>
            </div>
          </div>
          <div className="flex gap-4 text-white text-[11px] opacity-90">
            <span>長榮 BR132</span>
            <span>5/25（一）08:20</span>
            <span>抵達 11:55</span>
          </div>
        </div>
        <div className="flex mx-4">
          <div className="w-4 h-4 rounded-full -ml-4 flex-shrink-0" style={{ background: "#F5F0E8" }} />
          <div className="flex-1 border-t-2 border-dashed border-border my-2" />
          <div className="w-4 h-4 rounded-full -mr-4 flex-shrink-0" style={{ background: "#F5F0E8" }} />
        </div>
        <div className="grid grid-cols-3 gap-2 px-4 pb-4">
          <div><div className="text-[9px] text-muted uppercase tracking-wide">航廈</div><div className="text-sm font-medium">T2 出發</div></div>
          <div><div className="text-[9px] text-muted uppercase tracking-wide">行李</div><div className="text-sm font-medium">23kg × 1</div></div>
          <div><div className="text-[9px] text-muted uppercase tracking-wide">手提</div><div className="text-sm font-medium">7kg</div></div>
        </div>
      </div>

      {/* 機票 回程 */}
      <div className="rounded-2xl overflow-hidden border-2 border-border shadow-card mb-4">
        <div className="p-4" style={{ background: "#D4956A" }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-white text-[10px] opacity-80">關西</div>
              <div className="text-white text-3xl font-bold font-journal">KIX</div>
            </div>
            <div className="text-white text-xl">✈</div>
            <div className="text-right">
              <div className="text-white text-[10px] opacity-80">桃園</div>
              <div className="text-white text-3xl font-bold font-journal">TPE</div>
            </div>
          </div>
          <div className="flex gap-4 text-white text-[11px] opacity-90">
            <span>捷星 GK55</span>
            <span>5/29（五）15:20</span>
            <span>抵達 17:20</span>
          </div>
        </div>
        <div className="flex mx-4">
          <div className="w-4 h-4 rounded-full -ml-4 flex-shrink-0" style={{ background: "#F5F0E8" }} />
          <div className="flex-1 border-t-2 border-dashed border-border my-2" />
          <div className="w-4 h-4 rounded-full -mr-4 flex-shrink-0" style={{ background: "#F5F0E8" }} />
        </div>
        <div className="grid grid-cols-3 gap-2 px-4 pb-4">
          <div><div className="text-[9px] text-muted uppercase tracking-wide">航廈</div><div className="text-sm font-medium">T1 抵達</div></div>
          <div><div className="text-[9px] text-muted uppercase tracking-wide">行李</div><div className="text-sm font-medium">20kg × 1</div></div>
          <div><div className="text-[9px] text-muted uppercase tracking-wide">手提</div><div className="text-sm font-medium text-stamp font-bold">嚴格 7kg</div></div>
        </div>
      </div>

      {/* 飯店 */}
      <div className="bg-card border-2 border-border rounded-2xl p-4 shadow-card mb-3">
        <div className="flex items-start gap-2 mb-3">
          <span className="text-xl">🏨</span>
          <div>
            <div className="font-bold text-stamp text-base">VIA INN Shinsaibashi</div>
            <div className="text-xs text-muted">〒542-0086 大阪府大阪市中央區西心齋橋 1-10-15</div>
            <div className="text-xs text-muted">06-6121-5489</div>
            <div className="text-xs text-muted">地鐵御堂筋線心齋橋站 7/8 號出口步行 2 分鐘</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
          <div className="bg-bg rounded-xl p-2 text-center">
            <div className="text-[10px] text-muted mb-0.5">Check-in</div>
            <div className="font-bold">15:00</div>
          </div>
          <div className="bg-bg rounded-xl p-2 text-center">
            <div className="text-[10px] text-muted mb-0.5">Check-out</div>
            <div className="font-bold">10:00</div>
          </div>
        </div>
        <div className="border-t border-border pt-3 flex flex-col gap-2">
          {[
            { room: "雙床房（Twin）", guests: "靜怡、小陳", platform: "Hotels.com", price: "NT$10,583", no: "73344222353419" },
            { room: "大床房（Superior Double）", guests: "名時、佳樺", platform: "Hotels.com", price: "NT$9,209", no: "73377852033208" },
            { room: "雙床房（Twin）", guests: "子奇、阿侖", platform: "Agoda", price: "NT$11,036", no: "1713375137" },
          ].map((r, i) => (
            <div key={i} className="bg-bg rounded-xl p-2.5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-medium">{r.room}</div>
                  <div className="text-[11px] text-muted">{r.guests}</div>
                  <div className="text-[10px] text-muted mt-0.5">{r.platform} · #{r.no}</div>
                </div>
                <div className="text-sm font-bold text-stamp">{r.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 bg-tag-food rounded-xl p-2.5 text-xs text-amber-700">
          💡 住宿稅需現場現金支付，每人每晚約 100〜300 日圓
        </div>
      </div>

      {/* 票券 */}
      <div className="bg-card border-2 border-border rounded-2xl p-4 shadow-card mb-4">
        <div className="text-sm font-bold text-stamp mb-3">🎫 票券 & 預約</div>
        {[
          { icon: "🚢", name: "海之京都一日遊（含海之列車）", date: "5/26（二）", price: "NT$12,050", note: "Klook 憑證，07:15 日本橋 2 號出口集合" },
          { icon: "🃏", name: "大阪周遊卡 1日券", date: "5/28（四）使用", price: "約 ¥3,300", note: "數位版，含聖瑪麗亞號・摩天輪・通天閣" },
          { icon: "🥩", name: "力丸燒肉 心齋橋店", date: "5/25（一）20:00", price: "¥4,488 × 6人", note: "訂位：CHEN Tim・6人（含1小朋友）・120分鐘吃到飽" },
        ].map((t, i) => (
          <div key={i} className="flex gap-3 py-2.5 border-b border-border last:border-0">
            <div className="w-9 h-9 bg-bg rounded-xl flex items-center justify-center text-lg flex-shrink-0">{t.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{t.name}</div>
              <div className="text-[11px] text-muted">{t.date}</div>
              <div className="text-[11px] text-muted">{t.note}</div>
            </div>
            <div className="text-xs font-bold text-stamp flex-shrink-0">{t.price}</div>
          </div>
        ))}
      </div>

      {/* ── 附記資料 ── */}
      <h2 className="font-journal text-lg text-stamp mb-3">📎 附記資料</h2>

      {/* 交通票券 */}
      <div className="bg-card border-2 border-border rounded-2xl p-4 shadow-card mb-3">
        <div className="text-sm font-bold text-stamp mb-2">🚇 交通票券</div>
        <div className="flex flex-col gap-2">
          {[
            { name: "ICOCA", desc: "Day 1、3、5 使用。關西機場車站購買，¥2,000（含¥500押金）" },
            { name: "大阪周遊卡", desc: "Day 4 使用。¥3,300，無限搭地鐵 + 多個景點免費入場" },
            { name: "南海電鐵 空港急行", desc: "機場↔難波，¥930，約48分鐘" },
            { name: "京阪電車", desc: "淀屋橋↔伏見稻荷 ¥430，↔祇園四條 ¥430" },
          ].map((t, i) => (
            <div key={i} className="bg-bg rounded-xl p-2.5">
              <div className="text-xs font-bold mb-0.5">{t.name}</div>
              <div className="text-[11px] text-muted leading-relaxed">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 省錢攻略 */}
      <div className="bg-card border-2 border-border rounded-2xl p-4 shadow-card mb-3">
        <div className="text-sm font-bold text-stamp mb-2">💴 省錢攻略</div>
        <div className="flex flex-col gap-2 text-xs text-text leading-relaxed">
          <div className="flex gap-2"><span>🕗</span><span>晚上8點後逛LIFE超市或玉出超市，生魚片、草莓、和牛便當常有「半額」標籤</span></div>
          <div className="flex gap-2"><span>🏷️</span><span>唐吉訶德結帳前搜尋「唐吉訶德 優惠券」，掃條碼可額外再折5%</span></div>
          <div className="flex gap-2"><span>⚠️</span><span>道頓堀街頭如遇熱情拉客推薦「便宜居酒屋」請直接拒絕，通常有隱藏座席費</span></div>
        </div>
      </div>

      {/* 拍照攻略 */}
      <div className="bg-card border-2 border-border rounded-2xl p-4 shadow-card mb-3">
        <div className="text-sm font-bold text-stamp mb-2">📸 拍照打卡指南</div>
        <div className="flex flex-col gap-2 text-xs text-text leading-relaxed">
          <div className="flex gap-2"><span>🏃</span><span>固力果跑跑人：走到河邊水上步道，由下往上仰拍，六人合照最漂亮</span></div>
          <div className="flex gap-2"><span>⛩️</span><span>伏見稻荷：往上走15分鐘到奧社，人潮銳減光影更美</span></div>
          <div className="flex gap-2"><span>🎋</span><span>嵐山竹林：廣角鏡頭由下往上仰拍，拍出竹林高聳感並避開人頭</span></div>
          <div className="flex gap-2 text-stamp font-medium"><span>🚫</span><span>祇園私人巷弄拍照罰款 ¥10,000，絕對不可對著藝妓按快門</span></div>
        </div>
      </div>

      {/* 實用 APP */}
      <div className="bg-card border-2 border-border rounded-2xl p-4 shadow-card mb-3">
        <div className="text-sm font-bold text-stamp mb-2">📱 實用 APP</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "Google Maps", desc: "市區導航首選" },
            { name: "換乘案內", desc: "日本電車轉乘" },
            { name: "VoiceTra", desc: "中日語音互譯" },
            { name: "Tenki.jp", desc: "每小時降雨機率" },
          ].map((a, i) => (
            <div key={i} className="bg-bg rounded-xl p-2.5">
              <div className="text-xs font-bold">{a.name}</div>
              <div className="text-[10px] text-muted">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 行動電源規定 */}
      <div className="bg-card border-2 border-border rounded-2xl p-4 shadow-card mb-3">
        <div className="text-sm font-bold text-stamp mb-2">🔋 行動電源規定（2026新制）</div>
        <div className="flex flex-col gap-1.5 text-xs text-text leading-relaxed">
          <div className="flex gap-2"><span>✅</span><span>每人限帶 2 個，一律隨身手提</span></div>
          <div className="flex gap-2"><span>🚫</span><span>嚴禁放置於託運行李</span></div>
          <div className="flex gap-2"><span>🚫</span><span>航程中嚴禁使用及充電</span></div>
          <div className="flex gap-2"><span>💡</span><span>建議分別放入塑膠袋，避免接觸金屬短路</span></div>
          <div className="flex gap-2"><span>💡</span><span>候機室先充飽，上機後收入前方座椅下的隨身包</span></div>
        </div>
      </div>

      {/* 緊急聯絡 */}
      <div className="bg-card border-2 border-border rounded-2xl p-4 shadow-card">
        <div className="text-sm font-bold text-stamp mb-2">🆘 緊急資訊</div>
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex justify-between items-center py-1.5 border-b border-border">
            <span className="text-muted">飯店電話</span>
            <span className="font-medium">06-6121-5489</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border">
            <span className="text-muted">日本急救</span>
            <span className="font-medium">119（救護）/ 110（警察）</span>
          </div>
          <div className="flex justify-between items-center py-1.5">
            <span className="text-muted">就醫資源</span>
            <a href="https://www.jnto.go.jp/emergency/chc/mi_guide.html" target="_blank" rel="noopener noreferrer"
              className="text-accent-3 underline">JNTO 中文醫療指南</a>
          </div>
        </div>
      </div>

    </div>
  )
}
