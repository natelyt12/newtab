// import
import "./script/search.js";
import "./script/settings.js";
import { showalert } from "./script/alertHandler.js";
import { getClock, day } from "./script/date.js";
import "./script/weather.js";


// Const
const setting = document.querySelector('.settings');
const image = document.querySelector('.image');
const settingBtn = document.querySelector('.opt-btn');
const opacitySlider = document.getElementById('opacity');
const bgposSlider = document.getElementById('bgpos');
const API_select_box = document.querySelector('.API-select-box');
const choose_API = document.querySelector('.choose-API');
const overlay = document.querySelector('.overlay');

const bgposCenter = document.getElementById('bgpos-center');
const safemode = document.getElementById('safemode');
// settings
const wavy = document.getElementById('wavy');
let settingstate = false;
// API
const API_name = document.querySelector('.API-name');
const api_none = document.getElementById('api_none');

// Cache stuff -------------------------------------------------------


// Time stuff -------------------------------------------------------
getClock()
day()
setInterval(getClock, 5000);

// Hotkeys -------------------------------------------------------
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'm') {
        setting.classList.toggle('active');
        settingBtn.classList.toggle('active2');
        settingstate = !settingstate;
        moveoptbtn()
    } else if (event.ctrlKey && event.key === 'x') {
        safemode.checked = !safemode.checked;
        safemode.dispatchEvent(new Event('click'));
    } else if (/^[a-zA-Z0-9]$/.test(event.key) && !event.ctrlKey) {
        if (settingstate == false) {
            searchbox.focus();
        }
    } else if (event.key === 'Escape') {
        setting.classList.remove('active');
        settingBtn.classList.remove('active2');
        settingstate = false;
        moveoptbtn()
    }
});

settingBtn.addEventListener('click', () => {
    setting.classList.toggle('active');
    settingBtn.classList.toggle('active2');
    settingstate = !settingstate;
    moveoptbtn()
});

const optbtnCon = document.querySelector('.opt-btn-con');
const optbtn = document.querySelector('.opt-btn');
function moveoptbtn() {
    if (settingstate) {
        optbtnCon.style.transform = 'translateX(-240px)';
        optbtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <line x1="4" y1="4" x2="20" y2="20" stroke="white" stroke-width="2" stroke-linecap="round" />
                        <line x1="20" y1="4" x2="4" y2="20" stroke="white" stroke-width="2" stroke-linecap="round" />
                        </svg>`
        optbtn.style.transform = 'rotate(-180deg) scale(0.8)'
    } else {
        optbtnCon.style.transform = 'translateX(0)';
        optbtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" 
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" 
                            stroke="white" stroke-width="2"/>
                            <path d="M19.43 12.98C19.47 12.66 19.5 12.33 19.5 12C19.5 11.67 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.28 4.97 19.06 5.06L16.56 6.06C16.04 5.65 15.47 5.31 14.85 5.06L14.5 2.39C14.47 2.17 14.28 2 14.05 2H9.95C9.72 2 9.53 2.17 9.5 2.39L9.15 5.06C8.53 5.31 7.96 5.65 7.44 6.06L4.94 5.06C4.72 4.97 4.46 5.05 4.34 5.27L2.34 8.73C2.22 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12C4.5 12.33 4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.22 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.72 19.03 4.94 18.94L7.44 17.94C7.96 18.35 8.53 18.69 9.15 18.94L9.5 21.61C9.53 21.83 9.72 22 9.95 22H14.05C14.28 22 14.47 21.83 14.5 21.61L14.85 18.94C15.47 18.69 16.04 18.35 16.56 17.94L19.06 18.94C19.28 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z" 
                            stroke="white" stroke-width="2"/>
                            </svg>`
        optbtn.style.transform = 'rotate(90deg) scale(1)'
    }
}

