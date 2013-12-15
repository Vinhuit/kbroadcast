// JS Chronometer by emanueleferonato.com

var timercount = 0;
var timestart  = null;

function showtimer() {
	if(timercount) {
		clearTimeout(timercount);
		clockID = 0;
	}
	if(!timestart){
		timestart = new Date();
	}
	var timeend = new Date();
	var timedifference = timeend.getTime() - timestart.getTime();
	timeend.setTime(timedifference);
	var minutes_passed = timeend.getMinutes();
	if(minutes_passed < 10){
		minutes_passed = "0" + minutes_passed;
	}
	var seconds_passed = timeend.getSeconds();
	if(seconds_passed < 10){
		seconds_passed = "0" + seconds_passed;
	}
	document.timeform.timetextarea.value = minutes_passed + ":" + seconds_passed;
	timercount = setTimeout("showtimer()", 1000);
}

function sw_start(){
	if(!timercount){
	timestart   = new Date();
	document.timeform.timetextarea.value = "00:00";
	document.timeform.laptime.value = "";
	timercount  = setTimeout("showtimer()", 1000);
	}
	else{
	var timeend = new Date();
		var timedifference = timeend.getTime() - timestart.getTime();
		timeend.setTime(timedifference);
		var minutes_passed = timeend.getMinutes();
		if(minutes_passed < 10){
			minutes_passed = "0" + minutes_passed;
		}
		var seconds_passed = timeend.getSeconds();
		if(seconds_passed < 10){
			seconds_passed = "0" + seconds_passed;
		}
		var milliseconds_passed = timeend.getMilliseconds();
		if(milliseconds_passed < 10){
			milliseconds_passed = "00" + milliseconds_passed;
		}
		else if(milliseconds_passed < 100){
			milliseconds_passed = "0" + milliseconds_passed;
		}
		document.timeform.laptime.value = minutes_passed + ":" + seconds_passed + "." + milliseconds_passed;
	}
}

function Stop() {
	if(timercount) {
		clearTimeout(timercount);
		timercount  = 0;
		var timeend = new Date();
		var timedifference = timeend.getTime() - timestart.getTime();
		timeend.setTime(timedifference);
		var minutes_passed = timeend.getMinutes();
		if(minutes_passed < 10){
			minutes_passed = "0" + minutes_passed;
		}
		var seconds_passed = timeend.getSeconds();
		if(seconds_passed < 10){
			seconds_passed = "0" + seconds_passed;
		}
		var milliseconds_passed = timeend.getMilliseconds();
		if(milliseconds_passed < 10){
			milliseconds_passed = "00" + milliseconds_passed;
		}
		else if(milliseconds_passed < 100){
			milliseconds_passed = "0" + milliseconds_passed;
		}
		document.timeform.timetextarea.value = minutes_passed + ":" + seconds_passed + "." + milliseconds_passed;
	}
	timestart = null;
}

function Reset() {
	timestart = null;
	document.timeform.timetextarea.value = "00:00";
	document.timeform.laptime.value = "";
}


$(function() {
$( "input[type=submit], button" )
.button()
.click(function( event ) {
event.preventDefault();
});
});


$(function() {
$( "#record" ).button().click(function() {
if ( $("#record").text() === "Registra" ) {
$.ajax({
  type: "GET",
  url: "/control/record/start?app=myapp&name=stream&rec=rec1",
  dataType: "script",
  success: function() {
	$("#record").text('Stop');
	sw_start();   
    //alert("success");
 //   console.log();
  },
  error: function() {
 //   alert("error");
    $("#record").css("background-color","red").text('Stop');   
  }
});
};
if ( $("#record").text() === "Stop" ) {
$.ajax({
  type: "GET",
  url: "/control/record/stop?app=myapp&name=stream&rec=rec1",
  dataType: "script",
  success: function() {
	$("#record").text('Registra');
	Stop();
	Reset();  
    //alert("success");
 //   console.log();
  },
  error: function() {
 //   alert("error");
    $("#record").css("background-color","white").text('Registra');   
  }
});
};
}
);

return false;
});

// Stream Button
$( "#stream" ).button({
label:"Stream",
text:true //,
// icons: {
// primary: "ui-icon-stop"
// }
}).click(function() {
$( "#stream" ).button( "option", {
label: "Stream",
text:true //,
// icons: {
// primary: "ui-icon-bullet"
// }
}).addClass("red");
});


$( "#timer" ).button({
text:true,
label: "00:00:00",
icons:{
primary: "ui-icon-clock"
}}).attr("disabled",false).addClass("ui-state-highlight");


$( "#aggiorna" ).button({
text:true,
label: "Aggiorna",
icons:{
primary: "ui-icon-refresh"
}}).click(function(){
$.ajax({
  type: "GET",
  url: "update-rec.php",
  dataType: "html",
  success: function(data) {
	$("#listfile").html(data); //.hide("fold", { horizFirst: false }, 100).show("fold", {}, 100);
	}});
});

 $("#filem").scroll();
 
$("#sysm").scroll();

// Start capture card not used
// $("#av_status").button().click(function(){
//	$("#av_status").val("stop capture");	
//	});


// Tabs

$(function(){
var activeTab = null;
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  activeTab = $(e.target).attr('href');
//  console.log($(e.target).attr('href'));
   console.log(activeTab);

if(activeTab == '#Tab3'){
// setInterval(function(){
$.ajax({
  type: "GET",
  url: "update-rec.php?media=rec",
  dataType: "html",
  success: function(data) {
	$("#listfile").html(data);  
 //	alert(resultlist);
  //	console.log(data)
	}});
// },3000);
};

$('#refresh').button().click(function(){
$.ajax({
  type: "GET",
  url: "update-rec.php?media=rec",
  dataType: "html",
  success: function(data) {
	$("#listfile").html(data);
	$('#refresh').button('reset');  
	}});
})
})
});

