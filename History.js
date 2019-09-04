import layer from './History.html';

function App(){
	var dom=document.getElementsByTagName('body')[0];
	dom.innerHTML=layer;
}
App();

var prebutton=document.getElementsByClassName('pre')[0];

var nextbutton=document.getElementsByClassName('next')[0];

var month_change=document.getElementsByClassName('month_change')[0];

var year_change=document.getElementsByClassName('year_change')[0];

var title_date=document.getElementsByClassName('title_date')[0];
var events_all=document.getElementsByClassName('events_all')[0];

var  date_da=document.getElementsByClassName('date_da')[0];
var  date_fe=document.getElementsByClassName('date_fe')[0];
var  date_word_pre=document.getElementsByClassName('date_word_pre')[0];
var  date_word_img=document.getElementsByClassName('date_word_img')[0];
var  date_da=document.getElementsByClassName('date_da')[0];
var  date_word=document.getElementsByClassName('date_word')[0];

var objx;

var ynow;
var month_place1;
var month_text;
var cur_amount;
var pre_amount;

//计算闰年平年
function is_leap(year) {
	var res;
   return (year%100==0?res=(year%400==0?1:0):res=(year%4==0?1:0));
}

//将日历格子元素的number型z变为"0z"型
function string(i){
	var str_i;
	if(i<10){
	switch(i){
		case 1:str_i="01";break;
		case 2:str_i="02";break;
		case 3:str_i="03";break;
		case 4:str_i="04";break;
		case 5:str_i="05";break;
		case 6:str_i="06";break;
		case 7:str_i="07";break;
		case 8:str_i="08";break;
		case 9:str_i="09";break;
	}
	}
	else{
		str_i=i;
	}
	return str_i;
}

//ajax的url
function switch_month(){
	var url;
	switch(month_text){
	    case 1:month_place1="01";break;
		case 2:month_place1="02";break;
		case 3:month_place1="03";break;
		case 4:month_place1="04";break;
		case 5:month_place1="05";break;
		case 6:month_place1="06";break;
		case 7:month_place1="07";break;
		case 8:month_place1="08";break;
		case 9:month_place1="09";break;
		case 10:month_place1="10";break;
		case 11:month_place1="11";break;
		case 12:month_place1="12";break;
	};
	url="http://www.konghouy.cn:12357/message?month="+encodeURIComponent(month_place1);
	return url;
}

//制作日历格子
function callcalander(){
	var    my_day=[31,28+is_leap(ynow),31,30,31,30,31,31,30,31,30,31]; 
	var    Da=new Date(ynow,month_text-1,1);
    var    firstday=Da.getDay();
	if(firstday==0){
		firstday=7;
	}
	cur_amount=my_day[month_text-1];
	var    last=((cur_amount%7)+firstday-1)%7;
	if(month_text==1){
		pre_amount=31;
	}
	else{
		pre_amount=my_day[month_text-2];
	}
	var    line_date=Math.ceil((my_day[month_text-1]+ firstday-1)/7);
	var    box=document.getElementsByClassName("canlander-box")[0];
	var    str="";
	var    myClass,herClass,hisClass,his_class;
	
	if(line_date==6){
		myClass="class='cur line6'";
	    hisClass="class='tomonth line6'";
		herClass="class='thislast line6'";
		if(month_text==1){
			myClass="class='cur line6 disabled'";
		}
		else if(month_text==12){
			herClass="class='thislast line6 disabled'";
		}
	}
	else{
		myClass="class='cur line5'";
		hisClass="class='tomonth line5'";
		herClass="class='thislast line5'";
		if(month_text==1){
			myClass="class='cur line5 disabled'";
		}
		else if(month_text==12){
			herClass="class='thislast line5 disabled'";
		}
	}
	for(var  i=pre_amount-firstday+2;i<=pre_amount;i++){
		 str+="<li "+myClass+">"+i+"</li>";
	};
	for(var i=1;i<=cur_amount;i++){
		var  str_i=string(i);
		var  month_Day=month_place1+""+str_i;
		var  obj_x=objx[month_place1][month_Day].length;
		for(var k=0;k<obj_x;k++){
			var str_k=k+"";
			if(objx[month_place1][month_Day][str_k].cover==true){
				var src_xhr=objx[month_place1][month_Day][str_k].pic_calendar;
				var word_xhr=objx[month_place1][month_Day][str_k].title;
				var word_chinese=word_xhr.replace(/[^\u4e00-\u9fa5]/gi,"");  
				break;
			}
		}  
		his_class="src= "+src_xhr;
		str+="<li "+hisClass+"data-date= "+i+">"+"<img "+his_class+">"+"<div "+"class='img_day'"+">"+i+"</div>"+"<div "+"class='shadow'"+">"+word_chinese+"</div>"+"</li>";
	}
	if(last!=0)
	{
		for(var j=1;j<=7-last;j++){
			str+="<li "+herClass+">"+j+"</li>";
		}
	};
	box.innerHTML=str;
}    

