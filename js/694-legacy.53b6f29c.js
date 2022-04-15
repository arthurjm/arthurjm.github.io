"use strict";(self["webpackChunkarthurjm_github_io"]=self["webpackChunkarthurjm_github_io"]||[]).push([[694],{116:function(e,t,i){i.d(t,{Z:function(){return w}});var n=i(252),a=i(577),r=i(963);const s=e=>((0,n.dD)("data-v-6f1ad5eb"),e=e(),(0,n.Cn)(),e),o={id:"configuration",class:"box"},l=s((()=>(0,n._)("h2",null,"Configurer la partie",-1))),c={id:"parameters"},u=["for"],d=["id","onUpdate:modelValue"],m=["value"];function p(e,t,i,s,p,h){return(0,n.wg)(),(0,n.iD)("div",o,[l,(0,n._)("div",c,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(this.config,((t,i)=>((0,n.wg)(),(0,n.iD)("div",{key:i,class:"parameter"},[(0,n._)("label",{for:i},(0,a.zw)(t.name)+" :",9,u),(0,n.wy)((0,n._)("select",{id:i,"onUpdate:modelValue":t=>e.selected[i]=t},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.choices,((e,t)=>((0,n.wg)(),(0,n.iD)("option",{key:t,value:e},(0,a.zw)(e),9,m)))),128))],8,d),[[r.bM,e.selected[i]]])])))),128))]),(0,n._)("button",{onClick:t[0]||(t[0]=(...e)=>h.launchGame&&h.launchGame(...e)),class:"button"},"Valider")])}var h={name:"configure-component",props:["config"],emits:["launchGame"],data:function(){return{selected:{}}},mounted(){for(const e in this.config)this.selected[e]=this.config[e].choices[0]},methods:{launchGame(){this.$emit("launchGame",this.selected)}}},f=i(744);const g=(0,f.Z)(h,[["render",p],["__scopeId","data-v-6f1ad5eb"]]);var w=g},694:function(e,t,i){i.r(t),i.d(t,{default:function(){return U}});var n=i(252);const a=(0,n._)("h1",null,"Jeu de mémoire",-1);function r(e,t,i,r,s,o){const l=(0,n.up)("Configuration"),c=(0,n.up)("Game"),u=(0,n.up)("Scoreboard");return(0,n.wg)(),(0,n.iD)(n.HY,null,[a,e.isOngoing?((0,n.wg)(),(0,n.j4)(c,{key:1,params:e.params,onReset:o.resetGame},null,8,["params","onReset"])):((0,n.wg)(),(0,n.j4)(l,{key:0,onLaunchGame:o.launchGame,config:e.config},null,8,["onLaunchGame","config"])),e.isOngoing?(0,n.kq)("",!0):((0,n.wg)(),(0,n.j4)(u,{key:2}))],64)}var s=i(116),o=i(577);const l=e=>((0,n.dD)("data-v-39d3af32"),e=e(),(0,n.Cn)(),e),c={class:"game"},u={key:0,class:"success"},d={key:1},m=l((()=>(0,n._)("br",null,null,-1))),p={class:"board"},h=["w","h"],f={key:0},g={key:1};function w(e,t,i,a,r,s){const l=(0,n.up)("Timer");return(0,n.wg)(),(0,n.iD)("div",c,[s.isGameOver?((0,n.wg)(),(0,n.iD)("h2",u,"Victoire !")):((0,n.wg)(),(0,n.iD)("h2",d,"Partie en cours")),(0,n._)("span",null,"Nombre de coups : "+(0,o.zw)(e.actionsCount),1),m,(0,n.Wm)(l,{timerStop:s.isGameOver,onTimer:s.setTimer},null,8,["timerStop","onTimer"]),(0,n._)("table",p,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.board,((e,i)=>((0,n.wg)(),(0,n.iD)("tr",{key:i},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e,((e,a)=>((0,n.wg)(),(0,n.iD)("td",{key:a,class:"card",onClick:t[0]||(t[0]=(...e)=>s.flipCard&&s.flipCard(...e)),w:i,h:a},[e.display?((0,n.wg)(),(0,n.iD)("span",f,(0,o.zw)(e.emoji),1)):((0,n.wg)(),(0,n.iD)("span",g,"❓"))],8,h)))),128))])))),128))]),(0,n._)("button",{onClick:t[1]||(t[1]=(...e)=>s.resetGame&&s.resetGame(...e))},"Recommencer")])}function v(e,t,i,a,r,s){return(0,n.wg)(),(0,n.iD)("span",null,"Temps écoulé : "+(0,o.zw)(s.displayEllapsed),1)}function b(e){return`${e>9?e:"0"+e}`}function D(e){const t=e.getDate(),i=e.getMonth()+1,n=e.getFullYear(),a=e.getHours(),r=e.getMinutes();return`${t}/${i}/${n} - ${a}:${r}`}var y={name:"timer-component",props:["timerStop"],emits:["timer"],data:function(){return{intervalId:null,ellapsed:0}},created(){this.intervalId=setInterval((()=>{this.timerStop?clearInterval(this.intervalId):(this.ellapsed++,this.$emit("timer",this.ellapsed))}),1e3)},beforeUnmount(){clearInterval(this.intervalId)},computed:{displayEllapsed(){const e=Math.floor(this.ellapsed/60),t=this.ellapsed%60;return`${b(e)}:${b(t)}`}}},_=i(744);const k=(0,_.Z)(y,[["render",v]]);var G=k;const C={Facile:[5,4],"Intermédiaire":[6,5],Difficile:[7,6]},I=["🍇","🍈","🍉","🍊","🍋","🍌","🍍","🥭","🍎","🍏","🍐","🍑","🍒","🍓","🥝","🍅","🥥","🥑","🍆","🥔","🥕","🌽","🌶️","🥒","🥬","🥦","🧄","🧅","🍄","🥜","🌰","🍞","🥐","🥖","🧀","🍖","🍗","🥩","🥓","🍔","🍟","🍕","🌭","🥪","🌮","🌯","🧂","🍙","🍝","🍦","🍧","🍨","🍩","🍪","🎂","🍫","🍬","🍭","🥛","☕"];var S={name:"game-component",props:["params"],emits:["reset"],components:{Timer:G},data:function(){return{board:[],flipped:null,wait:!1,actionsCount:0,timer:0,pairFound:0,pairNb:0}},created(){const e=C[this.params.difficulty],t=e[0]*e[1]/2;this.pairNb=t;let i=this.shuffle(I).slice(0,t);i=this.shuffle(i.concat(i));for(let n=0;n<e[0];++n){this.board[n]=[];for(let t=0;t<e[1];++t)this.board[n][t]={emoji:i[n*(e[0]-1)+t],display:!1}}},computed:{isGameOver(){return this.pairFound===this.pairNb&&(this.onGameOver(),!0)}},methods:{shuffle(e){let t,i,n=e.length;while(n)i=Math.floor(Math.random()*n--),t=e[n],e[n]=e[i],e[i]=t;return e},flipCard(e){let t=this.board[e.currentTarget.getAttribute("w")][e.currentTarget.getAttribute("h")];!0===t.display||this.wait||(t.display=!0,this.flipped?(this.actionsCount++,this.flipped.emoji===t.emoji?(this.flipped=null,this.pairFound++):(this.wait=!0,setTimeout((()=>{t.display=!1,this.flipped.display=!1,this.flipped=null,this.wait=!1}),1e3))):this.flipped=t)},resetGame(){this.$emit("reset")},setTimer(e){this.timer=e},onGameOver(){this.setScore()},setScore(){let e=localStorage.getItem("memory-score"),t=e&&JSON.parse(e)||{};const i={time:this.timer,actions:this.actionsCount,date:Date()},n=this.params.difficulty;let a=t[n]||[];a.push(i),a.sort((function(e,t){return e.time===t.time?e.actions-t.actions:e.time-t.time})),t[n]=a.slice(0,10),localStorage.setItem("memory-score",JSON.stringify(t))}}};const O=(0,_.Z)(S,[["render",w],["__scopeId","data-v-39d3af32"]]);var T=O;const $=e=>((0,n.dD)("data-v-5e4ecba7"),e=e(),(0,n.Cn)(),e),N={id:"scoreboard"},j=$((()=>(0,n._)("h2",null,"Tableau de scores",-1))),z={key:0},H={key:1},Y=$((()=>(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"Temps (secondes)"),(0,n._)("th",null,"Nombre de coups"),(0,n._)("th",null,"Date")])],-1)));function F(e,t,i,a,r,s){return(0,n.wg)(),(0,n.iD)("div",N,[j,((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.difficultyNames,((t,i)=>((0,n.wg)(),(0,n.iD)("div",{key:i},[(0,n._)("h3",null,(0,o.zw)(t)+" :",1),e.score[i]?((0,n.wg)(),(0,n.iD)("table",H,[Y,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.score[i],((e,t)=>((0,n.wg)(),(0,n.iD)("tr",{key:t},[(0,n._)("td",null,(0,o.zw)(e.time),1),(0,n._)("td",null,(0,o.zw)(e.actions),1),(0,n._)("td",null,(0,o.zw)(s.formatDate(new Date(e.date))),1)])))),128))])])):((0,n.wg)(),(0,n.iD)("span",z,"Pas de score pour l'instant"))])))),128))])}const Z={1:"Facile",2:"Intermédiaire",3:"Difficile"};var K={name:"scoreboard-component",data:function(){return{score:{},difficultyNames:Z}},created(){const e=localStorage.getItem("memory-score");this.score=e&&JSON.parse(e)||{}},methods:{formatDate(e){return D(e)}}};const M=(0,_.Z)(K,[["render",F],["__scopeId","data-v-5e4ecba7"]]);var J=M,V={name:"memory-view",components:{Game:T,Configuration:s.Z,Scoreboard:J},data:function(){return{isOngoing:!1,config:{difficulty:{name:"Difficulté",choices:["Facile","Intermédiaire","Difficile"]}},params:{}}},methods:{launchGame(e){this.isOngoing=!0,this.params=e},resetGame(){this.isOngoing=!1}}};const R=(0,_.Z)(V,[["render",r]]);var U=R}}]);
//# sourceMappingURL=694-legacy.53b6f29c.js.map