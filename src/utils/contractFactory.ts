import Web3 from 'web3';
import { BigNumber as BN, ethers } from 'ethers';
import { Contract } from 'web3-eth-contract';
import { AgreementContract } from '../contracts/agreement.js';
import { PAIDTokenContract } from '../contracts/paidtoken.js'
import { DAITokenContract } from '../contracts/daitoken.js'

export class ContractFactory {

	private static _agreementContract: Contract | null = null;
	private static _paidtokenContract: Contract | null = null;
	private static _daitokenContract: Contract | null = null;

	private static _etherAgreementContract: ethers.Contract | null = null;
	private static _etherPaidtokenContract: ethers.Contract | null = null;
	private static _etherDaitokenContract: ethers.Contract | null = null;
	private static wssUrl = `${process.env.REACT_APP_WEB3_WSS}`;

	// Get agreement contract
	public static getAgreementContract = (web3: Web3, network: string) => {
		if (!ContractFactory._agreementContract) {
			ContractFactory._agreementContract = new web3.eth.Contract(
				AgreementContract.raw.abi as any,
				AgreementContract.address[network]
			);
			ContractFactory._agreementContract.options.address = AgreementContract.address[network];
		}
		return ContractFactory._agreementContract;
	};

	public static getPaidTokenContract = (web3: Web3, network: string) => {
		if (!ContractFactory._paidtokenContract) {
			ContractFactory._paidtokenContract = new web3.eth.Contract(
				PAIDTokenContract.raw.abi as any,
				PAIDTokenContract.address[network]
			);
			ContractFactory._paidtokenContract.options.address = PAIDTokenContract.address[network];
		}
		return ContractFactory._paidtokenContract;
	};

	public static getDaiTokenContract = (web3: Web3, network: string) => {
		if (!ContractFactory._daitokenContract) {
			ContractFactory._daitokenContract = new web3.eth.Contract(
				DAITokenContract.raw.abi as any,
				DAITokenContract.address[network]
			);
			ContractFactory._daitokenContract.options.address = DAITokenContract.address[network];
		}
		return ContractFactory._daitokenContract;
	};

	private static loadEther = (web3: any,address: string) => {		
		const provider = new ethers.providers.Web3Provider(web3.currentProvider);
		const signer : any = provider.getSigner();
		signer.address = address;
		return { signer, provider };
	}

	private static loadEtherContract = (network: string, signer: any, contract: any) => {
		return new ethers.Contract(
			contract.address[network],
			contract.raw.abi as any,
			signer
		);
	}

	public static getEtherAgreementContract = (web3: Web3, network: string) => {
		const ether = ContractFactory.loadEther(web3,AgreementContract.address[network]);
		const signer = ether.signer;
		if (!ContractFactory._etherAgreementContract) {
			ContractFactory._etherAgreementContract = ContractFactory.loadEtherContract(network,signer,AgreementContract);
		}
		return { contract: ContractFactory._etherAgreementContract, provider: ether.provider };
	};


	public static getEtherPaidTokenContract = (web3: Web3,network: string) => {
		const ether = ContractFactory.loadEther(web3,PAIDTokenContract.address[network]);
		const signer = ether.signer;
		if (!ContractFactory._etherPaidtokenContract) {
			ContractFactory._etherPaidtokenContract = ContractFactory.loadEtherContract(network,signer,PAIDTokenContract);
		}
		return { contract: ContractFactory._etherPaidtokenContract, provider: ether.provider };
	};

	public static getEtherDaiTokenContract = (web3: Web3,network: string) => {
		const ether = ContractFactory.loadEther(web3,DAITokenContract.address[network]);
		const signer = ether.signer;
		if (!ContractFactory._etherDaitokenContract) {
			ContractFactory._etherDaitokenContract = ContractFactory.loadEtherContract(network,signer,DAITokenContract);
		}
		return { contract: ContractFactory._etherDaitokenContract, provider: ether.provider };
	};
}
