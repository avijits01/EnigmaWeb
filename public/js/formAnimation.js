function hidePlaceholder($target) {
	if($target.val() !== "")
		$target.nextAll(".placeholder").first().addClass("focused");
	else
		$target.nextAll(".placeholder").first().removeClass("focused");
}

function addFocusEventListeners(targetclass) {
		$(targetclass).on("focusout", function(e) {
                hidePlaceholder($(e.target));
		});
	
		$(targetclass).on("focusin", function(e) {
				$(e.target).nextAll(".placeholder").first().addClass("focused");
		});
}

$(document).ready(function() {
	console.log( "ready!" );
	const array = [".txtBox", ".txtArea"];
	array.forEach(function (item) {
		addFocusEventListeners(item);
	});
});

