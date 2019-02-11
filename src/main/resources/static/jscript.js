const productAll = "http://localhost:9595/product/all";
function ajaxRequest(type, url, callback, obj = null){
	let xhr = new XMLHttpRequest();
	switch(type)
	{
		case "GET":{
			xhr.open(type, url, true);
		    xhr.onreadystatechange = function () {
		        if (xhr.readyState === 4 && xhr.status === 200) {
		        	callback(this);
		        }
		    }
		    xhr.send();
		}
		break;
		case "POST":{
			xhr.open(type, url);
		    xhr.onreadystatechange = function () {
		        if (xhr.readyState === 4 && xhr.status === 201)
		        	console.log("Post successful");
		    }
		    xhr.setRequestHeader("Content-Type", "application/json");
		    if (obj != null){
			    let jsonObj = JSON.stringify(obj);
			    xhr.send(jsonObj);
		    }
		    else
		    	console.log("Input object for post was null");
		}
		break;
		case "PUT":{
			
		}
		break;
		case "REMOVE":{
			
		}
	}
}

function productAllGetResponse(xhr) {
    let response = xhr.response;
    let obj = JSON.parse(response);
    let table = "<tr><th>ID</th><th>Name</th><th>Price</th><th>Quantity</th><th>Warehouse</th></tr>";
    for (let i = 0; i < obj.length; ++i){
    	table += "<tr><td>" +
    	obj[i].id + "</td><td>" +
    	obj[i].name + "</td><td>" +
    	"$" + obj[i].price + "</td><td>" +
    	obj[i].quantity + "</td><td>" +
    	"<ul><li>Address: " + obj[i].warehouse.address + 
    	"</li><li>Name: " + obj[i].warehouse.name +
    	"</td></tr>";
    }
    document.getElementById("products").innerHTML = table;
}

ajaxRequest("GET", productAll, productAllGetResponse);