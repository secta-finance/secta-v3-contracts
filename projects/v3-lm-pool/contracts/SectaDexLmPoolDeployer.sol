// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

import '@sectafi/v3-core/contracts/interfaces/ISectaDexFactory.sol';
import '@sectafi/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol';

import './SectaDexLmPool.sol';

/// @dev This contract is for Master Chef to create a corresponding LmPool when
/// adding a new farming pool. As for why not just create LmPool inside the
/// Master Chef contract is merely due to the imcompatibility of the solidity
/// versions.
contract SectaDexLmPoolDeployer {
    address public immutable masterChef;

    modifier onlyMasterChef() {
        require(msg.sender == masterChef, "Not MC");
        _;
    }

    constructor(address _masterChef) {
        masterChef = _masterChef;
    }

    /// @dev Deploys a LmPool
    /// @param pool The contract address of the SectaFi Dex pool
    function deploy(ISectaDexPool pool) external onlyMasterChef returns (ISectaDexLmPool lmPool) {
        lmPool = new SectaDexLmPool(address(pool), masterChef, uint32(block.timestamp));
        ISectaDexFactory(INonfungiblePositionManager(IMasterChefV3(masterChef).nonfungiblePositionManager()).factory()).setLmPool(address(pool), address(lmPool));
    }
}
