jQuery( document ).ready(function() {

	var optsState = false;
	
	jQuery("#release-link").click(function(){
		jQuery('.modal').modal('hide');
	});
	
	jQuery(function(){
		jQuery(document).on('keyup', function(e){
			if(!jQuery('input[type=text]').is(":focus")){
				if (e.which == 107 || e.which == 187 && e.shiftKey) {
					jQuery('#file-modal').modal('show');
				}
				if (e.which == 82 && e.altKey) {
				}
			}
		});
	});

	jQuery(document).on("keyup", "body.modal-open", function(e) { 
		 if (e.which == 13) {
			jQuery('.in').find('.modal-footer').find('.btn-primary').click();
		}
	});
	
	jQuery('#optionToggle').click(function(){
		var icon = jQuery(this);
		if(optsState == true){
			icon.addClass('fa-eye-slash').removeClass('fa-eye');
		}else{
			icon.removeClass('fa-eye-slash').addClass('fa-eye');
		}
		jQuery('.mask').each(function(){
			var me = jQuery(this);
			if(optsState == true){
				if(me.hasClass('active')){
					me.trigger('mousedown');
				}
			}else{
				if(!me.hasClass('active')){
					me.trigger('mousedown');
				}
			}
		});
		optsState = !optsState;
	});
	
	jQuery('.custom-toggle').bootstrapToggle();

	jQuery(".modal").on('shown.bs.modal', function() {
		jQuery(this).find('input, textarea, select').filter(':visible:first').focus();
	}).on('show.bs.modal', function(){
		jQuery("#menu").removeClass("active");
	});
	
	jQuery(".menu-link").click(function(){
		jQuery("#menu").toggleClass("active");
	});

	jQuery(document).click(function(event) {
		if(!$(event.target).closest('#menu, .menu-link').length) {
			jQuery("#menu").removeClass("active");
		}
	})

	jQuery(window).on('resize', function(){
		jQuery("#menu").removeClass("active");
	});
	
	jQuery('html').on('click', function(e) {
		if (!jQuery('body').hasClass('modal-open')){
			jQuery('[data-original-title]').popover('hide');
		}
	});
	
	jQuery('#autosave').bootstrapToggle(localStorage.getItem("autosave_value"));
	jQuery('#minimalhead').bootstrapToggle(localStorage.getItem("minimalhead_value"));

	jQuery('#hide-file-opts').bootstrapToggle(localStorage.getItem("hide-file-opts_value"));
	
	TaskTooling.setAutoSave(jQuery('#autosave').prop('checked'));
	TaskTooling.setminimalhead(jQuery('#minimalhead').prop('checked'));
	TaskTooling.setfileOpts(jQuery('#hide-file-opts').prop('checked'));
	
	if(jQuery('#hide-file-opts').prop('checked') == false){
		//jQuery('#optionToggle').addClass('hide-me');
		optsState = true;
	}
	
	jQuery('#autosave').change(function() {
		var state =  jQuery(this).prop('checked');
		localStorage.setItem("autosave_value", state ? "on" : "off");
		TaskTooling.setAutoSave(jQuery(this).prop('checked'));
    });

	jQuery('#minimalhead').change(function() {
		var state =  jQuery(this).prop('checked');
		localStorage.setItem("minimalhead_value", state ? "on" : "off");
		TaskTooling.setminimalhead(jQuery(this).prop('checked'));
    });    
	
	jQuery('#hide-file-opts').change(function() {
		var state =  jQuery(this).prop('checked');
		localStorage.setItem("hide-file-opts_value", state ? "on" : "off");
		TaskTooling.setfileOpts(jQuery(this).prop('checked'));
		//jQuery('#optionToggle').toggleClass('hide-me').click();
		jQuery('.mask').each(function(){
			var me = jQuery(this);
			if(optsState == true){
				if(me.hasClass('active')){
					me.trigger('mousedown');
				}
			}else{
				if(!me.hasClass('active')){
					me.trigger('mousedown');
				}
			}
		});
		optsState = !optsState;
    });
	
	if(localStorage.getItem('show_features') === null){
		jQuery('.desk-clock:visible').popover({
		   'placement':'auto left',
		   'content':'Lost? Start here!'
		}).popover('show');
		
		localStorage.setItem('show_features', false);
	}

	/**
	* Remove a Tab
	*/
	$('#pageTab').on('click', ' li a .close', function() {
	var tabId = $(this).parents('li').children('a').attr('href');
	$(this).parents('li').remove('li');
	$(tabId).remove();
	$('#pageTab a:first').tab('show');
	});


});

