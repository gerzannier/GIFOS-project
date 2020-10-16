


let myGifKey = "myGif"
let misGifsIdArray = JSON.parse(localStorage.getItem(myGifKey));

/*Almacena en array del local storage el nuevo ID de favoritos o de mis gifos. 
Previamente verifica que no exista ya el Id en el array */

function SaveLocalStorage(storagedArray, key, newGifId){
  
    if(storagedArray == null){
      storagedArray=[];
      storagedArray.push(newGifId);
      localStorage.setItem(key,JSON.stringify(storagedArray));
      return
    }else{
      for(i=0;i<storagedArray.length;i++){
        if(storagedArray[i] == newGifId){//verificar si ya esta almacenado ese ID
            storagedArray.splice(i,1); //en caso de que ya este, elimina
            localStorage.setItem(key,JSON.stringify(storagedArray))
          return
        }
      }
      
    }
  storagedArray.push(newGifId);
  localStorage.setItem(key,JSON.stringify(storagedArray))
  };