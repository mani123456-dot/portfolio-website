document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const res = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    console.log(data); // 👈 IMPORTANT

    document.getElementById("status").innerText =
      data.success ? "Message sent ✅" : "Error ❌";

  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Server not reachable ❌";
  }
});