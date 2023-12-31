const PENDING_PUBLISH_VIDEO_TRACKER = [];

function getPendingPublishVideoTracker() {
    return PENDING_PUBLISH_VIDEO_TRACKER;
}

function enqueuePendingPublishVideo(item) {
    PENDING_PUBLISH_VIDEO_TRACKER.push(item);
}

function dequeuePendingPublishVideo() {
    return PENDING_PUBLISH_VIDEO_TRACKER.shift();
}

function getPendingPublishVideoTrackerQueueSize() {
    return PENDING_PUBLISH_VIDEO_TRACKER.length;
}

module.exports = {
    getPendingPublishVideoTracker,
    enqueuePendingPublishVideo,
    dequeuePendingPublishVideo,
    getPendingPublishVideoTrackerQueueSize
};