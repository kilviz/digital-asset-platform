//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721.sol";


contract MovieAuction {
    event Start();
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount);
    event End(address  highestBidder, uint amount);

    IERC721 public nft;
    uint public nftId;

    address payable public immutable seller;
    uint32 public endAt;
    uint public duration = 1;
    bool public started;
    bool public ended;

    address public highestBidder;
    uint public highestBid;

    mapping(address => uint) public bids;

    constructor(
    address _nft,
    uint _nftId,
    uint _startingBid
    ) {
        nft = IERC721(_nft);
        nftId = _nftId;
        seller = payable(msg.sender);
        highestBid = _startingBid;
    }

    function start() external {
        require(msg.sender == seller, "not seller");
        require(!started, "started");
        ended = false;
        started = true;
        endAt = uint32(block.timestamp + duration * 60);

        nft.transferFrom(seller, address(this), nftId);
        emit Start();
    }

    function set_nftId(uint _nftId) external {
        require(!started, "auc started" );
        nftId = _nftId;
    }

    function set_nft(IERC721 _nft) external {
        require(!started, "auc started");
        nft = _nft;
    }
    function setDuration(uint _minute )external  {
        require(!started, "auc started" );
        duration = _minute;
    }
    function bid() external payable {
        require( started, "not started");
        require(block.timestamp < endAt, "ended");
        require(msg.value > highestBid, "value < highest bid");

        if (highestBidder != address(0)) {
            bids[highestBidder] +=highestBid;
        }

        highestBid = msg.value;
        highestBidder = msg.sender;

        emit Bid(msg.sender, msg.value);
    }

     function withdraw() external {
         uint bal = bids[msg.sender];
         bids[msg.sender] = 0;

         payable(msg.sender).transfer(bal);
         emit Withdraw(msg.sender, bal);
     }

    function end() external {
        require(started, "not started");
        require(!ended,   "ended");
        require(block.timestamp >= endAt, "not ended");

        ended = true;
        started = false;

        if (highestBidder != address(0)) {
            nft.transferFrom(address(this), highestBidder, nftId);
            seller.transfer(highestBid);
        } else {
            nft.transferFrom(address(this), seller, nftId);
        }

        emit End(highestBidder,highestBid);

        highestBidder = address(0);
        highestBid = 0;

    }

}