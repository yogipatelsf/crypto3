

const SHA256 = CryptoJS.SHA256;

class block{
	constructor(index, timestamp, data, previousHash=''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}
	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp+JSON.stringify(this.data)).toString()
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock(){
		
		return new block(0, '14/12/2017','Genisis block', '0');
	}

	getLatestBlock(){
		return this.chain[this.chain.length-1];
		
	}
	

	addBlock(newBlock){

		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
}


let crypto3 = new Blockchain();
// console.log(crypto3.createGenesisBlock())


crypto3.addBlock(new block(1, new Date() , { amount: 5}));
crypto3.addBlock(new block(2,new Date() , { amount: 2}));
crypto3.addBlock(new block(3, new Date() , { amount: 2}));
crypto3.addBlock(new block(4, new Date() , { amount: 2}));
// console.log(crypto3.getLatestBlock());
console.log(crypto3);
