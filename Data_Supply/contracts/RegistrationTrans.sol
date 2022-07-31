pragma solidity >=0.4.21 <0.6.0;

contract RegistrationTrans {
    uint public lookup_id=0;
    uint public _d_id =0;
    uint public _u_id =0;
    uint public _t_id=1;
    
    
    struct track_data {
        uint _previous_owner_id;
        string _previous_owner_name;
        uint _data_id;
        uint _owner_id;
        string _owner_name;
        uint _timeStamp;
        string _owner_type;
    }
    mapping(uint => track_data) public tracks;
    
    struct token {
        uint _data_id;
        uint [] _data_ids;
        uint [] _token_ids;
    }
    
   mapping(uint => token) public tokens;
   
    struct data {
        string _data_name;
        uint _data_cost;
        string _data_specs;
        string _data_hash;
        uint _owner_id;
        uint _manufacture_date;
        address _data_owner_address;
        uint [] _owner_ids;
        uint [] trace_ids;
     
    }
   
    mapping(uint => data) public datas;
    
   
    struct User {
        string _userName;
        string _passWord;
        address _address;
        string _userType;
        //uint rating =0;
    }
    mapping(uint => User) public Users;
   
    function createUser(string name ,string pass ,address u_add ,string utype) public returns (uint){
        uint user_id = _u_id++;
        Users[user_id]._userName = name ;
        Users[user_id]._passWord = pass;
        Users[user_id]._address = u_add;
        Users[user_id]._userType = utype;
        return user_id;
    }
   
    struct lookup{
        uint b_id;
        uint d_id;
        uint o_id;
        //string smartcontract_name;
        //address datachain_address;
        bytes32 interactionId;
        uint _timeStamp;
        uint flag;
        }
       
    mapping(uint => lookup) public lookups;
    
    struct verifylookup{
        uint d_id;
        uint b_id;
        uint selected_id;
        uint lookup_Id;
    }

    mapping(uint => verifylookup) public verifylookups;

   
    function newData(uint own_id, string name ,uint d_cost ,string d_specs ,string d_hash) returns (uint) {
        if(keccak256(Users[own_id]._userType) == keccak256("Owner") || keccak256(Users[own_id]._userType) == keccak256("CurrentOwner")) {
            uint data_id = _d_id++;
            datas[data_id]._data_name = name;
            datas[data_id]._data_cost = d_cost;
            datas[data_id]._data_specs =d_specs;
            datas[data_id]._data_hash =d_hash;
            datas[data_id]._owner_id = own_id;
            datas[data_id]._data_owner_address=Users[own_id]._address;
            datas[data_id]._manufacture_date = now;
            datas[data_id]._owner_ids.push(own_id);
            return data_id;
        }
       
       return 0;
    }
    function getUser(uint User_id) public view returns (string,address,string) {
        return (Users[User_id]._userName,Users[User_id]._address,Users[User_id]._userType);
    }
    function get_Data_details(uint Data_id) public view returns (string,uint,string,string,uint,uint){
        return (datas[Data_id]._data_name,datas[Data_id]._data_cost,datas[Data_id]._data_specs,datas[Data_id]._data_hash,datas[Data_id]._owner_id,datas[Data_id]._manufacture_date);
    }
    function get_details() public view returns (uint,uint,uint)
    {
        return(_d_id,_u_id,_t_id);
    }
    function get_lookupdetails() public view returns (uint)
    {
        return(lookup_id);
    }
    /*
    modifier onlyOwner(uint user1_id,uint pid) {
         if(Users[user1_id]._address != Users[products[pid]._owner_id]._address ) throw;
         _;
       
     }*/
    modifier onlyOwner(uint did) {
         if(msg.sender != datas[did]._data_owner_address) throw;
        _;
         
     }
    function transferOwnership_data(uint user1_id ,uint user2_id, uint data_id) onlyOwner(data_id) public returns(uint,uint) {
        //require(msg.sender == products[prod_id]._product_owner);
        User  p1 = Users[user1_id];
        User  p2 = Users[user2_id];
        //track_product  trk;
        uint transfer_id = _t_id;
        uint token_id=1;
        //event test_value(uint256 indexed value1);
        //test_value(p1._userType);
        if((keccak256(p1._userType) == keccak256("Owner") && keccak256(p2._userType)==keccak256("CurrentOwner")) ||
        (keccak256(p1._userType) == keccak256("CurrentOwner") && keccak256(p2._userType)==keccak256("CurrentOwner"))
        ){
            tracks[transfer_id]._data_id =data_id;
            tracks[transfer_id]._owner_id = user2_id;
            tracks[transfer_id]._owner_name=Users[user2_id]._userName;
            tracks[transfer_id]._timeStamp = now;
            tracks[transfer_id]._previous_owner_id = user1_id;
            tracks[transfer_id]._previous_owner_name=Users[user1_id]._userName;
            datas[data_id]._owner_id = user2_id;
            datas[data_id].trace_ids.push(transfer_id);
            datas[data_id]._owner_ids.push(user2_id);
            transfer_id = _t_id++;
            token_id = token_id++;
            return (transfer_id,token_id);
        }
        else{
            return (0,0);
        }
    }
   /* function getProduct_track(uint prod_id)  public  returns (track_product[]) {
       
        uint track_len = tracks[prod_id].length;
       string[] memory trcks = new string[](track_len);
       for(uint i=0;i<track_len;i++){
           track_product t = tracks[prod_id][i];
           
           trcks.push(t._product_id+""+t._owner_id+""+t._product_owner+""+t._timeStamp);
       }
       // track_product tk =tracks[prod_id];
         return trcks;
    }*/
    function get_data_owners(uint data_id) public returns (uint[] memory){
        return datas[data_id]._owner_ids;
    }

    function getdata_tracking_ids(uint data_id)  public  returns (uint [] memory) {
       
        //product memory p = products[p_id];
        return datas[data_id].trace_ids;
    }
   
    function getdata_trackindes(uint t_id)  public  returns (uint,string,uint,string,uint) {
        //track_product memory t = tracks[t_id];
        //p.trace_ids;
         return (tracks[t_id]._previous_owner_id,tracks[t_id]._previous_owner_name,tracks[t_id]._owner_id,tracks[t_id]._owner_name,tracks[t_id]._timeStamp);
    }
   
   /* function getProduct_chainLength(uint prod_id) public returns (uint) {
        return tracks.length();
    }*/
   
    function userLogin(uint uid ,string uname ,string pass ,string utype) public returns (bool){
        if(keccak256(Users[uid]._userType) == keccak256(utype)) {
            if(keccak256(Users[uid]._userName) == keccak256(uname)) {
                if(keccak256(Users[uid]._passWord)==keccak256(pass)) {
                    return (true);
                }
            }
        }
       
        return (false);
    }
   


function getdetails(uint dataid,uint owner_id, uint selectedOwnerid,uint buyerId) public returns (uint){
        //   return (datas[Data_id]._data_name,datas[Data_id]._data_cost,datas[Data_id]._data_specs,datas[Data_id]._data_hash,datas[Data_id]._owner_id,datas[Data_id]._manufacture_date);
       // bytes32    hash =  concatenateInfoAndHash(datas[dataid]._data_name,buyerId,datas[dataid]._data_hash,selectedOwnerid);
       //uint  dataid;
       //uint  _buyer_id;
       // uint  selectedOwnerid;
        bytes32  hash;
       
       // dataid =dataid;
       
       //selectedOwnerid = selectedOwnerid;

       // _buyer_id=buyerId;
       
       // bytes memory dataidB = new bytes(datas[dataid]._data_name);
        bytes memory selectedOwneridB = new bytes(selectedOwnerid);
        bytes memory _buyer_idaB = new bytes(buyerId);

        //bytes memory reversed = new bytes(dataid);

         hash =  concatenateInfoAndHash(datas[dataid]._data_name,selectedOwneridB,datas[dataid]._data_hash,_buyer_idaB);

        lookups[lookup_id].b_id=buyerId;
        lookups[lookup_id].d_id=dataid;
        lookups[lookup_id].o_id=owner_id;
        //lookups[lookup_id].smartcontract_name="Data";
        //lookups[lookup_id].datachain_address=datachain_address;
        lookups[lookup_id].interactionId=hash;
         lookups[lookup_id]._timeStamp=now;
         lookups[lookup_id].flag=1;
        
         //
        //d_id;
        //uint b_id;
        //uint selected_id;
        //uint lookup_Id;
        verifylookups[lookup_id].d_id=dataid;
        verifylookups[lookup_id].b_id=buyerId;
        verifylookups[lookup_id].selected_id=selectedOwnerid;
        verifylookups[lookup_id].lookup_Id=lookup_id;

        
        lookup_id++;
        return lookup_id;
    }
    function get_hash(uint lookup_id) public view returns(bytes32){
        return lookups[lookup_id].interactionId;
    }
  
    function concatenateInfoAndHash(string memory s1,bytes memory s2,string memory s3,bytes memory s4) public returns (bytes32){
        //First, get all values as bytes
        bytes memory b_a1 = bytes(s1);
        bytes memory b_s1 = bytes(s2);
                bytes memory b_s2 = bytes(s3);

        //bytes20 b_s2 = bytes20(s3);
        bytes memory b_s3 = bytes(s4);

        /*
        bytes32 b = bytes32(_buyer_id);
        bytes memory b_s1 = new bytes(32);
        for (uint iii=0; iii < 32; iii++) {
        b_s1[iii] = b[iii];
        }
        bytes memory b_s2 = bytes(datas[dataid]._data_hash);
        bytes32 bb = bytes32(selectedOwnerid);
        bytes memory b_s3 = new bytes(32);
        for (uint ii=0; ii < 32; ii++) {
        b_s3[ii] = bb[ii];
        }
        */
        //Then calculate and reserve a space for the full string
        string memory s_full = new string(b_a1.length + b_s1.length + b_s2.length + b_s3.length);
        bytes memory b_full = bytes(s_full);
        uint j = 0;
        uint i;
        for(i = 0; i  < b_a1.length; i++){
            b_full[j++] = b_a1[i];
        }
        for(i = 0; i < b_s1.length; i++){
            b_full[j++] = b_s1[i];
        }
        for(i = 0; i < b_s2.length; i++){
            b_full[j++] = b_s2[i];
        }
        for(i = 0; i < b_s3.length; i++){
            b_full[j++] = b_s3[i];
        }
        //Hash the result and return
        return keccak256(b_full);
    }
  
     function checkdetails(uint dataid, uint selectedOwnerid,uint buyerId,bytes32 interaction_id) view public returns (string memory){
        // bytes32    hash =  concatenateInfoAndHash(datas[dataid]._data_name,buyerId,datas[dataid]._data_hash,selectedOwnerid);
        bytes32  hash;
 
        //bytes memory dataidB = new bytes(datas[dataid]._data_name);
        bytes memory selectedOwneridB = new bytes(selectedOwnerid);
        bytes memory _buyer_idaB = new bytes(buyerId);
       
         hash =  concatenateInfoAndHash(datas[dataid]._data_name,selectedOwneridB,datas[dataid]._data_hash,_buyer_idaB);
         
         //lookups[lookup_id].flag=1;
       
        if(hash == interaction_id )
        {
             return datas[dataid]._data_hash;
        }
        else
        return "Invalid interactionId";
    }
    
     function get_lookupId() public view  returns(uint){
        return lookup_id;
    }
}
