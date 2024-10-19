import{a as d,i as u,S as m}from"./assets/vendor-Qob_5Ba8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();class p{constructor({selector:t,hidden:r=!1}){this.refs=this.getRefs(t),r&&this.hide()}getRefs(t){const r={};return r.button=document.querySelector(t),r.label=r.button.querySelector(".label"),r.spinner=r.button.querySelector(".spinner"),r}enable(){this.refs.button.disabled=!1,this.refs.label.textContent="Load more",this.refs.spinner.classList.add("is-hidden")}disable(){this.refs.button.disabled=!0,this.refs.label.textContent="Loading...",this.refs.spinner.classList.remove("is-hidden")}show(){this.refs.button.classList.remove("is-hidden")}hide(){this.refs.button.classList.add("is-hidden")}}const g="19197868-48df692c0a14d7fda4172233f";d.defaults.baseURL="https://pixabay.com/api";class y{constructor(){this.searchQuery="",this.page=1}async fetchPictures(){const{data:t}=await d.get(`/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${g}`);if(t.total===0)throw"Images not found";return this.page+=1,t.hits}resetPage(){this.page=1}get query(){return this.searchQuery}set query(t){this.searchQuery=t}}function b(e){const{webformatURL:t,largeImageURL:r,likes:c,views:s,comments:i,downloads:a,tags:h}=e;return`<li class="photo-card">
    <a class="gallery__link" href="${r}">
      <img class="images" src="${t}" alt="${h}" height="200" />
    </a>
    <div class="stats">
        <p class="stats-item">
            <i class="material-icons">thumb_up</i>
            ${c}
        </p>
        <p class="stats-item">
            <i class="material-icons">visibility</i>
            ${s}
        </p>
        <p class="stats-item">
            <i class="material-icons">comment</i>
            ${i}
        </p>
        <p class="stats-item">
            <i class="material-icons">cloud_download</i>
            ${a}
        </p>
    </div>
</li>`}const n={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),galleryItem:document.querySelector(".photo-card")},o=new p({selector:'[data-action="load-more"]',hidden:!0});n.searchForm.addEventListener("submit",w);o.refs.button.addEventListener("click",v);n.gallery.addEventListener("click",L);function L(e){e.target.nodeName}const l=new y;function w(e){e.preventDefault(),P(),l.query=e.currentTarget.elements.query.value.trim(),l.query===""&&(o.hide(),u.show("Enter text!")),l.resetPage(),f(),o.show()}function v(){const e=performance.now();f();const t=performance.now(),r=Math.floor(t-e)*1e3;S(r)}function q(e){const t=e.map(r=>b(r));n.gallery.insertAdjacentHTML("beforeend",t.join("")),new m(".gallery a",{caption:!0,captionsData:"alt",captionDelay:250})}function P(){n.gallery.innerHTML=""}async function f(){o.disable();try{const e=await l.fetchPictures();q(e),o.enable()}catch(e){$(e),o.hide()}}function S(e){let t=n.gallery.clientHeight;setTimeout(()=>{window.scrollTo({top:t,behavior:"smooth"})},e)}function $(e){if(e==="Images not found"){u.show("Unfortunately nothing was found for this request");return}u.show("Error! Failed to upload images")}
//# sourceMappingURL=index.js.map
