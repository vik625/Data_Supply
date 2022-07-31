import {  init_web3 } from "./utils.js"

window.onload = async function () {
      var x = await init_web3()

  document.getElementById("btnnew").addEventListener("click", function () {
    var own_id = document.getElementById("u_id").value;
    var data_name = document.getElementById("data_name").value;
    var data_cost = document.getElementById("d_cost").value;
    var data_specs = document.getElementById("specs").value;
    var data_hash = document.getElementById("data_hash").value;
window.pm.methods.newData(own_id,data_name,data_cost,data_specs,data_hash).send({ from: window.accounts[0] , gas: 500000 }, function (error, result) {
    if (error) {
        console.log(error)
        console.log(false)
    } else {
        console.log(result)
        console.log(true)

window.location.href = "transferOwnership.html";

          //Logic to remove item from owned list

    }
})
})





}
//


//
/*
document.getElementById("btnpress").addEventListener("click", function () {

window.pm.methods.createUser("asd","sdsd","0x2f382479604DeD91B4A796505B79e23F74bE10b3").send({ from: window.accounts[0], gas: 100000 }, function (error, result) {
  if (error) {
      console.log(error)
  } else {
      console.log(result)
      //Logic to remove item from owned list

  }
})
})
*/
//
/*document.getElementById("build-part").addEventListener("click", function () {

window.pm.methods.newData(12,"sdsd",12,"dsfdf","fefefe").send({ from: window.accounts[0], gas: 100000 }, function (error, result) {
  if (error) {
      console.log(error)
  } else {
      console.log(result)
      //Logic to remove item from owned list

  }
})
})*/
/*
//
document.getElementById("track").addEventListener("click", function () {

window.pm.methods.tracks(0).send({ from: window.accounts[0], gas: 100000 }, function (error, result) {
  if (error) {
      console.log(error)
  } else {
      console.log(result)
      //Logic to remove item from owned list

  }
})
})
//
*/
/*
document.getElementById("transfer").addEventListener("click", function () {

window.pm.methods.transferOwnership_product(0,1,0).send({ from: window.accounts[0], gas: 100000 }, function (error, result) {
  if (error) {
      console.log(error)
  } else {
      console.log(result)
      //Logic to remove item from owned list

  }
})
})
*/
/*
document.getElementById("btnloginpress").addEventListener("click", function () {

window.pm.methods.userLogin(1,"sdsd","dsfdf").send({ from: window.accounts[0], gas: 100000 }, function (error, result) {
  if (error) {
      console.log(error)
  } else {
      console.log(result)
      //Logic to remove item from owned list

  }
})
})
*/

//clearDetails, partListManager, carPartListManager, addItemToList, format_date, getActivePart,
/*
    document.getElementById("part-change-ownership-btn").addEventListener("click", function () {
        console.log("Change Ownership")
        //Get part data from active item on owned list

        var hash_element = getActivePart("part-list")
        if (hash_element != undefined) {
            var to_address = document.getElementById("part-change-ownership-input").value
            if (to_address != "") {
                window.co.methods.changeOwnership(0, hash_element.textContent, to_address).send({ from: window.accounts[0], gas: 100000 }, function (error, result) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("Changed ownership")
                        //Logic to remove item from owned list
                        hash_element.parentElement.removeChild(hash_element)
                        clearDetails(document.getElementById("part-list-details"))
                    }
                })
            }

        }
    })
    */
