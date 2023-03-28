// JavaScript code to fetch a shuffled deck of cards from the Deck of Cards API and display them on a web page
const deckApiUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
const shuffleButton = document.querySelector("#shuffle-button");
const cardContainer = document.querySelector("#card-container");

shuffleButton.addEventListener("click", () => {
	// Fetch a shuffled deck of cards from the Deck of Cards API
	fetch(deckApiUrl)
	.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	})
	.then(deckInfo => {
		// Draw and display the first 12 cards from the shuffled deck
		const drawCardsUrl = `https://deckofcardsapi.com/api/deck/${deckInfo.deck_id}/draw/?count=12`;
		fetch(drawCardsUrl)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then(cardInfo => {
			// Display the cards in the web page
			const cardHtml = cardInfo.cards.map(card => `
				<div class="card">
					<img src="${card.image}" alt="${card.code}">
				</div>
			`).join("");
			cardContainer.innerHTML = cardHtml;
		})
		.catch(error => {
			console.error("Error drawing cards:", error);
		});
	})
	.catch(error => {
		console.error("Error shuffling deck:", error);
	});
});
