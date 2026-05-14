const canvas = document.getElementById("trafficChart");

function drawTrafficChart() {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const padding = 38;
  const data = [28, 36, 45, 41, 58, 69, 74, 90, 84, 102, 118, 132];
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const max = Math.max(...data);
  const min = Math.min(...data);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101827";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i += 1) {
    const y = padding + i * ((height - padding * 2) / 4);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  const points = data.map((value, index) => {
    const x = padding + index * ((width - padding * 2) / (data.length - 1));
    const y = height - padding - ((value - min) / (max - min)) * (height - padding * 2);
    return { x, y, value };
  });

  const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
  gradient.addColorStop(0, "rgba(15, 118, 110, 0.44)");
  gradient.addColorStop(1, "rgba(217, 95, 67, 0.04)");

  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.lineTo(width - padding, height - padding);
  ctx.lineTo(padding, height - padding);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.strokeStyle = "#2dd4bf";
  ctx.lineWidth = 4;
  ctx.stroke();

  points.forEach((point, index) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, index === points.length - 1 ? 6 : 4, 0, Math.PI * 2);
    ctx.fillStyle = index === points.length - 1 ? "#d95f43" : "#f8fafc";
    ctx.fill();
  });

  ctx.fillStyle = "#d7e2ea";
  ctx.font = "700 15px Arial";
  ctx.fillText("Website Traffic Pipeline", padding, 28);
  ctx.fillStyle = "#8ea3b8";
  ctx.font = "700 11px Arial";
  labels.forEach((label, index) => {
    if (index % 2 === 0 || index === labels.length - 1) {
      ctx.fillText(label, points[index].x - 10, height - 12);
    }
  });
}

drawTrafficChart();
window.addEventListener("resize", drawTrafficChart);

const copyEmailButton = document.querySelector("[data-copy-email]");

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.copyEmail;

    try {
      await navigator.clipboard.writeText(email);
      copyEmailButton.textContent = "Copied";
      copyEmailButton.classList.add("copied");
      setTimeout(() => {
        copyEmailButton.textContent = "Copy email";
        copyEmailButton.classList.remove("copied");
      }, 1800);
    } catch {
      window.prompt("Copy this email address:", email);
    }
  });
}
