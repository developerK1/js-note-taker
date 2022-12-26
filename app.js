let currentModal;
let counter;
let num = 4;
const Data = {};

const fetchData =  () => {
	let data =  JSON.parse(localStorage.getItem("savedText"));
	data === null ? localStorage.setItem("savedText", "[]"): setTamplate(data);

	return data;
}

fetchData();

const formInputs = (e) => {
	e.preventDefault();
	
	let projectName = document.querySelector('#project-name').value;
	let projectNotes = document.querySelector('#project-notes').value;

	Data.name = projectName;
	Data.notes = projectNotes;
	
	saveData();
}


const startNotes =()=>  document.querySelector("#note-modal").classList.add('open');
function getProjects(){
	let projectData = [];
	console.log(fetchData())
	setTamplate(fetchData());
}

document.querySelector("#save-data").addEventListener("click", formInputs);

function deleteNote(btn){
	let curentIndex;
	
	let allArticles = document.querySelectorAll("#projects article");
	const currentArticle = btn.parentElement.parentElement;
	
	let dataLngth = allArticles.length;
	
	allArticles.forEach((item,index)=> {
		if(item == currentArticle){
			curentIndex = index;
		}
	});
	
	ressetData(curentIndex, currentArticle);
}

function ressetData(curentIndex, currentArticle){
	

let newInfor = [];
		let savedData = fetchData();
		const setUp = () => {
			document.querySelector('#deleted-modal').classList.add('open');
			counter = setInterval(function(){
					document.querySelector('#deleted-modal p').innerText = countDown();
			},1000)
		}
	
		savedData.forEach((item, index)=>{
			if(index != curentIndex){
				newInfor.push(item);
			}
		})


	let confrimation = window.confirm("Are you sure you want to delete?");
	
	if(confrimation){		
		let newInfor = [];
		let savedData = fetchData();
		
	
		savedData.forEach((item, index)=>{
			if(index != curentIndex){
				newInfor.push(item);
			}
		})

		
		setTamplate(newInfor);


		if(newInfor.length >= 2){
			localStorage.savedText = JSON.stringify(newInfor)
		}else {
			if(newInfor.length ===  0){
				setTimeout(()=> {
					document.querySelector('#projects').innerHTML = `
					<article class="nothing">
						<aside>
							<h1>NO SAVED NOTES AT THE MOMENT!!!</h1>
							<p>Start adding...</p>
							<button onclick="startNotes()";>START</button>
						</aside>
					</article>
				`;
				}, 3200)
				localStorage.savedText = JSON.stringify(newInfor)
			}else {
				localStorage.savedText = JSON.stringify(newInfor)
			}
			
		}
			
		setUp();

	}
}
	
function countDown(){
	if(num > 0){
		num = num - 1;
	}if(num == 0 ){
		document.querySelector('#deleted-modal h3').innerText = 'Notes Deleted...';
		counter = false;
		fetchData()
		setTimeout(()=>window.location.reload(),12000)
		document.querySelector('#deleted-modal').classList.remove('open');
	}
	return num;
}


function saveData(){
	let newData = [];
	let timestampt = getTimestamp();
	let historyData = fetchData();
	
	let template = `
		<article class="note-wrapper">
			<h3>PROJECT NAME : <span>${Data.name}</span></h3>
			<p class="notes">${Data.notes}</p>
			<div class="btn-wrapper">
				<button onclick="deleteNote(this);">Delete</button>
			</div>
			<div class="timestamp">Created: ${timestampt}</div>
		</article>
	`;
	

	if(historyData == '[]'){
		newData.push(template);
		localStorage.savedText = JSON.stringify(newData);
		document.querySelector('#saved-modal').classList.add('open');
		console.log('note saved...')
	}else {
		newData.push(historyData);
		newData.push(template);
		
		localStorage.savedText = JSON.stringify(newData);
		document.querySelector('#saved-modal').classList.add('open');
	}
	
	setTimeout(()=> document.querySelector('#saved-modal').classList.remove('open'), 1000);
	console.log('note saved...')
	setTimeout(()=> clearValues(), 1000);
}

//CLEAR MODAL AND VALUES
function clearValues(){
	
	document.querySelector('#project-name').value = '';
	document.querySelector('#project-notes').value = '';
	
}

//SETTING DISPLAY TEMPLATE
function setTamplate(projects){
	let template;
	let projectData = [];
	projectData.push(projects); 
	
	
	projectData.forEach( project => {
		template += project;
	})


	if(projects.length >= 1){
		template = template.slice(10,template.length);
		document.querySelector('#projects').innerHTML = template;
	}else {	
		setTimeout(()=> {
			document.querySelector('#projects').innerHTML = `
			<article class="nothing">
				<aside>
					<h1>NO SAVED NOTES AT THE MOMENT!!!</h1>
					<p>Start adding...</p>
					<button onclick="startNotes()";>START</button>
				</aside>
			</article>
		`;
		})
	}


}

function closeModal(){
	window.location.reload();
}

function getTimestamp(){
	const Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	let time = new Date();
	
	const year = time.getFullYear();
	const month = Month[time.getMonth()];
	const day = time.getDate();
	let timestamp = time.toLocaleTimeString();
	
	time = `${day} ${month} ${year} (${timestamp})`;

	return time;
}

