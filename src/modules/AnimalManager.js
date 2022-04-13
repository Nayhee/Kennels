const remoteURL = "http://localhost:8088"

export const getAnimalById = (animalId) => {
  //be sure your animals have good data and related to a location and customer
  return fetch(`${remoteURL}/animals/${animalId}?_expand=location&_expand=customer`)
  .then(res => res.json())
}

export const getAllAnimals = () => {
  return fetch(`${remoteURL}/animals`)
  .then(res => res.json())
}

export const deleteAnimal = id => {
    return fetch(`${remoteURL}/animals/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}

export const addAnimal = newAnimal => {
  return fetch(`${remoteURL}/animals`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newAnimal)
  }).then(response => response.json())
}

export const updateAnimal  = (editedAnimal) => {
	return fetch(`${remoteURL}/animals/${editedAnimal.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(editedAnimal)
	}).then(data => data.json());
}

export const getRandomId = () => {
  return fetch(`${remoteURL}/animals`)
    .then(result => result.json())
    .then(animals => animals.filter(animal => animal.isDischarged !== "true"))
    .then(activeAnimals => {
      const randomIndex = Math.floor(Math.random() * activeAnimals.length);
      const randomAnimal = activeAnimals[randomIndex];
      return randomAnimal.id;
  });
}

export const getAllActiveAnimals = () => {
  return fetch(`${remoteURL}/animals?isDischarged=false&_sort=date&_order=asc`)
  .then(res => res.json())
}

export const getDischargedAnimals = () => {
  return fetch(`${remoteURL}/animals?isDischarged=true&_sort=dischargedDate&_order=asc`)
  .then(dischargedAnimals => dischargedAnimals.json())
}