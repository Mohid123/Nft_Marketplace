"use strict";(self.webpackChunknft_panel=self.webpackChunknft_panel||[]).push([[776],{1659:(U,A,e)=>{e.d(A,{l:()=>t});var F=e(5094),n=e(4294),O=e(9922),u=e(2340),h=e(2352),E=e(7716),s=e(1841),p=e(9344);let t=(()=>{class l extends h.s{constructor(o,r){super(o),this.http=o,this.toastrService=r,this._totalCount$=new F.X(0),this.totalCount$=this._totalCount$.asObservable(),this._groups$=new F.X([]),this.groups$=this._groups$.asObservable(),this.limit=u.N.limit}getAllGroupsByClub(o,r,d){this.limit=d,this.get("/group/getAllGroupsByAppPackageId",{clubName:o,offset:r?(this.limit||u.N.limit)*r:0,limit:this.limit||u.N.limit}).pipe((0,n.q)(1),(0,O.b)(m=>{var C,f,_;m.hasErrors()?this.toastrService.error(null===(_=null===(f=null==m?void 0:m.errors[0])||void 0===f?void 0:f.error)||void 0===_?void 0:_.message):(this._totalCount$.next(m.data.totalCount),this._groups$.next(null===(C=m.data)||void 0===C?void 0:C.data))})).subscribe()}getUsersGroups(o,r,d,c){return this.limit=c,this.get("/group/getUsersGroupsByAppPackageId/"+r,{clubName:o,offset:d?(this.limit||u.N.limit)*d:0,limit:this.limit||u.N.limit}).pipe((0,n.q)(1),(0,O.b)(C=>{var f,_;C.hasErrors()&&this.toastrService.error(null===(_=null===(f=null==C?void 0:C.errors[0])||void 0===f?void 0:f.error)||void 0===_?void 0:_.message)}))}addGroups(o){return this.post("/group/addGroup",o).pipe((0,O.b)(r=>{var d,c;if(r.hasErrors())this.toastrService.error(null===(c=null===(d=null==r?void 0:r.errors[0])||void 0===d?void 0:d.error)||void 0===c?void 0:c.message);else if(this._totalCount$.next(r.data.totalCount),this._groups$.getValue().length<this.limit){const m=this._groups$.getValue();console.log("group:",m),console.log("result.data.data:",r.data.data),this._groups$.next([...m,...r.data.data])}}))}deleteGroups(o){return this.get(`/group/deleteGroupById/${o}`).pipe((0,n.q)(1),(0,O.b)(r=>{var d,c;r.hasErrors()&&this.toastrService.error(null===(c=null===(d=null==r?void 0:r.errors[0])||void 0===d?void 0:d.error)||void 0===c?void 0:c.message)}))}}return l.\u0275fac=function(o){return new(o||l)(E.LFG(s.eN),E.LFG(p._W))},l.\u0275prov=E.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()},6658:(U,A,e)=>{e.d(A,{y:()=>u});var F=e(2352),n=e(7716),O=e(1841);let u=(()=>{class h extends F.s{constructor(s){super(s),this.http=s,this.maxWidth=73,this.maxHeight=64}uploadMedia(s,p){return this.postMedia(`/media-upload/mediaFiles/${s}`,p)}convertToImg(s,p){return console.log("si:",s),console.log("fi:",p),new Promise(t=>{const l=document.createElement("canvas"),v=l.getContext("2d"),o=new Image;o.src=s,console.log("img:",o),o.onload=()=>{l.width=72,l.height=64,v.drawImage(o,0,0,o.width,o.height,0,0,72,64),t(this.dataURLtoFile(l.toDataURL(),p))}})}dataURLtoFile(s,p){const t=s.split(","),l=t[0].match(/:(.*?);/)[1],v=atob(t[1]);let o=v.length;const r=new Uint8Array(o);for(;o--;)r[o]=v.charCodeAt(o);return new File([r],p,{type:l})}compressImage(s){return new Promise((p,t)=>{const l=document.createElement("canvas"),v=l.getContext("2d"),o=new Image;o.src=URL.createObjectURL(s),o.onload=()=>{const r=this.calculateAspectRatioFit(null==o?void 0:o.width,null==o?void 0:o.height);l.width=r.width,l.height=r.height,v.drawImage(o,0,0,o.width,o.height,0,0,r.width,r.height),p(this.dataURLtoFile(l.toDataURL(),"thumbnail.jpg"))}})}calculateAspectRatioFit(s,p){const t=Math.min(this.maxWidth/s,this.maxHeight/p);return{width:s*t,height:p*t}}}return h.\u0275fac=function(s){return new(s||h)(n.LFG(O.eN))},h.\u0275prov=n.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"}),h})()},5776:(U,A,e)=>{e.r(A),e.d(A,{CreateGroupDialogModule:()=>D});var F=e(8583),n=e(3679),O=e(6237),u=e(9344),h=e(3291),E=e(1964),s=e(4294),p=e(7580),t=e(7716),l=e(7423),v=e(8879),o=e(1659),r=e(6658),d=e(1841);function c(a,x){1&a&&(t.TgZ(0,"p",16),t._uU(1,"please enter name"),t.qZA())}function m(a,x){if(1&a&&(t.TgZ(0,"p",16),t._uU(1),t.qZA()),2&a){const g=t.oxw();t.xp6(1),t.hij("name should be greater than or equal to ",null==g.groupForm.controls.name.errors?null:g.groupForm.controls.name.errors.minlength.requiredLength," character ")}}function C(a,x){1&a&&(t.TgZ(0,"p",16),t._uU(1,"please enter description"),t.qZA())}function f(a,x){if(1&a&&(t.TgZ(0,"p",16),t._uU(1),t.qZA()),2&a){const g=t.oxw();t.xp6(1),t.hij("description should be greater than or equal to ",null==g.groupForm.controls.description.errors?null:g.groupForm.controls.description.errors.minlength.requiredLength," character ")}}let _=(()=>{class a{constructor(g,i,M,P,I,Z,b,G){this.authService=g,this.customDialogService=i,this.formBuilder=M,this.groupService=P,this.mediaService=I,this.http=Z,this.toastr=b,this.cf=G,this.imgFormData=new FormData,this.groupForm=this.formBuilder.group({name:new n.NI("",[n.kI.required,n.kI.minLength(3),n.kI.maxLength(7)]),description:new n.NI("",[n.kI.required,n.kI.minLength(3),n.kI.maxLength(100)]),file:new n.NI("")})}addGroup(){const g=document.getElementById("group-img");h.YM(g,{canvasWidth:186,canvasHeight:162,width:186,height:162,quality:1,pixelRatio:1,skipAutoScale:!1}).then(i=>{this.groupForm.patchValue({file:this.mediaService.dataURLtoFile(i,this.groupForm.controls.name.value+".png")}),this.imgFormData.append("file",this.groupForm.get("file").value),this.mediaService.uploadMedia("group",this.imgFormData).pipe((0,s.q)(1),(0,p.z)(M=>{var P;if(M.hasErrors())return(0,E.of)(null);{const I={name:this.groupForm.controls.name.value,description:this.groupForm.controls.description.value,appPackageId:null===(P=this.authService.loggedInUser)||void 0===P?void 0:P.appPackageId,coverImageUrl:M.data.url};return this.groupService.addGroups(I)}})).subscribe(M=>{var P,I;null!==M?(this.cf.detectChanges(),this.close(),this.toastr.success("New group successfully added.","Success!")):this.toastr.warning(null===(I=null===(P=M.errors[0])||void 0===P?void 0:P.error)||void 0===I?void 0:I.message,"Error!")})}).catch(i=>{this.toastr.warning(i,"Error!")})}close(){this.customDialogService.closeDialogs()}}return a.\u0275fac=function(g){return new(g||a)(t.Y36(l.e),t.Y36(v.W),t.Y36(n.qu),t.Y36(o.l),t.Y36(r.y),t.Y36(d.eN),t.Y36(u._W),t.Y36(t.sBO))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-create-group"]],decls:27,vars:7,consts:[[1,"group-model"],[1,"flex","justify-end"],[1,"btn-close",3,"click"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 20 20","fill","currentColor",1,"w-5","h-5"],["fill-rule","evenodd","d","M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule","evenodd"],[2,"position","absolute","right","0","top","0"],["id","group-img",2,"position","relative","top","0","width","182px","text-align","center","right","0","height","162px","overflow","hidden"],[2,"background-color","#D99F3A","transform","rotate(41.3deg)","top","21%","width","300px","position","absolute","right","-50%","height","52px","font-weight","400","font-size","32px"],[1,"group-form",3,"formGroup"],["for","name"],["type","text","formControlName","name","maxlength","7"],["class","error-msg error",4,"ngIf"],["for","description",1,"floating-label"],["type","text","formControlName","description"],[1,"icon","description-hide-icon"],[1,"primary-btn",3,"disabled","click"],[1,"error-msg","error"]],template:function(g,i){1&g&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"button",2),t.NdJ("click",function(){return i.close()}),t.O4$(),t.TgZ(3,"svg",3),t._UZ(4,"path",4),t.qZA(),t.qZA(),t.qZA(),t.kcU(),t.TgZ(5,"h1"),t.TgZ(6,"span"),t._uU(7,"Cre"),t.qZA(),t._uU(8,"ate Group"),t.qZA(),t.TgZ(9,"div",5),t.TgZ(10,"div",6),t.TgZ(11,"div",7),t._uU(12),t.qZA(),t.qZA(),t.qZA(),t.TgZ(13,"form",8),t.TgZ(14,"label",9),t._uU(15,"Name"),t.qZA(),t._UZ(16,"input",10),t.YNc(17,c,2,0,"p",11),t.YNc(18,m,2,1,"p",11),t.TgZ(19,"label",12),t._uU(20,"Description"),t.qZA(),t._UZ(21,"textarea",13),t._UZ(22,"span",14),t.YNc(23,C,2,0,"p",11),t.YNc(24,f,2,1,"p",11),t.TgZ(25,"button",15),t.NdJ("click",function(){return i.addGroup()}),t._uU(26," Add Group "),t.qZA(),t.qZA(),t.qZA()),2&g&&(t.xp6(12),t.hij(" ",i.groupForm.controls.name.value," "),t.xp6(1),t.Q6J("formGroup",i.groupForm),t.xp6(4),t.Q6J("ngIf",i.groupForm.controls.name.touched&&(null==i.groupForm.controls.name.errors?null:i.groupForm.controls.name.errors.required)),t.xp6(1),t.Q6J("ngIf",i.groupForm.controls.name.touched&&(null==i.groupForm.controls.name.errors?null:i.groupForm.controls.name.errors.minlength)),t.xp6(5),t.Q6J("ngIf",i.groupForm.controls.description.touched&&(null==i.groupForm.controls.description.errors?null:i.groupForm.controls.description.errors.required)),t.xp6(1),t.Q6J("ngIf",i.groupForm.controls.name.touched&&(null==i.groupForm.controls.description.errors?null:i.groupForm.controls.description.errors.minlength)),t.xp6(1),t.Q6J("disabled",!i.groupForm.valid))},directives:[n._Y,n.JL,n.sg,n.Fj,n.JJ,n.u,n.nD,F.O5],styles:[".create-group-dialog-overlay{height:auto;min-height:584px;max-width:580px!important}.group-model[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding-left:0;padding-right:0}@media (min-width: 640px){.group-model[_ngcontent-%COMP%]{padding-left:4rem;padding-right:4rem}}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]{position:absolute;top:0px;right:0px;z-index:10;margin:.875rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgba(255,255,255,var(--tw-bg-opacity));opacity:.5}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover{opacity:.7}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]{padding:1px}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{color:#132356}.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:1.5rem;object-fit:scale-down}@media (min-width: 640px){.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:1.5rem}}@media (min-width: 768px){.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:3rem}}.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:410px;height:90px}.group-model[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:1rem;margin-bottom:1rem;align-self:flex-start;font-size:1.875rem;line-height:2.25rem;font-weight:400}.group-model[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding-bottom:4px;border-bottom:2px solid #75F16D}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;width:100%;flex-direction:column}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{padding-top:1rem;padding-bottom:1rem;font-size:1.125rem;line-height:1.75rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{height:3.5rem;padding-left:1.25rem;padding-right:1.25rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{padding:1.25rem;height:156px}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding-left:.5rem;padding-right:.5rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:2rem;margin-bottom:2rem;height:2.75rem;width:10rem;align-self:center}"]}),a})(),D=(()=>{class a{static getCreateGroupComponent(){return _}}return a.\u0275fac=function(g){return new(g||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[F.ez,n.u5,n.UX,O.PW,u.Rh.forRoot({positionClass:"toast-top-right"})]]}),a})()}}]);