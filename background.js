chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create("dailyDataCleaner", {
        when: getNextMidnightTimestamp(),
        periodInMinutes: 1440 //24h
    });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "dailyDataCleaner") {
        clearBrowsingData();
    }
})

function clearBrowsingData() {
    const dataToRemove = {
        "since": 0
    };

    const typesToRemove = {
        "history": true,
        "downloads": true,
        "cache": true,
        "formData": true
    };

    chrome.browsingData.remove(dataToRemove, typesToRemove, () => {
        console.log("Data deleted.");
    })
}

function getNextMidnightTimestamp() {
    const now = new Date();
    now.setHours(23, 59, 0, 0);
    return now.getTime();
}