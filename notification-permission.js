// system-permission-ui.js

function showSystemPermissionUI() {

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
    box.style.borderRadius = "18px";
    box.style.padding = "22px";
    box.style.boxShadow = "0 10px 35px rgba(0,0,0,0.25)";
    box.style.textAlign = "left";

    box.innerHTML = `
        <div style="
            display:flex;
            align-items:center;
            gap:12px;
            margin-bottom:12px;
        ">
            <div style="
                width:42px;
                height:42px;
                border-radius:10px;
                background:#e8f0fe;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:22px;
            ">🔔</div>

            <div>
                <div style="font-size:16px;font-weight:700;">
                    Notifications
                </div>
                <div style="font-size:12px;color:#666;">
                    System permission request
                </div>
            </div>
        </div>

        <div style="font-size:14px;color:#333;line-height:1.5;">
            This app wants to send you notifications for updates, messages, and alerts.
        </div>

        <div style="
            display:flex;
            justify-content:flex-end;
            gap:10px;
            margin-top:20px;
        ">
            <button id="denyBtn" style="
                padding:10px 14px;
                border:none;
                background:#eee;
                border-radius:10px;
                cursor:pointer;
            ">Deny</button>

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

    // Deny
    document.getElementById("denyBtn").onclick = () => {
        overlay.remove();
    };

    // Allow → REAL system permission
    document.getElementById("allowBtn").onclick = async () => {

        overlay.remove();

        if ("Notification" in window) {
            try {
                await Notification.requestPermission();
            } catch (e) {
                console.log(e);
            }
        }

    };
}

/* AUTO RUN */
window.addEventListener("load", () => {
    setTimeout(showSystemPermissionUI, 1200);
});