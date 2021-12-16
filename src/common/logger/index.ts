interface InfoMetadata {
    type:
    'error' |
    'log' |
    'navigation' |
    'process' |
    'request' |
    'state' |
    'user' |
    'manual',
    at: String,
};

function info(msg?: String, metadata?: InfoMetadata) {
    if (__DEV__) {
        console.log('INFO:', msg, JSON.stringify(metadata));
    }
}

export default {
    info,
};
