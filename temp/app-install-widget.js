// widget-permission-ui.js

function showWidgetPermissionUI() {

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "rgba(0,0,0,0.55)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "999999";
    overlay.style.fontFamily = "Arial";

    const box = document.createElement("div");
    box.style.width = "340px";
    box.style.background = "#fff";
    box.style.borderRadius = "20px";
    box.style.padding = "22px";
    box.style.boxShadow = "0 10px 35px rgba(0,0,0,0.25)";

    box.innerHTML = `
        <div style="
            display:flex;
            align-items:center;
            gap:12px;
            margin-bottom:12px;
        ">
            <div style="
                width:45px;
                height:45px;
                border-radius:12px;
                background:#e8f5e9;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:22px;
            ">🏠</div>

            <div>
                <div style="font-size:16px;font-weight:700;">
                    Home Screen Widget
                </div>
                <div style="font-size:12px;color:#666;">
                    Add search widget
                </div>
            </div>
        </div>

        <div style="font-size:14px;color:#333;line-height:1.5;">
            Allow this app to add a search widget to your home screen for quick access.
        </div>

        <div style="
            display:flex;
            justify-content:flex-end;
            gap:10px;
            margin-top:20px;
        ">
            <button id="cancelBtn" style="
                padding:10px 14px;
                border:none;
                background:#eee;
                border-radius:10px;
                cursor:pointer;
            ">Cancel</button>

            <button id="allowBtn" style="
                padding:10px 14px;
                border:none;
                background:#111;
                color:white;
                border-radius:10px;
                cursor:pointer;
            ">Allow</button>
        </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById("cancelBtn").onclick = () => {
        overlay.remove();
    };

    document.getElementById("allowBtn").onclick = () => {

        overlay.remove();

        // 🔥 HERE is where your APK backend will handle real widget adding
        console.log("Widget permission accepted (hook for Android side)");

        // optional save state
        localStorage.setItem("widgetAllowed", "true");

    };
}

/* AUTO SHOW */
window.addEventListener("load", () => {

    setTimeout(() => {
        showWidgetPermissionUI();
    }, 1200);

});