// =========================================================
// FİYAT, İNDİRİM & İLETİŞİM AYARLARI
// Ctrl + F ile "stepPrices" aratabilirsin.
// Her ligin 4 sayisi: [IV->III, III->II, II->I, I->UstLig] fiyatidir.
// =========================================================
const tiers = [
    { id: "iron", name: "Demir", color: "#78716c", stepPrices: [30, 30, 30, 30] },
    { id: "bronze", name: "Bronz", color: "#b45309", stepPrices: [40, 40, 40, 40] },
    { id: "silver", name: "Gümüş", color: "#94a3b8", stepPrices: [50, 50, 50, 50] },
    { id: "gold", name: "Altın", color: "#eab308", stepPrices: [60, 60, 60, 60] },
    { id: "platinum", name: "Platin", color: "#06b6d4", stepPrices: [80, 80, 80, 80] },
    { id: "emerald", name: "Zümrüt", color: "#10b981", stepPrices: [100, 100, 100, 100] },
    { id: "diamond", name: "Elmas", color: "#3b82f6", stepPrices: [120, 120, 120, 120] },
    { id: "master", name: "Master", color: "#a855f7", stepPrices: [250] }
];

// Açılışa özel indirim oranı (0.10 = %10 indirim)
const OPENING_DISCOUNT = 0.10;
const MAX_CHAMPIONS = 5;

const CONTACT_INFO = {
    discordUrl: "https://discord.com/users/jezuq",
    instagramUrl: "https://www.instagram.com/xalixkahya/"
};

document.getElementById("discord-link-btn").href = CONTACT_INFO.discordUrl;
document.getElementById("instagram-link-btn").href = CONTACT_INFO.instagramUrl;

const champions = [
    "Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Ambessa", "Amumu", "Anivia", "Annie", "Aphelios",
    "Ashe", "Aurelion Sol", "Aurora", "Azir", "Bard", "Bel'Veth", "Blitzcrank", "Brand", "Braum", "Briar",
    "Caitlyn", "Camille", "Cassiopeia", "Cho'Gath", "Corki", "Darius", "Diana", "Dr. Mundo", "Draven", "Ekko",
    "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar",
    "Gragas", "Graves", "Gwen", "Hecarim", "Heimerdinger", "Hwei", "Illaoi", "Irelia", "Ivern", "Janna",
    "Jarvan IV", "Jax", "Jayce", "Jhin", "Jinx", "K'Sante", "Kai'Sa", "Kalista", "Karma", "Karthus",
    "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen", "Kha'Zix", "Kindred", "Kled", "Kog'Maw", "LeBlanc",
    "Lee Sin", "Leona", "Lillia", "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai",
    "Master Yi", "Mel", "Milio", "Miss Fortune", "Mordekaiser", "Morgana", "Naafiri", "Nami", "Nasus", "Nautilus",
    "Neeko", "Nidalee", "Nilah", "Nocturne", "Nunu & Willump", "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy",
    "Pyke", "Qiyana", "Quinn", "Rakan", "Rammus", "Rek'Sai", "Rell", "Renata Glasc", "Renekton", "Rengar",
    "Riven", "Rumble", "Ryze", "Samira", "Sejuani", "Senna", "Seraphine", "Sett", "Shaco", "Shen",
    "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Smolder", "Sona", "Soraka", "Swain", "Sylas",
    "Syndra", "Tahm Kench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere",
    "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Vel'Koz", "Vex", "Vi",
    "Viego", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xayah", "Xerath", "Xin Zhao", "Yasuo",
    "Yone", "Yorick", "Yuumi", "Zac", "Zed", "Zeri", "Ziggs", "Zilean", "Zoe", "Zyra"
];

const customChampFileMap = {
    "Nunu & Willump": "NunuWillump",
    "Renata Glasc": "RenataGlasc"
};

function toChampFileName(name) {
    if (customChampFileMap[name]) {
        return customChampFileMap[name];
    }
    return name.replace(/[^A-Za-z0-9]/g, "");
}

const divisionLabels = ["IV", "III", "II", "I"];

