<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { getTravelLogTransactions } from "@/api/travelLog.js"; // ✅ axios 인스턴스 사용(토큰 자동 첨부)

/* ===== props ===== */
const props = defineProps({
  travelId: { type: [Number, String], required: true },
});

/* ===== 상수/상태 ===== */
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const PIN_COLOR = "#236FFF";

const mapElement = ref(null);
const map = ref(null);
const isLoading = ref(true);
const errorMsg = ref("");

const todayAmount = ref(0);
const totalAmount = ref(0);
const markers = [];

/* 바텀시트 */
const isSheetOpen = ref(false);
const selectedTx = ref(null);
const sheetEl = ref(null);

/* ===== 유틸 ===== */
const krw = (n) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

const krwCompact = (n) =>
  "₩" +
  new Intl.NumberFormat("ko-KR", { notation: "compact", maximumFractionDigits: 1 }).format(
    Number(n) || 0,
  );

const formatDateKR = (iso) =>
  new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function waitForElementInDOM(elRef, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const start = performance.now();
    (function check() {
      const el = elRef?.value;
      if (el instanceof HTMLElement && document.body.contains(el)) return resolve(el);
      if (performance.now() - start > timeoutMs)
        return reject(new Error("mapElement가 DOM에 없습니다."));
      requestAnimationFrame(check);
    })();
  });
}

