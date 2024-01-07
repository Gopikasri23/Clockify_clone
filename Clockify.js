
let array = [];
document.addEventListener("DOMContentLoaded", () => {
        jsonRead();
})

async function jsonRead() {
    arr = await fetch('./data.json')
        .then((response) =>response.json())
        .then((json) => {
            let  projArr = json['projArr'];
            return projArr;
    });

    array=[...arr];
    autocomplete(proj_drop_ip,array);
   
}
    

    let tot_hrs=tot_min=tot_sec = 0;


    const body = document.getElementById('track');
    const div = document.createElement('div');
    const main = document.querySelector('main');
    
    div.style.display= 'flex';
    div.style.gap='30px';

    body.appendChild(div);

    const input = document.createElement('input');
    input.placeholder = 'What are you working on?';
    input.tabIndex = '0';
    input.autocomplete = 'off';
    input.setAttribute('class','cl-input');
    input.style.flexGrow='3';

    const Projanchor = document.createElement('a');
    const proj_span = document.createElement('span');
    const imgPlus = document.createElement('img');


    Projanchor.appendChild(imgPlus);
    Projanchor.appendChild(proj_span);

    Projanchor.setAttribute('class','cl-proj');
    imgPlus.src='plus-blue.svg';

    
    proj_span.textContent = 'Project';

    const timer_div = document.createElement('div');
    timer_div.setAttribute('class','cl-timer');
    timer_div.classList.add('cl-timer-pad');
    const startBtn = document.createElement('button');


    
    div.appendChild(input);
    div.appendChild(Projanchor);
    div.appendChild(timer_div);
    div.appendChild(startBtn);

    //anchor 
   
    Projanchor.href='#';
    //timer
    timer_div.style.display='flex';
    const timer_hrs = document.createElement('div');
    timer_hrs.textContent = '00';
    timer_div.appendChild(timer_hrs);

    const colon1 = document.createElement('div');
    colon1.textContent=':';
    timer_div.appendChild(colon1);

    const time_min = document.createElement('div');
    time_min.textContent='00';
    timer_div.appendChild(time_min);

    const colon2 = document.createElement('div');
    colon2.textContent=':';
    timer_div.appendChild(colon2);

    const time_sec = document.createElement('div');
    time_sec.textContent='00';
    timer_div.appendChild(time_sec);

    const task_list_div = document.createElement('div');
    task_list_div.setAttribute('class','cl-card');
    task_list_div.classList.add('cl-taskList');
    let today_hrs,today_min,today_sec;
    addHeader();

    
    //start
    startBtn.textContent='START';
    startBtn.setAttribute('class','cl-startBtn');

    let hrs=min=sec=0,startTimer;
    let phrs=pmin=psec=0;
    let  startTime_hrs,startTime_mins,endTime_hrs,endTime_mins;

    startBtn.addEventListener('click',()=>{
        tot_sec = total_time_sec.textContent;
        tot_min = total_time_min.textContent;
        tot_hrs = total_timer_hrs.textContent;
        if(startBtn.innerHTML ==='START'){

          startTime_hrs= new Date().getHours();
          startTime_mins = new Date().getMinutes();

          

            startTimer=setInterval(()=>{
                sec++;
                
                if(sec==60)
                {
                    min++;
                    sec=0;
                }
                if(min == 60)
                {
                    hrs++;
                    min = 0;
                }
                tot_sec++;
               
                if(tot_sec==60)
                {
                    tot_min++;
                    tot_sec=0;
                }
                if(tot_min == 60)
                {
                    tot_hrs++;
                    tot_min = 0;
                }
                timerAdd();
                timerAddhead();
                updateDisplay();
            },1000);

            startBtn.innerHTML = 'STOP';
            startBtn.classList.add('cl-stopbtn');
        }

        else
        {
            startBtn.classList.remove('cl-stopbtn');
            endTime_hrs= new Date().getHours();
            endTime_mins = new Date().getMinutes();
            taskadd();
            startBtn.innerHTML = 'START';
            clearInterval(startTimer);
            hrs=sec=min=0;
            updateDisplay();
            
           
        }
        function updateDisplay()
        { 
             phrs = hrs<10?'0'+hrs:hrs;
             pmin = min<10?'0'+min:min;
             psec = sec<10?'0'+sec:sec;

            time_sec.textContent=psec;
            time_min.textContent=pmin;
            timer_hrs.textContent=phrs;
            
        }
    })




    //suggestions when input is given in project input
    const proj_drop = document.createElement('div');
    proj_drop.classList.add('cl-drop-down');
    body.appendChild(proj_drop);
    proj_drop.style.display = 'none';

    const proj_drop_form = document.createElement('form');
    proj_drop_form.autocomplete = 'off';
    proj_drop.appendChild(proj_drop_form);
    proj_drop_form.classList.add('cl-proj-input-header')
    const proj_drop_div = document.createElement('div'); 
    proj_drop_form.appendChild(proj_drop_div);

    const proj_drop_ip = document.createElement('input');
    proj_drop_ip.placeholder = 'Find project or client...';
    proj_drop_ip.type = 'text';
    proj_drop_ip.classList.add('cl-form-control');
    proj_drop_div.appendChild(proj_drop_ip);
    
    proj_drop_div.setAttribute('class','autocomplete');
   
    const anch = document.querySelectorAll('a');
    anch.forEach(a =>{
        a.style.textDecoration = 'none';
    })

