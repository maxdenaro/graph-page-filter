class GraphPageFilter {
	constructor(selector, options) {
		let defaultOptions = {
			highlightClass: 'filter-highlight',
			childClass:'filter-element',
			hiddenClass: 'filter-hidden',
			onInput: () => {

			}
		}
		this.options = Object.assign(defaultOptions, options);
		this.input = document.querySelector(selector);
		this.itemParent = document.querySelector(`[data-items-target="${this.input.dataset.items}"]`);
		this.items = this.itemParent.querySelectorAll(`.${this.options.childClass}`);
		this.rex = /(<span.+?>)(.+?)(<\/span>)/g;
		this.rexAtt = 'gi';
		this.event();
	}

	event() {
		if (this.input) {
			this.input.addEventListener('input', (e) => {
				if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
					return false;
				} else {
					let filterText = e.currentTarget.value;

					if (filterText.length) {
						this.clear();

						[].filter.call(this.items, (item) => {
							if (item.textContent.toUpperCase().includes(filterText.toUpperCase())) {


								let newHtml = item.textContent;
								item.innerHTML = newHtml.replace(
									new RegExp(filterText, this.rexAtt), (match) => {
										return [`<span class="${this.options.highlightClass}">${match}</span>`].join("");
									}
								);
							} else {
								item.classList.add(this.options.hiddenClass);
							}
						});
					} else {
						this.clear();
					}
				}

				this.options.onInput(this);
			});
		}
	}

  clear() {
    this.items.forEach(item => {
      item.classList.remove(this.options.hiddenClass);
      item.innerHTML = `${item.innerHTML.replace(new RegExp(this.rex), "$2")}`;
    });
  }
}