jQuery(document).on("mousedown touchstart", ".mask", function(){

	var menu = jQuery(this);
	menu.toggleClass("active");

	if (menu.hasClass('active')){
		menu.siblings('.menu-item1').css({'transform':'translate(15px,-50px)'}).siblings('.menu-item2').css({'transform': 'translate(16px,-96px)'}).siblings('.menu-item3').css({'transform': 'translate(0px,-140px)'}).siblings('.menu-item4').css({'transform': 'translate(-32px,-174px)'});
	}else{
		menu.siblings().css({'transform': 'none'});
	}
});

var turnOffButtonAdd=0;


var xmlFiles = new Array(); 

var TaskTooling = (function () {
	var files = [ ];
	var pub = { };
	var curr = null;
	var begun = false;
	var autoSave = true;
	var minimalhead = true;
	var hideOpts = true;
	var loadData;
	var getDumpData;
	var doAutoSave;
	var getfileNum;
	var fileZero;
	var setupDragDrop;
	var currDrag;
	var addSubItem;
	var itemDrop;
	var autoSaveInterval = 1000 * 60 * 3; // 3 minutes

	pub.add = function (split, subitems) {
		var t = { };
		var v;
		var nameInp;
		var hourInp;
		var minuteInp;
		var startMs = 0;
		var i;
		var fatag;

		// elements
		nameInp = document.getElementById('file_name');

	};

	pub.load = function (refresh) {
		var saved = localStorage.saved;

		if (!saved && !refresh) {
			bootbox.dialog({
				message: 'No data has been saved, click the save button to store your current data.',
				title: 'No Data Saved',
				onEscape: function() {return;},
				backdrop: true,
				buttons: {
					main: {
						label: "OK",
						className: "btn-primary",
						callback: function() {
							return;
						}
					}
				}
			});
			return;
		}else if(!saved && refresh){
            return;
        }

		loadData(saved);
	};

	pub.save = function () {
		localStorage.saved = getDumpData();
		console.log('Data saved.');
	};

	loadData = function () {
		var i = 0;
		var j = 0;
		var file_line;
		var times;
		var h, m, s;

	};

	pub.clear = function () {
		var i;

		bootbox.dialog({
			message: 'Are you sure you want to close <strong>ALL</strong> tabs?',
			title: "Close <strong>ALL</strong> tabs",
			onEscape: function() {return;},
			backdrop: true,
			buttons: {
				danger: {
					label: "No",
					className: "btn-danger",
					callback: function() {
						return;
					}
				},
				main: {
					label: "Yes",
					className: "btn-primary",
					callback: function() {
						$('[id^="closebutton_"]').trigger("click");
						$( "#home" ).addClass("active");
						$( "#home" ).addClass("in");
				        $(".btn-group-left").css("display","none");
					}
				}
			}
		});

		update(true);
	};
	
	pub.setAutoSave = function (s) {
		autoSave = s;
	};

	pub.setminimalhead = function (s) {
		minimalhead = s;
	}
	
	pub.setfileOpts = function (e) {
		hideOpts = e;
	};

	doAutoSave = function () {
		if (autoSave && files.length > 0) {
			pub.save();
		}
	};

	getfileNum = function (s) {
		var m = s.match(/^\d+/);
		if (m) {
			return m[0];
		}
	};

	loadPersonalCommon = function () {
		var pc = localStorage.personalCommon;
		var i;
		var li;
		var span;
		var ul;
		var rmbtn;

		ul = $('#personal');
		ul.empty();

		if (pc) {
			personalCommon = JSON.parse(pc);
		} else {
			personalCommon = [ ];
		}

		if (personalCommon && personalCommon.length > 0) {
			for (i=0; i < personalCommon.length; i++) {
				li = document.createElement('li');
				span = document.createElement('span');
				span.appendChild(document.createTextNode(personalCommon[i]));
				li.appendChild(span);
				rmbtn = document.createElement('i');
				rmbtn.className = 'rm fa fa-ban';
				li.appendChild(rmbtn);
				ul.append(li);
			}
		}
	};

	commonPlus = function () {
		var box = bootbox.dialog({
		message: '<p>Add file number. </p><input id="add-file" class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text">',
		title: "Add file",
		onEscape: function() {return;},
		backdrop: true,
		buttons: {
			danger: {
				label: "Close",
				className: "btn-danger",
				callback: function() {
					return;
				}
			},
			main: {
				label: "OK",
				className: "btn-primary",
				callback: function() {
					var result = jQuery('#add-file').val();
					if (result != '') {
						personalCommon.push(result);
						localStorage.personalCommon = JSON.stringify(personalCommon);
						loadPersonalCommon();
					}
				}
			}
		}
		});
	};

	getDumpData = function () {
		var t;
		var txt;
		var a = [ ];
		var i;
		var j;

		if (curr) {
			update();
		}

		return a.join('\n');
	};


	rmPersonalCommon = function (filename) {
		var i;

		for (i=0; i < personalCommon.length; i++) {
			if (personalCommon[i] === filename) {
				personalCommon.splice(i, 1);
				localStorage.personalCommon = JSON.stringify(personalCommon);
				return;
			}
		}
	}	

	commonPlus = function () {
		var box = bootbox.dialog({
		message: '<p>Add XML File. </p><input id="add-file" class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text">',
		title: "Add file",
		onEscape: function() {return;},
		backdrop: true,
		buttons: {
			danger: {
				label: "Close",
				className: "btn-danger",
				callback: function() {
					return;
				}
			},
			main: {
				label: "OK",
				className: "btn-primary",
				callback: function() {
					var result = jQuery('#add-file').val();
					if (result != '') {
						personalCommon.push(result);
						localStorage.personalCommon = JSON.stringify(personalCommon);
						loadPersonalCommon();
					}
				}
			}
		}
		});
	};

	update = function (force) {
		var now;
		var total;
		var h;
		var m;
		var s;
		var m2;
		var tdiv;
		var i;
		var grandTotal = 0;
		var t;

		if (curr) {
		}
	};


	$(document).ready(function () {
		window.setInterval(doAutoSave, autoSaveInterval);
		TaskTooling.load(true);

		$('#files').on('click', 'li', function () {
			$('#file_name').val(jQuery(this).text());
			pub.add(false);
		});

		$('#commonplus').on('click', function () {
			commonPlus();
		});

		$('#personal').on('click', 'li span', function () {
			$('#file_name').val(jQuery(this).text());
			pub.add(false);
		});

		$('#personal').on('click', 'li .rm', function () {
			var filename = $(this.previousSibling).text();
			$(this.parentNode).remove();
		});

	});

	return pub;
})();

    function xml_to_string(xml_node)
    {
        if (xml_node.xml)
            return xml_node.xml;
        else if (XMLSerializer)
        {
            var xml_serializer = new XMLSerializer();
            return xml_serializer.serializeToString(xml_node);
        }
        else
        {
            alert("ERROR: Extremely old browser");
            return "";
        }
    }

	function openViewFH() {
		$( ".notminhead").css('display','');		
	}

	function openViewXML(idname) {
       var column = [];
       var element = -1;
       for(var i=0; i<xmlFiles.length; i++){
       	  var xmlData=xmlFiles[i];
          if (xmlData[0]==idname) {
          	element=i;
          	i=xmlFiles.length;
          }
       }

		if (element>=0) {
			var item = xmlFiles[element];
			var filename = item[1];
			var tabs = ($("a:contains('Raw XML:"+ filename +"')").length);
			if (tabs==0) {		
				var name = item[0];
				var contents = item[2];
				var fname = 'raw'+name;
				var idname = fname.replace(".xml","").replace(/ /g,"").replace(/-/g,"").replace(/_/g,"");
				var tab = '<li><a data-toggle="tab" onClick="buttonupdate(this);" href="#file'+idname+'">Raw XML:' + filename + '<button id="closebutton_'+idname+'" class="close" type="button" onclick="popViewXML(\'file'+idname+'\');"> x </button></a></li>';
				var xmlOutput = xml_to_string(contents);
				var panel = '<div id="file'+idname+'" class="tab-pane fade"></div>';
				$('#pageTab').append(tab);
				$('#pageContent').append(panel);
				$("#file-modal").modal("hide");
				LoadXMLDom("file"+idname,contents);
				$("a[href='#file"+idname+"']").trigger( "click" );
			}
		}
	}

	function popViewXML(idname) {
       var column = [];
       var element = -1;
       $(".btn-group-left").css("display","none");       
       for(var i=0; i<xmlFiles.length; i++){
       	  var xmlData=xmlFiles[i];
          if (xmlData[0]==idname) element=i;
       }
       if (element>=0) {
       		xmlFiles.splice(element,1)[0];
       }
       turnOffButtonAdd=1;
       return false;
	}

	function readSingleFile(evt) {
	//Retrieve the first (and only!) File from the FileList object
		var f = evt.target.files[0]; 

		if (f) {
		  var r = new FileReader();
		  r.onload = function(e) { 
			var contents = e.target.result;
			var fname = f.name;
			var idname = fname.replace(".xml","").replace(/ /g,"").replace(/-/g,"").replace(/\./g,"");
			var column = [];
			var element = -1;
			for(var i=0; i<xmlFiles.length; i++){
			  var xmlData=xmlFiles[i];
			  if (xmlData[0]=='file'+idname) element=i;
			}
			if (element==-1) {
				var panel = '<div id="file'+idname+'" class="tab-pane fade"><div id="XML'+idname+'" ></div><BR clear=all></div>';
				$("#viewxml-btn").attr('onclick','openViewXML("file'+idname+'");');
				$("#viewfh-btn").attr('onclick','openViewFH();');				
				$('#pageContent').append(panel);
				res = displayXMLResult(contents,'XML' +idname);
				if (document.getElementById('XML'+idname).innerHTML.length>0) {
					var tab = '<li><a data-toggle="tab" href="#file'+idname+'" onClick="buttonupdate(this);">' + fname + '<button id="closebutton_'+idname+'" class="close" type="button" onclick="popViewXML(\'file'+idname+'\');"> x </button></a></li>';
					$('#pageTab').append(tab);					
					$("#file-modal").modal("hide");
					var xmlData = new Array();
					xmlData.push('file'+idname);
					xmlData.push(f.name);
					parser = new DOMParser();
					xmlContents = parser.parseFromString(contents,'text/xml');
					xmlData.push(xmlContents);
					xmlFiles.push(xmlData);
					sorttable.retag();
					$("a[href='#file"+idname+"']").trigger( "click" );
					var myTHs = document.getElementsByTagName("thead");
					for (var i=0, max=myTHs.length; i < max; i++) {
						if (myTHs[i].getElementsByTagName("tr")[0])	{
							var myTH = myTHs[i].getElementsByTagName("tr")[0].getElementsByTagName("th")[0];
							if (myTH) sorttable.innerSortFunction.apply(myTH, []);					
						}
					}
				  sectionRemoval();
				} else {
					$("#file-message").html("This is not a valid XML file.");
					$("#file"+idname).remove();
				}
			} else {
				$("#file-message").html("This file has already been loaded.");
			}
		  }
		  r.readAsText(f);
		} else { 
		  alert('Failed to load file');
		}
	}

	function sectionRemoval() {
	  	var items = localStorage.getItem("hide_list");
	  	if (items) {
		  	var hideList = JSON.parse(items);		
 			for (var j = 0; j < hideList.length; j++){
				var name = hideList[j][0];
				var loinc = hideList[j][1];
				$( "#header_"+loinc ).css('display','none');
				$( "#text_"+loinc ).css('display','none');
			}			
		}

	  	var minimalhead_value = localStorage.getItem("minimalhead_value");
	  	if (minimalhead_value=="on") {
				$( ".notminhead").css('display','none');	  		
	  	}

	}

	function loadXMLDoc(filename)
	{
	if (window.ActiveXObject)
	  {
	  xhttp = new ActiveXObject('Msxml2.XMLHTTP');
	  }
	else 
	  {
	  xhttp = new XMLHttpRequest();
	  }
	xhttp.open('POST', filename, false);
	try {xhttp.responseType = 'msxml-document'} catch(err) {} // Helping IE11
	xhttp.send("");
	return xhttp.responseXML;
	}

	function displayXMLResult(xmldata,windowname)
	{
	//xml = loadXMLDoc(xmlfilename);
	parser = new DOMParser();
	xml = parser.parseFromString(xmldata,'text/xml');
	xsl = loadXMLDoc('CDA.xsl');
	// code for IE
	if (window.ActiveXObject || xhttp.responseType == 'msxml-document')
	  {
	  ex = xml.transformNode(xsl);
	  document.getElementById(windowname).innerHTML = ex;
	  }
	// code for Chrome, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument)
	  {
	  xsltProcessor = new XSLTProcessor();
	  xsltProcessor.importStylesheet(xsl);
	  resultDocument = xsltProcessor.transformToFragment(xml, document);
	  document.getElementById(windowname).appendChild(resultDocument);
	  e = $('#file_name');
	  e.wrap('<form>').parent('form').trigger('reset');
	  e.unwrap();	  
	  }
	}

	function buttonupdate(ahref) {
		if (turnOffButtonAdd+0==0) {
			iHTML = ahref.innerHTML;
			$(".btn-group-left").css("display","none");
			if (iHTML.includes(".xml")) {
				if (iHTML.includes("Raw XML")) {
					$("#CollapseButton").css("display","");
					$("#ExpandButton").css("display","");
					$("#CommentsButton").css("display","");
				} else {
					$("#ViewXMLButton").css("display","");
					if (xmlFiles.length==2) {
						$("#MergeXMLButton").css("display","");
					}
					var minimalhead_value = localStorage.getItem("minimalhead_value");
						  	if (minimalhead_value=="on") {					
								$("#ViewFullHeadButton").css("display","");
							}
				}
			}
		} else {
			turnOffButtonAdd=0;
		}
	}

	function SetComments() {
		if ($(".Comment").css('display') == 'inline') {
			$(".Comment").css('display','none');
			$("#comments-btn").text('Comments Off');
		} else {
			$(".Comment").css('display','inline');
			$("#comments-btn").text('Comments On');
		}
	}

	function removeListItem(lslistname,cellno,item) {
		var lslist = localStorage.getItem(lslistname);
		var hideList;
		if (!lslist || lslist.length==0) 
			hideList = [];
		else {
			hideList = JSON.parse(lslist);			
		}
		for (var i = 0; i < hideList.length; i++) {
		    if (hideList[i][cellno] == item) {
		    	hideList.splice(i,1);
		    }
		}
		var txtList = JSON.stringify(hideList);
		localStorage.setItem(lslistname,txtList);			
	}

	function removeSection(nodeid) {
		var node = document.getElementById(nodeid);
		var sectionTitle = node.childNodes[1].innerHTML;
		var sectionLoinc = node.getAttribute('id').replace("header_","");
		var sectionNode = document.getElementById(nodeid).nextSibling.nextSibling;

		var blockall = confirm("Click OK if you want to set this section to always be hidden when using FroozHIE.  Otherwise, click cancel.");
		if (blockall) {
			var lslist = localStorage.getItem("hide_list");
			var hideList;
			var section = [sectionTitle,sectionLoinc];
			if (!lslist || lslist.length==0) 
				hideList = [];
			else {
				hideList = JSON.parse(localStorage.getItem("hide_list"));			
			}
			hideList.push(section);
			var txtList = JSON.stringify(hideList);
			localStorage.setItem("hide_list",txtList);	
		}
		sectionNode.style.display = 'none';
		node.style.display = 'none';	
	}

	function removeAllChildNodes(x) {
		while (x.firstChild) {
		    x.removeChild(x.firstChild);
		}		
	}

	function showHiddens() {
		for(var key in localStorage) {
		  if (key=="hide_list") {
		  	var items = (localStorage.getItem(key));
		  	var hideList = JSON.parse(items);		
		  	var ul = document.getElementById("hiddenSections");
		  	removeAllChildNodes(ul);
			for (var j = 0; j < hideList.length; j++){
				var li = document.createElement("li");
				var txt = hideList[j][0]+" ("+hideList[j][1]+") ";				
				var dbutton = document.createElement("button");
				li.appendChild(document.createTextNode(txt));
				dbutton.setAttribute("type","button");
				dbutton.setAttribute("style","height:15px;font-size:10px;margin-left:5px;padding: 0px 6px 1px 6px;");
				dbutton.setAttribute("value",hideList[j][1]);
				dbutton.setAttribute("title","Clear Section");
				dbutton.setAttribute("type","button");
				dbutton.innerHTML = " X ";
				dbutton.setAttribute("id","clearHidden-btn"+hideList[j][1]);
				dbutton.setAttribute("class","btn btn-primary btn-danger");
				dbutton.onclick = function () {
					clearSingleSection(this.value);//
				};	
				li.appendChild(dbutton);
				ul.appendChild(li);
			}		  	
		  }
		}		
	}

	function clearRemoveSection() {
		var clearall = confirm("Click OK if you want to unset all existing hidden sections.  Otherwise, click cancel.");
		var ul = document.getElementById("hiddenSections");
		if (clearall) {
			removeAllChildNodes(ul);
			localStorage.setItem("hide_list","");
		}				
	}

	function clearSingleSection(item) {
		var clearall = confirm("Click OK if you want unset this section from being hidden.  Otherwise, click cancel.");
		var ul = document.getElementById("hiddenSections");
		var thisitem = document.getElementById("clearHidden-btn"+item);
		if (clearall) {
			removeListItem("hide_list",1,item);
			thisitem.parentNode.parentNode.removeChild(thisitem.parentNode);
		}				
	}	

	function MergeXML(){
		alert ("Merge XML!");
	}
