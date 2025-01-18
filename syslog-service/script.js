document.getElementById("message").innerText =
	"Hello, this is a simple JavaScript message!";

document.getElementById("fetchMessage").addEventListener("click", () => {
	fetch("/api/message")
		.then((response) => response.json())
		.then((data) => {
			if (data.message) {
				document.getElementById("message").innerText = data.message;
			} else {
				document.getElementById("message").innerText = "No message received";
			}
		})
		.catch((error) => {
			console.error("Error fetching message:", error);
			document.getElementById("message").innerText = "Error fetching message";
		});
});