let projflag = false;

//autocompelte suggestions
function autocomplete(inp, arr) {
   //for no matching projects
    const no_match_div = document.createElement('div');
    no_match_div.classList.add('cl-drop-down-noMatch');
    proj_drop_ip.parentNode.appendChild(no_match_div);
    no_match_div.style.display = 'none';

    const no_match_divpar = document.createElement('p');
    
    no_match_divpar.textContent = 'No matching projects ';
    no_match_div.appendChild(no_match_divpar);
    no_match_divpar.style.fontSize = '14px';
    
    const ctr_enter = document.createElement('p');
    ctr_enter.textContent = 'Press Enter to quickly ';
    ctr_enter.style.color='#90989d';
    ctr_enter.style.fontSize = '11.9994px'
    no_match_div.appendChild(ctr_enter);

    const create_a = document.createElement('a');
    ctr_enter.appendChild(create_a);
    create_a.style.color = '#03A9F4'
    
    function noMatch(value){
      create_a.textContent = 'create '+ value + " project.";
      create_a.addEventListener('click',()=>{
        project_add(value);
      })
    }
    
   
    
   let currentFocus;
    
    inp.addEventListener("input", function(e) {
        let a, b, i, val = this.value;

        noMatch(val);
       
        closeAllLists();
        if (!val) {
          no_match_div.style.display = 'block';
        }
        currentFocus = -1;
        
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        
        this.parentNode.appendChild(a);
        
        let flag = false;
        
        
        for (i = 0; i < arr.length; i++) {
          
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            
            b = document.createElement("DIV");
           
            bi = document.createElement('i');
            bi.classList.add('cl-dot');

            b.appendChild(bi);
            b.classList.add('cl-dropdown-item','cl-font');
            b.style.color = 'red';
           
            ba = document.createElement('span');
            ba.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            ba.innerHTML += arr[i].substr(val.length);

            b.appendChild(ba);
           
            ba.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          
            b.addEventListener("click", function(e) {

                project_add(this.getElementsByTagName("input")[0].value);
              
                closeAllLists();
            });

            a.appendChild(b);
            flag = true;
          }
         

        }

       
        const create_proj = document.createElement('a');
        create_proj.classList.add('cl-dropdown-item','cl-createProj');
        
        
        const create_proj_plus = document.createElement('img');
        create_proj_plus.src='plus-blue.svg';

        const create_proj_span = document.createElement('span');
        create_proj_span.textContent = 'Create new project';
        create_proj.classList.add('cl-proj')

        
        create_proj.appendChild(create_proj_plus);
        create_proj.appendChild(create_proj_span);
        a.appendChild(create_proj);
        
        create_proj.setAttribute('id','createProj');
        const c = document.getElementById('createProj');
        pop_up(c);
          
        //if value is not matched with any project name
        if(!flag)
        {
          no_match_div.style.display = 'block';
        }
        else
        {
          no_match_div.style.display = 'none';

        }
       
    });


    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {

        if(no_match_div.style.display == 'block')
        {
          if(e.keyCode == 13)
          {
            //add project to list
            project_add(inp.value);
           
          }
        }
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        
        if (e.keyCode == 40) {
          //down key
          
          addActive(x);
        } else if (e.keyCode == 38) { //up
          //up key
          currentFocus--;
         
          addActive(x);
        } else if (e.keyCode == 13) {
          //enter key
          e.preventDefault();
          if (currentFocus > -1) {
          
            if (x) x[currentFocus].click();
          }
          
        }
    });
    function addActive(x) {
    
      if (!x) return false;
    
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);

      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
     
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      
      let x = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    
    
    const no_proj = document.createElement('a');
    no_proj.textContent = 'No projects';
    no_proj.href = '#';
    no_proj.style.color = 'black';
    no_proj.style.padding = '20px';
    proj_drop_ip.parentNode.appendChild(no_proj);
    no_proj.style.display = 'none';
    //project creation
    function project_add(projname){
      projflag = true;
      Projanchor.textContent = projname;
      if(!(array.includes(projname))) array.push(projname);
      
      no_proj.addEventListener('click',()=>{
          Projanchor.textContent = '';
          Projanchor.appendChild(imgPlus);
          Projanchor.appendChild(proj_span);

          Projanchor.setAttribute('class','cl-proj');
          imgPlus.src='plus-blue.svg';  
          no_proj.style.display = 'none';
          projflag = false;
      })
     
      no_proj.style.display = 'block';
      proj_drop.style.display = 'none';
      proj_drop_ip.value = '';
      noMatch("");
      no_match_div.style.display = 'none';

    }

    
}

