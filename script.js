function addStudentData(student) {
	let idElem = document.getElementById('id')
	idElem.innerHTML = student.id
	let studentIdElem = document.getElementById('studentId')
	studentIdElem.innerHTML = student.studentId
	let nameElem = document.getElementById('name')
	nameElem.innerHTML = `${student.name} ${student.surname}`
	let gpaElem = document.getElementById('gpa')
	gpaElem.innerHTML = student.gpa
	let profileElem = document.getElementById('image')
	profileElem.setAttribute('src', student.image)
}

function addStudentToTable(index, student) {
	const tableBody = document.getElementById('tableBody')
	let row = document.createElement('tr')
	let cell = document.createElement('th')
	cell.setAttribute('score', 'row')
	cell.innerHTML = index
	row.appendChild(cell)
	cell = document.createElement('td')
	cell.innerHTML = `${student.name} ${student.surname}`
	
	row.appendChild(cell)
	cell = document.createElement('td')
	let img = document.createElement('img')
	img.setAttribute('src', student.image)
    img.height = 200
	cell.appendChild(img)
	row.appendChild(cell)
	cell = document.createElement('td')
	cell.innerHTML = student.gender
	row.appendChild(cell)

    cell = document.createElement('td')
    let buttonEdit = document.createElement('button')
    buttonEdit.classList.add('btn')
    buttonEdit.classList.add('btn-primary')
    buttonEdit.setAttribute('type', 'button')
	buttonEdit.innerText = 'Edit'
    buttonEdit.addEventListener('click', (event) => { 

		let confirmMsg = confirm(`ต้องการแก้ไขข้อมูลของ ${student.name} หรือไม่`)
		if (confirmMsg) {
			hideAll()
			editUserDetail.style.display='block'	
			document.getElementById('editButton').addEventListener('click',function(){ // get ค่า หลังกด update
				updateStudent(student)			
			})	
		}
	})
    cell.appendChild(buttonEdit)
    row.appendChild(cell)


	cell = document.createElement('td')
	let buttonDelete = document.createElement('button')
	buttonDelete.classList.add('btn')
	buttonDelete.classList.add('btn-danger')
	buttonDelete.setAttribute('type', 'button')
	buttonDelete.innerText = 'delete'
	buttonDelete.addEventListener('click', (event) => { 

		let confirmMsg = confirm(`ต้องการลบข้อมูลของ ${student.name} หรือไม่`)
		if (confirmMsg) {
			deleteStudent(student.id)
		}
	})
	cell.appendChild(buttonDelete)
	row.appendChild(cell)
	tableBody.appendChild(row)

}


function addStudentToDB(student) {
    fetch('https://dv-student-backend-2019.appspot.com/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(student)
    }) .then((response) => {
        return response.json()
    }).then(data => {
		alert('Add student finish')
		showAllStudents()
    })
}

document.getElementById('searchButton').addEventListener('click', (event) => {
	let id = document.getElementById('inputText').value
	console.log(id)
	fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
	.then((response) => {
		return response.json()
	}).then((student) => { 
		hideAll()
		addStudentData(student)
		singleStudentResult.style.display = 'block'
	})
})

function addStudentList(studentList)  {
    let counter = 1
	document.getElementById('tableBody').innerHTML = ''
    for (student of studentList) {
        addStudentToTable(counter++,student)
    }
}

//ลบข้อมูล
function deleteStudent(id) {
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`, {
        method: 'DELETE'
    }).then((response) => {
        if (response.status === 200) {
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`student name ${data.name} is  deleted now`)
		showAllStudents()
    }).catch((error) => {
        alert('your student id is not in the database')
    })
}

//อัพเดทข้อมูลจากที่ edit


function editStudent(student){
	let studentEdit = {}
	studentEdit.id = student.id
	studentEdit.name = document.getElementById('nameEdit').value
	studentEdit.surname = document.getElementById('surnameEdit').value
	studentEdit.studentId = document.getElementById('studentIdEdit').value
	studentEdit.gpa = document.getElementById('gpaEdit').value
	studentEdit.image = document.getElementById('imageLinkEdit').value
return studentEdit
}


function updateStudent(student) {
    fetch('https://dv-student-backend-2019.appspot.com/students',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(editStudent(student))
    }).then(response =>{
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data=>{
        alert('Update successed')
    }).catch(error=>{
        alert('Cannot update')
    })
}
// จบเรื่อง edit



function onAddStudentClick() {
	let student = {}
	student.name = document.getElementById('nameInput').value
	student.surname = document.getElementById('surnameInput').value
	student.studentId = document.getElementById('studentIdInput').value
	student.gpa = document.getElementById('gpaInput').value
	student.image = document.getElementById('imageLinkInput').value
	addStudentToDB(student)
}

document.getElementById('addButton').addEventListener('click',(event) => {
	onAddStudentClick()
})

function showAllStudents() {
	fetch('https://dv-student-backend-2019.appspot.com/students')
	.then((response) => {
		return response.json()
	}).then(data => {
		addStudentList(data)
	})
}

function onLoad() {
	hideAll()
}

var singleStudentResult = document.getElementById('sinigle_student_result')
var listStudentResult = document.getElementById('output')
var addUserDetail = document.getElementById('addUserDetail')
var editUserDetail = document.getElementById('editUserDetail')

function hideAll() {
	singleStudentResult.style.display = 'none'
	listStudentResult.style.display = 'none'
	addUserDetail.style.display = 'none'
	editUserDetail.style.display='none'
}

document.getElementById('allStudentMenu').addEventListener('click', (event) => {
	hideAll()
	listStudentResult.style.display = 'block'
	showAllStudents()
})

document.getElementById('addStudentMenu').addEventListener('click', (event) => {
	hideAll()
	addUserDetail.style.display = 'block'
})