//日历格子的cur元素
function curElement(){
	var    curDay=document.getElementsByClassName('cur');
    var    cur_length=curDay.length;
	for(var  i=0;i<cur_length;i++){
		 var div=document.createElement('div');
		 div.setAttribute("class","shadow_cur");
		 var  cur=document.getElementsByClassName('cur')[i];
		 cur.appendChild(div);
		 (function(i){
			 i=i+pre_amount-cur_length;
			 cur.onclick=function(){
				 prebutton.onclick(i);
			}
		 })(i)
	};
}

//日历格子的thislast元素
function  thislastElement(){
	var    thislastDay=document.getElementsByClassName('thislast');
    var    thislast_length=thislastDay.length;    
	for(var  i=0;i<thislast_length;i++){
		 var div=document.createElement('div');
		 div.setAttribute("class","shadow_thislast");
		 var  thislast=document.getElementsByClassName('thislast')[i];
		 thislast.appendChild(div);
		 (function(i){
			 thislast.onclick=function(){
				 nextbutton.onclick(i);
			 }
		 })(i)
	};
}

//改变a标签中的href
function a_change(){
		var a=document.getElementsByTagName('a');
		var a_length=a.length;
		var baidu="https://baike.baidu.com";
		for(var k=0;k<a_length;k++){
			if(a[k].href[7]=='1'){
				var  a_href=a[k].href.substring(21);
				a[k].href=baidu+a_href;
			}
		}
}

//改变img标签中的src
function img_change(){
	var img=document.getElementsByTagName('img');
	var img_length=img.length;
	var baidu="https://baike.baidu.com";
	for(var k=0;k<img_length;k++){
		if(img[k].src[7]=='1'&&img[k].src[22]!='m'){
			var  img_src=img[k].src.substring(21);
			img[k].src=baidu+img_src;
		}
	}
}

//针对于刚开始的日期，点击下一个，点击上一个，以及日历格子的tomonth元素的界面初始化
function begin(i){
	var   Day=document.getElementsByClassName('tomonth');
	var str_event="";
    i=i+1;
    var  str_i=string(i);
    var  month_Day=month_place1+""+str_i;
    var  obj_x=objx[month_place1][month_Day].length;
	for(var k=0;k<obj_x;k++){
		var str_k=k+"";
		var festival_xhr=objx[month_place1][month_Day][str_k].festival;
		var year_xhr=objx[month_place1][month_Day][str_k].year;
		var event_year;
		if(year_xhr[0]=='-'){
			var subStr=year_xhr.substring(1);
			var year_cur="公元前";
			year_xhr=year_cur+subStr;
			event_year="class='event_year character'";
		}
		else{
			event_year="class='event_year'";
		}
		var title_xhr=objx[month_place1][month_Day][str_k].title;
		var union_xhr=year_xhr+"年, "+title_xhr;
		var desc_xhr=objx[month_place1][month_Day][str_k].desc;
		var word_xhr=objx[month_place1][month_Day][str_k].pic_share;
		var link_xhr=objx[month_place1][month_Day][str_k].link;
		var type_xhr=objx[month_place1][month_Day][str_k].type;
		var a_xhr="href= "+link_xhr;
		if(type_xhr=='birth'){
			var	src_xhr="src= "+"js/draw2.jpg";
		}
		else if(type_xhr=='death'){
		    var src_xhr="src= "+"js/draw1.jpg";
		}
		else{
		    var src_xhr="src= "+"js/draw3.jpg";
		}
		str_event+="<dd>"+"<div "+event_year+">"+year_xhr+"<span "+"class='character'"+">"+"年"+"</span>"+"</div>"+
		            "<div "+"class='icon'"+">"+"<img "+"class='draw'"+src_xhr+">"+"</div>"+
		            "<div "+"class='event_world'"+">"+"<div "+"class='event-wrapper'"+">"+"<div "+"class='event_head'"+">"+title_xhr+"</div>"+"</div>"+"<div "+"class='event_story'"+">"+desc_xhr+"..."+"<a target='_blank' "+a_xhr+">"+"更多>>"+"</a>"+"</div>"+"</div>"+"</dd>";
		if(objx[month_place1][month_Day][str_k].cover){
				date_fe.innerText=festival_xhr;
				date_word_pre.innerHTML=union_xhr;
				date_word_img.src=word_xhr;
				date_word.innerText=desc_xhr;
				date_da.innerText=month_text+"月"+i+"日";
				title_date.innerText=month_text+"月"+i+"日";
			}
    }  
	events_all.innerHTML=str_event;
	a_change();
	img_change();
};

