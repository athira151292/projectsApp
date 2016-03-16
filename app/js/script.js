$(document).ready(function(){
	
	$.ajaxSetup({
        async: false
    });
	$.getJSON( "json/projects.json", function(data){
		var projects = data.projects;
		var tech = data.technology;
		var arr=[],techarr=[];
		for(key in projects) {
		    arr.push(key);
		}
		for(key in tech){
			techarr.push(key);
		}
		var length = arr.length;
		var fromLS = localStorage.getItem("projects");
		if(fromLS && JSON.parse(fromLS).projectDetails.length > 0){
			displayLSprojects();
		}
		for(i=0;i<length;i++){
			var currentProject = projects[i].project;
			$(".least-gallery").append('<li><a><img/></a></li>');
			var currentThumbnail = $(".least-gallery li:last a");
			currentThumbnail.attr({
				href: currentProject.img,
				title: currentProject.name			
			});
			currentThumbnail.attr("data-caption",currentProject.desc);
			$(".least-gallery li:last a img").attr("src",currentProject.img);
		}
		$(".least-gallery li a").attr("data-subtitle","View Project Details");
		for(j=0;j<techarr.length;j++){
			$(".fpselect").append("<option>"+tech[j]+"</option>");
		}
		$(".fpselect").change(function(){
			var selectedText = $(this).find("option:selected").text();
    		filterTech(selectedText,projects,arr);
		});
	
	$("#addForm").submit(function(e){
		if($(this).valid()){
			var jsonArr = [];
			var form = $("#addForm");
			var jsonString = form.serializeObject();
			var fromLS = localStorage.getItem("projects");
			if (fromLS && JSON.parse(fromLS).projectDetails.length > 0) {
				console.log(jsonArr);
				jsonArr = JSON.parse(fromLS).projectDetails;
			}
			console.log(jsonArr);
			jsonArr.push(jsonString);
			var toLS = {'projectDetails':jsonArr};
			localStorage.setItem("projects",JSON.stringify(toLS));
			displayLSprojects();
			form[0].reset(); 
			$(".dismiss").trigger("click");
			
		}
		e.preventDefault();
	});
	});
});
function displayProjects(projects){
	var length = projects.length;
	for(i=0;i<length;i++){
			$(".least-gallery").append('<li><a><img/></a></li>');
			var currentThumbnail = $(".least-gallery li:last a");
			currentThumbnail.attr({
				href: projects[i].img,
				title: projects[i].name			
			});
			currentThumbnail.attr("data-caption",projects[i].desc);
			$(".least-gallery li:last a img").attr("src",projects[i].img);
	}
	$(".least-gallery li a").attr("data-subtitle","View Project Details");
	$('.least-gallery').least();
}
function filterTech(tech,projects,arr){
	var t = [];
	var LSarr =[];
	if(tech=="All"){
		$(".least-gallery li").remove();
		for(i=0;i<arr.length;i++){
			t.push(projects[i].project);
		}
	}
	else{
		for(i=0;i<arr.length;i++){
			var technologies = projects[i].project.tech.split(",");
			for(j=0;j<technologies.length;j++){
				if(technologies[j].trim()==tech.trim()){
					t.push(projects[i].project);
				}
			}
		}

	}
		$(".least-gallery li").remove();
		var fromLS = localStorage.getItem("projects");
		if(fromLS){
			if(tech=="All"){
				displayLSprojects();
			}
			else{
				
				if(fromLS){
					var currentObj = JSON.parse(fromLS);
					var length = JSON.parse(fromLS).projectDetails.length;
					for(i=0;i<length;i++){
						if(currentObj.projectDetails[i].tech==tech){
							LSarr.push(currentObj.projectDetails[i]);
							
						}
					}
					filterLS(LSarr);
				}
			}
		}
		displayProjects(t);
}
function displayLSprojects(){
	var fromLS = localStorage.getItem("projects");
	var currentObj = JSON.parse(fromLS);
	var length = JSON.parse(fromLS).projectDetails.length;
	for(i=0;i<length;i++){
		var currentProject = currentObj.projectDetails[i];
		$(".least-gallery").append('<li><a><img/></a></li>');
			var currentThumbnail = $(".least-gallery li:last a");
			currentThumbnail.attr({
				href: "images/no-thumbnail.png",
				title: currentProject.pname			
			});
			currentThumbnail.attr("data-caption",currentProject.desc);
			$(".least-gallery li:last a img").attr("src","images/no-thumbnail.png");
	}
	$(".least-gallery li a").attr("data-subtitle","View Project Details");
	$('.least-gallery').least();
}
function filterLS(projects){
	var length = projects.length;
	for(i=0;i<length;i++){
		var currentProject = projects[i];
		$(".least-gallery").append('<li><a><img/></a></li>');
			var currentThumbnail = $(".least-gallery li:last a");
			currentThumbnail.attr({
				href: "images/no-thumbnail.png",
				title: currentProject.pname			
			});
			currentThumbnail.attr("data-caption",currentProject.desc);
			$(".least-gallery li:last a img").attr("src","images/no-thumbnail.png");
	}
	$(".least-gallery li a").attr("data-subtitle","View Project Details");
	$('.least-gallery').least();
}
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

