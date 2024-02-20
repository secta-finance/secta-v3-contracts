// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;
pragma abicoder v2;

import '../SmartRouter.sol';

contract MockTimeSmartRouter is SmartRouter {
    uint256 time;

    constructor(
        address _factoryV2,
        address _deployer,
        address factoryV3,
        address _positionManager,
        address _WETH9
    ) SmartRouter(_factoryV2, _deployer, factoryV3, _positionManager, _WETH9) {}

    function _blockTimestamp() internal view override returns (uint256) {
        return time;
    }

    function setTime(uint256 _time) external {
        time = _time;
    }
}
