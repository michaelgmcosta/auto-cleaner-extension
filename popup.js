document.addEventListener("DOMContentLoaded", () => {
    const intervalSelect = document.getElementById("interval");
    const statusDiv = document.getElementById("status");

    chrome.storage.sync.get("periodInMinutes", (result) => {
        if (result.periodInMinutes) {
            intervalSelect.value = result.periodInMinutes.toString();
        }
    });

    document.getElementById("save").addEventListener("click", () => {
        const selectedValue = parseInt(intervalSelect.value);
        chrome.storage.sync.set({ periodInMinutes: selectedValue }, () => {
            chrome.runtime.sendMessage({ action : "updateAlarm" });
            statusDiv.textContent = "Interval saved!";
            setTimeout(() => statusDiv.textContent = "", 2000);
        });
    });
});
