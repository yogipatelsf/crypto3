$(document).ready(function(){

	//AJAX call to coinmarketcap.com
	var queryURL = "https://api.coinmarketcap.com/v1/ticker/"

	$.ajax({
		url: queryURL,
		method: "GET"
	})

	.done(function(response){
		console.log("Coinmarket API", response)

		var results = response;

		for (var i = 0; i < results.length; i++) {
			console.log("Crypto: " + results[i].id + ", " + "$" + results[i].price_usd);
			
			var timestamp = moment.unix(response[i].last_updated);
			var format = timestamp.format("HH:mm:ss");

			$("#market-table").append("<tr><td>" + 
				results[i].id.charAt(0).toUpperCase() + results[i].id.slice(1)+ "</td><td>" + 
				results[i].symbol + "</td><td>" + 
				"$" + results[i].price_usd + "</td><td>" +
				results[i].percent_change_24h + "</td><td>" +
				"$" + results[i].market_cap_usd + "</td><td>" +
				format + "</td><td>");
	}

	})
})


//api key coinigy: f502c49983a99e264d1e6cb3476aca9a

//api key coinbase: 6HhySqdoQEFOhcKo