// Settings items -------------------------------------------------------
// no tab at all
document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
        e.preventDefault();
    }
});
// Tab title
function checktabname() {
    if (tabtitle.value != '') {
        document.title = tabtitle.value;
    } else {
        document.title = 'Tab mới';
    }
    tabtitle.blur()
}
const tabtitle = document.getElementById('tabTitle');
tabtitle.addEventListener('change', checktabname);

// Opacity
const opacityText = document.getElementById('opacity-value');
opacitySlider.addEventListener('input', (event) => {
    const opacityValue = event.target.value;
    image.style.opacity = opacityValue / 100;
    opacityText.innerText = opacityValue + '%';
});

// Background position
const bgposText = document.getElementById('bgpos-value');
bgposSlider.addEventListener('input', (event) => {
    const bgposValue = event.target.value;
    image.style.backgroundPosition = `50% ${bgposValue}%`;
    bgposText.innerText = bgposValue + '%';
});
bgposCenter.addEventListener('click', () => {
    bgposSlider.value = 50;
    bgposSlider.dispatchEvent(new Event('input'));
    saveSettings()
});

// Wavy background
const sliderbox = document.querySelector('.slider');
function checkwavy() {
    if (wavy.checked) {
        startwave()
    } else {
        pausewave()
    }
}
wavy.addEventListener('click', checkwavy)

let start = null;
let animationId = null;
let isPaused = false;

function wave(timestamp) {
    if (isPaused) return; // nếu pause thì không chạy nữa

    if (!start) start = timestamp;
    const elapsed = (timestamp - start) / 1000; // tính giây

    const x = Math.sin(elapsed * 1.2) * 4; // trái phải
    const y = Math.cos(elapsed * 1.5) * 4; // lên xuống
    const rotation = Math.sin(elapsed * 0.8) * 0.7; // xoay
    image.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    animationId = requestAnimationFrame(wave);
}

function startwave() {
    isPaused = false;
    start = null;
    requestAnimationFrame(wave);
}

function pausewave() {
    isPaused = true;
    cancelAnimationFrame(animationId);
    image.style.transform = 'translate(-0%, -0%) rotate(0deg)'; // Đặt lại transform về trạng thái ban đầu
}

// Safemode
const safemodebox = document.querySelector('.safemode-box');
function safemodebg() {
    if (safemode.checked) {
        safemodebox.classList.toggle('safemode-enabled');
    } else {
        safemodebox.classList.remove('safemode-enabled');
    }
}
safemode.addEventListener('click', safemodebg);

// UI stuff -----------------------------------------------------------
const newuitoggle = document.getElementById('lumina');
newuitoggle.addEventListener('click', () => {
    if (newuitoggle.checked) {
        console.log('Bắt đầu thôi anh em');
    }
})

// Debug -------------------------------------------------------
const del_local = document.querySelector('.del-local');
const clear_cache = document.querySelector('.clear-cache');
del_local.addEventListener('click', () => {
    showalert('Đặt lại toàn bộ cài đặt?').then((userConfirmed) => {
        if (userConfirmed) {
            setTimeout(() => {
                localStorage.clear();
                chrome.storage.local.clear();
                location.reload();
            }, 600);
        }
    });
});
clear_cache.addEventListener('click', () => {
    showalert('Fetch lại thông tin?').then((userConfirmed) => {
        if (userConfirmed) {
            localStorage.removeItem('cache');
            location.reload();
        }
    });
})

// API options -------------------------------------------------------
const apihandle = document.querySelector('.API-handle');

const api_picrew = document.getElementById('api_picrew');
const picre_box = document.querySelector('.picre')
const picre_changewall = document.getElementById('picre-changewall');
const picre_pixiv = document.getElementById('picre-pixiv');
const picre_download = document.getElementById('picre-download');

const localimage = document.getElementById('api_local');
const localimagebox = document.querySelector('.localimage');

const api_picsum = document.getElementById('api_picsum');
const picsum_box = document.querySelector('.picsum')
const picsum_changewall = document.getElementById('picsum-changewall');
const picsum_download = document.getElementById('picsum-download');

