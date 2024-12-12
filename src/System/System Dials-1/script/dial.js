const canvascpu = document.querySelector('.cpu-gauge-speed-arc');
const ctxcpu = canvascpu.getContext('2d');
const canvasgpu = document.querySelector('.gpu-gauge-speed-arc');
const ctxgpu = canvasgpu.getContext('2d');
const canvasram = document.querySelector('.ram-gauge-speed-arc');
const ctxram = canvasram.getContext('2d');
ctxram.font = '15px "Roboto Mono"';
ctxcpu.font = '15px "Roboto Mono"';
ctxgpu.font = '15px "Roboto Mono"';
const centerX = canvascpu.width / 2;
const centerY = canvascpu.height / 2;
const radius = centerX - 20;
const speedIncrement = 0.1;
var gradientStarCol = "#69ACDB";
var gradientEndCol = "#69DB8A";
var cpuSpeed = 0;
var currentCpuSpeed = 0;
var gpuSpeed = 0;
var currentGpuSpeed = 0;
var ramUsage = 0;
var currentRamUsage = 0;
var maxRam = 8;
var cpuName = '';
var gpuName = '';
var ramName = '';
var init = false;

function drawSpeedArc(speed, canvas) {
	if (canvas === "cpu") {
		const startAngle = -Math.PI * 11 / 9;
		const maxAngle = (Math.PI * 13 / 9);
		const endAngle = startAngle + (speed / 100) * maxAngle;

		const gradient = ctxcpu.createLinearGradient(centerX, centerY, centerX + radius * Math.cos(endAngle), centerY + radius * Math.sin(endAngle));
		gradient.addColorStop(0, gradientStarCol); // Start color
		gradient.addColorStop(1, gradientEndCol);
		ctxcpu.clearRect(0, 0, canvascpu.width, canvascpu.height);
		ctxcpu.beginPath();
		ctxcpu.arc(centerX, centerY, radius, startAngle, endAngle);
		ctxcpu.strokeStyle = gradient; // Customize this color
		ctxcpu.lineWidth = 15;
		ctxcpu.stroke();
		ctxcpu.closePath();

		drawMeasurements(canvas)
	}
	if (canvas === "gpu") {
		const startAngle = -Math.PI * 11 / 9;
		const maxAngle = (Math.PI * 13 / 9);
		const endAngle = startAngle + (speed / 100) * maxAngle;

		const gradient = ctxgpu.createLinearGradient(centerX, centerY, centerX + radius * Math.cos(endAngle), centerY + radius * Math.sin(endAngle));
		gradient.addColorStop(0, gradientStarCol); // Start color
		gradient.addColorStop(1, gradientEndCol);
		ctxgpu.clearRect(0, 0, canvasgpu.width, canvasgpu.height);
		ctxgpu.beginPath();
		ctxgpu.arc(centerX, centerY, radius, startAngle, endAngle);
		ctxgpu.strokeStyle = gradient; // Customize this color
		ctxgpu.lineWidth = 15;
		ctxgpu.stroke();
		ctxgpu.closePath();

		drawMeasurements(canvas)
	}
	if (canvas === "ram") {
		const startAngle = -Math.PI * 11 / 9;
		const maxAngle = (Math.PI * 13 / 9);
		const endAngle = startAngle + (speed / maxRam) * maxAngle;

		const gradient = ctxram.createLinearGradient(centerX, centerY, centerX + radius * Math.cos(endAngle), centerY + radius * Math.sin(endAngle));
		gradient.addColorStop(0, gradientStarCol); // Start color
		gradient.addColorStop(1, gradientEndCol);
		ctxram.clearRect(0, 0, canvasram.width, canvasram.height);
		ctxram.beginPath();
		ctxram.arc(centerX, centerY, radius, startAngle, endAngle);
		ctxram.strokeStyle = gradient; // Customize this color
		ctxram.lineWidth = 15;
		ctxram.stroke();
		ctxram.closePath();

		drawMeasurements(canvas)
	}
}

