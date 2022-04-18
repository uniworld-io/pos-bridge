var wait = require('./helpers/wait')
var chalk = require('chalk')
var YourCoin = artifacts.require("./YourCoin.sol");
var unichainJS = require('@uniworld/unichain-js');



contract('YourCoin', function (accounts) {

  console.log('=============================')
  //account 0 is retrieved from privatekey. It's owner account of smart contract
  accounts = [accounts[0], 'UkChmUV1U1WSNTNnSwiDWw6UuY3wVVnrW8', 'UQZjUw5S87G9DsmNFoMPGuaGLJwkxWuUfV', 'UebVW2qwVSzrAwZotEFRT8cJnKBstJUtWk']
  console.log(accounts)
  let meta
  before(async function () {
    console.log('before ....')
    meta = await YourCoin.deployed()
    if(accounts.length < 3) {

    }
  })

  it("should verify that there are at least three available accounts", async function () {
    if(accounts.length < 3) {
      console.log(chalk.blue('\nYOUR ATTENTION, PLEASE.]\nTo test YourCoin you should use at least three addresses.\n'))
    }
    assert.isTrue(accounts.length >= 3)
  })

  it("should verify that the contract has been deployed by accounts[0]", async function () {
    //console.log(meta)
    let t = await meta.getOwner()
    console.log(t)
    assert.equal(await meta.getOwner(), unichainJS.address.toHex(accounts[0]))
  });

  it("should put 10000 YourCoin in the first account", async function () {
    const balance = await meta.getBalance(accounts[0], {from: accounts[0]});
    assert.equal(balance, 10000, "10000 wasn't in the first account");
  });

  it("should call a function that depends on a linked library", async function () {
    this.timeout(10000);
    const meta = await YourCoin.deployed();
    await wait(1);
    const yourCoinBalance = (await meta.getBalance.call(accounts[0])).toNumber();
    const yourCoinEthBalance = (await meta.getBalanceInEth.call(accounts[0])).toNumber();
    assert.equal(yourCoinEthBalance, 2 * yourCoinBalance, "Library function returned unexpected function, linkage may be broken");
  });

  it("should send coins from account 0 to 3 and verify that a Transfer event has been emitted", function (done) {
    assert.isTrue(accounts[3] ? true : false, 'accounts[3] does not exist.')

    let unx = new unichainJS({fullHost: 'http://127.0.0.1:6636'})
    
    console.log(typeof unx.contract)

    this.timeout(20000)
    YourCoin.deployed()
        .then(meta => {
          return unx.contract().at(meta.address)
              .then(meta2 => {
                meta2.sendCoin().watch((err, res) => {
                  if(res) {
                    assert.equal(res.result._from, unx.address.toHex(accounts[0]))
                    assert.equal(res.result._to, unx.address.toHex(accounts[3]))
                    assert.equal(res.result._value, 1)
                    done()
                  }
                })

                meta.sendCoin(accounts[3], 1, {
                  from: accounts[0]
                });
              })
        })
  })

  it("should send coins from account 0 to 1", async function () {
    assert.isTrue(accounts[1] ? true : false, 'accounts[1] does not exist.')

    this.timeout(10000)
    const meta = await YourCoin.deployed();
    await wait(3);
    const account_one_starting_balance = (await meta.getBalance.call(accounts[0])).toNumber();
    const account_two_starting_balance = (await meta.getBalance.call(accounts[1])).toNumber();
    await meta.sendCoin(accounts[1], 10, {
      from: accounts[0]
    });
    assert.equal(await meta.getBalance.call(accounts[0]), account_one_starting_balance - 10, "Amount wasn't correctly taken from the sender");
    assert.equal(await meta.getBalance.call(accounts[1]), account_two_starting_balance + 10, "Amount wasn't correctly sent to the receiver");
  });

});
