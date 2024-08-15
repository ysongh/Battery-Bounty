const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BatteryBountyModule", (m) => {
  const batteryBounty = m.contract("BatteryBounty", ["10000000000000000000000"]);

  return { batteryBounty };
});
