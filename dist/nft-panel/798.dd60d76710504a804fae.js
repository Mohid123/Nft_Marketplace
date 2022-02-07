"use strict";(self.webpackChunknft_panel=self.webpackChunknft_panel||[]).push([[798],{9554:(w,f,i)=>{i.d(f,{t:()=>M});var u=i(4808),r=i(5094),d=i(4294),_=i(9922),t=i(2352),p=i(7716),v=i(1841),y=i(6989),b=i(9455),P=i(9344),C=i(9866);let M=(()=>{class g extends t.s{constructor(s,m,h,Z,S){super(s),this.http=s,this.customDialogService=m,this.creatorService=h,this.toastr=Z,this.spinner=S,this._purchaseSuccess$=new r.X(null),this.purchaseSuccess$=this._purchaseSuccess$.asObservable(),this._subscriptionInProgress$=new r.X(null),this.subscriptionInProgress$=this._subscriptionInProgress$.asObservable(),this._subscriptionInProgress$.subscribe(x=>{x&&this.checkSubscriptionProgress()})}addKey(s){return this.post("/creator/validateAndSaveStripeSecretKey",s).pipe((0,d.q)(1),(0,_.b)(m=>{if(!m.hasErrors()&&m.data.isValid){const h=(0,u.rV)(u.MX.Creator);this.creatorService.getCreator(null==h?void 0:h.club,!0).pipe((0,d.q)(1)).subscribe()}}))}purchaseNFT(s){return this.stripePay(s).pipe((0,d.q)(1))}purchaseSubscription(s){return this.stripePayForSubscription(s).pipe((0,d.q)(1),(0,_.b)(m=>{m.hasErrors()||this._subscriptionInProgress$.next(!0)}))}purchaseNFTSuccess(s){this._purchaseSuccess$.next(s)}stripePay(s){return this.post("/nft/buyNft/"+s.nftId,s)}stripePayForSubscription(s){return this.post("/token-transaction/buyNdct/",s)}checkSubscriptionProgress(){this.get("/token-transaction/isBuyNdctTransactionPending").subscribe(s=>{s.hasErrors()||0!=s.data.status?setTimeout(()=>{this._subscriptionInProgress$.next(!0)},3e4):this._subscriptionInProgress$.next(!1)})}}return g.\u0275fac=function(s){return new(s||g)(p.LFG(v.eN),p.LFG(y.W),p.LFG(b.b),p.LFG(P._W),p.LFG(C.t2))},g.\u0275prov=p.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"}),g})()},5798:(w,f,i)=>{i.r(f),i.d(f,{StripeDialogModule:()=>F});var u=i(8583),r=i(3679),d=i(9866),_=i(9344),t=i(7716),p=i(6989),v=i(9554),y=i(9309);function b(n,l){1&n&&(t.TgZ(0,"p",14),t._uU(1,"please enter key"),t.qZA())}function P(n,l){1&n&&(t.TgZ(0,"p",14),t._uU(1,"please enter valid key"),t.qZA())}let C=(()=>{class n{constructor(o,e,a,c,T){this.customDialogService=o,this.formBuilder=e,this.stripeService=a,this.routeService=c,this.toastr=T,this.stripeForm=this.formBuilder.group({key:new r.NI("",[r.kI.required,r.kI.minLength(3)])})}addKey(){this.stripeService.addKey({key:this.stripeForm.controls.key.value,clubName:this.routeService.clubName}).subscribe(e=>{!e.hasErrors()&&e.data.isValid?this.close():this.toastr.warning("Please enter valid stripe key.","Invalid!")})}close(){this.customDialogService.closeDialogs()}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(p.W),t.Y36(r.qu),t.Y36(v.t),t.Y36(y.M),t.Y36(_._W))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-stripe-key"]],decls:22,vars:3,consts:[[1,"group-model"],[1,"flex","justify-end"],[1,"btn-close",3,"click"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 20 20","fill","currentColor",1,"w-5","h-5"],["fill-rule","evenodd","d","M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule","evenodd"],["src","./assets/logo/stripe-logo-blue.png"],[1,"flex","justify-between","my-6"],[1,"text-sm","text-green-400"],["href","https://support.stripe.com/questions/locate-api-keys-in-the-dashboard","target","_blank"],[1,"group-form",3,"formGroup"],[1,"mb-9"],["type","text","formControlName","key",1,"mb-14"],["class","error-msg error",4,"ngIf"],[1,"primary-btn",3,"click"],[1,"error-msg","error"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"button",2),t.NdJ("click",function(){return e.close()}),t.O4$(),t.TgZ(3,"svg",3),t._UZ(4,"path",4),t.qZA(),t.qZA(),t.qZA(),t.kcU(),t._UZ(5,"img",5),t.TgZ(6,"div",6),t.TgZ(7,"h1"),t.TgZ(8,"span"),t._uU(9,"Ent"),t.qZA(),t._uU(10,"er Stripe Key"),t.qZA(),t.TgZ(11,"button",7),t.TgZ(12,"a",8),t._uU(13,"Help"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(14,"form",9),t.TgZ(15,"p",10),t._uU(16,"Enter Club stripe secret key to perform marketplace payments."),t.qZA(),t._UZ(17,"input",11),t.YNc(18,b,2,0,"p",12),t.YNc(19,P,2,0,"p",12),t.TgZ(20,"button",13),t.NdJ("click",function(){return e.addKey()}),t._uU(21," Next "),t.qZA(),t.qZA(),t.qZA()),2&o&&(t.xp6(14),t.Q6J("formGroup",e.stripeForm),t.xp6(4),t.Q6J("ngIf",e.stripeForm.controls.key.touched&&(null==e.stripeForm.controls.key.errors?null:e.stripeForm.controls.key.errors.required)),t.xp6(1),t.Q6J("ngIf",e.stripeForm.controls.key.touched&&(null==e.stripeForm.controls.key.errors?null:e.stripeForm.controls.key.errors.key)))},directives:[r._Y,r.JL,r.sg,r.Fj,r.JJ,r.u,u.O5],styles:[".strip-key-dialog-overlay{height:auto;min-height:490px;max-width:580px!important}.group-model[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start;padding-left:0;padding-right:0}@media (min-width: 640px){.group-model[_ngcontent-%COMP%]{padding-left:4rem;padding-right:4rem}}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]{position:absolute;top:0px;right:0px;margin:.875rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgba(255,255,255,var(--tw-bg-opacity));opacity:.5}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover{opacity:.7}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]{padding:1px}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{color:#132356}.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:1rem;margin-bottom:1rem;object-fit:scale-down;width:145px;height:70px}.group-model[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:1rem 0;align-self:flex-start;font-size:1.875rem;line-height:2.25rem;font-weight:400}.group-model[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding-bottom:4px;border-bottom:2px solid #75F16D}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;width:100%;flex-direction:column}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{padding-top:1rem;padding-bottom:1rem;font-size:1.125rem;line-height:1.75rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{height:3.5rem;padding-left:1.25rem;padding-right:1.25rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{padding:1.25rem;height:156px}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgba(156,163,175,var(--tw-text-opacity))}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:1.25rem;height:2.75rem;width:10rem;align-self:center}"]}),n})();var M=i(7423),g=i(9455);function O(n,l){if(1&n&&(t.TgZ(0,"div",26),t._UZ(1,"img",27),t.qZA()),2&n){const o=t.oxw();t.xp6(1),t.Q6J("src",null==o.nft?null:o.nft.serverCaptureFileUrl,t.LSH)}}function s(n,l){1&n&&(t.TgZ(0,"p",28),t._uU(1,"please enter card no"),t.qZA())}function m(n,l){1&n&&(t.TgZ(0,"p",28),t._uU(1,"card no length should be greater than 3"),t.qZA())}function h(n,l){1&n&&(t.TgZ(0,"p",28),t._uU(1,"please select valid date"),t.qZA())}function Z(n,l){1&n&&(t.TgZ(0,"p",28),t._uU(1,"please enter CVC"),t.qZA())}function S(n,l){1&n&&(t.TgZ(0,"p",28),t._uU(1,"CVV length should be greater than 3"),t.qZA())}let x=(()=>{class n{constructor(o,e,a,c,T,I){this.authService=o,this.creatorService=e,this.customDialogService=a,this.formBuilder=c,this.stripeService=T,this.toastr=I,this.creator$=this.creatorService.Creator$,this.stripeForm=this.formBuilder.group({cardNo:new r.NI("",[r.kI.required,r.kI.minLength(3)]),validity:new r.NI("",[r.kI.required,r.kI.minLength(3)]),cvv:new r.NI("",[r.kI.required,r.kI.minLength(3)])})}close(){this.customDialogService.closeDialogs()}payNowClick(){var o;console.log("nft:",this.nft),(null===(o=this.nft)||void 0===o?void 0:o.id)?this.purchaseNFT():this.purchaseSubscriptionPlan()}purchaseNFT(){const o={card:{number:this.stripeForm.controls.cardNo.value.toString(),expMonth:+this.stripeForm.controls.validity.value.substring(0,2),expYear:+this.stripeForm.controls.validity.value.substring(3,5),cvc:+this.stripeForm.controls.cvv.value},payment:this.nft.price,description:"",userId:this.authService.loggedInUser.id,nftId:this.nft.id,clubUserId:this.authService.loggedInUser.clubUserId};this.isLoading=!0,this.stripeService.purchaseNFT(o).subscribe(e=>{var a,c;this.isLoading=!1,e.hasErrors()?this.toastr.warning(null===(c=null===(a=e.errors[0])||void 0===a?void 0:a.error)||void 0===c?void 0:c.message,"Error!"):(this.customDialogService.showLoadingDialog("Transferring In Process"),this.stripeService.purchaseNFTSuccess(o.nftId),setTimeout(()=>{this.customDialogService.closeDialogs()},3e3))})}purchaseSubscriptionPlan(){const o={stripeDto:{card:{number:this.stripeForm.controls.cardNo.value.toString(),expMonth:+this.stripeForm.controls.validity.value.substring(0,2),expYear:+this.stripeForm.controls.validity.value.substring(3,5),cvc:+this.stripeForm.controls.cvv.value}},tokenQuantity:this.subscriptionPlan.tokenQuantity};this.isLoading=!0,this.stripeService.purchaseSubscription(o).subscribe(e=>{var a,c;this.isLoading=!1,e.hasErrors()?this.toastr.warning(null===(c=null===(a=e.errors[0])||void 0===a?void 0:a.error)||void 0===c?void 0:c.message,"Error!"):(console.log("subscriptionPlan Res:",e.data),this.customDialogService.showLoadingDialog("Subscription In Process"),setTimeout(()=>{this.customDialogService.closeDialogs()},3e3))})}isDateValid(){const o=document.getElementById("dated");o.value=o.value.replace(/^(\d\d)(\d)$/g,"$1/$2").replace(/^(\d\d\/\d\d)(\d+)$/g,"$1/$2").replace(/[^\d\/]/g,"")}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(M.e),t.Y36(g.b),t.Y36(p.W),t.Y36(r.qu),t.Y36(v.t),t.Y36(_._W))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-stripe-payment"]],inputs:{nft:"nft",subscriptionPlan:"subscriptionPlan"},decls:37,vars:14,consts:[[1,"relative","strip-payment-model"],["bdOpacity","0.9","bdColor","#fff","name","strip-payment-spinner","size","medium","color","#31314d","type","ball-scale-multiple",3,"fullScreen","showSpinner"],[2,"font-size","20px","color","#31314d"],[1,"flex","justify-end"],[1,"btn-close",3,"click"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 20 20","fill","currentColor",1,"w-5","h-5"],["fill-rule","evenodd","d","M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule","evenodd"],[1,"h-16","mt-0",".center"],["src","./assets/logo/stripe-logo-blue.png",1,"object-center"],["class","mt-6 rounded-2xl w-28 h-28",4,"ngIf"],[1,"w-full","price"],[1,"pb-5","mx-auto","mt-2","font-bold","min-w-min",2,"width","fit-content"],[1,"strip-payment-form",3,"formGroup"],["for","cardNo",1,"floating-label"],["type","number","formControlName","cardNo","maxlength","16","placeholder","************1234","oninput","javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"],[1,"icon","cardNo-hide-icon"],["class","error-msg error",4,"ngIf"],[1,"flex","flex-row"],[1,"w-2/4","pr-4"],["for","validity",1,"floating-label"],["type","text","formControlName","validity","maxlength","5","placeholder","e.g 01/22","id","dated",3,"keyup"],[1,"w-2/4","pl-4"],["for","cvv",1,"floating-label"],["type","number","formControlName","cvv","placeholder","123","maxlength","4","oninput","javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"],[1,"icon","cvv-hide-icon"],[1,"primary-btn",3,"disabled","click"],[1,"mt-6","rounded-2xl","w-28","h-28"],[1,"object-center",3,"src"],[1,"error-msg","error"]],template:function(o,e){if(1&o&&(t.TgZ(0,"div",0),t.TgZ(1,"ngx-spinner",1),t.TgZ(2,"p",2),t._uU(3),t.ALo(4,"async"),t.qZA(),t.qZA(),t.TgZ(5,"div",3),t.TgZ(6,"button",4),t.NdJ("click",function(){return e.close()}),t.O4$(),t.TgZ(7,"svg",5),t._UZ(8,"path",6),t.qZA(),t.qZA(),t.qZA(),t.kcU(),t.TgZ(9,"div",7),t._UZ(10,"img",8),t.qZA(),t.YNc(11,O,2,1,"div",9),t.TgZ(12,"div",10),t.TgZ(13,"p",11),t._uU(14),t.qZA(),t.qZA(),t.TgZ(15,"form",12),t.TgZ(16,"label",13),t._uU(17,"Card no"),t.qZA(),t._UZ(18,"input",14),t._UZ(19,"span",15),t.YNc(20,s,2,0,"p",16),t.YNc(21,m,2,0,"p",16),t.TgZ(22,"div",17),t.TgZ(23,"div",18),t.TgZ(24,"label",19),t._uU(25,"Validity"),t.qZA(),t.TgZ(26,"input",20),t.NdJ("keyup",function(){return e.isDateValid()}),t.qZA(),t.YNc(27,h,2,0,"p",16),t.qZA(),t.TgZ(28,"div",21),t.TgZ(29,"label",22),t._uU(30,"CVC"),t.qZA(),t._UZ(31,"input",23),t._UZ(32,"span",24),t.YNc(33,Z,2,0,"p",16),t.YNc(34,S,2,0,"p",16),t.qZA(),t.qZA(),t.TgZ(35,"button",25),t.NdJ("click",function(){return e.payNowClick()}),t._uU(36," Pay Now "),t.qZA(),t.qZA(),t.qZA()),2&o){let a;t.xp6(1),t.Q6J("fullScreen",!1)("showSpinner",e.isLoading),t.xp6(2),t.hij("",null==(a=t.lcZ(4,12,e.creator$))?null:a.displayName,"..."),t.xp6(8),t.Q6J("ngIf",null==e.nft?null:e.nft.serverCaptureFileUrl),t.xp6(3),t.hij("\u20ac ",(null==e.nft?null:e.nft.price)||(null==e.subscriptionPlan?null:e.subscriptionPlan.price),""),t.xp6(1),t.Q6J("formGroup",e.stripeForm),t.xp6(5),t.Q6J("ngIf",e.stripeForm.controls.cardNo.touched&&(null==e.stripeForm.controls.cardNo.errors?null:e.stripeForm.controls.cardNo.errors.required)),t.xp6(1),t.Q6J("ngIf",e.stripeForm.controls.cardNo.touched&&(null==e.stripeForm.controls.cardNo.errors?null:e.stripeForm.controls.cardNo.errors.minlength)),t.xp6(6),t.Q6J("ngIf",e.stripeForm.controls.validity.touched&&(null==e.stripeForm.controls.validity.errors?null:e.stripeForm.controls.validity.errors.required)),t.xp6(6),t.Q6J("ngIf",e.stripeForm.controls.cvv.touched&&(null==e.stripeForm.controls.cvv.errors?null:e.stripeForm.controls.cvv.errors.required)),t.xp6(1),t.Q6J("ngIf",e.stripeForm.controls.cvv.touched&&(null==e.stripeForm.controls.cvv.errors?null:e.stripeForm.controls.cvv.errors.minlength)),t.xp6(1),t.Q6J("disabled",!e.stripeForm.valid)}},directives:[d.Ro,u.O5,r._Y,r.JL,r.sg,r.wV,r.Fj,r.JJ,r.u,r.nD],pipes:[u.Ov],styles:[".strip-payment-dialog-overlay{justify-content:center;border-radius:1.5rem;--tw-bg-opacity: 1;background-color:rgba(255,255,255,var(--tw-bg-opacity));--tw-text-opacity: 1;color:rgba(17,24,39,var(--tw-text-opacity));height:auto;min-height:723px;max-width:557px!important}.strip-payment-model[_ngcontent-%COMP%]{display:flex;height:100%;flex-direction:column;align-items:center;padding-left:0;padding-right:0}@media (min-width: 640px){.strip-payment-model[_ngcontent-%COMP%]{padding-left:3rem;padding-right:3rem}}.strip-payment-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]{position:absolute;top:0px;right:0px;margin:.875rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgba(255,255,255,var(--tw-bg-opacity));opacity:.5}.strip-payment-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover{opacity:.7}.strip-payment-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]{padding:1px}.strip-payment-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{color:#132356}.strip-payment-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{object-fit:scale-down;width:304}.strip-payment-model[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:3rem;margin-bottom:3rem;font-size:1.875rem;line-height:2.25rem;text-transform:capitalize;font-weight:400}.strip-payment-model[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding-bottom:4px;border-bottom:2px solid #75F16D}.strip-payment-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;width:100%;flex-direction:column}.strip-payment-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{width:100%;padding-top:1rem;padding-bottom:1rem;font-size:1.125rem;line-height:1.75rem;font-weight:500}.strip-payment-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-bottom:1.75rem;width:100%;--tw-bg-opacity: 1;background-color:rgba(242,242,244,var(--tw-bg-opacity))}.strip-payment-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:1.5rem;height:4rem;width:100%;align-self:center;font-size:1.25rem;line-height:1.75rem;font-weight:500;text-transform:uppercase;--tw-text-opacity: 1;color:rgba(255,255,255,var(--tw-text-opacity));background:transparent linear-gradient(97deg,#3BC0F2 0%,#31D491 100%) 0% 0% no-repeat padding-box}.language-container[_ngcontent-%COMP%]{margin-top:2.5rem;margin-bottom:2.5rem;display:flex;align-items:center;justify-content:center;font-size:13px}.language-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:flex;height:2.25rem;width:9rem;align-items:center;justify-content:space-around;padding-left:.5rem;padding-right:.5rem;--tw-text-opacity: 1;color:rgba(255,255,255,var(--tw-text-opacity));background:#31D491 0% 0% no-repeat padding-box}.language-container[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{height:.75rem;width:.75rem;font-size:.75rem;line-height:1rem}.language-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:0 6px}.price[_ngcontent-%COMP%]{border-bottom:#f2f2f4 solid 1px}input[_ngcontent-%COMP%]::-webkit-outer-spin-button, input[_ngcontent-%COMP%]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number][_ngcontent-%COMP%]{-moz-appearance:textfield}.error-msg[_ngcontent-%COMP%]{color:red}"]}),n})(),F=(()=>{class n{static getStripeKeyComponent(){return C}static getStripePaymentComponent(){return x}}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[u.ez,r.u5,_.Rh.forRoot(),d.ef,r.UX]]}),n})()}}]);