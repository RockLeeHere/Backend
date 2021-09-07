// console.log("in app.js");
showall();
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', addit);

// addBtn.addEventListener('dblclick', function(e){
    // console.log("fuck");
// });

// this takes all i/p related to 'notes' in localStorage (ie in string) to array form, modify it, push it back in string form. 
// take cares of edge case as well when the localStorage is empty.
function addit() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = Array.from(JSON.parse(notes));
    }
    let addTxt = document.getElementById('addTxt');
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);

    // add title in ditto manner 
    let title = localStorage.getItem('title');
    if (title == null) {
        titleObj = [];
    } else {
        titleObj = Array.from(JSON.parse(title));
    }
    let addTitle = document.getElementById('addTitle');
    titleObj.push(addTitle.value);
    localStorage.setItem('title', JSON.stringify(titleObj));
    addTitle.value = "";
    showall();
}

function showall() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
        console.log("Nothing add something")
    } else {
        notesObj = Array.from(JSON.parse(notes));
    }
    
    let titles = localStorage.getItem('title');
    if (titles == null) {
        titleObj = [];
        // console of notes is sufficient
    } else {
        titleObj = Array.from(JSON.parse(titles));
    }
    // <h5 class="card-title">Note ${idx + 1}</h5>
    let html = "";    
    notesObj.forEach(function (ele, idx) {
        // console.log(idx, ele);
        ele2 = titleObj[idx];
        // these are element which we could write in html with all functionalities, here we dont know how many of them would be there so this way.
        // add this when edit is clicked and remove when that done after saving button click o/w leave it at its own.
        // <button id="${idx}"  class="sm btn btn-primary">Save</button> 
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">                
                <p class="card-text" id = ${idx} onclick="edit_title(this.id)"> ${ele2} </p>
                <p class="card-text" id = ${idx} onclick="edit_note(this.id)"> ${ele} </p>
                <button href="#" id="${idx}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete Node</button>
                <button href="#" id="${idx}" onclick="editNode(this.id)" class="btn btn-primary">Edit Node</button>
                
                
            </div>
        </div>        
        `;
        
    });
  
    // console.log(html);
    let notesElm = document.getElementById('notes');
    if (Array.from(notesObj).length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Empty, add note.`;
    }
}
function edit_title(idx) {
    console.log("title clicked");
    let ele = document.getElementsByClassName('noteCard');
    ele = Array.from(ele)[idx];
    let ele3 = ele.children[0].children[0];
    // let ele3 = ele2.chidren[0]; modular code did not worked.
    
    // console.log(ele3.innerText);
    ele3.style.border = "thick solid 2cm";
    ele3.style.borderColor = "green";
    ele3.setAttribute('contenteditable', true);
    
    var updatedVal;
    ele3.addEventListener('input', function(ele, id){
        // console.log("here", ele, idx);
        updatedVal = ele3.innerText;  
        let who = localStorage.getItem('title');
        if (who == null) {
            ar = [];
        } else {
            ar = Array.from(JSON.parse(who));
        }
        ar[idx] = updatedVal;
        // Todo : Confirmation before saving.
        localStorage.setItem('title', JSON.stringify(ar));
        // console.log("->", localStorage);
    });    
    
    
}
function edit_note(idx) {
    console.log("note clicked");
    let ele = document.getElementsByClassName('noteCard');
    ele = Array.from(ele)[idx];
    let ele3 = ele.children[0].children[1];
    // let ele3 = ele2.chidren[0]; not working in modular form 
    console.log("here : ");
    console.log(ele3.innerText, 'mc');
    ele3.style.background = "lightcyan";
    // ele3.style.borderColor = "green";
    // ele3.style.border = "4em thick black"
    
    // console.log(ele3.innerText);
    ele3.style.borderColor = 'blue';
    ele3.style.border = "3em thick solid";
    ele3.setAttribute('contenteditable', true);
    var updatedVal;
    ele3.addEventListener('input', function(ele, id){
        // console.log("here", ele, idx);
        updatedVal = ele3.innerText;  
        let who = localStorage.getItem('notes');
        if (who == null) {
            ar = [];
        } else {
            ar = Array.from(JSON.parse(who));
        }
        ar[idx] = updatedVal;
        // console.log("-->", ar[idx], updatedVal);

        // TODO : confirmation here then save 
        localStorage.setItem('notes', JSON.stringify(ar));
        ele3.style.borderColor = 'yellow';
        // console.log("->", localStorage);
    }); 
    
    
}
function editNode(idx) {
    console.log("wanna edit node with id", idx);
    let gets = document.getElementsByClassName('noteCard');
    // sbme ek baar 
    if (gets == null) {
        console.log("Empty");
    } else {
        let ele1 = Array.from(gets[idx].children[0].children);
        // ele1[0].style.borderColor = "green";
        // ele1[0].style.border = "4em dashed black"
        // ele1[1].style.borderColor = "green";
        // ele1[1].style.border = "4em thick black"
        // ele1[2].style.borderColor = "green";
        // ele1[2].style.border = "4em thick black"
        // ele1[3].style.borderColor = "green";
        // ele1[3].style.border = "4em thick black"
        console.log(ele1[0], ele1[1]);
        ele1[0].click();
        ele1[1].click();
        ele1[1].style.background = '';
    }
}

// to delete just find that idx in both the localStorage array of 'notes' and title then update array via splice and update the changes.
function deleteNode(idx) {
    // console.log("Deleting ", idx);
    // let notes = document.getElementById('notes');
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('title');
    if (notes == null) {
        notesObj = [];
        titleObj = [];
    } else {
        notesObj = Array.from(JSON.parse(notes));
        titleObj = Array.from(JSON.parse(titles));
    }

    notesObj.splice(idx, 1);
    titleObj.splice(idx, 1);

    // console.log(notesObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('title', JSON.stringify(titleObj));
    showall();
}


// added a listener on text in search bar which uses css display property further to show only valid notes.
let sr = document.getElementById('searchTxt');
sr.addEventListener('input', search);
function search() {
    let txt = sr.value;
    // console.log("i/p fire", txt);
    let location = document.getElementsByClassName('noteCard');
    Array.from(location).forEach(function(ele) {
        // finding p of each elements, as its class so a htmlColln ie why [0] used as well.
        let para = ele.getElementsByTagName('p')[0].innerText;
        if (para.includes(txt)) {
            // console.log(para);
            ele.style.display = 'block';
        } else {
            ele.style.display = 'none';
        }
    });
    /* 
    Why cant we access all directly like this ? 
    let html_col = document.getElementsByClassName('card-txt');
    html_col = Array.from(html_col);
    html_col.forEach(function(ele, idx) {
        console.log(idx, ele);
        // let who = ele.value;
        let who = ele;
        if (who.includes(txt)) {
            console.log(who);
        } else {
            console.log("");
        }
    }); */
}

/* 
Further features : 

1. Add title, make after showing notes editable.
2. Mark a note as Imp.
3. Separate notes by user.
4. Sync and host to a web server.
5. Add a user login logout. 
6. Add nodeJS / react / api / socketIO / bootstrap / react into it.
7. Add github sign in 
8. Set mood cheer up songs, vidoes, images database link.
9. Add Chatbot for everything travel, fun, oneliners, mood setter, suggest youtube videos through apis.
10. Add more features 
11. Integrate DBMS.

Integrate other into it.
Add github signin. 
Add facebook / gmail / twitter signin.
Use APIs to access it.
*/
