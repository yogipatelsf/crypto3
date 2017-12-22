

const SHA256 = CryptoJS.SHA256;

class block{
	constructor(index, timestamp, data, previousHash=''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}
	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp+JSON.stringify(this.data) + this.nonce).toString()
	}

	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty)!== Array(difficulty + 1).join('0')){
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log('Block mined: ' + this.hash);
	}
}



class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
	}

	createGenesisBlock(){
		
		return new block(0, '14/12/2017','Genisis block', '0');
	}

	getLatestBlock(){
		return this.chain[this.chain.length-1];
		
	}
	

	addBlock(newBlock){

		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}

	isChainValid(){
		for (var i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];
//Checking if any of the data has been changed
//First, data within the block
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}
//Second, replacing the entire block----->>>breaking the chain!!
			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;
	}
}


// let crypto3 = new Blockchain();
// //Display the Blockchain
// //mining the first block after the proof of work
// console.log('crypto3');
// console.log('Mining block 1..');
// crypto3.addBlock(new block(1, new Date() , { amount: 5, 
// 											 email: "schguerfi@hotmail.com",
// 											 coin: "CoinID",
// 											}));

// console.log('Mining block 2..');
// crypto3.addBlock(new block(2,new Date() , { amount: 2}));
//  console.log(crypto3);

// // Check if the chain is valid------ try to hack it!;)
// crypto3.chain[1].data = { amount: 100}; 
// crypto3.chain[1].hash = crypto3.chain[1].calculateHash();


