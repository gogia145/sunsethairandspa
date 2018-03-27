define("render",["lodash","utils","core","reactDOM"],function(a,b,c,d){"use strict";function f(a){var c=a.fullFunctionality.getConfig(),d=b.urlUtils.parseUrlParams(window.location.search.replace(/^\??/,""));return c.origin=d.dsOrigin,c}function g(c,d){var e=a(d).keys().pull("masterPage").value();return a.mapValues(d,function(a,d){return window.pagesData&&window.pagesData[d]?a:b.dataFixer.fix(a,e.slice(),c.requestModel,c.currentUrl,c.urlFormatModel)})}function h(b,f,g,h){c.renderer.renderSite(f,g,function(c){if(window.rendered)window.rendered.forceUpdate();else{var f=document.getElementById("SITE_CONTAINER").children[0];window.rendered=d.render(c,document.getElementById("SITE_CONTAINER"));var g=document.getElementById("SITE_CONTAINER").children[0];window.sssr&&(window.sssr.success=f===g,window.sssr.clientSideRender={sinceInitialTimestamp:Date.now()-window.wixBiSession.initialTimestamp,performanceNow:e()}),window.onpopstate=window.rendered.onPopState,window.parent&&window.rendered.registerAspectToEvent("siteReady",function(){window.documentServices&&h&&h(window.rendered),window.parent.postMessage("documentServicesLoaded","*")}),b.qaAutomation&&(a.set(window,"testApi.domSelectors",b.qaAutomation.getDomSelectors(b.react)),window.testApi.domSelectors.setSearchRoot(window.rendered),a.set(window,"testApi.isReady",!0))}})}function i(d,e,i,j){var k=d.documentServices;b.urlUtils.isQueryParamOn(i.currentUrl,"isSantaEditor")&&(i.renderFlags=a.assign({},i.renderFlags,{componentViewMode:"editor"}));var l=new b.SiteData(i,e);try{k&&a.isUndefined(window.karmaIntegration)&&window.parent.FS&&b.integrations.fullStory.start()}catch(m){}var n=c.SiteDataAPI.createSiteDataAPIAndDal(l,e),o=n.siteData,p=n.siteDataAPI,q={pointers:n.pointers,displayedDAL:n.displayedDal,siteDataAPI:p};k?(n.dataLoadedRegistrar=p.registerDataLoadedCallback.bind(p),window.documentServices=new k.Site(f(k.configs),n,a.partial(g,i),a.partial(h,d,o,q)),a.set(window,"testApi.documentServices",window.documentServices)):(l.pagesData=l.pagesData&&g(i,l.pagesData),h(d,o,q,j))}var e=window.performance&&window.performance.now?window.performance.now.bind(window.performance):Date.now.bind(Date);return{clientSide:i}});