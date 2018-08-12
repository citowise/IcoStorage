// /*global contract, config, it, assert*/
const IcoStorage = artifacts.require("IcoStorage");

contract("IcoStorage", accounts => {

  it('has a creator assigned', async function () {
    const owner = accounts[0]
    const icoStorage = await IcoStorage.new({ from: owner })
    const creator = await icoStorage.owner()

    assert.equal(creator, owner, "10000 wasn't in the first account");
  })

  it("should create project", async function () {
    const owner = accounts[0]
    const icoStorage = await IcoStorage.new({ from: owner })

    const result = await icoStorage.createProject(
      10,
      "test",
      "0x0123456789012345678901234567890123456789",
      "0x9876543210987654321098765432109876543210",
      { from: owner }
    )

    assert.equal(result.receipt.status, true);
  });

  it("should return existing projects", async function () {
    const owner = accounts[0]
    const icoStorage = await IcoStorage.new({ from: owner })

    await icoStorage.createProject.sendTransaction(
      10,
      "test",
      "0x0123456789012345678901234567890123456789",
      "0x9876543210987654321098765432109876543210",
      { from: owner }
    )

    let result = await icoStorage.getProject.call(10)

    assert.strictEqual(result[0], true)
    assert.strictEqual(result[1], "test");
    assert.strictEqual(result[2], "0x0123456789012345678901234567890123456789");
    assert.strictEqual(result[3], "0x9876543210987654321098765432109876543210");
  });

  it("should count existing projects", async function () {
    const owner = accounts[0]
    const icoStorage = await IcoStorage.new({ from: owner })

    await icoStorage.createProject.sendTransaction(
      10,
      "test",
      "0x0123456789012345678901234567890123456789",
      "0x9876543210987654321098765432109876543210",
      { from: owner }
    )

    const result = await icoStorage.countProjects.call()

    assert.strictEqual(result["c"][0], 1);
  });

  it("should return array of project ids", async function () {
    const owner = accounts[0]
    const icoStorage = await IcoStorage.new({ from: owner })

    await icoStorage.createProject.sendTransaction(
      10,
      "test",
      "0x0123456789012345678901234567890123456789",
      "0x9876543210987654321098765432109876543210",
      { from: owner }
    )

    let result = await icoStorage.getProjects.call()

    assert.deepEqual(result[0]["c"], [10])
  });

  it("should deactivate project", async function () {
    const owner = accounts[0]
    const icoStorage = await IcoStorage.new({ from: owner })

    await icoStorage.createProject.sendTransaction(
      10,
      "test",
      "0x0123456789012345678901234567890123456789",
      "0x9876543210987654321098765432109876543210",
      { from: owner }
    )

    let result = await icoStorage.deactivateProject().sendTransaction(
      10,
      { from: owner }
    )

    assert.deepEqual(result[0]["c"], [10])
  });
})
