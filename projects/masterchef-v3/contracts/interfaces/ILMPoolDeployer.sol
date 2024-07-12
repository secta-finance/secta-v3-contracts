// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./ISectaDexPool.sol";
import "./ILMPool.sol";

interface ILMPoolDeployer {
    function deploy(ISectaDexPool pool) external returns (ILMPool lmPool);
}
