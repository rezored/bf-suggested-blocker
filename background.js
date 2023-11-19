chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set({ blockingEnabled: true }); // Enable blocking by default
});