// Get API status when load the page
if (chrome.storage == undefined) {
    showalert('Wibi không thể hoạt động bằng cách này. Hãy thử mở nó bằng cách sử dụng extension.')
}
chrome.storage.local.get('imgdata', (data) => {
    if (data.imgdata == undefined) {
        API_name.innerText = 'Không có';
        loader.style.display = 'none'
        closeall()
    } else {
        let parseddata = JSON.parse(data.imgdata);
        API_name.innerText = parseddata.API_name;
        let a = '.' + parseddata.API_class
        let api_element = document.querySelector(a)
        api_element.classList.toggle('shown')
        loadImage();
    }
});

choose_API.addEventListener('click', () => {
    API_select_box.classList.toggle('shown');
})

// Close all API options
function closeall() {
    picre_box.classList.remove('shown');
    localimagebox.classList.remove('shown');
    picsum_box.classList.remove('shown');
}

// Select: No API
api_none.addEventListener('click', () => {
    API_name.innerText = 'Không có';
    API_select_box.classList.remove('shown');
    closeall()
    overlay.style.opacity = 1
    setTimeout(() => { image.style.backgroundImage = 'none'; }, 800);
    chrome.storage.local.remove('imgdata');
});

// Select: Local image
localimage.addEventListener('click', () => {
    closeall()
    API_name.innerText = localimage.innerText;
    API_select_box.classList.remove('shown');
    localimagebox.classList.toggle('shown');
    let imgdata = {
        "API_name": "Hình nền cục bộ",
        "API_class": "localimage",
        "url": ""
    }
    chrome.storage.local.set({ imgdata: JSON.stringify(imgdata) });
    document.getElementById("fileInput").click();
});
// Local image options
document.getElementById("pick-image").addEventListener("click", function () {
    document.getElementById("fileInput").click();
});
// Local image file upload
document.getElementById("fileInput").addEventListener("change", function (event) {
    overlay.style.opacity = 1
    handleDisable()
    setTimeout(() => {
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                chrome.storage.local.get('imgdata', () => {
                    let imgdata = {
                        "API_name": "Hình nền cục bộ",
                        "API_class": "localimage",
                        "url": e.target.result
                    }
                    chrome.storage.local.set({ imgdata: JSON.stringify(imgdata) });
                    loadImage();
                })
            };
            reader.readAsDataURL(file); // Chuyển file thành Base64 để hiển thị
        }
    }, 500);
});

// Select: Picsum Photos
api_picsum.addEventListener('click', () => {
    closeall()
    API_name.innerText = api_picsum.innerText;
    API_select_box.classList.remove('shown');
    picsum_box.classList.toggle('shown');
    picsum_fetch();
});
// Picsum options
picsum_changewall.addEventListener('click', () => {
    picsum_fetch();
})
picsum_download.addEventListener('click', () => {
    chrome.storage.local.get('imgdata', (data) => {
        data = JSON.parse(data.imgdata);
        let link = document.createElement('a');
        link.href = data.url;
        link.download = 'background.jpg'; // Tên file khi tải về
        link.click();
    });
});

// Select: Picrew
api_picrew.addEventListener('click', async () => {
    const userConfirmed = await showalert(
        'Bạn có thể gặp phải những hình ảnh chứa nội dung nhạy cảm (sensitive content), mặc dù nó không phải NSFW. Bạn có chắc chắn muốn tiếp tục?'
    );

    if (userConfirmed) {
        API_name.innerText = api_picrew.innerText;
        API_select_box.classList.remove('shown');
        closeall();
        picre_box.classList.toggle('shown');
        picrew_fetch();
    }
});
// Picrew options
picre_changewall.addEventListener('click', () => {
    picre_changewall.innerText = 'Đang đổi hình nền...';
    picrew_fetch();
})
picre_download.addEventListener('click', () => {
    chrome.storage.local.get('imgdata', (data) => {
        data = JSON.parse(data.imgdata);
        window.open(data.cdnurl);
    });
})
picre_pixiv.addEventListener('click', () => {
    chrome.storage.local.get('imgdata', (data) => {
        data = JSON.parse(data.imgdata);
        window.open(data.pixiv);
    });
})

