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
