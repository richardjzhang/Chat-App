(this.webpackJsonpchat=this.webpackJsonpchat||[]).push([[10],{106:function(e,t,a){"use strict";a.r(t);var n=a(39),c=a(63),o=a(49),i=a(40),r=a(1),s=a.n(r),h=a(19),l=a(42),u=a.p+"static/media/emoji.07c622fd.svg",b=a(41),d=i.a.div({padding:"".concat(4,"px ").concat(12,"px"),minHeight:36,maxHeight:90,width:"100%",display:"flex",alignItems:"center",transition:"height 0.25s ease",backgroundColor:b.b.athensGray,borderRadius:20}),g=i.a.textarea({maxHeight:"100%",width:"100%",outline:"none",padding:0,display:"block",resize:"none",border:"none",backgroundColor:b.b.athensGray,transition:"height 0.25s ease"}),p=i.a.img(Object(o.a)({height:20,width:20},b.c));t.default=function(e){var t=e.textAreaRef,a=e.placeholder,i=e.text,r=e.onChange,b=e.onKeyPress,f=e.onShowEmojiPicker,j=e.closeEmojiPicker,x=s.a.useState("auto"),m=Object(c.a)(x,2),k=m[0],O=m[1],v=s.a.useState("auto"),w=Object(c.a)(v,2),y=w[0],C=w[1];s.a.useEffect((function(){if(null!=t.current){var e=t.current.scrollHeight;""===i?(C("auto"),O("auto")):(C("".concat(e+8,"px")),O("".concat(e,"px")))}}),[t,i]);return Object(n.c)(d,{css:{height:y},children:[Object(n.b)(g,Object(o.a)({ref:t,placeholder:a,value:i,rows:1,style:{height:k},onChange:function(e){null!=t.current&&(C("".concat(t.current.scrollHeight,"px")),O("auto"),r(e.target.value))},onKeyPress:b},h.isMobile?{onFocus:j}:{})),Object(n.b)(l.a,{size:16}),Object(n.b)(p,{src:u,alt:"Emoji Icons",onClick:f})]})}}}]);
//# sourceMappingURL=10.837c520d.chunk.js.map