//for create project
function ProjectAdd(projname){
  projflag = true;
  Projanchor.textContent = projname;
  if(!(array.includes(projname))) array.push(projname);

}


Projanchor.addEventListener('click',()=>{
  if(proj_drop.style.display == 'none')
  {
      proj_drop.style.display = 'block';   
  }
  else
  {
      proj_drop.style.display = 'none';
  }  
})





//Task list
const task_div = document.createElement('div');
main.appendChild(task_div);


const task_total = document.createElement('div');

const thisWeek = document.createElement('p');
thisWeek.textContent = 'This Week';
task_div.style.display='flex';
task_div.style.fontSize = '14px';
task_div.appendChild(thisWeek);


task_div.setAttribute('class','cl-taskdiv')
task_total.setAttribute('class','cl-week__total')

// task_total.style.display = 'flex';
task_div.appendChild(task_total);

const week_total = document.createElement('p');
week_total.style.display = 'flex';


week_total.textContent = 'Week total : '
week_total.setAttribute('class','text_format');
task_total.appendChild(week_total);


const total_timer_div = document.createElement('div');
total_timer_div.setAttribute('class','cl-timer');
week_total.appendChild(total_timer_div);
//total_time
  total_timer_div.style.display='flex';
  const total_timer_hrs = document.createElement('div');
  total_timer_hrs.textContent = '00';
  total_timer_div.appendChild(total_timer_hrs);

  const total_colon1 = document.createElement('div');
  total_colon1.textContent=':';
  total_timer_div.appendChild(total_colon1);

  const total_time_min = document.createElement('div');
  total_time_min.textContent='00';
  total_timer_div.appendChild(total_time_min);

  const total_colon2 = document.createElement('div');
  total_colon2.textContent=':';
  total_timer_div.appendChild(total_colon2);

  const total_time_sec = document.createElement('div');
  total_time_sec.textContent='00';
  total_timer_div.appendChild(total_time_sec);

  
let thrs,tmin,tsec;
function timerAdd()
{

  thrs = tot_hrs<10 && String(tot_hrs).length < 2?'0'+tot_hrs:tot_hrs;
  tmin = tot_min<10 && String(tot_min).length < 2?'0'+tot_min:tot_min;
  tsec = tot_sec<10 && String(tot_sec).length < 2?'0'+tot_sec:tot_sec;

  total_time_sec.textContent=tsec;
  total_time_min.textContent=tmin;
  total_timer_hrs.textContent=thrs;
 
}


main.appendChild(task_list_div);


