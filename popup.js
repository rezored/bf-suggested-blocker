document.addEventListener('DOMContentLoaded', function() {
	const statusElement = document.getElementById('status');
	const toggleButton = document.getElementById('toggleBlocking');

	const updateStatusText = (isBlockingEnabled) => {
		statusElement.textContent = `Blocking is ${isBlockingEnabled ? 'enabled' : 'disabled'}.`;
	};

	chrome.storage.local.get(['blockingEnabled'], function(result) {
		updateStatusText(result.blockingEnabled);
	});

	toggleButton.addEventListener('click', function() {
		chrome.storage.local.get(['blockingEnabled'], function(result) {
			const newStatus = !result.blockingEnabled;
			chrome.storage.local.set({blockingEnabled: newStatus}, function() {
				updateStatusText(newStatus);
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.reload(tabs[0].id);
				});
			});
		});
	});
});