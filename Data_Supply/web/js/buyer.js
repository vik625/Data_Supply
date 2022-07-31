import {  init_web3 } from "./utils.js"

window.onload =  function () {
      var x =  init_web3()
      var params;
      var selecteddataitem;
      var selectedOwnerId;
      if (window.location.search.split('?').length > 1) {
                 params = window.location.search.split('?');
                //for (var i = 0; i < params.length; i++) {
                    //var key = params[i].split('=')[0];
                    //var value = decodeURIComponent(params[i].split('=')[1]);
                    //queryString[key] = value;
                    console.log(params[(params.length)-1]);
              //  }
            }
      console.log("hp")
      var dataid;
      var userid;
      var trackid;
      var owner_id;
        //  var list =[]
      window.pm.methods.get_details().call({ from: window.accounts[0] }, function (error, result) {
              if (error)
                  console.log(error)
              else {
                dataid=result[0]
                userid=result[1]
                trackid=result[2]
                console.log("data_id"+result[0])
                console.log("user_id"+result[1])
                console.log("track_id"+result[2])


                            var select = document.getElementById("dataid");
                            //var options = ["1", "2", "3", "4", "5"];
                            //select.innerHTML = "";
                            for(var i = 0; i < dataid; i++)
                            {
                              var opt = i
                              var el = document.createElement("option")
                              el.textContent = opt
                              el.value = opt
                                      select.appendChild(el)
                                }
                                //console.log(list)
              }
            })

              document.getElementById("dataid").addEventListener("change", function () {
              selecteddataitem=document.getElementById("dataid").value;
                console.log("afef"+selecteddataitem)

                window.pm.methods.get_Data_details(selecteddataitem).call({ from: window.accounts[0] }, function (error, result) {
                  if (error) {
                      console.log(error)
                      console.log(false)
                    } else {
                      console.log(result)
                      console.log(true)
                      owner_id = result[4]
                      document.getElementById("data_details").innerHTML="data name:  "+result[0]+"<br>"+"data cost:  "+result[1]+"<br>"+"data specification:  "+result[2]+"<br>"+"owner id:  "+result[4]+"<br>"+"manufacture date:  "+result[5]
                //Logic to remove item from owned list
                  }
                })

                window.pm.methods.get_data_owners(selecteddataitem).call({ from: window.accounts[0] }, function (error, result){
                  if (error) {
                      console.log(error)
                      console.log("false")
                  } else {
                      console.log(result)
                      console.log("true")
                      //document.getElementById("owners_details").innerHTML="owner ids:  "+result
                      var select = document.getElementById("owners_id");
                      //var options = ["1", "2", "3", "4", "5"];
                      //select.innerHTML = "";
                      for(var i = 0; i < result.length; i++)
                      {
                        var opt = result[i]
                        var el = document.createElement("option")
                        el.textContent = opt
                        el.value = opt
                                select.appendChild(el)
                      }
                      document.getElementById("owners_id").addEventListener("change", function () {
                       selectedOwnerId=document.getElementById("owners_id").value;
                        console.log("afef"+selectedOwnerId)

                        window.pm.methods.getUser(selectedOwnerId).call({ from: window.accounts[0] }, function (error, result) {
                          if (error) {
                              console.log(error)
                              console.log(false)
                            } else {
                              console.log(result)
                              console.log(true)
                              document.getElementById("owner_details").innerHTML="user name:  "+result[0]+"<br>"+"address:  "+result[1]+"<br>"+"user type:  "+result[2]
                        //Logic to remove item from owned list
                        //alert("redirecting to getInteractionId")
                        location.href = "redirect.html?"+selecteddataitem+"?"+owner_id+"?"+selectedOwnerId+"?"+params[(params.length)-1];

                        //



                        //
                          }
                        })
                      })
                      //Logic to remove item from owned list
                  }
                })

              })

              /*
              var selected_ownerid = document.getElementById("owners_id").value;
              document.getElementById("get_hash").onclick = function () {

                var data_id = document.getElementById("dataid").value;
                var selected_ownerid = document.getElementById("owners_id").value;
                //  console.log(params[(params.length)-1]);

                var buyer_id = params[(params.length)-1];

                console.log(data_id)
                console.log(owner_id)
                console.log(selected_ownerid)
                console.log(buyer_id)


                window.pm.methods.getdetails(data_id,owner_id,selected_ownerid,buyer_id).send({ from: window.accounts[0] , gas: 500000 }, function (error, result) {
                    if (error) {
                        console.log(error)
                        console.log(false)
                    } else {
                        console.log("lookupid")
                        console.log(result)
                        console.log(true)
                        window.pm.methods.get_lookupdetails().call({ from: window.accounts[0]}, function (error, result) {
                            if (error) {
                                console.log(error)
                                console.log(false)
                            } else {
                                console.log("check public variables details")
                                console.log(result[0])
                                console.log(result[1])

                                console.log(result[2])

                                console.log(result[3])

                                console.log(true)
                                window.co.methods.get_lookupId(buyer_id,data_id,selected_ownerid).call({ from: window.accounts[0] }, function (error, result) {
                                    if (error) {
                                        console.log(error)
                                        console.log(false)
                                    } else {
                                        console.log("required lookupid")
                                        console.log(result)
                                        console.log(true)
                                        window.co.methods.get_interactionId(result).call({ from: window.accounts[0] }, function (error, result) {
                                            if (error) {
                                                console.log(error)
                                                console.log(false)
                                            } else {
                                                console.log("interactionid")
                                                console.log(result[0])
                                                console.log(true)
                                                alert("wait")
                                                location.href = "redirect.html?"+selecteddataitem+"?"+owner_id+"?"+selectedOwnerId+"?"+params[(params.length)-1];



                                                //document.getElementById("owner_details").innerHTML="user name:  "+result[0]+"<br>"+"address:  "+result[1]+"<br>"+"user type:  "+result[2]
                                                //Logic to remove item from owned list
                                            }
                                        })
                                        //document.getElementById("owner_details").innerHTML="user name:  "+result[0]+"<br>"+"address:  "+result[1]+"<br>"+"user type:  "+result[2]
                                        //Logic to remove item from owned list
                                    }

                                })
                              }
                            })



                        //window.location.href = "transferOwnership.html";

                        //Logic to remove item from owned list

                    }
                })

                  };
                  */
                  /*
    document.getElementById("get_hash").addEventListener("click", function () {
        var data_id = document.getElementById("dataid").value;
        var selected_ownerid = document.getElementById("owners_id").value;

        var buyer_id = params[(params.length)-1];

        console.log(data_id)
        console.log(owner_id)
        console.log(selected_ownerid)
        console.log(buyer_id)


        window.pm.methods.getdetails(data_id,owner_id,selected_ownerid,buyer_id).send({ from: window.accounts[0] , gas: 500000 }, function (error, result) {
            if (error) {
                console.log(error)
                console.log(false)
            } else {
                console.log("lookupid")
                console.log(result)
                console.log(true)
                window.co.methods.get_lookupId(buyer_id,data_id,selected_ownerid).call({ from: window.accounts[0] }, function (error, result) {
                    if (error) {
                        console.log(error)
                        console.log(false)
                    } else {
                        console.log("required lookupid")
                        console.log(result)
                        console.log(true)
                        window.co.methods.get_interactionId(result).call({ from: window.accounts[0] }, function (error, result) {
                            if (error) {
                                console.log(error)
                                console.log(false)
                            } else {
                                console.log("interactionid")
                                console.log(result)
                                console.log(true)
                                window.pm.methods.checkdetails(data_id,selected_ownerid,buyer_id,result[0]).call({ from: window.accounts[0] }, function (error, result) {
                                    if (error) {
                                        console.log(error)
                                        console.log(false)
                                        condole.log("invalid interaction id")
                                    } else {
                                        console.log("get ipfs hash")
                                        console.log(result)
                                        console.log(true)
                                      document.getElementById("hash_value").textContent=result;

                                        //document.getElementById("owner_details").innerHTML="user name:  "+result[0]+"<br>"+"address:  "+result[1]+"<br>"+"user type:  "+result[2]
                                        //Logic to remove item from owned list
                                    }
                                })
                                //document.getElementById("owner_details").innerHTML="user name:  "+result[0]+"<br>"+"address:  "+result[1]+"<br>"+"user type:  "+result[2]
                                //Logic to remove item from owned list
                            }
                        })
                        //document.getElementById("owner_details").innerHTML="user name:  "+result[0]+"<br>"+"address:  "+result[1]+"<br>"+"user type:  "+result[2]
                        //Logic to remove item from owned list
                    }

                })

                //window.location.href = "transferOwnership.html";

                //Logic to remove item from owned list

            }
        })

    })
    */



}
