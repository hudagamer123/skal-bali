const tanggalSKAL = new Date("2026-10-23T08:00:00");

const countdown = document.querySelector("#countdown");

function hitungCountdown() {
    const sekarang = new Date();
    const selisih = tanggalSKAL - sekarang;

    const hari = Math.ceil(
        selisih / (1000 * 60 * 60 * 24)
    );

    if (hari > 0) {
        countdown.textContent = hari + " HARI LAGI";
    } else if (hari === 0) {
        countdown.textContent = "HARI INI! 🎉";
    } else {
        countdown.textContent = "SKAL SUDAH DIMULAI!";
    }
}

hitungCountdown();


const checklist = document.querySelectorAll(
    '.preparation input[type="checkbox"]'
);

const progress = document.querySelector("#progress");

function updateProgress() {
    let jumlah = 0;

    checklist.forEach(function(item) {
        if (item.checked) {
            jumlah++;
        }
    });

    progress.textContent =
        jumlah + " / " + checklist.length + " barang sudah disiapkan.";
}

checklist.forEach(function(item) {
    item.addEventListener("change", updateProgress);
});

updateProgress();


const travelForm = document.querySelector("#travelForm");

const dayInput = document.querySelector("#day");
const dateInput = document.querySelector("#date");
const placeInput = document.querySelector("#place");
const storyInput = document.querySelector("#story");

const reportList = document.querySelector("#reportList");


function simpanLaporan(laporanBaru) {
    let laporan = JSON.parse(
        localStorage.getItem("laporanSKAL")
    ) || [];

    laporan.push(laporanBaru);

    localStorage.setItem(
        "laporanSKAL",
        JSON.stringify(laporan)
    );
}


travelForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const laporanBaru = {
        day: dayInput.value,
        date: dateInput.value,
        place: placeInput.value,
        story: storyInput.value
    };

    simpanLaporan(laporanBaru);

    travelForm.reset();

    tampilkanLaporan();

    alert("Laporan berhasil disimpan!");
});


function tampilkanLaporan() {
    const laporan = JSON.parse(
        localStorage.getItem("laporanSKAL")
    ) || [];

    reportList.innerHTML = "";

    laporan.forEach(function(item) {
        const card = document.createElement("article");

        card.innerHTML = `
            <h3>Hari ke-${item.day}</h3>
            <p><strong>Tanggal:</strong> ${item.date}</p>
            <p><strong>Tempat:</strong> ${item.place}</p>
            <p>${item.story}</p>

            <button class="delete-button">Hapus</button>
        `;

        const deleteButton = card.querySelector(".delete-button");

        reportList.appendChild(card);
    });
}

tampilkanLaporan();