const intervalId = setInterval(() => {
	console.log("James");
}, 10);

setTimeout(() => {
	const promise = new Promise((resolve) => {
		console.log("Richard"); //2
		resolve("Robert");
	});

	promise.then((value) => {
		console.log(value); //3

		setTimeout(() => {
			console.log("Michael"); //4

			clearInterval(intervalId);
		}, 10);
	});

	console.log("John"); //2
}, 10);