function drawMeasurements(canvas) {
	if (canvas === "cpu") {
		const startAngle = -Math.PI * 11 / 9;
		const maxAngle = (Math.PI * 13 / 9);
		const measurementRadius = radius - 20;
		const interval = 10;
		ctxcpu.textAlign = 'center';
		ctxcpu.textBaseline = 'middle';

		for (let i = 0; i <= 100; i += interval) {
			const angle = startAngle + (i / 100) * maxAngle;
			const x = centerX + measurementRadius * Math.cos(angle);
			const y = centerY + measurementRadius * Math.sin(angle);
			ctxcpu.fillStyle = i < 85 ? '#878787' : '#ff2525';
			ctxcpu.fillText(i.toString(), x, y);
		}
	}
	if (canvas === "gpu") {
		const startAngle = -Math.PI * 11 / 9;
		const maxAngle = (Math.PI * 13 / 9);
		const measurementRadius = radius - 20;
		const interval = 10;
		ctxgpu.textAlign = 'center';
		ctxgpu.textBaseline = 'middle';

		for (let i = 0; i <= 100; i += interval) {
			const angle = startAngle + (i / 100) * maxAngle;
			const x = centerX + measurementRadius * Math.cos(angle);
			const y = centerY + measurementRadius * Math.sin(angle);
			ctxgpu.fillStyle = i < 85 ? "#878787" : "#ff2525"
			ctxgpu.fillText(i.toString(), x, y);
		}
	}
	if (canvas === "ram") {
		const startAngle = -Math.PI * 11 / 9;
		const maxAngle = (Math.PI * 13 / 9);
		const measurementRadius = radius - 20;
		const interval = 1;
		ctxram.textAlign = 'center';
		ctxram.textBaseline = 'middle';

		for (let i = 0; i <= maxRam; i += interval) {
			const angle = startAngle + (i / maxRam) * maxAngle;
			const x = centerX + measurementRadius * Math.cos(angle);
			const y = centerY + measurementRadius * Math.sin(angle);
			ctxram.fillStyle = i < (maxRam * 0.85) ? "#878787" : "#ff2525"
			ctxram.fillText(i.toString(), x, y);
		}
	}
}

function animateNeedle(speed, canvas) {
	if (canvas === "cpu") {
		const needle = document.querySelector('.cpu-gauge-speed-needle');
		const maxRotation = 260; // Needle rotation in degrees
		const initialRotation = -130;
		const rotation = initialRotation + ((speed / 100) * maxRotation);
		needle.style.transform = `rotateZ(${rotation}deg)`;
	}
	if (canvas === "gpu") {
		const needle = document.querySelector('.gpu-gauge-speed-needle');
		const maxRotation = 260; // Needle rotation in degrees
		const initialRotation = -130;
		const rotation = initialRotation + ((speed / 100) * maxRotation);
		needle.style.transform = `rotateZ(${rotation}deg)`;
	}
	if (canvas === "ram") {
		const needle = document.querySelector('.ram-gauge-speed-needle');
		const maxRotation = 260; // Needle rotation in degrees
		const initialRotation = -130;
		const rotation = initialRotation + ((speed / maxRam) * maxRotation);
		needle.style.transform = `rotateZ(${rotation}deg)`;
	}
}

function animateCpuGauge() {
	var diff = cpuSpeed - currentCpuSpeed;
	if (Math.abs(diff) > 0) {
		if (cpuSpeed < 0) {
			cpuSpeed = 0;
		} else {
			currentCpuSpeed += (diff > 0 ? speedIncrement : (currentCpuSpeed - diff) < 0 ? 0 : -speedIncrement);
			requestAnimationFrame(animateCpuGauge);
		}
	} else {
		currentCpuSpeed = cpuSpeed;
	}
	drawSpeedArc(currentCpuSpeed, "cpu");
	animateNeedle(currentCpuSpeed, "cpu");
	document.getElementById("cpu-gauge-text").innerText = cpuSpeed.toFixed(1) + "%";
	document.getElementById("cpu-id-text").innerText = cpuName;
}

function animateGpuGauge() {
	var diff = gpuSpeed - currentGpuSpeed;
	if (Math.abs(diff) > 0) {
		if (currentGpuSpeed < 0) {
			currentGpuSpeed = 0;
		} else {
			currentGpuSpeed += (diff > 0 ? speedIncrement : -speedIncrement);
			requestAnimationFrame(animateGpuGauge);
		}
	} else {
		currentGpuSpeed = gpuSpeed;
	}
	drawSpeedArc(currentGpuSpeed, "gpu");
	animateNeedle(currentGpuSpeed, "gpu");
	document.getElementById("gpu-gauge-text").innerText = gpuSpeed.toFixed(1) + "%";
	document.getElementById("gpu-id-text").innerText = gpuName;
}

