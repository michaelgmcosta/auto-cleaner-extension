chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "updateAlarm") {
        createAlarmWithStoredPeriod();
    }
})

chrome.runtime.onInstalled.addListener(() => {
    createAlarmWithStoredPeriod();
});

chrome.runtime.onStartup.addListener(() => {
    createAlarmWithStoredPeriod();
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "dailyDataCleaner") {
        clearBrowsingData();
    }
})

function createAlarmWithStoredPeriod() {
    chrome.storage.sync.get("periodInMinutes", (result) => {
        const period = result.periodInMinutes || 60;
        let now = new Date();
        console.log(`Interval: ${period}. ${now.toLocaleString()}`);
        chrome.alarms.clear("dailyDataCleaner");
        chrome.alarms.create("dailyDataCleaner", {
            delayInMinutes: period,
            periodInMinutes: period
        });
    });
}

function clearBrowsingData() {
    const dataToRemove = {
        "since": 0
    };

    const typesToRemove = {
        "history": true,
        "downloads": true,
        "cache": true,
        "cacheStorage": true,
        "formData": true
    };

    chrome.browsingData.remove(dataToRemove, typesToRemove, () => {
        let now = new Date()
        console.log(`Data deleted. ${now.toLocaleString()}`);
        chrome.action.setBadgeText({ text: "✓" });
        setTimeout(() => {
            chrome.action.setBadgeText({ text: "" });
        }, 2000);
    })
}