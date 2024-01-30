// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/ISectaDexPoolImmutables.sol';
import './pool/ISectaDexPoolState.sol';
import './pool/ISectaDexPoolDerivedState.sol';
import './pool/ISectaDexPoolActions.sol';
import './pool/ISectaDexPoolOwnerActions.sol';
import './pool/ISectaDexPoolEvents.sol';

/// @title The interface for a SectaFi Dex Pool
/// @notice A SectaFi pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface ISectaDexPool is
    ISectaDexPoolImmutables,
    ISectaDexPoolState,
    ISectaDexPoolDerivedState,
    ISectaDexPoolActions,
    ISectaDexPoolOwnerActions,
    ISectaDexPoolEvents
{

}
