"use strict";(self.webpackChunknft_panel=self.webpackChunknft_panel||[]).push([[776],{6658:(U,C,o)=>{o.d(C,{y:()=>F});var M=o(4294),i=o(9922),P=o(2352),f=o(7716),O=o(1841),x=o(9344);let F=(()=>{class u extends P.s{constructor(s,g){super(s),this.http=s,this.toastrService=g,this.maxWidth=73,this.maxHeight=64}uploadMedia(s,g){return this.postMedia(`/media-upload/mediaFiles/${s}`,g).pipe((0,M.q)(1),(0,i.b)(l=>{var t,m;l.hasErrors()&&this.toastrService.error(null===(m=null===(t=null==l?void 0:l.errors[0])||void 0===t?void 0:t.error)||void 0===m?void 0:m.message)}))}convertToImg(s,g){return new Promise(l=>{const t=document.createElement("canvas"),m=t.getContext("2d"),e=new Image;e.src=s,e.onload=()=>{t.width=72,t.height=64,m.drawImage(e,0,0,e.width,e.height,0,0,72,64),l(this.dataURLtoFile(t.toDataURL(),g))}})}dataURLtoFile(s,g){const l=s.split(","),t=l[0].match(/:(.*?);/)[1],m=atob(l[1]);let e=m.length;const c=new Uint8Array(e);for(;e--;)c[e]=m.charCodeAt(e);return new File([c],g,{type:t})}compressImage(s){return new Promise((g,l)=>{const t=document.createElement("canvas"),m=t.getContext("2d"),e=new Image;e.src=URL.createObjectURL(s),e.onload=()=>{const c=this.calculateAspectRatioFit(null==e?void 0:e.width,null==e?void 0:e.height);t.width=c.width,t.height=c.height,m.drawImage(e,0,0,e.width,e.height,0,0,c.width,c.height),g(this.dataURLtoFile(t.toDataURL(),"thumbnail.jpg"))}})}calculateAspectRatioFit(s,g){const l=Math.min(this.maxWidth/s,this.maxHeight/g);return{width:s*l,height:g*l}}}return u.\u0275fac=function(s){return new(s||u)(f.LFG(O.eN),f.LFG(x._W))},u.\u0275prov=f.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u})()},5776:(U,C,o)=>{o.r(C),o.d(C,{CreateGroupDialogModule:()=>S});var M=o(8583),i=o(3679),P=o(6237),f=o(9344),O=o(4819),x=o(3291),F=o(6889),u=o(1964),Z=o(2687),s=o(5755),g=o(4294),l=o(7580),t=o(7716),m=o(7423),e=o(6382),c=o(1659),T=o(6658),A=o(1841),I=o(9866),D=o(9309),w=o(4228);function L(n,h){1&n&&(t.TgZ(0,"p",16),t._uU(1,"please enter name"),t.qZA())}function y(n,h){if(1&n&&(t.TgZ(0,"p",16),t._uU(1),t.qZA()),2&n){const a=t.oxw();t.xp6(1),t.hij("name should be greater than or equal to ",null==a.groupForm.controls.name.errors?null:a.groupForm.controls.name.errors.minlength.requiredLength," character ")}}function G(n,h){1&n&&(t.TgZ(0,"p",16),t._uU(1,"please enter description"),t.qZA())}function b(n,h){if(1&n&&(t.TgZ(0,"p",16),t._uU(1),t.qZA()),2&n){const a=t.oxw();t.xp6(1),t.hij("description should be greater than or equal to ",null==a.groupForm.controls.description.errors?null:a.groupForm.controls.description.errors.minlength.requiredLength," character ")}}let E=(()=>{class n{constructor(a,r,p,d,v,_,R,N,Y,j){this.authService=a,this.customDialogService=r,this.formBuilder=p,this.groupService=d,this.mediaService=v,this.http=_,this.toastr=R,this.cf=N,this.spinner=Y,this.routeService=j,this.destroy$=new F.x,this.imgFormData=new FormData,this.groups$=this.groupService.groups$,this.limit=6,this.groupForm=this.formBuilder.group({name:new i.NI("",[i.kI.required,i.kI.minLength(3),i.kI.maxLength(7)]),description:new i.NI("",[i.kI.required,i.kI.minLength(15),i.kI.maxLength(600)]),file:new i.NI("")}),this.page=1,this._isLoading=!1,this.routeService.clubName$.pipe((0,Z.x)(),(0,s.R)(this.destroy$)).subscribe(B=>{this.clubName=B,this.getGroup()})}getGroup(){this._isLoading||this.groupService.getAllGroupsByClub(this.clubName,this.page,{limit:this.limit})}addGroup(){this.spinner.show("main");const a=document.getElementById("group-img");x.YM(a,{canvasWidth:186,canvasHeight:162,width:186,height:162,quality:1,pixelRatio:1,skipAutoScale:!1}).then(r=>{this.groupForm.patchValue({file:this.mediaService.dataURLtoFile(r,this.groupForm.controls.name.value+".png")}),this.imgFormData.append("file",this.groupForm.get("file").value),this.mediaService.uploadMedia("group",this.imgFormData).pipe((0,g.q)(1),(0,l.z)(p=>{var d;if(p.hasErrors())return(0,u.of)(null);{const v={name:this.groupForm.controls.name.value,description:this.groupForm.controls.description.value,appPackageId:null===(d=this.authService.loggedInUser)||void 0===d?void 0:d.appPackageId,coverImageUrl:p.data.url};return this.groupService.addGroups(v)}})).subscribe(p=>{var d,v;this.spinner.hide("main"),null===p||p.hasErrors()?(this.imgFormData=new FormData,this.toastr.error(null===(v=null===(d=p.errors[0])||void 0===d?void 0:d.error)||void 0===v?void 0:v.message,"Error!")):(this.cf.detectChanges(),this.toastr.success("New group successfully added.","Success!"),this.getGroup(),this.close())})}).catch(r=>{this.toastr.warning(r,"Error!")})}close(){this.customDialogService.closeDialogs()}}return n.\u0275fac=function(a){return new(a||n)(t.Y36(m.e),t.Y36(e.W),t.Y36(i.qu),t.Y36(c.l),t.Y36(T.y),t.Y36(A.eN),t.Y36(f._W),t.Y36(t.sBO),t.Y36(I.t2),t.Y36(D.M))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-create-group"]],decls:27,vars:7,consts:[[1,"group-model"],[1,"flex","justify-end"],[1,"btn-close",3,"click"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 20 20","fill","currentColor",1,"w-5","h-5"],["fill-rule","evenodd","d","M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule","evenodd"],[2,"position","absolute","right","0","top","0"],["id","group-img",2,"position","relative","top","0","width","182px","text-align","center","right","0","height","162px","overflow","hidden"],[2,"background-color","#D99F3A","transform","rotate(41.3deg)","top","21%","width","300px","position","absolute","right","-50%","height","52px","font-weight","400","font-size","32px"],[1,"group-form",3,"formGroup"],["for","name"],["appTrim","","type","text","formControlName","name","maxlength","7"],["class","error-msg error",4,"ngIf"],["for","description",1,"floating-label"],["appTrim","","type","text","formControlName","description","maxlength","600"],[1,"icon","description-hide-icon"],[1,"primary-btn",3,"disabled","click"],[1,"error-msg","error"]],template:function(a,r){1&a&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"button",2),t.NdJ("click",function(){return r.close()}),t.O4$(),t.TgZ(3,"svg",3),t._UZ(4,"path",4),t.qZA(),t.qZA(),t.qZA(),t.kcU(),t.TgZ(5,"h1"),t.TgZ(6,"span"),t._uU(7,"Cre"),t.qZA(),t._uU(8,"ate Group"),t.qZA(),t.TgZ(9,"div",5),t.TgZ(10,"div",6),t.TgZ(11,"div",7),t._uU(12),t.qZA(),t.qZA(),t.qZA(),t.TgZ(13,"form",8),t.TgZ(14,"label",9),t._uU(15,"Name"),t.qZA(),t._UZ(16,"input",10),t.YNc(17,L,2,0,"p",11),t.YNc(18,y,2,1,"p",11),t.TgZ(19,"label",12),t._uU(20,"Description"),t.qZA(),t._UZ(21,"textarea",13),t._UZ(22,"span",14),t.YNc(23,G,2,0,"p",11),t.YNc(24,b,2,1,"p",11),t.TgZ(25,"button",15),t.NdJ("click",function(){return r.addGroup()}),t._uU(26," Add Group "),t.qZA(),t.qZA(),t.qZA()),2&a&&(t.xp6(12),t.hij(" ",r.groupForm.controls.name.value," "),t.xp6(1),t.Q6J("formGroup",r.groupForm),t.xp6(4),t.Q6J("ngIf",r.groupForm.controls.name.touched&&(null==r.groupForm.controls.name.errors?null:r.groupForm.controls.name.errors.required)),t.xp6(1),t.Q6J("ngIf",r.groupForm.controls.name.touched&&(null==r.groupForm.controls.name.errors?null:r.groupForm.controls.name.errors.minlength)),t.xp6(5),t.Q6J("ngIf",r.groupForm.controls.description.touched&&(null==r.groupForm.controls.description.errors?null:r.groupForm.controls.description.errors.required)),t.xp6(1),t.Q6J("ngIf",r.groupForm.controls.name.touched&&(null==r.groupForm.controls.description.errors?null:r.groupForm.controls.description.errors.minlength)),t.xp6(1),t.Q6J("disabled",!r.groupForm.valid))},directives:[i._Y,i.JL,i.sg,i.Fj,w.$,i.JJ,i.u,i.nD,M.O5],styles:[".create-group-dialog-overlay{height:auto;min-height:584px;max-width:580px!important}.group-model[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding-left:0;padding-right:0}@media (min-width: 640px){.group-model[_ngcontent-%COMP%]{padding-left:4rem;padding-right:4rem}}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]{position:absolute;top:0px;right:0px;z-index:10;margin:.875rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgba(255,255,255,var(--tw-bg-opacity));opacity:.5}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover{opacity:.7}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]{padding:1px}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{color:#132356}.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:1.5rem;object-fit:scale-down}@media (min-width: 640px){.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:1.5rem}}@media (min-width: 768px){.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:3rem}}.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:410px;height:90px}.group-model[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:1rem;margin-bottom:1rem;align-self:flex-start;font-size:1.875rem;line-height:2.25rem;font-weight:400}.group-model[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding-bottom:4px;border-bottom:2px solid #75F16D}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;width:100%;flex-direction:column}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{padding-top:1rem;padding-bottom:1rem;font-size:1.125rem;line-height:1.75rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{height:3.5rem;padding-left:1.25rem;padding-right:1.25rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{padding:1.25rem;height:156px}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding-left:.5rem;padding-right:.5rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:2rem;margin-bottom:2rem;height:2.75rem;width:10rem;align-self:center}"]}),n})(),S=(()=>{class n{static getCreateGroupComponent(){return E}}return n.\u0275fac=function(a){return new(a||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[M.ez,i.u5,i.UX,P.PW,O.n,f.Rh.forRoot({positionClass:"toast-top-right"})]]}),n})()}}]);