function addHeader()
{
  
  const task_div = document.createElement('div');
  task_list_div.classList.add('cl-card-header');
  task_list_div.appendChild(task_div);
  task_div.style.paddingTop = '0';
  task_div.style.paddingLeft='1.4286rem'

  const task_total = document.createElement('div');

  const thisWeek = document.createElement('p');
  thisWeek.textContent = 'Today';
  task_div.style.display='flex';
  thisWeek.classList.add('text_format');
  task_div.appendChild(thisWeek);

  task_div.setAttribute('class','cl-taskdiv')
  task_total.setAttribute('class','cl-week__total')

  // task_total.style.display = 'flex';
  task_div.appendChild(task_total);

  const week_total = document.createElement('p');
  week_total.style.display = 'flex';


  week_total.textContent = 'Week total : '
  week_total.setAttribute('class','text_format');
  task_total.appendChild(week_total);


  const total_timer_div = document.createElement('div');
  total_timer_div.setAttribute('class','cl-timer');
  week_total.appendChild(total_timer_div);
//total_time
  
  total_timer_div.style.display='flex';
  today_hrs= document.createElement('div');
  today_hrs.textContent = '00';
  total_timer_div.appendChild(today_hrs);

  const total_colon1 = document.createElement('div');
  total_colon1.textContent=':';
  total_timer_div.appendChild(total_colon1);

  today_min = document.createElement('div');
  today_min.textContent='00';
  total_timer_div.appendChild(today_min);

  const total_colon2 = document.createElement('div');
  total_colon2.textContent=':';
  total_timer_div.appendChild(total_colon2);

   today_sec = document.createElement('div');
  today_sec.textContent='00';
  total_timer_div.appendChild(today_sec);

}

function  timerAddhead()
{
  today_sec.textContent=tsec;
  today_min.textContent=tmin;
  today_hrs.textContent=thrs;
}

function taskadd()
{
  const elementBox = document.createElement('div');
  elementBox.setAttribute('class','cl-element');
  task_list_div.appendChild(elementBox);

  const task_element = document.createElement('div');
  elementBox.appendChild(task_element);
  task_element.classList.add('cl-flex-container')
 
  task_element.style.gap='30px';

  const des = document.createElement('input');
  des.classList.add('cl-input');
  des.style.width = '200px';
  task_element.appendChild(des);
  des.placeholder = 'Add description';
  des.value= input.value;


  const proj = document.createElement('a');
  proj.style.flexGrow = '3';
  const proj_span = document.createElement('span');
  task_element.appendChild(proj);
  if(projflag)
  {
    const i = document.createElement('i');
    i.classList.add('cl-dot')
    proj.appendChild(i);
    proj.appendChild(proj_span);
    proj_span.textContent = Projanchor.innerHTML;
    proj_span.style.color = 'red';
    
  }
  else
  { 
    const imgPlus = document.createElement('img');

    proj.appendChild(imgPlus);
    proj.appendChild(proj_span);

    proj.setAttribute('class','cl-proj');
    imgPlus.src='plus-blue.svg';
    
    proj_span.textContent = 'Project';

  }

  const startTime = document.createElement('input');

  
  task_element.appendChild(startTime);
  

  startTime_hrs = startTime_hrs<10?'0'+startTime_hrs:startTime_hrs;
  startTime_mins = startTime_mins <10?'0'+startTime_mins :startTime_mins ;
  startTime.value = startTime_hrs + " : " + startTime_mins;
  startTime.classList.add('cl-start-end');
 
  const endTime = document.createElement('input');
 
  task_element.appendChild(endTime);
  endTime_hrs = endTime_hrs<10?'0'+endTime_hrs:endTime_hrs;
  endTime_mins = endTime_mins <10?'0'+endTime_mins :endTime_mins ;
  endTime.value = endTime_hrs + " : " + endTime_mins;
  endTime.classList.add('cl-start-end');
 

  const ele_div = document.createElement('div');
  ele_div.style.display='flex';
  task_element.appendChild(ele_div);

  const ele_hrs = document.createElement('div');
  ele_hrs.textContent = phrs;
  ele_div.appendChild(ele_hrs);

  const ele_colon1 = document.createElement('div');
  ele_colon1.textContent=':';
  ele_div.appendChild(ele_colon1);

  const ele_min = document.createElement('div');
  ele_min.textContent= pmin;
  ele_div.appendChild(ele_min);

  const ele_colon2 = document.createElement('div');
  ele_colon2.textContent=':';
  ele_div.appendChild(ele_colon2);

  const ele_sec = document.createElement('div');
  ele_sec.textContent= psec;
  ele_div.appendChild(ele_sec);

  timerChange(startTime,endTime,ele_hrs,ele_min,ele_sec,start=true);
  timerChange(endTime,startTime,ele_hrs,ele_min,ele_sec,start=false);


}




