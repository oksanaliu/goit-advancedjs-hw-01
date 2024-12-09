import"./assets/modulepreload-polyfill-B5Qt9EMX.js";const n=[{preview:"https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",original:"https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",description:"Hokkaido Flower"},{preview:"https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",original:"https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",description:"Container Haulage Freight"},{preview:"https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",original:"https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",description:"Aerial Beach View"},{preview:"https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",original:"https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",description:"Flower Blooms"},{preview:"https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",original:"https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",description:"Alpine Mountains"},{preview:"https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",original:"https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",description:"Mountain Lake Sailing"},{preview:"https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",original:"https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",description:"Alpine Spring Meadows"},{preview:"https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",original:"https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",description:"Nature Landscape"},{preview:"https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",original:"https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",description:"Lighthouse Coast Sea"}],r=document.querySelector(".gallery"),d=n.map(({preview:e,original:i,description:c})=>`
  <li class="gallery-item">
    <a class="gallery-link" href="${i}">
      <img
        class="gallery-image"
        src="${e}"
        data-source="${i}"
        alt="${c}"
      />
    </a>
  </li>
`).join("");r.innerHTML=d;let t=0;const s=e=>{const{original:i,description:c}=n[e];return`
    <div class="modal-content">
      <button class="btn-close" aria-label="Close">&times;</button>
      <button class="btn-prev">&larr;</button>
      <img src="${i}" alt="${c}" class="modal-image">
      <button class="btn-next">&rarr;</button>
    </div>
  `};r.addEventListener("click",e=>{if(e.preventDefault(),!e.target.classList.contains("gallery-image"))return;const c=e.target.dataset.source;t=n.findIndex(o=>o.original===c),basicLightbox.create(s(t),{onShow:o=>{const a=o.element();a.querySelector(".btn-close"),a.querySelector(".btn-prev"),a.querySelector(".btn-next");const l=()=>{t=(t+1)%n.length,o.element().innerHTML=s(t),p()},g=()=>{t=(t-1+n.length)%n.length,o.element().innerHTML=s(t),p()},h=()=>{o.close()},p=()=>{a.querySelector(".btn-close").addEventListener("click",h),a.querySelector(".btn-next").addEventListener("click",l),a.querySelector(".btn-prev").addEventListener("click",g)};p()}}).show()});
//# sourceMappingURL=1-gallery.js.map
