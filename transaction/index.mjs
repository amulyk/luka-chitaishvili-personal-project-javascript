 class Transaction {
    constructor() {
        this.log = [];
        this.store = {};
    }
            //Method for validation
    validateScenario(scenario) {
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
        this.validateScenario(scenario);

                //Sorting array items by index property
        scenario.sort((first, second) => {
            return first.index > second.index ? 1 : -1;
        });

        for (let step of scenario) {
            try {
                
            } catch(err) {
                
            }
        }
    }
}

const scenario = [
    {
        index: '2',
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
				// callback for main execution
        call: async (store) => {},
				// callback for rollback
        restore: async () => {}
    },
    {
        index: 4,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
				// callback for main execution
        call: async (store) => {},
				// callback for rollback
        restore: async () => {}
    },
    {
        index: 1,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
				// callback for main execution
        call: async (store) => {},
				// callback for rollback
        restore: async () => {}
    }
];

const transaction = new Transaction();

(async() => {
    try {
			await transaction.dispatch(scenario);
			const store = transaction.store; // {} | null
			const logs = transaction.logs; // []
    } catch (err) {
            // Send email about broken transaction
            console.log(err.message);
    }
})();

