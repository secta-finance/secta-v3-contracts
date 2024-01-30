import { ether, time, constants, BN, expectRevert, expectEvent, balance } from "@openzeppelin/test-helpers";
import { advanceBlock, advanceBlockTo } from "@openzeppelin/test-helpers/src/time";
import { artifacts, contract, ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import { assert, expect } from "chai";


const WrappedBNB = artifacts.require("exchange-protocol/contracts/libraries/WBNB.sol");
const SmartRouter = artifacts.require("./SmartRouter.sol");



contract("SmartRouter", ([admin, bob, carol]) => {
});
