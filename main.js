const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
class Block{
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = '';
        this.nonce = 0;
}

    generateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.generateHash();
        }
        console.log("block mined: " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100; //NOt needed
    }

    createGenesisBBlock() {
        let block = new Block(0, "01/01/2018", "Genesis block", "0");
        block.hash = block.generateHash();
        return block;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.previousHash = this.getLatestBlock().hash;
        block.mineBlock(this.difficulty);
        console.log('block successfully mined');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAdress(address) {
        let balance = 0;

        for(const block of this.chain) {
            for(const trans of block.transactions) {
                if(trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if(trans.toAddress === address) {
                    balance +=  trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.generateHash()) {
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}


let beiChrisCoin = new Blockchain();
beiChrisCoin.createTransaction(new Transaction('address1', 'address2', 100));
beiChrisCoin.createTransaction(new Transaction('address2', 'address1', 30));

console.log('Starting the miner');
beiChrisCoin.minePendingTransactions('chrisAdresse');

console.log('Chriss Balance is', beiChrisCoin.getBalanceOfAdress('chrisAdresse'));

console.log('Starting mining again');

beiChrisCoin.minePendingTransactions('chrisAdresse');

beiChrisCoin.chain[1].transactions[0].amount = 300;

console.log('Chriss Balance is', beiChrisCoin.getBalanceOfAdress('chrisAdresse'));
console.log('Address1 Balance is', beiChrisCoin.getBalanceOfAdress('address1'));
console.log('Address2 Balance is', beiChrisCoin.getBalanceOfAdress('address2'));
console.log(`Is blockchain valid ${beiChrisCoin.isChainValid()}`);