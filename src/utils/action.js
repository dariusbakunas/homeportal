export default class Action {
    constructor(type, requestArgs, successArgs) {
        this.type = type;
        this.requestArgs = requestArgs;
        this.successArgs = successArgs;
    }

    get requestType() {
        return this.type;
    }

    get successType() {
        return `${this.type}_SUCCESS`;
    }

    get errorType() {
        return `${this.type}_ERROR`;
    }

    createAction = (type, actionArgs) => {
        return (...args) => {
            const action = { type };
            actionArgs.forEach((arg, index) => {
                action[actionArgs[index]] = args[index];
            });

            return action;
        }
    };

    get request() {
        return this.createAction(this.requestType, this.requestArgs);
    }

    get success() {
        return this.createAction(this.successType, this.successArgs);
    }

    get error() {
        return this.createAction(this.errorType, ['error']);
    }
}