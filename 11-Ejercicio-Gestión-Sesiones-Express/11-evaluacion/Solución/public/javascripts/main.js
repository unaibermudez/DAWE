$(document).ready(function(){
	$('.deleteUser').on('click', deleteUser);
	$('.dataUser').on('click', dataUser);
});

var usuEdit = ""

function deleteUser(){
    var confirmation = confirm('Are You Sure?');
	if(confirmation){
		fetch("/users/delete/" +$(this).data('id'), {
			method: 'DELETE',
		}).then(function (){
			window.location.replace('/users')
		});
	} else {
		return false;
	}
}

function dataUser(){
	fetch("/users/find/" +$(this).data('id'), {
		method: 'POST',
	}).then(res=>res.json()).then(res=> {
		console.log(res);
		console.log(res.first_name)
		usuEdit = res._id;
		document.getElementById("first_name").value = res.first_name;
		document.getElementById("last_name").value = res.last_name;
		document.getElementById("email").value = res.email;
		document.getElementById("form").action = "/users/update/"+usuEdit;
		document.getElementById("boton").value = 'Editar';
	});
}