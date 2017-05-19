define("lithe-localcache",function(require){if(window.localStorage){try{localStorage.setItem("gomeplus~Storage","gomeplusStorage"),localStorage.removeItem("gomeplus~Storage")}catch(e){return}var e={},t={},o={},r=["??",","],n=lithe.getConfig(),i=n.manifest||{},a=n.publicdeps||{},l=n.publicpath||"",s=i.expires,c="gomeplus~",f="manifest",u=n.basepath,v=i.prefix,d=Object.keys(i),m=i.version,h={};for(var g in a)a.hasOwnProperty(g)&&(h[g]=Object.keys(a[g])[0]);var p={_maxRetry:1,_retry:!0,get:function(e,t){var o;try{o=localStorage.getItem(e)}catch(e){return}return o?t?JSON.parse(o):o:void 0},set:function(e,t,o){o="undefined"==typeof o?this._retry:o;try{localStorage.setItem(e,t)}catch(n){if(o)for(var r=this._maxRetry;r>0;)r--,this.removeAll(),this.set(e,t,!1)}},remove:function(e){try{localStorage.removeItem(e)}catch(e){}},removeAll:function(){for(var e=localStorage.length-1;e>=0;e--){var t=localStorage.key(e);/^gomeplus~.+/g.test(t)&&localStorage.removeItem(t)}}},y=p.get(c+f,!0)||{},M=!y.version||y.version!==i.version;if(i){if(p.get(c+"_expires_")){var S=p.get(c+"_expires_");S<(new Date).getTime()&&(p.removeAll(),p.set(c+"_expires_",(new Date).getTime()+s))}else p.set(c+"_expires_",(new Date).getTime()+s);var w={validate:function(e,t){return!(!t||!e)},fetchAjax:function(e,t){var o=new window.XMLHttpRequest,r=setTimeout(function(){o.abort(),t(null)},3e4);o.open("GET",e,!0),o.onreadystatechange=function(){4===o.readyState&&(clearTimeout(r),t(200===o.status||302===o.status?o.responseText:null))},o.send(null)},use:function(e,t){if(t)try{(window.execScript||function(e){window.eval.call(window,e)})(t)}catch(e){return console.log(e),!1}return!0},onLoad:function(r){o[r]=!0,delete e[r];var n=t[r];n&&(delete t[r],n.forEach(function(e){e()}))},getRemoteUrl:function(e,t){var o,r=[];if(t){for(var n in h)if(l+h[n]===e){r.push(h[n]),o=n;break}return r.length?{remoteVersion:r[0],remoteMod:o}:void 0}return r=d.filter(function(t){if(u+v+t===e)return i[t]}),r.length?{remoteVersion:i[r[0]],remoteMod:r[0]}:void 0},doFetchModel:function(e,t,o){var r=o?Math.random().toString():m;this.fetchAjax(e+"?timestamp="+r,function(o){return o?w.use(e,o)?(t&&t.apply(null,[e,o]),void w.onLoad(e)):void w.doFetchModel(e,t):void w.doFetchModel(e,t,!0)})},isCombo:function(e){var t=r[0];return e.indexOf(t)>=0},splitComboUrl:function(e){var t=r,o=e.split(t[0]);if(2!=o.length)return e;var n=o[0],i=o[1].split(t[1]),a={};a.host=n,a.files=[];for(var l=0,s=i.length;l<s;l++)a.files.push(i[l]);return a}};lithe.events.map.fetch&&(delete lithe.events.map.fetch,lithe.events.on("fetch",function(n,a){if(!/\.css$/.test(n)){var s=w.isCombo(n);if(o[n])return void a();if(e[n])return void t[n].push(a);e[n]=!0,t[n]=[a];var u=w.getRemoteUrl(n);if(!s&&u){var v=p.get(c+u.remoteMod),d=w.validate(n,v),m=function(e,t){var o=w.getRemoteUrl(e);o&&(y[o.remoteMod]=o.remoteVersion,y.version&&y.version===i.version||(y.version=i.version),p.set(c+f,JSON.stringify(y)),p.set(c+o.remoteMod,t))};M?w.doFetchModel(n,m):u.remoteVersion===y[u.remoteMod]&&d?w.use(n,v)?w.onLoad(n):w.doFetchModel(n,m):w.doFetchModel(n,m,!0)}else if(s){for(var h=w.splitComboUrl(n),g=!1,S=h.files.length-1;S>=0;S--){var x=h.host+h.files[S],v=p.get(c+h.files[S]),d=w.validate(x,v),_=w.getRemoteUrl(x,!0);_&&(g=!0,_.remoteVersion===y[_.remoteMod]&&d&&w.use(x,v)&&h.files.splice(S,1))}if(0==h.files.length)return void w.onLoad(n);var b=h.host+r[0]+h.files.join(r[1]),R=function(){lithe.events.on("end",function(){for(var e=this.files,t=0,o=e.length;t<o;t++){var r=h.host+e[t],n=w.getRemoteUrl(r,!0);n&&(y[n.remoteMod]=n.remoteVersion,p.set(c+e[t],"define('"+n.remoteMod+"',"+lithe.cache[l+n.remoteMod].factory.toString()+");"))}p.set(c+f,JSON.stringify(y))},h)};t[b]=[a],w.doFetchModel(b,R)}}}))}}});