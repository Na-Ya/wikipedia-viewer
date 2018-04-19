$(document).ready(function() {
	//Begins the search by pressing enter key.
	$('#search-bar').keydown(function(e) {
		var key = e.which;
		if (key == 13) {
			$('#submit-button').click();
		}
	});
	//Begins the search by clicking the submit button. Creates a variable based on text in the search box.
	$('#submit-button').click(function submitForm() {
		var keyword = $('#search-bar').val();
		//Ajax call to get wikipedia data
		$.ajax({
			url:
				'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrsearch=' +
				encodeURIComponent(keyword),
			dataType: 'jsonp',
			success: function(data) {
				$('#resultsbox').empty(); //empties any previous searches
				var pageList; //array of all the pages that return, limited to 10.
				pageList = Object.keys(data.query.pages);
				//originally had each result term hardcoded but changed this to a for loop since it is much easier to maintain.
				for (var i = 0; i < pageList.length; i++) {
					var curid = pageList[i];
					var extracts = data.query.pages[curid].extract;
					var titles = data.query.pages[curid].title;
					//creats a div for each search result with proper formatting.
					$('#resultsbox').append(
						"<div class ='divlink'>" +
							'<h3>' +
							titles +
							'</h3>' +
							'<p>' +
							extracts +
							'</p>' +
							"<a href= 'https://en.wikipedia.org/?curid=" +
							curid +
							"'>" +
							'</a>' +
							'</div>'
					);
					//console.log(curid);

					//the following function makes each div into a clickable link.
					$('.divlink').click(function() {
						window.location = $(this)
							.find('a:first')
							.attr('href');
						return false;
					});
				} //closes out for loop
			} //closes out success function
		}); //closes out ajax call
	}); //closes out submit button
}); //End of document ready function
