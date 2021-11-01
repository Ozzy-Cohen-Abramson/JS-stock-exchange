class Head {
  constructor(element) {
    const header = document.createElement("div");
    header.innerHTML = `<h1> Search Nasdaq Stocks </h1>`;
    element.appendChild(header);
  }
}

class Input {
  constructor(element) {
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("search-input");
    input.id = "search-input";
    input.placeholder = "Search for stocks";
    form.appendChild(input);

    const btn = document.createElement("button");
    btn.id = "search-button";
    btn.textContent = "search";
    btn.classList.add("btn");
    btn.classList.add("btn-success");
    form.appendChild(btn);

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      this.callback(input.value);
      input.value = "";
    });

    element.appendChild(form);
  }

  onSearch(callback) {
    this.callback = callback;
  }
}
