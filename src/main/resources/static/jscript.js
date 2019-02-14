const product = "http://localhost:9595/product";
const productAll = "http://localhost:9595/product/all";
const productAvg = "http://localhost:9595/product/avg";
const productMin = "http://localhost:9595/product/min";
const productMax = "http://localhost:9595/product/max";
const productSum = "http://localhost:9595/product/sum";
const productMedian = "http://localhost:9595/product/median";
const warehouseAll = "http://localhost:9595/warehouse/all";

function ajaxRequest(type, url, callback, obj = null, math = ""){
	let xhr = new XMLHttpRequest();
	switch(type)
	{
		case "GET":{
			xhr.open(type, url, true);
		    xhr.onreadystatechange = function () {
		        if (xhr.readyState === 4 && xhr.status === 200) {
		        	if (math)
		        		callback(this, math);
		        	else
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
			xhr.open(type, url);
		    xhr.onreadystatechange = function () {
		        if (xhr.readyState === 4 && xhr.status === 204)
		        	console.log("Put successful");
		    }
		    xhr.setRequestHeader("Content-Type", "application/json");
		    if (obj != null){
			    let jsonObj = JSON.stringify(obj);
			    xhr.send(jsonObj);
		    }
		    else
		    	console.log("Input object for put was null");
		}
		break;
		case "DELETE":{
			xhr.open(type, url);
		    xhr.onreadystatechange = function () {
		        if (xhr.readyState === 4 && xhr.status === 204)
		        	console.log("Remove successful");
		    }
		    xhr.setRequestHeader("Content-Type", "application/json");
		    if (obj != null){
			    let jsonObj = JSON.stringify(obj);
			    xhr.send(jsonObj);
		    }
		    else
		    	console.log("Input object for remove was null");
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
    	"<ul><li>Name: " + obj[i].warehouse.name +
    	"</li><li>Address: " + obj[i].warehouse.address + 
    	"</li></ul></td></tr>";
    }
    document.getElementById("products").innerHTML = table;
}

function warehouseAllGetResponse(xhr){
	let response = xhr.response;
    let obj = JSON.parse(response);
    let options = "";
    for (let i = 0; i < obj.length; ++i){
    	options += "<option title=\"" + obj[i].address + "\">" + obj[i].name + "</option>";	
    }
    document.getElementById("warehouse").innerHTML = options;
}

function productMathGetResponse(xhr, math){
	let response = xhr.response;
    let obj = JSON.parse(response);
    switch(math)
    {
    	case "max":{
    		document.getElementById("max").innerHTML = "$"+obj.toFixed(2);
    	}
    	break;
    	case "min":{
    		document.getElementById("min").innerHTML = "$"+obj.toFixed(2);
    	}
    	break;
    	case "sum":{
    		document.getElementById("sum").innerHTML = "$"+obj.toFixed(2);
    	}
    	break;
    	case "avg":{
    		document.getElementById("avg").innerHTML = "$"+obj.toFixed(2);
    	}
    	break;
    	case "median":{
    		document.getElementById("median").innerHTML = "$"+obj.toFixed(2);
    	}
    	break;
    }
}

function formToObjPost(){
	let select = document.getElementById("warehouse");
	let selected = select.options[select.selectedIndex];
	let obj = {
		id: document.getElementById("id").value,
		name: document.getElementById("name").value,
		price: parseFloat(document.getElementById("price").value).toFixed(2),
		quantity: Math.round(document.getElementById("quantity").value),
		warehouse: {
			address: selected.title,
			id: select.selectedIndex + 1,
			name: selected.text
		}
	}
	ajaxRequest("POST", product, null, obj);
	ajaxRequest("GET", productAll, productAllGetResponse);
	setTimeout(function(){window.location.reload(true)}, 10);
}

function formToObjPut(){
	let select = document.getElementById("warehouse");
	let selected = select.options[select.selectedIndex];
	let obj = {
		id: document.getElementById("id").value,
		name: document.getElementById("name").value,
		price: document.getElementById("price").value,
		quantity: Math.round(document.getElementById("quantity").value),
		warehouse: {
			address: selected.title,
			id: select.selectedIndex + 1,
			name: selected.text
		}
	}
	ajaxRequest("PUT", product, null, obj);
	setTimeout(function(){window.location.reload(true)}, 1);
}

function formToObjRemove(){
	let obj = {
		id: document.getElementById("id").value,
		name: "none",
		price: 0,
		quantity: 0,
		warehouse: {
			address: "none",
			id: 1,
			name: "none"
		}
	}
	ajaxRequest("DELETE", product, null, obj);
	setTimeout(function(){window.location.reload(true)}, 1);
}

ajaxRequest("GET", productAll, productAllGetResponse);
ajaxRequest("GET", warehouseAll, warehouseAllGetResponse);
ajaxRequest("GET", productMax ,productMathGetResponse, null, "max");
ajaxRequest("GET", productMin ,productMathGetResponse, null, "min");
ajaxRequest("GET", productSum ,productMathGetResponse, null, "sum");
ajaxRequest("GET", productAvg ,productMathGetResponse, null, "avg");
ajaxRequest("GET", productMedian ,productMathGetResponse, null, "median");
document.getElementById("submit").addEventListener("click", formToObjPost);
document.getElementById("put").addEventListener("click", formToObjPut);
document.getElementById("remove").addEventListener("click", formToObjRemove);