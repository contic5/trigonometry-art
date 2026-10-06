function clear()
{
    ctx.fillStyle="#000000";
    ctx.fillRect(0,0,c.width,c.height); 
}
function draw_circle(x,y,radius,inner_hue,erase_circle)
{
    ctx.beginPath();
    if(erase_circle)
    {
        ctx.fillStyle=`hsl(${inner_hue},100%,0%)`;
        ctx.arc(x,y,radius+2,0,2*Math.PI);
    }
    else
    {
        if(color_mode=="black_and_white")
        {
            ctx.fillStyle=`hsl(${inner_hue},100%,100%)`;
        }
        else
        {
            ctx.fillStyle=`hsl(${inner_hue},100%,50%)`;
        }
        ctx.arc(x,y,radius,0,2*Math.PI);
    }
    ctx.fill();
    ctx.closePath();
}
function get_point(t)
{
    let x=0;
    let y=0;
    /*
    Position is based on time
    https://en.wikipedia.org/wiki/Lemniscate_of_Bernoulli
    x=a*cos(t)/(1+sin^2(t))
    y=a*(sin(t)*cos(t))/(1+sin^2(t))
    */
    
    if(draw_function=="circle")
    {
        x=Math.cos(t);
        y=Math.sin(t);
    }
    if(draw_function=="infinity")
    {
        x=(1*Math.cos(t))/(1+Math.sin(t)*Math.sin(t));
        y=(Math.sin(t)*Math.cos(t))/(1+Math.sin(t)*Math.sin(t));
    }
    else if(draw_function=="lissajous")
    {
        x=1*Math.sin(7*t);
        y=1*Math.cos(5*t);
    }
    else if(draw_function=="hypotrochoid")
    {
        //Accidental Six Flags Logo
        let R=1;
        let r=0.125;
        let d=0.5;
        x=(R-r)*Math.cos(t)+d*Math.cos((R-r)/r*t);
        y=(R-r)*Math.sin(t)-d*Math.sin((R-r)/r*t);
    }
    else if(draw_function=="epicycloid")
    {
        let R=1;
        let r=0.125;
        x=(R+r)*Math.cos(t)-r*Math.cos((R+r)/r*t);
        y=(R+r)*Math.sin(t)-r*Math.sin((R+r)/r*t);
    }
    else if(draw_function=="butterfly")
    {
        let e=2.71828;
        let inner=Math.pow(e,Math.cos(t))-2*Math.cos(4*t)-Math.pow(Math.sin(t/12),5);
        x=Math.sin(t)*inner;
        y=Math.cos(t)*inner;
        y-=0.5;
        x*=0.4;
        y*=0.4;
        
        //This extra flip puts the wings on top
        y*=-1;
    }
    else if(draw_function=="cloverleaf")
    {
        let k=4;
        x=Math.cos(k*t)*Math.cos(t);
        y=Math.cos(k*t)*Math.sin(t);
    }
    x*=scale;
    x+=c.width/2;

    y*=scale;
    y+=c.height/2;
    return [x,y];
}
function draw()
{
    if(clearing_every_frame)
    {
        clear();
    }

    //Change Hue
    if(hue_reverse)
    {
        hue-=hue_speed;
        if(hue<0)
        {
            hue+=360;
        }
    }
    else
    {
        hue+=hue_speed;
        if(hue>360)
        {
            hue-=360;
        }
    }

    //Change Time
    if(move_reverse)
    {
        if(draw_function=="lissajous")
        {
            t-=move_speed/2;
        }
        else
        {
            t-=move_speed;
        }
        if(t<0)
        {
            t+=2*Math.PI;
        }
    }
    else
    {
        if(draw_function=="lissajous")
        {
            t+=move_speed/2;
        }
        else
        {
            t+=move_speed;
        }
        if(t>2*Math.PI)
        {
            t-=2*Math.PI;
        }
    }

    ctx.lineWidth=0;
    for(let i=0;i<total_points;i++)
    {
        let shifted_hue=255;
        if(color_mode=="standard")
        {
            shifted_hue=(hue+(360*i)/total_points)%360;
        }
        else if(color_mode=="same_color")
        {
            shifted_hue=hue;
        }
        else if(color_mode=="no_change")
        {
            shifted_hue=((360*i)/total_points)%360;
        }
        shifted_hue=Math.round(shifted_hue);

        let shifted_t=t+2*Math.PI*i/total_points;
        
        //console.log(t+" "+shifted_hue);
        let point=get_point(shifted_t);
        x=point[0];
        y=point[1];
        //draw objects
        draw_circle(x,y,20,shifted_hue,i%2&&using_erase_circles);
    }
}
function handle_initial_drawing()
{
    clear();
    let required_moves=10*Math.ceil(2*Math.PI/move_speed);
    console.log(required_moves);
    if(move_reverse)
    {
        t=2*Math.PI;
    }
    else
    {
        t=0;
    }
    
    for(let i=0;i<required_moves;i++)
    {
        draw();
    }
}
function write_written_formula()
{
    if(draw_function=="circle")
    {
        document.getElementById("written_formula").innerHTML=`
            <p>x=cos(t)</p>
            <p>y=sin(t)</p>
        `;
    }
    else if(draw_function=="butterfly")
    {
        document.getElementById("written_formula").innerHTML=`
            <p>x=sin(t)*(e^cos(t)-2cos(4t)-sin^5(t/12))</p>
            <p>y=cos(t)*(e^cos(t)-2cos(4t)-sin^5(t/12))</p>
        `;
    }
    else if(draw_function=="hypotrochoid")
    {
        document.getElementById("written_formula").innerHTML=`
            <p>x=(R-r)*cos(t)+d*cos((R-r)/r*t)</p>
            <p>y=(R-r)*sin(t)+d*sin((R-r)/r*t)</p>
            <p>R is the outer radius. r is the inner radius. D is how far the points are from the center circle.</p>
        `;
    }
    else if(draw_function=="epicycloid")
    {
        document.getElementById("written_formula").innerHTML=`
            <p>x=(R-r)*cos(t)-r*cos((R-r)/r*t)</p>
            <p>y=(R-r)*sin(t)-r*sin((R-r)/r*t)</p>
            <p>R is the fixed circle radius. r is the radius of the moving circle.</p>
        `;
    }
    else if(draw_function=="cloverleaf")
    {
        document.getElementById("written_formula").innerHTML=`
            <p>x=cos(k*t)*cos(t)</p>
            <p>y=cos(k*t)*sin(t)</p>
            <p>k is the number of petals</p>
        `;
    }
    else if(draw_function=="lissajous")
    {
        document.getElementById("written_formula").innerHTML=`
            <p>x=A*sin(a*t+C)</p>
            <p>y=B*cos(b*t)</p>
        `;
    }
    else if(draw_function=="infinity")
    {
        document.getElementById("written_formula").innerHTML=`
            <p>x=cos(t)/(1+sin^2(t))</p>
            <p>y=(sin(t)*cos(t))/(1+sin^2(t))</p>
        `;
    }
}
export function toggle_interval()
{
    if(paused)
    {
        paused=false;
        my_interval=setInterval(draw,33);
        document.getElementById("toggle_button").innerHTML="PAUSE";
    }
    else
    {
        paused=true;
        clearInterval(my_interval);
        document.getElementById("toggle_button").innerHTML="RESUME";

    }
}
export function update_values()
{
    move_reverse=document.getElementById("move_reverse").checked;
    hue_reverse=document.getElementById("hue_reverse").checked;
    clearing_every_frame=document.getElementById("clearing_every_frame").checked;
    using_erase_circles=document.getElementById("using_erase_circles").checked;
    color_mode=document.getElementById("color_mode").value;
    total_points=parseInt(document.getElementById("total_points").value);
    console.log(color_mode);
    
    draw_function=document.getElementById("draw_function").value;
    console.log(draw_function);
    write_written_formula();
    handle_initial_drawing();
}
let c=document.getElementById("my_canvas");
let ctx=c.getContext("2d");

let t=0;
let x=0;
let y=0;
let move_speed=0.01;
move_speed*=Math.PI/3;

let scale=0.4*c.width;
let hue=270;
let hue_speed=move_speed*360/(2*Math.PI);

let total_points=20;

let move_reverse=true;
let hue_reverse=true;

let my_interval=null;
let paused=false;
let draw_function="butterfly";

let clearing_every_frame=true;
let using_erase_circles=false;


/*standard,same_color,no_change,black_and_white*/
let color_mode="standard";

handle_initial_drawing();
update_values();
my_interval=setInterval(draw,1000/30);