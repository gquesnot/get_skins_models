import * as fs from "fs";

(async () => {
    let entries = await getEntries()

    // store entries in a file using fs
    return fs.writeFile('data/entries.json', JSON.stringify(entries), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

})();
async function filterEntries(datas, type) {
    let result  = []
    for (const element of Object.values(datas['league-of-legends'].skin_types[type].entries)) {
        let skins = []
        for (const skin of element.skins) {
            let url = `https://static.teemo.gg/riot-games/league-of-legends/models/${type}/${skin.id}.wasm`
            let status = (await fetch(url, {method:'HEAD'})).status
            if (status !== 404) {
                skins.push(parseSkin(skin, element, type))
                console.log(`OK ${skin.id}`)
            } else {
                console.log(`KO ${skin.id} ${url}`)
            }
        }
        if (skins.length !== 0) {
            result.push({
                ...element,
                skins: skins
            });
        }
    }
    return result
}

async function getEntries() {
    let datas = await (fetch("https://static.teemo.gg/teemo/sites/main/js/skins-list.json", {
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    }).then(response => response.json()))
    // get all champions and creatures as array
    return (await filterEntries(datas, "champions")).concat(await filterEntries(datas, "creatures"));
}

function parseSkin(skin, parent, type) {
    skin.entry_id = parent.id
    skin.type = type
    skin.url = `https://teemo.gg/model-viewer?game=league-of-legends&type=${skin.type}&object=${skin.entry_id}&skinid=${skin.id}`
    return skin
}