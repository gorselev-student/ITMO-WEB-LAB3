document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const form = document.getElementById("point-form");
    const toast = document.getElementById("toast");
    let toastTimeout;

    function showToast(message) {
        toast.innerHTML = message;
        toast.classList.remove("hidden");
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.add("hidden");
        }, 3000);
    }

    function getSelectedR() {
        const rChecked = document.querySelector('input[name="r"]:checked');
        return rChecked ? parseFloat(rChecked.value) : null;
    }

    const history = [];
    document.querySelectorAll("#results-table tbody tr").forEach(row => {
        const cells = row.querySelectorAll("td");
        if (cells.length >= 4) {
            history.push({
                x: parseFloat(cells[0].innerText),
                y: parseFloat(cells[1].innerText),
                r: parseFloat(cells[2].innerText),
                hit: cells[3].classList.contains("hit")
            });
        }
    });

    function drawCanvas(r) {
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 40;
        const rPx = r * scale;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "rgba(52, 152, 219, 0.5)";
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, rPx, Math.PI, 1.5 * Math.PI);
        ctx.fill();
        ctx.fillRect(centerX - rPx, centerY, rPx, rPx);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + rPx, centerY);
        ctx.lineTo(centerX, centerY + rPx / 2);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.moveTo(0, centerY); ctx.lineTo(width, centerY);
        ctx.moveTo(centerX, 0); ctx.lineTo(centerX, height);
        ctx.stroke();
        history.forEach(point => {
            drawPoint(point.x, point.y, point.r === r, point.hit, scale);
        });
    }

    function drawPoint(x, y, isCurrentR, isHit, scale) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const canvasX = centerX + x * scale;
        const canvasY = centerY - y * scale;
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI);

        if (!isCurrentR) {
            ctx.fillStyle = "#7f8fa6";
        } else if (isHit) {
            ctx.fillStyle = "#44bd32";
        } else {
            ctx.fillStyle = "#e84118";
        }
        ctx.fill();
    }

    const initialR = getSelectedR() || 3;
    drawCanvas(initialR);
    document.querySelectorAll('input[name="r"]').forEach(radio => {
        radio.addEventListener("change", (e) => {
            drawCanvas(parseFloat(e.target.value));
        });
    });

    form.addEventListener("submit", (e) => {
        let errors = [];
        const xInput = document.getElementById("x-input");
        let xValStr = xInput.value.replace(",", ".");
        let xVal = parseFloat(xValStr);

        if (xValStr.trim() === "" || isNaN(xVal)) {
            errors.push("Введите корректный X");
        } else if (xVal <= -3 || xVal >= 5) {
            errors.push("X должен быть в интервале (-3 ... 5)");
        }

        const yChecked = document.querySelector('input[name="y"]:checked');
        if (!yChecked) {
            errors.push("Выберите координату Y");
        }

        const rChecked = getSelectedR();
        if (!rChecked) {
            errors.push("Выберите радиус R");
        }

        if (errors.length > 0) {
            e.preventDefault();
            showToast(errors.join("<br>"));
            return;
        }
        xInput.value = xVal;
    });

    canvas.addEventListener("click", (e) => {
        const rVal = getSelectedR();
        if (!rVal) {
            showToast("Enter R at first");
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 40;
        const x = (clickX - centerX) / scale;
        const y = (centerY - clickY) / scale;

        const hiddenForm = document.createElement('form');
        hiddenForm.method = 'POST';
        hiddenForm.action = form.action;

        const xInp = document.createElement('input'); xInp.name = 'x'; xInp.value = x.toFixed(3);
        const yInp = document.createElement('input'); yInp.name = 'y'; yInp.value = Math.round(y);
        const rInp = document.createElement('input'); rInp.name = 'r'; rInp.value = rVal;

        hiddenForm.appendChild(xInp);
        hiddenForm.appendChild(yInp);
        hiddenForm.appendChild(rInp);
        document.body.appendChild(hiddenForm);
        hiddenForm.submit();
    });
});