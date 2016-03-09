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
	});
});
