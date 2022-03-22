"use strict";(self.webpackChunknft_panel=self.webpackChunknft_panel||[]).push([[698],{4515:(G,L,_)=>{_.d(L,{S:()=>x});class x{}},6658:(G,L,_)=>{_.d(L,{y:()=>P});var x=_(4294),C=_(9922),U=_(2352),j=_(7716),O=_(1841),K=_(9344);let P=(()=>{class T extends U.s{constructor(g,D){super(g),this.http=g,this.toastrService=D,this.maxWidth=73,this.maxHeight=64}uploadMedia(g,D){return this.postMedia(`/media-upload/mediaFiles/${g}`,D).pipe((0,x.q)(1),(0,C.b)(E=>{var b,I;E.hasErrors()&&this.toastrService.error(null===(I=null===(b=null==E?void 0:E.errors[0])||void 0===b?void 0:b.error)||void 0===I?void 0:I.message)}))}convertToImg(g,D){return new Promise(E=>{const b=document.createElement("canvas"),I=b.getContext("2d"),m=new Image;m.src=g,m.onload=()=>{b.width=72,b.height=64,I.drawImage(m,0,0,m.width,m.height,0,0,72,64),E(this.dataURLtoFile(b.toDataURL(),D))}})}dataURLtoFile(g,D){const E=g.split(","),b=E[0].match(/:(.*?);/)[1],I=atob(E[1]);let m=I.length;const M=new Uint8Array(m);for(;m--;)M[m]=I.charCodeAt(m);return new File([M],D,{type:b})}compressImage(g){return new Promise((D,E)=>{const b=document.createElement("canvas"),I=b.getContext("2d"),m=new Image;m.src=URL.createObjectURL(g),m.onload=()=>{const M=this.calculateAspectRatioFit(null==m?void 0:m.width,null==m?void 0:m.height);b.width=M.width,b.height=M.height,I.drawImage(m,0,0,m.width,m.height,0,0,M.width,M.height),D(this.dataURLtoFile(b.toDataURL(),"thumbnail.jpg"))}})}calculateAspectRatioFit(g,D){const E=Math.min(this.maxWidth/g,this.maxHeight/D);return{width:g*E,height:D*E}}}return T.\u0275fac=function(g){return new(g||T)(j.LFG(O.eN),j.LFG(K._W))},T.\u0275prov=j.Yz7({token:T,factory:T.\u0275fac,providedIn:"root"}),T})()},5761:(G,L,_)=>{_.d(L,{_:()=>m});var x=_(4515),C=_(2340),U=_(5094),j=_(1964),O=_(4294),K=_(7580),P=_(9922),T=_(2352),R=_(7716),g=_(6989),D=_(1841),E=_(6658),b=_(9344),I=_(9866);let m=(()=>{class M extends T.s{constructor(f,l,c,a,s){super(l),this.customDialogService=f,this.http=l,this.mediaService=c,this.toastrService=a,this.spinner=s,this._cardCreatedSuccess$=new U.X(null),this.cardCreatedSuccess$=this._cardCreatedSuccess$.asObservable(),this._nftList=new U.X({totalCount:0,data:[]}),this.createNFTImg=new FormData,this.createNFT=new x.S,this.nftList$=this._nftList.asObservable()}requestCreateNFT(f,l){this.spinner.show("main"),this.mediaService.uploadMedia("nft",l).pipe((0,O.q)(1),(0,K.z)(c=>c.hasErrors()?(0,j.of)(null):(f.serverCaptureFileUrl=c.data.url,f.path=c.data.path,this.addNft(f)))).subscribe(c=>{var a,s;null==c?this.toastrService.warning(null===(s=null===(a=null==c?void 0:c.errors[0])||void 0===a?void 0:a.error)||void 0===s?void 0:s.message,"Error!"):this.customDialogService.closeDialogs(),this.spinner.hide("main")}),setTimeout(()=>{this.customDialogService.closeDialogs()},3e3)}getAllNftsByClub(f,l,c,a,s,v){const h={clubName:f,offset:--l?c*l:0,limit:c,name:a,type:v};return s&&(h.groupID=s),this.get("/nft/getAllNftsByClub",h).pipe((0,O.q)(1),(0,P.b)(p=>{var w,t;p.hasErrors()&&this.toastrService.error(null===(t=null===(w=null==p?void 0:p.errors[0])||void 0===w?void 0:w.error)||void 0===t?void 0:t.message)}))}getRecentSoldNfts(f,l,c,a,s){const v={clubName:f,offset:--l?c*l:0,limit:c};return s&&(v.type=s),a&&(v.groupID=a),this.get("/nft/getRecentSoldNfts",v).pipe((0,O.q)(1),(0,P.b)(h=>{var p,w;h.hasErrors()&&this.toastrService.error(null===(w=null===(p=null==h?void 0:h.errors[0])||void 0===p?void 0:p.error)||void 0===w?void 0:w.message)}))}getPendingForSaleNfts(f,l,c,a){const s={clubName:f,offset:--l?c*l:0,limit:c};return a.nftStatus&&(s.nftStatus=a.nftStatus),a.price&&(s.price=a.price),a.tokenId&&(s.tokenId=a.tokenId),this.get("/nft/getPendingForSaleNfts",s).pipe((0,O.q)(1),(0,P.b)(v=>{var h,p;v.hasErrors()&&this.toastrService.error(null===(p=null===(h=null==v?void 0:v.errors[0])||void 0===h?void 0:h.error)||void 0===p?void 0:p.message)}))}getAllNftsByUser(f,l,c,a,s,v){const h={clubName:f,offset:--c?C.N.limit*c:0,limit:C.N.limit,name:a,type:v};return s&&(h.groupID=s),this.get("/nft/getUserNftsByClub/"+l,h).pipe((0,O.q)(1),(0,P.b)(p=>{var w,t;p.hasErrors()&&this.toastrService.error(null===(t=null===(w=null==p?void 0:p.errors[0])||void 0===w?void 0:w.error)||void 0===t?void 0:t.message)}))}getAllNftsAdminPanel(f,l,c,a){const s={clubName:f,offset:--l?C.N.limit*l:0,limit:C.N.limit,name:c};return a.nftStatus&&(s.nftStatus=a.nftStatus),a.price&&(s.price=a.price),a.tokenId&&(s.tokenId=a.tokenId),a.type&&(s.type=a.type),this.get("/nft/getNftsByAppPackageIdForAdminPanel",s).pipe((0,O.q)(1),(0,P.b)(v=>{var h,p;v.hasErrors()&&this.toastrService.error(null===(p=null===(h=null==v?void 0:v.errors[0])||void 0===h?void 0:h.error)||void 0===p?void 0:p.message)}))}getNft(f){return this.get("/nft/getNft/"+f).pipe((0,O.q)(1),(0,P.b)(c=>{var a,s;c.hasErrors()&&this.toastrService.error(null===(s=null===(a=null==c?void 0:c.errors[0])||void 0===a?void 0:a.error)||void 0===s?void 0:s.message)}))}updateNft(f,l){return this.post("/nft/updateNft/"+f,{nftStatus:l}).pipe((0,O.q)(1),(0,P.b)(a=>{var s,v;a.hasErrors()&&this.toastrService.error(null===(v=null===(s=null==a?void 0:a.errors[0])||void 0===s?void 0:s.error)||void 0===v?void 0:v.message)}))}allUpdateNft(f,l){return this.post("/nft/updateAllNfts/",{nftStatus:f,appPackageId:l}).pipe((0,O.q)(1),(0,P.b)(a=>{var s,v;a.hasErrors()&&this.toastrService.error(null===(v=null===(s=null==a?void 0:a.errors[0])||void 0===s?void 0:s.error)||void 0===v?void 0:v.message)}))}batchUpdateNft(f,l,c){return this.post("/nft/updateMultipleNfts/",{nftStatus:l,nftArray:f,appPackageId:c}).pipe((0,O.q)(1),(0,P.b)(s=>{var v,h;s.hasErrors()&&this.toastrService.error(null===(h=null===(v=null==s?void 0:s.errors[0])||void 0===v?void 0:v.error)||void 0===h?void 0:h.message)}))}getEventsByNft(f){return this.get("/event/getEventByNftId/"+f).pipe((0,O.q)(1),(0,P.b)(c=>{var a,s;c.hasErrors()&&this.toastrService.error(null===(s=null===(a=null==c?void 0:c.errors[0])||void 0===a?void 0:a.error)||void 0===s?void 0:s.message)}))}getEventsByUser(f,l,c,a,s,v){const h={offset:--l?c*l:0,limit:c,eventType:v};return s&&(h.groupID=s),a&&(h.date=a),this.get("/event/getEventByUserId/"+f,h).pipe((0,O.q)(1),(0,P.b)(p=>{var w,t;p.hasErrors()&&this.toastrService.error(null===(t=null===(w=null==p?void 0:p.errors[0])||void 0===w?void 0:w.error)||void 0===t?void 0:t.message)}))}isMembershipIDExists(f){return this.post("/nft/isMembershipIDExists",f)}addNft(f){return this.post("/nft/addNft",f).pipe((0,O.q)(1),(0,P.b)(l=>{var c,a,s;l.hasErrors()?this.toastrService.error(null===(a=null===(c=null==l?void 0:l.errors[0])||void 0===c?void 0:c.error)||void 0===a?void 0:a.message):(null==l?void 0:l.data)&&(f.freezeNft&&(this.customDialogService.showLoadingDialog("Minting In Process"),setTimeout(()=>{this.customDialogService.closeDialogs()},3e3)),this._cardCreatedSuccess$.next(null===(s=null==l?void 0:l.data)||void 0===s?void 0:s.id))}))}updateNftResaleStatus(f,l,c){const a={isResaleAvailable:l};return l&&(a.price=c),this.post("/nft/updateOwnedNft/"+f,a).pipe((0,O.q)(1))}}return M.\u0275fac=function(f){return new(f||M)(R.LFG(g.W),R.LFG(D.eN),R.LFG(E.y),R.LFG(b._W),R.LFG(I.t2))},M.\u0275prov=R.Yz7({token:M,factory:M.\u0275fac,providedIn:"root"}),M})()},4762:(G,L,_)=>{function T(t,r,e,n){return new(e||(e=Promise))(function(o,u){function y(N){try{d(n.next(N))}catch(F){u(F)}}function A(N){try{d(n.throw(N))}catch(F){u(F)}}function d(N){N.done?o(N.value):function(o){return o instanceof e?o:new e(function(u){u(o)})}(N.value).then(y,A)}d((n=n.apply(t,r||[])).next())})}_.d(L,{mG:()=>T})}}]);