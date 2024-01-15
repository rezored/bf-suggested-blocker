const adIndicators = ['Предложено за вас', 'Последване']; // Add indicators that appear within ads or suggested posts

function removeAdsAndSuggestedPosts(mutationList, observer) {
	// If any added nodes contain one of the adIndicators, hide their closest article ancestor
	mutationList.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (node.nodeType === Node.ELEMENT_NODE) {
				adIndicators.forEach((indicator) => {
					if (node.textContent.includes(indicator)) {
						const adElement = node.closest('div[data-pagelet], div[data-testid]'); // Adjust this selector as needed
						if (adElement) {
							adElement.style.display = 'none';
						}
					}
				});
			}
		});
	});
}

const observer = new MutationObserver(removeAdsAndSuggestedPosts);
observer.observe(document.body, { childList: true, subtree: true });