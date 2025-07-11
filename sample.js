const addbtn = document.querySelector("#add");
const newwindow = document.querySelector("#addlink");
newwindow.disabled = true;
let linkarray = JSON.parse(localStorage.getItem("links"));

let name;
let url;
let description;
const addcontent = document.querySelector("#contents");
const savebtn = document.querySelector("#savebtn");

if(linkarray!=null)
{
  let i=0;
  for(const item of linkarray)
  {
    addcontent.innerHTML += `<div class="box">
      <div class="details">
        <a href="${item.url}" target="_blank">
          <div class="named">${item.name}</div>
          <div class="desc"><strong>Description:</strong> ${item.desc}</div>
        </a>
        <div class="bottom">
          <div class="edit" data-value="${i}" onclick="edit(this)">Edit</div>
          <div class="delete" data-value="${i}" onclick="deletelink(this)">Delete</div>
        </div>
      </div>
    </div>`;
    i++;
  }
}
else{
  linkarray = [];
}

addbtn.addEventListener("click",clickfunc);

function clickfunc()
{
  newwindow.style.display = "flex";
  newwindow.style.justifyContent = "center";
  newwindow.style.alignItems = "center";
  //document.querySelector('body').style.overflowY = 'hidden';
}

let nameel = document.querySelector("#name");
let urlel = document.querySelector("#url");
let descriptionel = document.querySelector("#webdesc");

savebtn.addEventListener('click',()=>{
  if(nameel.value === "" || urlel.value === ""){
    alert("Website name and URL CANNOT be Empty!!!");
  }
  else{
    addvalues();
  }
});

function addvalues()
{ 
  name = nameel.value;
 
  if(urlel.value.startsWith("https://"))
  {
    url = urlel.value;
  }
  else{
    url = "https://"+urlel.value;
  }
  
  if(descriptionel.value === "")
  {
    description = "Nil"
  }
  else{
    description = descriptionel.value;
  }
  
  
  let linkObj = {
    "name": name,
    "url": url,
    'desc': description
  }
  linkarray.unshift(linkObj);
  
  nameel.value = "";
  urlel.value = "";
  descriptionel.value = "";
  
  localStorage.setItem("links",JSON.stringify(linkarray));
  document.querySelector('body').style.overflowY = 'visible';
  newwindow.style.display = "none";
  reloadpage();
}

function reloadpage()
{
  window.location.reload(true);
}

function deletelink(element)
{
  const val = parseInt(element.dataset.value);
  linkarray.splice(val,1);
  localStorage.setItem("links",JSON.stringify(linkarray));
  //alert("Shortcut deleted..");
  reloadpage();
}
function edit(element)
{
  const val = parseInt(element.dataset.value);
  clickfunc();
  nameel.value = linkarray[val].name;
  urlel.value = linkarray[val].url;
  descriptionel.value = linkarray[val].desc;
  linkarray.splice(val,1);
  localStorage.setItem("links",JSON.stringify(linkarray));
}

