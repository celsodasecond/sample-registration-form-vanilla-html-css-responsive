const form = document.querySelector("form"),
	nextBtn = form.querySelector(".nextBtn"),
	backBtn = form.querySelector(".backBtn"),
	allInput = form.querySelectorAll(".first input"),
	chooseFile = document.querySelector("#chooseFile");

// Page Navigation Logic
nextBtn.addEventListener("click", ()=> {
    allInput.forEach(input => {
        if(input.value != ""){
            form.classList.add('secActive');
        }else{
            form.classList.remove('secActive');
        }
    })
})

backBtn.addEventListener("click", () => form.classList.remove("secActive"));

// Photo Upload Frontend Logic
chooseFile.addEventListener("change", function () {
	var filename = chooseFile.value;
	console.log(filename);
	if (/^\s*$/.test(filename)) {
		document.querySelector(".file-upload").classList.remove("active");
		document.querySelector("#noFile").textContent = "No file chosen...";
	} else {
		document.querySelector(".file-upload").classList.add("active");
		document.querySelector("#noFile").textContent = filename.replace(
			"C:\\fakepath\\",
			""
		);
	}
});

// Tel Input Logic
// select all input elements with type 'tel'
const inputs = document.querySelectorAll("input[type='tel']");

// loop through each input element and attach event listeners
inputs.forEach(input => {
  input.addEventListener("change", formatPhoneNumber);
  input.addEventListener("keyup", formatPhoneNumber);
  input.addEventListener("paste", formatPhoneNumber);
});

// function to format phone numbers
function formatPhoneNumber(e) {
  let output;
  const input = this.value;

  if (e.keyCode !== 8) {
    const numbersOnly = input.replace(/[^0-9]/g, '');
    const area = numbersOnly.substr(0, 3);
    const pre = numbersOnly.substr(3, 3);
    const tel = numbersOnly.substr(6, 4);

    if (area.length < 3) {
      output = `(${area}`;
    } else if (area.length === 3 && pre.length < 3) {
      output = `(${area}) ${pre}`;
    } else if (area.length === 3 && pre.length === 3) {
      output = `(${area}) ${pre}-${tel}`;
    }

    this.value = output;
  }
}

// Submit Alert Logic
const submitBtn = document.querySelectorAll(".submit")

submitBtn.forEach((button) => {
	button.addEventListener("click", (event) => {
		event.preventDefault();
		if (confirm("Are you sure you want to submit the form?")) {
			// Submit the form
			button.closest("form").submit();
		}
	});
});

// Cities and Municipalities Logic
fetch(
	"/assets/philippine_provinces_cities_municipalities_and_barangays_2019v2.json"
)
	.then((response) => response.json())
	.then((json) => {
		const provinceSelect = document.getElementById("province-select");
		const municipalitySelect = document.getElementById("municipality-select");
		const provinces = {};
		Object.values(json).forEach((region) => {
			const provinceList = region.province_list;
			Object.keys(provinceList).forEach((province) => {
				provinces[province] = Object.keys(
					provinceList[province].municipality_list
				);
				const option = document.createElement("option");
				option.value = province;
				option.textContent = province;
				provinceSelect.appendChild(option);
			});
		});

		provinceSelect.addEventListener("change", () => {
			municipalitySelect.innerHTML = "";
			const selectedProvince = provinceSelect.value;
			const municipalities = provinces[selectedProvince];
			municipalities.forEach((municipality) => {
				const option = document.createElement("option");
				option.value = municipality;
				option.textContent = municipality;
				municipalitySelect.appendChild(option);
			});
		});
	});

