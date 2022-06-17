const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);

  const fd = new FormData();

  fd.append("token", response.credential);
  // fd.append("name", "dongs");

  fetch("http://localhost:3000/login", {
    method: "post",
    body: fd,
  });
}
window.onload = function () {
  google.accounts.id.initialize({
    client_id:
      "263177889967-pudk6tkq57htrislo8v3v1qppsi69cmb.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" } // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
};
