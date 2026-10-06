(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){l.fillStyle=`#000000`,l.fillRect(0,0,c.width,c.height)}function t(e,t,n,r,i){l.beginPath(),i?(l.fillStyle=`hsl(${r},100%,0%)`,l.arc(e,t,n+2,0,2*Math.PI)):(l.fillStyle=T==`black_and_white`?`hsl(${r},100%,100%)`:`hsl(${r},100%,50%)`,l.arc(e,t,n,0,2*Math.PI)),l.fill(),l.closePath()}function n(e){let t=0,n=0;if(S==`circle`&&(t=Math.cos(e),n=Math.sin(e)),S==`infinity`)t=1*Math.cos(e)/(1+Math.sin(e)*Math.sin(e)),n=Math.sin(e)*Math.cos(e)/(1+Math.sin(e)*Math.sin(e));else if(S==`lissajous`)t=1*Math.sin(7*e),n=1*Math.cos(5*e);else if(S==`hypotrochoid`){let r=.125,i=.5;t=.875*Math.cos(e)+i*Math.cos(.875/r*e),n=.875*Math.sin(e)-i*Math.sin(.875/r*e)}else if(S==`epicycloid`){let r=.125;t=1.125*Math.cos(e)-r*Math.cos(1.125/r*e),n=1.125*Math.sin(e)-r*Math.sin(1.125/r*e)}else if(S==`butterfly`){let r=2.71828**Math.cos(e)-2*Math.cos(4*e)-Math.sin(e/12)**5;t=Math.sin(e)*r,n=Math.cos(e)*r,n-=.5,t*=.4,n*=.4,n*=-1}else S==`cloverleaf`&&(t=Math.cos(4*e)*Math.cos(e),n=Math.cos(4*e)*Math.sin(e));return t*=m,t+=c.width/2,n*=m,n+=c.height/2,[t,n]}function r(){C&&e(),y?(h-=g,h<0&&(h+=360)):(h+=g,h>360&&(h-=360)),v?(u-=S==`lissajous`?p/2:p,u<0&&(u+=2*Math.PI)):(u+=S==`lissajous`?p/2:p,u>2*Math.PI&&(u-=2*Math.PI)),l.lineWidth=0;for(let e=0;e<_;e++){let r=255;T==`standard`?r=(h+360*e/_)%360:T==`same_color`?r=h:T==`no_change`&&(r=360*e/_%360),r=Math.round(r);let i=n(u+2*Math.PI*e/_);d=i[0],f=i[1],t(d,f,20,r,e%2&&w)}}function i(){e();let t=10*Math.ceil(2*Math.PI/p);console.log(t),u=v?2*Math.PI:0;for(let e=0;e<t;e++)r()}function a(){S==`circle`?document.getElementById(`written_formula`).innerHTML=`
            <p>x=cos(t)</p>
            <p>y=sin(t)</p>
        `:S==`butterfly`?document.getElementById(`written_formula`).innerHTML=`
            <p>x=sin(t)*(e^cos(t)-2cos(4t)-sin^5(t/12))</p>
            <p>y=cos(t)*(e^cos(t)-2cos(4t)-sin^5(t/12))</p>
        `:S==`hypotrochoid`?document.getElementById(`written_formula`).innerHTML=`
            <p>x=(R-r)*cos(t)+d*cos((R-r)/r*t)</p>
            <p>y=(R-r)*sin(t)+d*sin((R-r)/r*t)</p>
            <p>R is the outer radius. r is the inner radius. D is how far the points are from the center circle.</p>
        `:S==`epicycloid`?document.getElementById(`written_formula`).innerHTML=`
            <p>x=(R-r)*cos(t)-r*cos((R-r)/r*t)</p>
            <p>y=(R-r)*sin(t)-r*sin((R-r)/r*t)</p>
            <p>R is the fixed circle radius. r is the radius of the moving circle.</p>
        `:S==`cloverleaf`?document.getElementById(`written_formula`).innerHTML=`
            <p>x=cos(k*t)*cos(t)</p>
            <p>y=cos(k*t)*sin(t)</p>
            <p>k is the number of petals</p>
        `:S==`lissajous`?document.getElementById(`written_formula`).innerHTML=`
            <p>x=A*sin(a*t+C)</p>
            <p>y=B*cos(b*t)</p>
        `:S==`infinity`&&(document.getElementById(`written_formula`).innerHTML=`
            <p>x=cos(t)/(1+sin^2(t))</p>
            <p>y=(sin(t)*cos(t))/(1+sin^2(t))</p>
        `)}function o(){x?(x=!1,b=setInterval(r,33),document.getElementById(`toggle_button`).innerHTML=`PAUSE`):(x=!0,clearInterval(b),document.getElementById(`toggle_button`).innerHTML=`RESUME`)}function s(){v=document.getElementById(`move_reverse`).checked,y=document.getElementById(`hue_reverse`).checked,C=document.getElementById(`clearing_every_frame`).checked,w=document.getElementById(`using_erase_circles`).checked,T=document.getElementById(`color_mode`).value,_=parseInt(document.getElementById(`total_points`).value),console.log(T),S=document.getElementById(`draw_function`).value,console.log(S),a(),i()}var c=document.getElementById(`my_canvas`),l=c.getContext(`2d`),u=0,d=0,f=0,p=.01;p*=Math.PI/3;var m=.4*c.width,h=270,g=p*360/(2*Math.PI),_=20,v=!0,y=!0,b=null,x=!1,S=`butterfly`,C=!0,w=!1,T=`standard`;i(),s(),b=setInterval(r,1e3/30),document.getElementById(`toggle_button`).onchange=o;var E=document.getElementsByTagName(`input`);for(let e of E)e.onchange=s;var D=document.getElementsByTagName(`select`);for(let e of D)e.onchange=s;