function animateRamGauge() {
	var diff = ramUsage - currentRamUsage;
	if (Math.abs(diff) > 0) {
		currentRamUsage += (diff > 0 ? speedIncrement : (currentRamUsage - diff) < 0 ? 0 : -speedIncrement);
		requestAnimationFrame(animateRamGauge);
	} else {
		currentRamUsage = ramUsage;
	}
	drawSpeedArc(currentRamUsage, "ram");
	animateNeedle(currentRamUsage, "ram");
	document.getElementById("ram-gauge-text").innerText = ramUsage.toFixed(1) + "GB";
	document.getElementById("ram-id-text").innerText = ramName;
}

function SucrosePropertyListener(name, val) {
	switch (name) {
		case "speedArcColor1":
			gradientStarCol = "#" + val.value.substring(3)
			break
		case "speedArcColor2":
			gradientEndCol = "#" + val.value.substring(3)
			break
		default:
			break
	}
}

function SucroseMemoryData(obj) {
	if (obj != null) {
		if (obj.State) {
			ramName = obj.Name;
			maxRam = obj.MemoryAvailable + obj.MemoryUsed;
			ramUsage = obj.MemoryUsed;
			animateRamGauge();
		}
	}
}

function SucroseGpuData(obj) {
	if (obj != null) {
		if (obj.State) {
			var amdGpu = obj.Amd;
			var intelGpu = obj.Intel;
			var nvidiaGpu = obj.Nvidia;

			let highestNow = -Infinity;

			let manufacturer = obj.Manufacturer;

			if (manufacturer == "Nvidia" && nvidiaGpu != null) {
				nvidiaGpu.forEach(gpu => {
					if (gpu.Type === "Load" && gpu.Now !== null && gpu.Now > highestNow) {
						highestNow = gpu.Now;
					}
				});

				gpuSpeed = highestNow;
			} else if (manufacturer == "Amd" && amdGpu != null) {
				amdGpu.forEach(gpu => {
					if (gpu.Type === "Load" && gpu.Now !== null && gpu.Now > highestNow) {
						highestNow = gpu.Now;
					}
				});

				gpuSpeed = highestNow;
			} else if (manufacturer == "Intel" && intelGpu != null) {
				intelGpu.forEach(gpu => {
					if (gpu.Type === "Load" && gpu.Now !== null && gpu.Now > highestNow) {
						highestNow = gpu.Now;
					}
				});

				gpuSpeed = highestNow;
			} else {
				gpuSpeed = 0;
			}

			gpuName = extractGpuModel(obj.Name);
			animateGpuGauge();
		}
	}
}

function SucroseCpuData(obj) {
	if (obj != null) {
		if (obj.State) {
			cpuSpeed = obj.Now;
			cpuName = extractCpuModel(obj.FullName);
			animateCpuGauge();
		}
	}
}

function extractCpuModel(cpuString) {
	if (/Intel/.test(cpuString)) {
		const intelRegex = /Core\(TM\)\s+(\w+-\w+)/;
		const match = cpuString.match(intelRegex);
		return match ? match[1] : null;
	}
	if (/AMD/.test(cpuString)) {
		const amdRegex = /AMD\s+(Ryzen\s+\d+\s+\d+)/;
		const match = cpuString.match(amdRegex);
		return match ? match[1] : null;
	}
	return "Unknown";
}

function extractGpuModel(gpuString) {
	if (/NVIDIA/.test(gpuString)) {
		const nvidiaRegex = /GeForce\s+(RTX\s+\d{4}\s?\w*|GTX\s+\d{4}\s?\w*)/i;
		const match = gpuString.match(nvidiaRegex);
		return match ? match[1] : null;
	}
	if (/AMD/.test(gpuString)) {
		const amdRegex = /Radeon\s+(RX\s+\d{4}\s?\w*)/i;
		const match = gpuString.match(amdRegex);
		return match ? match[1] : null;
	}
	if (/Intel/.test(gpuString)) {
		const intelRegex = /Intel\(R\)\s+(UHD|Iris\s+Xe)\s+Graphics/i;
		const match = gpuString.match(intelRegex);
		return match ? `Intel ${match[1]} Graphics` : null;
	}
	return "Unknown";
}

animateCpuGauge();
animateGpuGauge();
animateRamGauge();