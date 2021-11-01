import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {MyObject} from "../types";
import {Balance} from "@polkadot/types/interfaces";


// export async function handleBlock(_block: SubstrateBlock): Promise<void> {
//     //Create a new starterEntity with ID using block hash
//     let record = new MyObject(_block.block.header.hash.toString());
//     //Record block number
//     record.blockNumber = _block.block.header.number.toNumber();

//     logger.info('\nBlock Number: ' + record.blockNumber + 
//     '\nspecVersion: ' + _block.specVersion + 
//     '\ntimestamp: ' + _block.timestamp +
//     '\nparentHash: ' + _block.block.header.parentHash +
//     '\nstateRoot: ' + _block.block.header.stateRoot +
//     '\nextrinsicRoot: ' + _block.block.header.extrinsicsRoot +
//     '\ndigest: ' + _block.block.header.digest)
//     await record.save();
// }

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    //Retrieve the record by its ID
    let record = new MyObject(event.block.block.header.hash.toString());
    record.timestamp = event.block.timestamp;
    //const record = await MyObject.get(event.extrinsic.block.block.header.hash.toString());
    record.account_to = account.toString();
    //Big integer type Balance of a transfer event
    record.balance = (balance as Balance).toBigInt();
    logger.info("\nBLOCK NUMBER: " + event.block.block.header.number.toNumber())
    logger.info("\nMETHOD: " + event.event.method)
    logger.info("\nSECTION: " + event.event.section)
    await record.save();
}

// export async function handleExtrinsic(extrinsic: SubstrateExtrinsic): Promise<void> {
//     let record = new MyObject(extrinsic.block.block.header.hash.toString());
//     record.blockNumber = extrinsic.block.block.header.number.toNumber();
//     // const record = await MyObject.get(extrinsic.block.block.header.hash.toString());
//     //Date type timestamp
//     record.timestamp = extrinsic.block.timestamp;
//     //Boolean tyep
//     record.success = true;
//     logger.info("\nBLOCK NUMBER: " + extrinsic.block.block.header.number.toNumber())
//     logger.info("\nERA: " + extrinsic.extrinsic.era)
//     logger.info("\nSIGNED?: " + extrinsic.extrinsic.isSigned)
//     logger.info("\nSIGNER: " + extrinsic.extrinsic.signer)
//     await record.save();
// }