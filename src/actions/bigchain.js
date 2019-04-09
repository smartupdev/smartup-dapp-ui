import {
  BIGCHAIN_GET, BIGCHAIN_PUT, BIGCHAIN_SEARCH, BIGCHAIN_OWNER_SEARCH,
} from './actionTypes';
const driver = require('bigchaindb-driver');
const connUrl = 'https://test.bigchaindb.com/api/v1/';

//bigchainGet
export function bigchainGet(transaction) {
  const conn = new driver.Connection(connUrl);
  const ret = conn.getTransaction(transaction);
  return {
    type: BIGCHAIN_GET,
    getResult: ret,
  }
}

//bigchainPut
export function bigchainPut(metadata) {
  const keypair = {
    privateKey: "4Tt3eNVEMbipQEJtBVp85XdjpVtqUiwoTV63mX7CdWV6",
    publicKey: "ECnkxTGTrKq5ycJiyAkHMNLBLHgvucBQchZBBQHTZaEr"
  }

  const conn = new driver.Connection(connUrl);
  const tx = driver.Transaction.makeCreateTransaction(
    {
      message: 'owner_test_string_3',
      asd: {
        asd: 'asd'
      },
      time: ''
    },
    {
      metadata: metadata
    },
    [
      driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(keypair.publicKey))
    ],
    keypair.publicKey
  )
  const txSigned = driver.Transaction.signTransaction(tx, keypair.privateKey);
  conn.postTransactionCommit(txSigned);
}

//bigchainSearch
export function bigchainSearch(metadata) {
  const conn = new driver.Connection(connUrl);
  const ret = conn.searchMetadata(metadata);
  return {
    type: BIGCHAIN_SEARCH,
    searchResult: ret,
  }
}

//bigchainSearch
export function bigchainSearchOwner(ownerStr) {
  const conn = new driver.Connection(connUrl);
  const ret = conn.searchAssets(ownerStr);
  return {
    type: BIGCHAIN_OWNER_SEARCH,
    searchOwnerResult: ret,
  }
}
