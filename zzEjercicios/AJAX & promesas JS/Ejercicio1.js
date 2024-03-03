function upperCaseAsync(s) {
    return new Promise((resolve, reject) => {
        if (s !== null) {
            resolve(s.toUpperCase());
        } else {
            reject('No se ha recibido ningún string.');
        }
    });
}

upperCaseAsync("adrian").then(console.log).catch(console.error);
upperCaseAsync(null).then(console.log).catch(console.error);