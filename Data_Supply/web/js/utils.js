 function init_web3() {
    //Web3 init
    /*
    if (typeof web3 != 'undefined') {
        web3 = new Web3(web3.currentProvider) // what Metamask injected
    } else {
        // Instantiate and set Ganache as your provider
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
      */
  var  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    //Load accounts
    window.accounts = ["0x4837f02ac920dfc9f9f4d90ee9e96934f8981c52"];
    console.log("Loaded accounts");

    // The interface definition for your smart contract (the ABI)
    window.pm = new web3.eth.Contract([
	{
		"constant": true,
		"inputs": [],
		"name": "get_lookupdetails",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Users",
		"outputs": [
			{
				"name": "_userName",
				"type": "string"
			},
			{
				"name": "_passWord",
				"type": "string"
			},
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_userType",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "data_id",
				"type": "uint256"
			}
		],
		"name": "get_data_owners",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "lookup_id",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "t_id",
				"type": "uint256"
			}
		],
		"name": "getdata_trackindes",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "data_id",
				"type": "uint256"
			}
		],
		"name": "getdata_tracking_ids",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "uid",
				"type": "uint256"
			},
			{
				"name": "uname",
				"type": "string"
			},
			{
				"name": "pass",
				"type": "string"
			},
			{
				"name": "utype",
				"type": "string"
			}
		],
		"name": "userLogin",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_t_id",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "dataid",
				"type": "uint256"
			},
			{
				"name": "selectedOwnerid",
				"type": "uint256"
			},
			{
				"name": "buyerId",
				"type": "uint256"
			},
			{
				"name": "interaction_id",
				"type": "bytes32"
			}
		],
		"name": "checkdetails",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_lookupId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_u_id",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "own_id",
				"type": "uint256"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "d_cost",
				"type": "uint256"
			},
			{
				"name": "d_specs",
				"type": "string"
			},
			{
				"name": "d_hash",
				"type": "string"
			}
		],
		"name": "newData",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "pass",
				"type": "string"
			},
			{
				"name": "u_add",
				"type": "address"
			},
			{
				"name": "utype",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "s1",
				"type": "string"
			},
			{
				"name": "s2",
				"type": "bytes"
			},
			{
				"name": "s3",
				"type": "string"
			},
			{
				"name": "s4",
				"type": "bytes"
			}
		],
		"name": "concatenateInfoAndHash",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "user1_id",
				"type": "uint256"
			},
			{
				"name": "user2_id",
				"type": "uint256"
			},
			{
				"name": "data_id",
				"type": "uint256"
			}
		],
		"name": "transferOwnership_data",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tracks",
		"outputs": [
			{
				"name": "_previous_owner_id",
				"type": "uint256"
			},
			{
				"name": "_previous_owner_name",
				"type": "string"
			},
			{
				"name": "_data_id",
				"type": "uint256"
			},
			{
				"name": "_owner_id",
				"type": "uint256"
			},
			{
				"name": "_owner_name",
				"type": "string"
			},
			{
				"name": "_timeStamp",
				"type": "uint256"
			},
			{
				"name": "_owner_type",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "User_id",
				"type": "uint256"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_details",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "lookups",
		"outputs": [
			{
				"name": "b_id",
				"type": "uint256"
			},
			{
				"name": "d_id",
				"type": "uint256"
			},
			{
				"name": "o_id",
				"type": "uint256"
			},
			{
				"name": "interactionId",
				"type": "bytes32"
			},
			{
				"name": "_timeStamp",
				"type": "uint256"
			},
			{
				"name": "flag",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "datas",
		"outputs": [
			{
				"name": "_data_name",
				"type": "string"
			},
			{
				"name": "_data_cost",
				"type": "uint256"
			},
			{
				"name": "_data_specs",
				"type": "string"
			},
			{
				"name": "_data_hash",
				"type": "string"
			},
			{
				"name": "_owner_id",
				"type": "uint256"
			},
			{
				"name": "_manufacture_date",
				"type": "uint256"
			},
			{
				"name": "_data_owner_address",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "verifylookups",
		"outputs": [
			{
				"name": "d_id",
				"type": "uint256"
			},
			{
				"name": "b_id",
				"type": "uint256"
			},
			{
				"name": "selected_id",
				"type": "uint256"
			},
			{
				"name": "lookup_Id",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "Data_id",
				"type": "uint256"
			}
		],
		"name": "get_Data_details",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "dataid",
				"type": "uint256"
			},
			{
				"name": "owner_id",
				"type": "uint256"
			},
			{
				"name": "selectedOwnerid",
				"type": "uint256"
			},
			{
				"name": "buyerId",
				"type": "uint256"
			}
		],
		"name": "getdetails",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_d_id",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "lookup_id",
				"type": "uint256"
			}
		],
		"name": "get_hash",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
])
 window.pm.options.address = '0xae29926c4be8f3244c8636314e20a40065b2fb95'
 window.co = new web3.eth.Contract([
	{
		"constant": true,
		"inputs": [],
		"name": "a",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "lookup_id1",
				"type": "uint256"
			}
		],
		"name": "get_interactionId",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "currentlookupId",
				"type": "uint256"
			}
		],
		"name": "check_lookupId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "dc",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "buyerid",
				"type": "uint256"
			},
			{
				"name": "dataid",
				"type": "uint256"
			},
			{
				"name": "selectedownerid",
				"type": "uint256"
			}
		],
		"name": "get_lookupId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "data",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
])
window.co.options.address ='0x24727f3ec12a9e278becbe5193d14fa47cf26496'

}
export {
  init_web3
}
