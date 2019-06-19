import { Transaction } from './transaction/'

const scenario = [
  {
      index: 1,
      meta: {
          title: 'Read popular customers',
          description: 'This action is responsible for reading the most popular customers'
      },
      // callback for main execution
      call: async (store) => {
          store.component = 1;
          throw new Error('Error from index 1')
          
      },
      silent: true,
      // callback for rollback
      restore: async () => { console.log('Restore from index 1');
      },
  },
  {
      index: -2,
      meta: {
          title: 'Read popular customers',
          description: 'This action is responsible for reading the most popular customers'
      },
      // callback for main execution
      call: async (store) => {
          store.component = 2;            
      },
      // callback for rollback
      restore: async () => {console.log('Restore from index 2');
      }
  },
  {
      index: 3,
      meta: {
          title: 'Read popular customers',
          description: 'This action is responsible for reading the most popular customers'
      },
      // callback for main execution
      call: async (store) => {
          store.component = 1;
          throw new Error('Error from index 3');
      },
      // callback for rollback
  }
];

const transaction = new Transaction();

(async() => {
  try {
    await transaction.dispatch(scenario);
    const store = transaction.store; // {} | null
          const logs = transaction.logs; // []
          console.log(store);
          console.log(logs);
  } catch (err) {
          // Send email about broken transaction
          console.log(err.message);
  }
})();
