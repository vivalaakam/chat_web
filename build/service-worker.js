'use strict'
var precacheConfig = [['/index.html', 'b37ddac58bbe31f40d481e55d0aa6f42'], ['/static/css/main.b2629cc2.css', '3f81e0b306ba8cfc7898722b58767b82'], ['/static/js/0.ebda36df.chunk.js', 'c7c3e8a8765b0ca41d5d445c261e9814'], ['/static/js/1.4f177c9d.chunk.js', 'fb3261beb7800815489d62237c4a3d41'], ['/static/js/main.ee3ed791.js', '4224874d8860b12af711f71f7f0f3fab'], ['/static/media/close.506c8461.svg', '506c846118ee3fcaf87900ba0b90f00f']],
  cacheName = 'sw-precache-v3-sw-precache-webpack-plugin-' + (self.registration ? self.registration.scope : ''),
  ignoreUrlParametersMatching = [/^utm_/], addDirectoryIndex = function (e, t) {
    var n = new URL(e)
    return '/' === n.pathname.slice(-1) && (n.pathname += t), n.toString()
  }, cleanResponse = function (t) {
    return t.redirected ? ('body' in t ? Promise.resolve(t.body) : t.blob()).then(function (e) {
      return new Response(e, { headers: t.headers, status: t.status, statusText: t.statusText })
    }) : Promise.resolve(t)
  }, createCacheKey = function (e, t, n, r) {
    var a = new URL(e)
    return r && a.pathname.match(r) || (a.search += (a.search ? '&' : '') + encodeURIComponent(t) + '=' + encodeURIComponent(n)), a.toString()
  }, isPathWhitelisted = function (e, t) {
    if (0 === e.length) return !0
    var n = new URL(t).pathname
    return e.some(function (e) {
      return n.match(e)
    })
  }, stripIgnoredUrlParameters = function (e, n) {
    var t = new URL(e)
    return t.hash = '', t.search = t.search.slice(1).split('&').map(function (e) {
      return e.split('=')
    }).filter(function (t) {
      return n.every(function (e) {
        return !e.test(t[0])
      })
    }).map(function (e) {
      return e.join('=')
    }).join('&'), t.toString()
  }, hashParamName = '_sw-precache', urlsToCacheKeys = new Map(precacheConfig.map(function (e) {
    var t = e[0], n = e[1], r = new URL(t, self.location), a = createCacheKey(r, hashParamName, n, /\.\w{8}\./)
    return [r.toString(), a]
  }))

function setOfCachedUrls(e) {
  return e.keys().then(function (e) {
    return e.map(function (e) {
      return e.url
    })
  }).then(function (e) {
    return new Set(e)
  })
}

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(cacheName).then(function (r) {
    return setOfCachedUrls(r).then(function (n) {
      return Promise.all(Array.from(urlsToCacheKeys.values()).map(function (t) {
        if (!n.has(t)) {
          var e = new Request(t, { credentials: 'same-origin' })
          return fetch(e).then(function (e) {
            if (!e.ok) throw new Error('Request for ' + t + ' returned a response with status ' + e.status)
            return cleanResponse(e).then(function (e) {
              return r.put(t, e)
            })
          })
        }
      }))
    })
  }).then(function () {
    return self.skipWaiting()
  }))
}), self.addEventListener('activate', function (e) {
  var n = new Set(urlsToCacheKeys.values())
  e.waitUntil(caches.open(cacheName).then(function (t) {
    return t.keys().then(function (e) {
      return Promise.all(e.map(function (e) {
        if (!n.has(e.url)) return t.delete(e)
      }))
    })
  }).then(function () {
    return self.clients.claim()
  }))
}), self.addEventListener('fetch', function (t) {
  if ('GET' === t.request.method) {
    var e, n = stripIgnoredUrlParameters(t.request.url, ignoreUrlParametersMatching), r = 'index.html';
    (e = urlsToCacheKeys.has(n)) || (n = addDirectoryIndex(n, r), e = urlsToCacheKeys.has(n))
    var a = '/index.html'
    !e && 'navigate' === t.request.mode && isPathWhitelisted(['^(?!\\/__).*'], t.request.url) && (n = new URL(a, self.location).toString(), e = urlsToCacheKeys.has(n)), e && t.respondWith(caches.open(cacheName).then(function (e) {
      return e.match(urlsToCacheKeys.get(n)).then(function (e) {
        if (e) return e
        throw Error('The cached response that was expected is missing.')
      })
    }).catch(function (e) {
      return console.warn('Couldn\'t serve response for "%s" from cache: %O', t.request.url, e), fetch(t.request)
    }))
  }
})
