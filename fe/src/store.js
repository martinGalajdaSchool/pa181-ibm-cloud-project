import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

const logger = store => next => action => {
    if (typeof action !== 'function') {
        console.log('dispatching:', action);

        let time = performance.now();
        let actionDone = next(action);

        console.log(`Time spent: ${performance.now() - time}ms`);

        return actionDone;
    }

    return next(action);
};

const store = createStore(
    // reducers,
    compose(
        applyMiddleware(logger, thunk)
    )
);

export default store;
