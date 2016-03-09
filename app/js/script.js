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
		displayProjects(t);
	
}