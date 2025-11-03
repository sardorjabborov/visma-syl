// DOM elementlarini tanlab olamiz
const form = document.getElementById("contactForm");
const responseText = document.getElementById("responseText");

// Backend URL (Render’da deploy qilingan)
const BACKEND_URL = "https://visma-backend.onrender.com/message"; // 🔹 Shu yerga Render URL yozing

// Forma yuborilganda
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // sahifa qayta yuklanmasin

  // Inputlardan qiymatlarni olish
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Yuborish tugmasini vaqtincha o‘chirib qo‘yamiz
  const submitBtn = form.querySelector("button");
  submitBtn.disabled = true;
  submitBtn.textContent = "Yuborilmoqda...";

  try {
    // So‘rov yuborish
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (data.success) {
      responseText.textContent = "✅ Xabaringiz muvaffaqiyatli yuborildi!";
      responseText.style.color = "green";
      form.reset();
    } else {
      responseText.textContent = "⚠️ " + (data.error || "Xabar yuborishda xato.");
      responseText.style.color = "red";
    }
  } catch (error) {
    console.error("❌ Xabar yuborishda xatolik:", error);
    responseText.textContent = "❌ Server bilan aloqa o‘rnatilmadi.";
    responseText.style.color = "red";
  } finally {
    // Tugmani yana faollashtiramiz
    submitBtn.disabled = false;
    submitBtn.textContent = "Yuborish";
  }
});