function loadGoogleMapsScript(key) {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) return resolve();
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/* 단일 색상 SVG 가격 핀 */
function makePricePin(amount) {
  const text = krwCompact(amount);
  const fontSize = 12,
    paddingX = 8,
    paddingY = 6,
    tailH = 8;
  const textW = Math.max(14, text.length * (fontSize * 0.6));
  const w = Math.round(textW + paddingX * 2);
  const h = Math.round(fontSize + paddingY * 2);
  const totalH = h + tailH;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${totalH}">
      <defs><filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.25"/>
      </filter></defs>
      <g filter="url(#shadow)">
        <rect x="0" y="0" rx="12" ry="12" width="${w}" height="${h}" fill="${PIN_COLOR}" />
        <polygon points="${w / 2 - 6},${h} ${w / 2 + 6},${h} ${w / 2},${h + tailH}" fill="${PIN_COLOR}" />
        <text x="${w / 2}" y="${Math.round(h / 2) + 4}" text-anchor="middle"
          font-family="system-ui,-apple-system,Segoe UI,Roboto,Apple SD Gothic Neo,Noto Sans KR,sans-serif"
          font-size="${fontSize}" fill="#ffffff">${text}</text>
      </g>
    </svg>`.trim();

  const url = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  return {
    url,
    size: new window.google.maps.Size(w, totalH),
    scaledSize: new window.google.maps.Size(w, totalH),
    anchor: new window.google.maps.Point(w / 2, totalH),
  };
}

/* ===== 마커 처리 ===== */
function clearMarkers() {
  markers.forEach((m) => m.setMap(null));
  markers.length = 0;
}

function hasCoord(lat, lng) {
  return (
    lat != null &&
    lng != null &&
    lat !== "" &&
    lng !== "" &&
    Number.isFinite(Number(lat)) &&
    Number.isFinite(Number(lng))
  );
}

function addMarkers(dtos) {
  clearMarkers();
  const bounds = new window.google.maps.LatLngBounds();
  (dtos || []).forEach((tx) => {
    if (!hasCoord(tx.latitude, tx.longitude)) return; // 좌표 없는 거래는 스킵
    const pos = { lat: Number(tx.latitude), lng: Number(tx.longitude) };
    const marker = new window.google.maps.Marker({
      position: pos,
      map: map.value,
      title: tx.title || "",
      icon: makePricePin(tx.amount),
    });
    marker.addListener("click", () => openSheet(tx));
    markers.push(marker);
    bounds.extend(pos);
  });

  if (!bounds.isEmpty()) {
    map.value.fitBounds(bounds);
  } else {
    // 좌표가 하나도 없을 때 기본 뷰
    map.value.setCenter({ lat: 37.5665, lng: 126.978 });
    map.value.setZoom(12);
  }
}

/* ===== 바텀시트 ===== */
function openSheet(tx) {
  selectedTx.value = tx;
  isSheetOpen.value = true;
}
function closeSheet() {
  isSheetOpen.value = false;
}
let startY = 0,
  currentY = 0,
  dragging = false;
function onTouchStart(e) {
  dragging = true;
  startY = e.touches[0].clientY;
  currentY = startY;
}
function onTouchMove(e) {
  if (!dragging) return;
  currentY = e.touches[0].clientY;
  const dy = Math.max(0, currentY - startY);
  sheetEl.value.style.transform = `translateY(${dy}px)`;
  sheetEl.value.style.transition = "none";
}
function onTouchEnd() {
  if (!dragging) return;
  dragging = false;
  const dy = Math.max(0, currentY - startY);
  sheetEl.value.style.transition = "";
  if (dy > 120) closeSheet();
  else sheetEl.value.style.transform = "";
}

/* ===== 공통 로더 (axios + 토큰) ===== */
async function loadAndRender(id) {
  // 여기서 api/travelLog.js의 axios 인스턴스를 사용 → 토큰 자동 첨부
  const payload = await getTravelLogTransactions(id);
  todayAmount.value = Number(payload?.todayAmount ?? 0);
  totalAmount.value = Number(payload?.totalAmount ?? 0);
  addMarkers(payload?.travelLogTransactionDTOS ?? []);
}

/* ===== 라이프사이클 ===== */
onMounted(async () => {
  try {
    await nextTick();
    if (!apiKey) throw new Error("구글 맵 API 키가 없습니다.");
    await loadGoogleMapsScript(apiKey);
    await waitForElementInDOM(mapElement);

    map.value = new window.google.maps.Map(mapElement.value, {
      center: { lat: 37.5665, lng: 126.978 },
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    isLoading.value = true;
    await loadAndRender(props.travelId);
  } catch (e) {
    // axios 에러 메시지 가공
    const msg = e?.response?.data?.message || e?.message || "알 수 없는 오류";
    console.error(e);
    errorMsg.value = msg;
  } finally {
    isLoading.value = false;
  }
});

onBeforeUnmount(() => {
  clearMarkers();
  map.value = null;
});

/* travelId 바뀌면 다시 호출 */
watch(
  () => props.travelId,
  async (id) => {
    if (!id) return;
    isLoading.value = true;
    errorMsg.value = "";
    try {
      await loadAndRender(id);
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "알 수 없는 오류";
      console.error(e);
      errorMsg.value = msg;
    } finally {
      isLoading.value = false;
    }
  },
);
</script>

<template>
  <div class="map-wrap">
    <div ref="mapElement" class="map"></div>

    <div v-if="isLoading || errorMsg" class="toast">
      <span v-if="isLoading">지도를 불러오는 중…</span>
      <span v-else>오류: {{ errorMsg }}</span>
    </div>

    <!-- 하단 합계 바 -->
    <div class="bottom-bar">
      <div class="amounts">
        <div class="amount-item">
          <div class="label">오늘의 여행 지출</div>
          <div class="value">{{ krw(todayAmount) }}</div>
        </div>
        <div class="divider" />
        <div class="amount-item">
          <div class="label">총 여행 지출</div>
          <div class="value">{{ krw(totalAmount) }}</div>
        </div>
      </div>
    </div>

    <!-- 시트 오버레이 -->
    <div
      class="sheet-overlay"
      :class="{ 'sheet-overlay--open': isSheetOpen }"
      @click="closeSheet"
    ></div>

    <!-- 바텀시트 -->
    <div
      ref="sheetEl"
      class="bottom-sheet"
      :class="{ 'bottom-sheet--open': isSheetOpen }"
      @touchstart.passive="onTouchStart"
      @touchmove.passive="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div class="sheet-handle"></div>
      <div class="sheet-content" v-if="selectedTx">
        <h3 class="sheet-title">결제 내역 상세보기</h3>
        <div class="row">
          <div class="row-label">카테고리</div>
          <div class="row-value">{{ selectedTx.category || "—" }}</div>
        </div>
        <div class="row">
          <div class="row-label">결제 금액</div>
          <div class="row-value">{{ krw(selectedTx.amount) }}</div>
        </div>
        <div class="row">
          <div class="row-label">결제 일시</div>
          <div class="row-value">{{ formatDateKR(selectedTx.createdAt) }}</div>
        </div>
        <div class="row">
          <div class="row-label">사용처</div>
          <div class="row-value">{{ selectedTx.title || "—" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: 100vh;
}
.map {
  width: 100%;
  height: calc(100vh - 64px);
  min-height: 320px;
}

/* 하단 합계 바 */
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 64px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(6px);
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  padding: 0 16px;
}
.amounts {
  display: flex;
  align-items: center;
  gap: 16px;
}
.amount-item .label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
  line-height: 1;
}
.amount-item .value {
  font-weight: 700;
  font-size: 16px;
  line-height: 1;
}
.divider {
  width: 1px;
  height: 28px;
  background: #e5e7eb;
}

/* 토스트 */
.toast {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: #111827;
  color: white;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 12px;
  opacity: 0.92;
  z-index: 5;
}

/* 바텀시트 오버레이 */
.sheet-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  transition: background 0.2s ease;
  pointer-events: none;
  z-index: 12;
}
.sheet-overlay--open {
  background: rgba(0, 0, 0, 0.35);
  pointer-events: auto;
}

/* 바텀시트 */
.bottom-sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(110%);
  transition: transform 0.22s ease;
  background: #fff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  z-index: 13;
  max-height: 70vh;
  box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.15);
}
.bottom-sheet--open {
  transform: translateY(0);
}
.sheet-handle {
  width: 44px;
  height: 5px;
  background: #e5e7eb;
  border-radius: 999px;
  margin: 10px auto;
}
.sheet-content {
  padding: 8px 20px 20px;
  overflow: auto;
  max-height: calc(70vh - 20px);
}
.sheet-title {
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  margin: 4px 0 14px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}
.row + .row {
  border-top: 1px solid #f1f5f9;
}
.row-label {
  color: #6b7280;
  font-size: 14px;
}
.row-value {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  text-align: right;
}
</style>
