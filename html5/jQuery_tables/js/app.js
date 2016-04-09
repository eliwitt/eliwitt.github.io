'use strict';

// $('table').bind('dynatable:init', function(e, dynatable) {
// 	  dynatable.sorts.add('name', 1);
// });

//dynatable
var dyna = $('.dynatable').dynatable({
	dataset: {
	    perPageDefault: 2,
	    perPageOptions: [2, 5, 10, 15, 20, 25, 30]
	}
});

$('.dynatable-endangered').dynatable({
	table: {
	    defaultColumnIdStyle: 'underscore'
	},
	dataset: {
		//ajax: true,
		//ajaxUrl: 'js/endangered.json',
		//records: [],
	    perPageDefault: 2,
	    perPageOptions: [2, 5, 10, 15, 20, 25, 30]
	},
	inputs: {
		processingText: 'Loading <img src="http://www.skylimitevents.de/css/images/ajax-loader.gif" />'
	}
});

//list.js
var addSpecies = function ( species ) {
	list.add( species, function (items) {
		for (var i = items.length - 1; i >= 0; i--) {
			items[i].hide();
			$(items[i].elm).fadeIn();
		}

		list.filter(function (item) {
			return item.values().common_name.length;
		});

		//list.sort('common_name', { asc: true });
	});
};

var fuzzyOptions = {
	searchClass: 'fuzzy-search',
	location: 0,
	distance: 100,
	threshold: 0.4,
	multiSearch: true
};

var options = {
    item: 'species-item',
    page: 10,
	plugins: [
		ListFuzzySearch(),
		ListPagination()
	]
};

var remove = function ( name ) {
	return list.remove('name', name);
};

var list = new List('species-list', options);

var getSpecies = function () {
	$.get('js/endangered.json')
	.success(function (data) {
		addSpecies(data.records);
	})
	.fail(function () {
		console.log(arguments);
	});
};

getSpecies();

//chosen
var chosen = $('select').chosen({no_results_text: "Oops, nothing found for "});
chosen.change(function(e, value) {
	list.filter(function (item) {
		if (chosen.val() !== null) {
			for (var i = chosen.val().length - 1; i >= 0; i--) {
				if (item.values().kingdom === chosen.val()[i]) return true;
			}
		} else {
			//if no results then show all
			return true;
		}
	});
	list.sort('common_name', { asc: true });
});