$(function(){
$.ajax({
 type: "GET",
  url: "capture.php",
 dataType: "html",
// contentType: "application/json; charset=utf-8",
//  data: data,
  success: function(data) {
  	if (data === "stopped") {
  		$.ajax({
 				type: "GET",
  				url: "capture.php?encoder=avstart",
 				dataType: "html",
 				success: function(data) {
				$("#av_status").val("Starting...");}});}
		//	else
		//	{  $("#str_status").addClass("").css("background-color","red").val("Attivo");  };
	//jwplayer().play();   
    //alert("success");
//	console.log(data);
  },
  error: function() {
 //   alert("error");
    $("#av_status").addClass("").css("background-color","red").val("Off"); 
    console.log();  
  		}
	});	
});


setInterval(function(){
$.ajax({
 type: "GET",
  url: "capture.php",
 dataType: "html",
// contentType: "application/json; charset=utf-8",
//  data: data,
  success: function(data) {
  	if (data === "stopped") {
	$("#av_status").text("Stopped");
	$("#pbar").addClass("progress-bar-danger").removeClass("progress-bar-success");	
	}
	else
	{  $("#av_status").text("Cattura: 1920x108050i 25fps 3500kbps");
		$("#pbar").addClass("progress-bar-success").removeClass("progress-bar-danger");	
	}
	//jwplayer().play();   
    //alert("success");
//	console.log(data);
  },
  error: function() {
 //   alert("error");
    $("#av_status").addClass("").css("background-color","red").val("Off"); 
//    console.log();  
  }
});
},3000);



$(function(){
$.ajax({
  type: "GET",
  url: "network.php",
  dataType: "json",
  success: function(data) {
	 $.each(data, function(i,item){
	 	$.each(item,function(name, value){
		//	console.log(name + ":"+ value);
			$("#"+ i + name ).val(value);
	//		$("#"+ i ).attr({name: i[0] ).val(item);	 		
	 		})
  });  
	}});
});

setInterval(function(){
$.ajax({
  type: "GET",
  url: "network.php?network=ping",
  dataType: "json",
  success: function(data) {
//	console.log(data);	
	if (data === 'online'){
	$("#nonetwork").removeClass("panel-danger").addClass("panel-success");
	$(".connected").html(" Online").removeClass("text-danger").addClass("text-success");
		
		} 
		else {
	$("#nonetwork").removeClass("panel-success").addClass("panel-danger");	
	$(".connected").html(" Offline").removeClass("text-success").addClass("text-danger");
			
			}

	}});
},10000);

$(function(){
$.ajax({
  type: "GET",
  url: "network.php?network=ping",
  dataType: "json",
  success: function(data) {
//	console.log(data);	
	if (data === 'online'){
	$("#nonetwork").removeClass("panel-danger").addClass("panel-success");	
	$(".connected").html(" Online").removeClass("text-danger").addClass("text-success");
			
		} 
		else {
 	$("#nonetwork").removeClass("panel-success").addClass("panel-danger");			
	$(".connected").html(" Offline").removeClass("text-success").addClass("text-danger");
		
			}
	}});		
	});

$(function(){
$.ajax({
  type: "GET",
  url: "network.php?network=nettype",
  dataType: "json",
  success: function(data) {
//	console.log(data);	
	if (data === 'dhcp'){
		$('.dhcp').prop("checked", true);
		$('#p5p1 :input').prop("disabled", true);
		} 
	if (data === 'static'){
		$('.manual').prop("checked", true);
		$('#p5p1 :input').prop("disabled", false);	
			}
	}});		
	});

	$(document).ready(function() {
			$('form').attr("autocomplete", "off"); 	
		//	$("#test").after("<input type='text' name='test2' value='Test 2' />"); 
		}); 

// $("#demo").collapse()

$(function(){						
$('#dhcp').click(function () {
//	console.log("help");

    $('.p5p1 :input').prop("disabled", true);
//    $('#dhcp').html('Manuale');
})});					

$(function(){						
$('#manuale').click(function () {
//	console.log("help");

    $('.p5p1 :input').prop("disabled", false);
//    $('#dhcp').html('Manuale');
})});

// Video Audio bitrate selection

$(function(){
$('.videob .btn').on('click', function() {
    // whenever a button is clicked, set the hidden helper
    console.log($(this).val());
    $("#video_bitrate").val($(this).val());
}); 
});

$(function(){
$('.audiob .btn').on('click', function() {
    // whenever a button is clicked, set the hidden helper
    console.log($(this).val());
    $("#audio_bitrate").val($(this).val());
}); 
});


$(function(){
$('.res').on('click', function() {
    // whenever a button is clicked, set the hidden helper
    console.log($(this).val());
    var res = $(this).text();
    var  resxy = res.split('x');
    $("#resx").val(resxy[0]);
    $("#resy").val(resxy[1]);
    
}); 
});


$(function(){
$('#stream').on('click', function() {
    // whenever a button is clicked, set the hidden helper
   // console.log($(this).val());
    var resx = $("#resx").val();
    var  resy = $("#resy").val();
    var  audio_b = $("#audio_bitrate").val();
    var  video_b = $("#video_bitrate").val();
    $("#st_info").text( resx + "x" + resy + " V: " + video_b + "Kbps A: " + audio_b + "Kbps" );
	console.log(resx + "x" + resy + " V: " + video_b + "Kbps A: " + audio_b + "Kbps" );
}); 
});
 
