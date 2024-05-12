const { Main } = require('./main.cjs');

const main = new MainClass();
main.monitoringCallback((error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
    }
});

main.monitoringPromise()
    .then(result => console.log(result))
    .catch(error => console.error(error));

main.monitoringObservable().subscribe({
    next: result => console.log(result),
    error: error => console.error(error),
    complete: () => console.log('Observable completed')
});
