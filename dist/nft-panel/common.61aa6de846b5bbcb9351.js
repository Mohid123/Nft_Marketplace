"use strict";(self.webpackChunknft_panel=self.webpackChunknft_panel||[]).push([[592],{9554:(M,c,t)=>{t.d(c,{t:()=>D});var _=t(4808),l=t(5094),n=t(4294),E=t(9922),h=t(2352),i=t(7716),v=t(1841),u=t(4909),p=t(9344),d=t(9866);let D=(()=>{class e extends h.s{constructor(s,r,o,a){super(s),this.http=s,this.customDialogService=r,this.toastr=o,this.spinner=a,this._purchaseSuccess$=new l.X(null),this.purchaseSuccess$=this._purchaseSuccess$.asObservable()}addKey(s){return this.post("/creator/validateAndSaveStripeSecretKey",s).pipe((0,n.q)(1),(0,E.b)(r=>{!r.hasErrors()&&r.data.isValid?(0,_.LS)(_.MX.Key,r.data.isValid):console.log("invalid key")}))}purchaseNFT(s){this.spinner.show("main"),this.stripePay(s).pipe((0,n.q)(1)).subscribe(r=>{var o,a;r.hasErrors()?this.toastr.warning(null===(a=null===(o=r.errors[0])||void 0===o?void 0:o.error)||void 0===a?void 0:a.message,"Error!"):(this.customDialogService.showLoadingDialog("Transferring In Process"),setTimeout(()=>{this.customDialogService.closeDialogs()},3e3),this._purchaseSuccess$.next(s.nftId),console.log("success:",r)),this.spinner.hide("main")})}stripePay(s){return this.post("/nft/buyNft/"+s.nftId,s)}}return e.\u0275fac=function(s){return new(s||e)(i.LFG(v.eN),i.LFG(u.W),i.LFG(p._W),i.LFG(d.t2))},e.\u0275prov=i.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);