function pop_up(c){

  c.addEventListener('click',()=>
  {
    

    const body = document.querySelector('body');
    const popDiv = document.createElement('div');
    body.appendChild(popDiv);
    popDiv.classList.add('cl-popDiv');
    
    const box = document.createElement('div');
    popDiv.appendChild(box);
    box.classList.add('popupBox');

    const head = document.createElement('div');
    box.appendChild(head);
    const h1 = document.createElement('h1');
    head.appendChild(h1);
    head.classList.add('cl-modal-header');
    h1.textContent = 'Create new project';
    h1.classList.add('cl-h1');

    const close = document.createElement('button');
    head.appendChild(close);
    close.classList.add('cl-close');
    const cross = document.createElement('img');
    close.appendChild(cross);
    cross.src = 'close.svg';

    const inp = document.createElement('input');
    box.appendChild(inp);
    inp.type = 'text';
    inp.classList.add('cl-form-control');
    inp.placeholder = 'Enter project name';
    inp.style.marginTop = '10px';
    inp.style.marginLeft = '10px';

    const foot = document.createElement('div');
    box.appendChild(foot)
    foot.classList.add('cl-modal-footer');

    const cancel = document.createElement('a');
    foot.appendChild(cancel);
    cancel.style.color = '#03a9f4';
    cancel.textContent = "Cancel";

    const createbut = document.createElement('button');
    foot.appendChild(createbut);
    createbut.classList.add('cl-startBtn');
    createbut.textContent = 'CREATE';
    createbut.style.marginLeft ='1.4286rem';

    createbut.addEventListener('click',()=>{
      ProjectAdd(inp.value);
      popDiv.style.display = 'none';
      return;
    })

    cancel.addEventListener('click',()=>{
      popDiv.style.display = 'none';
      return;
    })

    close.addEventListener('click',()=>{
      popDiv.style.display = 'none';
      return;
    })
  }
)}

let typingTimeout;
function timerChange(inp,inp2,ele_hrs,ele_min,ele_sec,start)
{

  
  let orginal = inp.value;


  inp.addEventListener('input',()=>{

    clearTimeout(typingTimeout);

    // Set a new timeout
    typingTimeout = setTimeout(function() {
    
      let val = inp.value;
      if(val.length > 4 || !(Number.isInteger(Number(val))) )
      {
        inp.value = orginal;
        return;
      }

      let len = val.length,hour,min;
      if(len == 4)
      {
        hour = val[0]+val[1];
        min = val[2]+val[3];
      }
      else if(len == 3)
      {
        hour = val[0];
        min = val[1]+val[2];
      }
      else if(len == 2)
      {
        hour = val[0];
        min = val[1];
      }
      else
      {
        hour = val[0];
        min = '0';
      }

      if(hour > 24)
      {
        inp.value = orginal;
        return;
      }
      
      
      inp.value = setTiming(hour,min);


    let iTime,eTime;
    if(start)
    {
      iTime = inp.value;
      eTime = inp2.value;
    }
    else
    {
      iTime = inp2.value;
      eTime = inp.value;
    }
     UpdateTotal(ele_hrs,ele_min,ele_sec,total_timer_hrs,total_time_min,total_time_sec);
    
     Total_time_cal(iTime,eTime,ele_hrs,ele_min,ele_sec);
     UpdateTotalAdd(ele_hrs,ele_min,ele_sec,total_timer_hrs,total_time_min,total_time_sec);
    }, 2000); 

    
  })
}

