 export class Transaction {
    constructor() {
        this.logs = [];
        this.store = {};
    }
            //Method for validation
    verifyScenario(scenario) {
        if (!Array.isArray(scenario)) {
            throw new TypeError(`'scenario' must be an array`)
        }
        for (let item of scenario) {
            if (!item.hasOwnProperty('index') || typeof item.index !== 'number') {
                throw new Error(`Problem with 'index' property`)
            }
            if(!item.hasOwnProperty('meta') || typeof item.meta !== 'object') {
                throw new Error(`Problem with 'meta' property`)
            } else {
                if (!item.meta.hasOwnProperty('title') || typeof item.meta.title !== 'string') {
                    throw new Error(`Problem with 'title' property`)
                }
                if (!item.meta.hasOwnProperty('description') || typeof item.meta.description !== 'string') {
                    throw new Error(`Problem with 'description' property`)
                }
            }
            if (!item.hasOwnProperty('call') || typeof item.call !== 'function') {
                throw new Error(`Problem with 'call' method`)
            }
            if (item.hasOwnProperty('restore') && typeof item.restore !== 'function') {
                throw new TypeError(`Wrong type of 'restore' method`)
            }
        }
    }

    async dispatch(scenario) {
        this.verifyScenario(scenario);

                //Sorting array items by index property
        scenario.sort((first, second) => {
            return first.index > second.index ? 1 : -1;
        });

        let numSteps = 0;
        for (let step of scenario) {
            let storeBefore = {...this.store};
            let log = {
                    index: step.index,
                    meta: { 
                        title: step.meta.title,
                        description: step.meta.description 
                    } 
                };
            
            try {
                await step.call(this.store);
                log.storeBefore = storeBefore;
                log.storeAfter = {...this.store};
                log.error = null;
            } catch (err) {
                log.error = { 
                        name: err.name,
                        message: err.message,
                        stack: err.stack, 
                };
                this.logs.push(log);
                this.store = null;

                for (let i = numSteps; i > 0; i--) {
                    if (typeof scenario[i-1].restore === 'function') {
                        try {
                            await scenario[i-1].restore();
                        } catch(err) {
                            throw err;
                        }
                    } else {
                        continue;
                    }
                }
                break;
            }
            this.logs.push(log);
            numSteps++;
        }
    }
}
