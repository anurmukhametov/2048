class Cell {
	constructor(id) {
		this.$el = document.getElementById(id);
		this.$sum = 0;
		this.$el.innerText = this.$sum;
		this.$styleName = "style_0";
	}
	set sum(value) {
		this.$sum = value % 2 === 0 ? value : 0;
	}
	get sum() {
		return this.$sum;
	}
	get isEmpty() {
		return this.sum === 0;
	}
	reset() {
		this.sum = 0;
	}
	update() {
		if (!this.isEmpty) {
			this.sum = this.sum * 2;
			this.animationStart("animation_update");
			const score = document.getElementById("score");
			score.innerText = Number(score.innerText) + this.sum;
		}
	}
	spawn() {
		if (Math.random() >= 0.1) this.sum = 2;
		else this.sum = 4;
		this.animationStart("animation_spawn");
	}
	paint() {
		this.$el.classList.remove(this.$styleName);
		this.$styleName = `style_${this.sum}`;
		this.$el.classList.add(this.$styleName);
		this.$el.innerText = this.sum !== 0 ? this.sum : "";
		let h = document.getElementById("11").clientHeight;
		this.$el.style.lineHeight = `${h}px`;
	}
	animationStart(animationName) {
		this.$el.classList.add(animationName);
		this.$el.addEventListener("animationend", this.animationHandler, false);
	}
	animationHandler(event) {
		let id = event.target.id;
		let element = document.getElementById(id);
		element.classList.remove(event.animationName);
	}
}

export default Cell;
