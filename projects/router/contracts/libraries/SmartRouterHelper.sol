// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import '@sectafi/v3-core/contracts/libraries/LowGasSafeMath.sol';
import '@sectafi/v3-core/contracts/interfaces/IPancakeV3Pool.sol';

library SmartRouterHelper {
    using LowGasSafeMath for uint256;

    /************************************************** V3 **************************************************/

    bytes32 internal constant V3_INIT_CODE_HASH = 0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2;

    /// @notice The identifying key of the pool
    struct PoolKey {
        address token0;
        address token1;
        uint24 fee;
    }

    /// @notice Returns PoolKey: the ordered tokens with the matched fee levels
    /// @param tokenA The first token of a pool, unsorted
    /// @param tokenB The second token of a pool, unsorted
    /// @param fee The fee level of the pool
    /// @return Poolkey The pool details with ordered token0 and token1 assignments
    function getPoolKey(
        address tokenA,
        address tokenB,
        uint24 fee
    ) public pure returns (PoolKey memory) {
        if (tokenA > tokenB) (tokenA, tokenB) = (tokenB, tokenA);
        return PoolKey({token0: tokenA, token1: tokenB, fee: fee});
    }

    /// @notice Deterministically computes the pool address given the deployer and PoolKey
    /// @param deployer The SectaFi Dex deployer contract address
    /// @param key The PoolKey
    /// @return pool The contract address of the V3 pool
    function computeAddress(address deployer, PoolKey memory key) public pure returns (address pool) {
        require(key.token0 < key.token1);
        pool = address(
            uint256(
                keccak256(
                    abi.encodePacked(
                        hex'ff',
                        deployer,
                        keccak256(abi.encode(key.token0, key.token1, key.fee)),
                        V3_INIT_CODE_HASH
                    )
                )
            )
        );
    }

    /// @dev Returns the pool for the given token pair and fee. The pool contract may or may not exist.
    function getPool(
        address deployer,
        address tokenA,
        address tokenB,
        uint24 fee
    ) public pure returns (IPancakeV3Pool) {
        return IPancakeV3Pool(computeAddress(deployer, getPoolKey(tokenA, tokenB, fee)));
    }

    /// @notice Returns the address of a valid SectaFi Dex Pool
    /// @param deployer The contract address of the SectaFi Dex deployer
    /// @param tokenA The contract address of either token0 or token1
    /// @param tokenB The contract address of the other token
    /// @param fee The fee collected upon every swap in the pool, denominated in hundredths of a bip
    /// @return pool The V3 pool contract address
    function verifyCallback(
        address deployer,
        address tokenA,
        address tokenB,
        uint24 fee
    ) public view returns (IPancakeV3Pool pool) {
        return verifyCallback(deployer, getPoolKey(tokenA, tokenB, fee));
    }

    /// @notice Returns the address of a valid SectaFi Dex Pool
    /// @param deployer The contract address of the SectaFi Dex deployer
    /// @param poolKey The identifying key of the V3 pool
    /// @return pool The V3 pool contract address
    function verifyCallback(address deployer, PoolKey memory poolKey)
        public
        view
        returns (IPancakeV3Pool pool)
    {
        pool = IPancakeV3Pool(computeAddress(deployer, poolKey));
        require(msg.sender == address(pool));
    }
}
