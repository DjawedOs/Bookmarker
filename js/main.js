//Listen for form submit :
document.getElementById("myForm").addEventListener("submit",saveBookmark);

function saveBookmark(e){
   // get form values
   let siteName = document.getElementById("siteName").value;
   let siteUrl = document.getElementById("siteUrl").value;

   if(!validateForm(siteName,siteUrl)){
    return false;
   }

    const bookmark = {
        name:siteName,
        url:siteUrl
    }
   
    
    /* local storage
    
    localStorage.setItem('test','hello world');
    
    console.log(localStorage.getItem('test'))
    
    localStorage.removeItem('test');
    */
    
    if(localStorage.getItem('bookmarks') === null){
        
        // init array
        let bookmarks=[];
        // add bookmark to array
        bookmarks.push(bookmark);
        // set in local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

                

       
    }else {
        // get bookmarks from local storage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

        // add bookmark to array
        bookmarks.push(bookmark);

        // set bookmark back to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));  
    }

    // clear form after submitting
    document.getElementById("myForm").reset();
     
    // re-fetch bookmarks
    fetchBookmarks();


    // prevent form from submitting
    e.preventDefault();
}


// delete bookmark function

function deleteBookmark(url){
    // get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    for(let i=0; i<bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // remove from array
            bookmarks.splice(i,1);
        }
    }
  // set bookmark back to local storage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));  

  // re-fetch bookmarks
  fetchBookmarks();

}


function fetchBookmarks(){
    // get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output ID

    let bookmarksResults = document.getElementById("bookmarksResults")
    
    // build output

    bookmarksResults.innerHTML = '';
    for(let i=0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        bookmarksResults.innerHTML +='<div class="well"' + 
                                     '<h3>'+name+
                                     '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                     '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger m-2" href="#">Delete</a>'
                                     '</h3>'+
                                     '</div>';

    }
    
}

function validateForm(siteName,siteUrl){

    if(!siteName || !siteUrl){
        alert('Please fill in the form')
        return false;
       }
    
       let expression = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
       let regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)){
        alert('Please enter a valid URL !');
        return false;
       }
    return true ;
}




