window.onload = () => {
	
	fetch("https://api.github.com/users/unaibermudez")
		.then(response => response.json())
		.then(response => {
			console.log(response);
			
			// El nombre de usuario como encabezado
			let h1 = document.createElement("h1");
			h1.innerText = `${response["login"]} (${response["name"]})`;
			document.body.appendChild(h1);
			
			// Incluimos la foto de perfil
			let img = document.createElement("img");
			img.src = response["avatar_url"];
			img.width = 200;
			img.height = 200;
			document.body.appendChild(img);
			
			// Un <hr>
			document.body.appendChild(document.createElement("hr"));
			
			// Un enlace al perfil
			let a = document.createElement("a");
			a.innerText = "Enlace al perfil";
			a.href = response["html_url"];
			document.body.appendChild(a);
			
			let h2 = document.createElement("h2");
			h2.innerText = "Estadísticas";
			document.body.appendChild(h2);
			
			let p = document.createElement("p");
			p.innerText = `De ${response["location"]}`;
			document.body.appendChild(p);
			
			document.body.insertAdjacentHTML(
				"beforeend",
				`<ul>
					<li>Seguidores: ${response["followers"]}</li>
					<li>Siguiendo: ${response["following"]}</li>
					<li>Repositorios públicos: ${response["public_repos"]}</li>
				</ul>`
			);
		}
	);
}