// Lorem Picsum: Fetch
async function picsum_fetch() {
    overlay.style.opacity = 1
    handleDisable()
    picsum_changewall.innerText = 'Đang đổi hình nền...';
    try {
        const response = await fetch('https://picsum.photos/2560/1440.webp')
        const blob = await response.blob();
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            let imgdata = {
                "API_name": "Lorem Picsum",
                "API_class": "picsum",
                "url": reader.result
            }
            chrome.storage.local.set({ imgdata: JSON.stringify(imgdata) });
            setTimeout(loadImage, 500);
        }
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

// Picrew: Fetch
async function picrew_fetch() {
    overlay.style.opacity = 1
    handleDisable()
    picre_changewall.innerText = 'Đang đổi hình nền...';
    const response = await fetch('https://pic.re/image.json')
    const data = await response.json()
    let imgurl = 'https://' + data.file_url
    compressImageFromURL(imgurl, 0.8, (compressedBase64) => {
        let imgdata = {
            "API_name": "Picre",
            "API_class": "picre",
            "url": compressedBase64,
            "cdnurl": imgurl,
            "pixiv": data.source
        }
        chrome.storage.local.set({ imgdata: JSON.stringify(imgdata) });
        setTimeout(loadImage, 500);
    })
}

// Load background image
function loadImage() {
    chrome.storage.local.get('imgdata', (data) => {
        data = JSON.parse(data.imgdata);
        let img = new Image();
        img.src = data.url
        img.onload = function () {
            image.style.backgroundImage = 'url(' + img.src + ')';
            overlay.style.opacity = 0
            if (data.API_name == 'Picre' || data.API_name == 'Lorem Picsum' || data.API_name == 'Hình nền cục bộ') {
                handleEnable()
                picre_changewall.innerText = 'Đổi hình nền';
                picsum_changewall.innerText = 'Đổi hình nền';
            }
        };
    });
}

const loader = document.querySelector('.loader');
function handleEnable() {
    loader.style.display = 'none'
    apihandle.style.opacity = 1
    apihandle.style.pointerEvents = 'auto'
    sliderbox.style.opacity = 1
    sliderbox.style.pointerEvents = 'auto'
}
function handleDisable() {
    loader.style.display = 'block'
    apihandle.style.opacity = 0.77
    apihandle.style.pointerEvents = 'none'
    sliderbox.style.opacity = 0.5
    sliderbox.style.pointerEvents = 'none'
}

// Covert to Webp
function compressImageFromURL(imageUrl, quality = 0.9, callback) {
    let img = new Image();
    img.crossOrigin = "Anonymous"; // Cho phép tải ảnh từ domain khác
    img.src = imageUrl;

    img.onload = function () {
        picre_changewall.innerText = 'Đang nén hình nền...'
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        // Resize ảnh nếu quá lớn
        let maxWidth = 2560, maxHeight = 1440;
        let width = img.width, height = img.height;
        if (width > maxWidth || height > maxHeight) {
            let ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Chuyển sang WebP
        let compressedBase64 = canvas.toDataURL("image/webp", quality);
        callback(compressedBase64);
    };

    img.onerror = function () {
        console.error("Không thể tải ảnh:", imageUrl);
    };
}

// Save and Load settings ----------------------------------------------------------
import { saveSettings, loadSettings } from './script/backup.js';
document.addEventListener('DOMContentLoaded', loadSettings);
document.addEventListener('change', saveSettings);

// Check version
const version = document.getElementById('version');
const manifest = chrome.runtime.getManifest();
version.innerText = `v${manifest.version}`;

// ====================================================================================================================
