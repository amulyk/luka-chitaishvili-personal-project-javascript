 import { Validator } from '../validator/index'
 
 export class Transaction {
    constructor() {
        this.logs = [];
        this.store = {};
        this.schema = {
            index: {
                type: 'number',
                optional: false
            },
            meta: {
                title: {
                    type: 'string',
                    optional: false
                },
                description: {
                    type: 'string',
                    optional: false
                }
            },
            call: {
                type: 'function',
                optional: false
            },
            restore: {
                type: 'function',
                optional: true
            },
            silent: {
                type: 'boolean',
                optional: true
            },
        }
    }

    verifyItems(scenario) {
        let lastItem = scenario[scenario.length - 1];

        if (lastItem.hasOwnProperty('restore')) {
            return false;
        }
        for (let step of scenario) {
 
            if (step.index < 0) {
                return false;
            }
            if (!Validator.validate(step, this.schema)) {
                return false;
            }
        }
        return true;
    }

    async dispatch(scenario) {
        let isValid = this.verifyItems(scenario);
        if (!isValid) {
            throw new Error('Problem with scenario')
        }
        
        scenario.sort((first, second) => {
            return first.index > second.index ? 1 : -1;
        });

        let numSteps = 0;
        for (let step of scenario) {
            let silent = false;
            if (step.hasOwnProperty('silent')) {
                silent = step.silent;
            }
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
                
                if (!silent) {
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
            }
            this.logs.push(log);
            numSteps++;
        }
    }
}