function getFallbackSVG(color, size = 34) {
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none">
        <path d="M8 18L24 30L32 10L40 30L56 18L48 44L32 56L16 44L8 18Z" fill="${color}" fill-opacity="0.28" stroke="${color}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M22 32L32 20L42 32L32 48L22 32Z" fill="${color}" stroke="#ffffff" stroke-opacity="0.45" stroke-width="1.5"/>
    </svg>`;
}

function getTierIconHTML(tier, cssClass, fallbackSize) {
    const src = `img/${tier.id}.png`;
    const fallbackEscaped = encodeURIComponent(getFallbackSVG(tier.color, fallbackSize));
    return `<img src="${src}" alt="${tier.name}" class="${cssClass}" onerror="this.outerHTML = decodeURIComponent('${fallbackEscaped}');">`;
}

function createDefaultStarSVG() {
    const wrapper = document.createElement("span");
    wrapper.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2.5L14.85 8.45L21.4 9.35L16.6 13.95L17.8 20.45L12 17.3L6.2 20.45L7.4 13.95L2.6 9.35L9.15 8.45L12 2.5Z" fill="rgba(192, 132, 252, 0.25)" stroke="#c084fc" stroke-width="1.8" stroke-linejoin="round"/>
        <circle cx="12" cy="11.6" r="2.2" fill="#f6cf78"/>
    </svg>`;
    return wrapper.firstElementChild;
}

let state = {
    currentTier: 3, // Altın
    currentDiv: 3,  // I
    targetTier: 5,  // Zümrüt
    targetDiv: 0,   // IV
    mode: "solo",
    selectedRole: null,
    roleExtra: 0,
    selectedChamps: []
};

const tabPanels = document.querySelectorAll(".tab-panel");
const navButtons = document.querySelectorAll(".nav-btn");

function openTab(tabName) {
    tabPanels.forEach(p => p.classList.toggle("active", p.id === `tab-${tabName}`));
    navButtons.forEach(b => b.classList.toggle("active", b.dataset.tab === tabName));
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-tab]").forEach(btn => {
    btn.addEventListener("click", () => openTab(btn.dataset.tab));
});

document.querySelectorAll("[data-jump-tab]").forEach(btn => {
    btn.addEventListener("click", () => openTab(btn.dataset.jumpTab));
});

const tooltipEl = document.getElementById("hover-tooltip");
document.querySelectorAll("[data-tooltip]").forEach(el => {
    el.addEventListener("mouseenter", () => {
        tooltipEl.textContent = el.dataset.tooltip;
        tooltipEl.classList.add("visible");
    });
    el.addEventListener("mousemove", (e) => {
        const x = Math.min(window.innerWidth - 275, e.clientX + 12);
        const y = Math.max(10, e.clientY - 46);
        tooltipEl.style.left = `${x}px`;
        tooltipEl.style.top = `${y}px`;
    });
    el.addEventListener("mouseleave", () => {
        tooltipEl.classList.remove("visible");
    });
});

const currentTierGrid = document.getElementById("current-tier-grid");
const targetTierGrid = document.getElementById("target-tier-grid");

tiers.forEach((tier, index) => {
    if (index < tiers.length - 1) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "tier-btn";
        btn.dataset.index = index;
        btn.innerHTML = `${getTierIconHTML(tier, "tier-img", 30)}<span>${tier.name}</span>`;
        btn.addEventListener("click", () => {
            state.currentTier = index;
            updateUI();
        });
        currentTierGrid.appendChild(btn);
    }

    const tBtn = document.createElement("button");
    tBtn.type = "button";
    tBtn.className = "tier-btn";
    tBtn.dataset.index = index;
    tBtn.innerHTML = `${getTierIconHTML(tier, "tier-img", 30)}<span>${tier.name}</span>`;
    tBtn.addEventListener("click", () => {
        state.targetTier = index;
        if (index === 7) state.targetDiv = 0;
        updateUI();
    });
    targetTierGrid.appendChild(tBtn);
});

document.querySelectorAll("#current-div-grid .div-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        state.currentDiv = parseInt(btn.dataset.div, 10);
        updateUI();
    });
});

document.querySelectorAll("#target-div-grid .div-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        state.targetDiv = parseInt(btn.dataset.div, 10);
        updateUI();
    });
});

document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.mode = btn.dataset.mode;
        updateUI();
    });
});

