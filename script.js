
const form = document.getElementById("evaluationForm");
const scoreInputs = document.querySelectorAll("[data-score]");
const totalScore = document.getElementById("totalScore");

function calculateScore() {
  let total = 0;

  scoreInputs.forEach((input) => {
    const value = Number(input.value) || 0;
    const max = Number(input.max) || 100;

    if (value >= 0 && value <= max) {
      total += value;
    }
  });

  if (totalScore) {
    totalScore.textContent = total;
  }

  return total;
}

scoreInputs.forEach((input) => {
  input.addEventListener("input", calculateScore);
});

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    data.totalScore = calculateScore();
    data.savedAt = new Date().toLocaleString("th-TH");

    const records = JSON.parse(
      localStorage.getItem("trainingEvaluations") || "[]"
    );

    records.push(data);
    localStorage.setItem(
      "trainingEvaluations",
      JSON.stringify(records)
    );

    alert("บันทึกผลการประเมินเรียบร้อยแล้ว");
    form.reset();
    calculateScore();
  });
}

const showRecordsButton =
  document.getElementById("showRecords");

if (showRecordsButton) {
  showRecordsButton.addEventListener("click", () => {
    const records = JSON.parse(
      localStorage.getItem("trainingEvaluations") || "[]"
    );

    alert(
      records.length
        ? JSON.stringify(records, null, 2)
        : "ยังไม่มีข้อมูลการประเมิน"
    );
  });
}

const clearRecordsButton =
  document.getElementById("clearRecords");

if (clearRecordsButton) {
  clearRecordsButton.addEventListener("click", () => {
    if (confirm("ต้องการลบข้อมูลการประเมินทั้งหมดหรือไม่?")) {
      localStorage.removeItem("trainingEvaluations");
      alert("ลบข้อมูลเรียบร้อยแล้ว");
    }
  });
}

const printButton = document.getElementById("printPage");

if (printButton) {
  printButton.addEventListener("click", () => window.print());
}

calculateScore();
