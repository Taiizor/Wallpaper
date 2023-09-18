var image = document.getElementById("image");

var Wallpaper = {
	0: "img/0.jpg",
	1: "img/0.jpg",
	2: "img/0.jpg",
	3: "img/0.jpg",
	4: "img/0.jpg",
	5: "img/1.jpg",
	6: "img/1.jpg",
	7: "img/1.jpg",
	8: "img/1.jpg",
	9: "img/1.jpg",
	10: "img/1.jpg",
	11: "img/1.jpg",
	12: "img/1.jpg",
	13: "img/1.jpg",
	14: "img/1.jpg",
	15: "img/1.jpg",
	16: "img/1.jpg",
	17: "img/1.jpg",
	18: "img/2.jpg",
	19: "img/2.jpg",
	20: "img/0.jpg",
	21: "img/0.jpg",
	22: "img/0.jpg",
	23: "img/0.jpg"
};

function SucrosePropertyListener(Key, Value) {
	switch (Key) {
		case "Key1":
			console.log("Key1: " + Value);
			break;
		case "Key2":
			console.log("Key2: " + Value);
			break;
		case "Key3":
			console.log("Key3: " + Value);
			break;
		case "Key4":
			console.log("Key4: " + JSON.stringify(Value));
			break;
	}
}

function SucroseStretchMode(Type) {
	switch (Type) {
		case "None":
			image.style.objectFit = "none";
			break;
		case "Fill":
			image.style.objectFit = "fill";
			break;
		case "Uniform":
			image.style.objectFit = "contain";
			break;
		case "UniformToFill":
			image.style.objectFit = "cover";
			break;
		default:
			break;
	}
}

function SucroseSystemDate(Date) {
	var src = image.src;
	var wall = Wallpaper[Date.Hour];

	if (src !== wall) {
		image.src = wall;
	}
}