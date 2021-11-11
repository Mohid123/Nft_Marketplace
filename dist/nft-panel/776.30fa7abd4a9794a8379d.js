"use strict";(self.webpackChunknft_panel=self.webpackChunknft_panel||[]).push([[776],{5776:(q,p,n)=>{n.r(p),n.d(p,{CreateGroupDialogModule:()=>N});var m=n(8583),r=n(3679),c=n(6237),u=n(9344),d=n(3291),h=n(6889),f=n(1964),C=n(2687),v=n(5755),M=n(4294),O=n(7580),o=n(7716),P=n(7423),x=n(8586),Z=n(1659),F=n(6658),b=n(1841),G=n(9866),T=n(9309);function y(e,s){1&e&&(o.TgZ(0,"p",16),o._uU(1,"please enter name"),o.qZA())}function A(e,s){if(1&e&&(o.TgZ(0,"p",16),o._uU(1),o.qZA()),2&e){const i=o.oxw();o.xp6(1),o.hij("name should be greater than or equal to ",null==i.groupForm.controls.name.errors?null:i.groupForm.controls.name.errors.minlength.requiredLength," character ")}}function U(e,s){1&e&&(o.TgZ(0,"p",16),o._uU(1,"please enter description"),o.qZA())}function I(e,s){if(1&e&&(o.TgZ(0,"p",16),o._uU(1),o.qZA()),2&e){const i=o.oxw();o.xp6(1),o.hij("description should be greater than or equal to ",null==i.groupForm.controls.description.errors?null:i.groupForm.controls.description.errors.minlength.requiredLength," character ")}}let w=(()=>{class e{constructor(i,t,a,g,l,S,Y,D,L,J){this.authService=i,this.customDialogService=t,this.formBuilder=a,this.groupService=g,this.mediaService=l,this.http=S,this.toastr=Y,this.cf=D,this.spinner=L,this.routeService=J,this.destroy$=new h.x,this.imgFormData=new FormData,this.groups$=this.groupService.groups$,this.limit=6,this.searchValu="",this.groupForm=this.formBuilder.group({name:new r.NI("",[r.kI.required,r.kI.minLength(3),r.kI.maxLength(7)]),description:new r.NI("",[r.kI.required,r.kI.minLength(3),r.kI.maxLength(100)]),file:new r.NI("")}),this.page=1,this._isLoading=!1,this.routeService.clubName$.pipe((0,C.x)(),(0,v.R)(this.destroy$)).subscribe(j=>{this.clubName=j,this.getGroup()})}getGroup(){this._isLoading||this.groupService.getAllGroupsByClub(this.clubName,this.page,this.limit,this.searchValu)}addGroup(){this.spinner.show("main");const i=document.getElementById("group-img");d.YM(i,{canvasWidth:186,canvasHeight:162,width:186,height:162,quality:1,pixelRatio:1,skipAutoScale:!1}).then(t=>{this.groupForm.patchValue({file:this.mediaService.dataURLtoFile(t,this.groupForm.controls.name.value+".png")}),this.imgFormData.append("file",this.groupForm.get("file").value),this.mediaService.uploadMedia("group",this.imgFormData).pipe((0,M.q)(1),(0,O.z)(a=>{var g;if(a.hasErrors())return(0,f.of)(null);{const l={name:this.groupForm.controls.name.value,description:this.groupForm.controls.description.value,appPackageId:null===(g=this.authService.loggedInUser)||void 0===g?void 0:g.appPackageId,coverImageUrl:a.data.url};return this.groupService.addGroups(l)}})).subscribe(a=>{var g,l;null!==a?(this.cf.detectChanges(),this.close(),this.toastr.success("New group successfully added.","Success!"),this.getGroup()):(this.toastr.warning(null===(l=null===(g=a.errors[0])||void 0===g?void 0:g.error)||void 0===l?void 0:l.message,"Error!"),this.spinner.hide("main"))})}).catch(t=>{this.toastr.warning(t,"Error!")})}close(){this.customDialogService.closeDialogs()}}return e.\u0275fac=function(i){return new(i||e)(o.Y36(P.e),o.Y36(x.W),o.Y36(r.qu),o.Y36(Z.l),o.Y36(F.y),o.Y36(b.eN),o.Y36(u._W),o.Y36(o.sBO),o.Y36(G.t2),o.Y36(T.M))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-create-group"]],decls:27,vars:7,consts:[[1,"group-model"],[1,"flex","justify-end"],[1,"btn-close",3,"click"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 20 20","fill","currentColor",1,"w-5","h-5"],["fill-rule","evenodd","d","M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule","evenodd"],[2,"position","absolute","right","0","top","0"],["id","group-img",2,"position","relative","top","0","width","182px","text-align","center","right","0","height","162px","overflow","hidden"],[2,"background-color","#D99F3A","transform","rotate(41.3deg)","top","21%","width","300px","position","absolute","right","-50%","height","52px","font-weight","400","font-size","32px"],[1,"group-form",3,"formGroup"],["for","name"],["type","text","formControlName","name","maxlength","7"],["class","error-msg error",4,"ngIf"],["for","description",1,"floating-label"],["type","text","formControlName","description"],[1,"icon","description-hide-icon"],[1,"primary-btn",3,"disabled","click"],[1,"error-msg","error"]],template:function(i,t){1&i&&(o.TgZ(0,"div",0),o.TgZ(1,"div",1),o.TgZ(2,"button",2),o.NdJ("click",function(){return t.close()}),o.O4$(),o.TgZ(3,"svg",3),o._UZ(4,"path",4),o.qZA(),o.qZA(),o.qZA(),o.kcU(),o.TgZ(5,"h1"),o.TgZ(6,"span"),o._uU(7,"Cre"),o.qZA(),o._uU(8,"ate Group"),o.qZA(),o.TgZ(9,"div",5),o.TgZ(10,"div",6),o.TgZ(11,"div",7),o._uU(12),o.qZA(),o.qZA(),o.qZA(),o.TgZ(13,"form",8),o.TgZ(14,"label",9),o._uU(15,"Name"),o.qZA(),o._UZ(16,"input",10),o.YNc(17,y,2,0,"p",11),o.YNc(18,A,2,1,"p",11),o.TgZ(19,"label",12),o._uU(20,"Description"),o.qZA(),o._UZ(21,"textarea",13),o._UZ(22,"span",14),o.YNc(23,U,2,0,"p",11),o.YNc(24,I,2,1,"p",11),o.TgZ(25,"button",15),o.NdJ("click",function(){return t.addGroup()}),o._uU(26," Add Group "),o.qZA(),o.qZA(),o.qZA()),2&i&&(o.xp6(12),o.hij(" ",t.groupForm.controls.name.value," "),o.xp6(1),o.Q6J("formGroup",t.groupForm),o.xp6(4),o.Q6J("ngIf",t.groupForm.controls.name.touched&&(null==t.groupForm.controls.name.errors?null:t.groupForm.controls.name.errors.required)),o.xp6(1),o.Q6J("ngIf",t.groupForm.controls.name.touched&&(null==t.groupForm.controls.name.errors?null:t.groupForm.controls.name.errors.minlength)),o.xp6(5),o.Q6J("ngIf",t.groupForm.controls.description.touched&&(null==t.groupForm.controls.description.errors?null:t.groupForm.controls.description.errors.required)),o.xp6(1),o.Q6J("ngIf",t.groupForm.controls.name.touched&&(null==t.groupForm.controls.description.errors?null:t.groupForm.controls.description.errors.minlength)),o.xp6(1),o.Q6J("disabled",!t.groupForm.valid))},directives:[r._Y,r.JL,r.sg,r.Fj,r.JJ,r.u,r.nD,m.O5],styles:[".create-group-dialog-overlay{height:auto;min-height:584px;max-width:580px!important}.group-model[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding-left:0;padding-right:0}@media (min-width: 640px){.group-model[_ngcontent-%COMP%]{padding-left:4rem;padding-right:4rem}}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]{position:absolute;top:0px;right:0px;z-index:10;margin:.875rem;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgba(255,255,255,var(--tw-bg-opacity));opacity:.5}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover{opacity:.7}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]{padding:1px}.group-model[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{color:#132356}.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:1.5rem;object-fit:scale-down}@media (min-width: 640px){.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:1.5rem}}@media (min-width: 768px){.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:3rem}}.group-model[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:410px;height:90px}.group-model[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:1rem;margin-bottom:1rem;align-self:flex-start;font-size:1.875rem;line-height:2.25rem;font-weight:400}.group-model[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding-bottom:4px;border-bottom:2px solid #75F16D}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;width:100%;flex-direction:column}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{padding-top:1rem;padding-bottom:1rem;font-size:1.125rem;line-height:1.75rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{height:3.5rem;padding-left:1.25rem;padding-right:1.25rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{padding:1.25rem;height:156px}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding-left:.5rem;padding-right:.5rem}.group-model[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:2rem;margin-bottom:2rem;height:2.75rem;width:10rem;align-self:center}"]}),e})(),N=(()=>{class e{static getCreateGroupComponent(){return w}}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[m.ez,r.u5,r.UX,c.PW,u.Rh.forRoot({positionClass:"toast-top-right"})]]}),e})()}}]);