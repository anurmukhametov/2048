//#region RIGHT
function rightSwipe(array) {
	if (isRightShift(array)) {
		for (let i = 0; i < array.length; i++) {
			for (let j = array.length - 1; j > 0; j--) {
				rightShift(array[i]);
				if (array[i][j].sum === array[i][j - 1].sum) {
					array[i][j].update();
					array[i][j - 1].reset();
				}
			}
		}
		spawnCell(array);
	}
	paintCell(array);
}

function rightShift(array) {
	let k = null;
	for (let j = array.length - 1; j >= 0; j--) {
		if (array[j].isEmpty && k === null) {
			k = j;
		}
		if (!array[j].isEmpty && k !== null) {
			array[k].sum = array[j].sum;
			array[j].reset();
			k--;
		}
	}
}

function isRightShift(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length - 1; j++) {
			if (array[i][j].isEmpty) continue;
			if (
				array[i][j].sum === array[i][j + 1].sum ||
				array[i][j + 1].isEmpty
			)
				return true;
		}
	}
	return false;
}
//#endregion

//#region LEFT
function leftSwipe(array) {
	if (isLeftShift(array)) {
		for (let i = 0; i < array.length; i++) {
			for (let j = 0; j < array.length - 1; j++) {
				leftShift(array[i]);
				if (array[i][j].sum === array[i][j + 1].sum) {
					array[i][j].update();
					array[i][j + 1].reset();
				}
			}
		}
		spawnCell(array);
	}
	paintCell(array);
}

function leftShift(array) {
	let k = null;
	for (let j = 0; j < array.length; j++) {
		if (array[j].isEmpty && k === null) {
			k = j;
		}
		if (!array[j].isEmpty && k !== null) {
			array[k].sum = array[j].sum;
			array[j].reset();
			k++;
		}
	}
}

function isLeftShift(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = array.length - 1; j > 0; j--) {
			if (array[i][j].isEmpty) continue;
			if (
				array[i][j].sum === array[i][j - 1].sum ||
				array[i][j - 1].isEmpty
			)
				return true;
		}
	}
	return false;
}
//#endregion

//#region UP
function upSwipe(array) {
	if (isUpShift(array)) {
		for (let j = 0; j < array.length; j++) {
			for (let i = 0; i < array.length - 1; i++) {
				const verticalCellArray = new Array();
				array.forEach((array) => {
					array.forEach((element, index) => {
						if (index === j) verticalCellArray.push(element);
					});
				});
				upShift(verticalCellArray);
				verticalCellArray.forEach((element, index) => {
					array[index][j].sum = element.sum;
				});

				if (array[i][j].sum === array[i + 1][j].sum) {
					array[i][j].update();
					array[i + 1][j].reset();
				}
			}
		}
		spawnCell(array);
	}
	paintCell(array);
}

function upShift(array) {
	let k = null;
	for (let j = 0; j < array.length; j++) {
		if (array[j].isEmpty && k === null) {
			k = j;
		}
		if (!array[j].isEmpty && k !== null) {
			array[k].sum = array[j].sum;
			array[j].reset();
			k++;
		}
	}
}

function isUpShift(array) {
	for (let i = array.length - 1; i > 0; i--) {
		for (let j = 0; j < array.length; j++) {
			if (array[i][j].isEmpty) continue;
			if (
				array[i][j].sum === array[i - 1][j].sum ||
				array[i - 1][j].isEmpty
			)
				return true;
		}
	}

	return false;
}
//#endregion

//#region DOWN
function downSwipe(array) {
	if (isDownShift(array)) {
		for (let j = 0; j < array.length; j++) {
			for (let i = array.length - 1; i > 0; i--) {
				const verticalCellArray = new Array();
				array.forEach((array) => {
					array.forEach((element, index) => {
						if (index === j) verticalCellArray.push(element);
					});
				});
				downShift(verticalCellArray);
				verticalCellArray.forEach((element, index) => {
					array[index][j].sum = element.sum;
				});

				if (array[i][j].sum === array[i - 1][j].sum) {
					array[i][j].update();
					array[i - 1][j].reset();
				}
			}
		}
		spawnCell(array);
	}
	paintCell(array);
}

function downShift(array) {
	let k = null;
	for (let j = array.length - 1; j >= 0; j--) {
		if (array[j].isEmpty && k === null) k = j;
		if (!array[j].isEmpty && k !== null) {
			array[k].sum = array[j].sum;
			array[j].reset();
			k--;
		}
	}
}

function isDownShift(array) {
	for (let i = 0; i < array.length - 1; i++) {
		for (let j = 0; j < array.length; j++) {
			if (array[i][j].isEmpty) continue;
			if (
				array[i][j].sum === array[i + 1][j].sum ||
				array[i + 1][j].isEmpty
			)
				return true;
		}
	}
	return false;
}
//#endregion

//#region SPAWN, PAINT
function spawnCell(array) {
	if (!isFilled(array)) {
		let i = 0;
		let j = 0;
		do {
			i = Math.floor(Math.random() * array.length);
			j = Math.floor(Math.random() * array.length);
		} while (!array[i][j].isEmpty);
		array[i][j].spawn();
	}
}

function paintCell(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			array[i][j].paint();
		}
	}
}

function isFilled(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			if (array[i][j].isEmpty) {
				return false;
			}
		}
	}
	return true;
}
//#endregion

export {
	rightSwipe,
	leftSwipe,
	upSwipe,
	downSwipe,
	spawnCell,
	paintCell,
	isFilled,
};