document.querySelectorAll(".role-btn .role-img").forEach(img => {
    img.addEventListener("error", () => {
        const fallbackChar = img.closest(".role-btn").dataset.fallback || "✦";
        const span = document.createElement("span");
        span.className = "role-fallback";
        span.textContent = fallbackChar;
        img.replaceWith(span);
    });
});

const champPickerBox = document.getElementById("champ-picker-box");
const champSearchInput = document.getElementById("champ-search-input");
const champResultsEl = document.getElementById("champ-results");
const champCounterEl = document.getElementById("champ-counter");
const champLimitNoteEl = document.getElementById("champ-limit-note");
const selectedChampPill = document.getElementById("selected-champ-pill");
const selectedChampChipsEl = document.getElementById("selected-champ-chips");
const clearChampBtn = document.getElementById("clear-champ-btn");
const champRoleIconEl = document.getElementById("champ-role-icon");
const champRoleLabelEl = document.getElementById("champ-role-label");

function renderChampRoleVisual() {
    champRoleIconEl.innerHTML = "";
    const list = state.selectedChamps;

    if (list.length === 0) {
        champRoleIconEl.appendChild(createDefaultStarSVG());
        champRoleLabelEl.textContent = "Özel Şampiyon";
        return;
    }

    const grid = document.createElement("div");
    grid.className = `multi-champ-grid count-${list.length}`;

    list.forEach(champName => {
        const img = document.createElement("img");
        img.src = `${toChampFileName(champName)}.png`;
        img.alt = champName;
        img.className = "multi-champ-img";
        img.addEventListener("error", () => {
            const fb = document.createElement("span");
            fb.className = "multi-champ-fallback";
            fb.textContent = champName.charAt(0).toUpperCase();
            img.replaceWith(fb);
        });
        grid.appendChild(img);
    });

    champRoleIconEl.appendChild(grid);
    champRoleLabelEl.textContent = list.length === 1 ? list[0] : `${list.length} Şampiyon`;
}

function renderSelectedChampChips() {
    champCounterEl.textContent = `${state.selectedChamps.length} / ${MAX_CHAMPIONS}`;
    selectedChampChipsEl.innerHTML = "";

    if (state.selectedChamps.length === 0) {
        selectedChampPill.style.display = "none";
        return;
    }

    selectedChampPill.style.display = "flex";
    state.selectedChamps.forEach(champName => {
        const chip = document.createElement("span");
        chip.className = "champ-chip-tag";

        const text = document.createElement("span");
        text.textContent = champName;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "champ-chip-remove";
        removeBtn.textContent = "×";
        removeBtn.title = `${champName} kaldır`;
        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleChampionSelection(champName);
        });

        chip.appendChild(text);
        chip.appendChild(removeBtn);
        selectedChampChipsEl.appendChild(chip);
    });
}

function toggleChampionSelection(champName) {
    const idx = state.selectedChamps.indexOf(champName);
    champLimitNoteEl.textContent = "";

    if (idx !== -1) {
        state.selectedChamps.splice(idx, 1);
    } else {
        if (state.selectedChamps.length >= MAX_CHAMPIONS) {
            champLimitNoteEl.textContent = `En fazla ${MAX_CHAMPIONS} şampiyon seçebilirsin.`;
            return;
        }
        state.selectedChamps.push(champName);
    }

    renderSelectedChampChips();
    renderChampResults(champSearchInput.value);
    renderChampRoleVisual();
    updateUI();
}

function renderChampResults(filterText = "") {
    const query = filterText.trim().toLowerCase();
    const filtered = champions.filter(c => c.toLowerCase().includes(query));
    champResultsEl.innerHTML = "";

    if (filtered.length === 0) {
        champResultsEl.innerHTML = `<span style="font-size:0.75rem;color:#8b9bb4;grid-column:1/-1;">Şampiyon bulunamadı.</span>`;
        return;
    }

    filtered.forEach(champName => {
        const isSelected = state.selectedChamps.includes(champName);
        const b = document.createElement("button");
        b.type = "button";
        b.className = "champ-option-btn" + (isSelected ? " selected" : "");

        const img = document.createElement("img");
        img.src = `img/champs/${toChampFileName(champName)}.png`;
        img.alt = champName;
        img.className = "champ-list-icon";
        img.addEventListener("error", () => {
            const fb = document.createElement("span");
            fb.className = "champ-list-fallback";
            fb.textContent = champName.charAt(0).toUpperCase();
            img.replaceWith(fb);
        });

        const labelSpan = document.createElement("span");
        labelSpan.textContent = champName;

        b.appendChild(img);
        b.appendChild(labelSpan);

        b.addEventListener("click", () => toggleChampionSelection(champName));
        champResultsEl.appendChild(b);
    });
}

