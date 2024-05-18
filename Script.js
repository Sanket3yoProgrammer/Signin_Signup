        document.querySelector("#sign-in-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        fetch("/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              document.querySelector("#sign-in-error").textContent = data.error;
            } else {
              // Sign in successful, redirect to next page
              window.location.href = "/nextpage";
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });

      document.querySelector("#sign-up-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.querySelector("#username").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              document.querySelector("#sign-up-error").textContent = data.error;
            } else {
              // Sign up successful, redirect to next page
              window.location.href = "/nextpage";
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
