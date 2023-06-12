function saveToLocalStorage(event) {
    event.preventDefault();
    const price = event.target.price.value;
    const dish = event.target.dish.value;
    
  
    const obj = {
      price,
      dish
    
    };
  
    axios
      .post(
        "https://crudcrud.com/api/82262cbcb2d846edb19673aefbb29466/orderList",
        obj
      )
      .then((response) => {
        showuseronscreen(response.data);
        console.log(response);
      })
      .catch((err) => {
        document.body.innerHTML =
          document.body.innerHTML + "<h4> Something went wrong </h4>";
        console.log(err);
      });
  
   
  
    
  }
  
  
  window.addEventListener("DOMContentLoaded", () => {
      //down code is to get data from the network when the page get reload
      axios
        .get(
          "https://crudcrud.com/api/82262cbcb2d846edb19673aefbb29466/orderList")
        .then((response) => {
          console.log(response);
  
          for (var i = 0; i < response.data.length; i++) {
            showuseronscreen(response.data[i]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  
      
    });
  
  
  function showuseronscreen(user) {
  
    document.getElementById('price').value='';
    document.getElementById('dish').value='';
    
    if(localStorage.getItem(user.price) !== null){
        removeUserFromScreen(user.price)
    }

    const selectElement = document.getElementById("mySelect");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const optionValue = selectedOption.value;
    const optionText = selectedOption.text;

    const parentNode1=document.getElementById("table1");
    const parentNode2=document.getElementById("table2");
    const parentNode3=document.getElementById("table3");
  
  
    const parentNode = document.getElementById("listOfUsers");
    const childHTML=`<li id=${user._id}> ${user.price} - ${user.dish}
                      <button onclick=deleteUser('${user._id}')> Delete User</button>    
        
                      </li>`
     
  
    if(optionValue=='option1'){
        parentNode1.innerHTML=parentNode1.innerHTML+childHTML
    }else if(optionValue=='option2'){
        parentNode2.innerHTML=parentNode2.innerHTML+childHTML
    }else{
        parentNode3.innerHTML=parentNode3.innerHTML+childHTML
    }


    //  parentNode.innerHTML=parentNode.innerHTML+childHTML;  
  }
  
  
  //edit User
  function editsUserDetails(userId,price,dish){
    
      document.getElementById('price').value=price;
      document.getElementById('dish').value=dish;
    
  
      deleteUser(userId)
  
      
  }
  
  function deleteUser(userId){
      axios.delete(`https://crudcrud.com/api/82262cbcb2d846edb19673aefbb29466/orderList/${userId}`)
          .then((response)=>{
              removeUserFromScreen(userId)
          })
          .catch((err)=>{
              console.log(err)
          })
      
  }
  
  function removeUserFromScreen(userId){
      const parentNode=document.getElementById('listOfUsers');
      const childNodeToBeDeleted=document.getElementById(userId);
      if(childNodeToBeDeleted){
          parentNode.removeChild(childNodeToBeDeleted)
      }
  }
  