champSearchInput.addEventListener("input", () => {
    champLimitNoteEl.textContent = "";
    renderChampResults(champSearchInput.value);
});

clearChampBtn.addEventListener("click", () => {
    state.selectedChamps = [];
    champLimitNoteEl.textContent = "";
    renderSelectedChampChips();
    renderChampResults(champSearchInput.value);
    renderChampRoleVisual();
    updateUI();
});

document.querySelectorAll(".role-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const isSpecialChamp = btn.id === "champ-role-btn";

        if (btn.classList.contains("active")) {
            btn.classList.remove("active");
            state.selectedRole = null;
            state.roleExtra = 0;
            if (isSpecialChamp) {
                champPickerBox.classList.remove("open");
            }
        } else {
            document.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            state.selectedRole = btn.dataset.role;
            state.roleExtra = parseFloat(btn.dataset.extra);

            if (isSpecialChamp) {
                champPickerBox.classList.add("open");
                renderSelectedChampChips();
                renderChampResults(champSearchInput.value);
                champSearchInput.focus();
            } else {
                champPickerBox.classList.remove("open");
            }
        }
        updateUI();
    });
});

const flashToggle = document.getElementById("flash-toggle");
const flashLabel = document.getElementById("flash-label");
flashToggle.addEventListener("change", () => {
    flashLabel.textContent = flashToggle.checked ? "F" : "D";
});

["current-lp", "extra-win-toggle", "stream-toggle", "priority-toggle"].forEach(id => {
    document.getElementById(id).addEventListener("change", updateUI);
});

function getRankTitle(tierIdx, divIdx) {
    if (tierIdx === 7) return "Master";
    return `${tiers[tierIdx].name} ${divisionLabels[divIdx]}`;
}

function getAbsoluteStep(tierIdx, divIdx) {
    if (tierIdx === 7) return 28;
    return tierIdx * 4 + divIdx;
}

const flatStepPrices = tiers.slice(0, 7).flatMap(t => t.stepPrices);

