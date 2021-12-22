"use strict";(self.webpackChunknft_panel=self.webpackChunknft_panel||[]).push([[698],{4515:(G,A,v)=>{v.d(A,{S:()=>x});class x{}},6658:(G,A,v)=>{v.d(A,{y:()=>M});var x=v(4294),L=v(9922),j=v(2352),U=v(7716),P=v(1841),K=v(9344);let M=(()=>{class N extends j.s{constructor(g,S){super(g),this.http=g,this.toastrService=S,this.maxWidth=73,this.maxHeight=64}uploadMedia(g,S){return this.postMedia(`/media-upload/mediaFiles/${g}`,S).pipe((0,x.q)(1),(0,L.b)(b=>{var E,I;b.hasErrors()&&this.toastrService.error(null===(I=null===(E=null==b?void 0:b.errors[0])||void 0===E?void 0:E.error)||void 0===I?void 0:I.message)}))}convertToImg(g,S){return new Promise(b=>{const E=document.createElement("canvas"),I=E.getContext("2d"),h=new Image;h.src=g,h.onload=()=>{E.width=72,E.height=64,I.drawImage(h,0,0,h.width,h.height,0,0,72,64),b(this.dataURLtoFile(E.toDataURL(),S))}})}dataURLtoFile(g,S){const b=g.split(","),E=b[0].match(/:(.*?);/)[1],I=atob(b[1]);let h=I.length;const D=new Uint8Array(h);for(;h--;)D[h]=I.charCodeAt(h);return new File([D],S,{type:E})}compressImage(g){return new Promise((S,b)=>{const E=document.createElement("canvas"),I=E.getContext("2d"),h=new Image;h.src=URL.createObjectURL(g),h.onload=()=>{const D=this.calculateAspectRatioFit(null==h?void 0:h.width,null==h?void 0:h.height);E.width=D.width,E.height=D.height,I.drawImage(h,0,0,h.width,h.height,0,0,D.width,D.height),S(this.dataURLtoFile(E.toDataURL(),"thumbnail.jpg"))}})}calculateAspectRatioFit(g,S){const b=Math.min(this.maxWidth/g,this.maxHeight/S);return{width:g*b,height:S*b}}}return N.\u0275fac=function(g){return new(g||N)(U.LFG(P.eN),U.LFG(K._W))},N.\u0275prov=U.Yz7({token:N,factory:N.\u0275fac,providedIn:"root"}),N})()},5761:(G,A,v)=>{v.d(A,{_:()=>h});var x=v(4515),L=v(2340),j=v(5094),U=v(1964),P=v(4294),K=v(7580),M=v(9922),N=v(2352),R=v(7716),g=v(6989),S=v(1841),b=v(6658),E=v(9344),I=v(9866);let h=(()=>{class D extends N.s{constructor(d,s,l,a,c){super(s),this.customDialogService=d,this.http=s,this.mediaService=l,this.toastrService=a,this.spinner=c,this._cardCreatedSuccess$=new j.X(null),this.cardCreatedSuccess$=this._cardCreatedSuccess$.asObservable(),this._nftList=new j.X({totalCount:0,data:[]}),this.createNFTImg=new FormData,this.createNFT=new x.S,this.nftList$=this._nftList.asObservable()}requestCreateNFT(d,s){this.spinner.show("main"),this.mediaService.uploadMedia("nft",s).pipe((0,P.q)(1),(0,K.z)(l=>l.hasErrors()?(0,U.of)(null):(d.serverCaptureFileUrl=l.data.url,d.path=l.data.path,this.addNft(d)))).subscribe(l=>{var a,c;null==l?this.toastrService.warning(null===(c=null===(a=null==l?void 0:l.errors[0])||void 0===a?void 0:a.error)||void 0===c?void 0:c.message,"Error!"):this.customDialogService.closeDialogs(),this.spinner.hide("main")}),setTimeout(()=>{this.customDialogService.closeDialogs()},3e3)}getAllNftsByClub(d,s,l,a,c,m){const p={clubName:d,offset:--s?l*s:0,limit:l,name:a,type:m};return c&&(p.groupID=c),this.get("/nft/getAllNftsByClub",p).pipe((0,P.q)(1),(0,M.b)(_=>{var O,t;_.hasErrors()&&this.toastrService.error(null===(t=null===(O=null==_?void 0:_.errors[0])||void 0===O?void 0:O.error)||void 0===t?void 0:t.message)}))}getRecentSoldNfts(d,s,l,a,c){const m={clubName:d,offset:--s?l*s:0,limit:l};return c&&(m.type=c),a&&(m.groupID=a),this.get("/nft/getRecentSoldNfts",m).pipe((0,P.q)(1),(0,M.b)(p=>{var _,O;p.hasErrors()&&this.toastrService.error(null===(O=null===(_=null==p?void 0:p.errors[0])||void 0===_?void 0:_.error)||void 0===O?void 0:O.message)}))}getPendingForSaleNfts(d,s,l,a){const c={clubName:d,offset:--s?l*s:0,limit:l};return a.nftStatus&&(c.nftStatus=a.nftStatus),a.price&&(c.price=a.price),a.tokenId&&(c.tokenId=a.tokenId),this.get("/nft/getPendingForSaleNfts",c).pipe((0,P.q)(1),(0,M.b)(m=>{var p,_;m.hasErrors()&&this.toastrService.error(null===(_=null===(p=null==m?void 0:m.errors[0])||void 0===p?void 0:p.error)||void 0===_?void 0:_.message)}))}getAllNftsByUser(d,s,l,a,c,m){const p={clubName:d,offset:--l?L.N.limit*l:0,limit:L.N.limit,name:a,type:m};return c&&(p.groupID=c),this.get("/nft/getUserNftsByClub/"+s,p).pipe((0,P.q)(1),(0,M.b)(_=>{var O,t;_.hasErrors()&&this.toastrService.error(null===(t=null===(O=null==_?void 0:_.errors[0])||void 0===O?void 0:O.error)||void 0===t?void 0:t.message)}))}getAllNftsAdminPanel(d,s,l,a){const c={clubName:d,offset:--s?L.N.limit*s:0,limit:L.N.limit,name:l};return a.nftStatus&&(c.nftStatus=a.nftStatus),a.price&&(c.price=a.price),a.tokenId&&(c.tokenId=a.tokenId),a.type&&(c.type=a.type),this.get("/nft/getNftsByAppPackageIdForAdminPanel",c).pipe((0,P.q)(1),(0,M.b)(m=>{var p,_;m.hasErrors()&&this.toastrService.error(null===(_=null===(p=null==m?void 0:m.errors[0])||void 0===p?void 0:p.error)||void 0===_?void 0:_.message)}))}getNft(d){return this.get("/nft/getNft/"+d).pipe((0,P.q)(1),(0,M.b)(l=>{var a,c;l.hasErrors()&&this.toastrService.error(null===(c=null===(a=null==l?void 0:l.errors[0])||void 0===a?void 0:a.error)||void 0===c?void 0:c.message)}))}updateNft(d,s){return this.post("/nft/updateNft/"+d,{nftStatus:s}).pipe((0,P.q)(1),(0,M.b)(a=>{var c,m;a.hasErrors()&&this.toastrService.error(null===(m=null===(c=null==a?void 0:a.errors[0])||void 0===c?void 0:c.error)||void 0===m?void 0:m.message)}))}getEventsByNft(d){return this.get("/event/getEventByNftId/"+d).pipe((0,P.q)(1),(0,M.b)(l=>{var a,c;l.hasErrors()&&this.toastrService.error(null===(c=null===(a=null==l?void 0:l.errors[0])||void 0===a?void 0:a.error)||void 0===c?void 0:c.message)}))}getEventsByUser(d,s,l,a,c,m){const p={offset:--s?l*s:0,limit:l,eventType:m};return c&&(p.groupID=c),a&&(p.date=a),this.get("/event/getEventByUserId/"+d,p).pipe((0,P.q)(1),(0,M.b)(_=>{var O,t;_.hasErrors()&&this.toastrService.error(null===(t=null===(O=null==_?void 0:_.errors[0])||void 0===O?void 0:O.error)||void 0===t?void 0:t.message)}))}isMembershipIDExists(d){return this.post("/nft/isMembershipIDExists",d)}addNft(d){return this.post("/nft/addNft",d).pipe((0,P.q)(1),(0,M.b)(s=>{var l,a,c;s.hasErrors()?this.toastrService.error(null===(a=null===(l=null==s?void 0:s.errors[0])||void 0===l?void 0:l.error)||void 0===a?void 0:a.message):(null==s?void 0:s.data)&&(d.freezeNft&&(this.customDialogService.showLoadingDialog("Minting In Process"),setTimeout(()=>{this.customDialogService.closeDialogs()},3e3)),this._cardCreatedSuccess$.next(null===(c=null==s?void 0:s.data)||void 0===c?void 0:c.id))}))}updateNftResaleStatus(d,s,l){const a={isResaleAvailable:s};return s&&(a.price=l),this.post("/nft/updateOwnedNft/"+d,a).pipe((0,P.q)(1))}}return D.\u0275fac=function(d){return new(d||D)(R.LFG(g.W),R.LFG(S.eN),R.LFG(b.y),R.LFG(E._W),R.LFG(I.t2))},D.\u0275prov=R.Yz7({token:D,factory:D.\u0275fac,providedIn:"root"}),D})()},4762:(G,A,v)=>{function N(t,r,e,n){return new(e||(e=Promise))(function(i,f){function y(T){try{u(n.next(T))}catch(F){f(F)}}function C(T){try{u(n.throw(T))}catch(F){f(F)}}function u(T){T.done?i(T.value):function(i){return i instanceof e?i:new e(function(f){f(i)})}(T.value).then(y,C)}u((n=n.apply(t,r||[])).next())})}v.d(A,{mG:()=>N})}}]);