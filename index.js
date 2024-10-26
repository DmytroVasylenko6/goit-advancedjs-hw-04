import{a as u,i as d,S as m}from"./assets/vendor-Qob_5Ba8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();class p{constructor({selector:t,hidden:s=!1}){this.refs=this.getRefs(t),s&&this.hide()}getRefs(t){const s={};return s.button=document.querySelector(t),s.label=s.button.querySelector(".label"),s.spinner=s.button.querySelector(".spinner"),s}enable(){this.refs.button.disabled=!1,this.refs.label.textContent="Load more",this.refs.spinner.classList.add("is-hidden")}disable(){this.refs.button.disabled=!0,this.refs.label.textContent="Loading...",this.refs.spinner.classList.remove("is-hidden")}show(){this.refs.button.classList.remove("is-hidden")}hide(){this.refs.button.classList.add("is-hidden")}}const g="19197868-48df692c0a14d7fda4172233f";u.defaults.baseURL="https://pixabay.com/api";class y{constructor(){this.searchQuery="",this.page=1}async fetchPictures(){const{data:t}=await u.get(`/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=20&&safesearch=true&key=${g}`);if(t.total===0)throw"Images not found";return this.page+=1,t}resetPage(){this.page=1}get query(){return this.searchQuery}set query(t){this.searchQuery=t}}function b(e){const{webformatURL:t,largeImageURL:s,likes:a,views:r,comments:o,downloads:n,tags:f}=e;return`<li class="photo-card">
    <a class="gallery__link" href="${s}">
      <img class="images" src="${t}" alt="${f}" height="200" />
    </a>
    <div class="stats">
        <p class="stats-item">
            <i class="material-icons">thumb_up</i>
            ${a}
        </p>
        <p class="stats-item">
            <i class="material-icons">visibility</i>
            ${r}
        </p>
        <p class="stats-item">
            <i class="material-icons">comment</i>
            ${o}
        </p>
        <p class="stats-item">
            <i class="material-icons">cloud_download</i>
            ${n}
        </p>
    </div>
</li>`}function L(e){if(e==="imagesNotFound"){d.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter",color:"red"});return}d.show({title:"Error",message:"Error! Failed to upload images",position:"topCenter",color:"red"})}const c={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),galleryItem:document.querySelector(".photo-card"),bottomText:document.querySelector("#bottomText")},i=new p({selector:'[data-action="load-more"]',hidden:!0});c.searchForm.addEventListener("submit",v);i.refs.button.addEventListener("click",P);c.gallery.addEventListener("click",w);function w(e){e.target.nodeName}const l=new y;async function v(e){if(e.preventDefault(),S(),l.query=e.currentTarget.elements.query.value.trim(),l.query===""){i.hide(),d.show({title:"Error",message:"Please enter text!",position:"topCenter",color:"red"});return}l.resetPage(),await h()}async function P(){await h(),x()}function q(e){const t=e.map(a=>b(a));c.gallery.insertAdjacentHTML("beforeend",t.join("")),new m(".gallery a",{caption:!0,captionsData:"alt",captionDelay:250}).refresh()}function S(){c.gallery.innerHTML="",bottomText.classList.add("hidden")}async function h(){i.disable();try{const{hits:e,totalHits:t}=await l.fetchPictures();if(c.gallery.children.length>=t){i.hide(),bottomText.classList.remove("hidden"),d.show({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topCenter",color:"blue"});return}q(e),i.show(),i.enable()}catch(e){L(e),i.hide()}}function x(){const e=document.querySelector(".photo-card");if(e){const t=e.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