function setTiming(hour,min)
{
  let res_hr , res_min;
  hour  = Number(hour);
  min = Number(min);
  if(hour == 24)
  {
    res_hr = 0;
    res_min = 0;
  }
  else if(min > 59)
  {
    res_min = min - 60;
    res_hr = Number(hour) + 1;
    if(res_hr == 24) res_hr = 0;
  }
  else
  {
    res_min = min;
    res_hr = hour;
  }
 
  let rhrs = res_hr < 10 ? '0'+res_hr:res_hr;
  let rmin = res_min < 10 ? '0'+res_min:res_min;
  let ans = rhrs + ' : ' + rmin;
  return ans;
}

function Total_time_cal(start,end,ele_hrs,ele_min,ele_sec)
{
  let totalHrs,totalMin;
  if(start[0]+start[1] < end[0]+end[1])
  {
    let s_total = min_calc(start);
    let e_total = min_calc(end);

    let diff = e_total - s_total;

   totalHrs= (diff/60).toString().split(".")[0];
   totalMin= diff%60;
  }
  else
  {
    let st = 1440 - (Number(start[0]+start[1])*60 + Number(start[5]+start[6]));
    let diff = st + (Number(end[0]+end[1])*60 + Number(end[5]+end[6]));
    totalHrs = (diff/60).toString().split(".")[0];
    totalMin= diff%60;
  }

  totalHrs = totalHrs<10?'0'+totalHrs:totalHrs;
  totalMin = totalMin<10?'0'+totalMin:totalMin;
  ele_hrs.textContent = totalHrs;
  ele_min.textContent = totalMin;
}

function min_calc(time)
{
   let hr = time[0]+time[1];
   hr = Number(hr);
   let min = time[5]+time[6];
   min = Number(min);

   let total = hr * 60 + min;

   return total;

}

function UpdateTotal(ele_hrs,ele_min,ele_sec,totHrs,totMin,totSec)
{
  let eleTotalSec = (Number(ele_hrs.textContent))*3600 + (Number(ele_min.textContent))*60 +  (Number(ele_sec.textContent));
  let weekTotalSec = (Number(totHrs.textContent))*3600 + (Number(totMin.textContent))*60 +  (Number(totSec.textContent));
  let diff = weekTotalSec - eleTotalSec;

  
  h = (diff/3600).toString().split(".")[0];
  diff -= Number(h)*3600;
  m = (diff/60).toString().split(".")[0];
  diff -= Number(m)*60;
  s = diff;
  
  totHrs.textContent = h<10?'0'+h:h;
  totMin.textContent = m<10?'0'+m:m;
  totSec.textContent = s<10?'0'+s:s;


  today_hrs.textContent = totHrs.textContent;
  today_min.textContent = totMin.textContent;
  today_sec.textContent = totSec.textContent;

}

function UpdateTotalAdd(ele_hrs,ele_min,ele_sec,totHrs,totMin,totSec)
{
  let eleTotalSec = (Number(ele_hrs.textContent))*3600 + (Number(ele_min.textContent))*60 +  (Number(ele_sec.textContent));
  let weekTotalSec = (Number(totHrs.textContent))*3600 + (Number(totMin.textContent))*60 +  (Number(totSec.textContent));
  let diff = weekTotalSec + eleTotalSec;
   h = (diff/3600).toString().split(".")[0];

  diff -= Number(h)*3600;
  m = (diff/60).toString().split(".")[0];
  diff -= Number(m)*60;
  s = diff;
  
  totHrs.textContent = h<10?'0'+h:h;
  totMin.textContent = m<10?'0'+m:m;
  totSec.textContent = s<10?'0'+s:s;

  today_hrs.textContent = totHrs.textContent;
  today_min.textContent = totMin.textContent;
  today_sec.textContent = totSec.textContent;
}

const toggle = document.getElementById('tog');
let toggleFlag = true;
toggle.addEventListener('click',()=>{
  const as = document.querySelector('aside');
  const tt = document.getElementById('timetrack');
  const side = document.getElementById('side');
  if(toggleFlag)
  {
    as.classList.add('aside-width');
    tt.style.display = 'none';
    side.style.width = '69px';
    toggleFlag = false;
  }
  else
  {
    toggleFlag = true;
    tt.style.display = 'block';
    as.classList.remove('aside-width');
    side.style.width = '';
  }
  
});