//日历格子点击tomonth元素时整个界面的更新
function addElement(){
	var   Day=document.getElementsByClassName('tomonth');
	for(var  i=0;i<cur_amount;i++)
	{  
	   var div=document.createElement('div');
	   div.setAttribute("class","shadow_one");
	   var  li=document.getElementsByClassName('tomonth')[i];
	   li.appendChild(div);
	   var tomonth=document.getElementsByClassName('shadow_one')[i];
	   (function(i){
		   tomonth.onclick=function(){
			    begin(i);
				for(var fk=0;fk<cur_amount;fk++){
					if(Day[fk].id=="on"){
						Day[fk].id="";
						break;
					}
				}
				Day[i].id="on";
		   };
	   })(i);
	}
}

////重要的三个函数
function inital_page(){
	var date=new Date();
	var daynow=date.getDate();
	month_change.innerText=date.getMonth()+1+"";
	month_text=parseInt(month_change.innerText);
	ynow=date.getFullYear();
	year_change.innerText=ynow+"";
    var url=switch_month();
	var xhr = new XMLHttpRequest();
    xhr.onreadystatechange =function(){
		if(xhr.readyState == 4&&xhr.status ==200){
			     objx=JSON.parse(xhr.responseText);
			     callcalander();
				 addElement();
				 var  Day=document.getElementsByClassName('tomonth');
				 Day[daynow-1].id="on";
				 begin(daynow-1);
				 curElement();
				 thislastElement();
		 }
    };
    xhr.open("GET", url, true);
    xhr.send(null);
};
inital_page();
	
	
prebutton.onclick=function(i){
	var flag=0;
	month_text--;
	if(month_text==0){
		month_text=1;
		flag=1;
	}
	else if(month_text==1){
		prebutton.className="pre disable";
	}
	else if(month_text==11){
		nextbutton.className="next";
	}
	else{
		prebutton.className="pre";
	}
	month_change.innerText=""+month_text;
	if(flag!=1){
	var url=switch_month();
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange =function(){
		if(xhr.readyState == 4&&xhr.status ==200){
			     objx=JSON.parse(xhr.responseText);
			     callcalander();
				 addElement();
				 var  Day=document.getElementsByClassName('tomonth');
				 if(typeof(i)=="number"){
					 Day[i].id="on";
					 begin(i);
				 }
				 else{
				      Day[0].id="on";
				      begin(0);
				 }
				 curElement();
				 thislastElement();
		 }
	};
	xhr.open("GET", url, true);
	xhr.send(null);
	}
};


nextbutton.onclick=function(i){
	var flag=0;
	month_text++;
	if(month_text==13){
		month_text=12;
		flag=1;
	}
	else if(month_text==12){
		nextbutton.className="next disable";
	}
	else if(month_text==2){
		prebutton.className="pre";
	}
	else{
		nextbutton.className="next";
	}
	month_change.innerText=""+month_text;
	if(flag!=1){
	var url=switch_month();
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange =function(){
		if(xhr.readyState == 4&&xhr.status==200){
			     objx=JSON.parse(xhr.responseText);
			     callcalander();
				 addElement();
				 var  Day=document.getElementsByClassName('tomonth');
				 if(typeof(i)=="number"){
					 Day[i].id="on";
					 begin(i);
				 }
				 else{
				 Day[0].id="on";
				 begin(0);
				 }
				 curElement();
				 thislastElement();
		 }
	};
	xhr.open("GET", url, true);
	xhr.send(null);
	}
}