function updateUI() {
    document.querySelectorAll("#current-tier-grid .tier-btn").forEach(btn => {
        btn.classList.toggle("active", parseInt(btn.dataset.index, 10) === state.currentTier);
    });
    document.querySelectorAll("#target-tier-grid .tier-btn").forEach(btn => {
        btn.classList.toggle("active", parseInt(btn.dataset.index, 10) === state.targetTier);
    });

    document.querySelectorAll("#current-div-grid .div-btn").forEach(btn => {
        btn.classList.toggle("active", parseInt(btn.dataset.div, 10) === state.currentDiv);
    });

    const targetDivGrid = document.getElementById("target-div-grid");
    targetDivGrid.classList.toggle("disabled", state.targetTier === 7);
    document.querySelectorAll("#target-div-grid .div-btn").forEach(btn => {
        btn.classList.toggle("active", parseInt(btn.dataset.div, 10) === state.targetDiv);
    });

    const startText = getRankTitle(state.currentTier, state.currentDiv);
    const endText = getRankTitle(state.targetTier, state.targetDiv);

    document.getElementById("current-emblem-big").innerHTML = getTierIconHTML(tiers[state.currentTier], "big-rank-img", 44);
    document.getElementById("target-emblem-big").innerHTML = getTierIconHTML(tiers[state.targetTier], "big-rank-img", 44);

    document.getElementById("current-rank-label").textContent = startText;
    document.getElementById("target-rank-label").textContent = endText;
    document.getElementById("summary-start-text").textContent = startText;
    document.getElementById("summary-end-text").textContent = endText;

    const startStep = getAbsoluteStep(state.currentTier, state.currentDiv);
    const endStep = getAbsoluteStep(state.targetTier, state.targetDiv);
    const stepDiff = endStep - startStep;

    const etaEl = document.getElementById("eta-text");
    if (stepDiff <= 0) {
        etaEl.textContent = "Tahmini Süre: -";
    } else if (stepDiff <= 3) {
        etaEl.textContent = "Tahmini Süre: 1 - 2 Gün";
    } else if (stepDiff <= 7) {
        etaEl.textContent = "Tahmini Süre: 2 - 4 Gün";
    } else {
        etaEl.textContent = "Tahmini Süre: 4 - 7 Gün";
    }

    const errorMsg = document.getElementById("error-msg");
    const orderBtn = document.getElementById("order-btn");

    if (endStep <= startStep) {
        errorMsg.textContent = "Hedef lig, mevcut ligden yüksek olmalıdır.";
        document.getElementById("old-price").textContent = "0 TL";
        document.getElementById("total-price").textContent = "0 TL";
        orderBtn.disabled = true;
        return;
    }

    errorMsg.textContent = "";
    orderBtn.disabled = false;

    let baseTotal = 0;
    for (let i = startStep; i < endStep; i++) {
        baseTotal += flatStepPrices[i];
    }

    const lpDiscount = parseFloat(document.getElementById("current-lp").value);
    baseTotal = baseTotal * (1 - lpDiscount);

    let multiplier = 1;
    if (state.mode === "duo") multiplier += 0.30;
    if (state.selectedRole) multiplier += state.roleExtra;
    if (document.getElementById("extra-win-toggle").checked) multiplier += 0.05;
    if (document.getElementById("stream-toggle").checked) multiplier += 0.15;
    if (document.getElementById("priority-toggle").checked) multiplier += 0.10;

    const regularPrice = Math.round(baseTotal * multiplier);
    const finalPrice = Math.max(10, Math.round(regularPrice * (1 - OPENING_DISCOUNT)));

    document.getElementById("old-price").textContent = `${regularPrice} TL`;
    document.getElementById("total-price").textContent = `${finalPrice} TL`;
}

document.getElementById("order-btn").addEventListener("click", () => {
    const startText = getRankTitle(state.currentTier, state.currentDiv);
    const endText = getRankTitle(state.targetTier, state.targetDiv);
    const lpText = document.getElementById("current-lp").selectedOptions[0].text;
    const server = document.getElementById("server-select").value;
    const queue = document.getElementById("queue-select").value;
    const mode = state.mode.toUpperCase();
    const roleLabel = state.selectedRole
        ? (state.selectedChamps.length > 0
            ? `${state.selectedRole} (${state.selectedChamps.join(", ")})`
            : state.selectedRole)
        : "Fark Etmez";
    const flash = flashToggle.checked ? "F" : "D";
    const offline = document.getElementById("offline-toggle").checked ? "Evet" : "Hayır";
    const extraWin = document.getElementById("extra-win-toggle").checked ? "Evet" : "Hayır";
    const stream = document.getElementById("stream-toggle").checked ? "Evet" : "Hayır";
    const priority = document.getElementById("priority-toggle").checked ? "Evet" : "Hayır";
    const price = document.getElementById("total-price").textContent;
    const orderCode = "RB-" + Math.floor(1000 + Math.random() * 9000);

    const summary =
        `Merhaba ReBooster! Yeni Sipariş Özeti (Açılış İndirimli):\n` +
        `• Sipariş Kodu: ${orderCode}\n` +
        `• Rota: ${startText} ➔ ${endText} (${lpText})\n` +
        `• Sunucu / Tür: ${server} - ${queue}\n` +
        `• Mod & Rol: ${mode} | Rol: ${roleLabel}\n` +
        `• Ayarlar: Flash (${flash}), Çevrimdışı (${offline}), +1 Win (${extraWin}), Yayın (${stream}), Öncelik (${priority})\n` +
        `• Toplam Tutar: ${price}`;

    navigator.clipboard.writeText(summary).then(() => {
        alert(`Sipariş özetin kopyalandı! (${orderCode})\n\nDiscord (jezuq) veya Instagram (@xalixkahya) üzerinden yapıştırıp gönderebilirsin.`);
        openTab("iletisim");
    });
});

renderChampRoleVisual();
updateUI();