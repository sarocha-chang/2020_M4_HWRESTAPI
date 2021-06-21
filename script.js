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
	//cell.innerHTML = student.username
	let img = document.createElement('img')
	img.setAttribute('src', student.image)
    img.height = 200
    // img.classList.add('img-thumbnail')
	cell.appendChild(img)
	row.appendChild(cell)
	cell = document.createElement('td')
	cell.innerHTML = student.gender
	row.appendChild(cell)

	cell = document.createElement('td')
	let button = document.createElement('button')
	button.classList.add('btn')
	button.classList.add('btn-danger')
	button.setAttribute('type', 'button')
	button.innerText = 'delete'
	button.addEventListener('click', (event) => { 

		let confirmMsg = confirm(`ท่านต้องการลบคุณ ${student.name} หรือไม่`)
		if (confirmMsg) {
			deleteStudent(student.id)
		}
	})
	cell.appendChild(button)
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
        // console.log('success',data)
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
        alert(`student name ${data.name} is now deleted`)
		showAllStudents()
    }).catch((error) => {
        alert('your input student id is not in the database')
    })
}

function editStudent(student) {
	fetch('https://dv-student-backend-2019.appspot.com/students', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body:JSON.stringify(student)
}) .then((response) => {
	return response.json()
}).then(data => {
	// console.log('success',data)
	showAllStudents()
})
}

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
	// showAllStudents()
	hideAll()


	// fetch('https://dv-student-backend-2019.appspot.com/student')
	// .then((response) => {
	// 	return response.json()
	// }).then(data => {
	// 	addStudentData(data)
	// })
}

// function onLoad() {
//     student = {
//         name: "Bantita",
//         surname: "Boonyadate",
//         studentId: "632110343",
//         gpa: "3.50",
//         image: "https://mpics.mgronline.com/pics/Images/561000012797202.JPEG"
//     }
//     addStudentToDB(student)
// }

// function onLoad() {
//     deleteStudent(46)
// }

var singleStudentResult = document.getElementById('sinigle_student_result')
var listStudentResult = document.getElementById('output')
var addUserDetail = document.getElementById('addUserDetail')

function hideAll() {
	singleStudentResult.style.display = 'none'
	listStudentResult.style.display = 'none'
	addUserDetail.style.display = 'none'
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

document.getElementById('editButton').addEventListener('click', (event) => {

})