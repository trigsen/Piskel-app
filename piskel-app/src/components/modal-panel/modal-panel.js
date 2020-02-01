export default class ModalPanel {
    constructor() {

    }

    static changeHotkeys(hotKeys) {
        const hotkeysValues = Array.from(document.querySelectorAll('.hotkey__input'));
        
        let isFreeKeys = true;
        for (let key in hotKeys) {
            if (hotkeysValues.some((potentialHotKey) => potentialHotKey.value === hotKeys[key])) {
                isFreeKeys = false;
            }       
        }

        const panelHeader = document.querySelector('.hotkeys-panel__header');
        panelHeader.style.visibility = 'visible';
        if (isFreeKeys) {
            hotkeysValues.forEach((key) => {
                if (key.value != '') {
                    hotKeys[key.dataset.tool] = key.value;
                }
            });
            panelHeader.innerHTML = 'The hotkey is changed successfully';
        } else {
            panelHeader.innerHTML = 'Hotkey is already use';
        }
       
        setTimeout(() => {
            panelHeader.style.visibility = 'hidden';
        }, 5000);
    }
}