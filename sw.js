/* 로드온종합견적 앱(PWA) 서비스워커
   - 저장(캐시) 없음 : 화면·데이터는 항상 서버 최신 그대로 (지금 웹과 동일, 업데이트 시 재설치 불필요)
   - 인터넷이 끊겼을 때만 안내 화면 표시 */
var OFFLINE = '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<title>로드온종합견적</title><style>html,body{margin:0;height:100%}body{display:grid;place-items:center;background:#f3f5f8;color:#141c2b;' +
  'font-family:-apple-system,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;text-align:center;padding:24px}' +
  'h1{font-size:20px;margin:0 0 10px}p{margin:0 0 18px;color:#4c5669;font-size:14px;line-height:1.6}' +
  'button{height:44px;padding:0 22px;border:0;border-radius:10px;background:#0047e0;color:#fff;font:inherit;font-size:15px;font-weight:700;cursor:pointer}' +
  '@media (prefers-color-scheme:dark){body{background:#0e1320;color:#e8ecf4}p{color:#aab3c5}button{background:#6f95ff;color:#0b1020}}</style></head>' +
  '<body><div><h1>인터넷에 연결되어 있지 않습니다</h1><p>연결을 확인한 뒤 다시 시도해 주세요.</p>' +
  '<button onclick="location.reload()">다시 시도</button></div></body></html>';
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  if (e.request.mode !== 'navigate') return;   /* 서버 호출·파일은 관여하지 않음 */
  e.respondWith(fetch(e.request).catch(function(){
    return new Response(OFFLINE, {headers: {'Content-Type': 'text/html;charset=utf-8'}});
  }));
});
