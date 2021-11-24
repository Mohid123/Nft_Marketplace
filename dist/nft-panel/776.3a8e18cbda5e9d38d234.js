"use strict";(self.webpackChunknft_panel=self.webpackChunknft_panel||[]).push([[776],{7580:(U,M,o)=>{o.d(M,{z:()=>P});var O=o(5207),e=o(8476),_=o(424),d=o(5076);function P(x,F){return F?function(p){return p.pipe(P(function(c,i){return(0,e.Xf)(x(c,i)).pipe((0,O.U)(function(a,t){return F(c,a,i,t)}))}))}:(0,_.e)(function(p,c){var i=0,a=null,t=!1;p.subscribe(new d.Q(c,function(l){a||(a=new d.Q(c,void 0,function(){a=null,t&&c.complete()}),(0,e.Xf)(x(l,i++)).subscribe(a))},function(){t=!0,!a&&c.complete()}))})}},6658:(U,M,o)=>{o.d(M,{y:()=>F});var O=o(4294),e=o(9922),_=o(2352),d=o(7716),P=o(1841),x=o(9344);let F=(()=>{class p extends _.s{constructor(i,a){super(i),this.http=i,this.toastrService=a,this.maxWidth=73,this.maxHeight=64}uploadMedia(i,a){return this.postMedia(`/media-upload/mediaFiles/${i}`,a).pipe((0,O.q)(1),(0,e.b)(t=>{var l,m;t.hasErrors()&&this.toastrService.error(null===(m=null===(l=null==t?void 0:t.errors[0])||void 0===l?void 0:l.error)||void 0===m?void 0:m.message)}))}convertToImg(i,a){return new Promise(t=>{const l=document.createElement("canvas"),m=l.getContext("2d"),n=new Image;n.src=i,n.onload=()=>{l.width=72,l.height=64,m.drawImage(n,0,0,n.width,n.height,0,0,72,64),t(this.dataURLtoFile(l.toDataURL(),a))}})}dataURLtoFile(i,a){const t=i.split(","),l=t[0].match(/:(.*?);/)[1],m=atob(t[1]);let n=m.length;const h=new Uint8Array(n);for(;n--;)h[n]=m.charCodeAt(n);return new File([h],a,{type:l})}compressImage(i){return new Promise((a,t)=>{const l=document.createElement("canvas"),m=l.getContext("2d"),n=new Image;n.src=URL.createObjectURL(i),n.onload=()=>{const h=this.calculateAspectRatioFit(null==n?void 0:n.width,null==n?void 0:n.height);l.width=h.width,l.height=h.height,m.drawImage(n,0,0,n.width,n.height,0,0,h.width,h.height),a(this.dataURLtoFile(l.toDataURL(),"thumbnail.jpg"))}})}calculateAspectRatioFit(i,a){const t=Math.min(this.maxWidth/i,this.maxHeight/a);return{width:i*t,height:a*t}}}return p.\u0275fac=function(i){return new(i||p)(d.LFG(P.eN),d.LFG(x._W))},p.\u0275prov=d.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"}),p})()},5776:(U,M,o)=>{o.r(M),o.d(M,{CreateGroupDialogModule:()=>b});var O=o(8583),e=o(3679),_=o(6237),d=o(9344),P=o(3291),x=o(6889),F=o(1964),p=o(2687),c=o(5755),i=o(4294),a=o(7580),t=o(7716),l=o(7423),m=o(3826),n=o(1659),h=o(6658),D=o(1841),E=o(9866),Z=o(9309);function A(s,f){1&s&&(t.TgZ(0,"p",16),t._uU(1,"please enter name"),t.qZA())}function I(s,f){if(1&s&&(t.TgZ(0,"p",16),t._uU(1),t.qZA()),2&s){const g=t.oxw();t.xp6(1),t.hij("name should be greater than or equal to ",null==g.groupForm.controls.name.errors?null:g.groupForm.controls.name.errors.minlength.requiredLength," character ")}}function T(s,f){1&s&&(t.TgZ(0,"p",16),t._uU(1,"please enter description"),t.qZA())}function L(s,f){if(1&s&&(t.TgZ(0,"p",16),t._uU(1),t.qZA()),2&s){const g=t.oxw();t.xp6(1),t.hij("description should be greater than or equal to ",null==g.groupForm.controls.description.errors?null:g.groupForm.controls.description.errors.minlength.requiredLength," character ")}}let w=(()=>{class s{constructor(g,r,u,v,C,y,G,R,S,N){this.authService=g,this.customDialogService=r,this.formBuilder=u,this.groupService=v,this.mediaService=C,this.http=y,this.toastr=G,this.cf=R,this.spinner=S,this.routeService=N,this.destroy$=new x.x,this.imgFormData=new FormData,this.groups$=this.groupService.groups$,this.limit=6,this.groupForm=this.formBuilder.group({name:new e.NI("",[e.kI.required,e.kI.minLength(3),e.kI.maxLength(7)]),description:new e.NI("",[e.kI.required,e.kI.minLength(15),e.kI.maxLength(25)]),file:new e.NI("")}),this.page=1,this._isLoading=!1,this.routeService.clubName$.pipe((0,p.x)(),(0,c.R)(this.destroy$)).subscribe(B=>{this.clubName=B,this.getGroup()})}getGroup(){this._isLoading||this.groupService.getAllGroupsByClub(this.clubName,this.page,{limit:this.limit})}addGroup(){this.spinner.show("main");const g=document.getElementById("group-img");P.YM(g,{canvasWidth:186,canvasHeight:162,width:186,height:162,quality:1,pixelRatio:1,skipAutoScale:!1}).then(r=>{this.groupForm.patchValue({file:this.mediaService.dataURLtoFile(r,this.groupForm.controls.name.value+".png")}),this.imgFormData.append("file",this.groupForm.get("file").value),this.mediaService.uploadMedia("group",this.imgFormData).pipe((0,i.q)(1),(0,a.z)(u=>{var v;if(u.hasErrors())return(0,F.of)(null);{const C={name:this.groupForm.controls.name.value,description:this.groupForm.controls.description.value,appPackageId:null===(v=this.authService.loggedInUser)||void 0===v?void 0:v.appPackageId,coverImageUrl:u.data.url};return this.groupService.addGroups(C)}})).subscribe(u=>{var v,C;this.spinner.hide("main"),null===u||u.hasErrors()?(this.imgFormData=new FormData,this.toastr.error(null===(C=null===(v=u.errors[0])||void 0===v?void 0:v.error)||void 0===C?void 0:C.message,"Error!")):(this.cf.detectChanges(),this.toastr.success("New group successfully added.","Success!"),this.getGroup(),this.close())})}).catch(r=>{this.toastr.warning(r,"Error!")})}close(){this.customDialogService.closeDialogs()}}return s.\u0275fac=function(g){return new(g||s)(t.Y36(l.e),t.Y36(m.W),t.Y36(e.qu),t.Y36(n.l),t.Y36(h.y),t.Y36(D.eN),t.Y36(d._W),t.Y36(t.sBO),t.Y36(E.t2),t.Y36(Z.M))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-create-group"]],decls:27,vars:7,consts:[[1,"group-model"],[1,"flex","justify-end"],[1,"btn-close",3,"click"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 20 20","fill","currentColor",1,"w-5","h-5"],["fill-rule","evenodd","d","M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule","evenodd"],[2,"position","absolute","right","0","top","0"],["id","group-img",2,"position","relative","top","0","width","182px","text-align","center","right","0","height","162px","overflow","hidden"],[2,"background-color","#D99F3A","transform","rotate(41.3deg)","top","21%","width","300px","position","absolute","right","-50%","height","52px","font-weight","400","font-size","32px"],[1,"group-form",3,"formGroup"],["for","name"],["type","text","formControlName","name","maxlength","7"],["class","error-msg error",4,"ngIf"],["for","description",1,"floating-label"],["type","text","formControlName","description","maxlength","25"],[1,"icon","description-hide-icon"],[1,"primary-btn",3,"disabled","click"],[1,"error-msg","error"]],template:function(g,r){1&g&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"button",2),t.NdJ("click",function(){return r.close()}),t.O4$(),t.TgZ(3,"svg",3),t._UZ(4,"path",4),t.qZA(),t.qZA(),t.qZA(),t.kcU(),t.TgZ(5,"h1"),t.TgZ(6,"span"),t._uU(7,"Cre"),t.qZA(),t._uU(8,"ate Group"),t.qZA(),t.TgZ(9,"div",5),t.TgZ(10,"div",6),t.TgZ(11,"div",7),t._uU(12),t.qZA(),t.qZA(),t.qZA(),t.TgZ(13,"form",8),t.TgZ(14,"label",9),t._uU(15,"Name"),t.qZA(),t._UZ(16,"input",10),t.YNc(17,A,2,0,"p",11),t.YNc(18,I,2,1,"p",11),t.TgZ(19,"label",12),t._uU(20,"Description"),t.qZA(),t._UZ(21,"textarea",13),t._UZ(22,"span",14),t.YNc(23,T,2,0,"p",11),t.YNc(24,L,2,1,"p",11),t.TgZ(25,"button",15),t.NdJ("click",function(){return r.addGroup()}),t._uU(26," Add Group "),t.qZA(),t.qZA(),t.qZA()),2&g&&(t.xp6(12),t.hij(" ",r.groupForm.controls.name.value," "),t.xp6(1),t.Q6J("formGroup",r.groupForm),t.xp6(4),t.Q6J("ngIf",r.groupForm.controls.name.touched&&(null==r.groupForm.controls.name.errors?null:r.groupForm.controls.name.errors.required)),t.xp6(1),t.Q6J("ngIf",r.groupForm.controls.name.touched&&(null==r.groupForm.controls.name.errors?null:r.groupForm.controls.name.errors.minlength)),t.xp6(5),t.Q6J("ngIf",r.groupForm.controls.description.touched&&(null==r.groupForm.controls.description.errors?null:r.groupForm.controls.description.errors.required)),t.xp6(1),t.Q6J("ngIf",r.groupForm.controls.name.touched&&(null==r.groupForm.controls.description.errors?null:r.groupForm.controls.description.errors.minlength)),t.xp6(1),t.Q6J("disabled",!r.groupForm.valid))},directives:[e._Y,e.JL,e.sg,e.Fj,e.JJ,e.u,e.nD,O.O5],styles:[".create-group-dialog-overlay{height:auto;min-height:584px;max-width:580px!important}.group-model[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding-left:0;padding-right:0}@media (min-width: 640px){.group-model[_ngcontent-%COMP%]{padding-left:4rem;padding-right:4rem}}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]{position:absolute;top:0px;right:0px;z-index:10;margin:.875rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgba(255,255,255,var(--tw-bg-opacity));opacity:.5}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover{opacity:.7}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]{padding:1px}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{color:#132356}.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:1.5rem;object-fit:scale-down}@media (min-width: 640px){.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:1.5rem}}@media (min-width: 768px){.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:3rem}}.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:410px;height:90px}.group-model[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:1rem;margin-bottom:1rem;align-self:flex-start;font-size:1.875rem;line-height:2.25rem;font-weight:400}.group-model[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding-bottom:4px;border-bottom:2px solid #75F16D}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;width:100%;flex-direction:column}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{padding-top:1rem;padding-bottom:1rem;font-size:1.125rem;line-height:1.75rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{height:3.5rem;padding-left:1.25rem;padding-right:1.25rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{padding:1.25rem;height:156px}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding-left:.5rem;padding-right:.5rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:2rem;margin-bottom:2rem;height:2.75rem;width:10rem;align-self:center}"]}),s})(),b=(()=>{class s{static getCreateGroupComponent(){return w}}return s.\u0275fac=function(g){return new(g||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[[O.ez,e.u5,e.UX,_.PW,d.Rh.forRoot({positionClass:"toast-top-right"})]]}),s})()}}]);