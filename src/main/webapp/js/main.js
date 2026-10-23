document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const form = document.getElementById("point-form");
    const toast = document.getElementById("toast");
    const xButtons = document.querySelectorAll(".x-btn");
    const xHidden = document.getElementById("x-hidden");
    const yInput = document.getElementById("y-input");
    const rSelect = document.getElementById("r-select");
    let toastTimeout;

    xButtons.forEach(button => {
        button.addEventListener("click", function() {
            xButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            xHidden.value = this.value;
        });
    });

    function showToast(message) {
        toast.innerHTML = message;
        toast.classList.remove("hidden");
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.add("hidden");
        }, 3000);
    }

    function getSelectedR() {
        return rSelect ? parseFloat(rSelect.value) : null;
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
        const scale = 25;
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

    const initialR = getSelectedR() || 5;
    drawCanvas(initialR);

    rSelect.addEventListener("change", (e) => {
        drawCanvas(parseFloat(e.target.value));
    });

    form.addEventListener("submit", (e) => {
        let errors = [];

        if (xHidden.value.trim() === "") {
            errors.push("Enter X");
        }

        let yValStr = yInput.value.replace(",", ".");
        let yVal = parseFloat(yValStr);

        if (yValStr.trim() === "" || isNaN(yVal)) {
            errors.push("Enter correct Y");
        } else if (yVal <= -3 || yVal >= 3) {
            errors.push("Y should be between (-3 ... 3)");
        }

        const rVal = getSelectedR();
        if (!rVal) {
            errors.push("Choose R");
        }

        if (errors.length > 0) {
            e.preventDefault();
            showToast(errors.join("<br>"));
            return;
        }

        yInput.value = yVal;
    });

    canvas.addEventListener("click", (e) => {
        const rVal = getSelectedR();
        if (!rVal) {
            showToast("Choose R");
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 25;

        const x = (clickX - centerX) / scale;
        const y = (centerY - clickY) / scale;

        const hiddenForm = document.createElement('form');
        hiddenForm.method = 'POST';
        hiddenForm.action = form.action;

        const xInp = document.createElement('input'); xInp.name = 'x'; xInp.value = x.toFixed(3);
        const yInp = document.createElement('input'); yInp.name = 'y'; yInp.value = y.toFixed(3);
        const rInp = document.createElement('input'); rInp.name = 'r'; rInp.value = rVal;

        hiddenForm.appendChild(xInp);
        hiddenForm.appendChild(yInp);
        hiddenForm.appendChild(rInp);

        document.body.appendChild(hiddenForm);
        hiddenForm.submit();
    });
});